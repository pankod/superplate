import prompts from "prompts";

import { BinaryHelper } from "@Helper/binary";

export const prompt_npm_cli = async (): Promise<{ client: string }> => {
    const pmQuestionChoises = [{ title: "Npm", value: "npm" }];
    const canUseYarn = BinaryHelper.CanUseYarn();
    const canUsePnpm = BinaryHelper.CanUsePnpm();

    if (canUseYarn) {
        pmQuestionChoises.push({ title: "Yarn", value: "yarn" });
    }

    if (canUsePnpm) {
        pmQuestionChoises.push({
            title: "pnpm"
                .split("")
                .map((v) =>
                    Math.round(Math.random())
                        ? v.toUpperCase()
                        : v.toLowerCase(),
                )
                .join(""),
            value: "pnpm",
        });
    }

    const { npmClient } = await prompts({
        type: "select",
        name: "npmClient",
        message: "Package manager:",
        choices: pmQuestionChoises,
    });

    return npmClient;
};
