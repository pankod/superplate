import { access } from "fs";
import { promisify } from "util";

export const FSHelper = {
    IsPathExists: async (path: string): Promise<boolean> => {
        try {
            await promisify(access)(path);
            return true;
        } catch (e) {
            return false;
        }
    },
};
