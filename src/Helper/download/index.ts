import { promisify } from "util";
import { exec } from "child_process";
import { mkdir } from "temp";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ghdownload from "github-download";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import gitHubURLParser from "parse-github-url";

export const DownloadHelper = {
    DownloadAndGetPath: async (path: string): Promise<string> => {
        try {
            const tempInfo = await promisify(mkdir)("");

            await new Promise((resolve, reject) => {
                const { owner, name, branch } = gitHubURLParser(path);
                ghdownload(
                    {
                        user: owner,
                        repo: name,
                        ref: branch,
                    },
                    tempInfo,
                ).on("end", function () {
                    exec("tree", function (err, stdout, sderr) {
                        resolve({ path: tempInfo });
                    });
                });
            });
            return tempInfo;
        } catch (e) {
            throw new Error(e instanceof Error ? e.message : (e as string));
        }
    },
};
