import { promisify } from "util";
import { get_source } from "./";
jest.mock("util", () => ({
    promisify: jest.fn(() => {
        throw new Error();
    }),
}));
describe("Source Helper", () => {
    it("incorrect source url/path", async () => {
        const source = await get_source("alibaba");
        expect(source.error).toBe("Source path not valid");
    });

    it("incorrect source url/path", async () => {
        const source = await get_source("https://github.com/alibaba/ciftligi");
        expect(source.error).toBe("Source repository not found.");
    });

    it("correct source url", async () => {
        (promisify as any).mockImplementation(() => jest.fn());

        const source = await get_source("next-cli-prototype-core");
        expect(source.error).toBe(undefined);
    });
});
