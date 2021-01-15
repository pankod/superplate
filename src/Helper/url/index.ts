import { isUri } from "valid-url";

export const UrlHelper = {
    IsUrl: (path: string): boolean => {
        return !!isUri(path);
    },
    GetGitUrl: (path: string): string => {
        if (path.slice(-4) === ".git") return path;
        return path + ".git";
    },
};
