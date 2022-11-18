import { prompt } from "enquirer";

export const prompt_telemetry = async (): Promise<{
    telemetry: "yes" | "no";
}> => {
    const result = await prompt({
        type: "select",
        name: "telemetry",
        message:
            "Would you mind sending us your choices so that we can improve superplate?",
        choices: [
            {
                message: "Share my choices anonymously ❤️",
                name: "yes",
            },
            { message: "Don't share any information", name: "no" },
        ],
    });

    return result as { telemetry: "yes" | "no" };
};
