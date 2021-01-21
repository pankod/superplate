import path from "path";
import validate from "validate-npm-package-name";
import { exec } from "child_process";
import { promisify } from "util";

import { GeneratorConfig, Action } from "../@types/sao";
import {
    mergePackages,
    concatExtend,
    extendBase,
    getPluginsArray,
    mergeJSONFiles,
    mergeBabel,
    tips,
    mergePluginData,
} from "@Helper";

const saoConfig: GeneratorConfig = {
    prompts(sao) {
        const {
            appName,
            extras: { paths },
        } = sao.opts;

        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const sourcePrompts = require(path.resolve(
            paths.sourcePath,
            "prompt.js",
        ));

        return [
            {
                type: "input",
                name: "name",
                message: "What will be the name of your app",
                default: appName,
            },
            {
                name: "pm",
                message: "Package manager:",
                choices: [
                    { message: "Npm", value: "npm" },
                    { message: "Yarn", value: "yarn" },
                ],
                type: "select",
                default: "npm",
            },
            ...(sourcePrompts?.prompts ?? []),
        ];
    },
    data(sao) {
        /**
         * Package Manager
         */
        const pmRun = sao.answers.pm === "yarn" ? "yarn" : "npm run";

        /**
         * Extend.js data
         */
        const { sourcePath } = sao.opts.extras.paths;
        const pluginAnswers = { ...sao.answers };
        delete pluginAnswers.name;
        const selectedPlugins = getPluginsArray(pluginAnswers);
        const extendData = (concatExtend(
            extendBase,
            selectedPlugins,
            sourcePath,
        ) as unknown) as Record<string, unknown>;

        /**
         * Return
         */
        return {
            ...sao.answers,
            pmRun,
            ...extendData,
        };
    },
    async actions(sao) {
        if (sao.answers.name.length === 0) {
            const error = sao.createError("you have to provide app name");
            throw error;
        }

        const appNameValidation = validate(sao.answers.name);

        if (appNameValidation.warnings) {
            appNameValidation.warnings.forEach((warn) =>
                this.logger.warn(warn),
            );
        }

        if (appNameValidation.errors) {
            appNameValidation.errors.forEach((warn) => this.logger.error(warn));
            process.exit(1);
        }

        const { templateDir, sourcePath } = sao.opts.extras.paths;

        const actionsArray = [
            {
                type: "add",
                files: "**",
                templateDir,
                data() {
                    return sao.data;
                },
            },
            {
                type: "move",
                templateDir,
                patterns: {
                    gitignore: ".gitignore",
                    "_package.json": "package.json",
                    "_next-env.d.ts": "next-env.d.ts",
                    "_tsconfig.json": "tsconfig.json",
                    babelrc: ".babelrc",
                },
                data() {
                    return sao.data;
                },
            },
        ] as Action[];

        const pluginAnswers = { ...sao.answers };
        delete pluginAnswers.name;

        const selectedPlugins = getPluginsArray(pluginAnswers);

        actionsArray.push(
            ...selectedPlugins.map((plugin: string) => {
                return {
                    type: "add" as const,
                    files: "**",
                    templateDir: path.join(sourcePath, "plugins", plugin),
                    filters: {
                        "extend.js": false,
                        "package.json": false,
                        "package.js": false,
                        "tsconfig.json": false,
                        ".babelrc": false,
                        "meta.json": false,
                        "**/*.css": sao.answers.css_features === "css",
                        "**/*.scss": sao.answers.css_features === "scss",
                        "**/*.less": sao.answers.css_features === "less",
                        "**/*.stories.tsx": sao.answers.features.includes(
                            "storybook",
                        ),
                    },
                    data() {
                        return sao.data;
                    },
                };
            }),
        );

        /**
         * eslintrc handler
         */
        actionsArray.push({
            type: "move" as const,
            patterns: {
                "_.eslintrc": ".eslintrc",
            },
            data() {
                return sao.data;
            },
        } as Action);

        /**
         * meta.json handler
         */
        actionsArray.push({
            type: "modify" as const,
            files: "public/meta.json",
            handler(data: Record<string, unknown>) {
                return mergePluginData(
                    data,
                    sourcePath,
                    selectedPlugins,
                    "meta.json",
                );
            },
        });

        /**
         * package.json handler
         */
        actionsArray.push({
            type: "modify" as const,
            files: "package.json",
            handler(data: Record<string, unknown>) {
                return mergePackages(data, sourcePath, selectedPlugins);
            },
        });

        /**
         * tsconfig.json handler
         */
        actionsArray.push({
            type: "modify" as const,
            files: "tsconfig.json",
            handler(data: Record<string, unknown>) {
                return mergeJSONFiles(
                    data,
                    sourcePath,
                    selectedPlugins,
                    "tsconfig.json",
                );
            },
        });

        /**
         * .babelrc handler
         */
        actionsArray.push({
            type: "modify" as const,
            files: ".babelrc",
            async handler(data: string) {
                const merged = await mergeBabel(
                    JSON.parse(data),
                    sourcePath,
                    selectedPlugins,
                );
                return JSON.stringify(merged);
            },
        });

        /**
         * Remove *.spec.ts and *.spec.tsx when testing === 'none'
         * Remove only *.spec.tsx when testing === 'jest'
         */
        if (pluginAnswers.testing === "none") {
            actionsArray.push({
                type: "remove",
                files: "**/!(node_modules)/*.@(spec|test).@(ts|tsx)",
                when: "testing",
            });
        } else if (pluginAnswers.testing === "jest") {
            actionsArray.push({
                type: "remove",
                files: "**/!(node_modules)/*.@(spec|test).@(tsx)",
                when: "testing",
            });
        }

        /**
         * Remove css and scss or styled in components when ui !== 'none'
         */
        if (pluginAnswers.ui !== "none") {
            actionsArray.push({
                type: "remove",
                files: "**/src/components/**/@(*.@(c|sc|sa)ss|styled.ts?(x))",
                when: "ui",
            });
        }

        return actionsArray;
    },
    async prepare() {
        tips.preInstall();
    },
    async completed(saoInstance) {
        const { debug } = saoInstance.opts.extras;
        /**
         * Git init and install packages
         */
        if (!debug) {
            saoInstance.gitInit();
            await saoInstance.npmInstall({
                npmClient: this.answers.pm,
                installArgs: ["--silent"],
            });
        }

        /**
         * Format generated project
         */
        await promisify(exec)(`npx prettier ${saoInstance.outDir} --write`);

        /**
         * Create an initial commit
         */
        if (!debug) {
            // add
            await promisify(exec)(
                `git --git-dir=${saoInstance.outDir}/.git/ --work-tree=${saoInstance.outDir}/ add -A`,
            );
            // commit
            await promisify(exec)(
                `git --git-dir=${saoInstance.outDir}/.git/ --work-tree=${saoInstance.outDir}/ commit -m 'initial commit with next-cli'`,
            );
            saoInstance.logger.info("created an initial commit.");
        }

        /**
         * Show messages after completion
         */
        tips.postInstall({
            name: saoInstance.opts.appName ?? "",
            dir: saoInstance.outDir,
            pm: saoInstance.answers.pm,
        });
    },
};

module.exports = saoConfig;
