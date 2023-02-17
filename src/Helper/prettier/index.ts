import path from "path";
import fs from "fs";
import { format } from "prettier";

export const formatFiles = (dirPath: string) => {
    const resolvedPath = path.resolve(dirPath);

    const dir = fs.readdirSync(resolvedPath);

    const subDirs = dir.filter((d) => d.split(".").length === 1);
    const files = dir.filter((d) => d.split(".").length > 1);

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

// formatFiles(path.join(process.cwd(), "tmp", "writhing-cheap", "src"));
