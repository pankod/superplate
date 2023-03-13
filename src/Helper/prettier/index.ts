import fs from "fs";
import path from "path";
import { format } from "prettier";

export const formatFiles = (dirPath: string): void => {
    const resolvedPath = path.resolve(dirPath);

    const dir = fs.readdirSync(resolvedPath);

    const subDirs = dir.filter((d) =>
        fs.lstatSync(path.join(resolvedPath, d)).isDirectory(),
    );
    const files = dir.filter((d) =>
        fs.lstatSync(path.join(resolvedPath, d)).isFile(),
    );

    files.map((f) => {
        const filePath = path.join(resolvedPath, f);

        const fileContent = fs.readFileSync(filePath).toString();

        try {
            const formattedFile = format(fileContent, {
                filepath: filePath,
            });

            fs.writeFileSync(filePath, formattedFile);
        } catch (e) {
            // Ignore files that can't be formatted like .gitignore
        }
    });

    subDirs.map((d) => {
        return formatFiles(path.join(resolvedPath, d));
    });
};
