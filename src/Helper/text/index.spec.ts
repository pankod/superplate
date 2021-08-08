import { TextHelper } from "./";

describe("Text Helper", () => {
    it("capitalize text", async () => {
        const capitalizedText = await TextHelper.CapitalizeFirstLetter(
            "superplate",
        );
        expect(capitalizedText).toBe("Superplate");
    });
});
