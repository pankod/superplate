import { BinaryHelper } from "./";

describe("Binary Helper", () => {
    it("has CanUseYarn function", async () => {
        expect(typeof BinaryHelper.CanUseYarn).toBe("function");
    });
});
