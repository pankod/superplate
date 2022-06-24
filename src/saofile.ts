import path from "path";
import validate from "validate-npm-package-name";
import { exec } from "child_process";
import { promisify } from "util";
import chalk from "chalk";
import { v4 as uuidv4 } from "uuid";

import Analytics from "analytics-node";
const analytics = new Analytics(process.env.SEGMENT_KEY ?? "");

import { GeneratorConfig, Action } from "../@types/sao";
import {
    mergePackages,
    concatExtend,
    handleIgnore,
    extendBase,
    getPluginsArray,
    mergeJSONFiles,
    mergeBabel,
    tips,
    mergePluginData,
    BinaryHelper,
} from "@Helper";

import { ProjectPrompt } from "@Helper/lucky";

const saoConfig: GeneratorConfig = {
    prompts(sao) {
        const {
            appName,
            extras: { paths, presetAnswers },
        } = sao.opts;

        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const sourcePrompts = require(path.resolve(
            paths.sourcePath,
            "prompt.js",
        ));

        const pmQuestionChoises = [{ message: "Npm", value: "npm" }];
        const canUseYarn = BinaryHelper.CanUseYarn();
        const canUsePnpm = BinaryHelper.CanUsePnpm();

        if (canUseYarn) {
            pmQuestionChoises.push({ message: "Yarn", value: "yarn" });
        }

        if (canUsePnpm) {
            pmQuestionChoises.push({
                message: "pnpm"
                    .split("")
                    .map((v) =>
                        Math.round(Math.random())
                            ? v.toUpperCase()
                            : v.toLowerCase(),
                    )
                    .join(""),
                value: "pnpm",
            });
        }

        return [
            {
                type: "input",
                name: "name",
                message: "What will be the name of your app",
                default: appName,
            },
            ...(pmQuestionChoises.length > 1
                ? [
                      {
                          name: "pm",
                          message: "Package manager:",
                          choices: pmQuestionChoises,
                          type: "select",
                          default: "npm",
                      },
                  ]
                : []),
            ...(sourcePrompts?.prompts ?? []).map((el: ProjectPrompt) => ({
                ...el,
                default: presetAnswers?.[el.name] ?? el.default,
            })),
            {
                name: "telemetry",
                message:
                    "Would you like to share your choices with us anonymously?",
                type: "select",
                pageSize: 2,
                choices: [
                    {
                        message: "I want to share anonymously! Thank you! ❤️",
                        name: "yes",
                    },
                    { message: "No", name: "no" },
                ],
                default: "yes",
            },
        ];
    },
    data(sao) {
        /**
         * Package Manager
         */

        sao.answers.pm =
            BinaryHelper.CanUseYarn() || BinaryHelper.CanUsePnpm()
                ? sao.answers.pm
                : "npm";

        let pmRun = "npm run";
        if (sao.answers.pm === "yarn") {
            pmRun = "yarn";
        } else if (sao.answers.pm === "pnpm") {
            pmRun = "pnpm";
        }

        /**
         * Extend.js data
         */
        const { sourcePath } = sao.opts.extras.paths;
        const { projectType } = sao.opts.extras;

        const pluginAnswers = { ...sao.answers };
        delete pluginAnswers.name;
        const selectedPlugins = getPluginsArray(pluginAnswers);
        const extendData = concatExtend(
            extendBase,
            selectedPlugins,
            sourcePath,
            sao.answers,
        );

        /**
         * Plugins meta data
         */
        const pluginsData = mergePluginData(
            {},
            sourcePath,
            selectedPlugins,
            "meta.json",
        ).plugins;

        const metaJSONPath =
            projectType === "react" ? "src/meta.json" : "public/meta.json";

        /**
         * Return
         */
        return {
            ...sao.answers,
            projectType,
            answers: sao.answers,
            selectedPlugins,
            pmRun,
            pluginsData,
            metaJSONPath,
            ...extendData,
        };
    },
    async actions(sao) {
        if (sao.answers.name.length === 0) {
            const error = sao.createError("App name is required!");
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

        const { sourcePath } = sao.opts.extras.paths;

        const actionsArray = [
            {
                type: "add",
                files: "**",
                templateDir: path.join(sourcePath, "template"),
                data() {
                    return sao.data;
                },
            },
            {
                type: "move",
                templateDir: path.join(sourcePath, "template"),
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

        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const sourcePrompts = require(path.resolve(sourcePath, "prompt.js"));

        actionsArray.push(
            ...selectedPlugins.map((plugin: string) => {
                const customFilters = handleIgnore(
                    sourcePrompts?.ignores ?? [],
                    sao.answers,
                    plugin,
                );

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
                        ...customFilters,
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
            files: sao.data.metaJSONPath,
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
                return mergePackages(
                    data,
                    sourcePath,
                    selectedPlugins,
                    sao.answers,
                );
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

        if (sao.answers.telemetry === "yes") {
            analytics.track({
                event: "generate",
                properties: {
                    ...sao.answers,
                    type: sao.opts.extras.projectType,
                },
                anonymousId: uuidv4(),
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
        await promisify(exec)(`npx prettier "${saoInstance.outDir}" --write`);

        /**
         * Create an initial commit
         */
        if (!debug) {
            try {
                // add
                await promisify(exec)(
                    `git --git-dir="${saoInstance.outDir}"/.git/ --work-tree="${saoInstance.outDir}"/ add -A`,
                );
                // commit
                await promisify(exec)(
                    `git --git-dir="${saoInstance.outDir}"/.git/ --work-tree="${saoInstance.outDir}"/ commit -m "initial commit with superplate"`,
                );
                saoInstance.logger.info("created an initial commit.");
            } catch (_) {
                console.log(
                    chalk.yellow`An error occured while creating git commit.`,
                );
            }
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
