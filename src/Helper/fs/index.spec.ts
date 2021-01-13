import { FSHelper } from "./";

describe("FS Helper", () => {
    it("correct path exist", async () => {
        const isPathExists = await FSHelper.IsPathExists(".");
        expect(isPathExists).toBeTruthy();
    });

    it("incorrect path exist", async () => {
        const isPathExists = await FSHelper.IsPathExists("../pankod");
        expect(isPathExists).toBeFalsy();
    });
});
