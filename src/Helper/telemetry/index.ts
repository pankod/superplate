import { prompt } from "enquirer";

export const prompt_telemetry = async (): Promise<{
    telemetry: "yes" | "no";
}> => {
    const result = await prompt({
        type: "select",
        name: "telemetry",
        message: "Would you like to share your choices with us anonymously?",
        choices: [
            {
                message: "I want to share anonymously! Thank you! ❤️",
                name: "yes",
            },
            { message: "No", name: "no" },
        ],
    });

    return result as { telemetry: "yes" | "no" };
};
