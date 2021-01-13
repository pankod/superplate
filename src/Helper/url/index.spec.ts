import { UrlHelper } from "./";

describe("Url Helper", () => {
    it("incorrect url", async () => {
        const isUrl = UrlHelper.IsUrl("alibaba");
        expect(isUrl).toBeFalsy();
    });

    it("correct url", async () => {
        const isUrl = UrlHelper.IsUrl("https://pankod.com");
        expect(isUrl).toBeTruthy();
    });

    it("create git url without .git extension", async () => {
        const gitUrl = UrlHelper.GetGitUrl("https://pankod.com");
        expect(gitUrl).toBe("https://pankod.com.git");
    });

    it("create git url with .git extension", async () => {
        const gitUrl = UrlHelper.GetGitUrl("https://pankod.com.git");
        expect(gitUrl).toBe("https://pankod.com.git");
    });
});
