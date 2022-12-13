import { promisify } from "util";
import { get_source } from "./";
jest.mock("util", () => ({
    promisify: jest.fn(),
    inherits: () => ({
        custom: {},
    }),
    inspect: () => ({}),
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

        const source = await get_source("superplate-core-plugins");
        expect(source.error).toBe(undefined);
    });
});
