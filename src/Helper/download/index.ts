import { mkdirSync } from "temp";
import got from "got";
import tar from "tar";
import { createWriteStream } from "fs";
import { Stream } from "stream";
import gitHubURLParser from "parse-github-url";

import { promisify } from "util";
import { join } from "path";

const pipeline = promisify(Stream.pipeline);
const TEMP_PREFIX = "superplate-core-plugins.temp";

export const DownloadHelper = {
    DownloadAndGetPath: async (path: string): Promise<string> => {
        try {
            const tempFolder = mkdirSync({
                dir: process.cwd(),
                prefix: ".",
            });
            const tempFile = join(tempFolder, `${TEMP_PREFIX}-${Date.now()}`);

            const { owner, name, branch } = gitHubURLParser(path);
            const url = `https://codeload.github.com/${owner}/${name}/tar.gz/${branch}`;
            await pipeline(got.stream(url), createWriteStream(tempFile));

            await tar.x({
                file: tempFile,
                cwd: tempFolder,
                strip: 1,
            });

            return tempFolder;
        } catch (e) {
            throw new Error(e instanceof Error ? e.message : (e as string));
        }
    },
};
