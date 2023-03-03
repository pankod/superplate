/**
 *
 * get_source will return path for plugins
 * source can be url - relative local path or "superplate"
 *
 */
import ora from "ora";
import chalk from "chalk";
import { prompt } from "enquirer";

import { GitHelper, FSHelper, HumanizeChoices, DownloadHelper } from "@Helper";

type SourceResponse = { path?: string; error?: string };
type GetSourceFn = (
    source: string | undefined,
    branch?: string,
    downloadType?: "zip" | "git",
) => Promise<SourceResponse>;

export const get_source: GetSourceFn = async (source, branch, downloadType) => {
    /**
     * Replace path if default
     */
    const sourceSpinner = ora(
        `Checking provided source ${chalk.bold`"${source}${
            branch ? ` - ${branch}` : ""
        }"`}`,
    );
    sourceSpinner.start();

    const sourcePath =
        source ?? "https://github.com/pankod/superplate-core-plugins.git";

    const isPathExists = await FSHelper.IsPathExists(sourcePath);
    if (isPathExists) {
        /**
         * check local path
         */
        sourceSpinner.succeed("Found local source.");
        return { path: sourcePath };
    } else if (downloadType === "zip") {
        sourceSpinner.text = "Checking remote source...";
        sourceSpinner.text = "Remote source found. Downloading...";

        try {
            const cloneResponse = await DownloadHelper.DownloadAndGetPath(
                sourcePath,
                branch,
            );
            if (cloneResponse) {
                sourceSpinner.succeed("Downloaded remote source successfully.");
                return { path: cloneResponse };
            }
            sourceSpinner.fail("Could not retrieve source repository.");

            return { error: "Could not retrieve source repository." };
        } catch (e) {
            sourceSpinner.fail("Could not retrieve source repository.");

            sourceSpinner.text = "Try to use git instead of zip...";
            return { error: "Could not retrieve source repository." };
        }
    } else {
        /**
         * Check repo exists
         * clone and return path if exists
         */
        sourceSpinner.text = "Checking remote source...";
        const repoStatus = await GitHelper.IsRepoExist(sourcePath);
        if (repoStatus.exists === true) {
            sourceSpinner.text = "Remote source found. Cloning...";
            try {
                const cloneResponse = await GitHelper.CloneAndGetPath(
                    sourcePath,
                    branch,
                );
                if (cloneResponse) {
                    sourceSpinner.succeed("Cloned remote source successfully.");
                    return { path: cloneResponse };
                }
                sourceSpinner.fail("Could not retrieve source repository.");
                return { error: "Could not retrieve source repository." };
            } catch (e) {
                `${e}`;
                sourceSpinner.fail("Could not retrieve source repository.");
                return { error: "Could not retrieve source repository." };
            }
        } else {
            sourceSpinner.fail("Could not found source repository.");
            return { error: repoStatus.error };
        }
    }
};

export const is_multi_type = async (
    source: string | undefined,
): Promise<boolean> => {
    if (source) {
        const checkRootPrompt = await FSHelper.IsPathExists(
            `${source}/prompt.js`,
        );

        return !checkRootPrompt;
    }
    return false;
};

export const get_project_types = async (source: string): Promise<any[]> => {
    const projectTypes: any[] = [];

    // get project types => react,nextjs,refine ...etc
    const files = await FSHelper.ReadDir(source);

    for (const file of files) {
        const existPromptFile = await FSHelper.IsPathExists(
            `${source}/${file}/prompt.js`,
        );

        if (existPromptFile) {
            projectTypes.push({
                title: file,
                value: file,
            });
        }
    }

    return projectTypes;
};

export const prompt_project_types = async (
    source: string,
    types: any[],
    typeFromArgs?: string,
): Promise<[projectTypePath: string, projectType: string]> => {
    let projectType = "";

    if (
        types.find((p) => p.title === typeFromArgs) &&
        typeof typeFromArgs === "string"
    ) {
        projectType = typeFromArgs;
    } else {
        const filteredWithContains = types.filter((p) =>
            p.title.includes(typeFromArgs ?? ""),
        );
        const response = await prompt({
            type: "select",
            name: "projectType",
            message: "Choose a project template",
            choices: (filteredWithContains.length > 0
                ? filteredWithContains
                : types
            )
                .map((p) => HumanizeChoices.get(p.title))
                .map((p) => ({
                    type: "select",
                    name: p.value,
                    message: p.title,
                    hint: p.description,
                })),
        });

        projectType = (response as { projectType: string }).projectType;
    }

    return [`${source}/${projectType}`, projectType];
};
