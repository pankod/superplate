import { GitHelper } from "./";
import { promisify } from "util";

jest.mock("util", () => ({
    promisify: jest.fn(() => {
        throw new Error();
    }),
}));
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
        (promisify as any).mockImplementation(() =>
            jest
                .fn()
                .mockResolvedValue({ stdout: "git@github.com:mock/url.git" }),
        );

        const cloneAndPath = await GitHelper.CloneAndGetPath(
            "https://github.com/pankod/action-test",
        );

        expect(cloneAndPath).not.toBeFalsy();
    });

    it("invalid git url CloneAndGetPath", async () => {
        (promisify as any).mockImplementation(() => new Error());
        await expect(
            GitHelper.CloneAndGetPath("https://pankod.com"),
        ).rejects.toThrowError();
    });
});
