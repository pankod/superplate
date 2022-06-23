import path from "path";

export type ProjectPrompt = {
    name: string;
    type: "select";
    choices: { name: string; message: string }[];
    skip?: ({ answers }: { answers: Record<string, string> }) => boolean;
};

export const get_prompts_and_choices = async (
    source: string,
): Promise<ProjectPrompt[]> => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const sourcePrompts = require(path.resolve(source, "prompt.js"));

        return (sourcePrompts.prompts ?? []) as ProjectPrompt[];
    } catch (e) {
        return [];
    }
};

export const get_random_answer = (
    projectPrompt: ProjectPrompt,
    currentAnswers: Record<string, string>,
): [key: string, value: string] | undefined => {
    if (projectPrompt.skip && projectPrompt.skip({ answers: currentAnswers })) {
        return undefined;
    }

    const randomIndex = Math.floor(
        Math.random() * projectPrompt.choices.length,
    );

    return [projectPrompt.name, projectPrompt.choices[randomIndex].name];
};

export const get_random_answers = (
    projectPrompts: ProjectPrompt[],
): Record<string, string> => {
    const answers: Record<string, string> = {};

    projectPrompts.forEach((projectPrompt) => {
        const [key, value] = get_random_answer(projectPrompt, answers) ?? [];
        if (key && value) {
            answers[key] = value;
        }
    });

    return answers;
};
