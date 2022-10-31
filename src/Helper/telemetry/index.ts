import prompts from "prompts";

export const prompt_telemetry = async (): Promise<{
    telemetry: "yes" | "no";
}> => {
    const result = await prompts({
        type: "select",
        name: "telemetry",
        message: "Would you like to share your choices with us anonymously?",
        choices: [
            {
                title: "I want to share anonymously! Thank you! ❤️",
                value: "yes",
            },
            { title: "No", value: "no" },
        ],
    });

    return result;
};
