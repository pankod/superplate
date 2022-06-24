import { GitHelper } from "./";

describe("Git Helper", () => {
    it("not found git url IsRepoExist", async () => {
        const isRepoExist = await GitHelper.IsRepoExist(
            "http://github.com/alibaba/ciftligi",
        );

        expect(isRepoExist.error).toBe("Source repository not found.");
    });

    it("not valid git url IsRepoExist", async () => {
        const isRepoExist = await GitHelper.IsRepoExist("pankod");

        expect(isRepoExist.error).toBe("Source path not valid");
    });

    it("valid git url CloneAndGetPath", async () => {
        const cloneAndPath = GitHelper.CloneAndGetPath(
            "https://github.com/pankod/action-test",
        );

        await expect(cloneAndPath).resolves.not.toBeUndefined();
    });

    it("invalid git url CloneAndGetPath", async () => {
        const cloneAndPath = GitHelper.CloneAndGetPath("https://pankod.com");

        await expect(cloneAndPath).rejects.toThrowError();
    });
});
