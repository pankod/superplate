import chalk from "chalk";
import clear from "clear";
import path from "path";
import commander from "commander";
import { cleanupSync } from "temp";
import { SAO } from "sao";

import { get_source } from "@Helper";

const generator = path.resolve(__dirname, "./");
const templateDir = path.resolve(__dirname, "../template");

const cli = async (): Promise<void> => {
    clear();
    const program = commander
        .name("next-cli")
        .version("0.0.1")
        .arguments("<project-dir>")
        .usage(`${chalk.green("<project-dir>")} [options]`)
        .description("an example for next cli")
        .option(
            "--source <source-path>",
            "plugin source",
            "next-cli-prototype-core",
        )
        .on("--help", () => {
            console.log("\n");
            console.log(
                `Provide a ${chalk.green
                    .bold`<project-dir>`} and you will be prompted for plugins to use.`,
            );
            console.log(`\n`);
            console.log(
                `${chalk.blue
                    .bold`next-cli`} will create a project all bootstrapped with your plugins of choice.`,
            );
            console.log(`\n`);
            console.log(`Start developing ${chalk.bgRed` fast `}`);
        })
        .parse(process.argv);

    /**
     * Check for project-dir defined
     */
    const [projectDir] = program.args;

    if (projectDir === undefined) {
        console.log(projectDir);
        console.log("\n");
        console.log(
            `${chalk.bgRedBright
                .bold` ERR `} ${chalk.bold`You didn't provided a project-directory`}`,
        );
        console.log("\n");
        process.exit();
    }

    /**
     * get source path
     */
    const { path: sourcePath, error: sourceError } = await get_source(
        program.source,
    );

    if (sourceError) {
        console.log("\n");
        console.log(
            `${chalk.bgRedBright.bold` ERR `} ${chalk.bold`${sourceError}`}`,
        );
        console.log("\n");
        cleanupSync();
        process.exit();
    }

    const sao = new SAO({
        generator,
        outDir: projectDir,
        logLevel: 0,
        appName: projectDir,
        paths: {
            templateDir,
            sourcePath,
        },
    } as any);

    await sao
        .run()
        .then((e) => console.log(e))
        .catch((err) => {
            console.log(err);
            process.exit(1);
        });

    cleanupSync();
};

export default cli;
