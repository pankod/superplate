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
    CanUseDirAsName: (projectDir: string): boolean => {
        // eslint-disable-next-line no-useless-escape
        const invalidChars = /[\\\/,.]/;
        return !invalidChars.test(projectDir);
    },
};
