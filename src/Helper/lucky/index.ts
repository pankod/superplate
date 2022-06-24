import path from "path";

export type ProjectPrompt = {
    name: string;
    type: "select";
    choices: { name?: string; message: string; value?: string }[];
    default?: string;
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
): [key: string, value: string | undefined] | undefined => {
    if (projectPrompt.skip && projectPrompt.skip({ answers: currentAnswers })) {
        return undefined;
    }

    const randomIndex = Math.floor(
        Math.random() * projectPrompt.choices.length,
    );

    const { name, value } = projectPrompt.choices[randomIndex];

    return [projectPrompt.name, name ?? value ?? undefined];
};

export const get_random_answers = (
    projectPrompts: ProjectPrompt[],
): Record<string, string> => {
    const answers: Record<string, string> = {};

    for (const prompt of projectPrompts) {
        const [key, value] = get_random_answer(prompt, answers) ?? [];
        if (key && value) {
            answers[key] = value;
        }
    }

    return { ...answers };
};
