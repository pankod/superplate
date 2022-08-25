import chalk from "chalk";
import clear from "clear";
import path from "path";
import commander from "commander";
import { cleanupSync } from "temp";
import { Options, SAO } from "sao";

import packageData from "../package.json";
import {
    get_source,
    get_project_types,
    is_multi_type,
    prompt_project_types,
    get_presets,
    get_prompts_and_choices,
    get_random_answers,
    prompt_npm_cli,
} from "@Helper";

const generator = path.resolve(__dirname, "./");

const cli = async (): Promise<void> => {
    clear();
    const program = commander
        .name(packageData.name)
        .version(packageData.version)
        .arguments("<project-directory>")
        .usage(`${chalk.green("<project-directory>")} [options]`)
        .description(packageData.description)
        .option(
            "-s, --source <source-path>",
            "specify a custom source of plugins",
        )
        .option(
            "-b, --branch <source-git-branch>",
            "specify a custom branch in source of plugins",
        )
        .option(
            "-o, --preset <preset-name>",
            "specify a preset to use for the project",
        )
        .option(
            "-l, --lucky",
            "use this option to generate a project with random answers",
        )
        .option("-p, --project <project-name>", "specify a project type to use")
        .option("-d, --debug", "print additional logs and skip install script")
        .on("--help", () => {
            console.log();
            console.log(
                `  Only ${chalk.green("<project-directory>")} is required.`,
            );
            console.log();
            console.log(
                `  Provide a ${chalk.green
                    .bold`<project-directory>`} and you will be prompted to proceed.`,
            );
            console.log();
            console.log(
                `  If you want to use custom plugins. You need to provide a source.`,
            );
            console.log();
            console.log(`  A custom source can be one of:`);
            console.log(
                `  - a remote git repo: ${chalk.green(
                    "https://github.com/my-plugin-source.git",
                )}`,
            );
            console.log(
                `  - if your source is a git repo you can also define a custom branch in it: ${chalk.green(
                    "--branch canary or -b canary",
                )}`,
            );
            console.log(
                `  - if your source includes any presets, you can set them to prefill choices: ${chalk.green(
                    "--preset cool-stack or -o cool-stack",
                )}`,
            );
            console.log(
                `  - if you are feeling lucky, you can always try your chance with random selected choices: ${chalk.green(
                    "--lucky or -l",
                )}`,
            );
            console.log(
                `  - a local path relative to the current working directory: ${chalk.green(
                    "../my-source",
                )}`,
            );
            console.log();
        })
        .parse(process.argv);

    /**
     * Check for project-directory defined
     */
    const [projectDir] = program.args;

    if (projectDir === undefined) {
        console.error("Please specify the project directory:");
        console.log(
            `  ${chalk.cyan(program.name())} ${chalk.green(
                "<project-directory>",
            )}`,
        );
        console.log();
        console.log(
            `Run ${chalk.cyan(`${program.name()} --help`)} to see all options.`,
        );
        process.exit(1);
    }

    /**
     * get source path
     */
    const source = await get_source(program.source, program.branch);

    let { path: sourcePath } = source;
    const { error: sourceError } = source;

    if (sourceError) {
        console.error(`${chalk.bold`${sourceError}`}`);
        console.log(
            `Source can be a remote git repository or a local path. ${
                program.branch ? "Make sure your specified branch exists." : ""
            }`,
        );
        console.log();
        console.log("You provided:");
        console.log(`${chalk.blueBright(program.source)}`);
        console.log();
        console.log(
            `Run ${chalk.cyan(`${program.name()} --help`)} to see all options.`,
        );
        cleanupSync();
        process.exit(1);
    }

    let projectType = program.project;
    const isMultiType = await is_multi_type(sourcePath);

    /** handle presets, can either be partial or fully provided answers from `prompt.js > presets` */
    let presetAnswers: Record<string, string> | undefined = undefined;
    const selectedPreset = program.preset;
    const isLucky = program.lucky;

    if (selectedPreset && sourcePath && !isLucky) {
        const presets = await get_presets(sourcePath);

        const preset = presets.find((p) => p.name === selectedPreset);

        if (preset) {
            presetAnswers = preset.answers;
            projectType = preset.type;
        } else {
            console.log(
                `${chalk.bold`${selectedPreset}`} is not a valid preset.`,
            );
        }
    }

    const npmClient = await prompt_npm_cli();

    if (sourcePath && isMultiType) {
        // get project types
        const projectTypes = await get_project_types(sourcePath);

        const [
            finalSourcePath,
            selectedProjectType,
        ] = await prompt_project_types(sourcePath, projectTypes, projectType);

        sourcePath = finalSourcePath;
        projectType = selectedProjectType;
    }

    if (isLucky && sourcePath) {
        const promptsAndChoices = await get_prompts_and_choices(sourcePath);
        presetAnswers = get_random_answers(promptsAndChoices);
    }

    const withAnswers =
        presetAnswers && Object.keys(presetAnswers).length > 0
            ? true
            : undefined;

    const sao = new SAO({
        generator,
        outDir: projectDir,
        logLevel: program.debug ? 4 : 1,
        appName: projectDir,
        answers: withAnswers,
        extras: {
            debug: !!program.debug,
            projectType,
            npmClient,
            paths: {
                sourcePath,
            },
            presetAnswers,
        },
    } as Options);

    await sao.run().catch((err) => {
        console.log(`${program.name()} has encountered an error.`);
        console.log();
        console.log(`If you think this is caused by a bug. Please check out:`);
        console.log(`${chalk.blueBright(packageData.bugs.url)}`);
        console.log();
        console.error("ERROR", err);
        process.exit(1);
    });

    cleanupSync();
};

export default cli;
