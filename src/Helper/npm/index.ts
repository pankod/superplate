import { BinaryHelper } from "@Helper";

export const get_potential_package_managers = (): Array<{
    message: string;
    name: string;
}> => {
    const pmQuestionChoises = [
        {
            message: "Npm",
            name: "npm",
            hint: "Dependencies will be installed via npm ",
        },
    ];
    const canUseYarn = BinaryHelper.CanUseYarn();
    const canUsePnpm = BinaryHelper.CanUsePnpm();
    if (canUseYarn) {
        pmQuestionChoises.push({
            message: "Yarn",
            name: "yarn",
            hint: "Dependencies will be installed via yarn",
        });
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
            hint: "Dependencies will be installed via pnpm",
        });
    }

    return pmQuestionChoises;
};
