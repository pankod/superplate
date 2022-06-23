/**
 *
 * get_source will return path for plugins
 * source can be url - relative local path or "superplate"
 *
 */
import ora from "ora";
import chalk from "chalk";

import { GitHelper, FSHelper } from "@Helper";
import prompts, { Choice } from "prompts";

type SourceResponse = { path?: string; error?: string };
type GetSourceFn = (
    source: string | undefined,
    branch?: string,
) => Promise<SourceResponse>;

export const get_source: GetSourceFn = async (source, branch) => {
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

export const get_project_types = async (source: string): Promise<Choice[]> => {
    const projectTypes: Choice[] = [];

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
    types: Choice[],
    typeFromArgs?: string,
): Promise<[projectTypePath: string, projectType: string]> => {
    let projectType = "";

    if (
        types.find((p) => p.title === typeFromArgs) &&
        typeof typeFromArgs === "string"
    ) {
        projectType = typeFromArgs;
    } else {
        const { projectType: projectTypeFromPrompts } = await prompts({
            type: "select",
            name: "projectType",
            message: "Select your project type",
            choices: types,
        });

        projectType = projectTypeFromPrompts;
    }

    return [`${source}/${projectType}`, projectType];
};
