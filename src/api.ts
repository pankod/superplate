import path from "path";
import { Options, SAO } from "sao";

export interface IPreset {
    name: string;
    type: string;
    answers: Record<string, string>;
}

const generator = path.resolve(__dirname, "./");

export const api = async (
    applicationName: string,
    outDir: string,
    sourcePath: string,
    preset: IPreset,
): Promise<void> => {
    const sao = new SAO({
        generator,
        outDir,
        logLevel: 4,
        appName: applicationName,
        answers: true,
        extras: {
            apiMode: true,
            debug: false,
            projectType: preset.type,
            paths: {
                sourcePath,
            },
            presetAnswers: preset.answers,
        },
    } as Options);

    await sao.run().catch((err) => {
        console.error("Error happened", err);
    });
};
