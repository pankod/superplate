import { BinaryHelper } from "@Helper/binary";

export const get_potential_package_managers = (): Array<{
    message: string;
    name: string;
}> => {
    const pmQuestionChoises = [{ message: "Npm", name: "npm" }];
    const canUseYarn = BinaryHelper.CanUseYarn();
    const canUsePnpm = BinaryHelper.CanUsePnpm();
    if (canUseYarn) {
        pmQuestionChoises.push({ message: "Yarn", name: "yarn" });
    }

    if (canUsePnpm) {
        pmQuestionChoises.push({
            message: "pnpm"
                .split("")
                .map((v) =>
                    Math.round(Math.random())
                        ? v.toUpperCase()
                        : v.toLowerCase(),
                )
                .join(""),
            name: "pnpm",
        });
    }

    return pmQuestionChoises;
};
