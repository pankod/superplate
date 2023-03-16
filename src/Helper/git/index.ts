import { UrlHelper } from "@Helper";
import { exec } from "child_process";
import { mkdir } from "temp";
import { promisify } from "util";

export const GitHelper = {
    IsRepoExist: async (
        path: string,
    ): Promise<{ exists: boolean; error?: string }> => {
        if (UrlHelper.IsUrl(path)) {
            try {
                await promisify(exec)(
                    `git ls-remote ${UrlHelper.GetGitUrl(path)}`,
                );
                return { exists: true };
            } catch (e) {
                return { exists: false, error: "Source repository not found." };
            }
        }
        return { exists: false, error: "Source path not valid" };
    },
    CloneAndGetPath: async (path: string, branch?: string): Promise<string> => {
        try {
            const tempInfo = await promisify(mkdir)("");
            await promisify(exec)(
                `git clone --depth 1 ${
                    branch ? `--branch ${branch}` : ""
                } ${UrlHelper.GetGitUrl(path)} "${tempInfo}"`,
            );
            return tempInfo;
        } catch (e) {
            throw new Error(e instanceof Error ? e.message : (e as string));
        }
    },
};
