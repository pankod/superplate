import {
    concatExtend,
    extendBase,
    getPluginsArray,
    get_potential_package_managers,
    handleIgnore,
    mergeBabel,
    mergeJSONFiles,
    mergePackages,
    mergePluginData,
    tips,
} from "@Helper";
import { ProjectPrompt } from "@Helper/lucky";
import { formatFiles } from "@Helper/prettier";
import chalk from "chalk";
import { exec } from "child_process";
import fetch from "node-fetch";
import path from "path";
import { promisify } from "util";
import { v4 as uuidv4 } from "uuid";
import validate from "validate-npm-package-name";
import { Action, GeneratorConfig } from "../@types/sao";

const saoConfig: GeneratorConfig = {
    prompts(sao) {
        const { apiMode } = sao.opts.extras;

        if (apiMode) return [];

        const {
            appName,
            extras: { paths, presetAnswers },
        } = sao.opts;

        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const sourcePrompts = require(path.resolve(
            paths.sourcePath,
            "prompt.js",
        ));

        const packageManagerChoices = get_potential_package_managers();

        return [
            {
                type: "input",
                name: "name",
                message: "What would you like to name your project?:",
                default: appName,
                validate: (name: string) => {
                    const appNameValidation = validate(name);

                    if (appNameValidation.errors) {
                        return false;
                    }

                    return true;
                },
            },
            ...(sourcePrompts?.prompts ?? []).map((el: ProjectPrompt) => ({
                ...el,
                default: presetAnswers?.[el.name] ?? el.default,
            })),
            {
                type: "select",
                name: "npmClient",
                message: "Choose a package manager:",
                choices: packageManagerChoices,
                default:
                    packageManagerChoices.length === 1
                        ? packageManagerChoices[0].name
                        : undefined,
                skip: () => packageManagerChoices.length === 1,
            },
        ];
    },
    data(sao) {
        /**
         * Package Manager
         */
        const answers = {
            ...sao.opts.extras.presetAnswers,
            ...sao.answers,
        };

        const { npmClient } = answers;

        let pmRun = "npm run";

        if (npmClient === "yarn") {
            pmRun = "yarn";
        } else if (npmClient === "pnpm") {
            pmRun = "pnpm";
        }

        /**
         * Extend.js data
         */
        const { sourcePath } = sao.opts.extras.paths;
        const { projectType } = sao.opts.extras;

        const pluginAnswers = { ...answers };

        delete pluginAnswers.name;
        delete pluginAnswers.svg;
        delete pluginAnswers.title;
        delete pluginAnswers.icon;

        const selectedPlugins = getPluginsArray(pluginAnswers);

        const extendData = concatExtend(
            extendBase,
            ["_base", ...selectedPlugins],
            sourcePath,
            answers,
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
            ...answers,
            projectType,
            answers,
            selectedPlugins,
            pm: npmClient,
            pmRun,
            pluginsData,
            metaJSONPath,
            ...extendData,
        };
    },
    async actions(sao) {
        const answers = {
            ...sao.opts.extras.presetAnswers,
            ...sao.answers,
        };

        if (answers.name.length === 0) {
            const error = sao.createError("App name is required!");
            throw error;
        }

        const appName = answers.name;

        const appNameValidation = validate(appName);

        if (appNameValidation.warnings) {
            appNameValidation.warnings.forEach((warn) =>
                this.logger.warn(warn),
            );
        }

        if (appNameValidation.errors) {
            appNameValidation.errors.forEach((warn) => this.logger.error(warn));
            process.exit(1);
        }

        sao.opts.outDir = sao.opts.outDir + "/" + appName;

        sao.opts.appName = appName;

        const { sourcePath } = sao.opts.extras.paths;

        const actionsArray: Action[] = [
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

        const pluginAnswers = {
            ...sao.opts.extras.presetAnswers,
            ...sao.answers,
        };

        delete pluginAnswers.name;
        delete pluginAnswers.svg;
        delete pluginAnswers.title;
        delete pluginAnswers.icon;

        const selectedPlugins = getPluginsArray(pluginAnswers);

        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const sourcePrompts = require(path.resolve(sourcePath, "prompt.js"));

        actionsArray.push(
            ...["_base", ...selectedPlugins].map((plugin: string) => {
                const customFilters = handleIgnore(
                    sourcePrompts?.ignores ?? [],
                    {
                        ...sao.opts.extras.presetAnswers,
                        ...sao.answers,
                    },
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
            handler(data: Record<string, unknown>): Record<string, unknown> {
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

        if (!sao.opts.extras.apiMode && !sao.opts.extras.disableTelemetry) {
            try {
                await fetch("http://telemetry.refine.dev/superplate", {
                    method: "POST",
                    body: JSON.stringify({
                        event: "generate",
                        properties: {
                            ...sao.answers,
                            type: sao.opts.extras.projectType,
                        },
                        anonymousId: uuidv4(),
                        originalTimestamp: new Date(),
                    }),
                    headers: { "Content-Type": "application/json" },
                });
            } catch (error) {
                //
            }
        }

        return actionsArray;
    },
    async prepare() {
        tips.preInstall();
    },
    async completed(saoInstance) {
        const { debug, apiMode } = saoInstance.opts.extras;

        /**
         * Format generated project
         */
        formatFiles(saoInstance.outDir);

        if (apiMode) return;

        const { npmClient } = saoInstance.answers;
        /**
         * Git init and install packages
         */
        if (!debug) {
            saoInstance.gitInit();
            await saoInstance.npmInstall({
                npmClient: npmClient,
                installArgs: ["--silent"],
            });
        }

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
            pm: npmClient,
        });
    },
};

module.exports = saoConfig;
