import path from "path";
import validate from "validate-npm-package-name";

import { GeneratorConfig, Action } from "../types/sao";
import {
    mergePackages,
    concatExtend,
    extendBase,
    getPluginsArray,
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
            "prompt.json",
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
                    { message: "Yarn", value: "yarn" },
                    { message: "Npm", value: "npm" },
                ],
                type: "select",
                default: "npm",
            },
            ...sourcePrompts.prompts,
        ];
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
                filters: {
                    "pages/_app.tsx": false,
                },
                templateDir,
            },
            {
                type: "move",
                templateDir,
                patterns: {
                    gitignore: ".gitignore",
                    "_package.json": "package.json",
                    "_next-env.d.ts": "next-env.d.ts",
                    "_tsconfig.json": "tsconfig.json",
                },
            },
        ] as Action[];

        const pluginAnswers = { ...sao.answers };
        delete pluginAnswers.name;

        const selectedPlugins = getPluginsArray(pluginAnswers);

        console.log(selectedPlugins);

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
                    },
                };
            }),
        );

        actionsArray.push({
            type: "modify" as const,
            files: "package.json",
            handler(data: Record<string, unknown>) {
                return mergePackages(data, sourcePath, selectedPlugins);
            },
        });

        actionsArray.push({
            type: "add" as const,
            templateDir,
            files: "pages/_app.tsx",
            data() {
                const pluginAnswers = { ...sao.answers };
                delete pluginAnswers.name;

                const selectedPlugins = getPluginsArray(pluginAnswers);

                return {
                    ...((concatExtend(
                        extendBase,
                        selectedPlugins,
                        sourcePath,
                    ) as unknown) as Record<string, unknown>),
                };
            },
        });

        console.log(actionsArray);

        return actionsArray;
    },
    async completed(saoInstance) {
        const { debug } = saoInstance.opts.extras;
        if (!debug) {
            saoInstance.gitInit();
            await saoInstance.npmInstall({ npmClient: this.answers.pm });
        }

        saoInstance.showProjectTips();

        saoInstance.logger.tip(`to start dev server, run commands below`);

        saoInstance.logger.tip(saoInstance.colors.red.bold`npm run dev`);
        saoInstance.logger.tip(saoInstance.colors.green.bold`npm run build`);
    },
};

module.exports = saoConfig;
