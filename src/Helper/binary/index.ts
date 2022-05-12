import { execSync } from "child_process";

export const BinaryHelper = {
    CanUseYarn: (): boolean => {
        try {
            execSync("yarn --version", { stdio: "ignore" });
            return true;
        } catch (e) {
            return false;
        }
    },
    CanUsePnpm: (): boolean => {
        try {
            execSync("pnpm --version", { stdio: "ignore" });
            return true;
        } catch (e) {
            return false;
        }
    },
};
