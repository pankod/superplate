import { promisify } from "util";
import { get_source, sort_project_types } from "./";

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

    it("Sort project types", async () => {
        const cases = [
            {
                input: [
                    { title: "Refine React", value: "refine-react" },
                    { title: "Next.js", value: "nextjs" },
                    { title: "React", value: "react" },
                    { title: "Refine Vite", value: "refine-vite" },
                    { title: "Refine Next.js", value: "refine-nextjs" },
                    { title: "Refine Remix", value: "refine-remix" },
                ],
                expectedOutput: [
                    { title: "Refine Vite", value: "refine-vite" },
                    { title: "Refine Next.js", value: "refine-nextjs" },
                    { title: "Refine Remix", value: "refine-remix" },
                    { title: "Refine React", value: "refine-react" },
                    { title: "React", value: "react" },
                    { title: "Next.js", value: "nextjs" },
                ],
            },
            {
                input: [
                    { title: "Next.js", value: "nextjs" },
                    { title: "Refine React", value: "refine-react" },
                    { title: "Refine Next.js", value: "refine-nextjs" },
                    { title: "Refine Remix", value: "refine-remix" },
                    { title: "React", value: "react" },
                    { title: "Refine Vite", value: "refine-vite" },
                ],
                expectedOutput: [
                    { title: "Refine Vite", value: "refine-vite" },
                    { title: "Refine Next.js", value: "refine-nextjs" },
                    { title: "Refine Remix", value: "refine-remix" },
                    { title: "Refine React", value: "refine-react" },
                    { title: "React", value: "react" },
                    { title: "Next.js", value: "nextjs" },
                ],
            },
            {
                input: [
                    { title: "Refine React", value: "refine-react" },
                    { title: "Refine Next.js", value: "refine-nextjs" },
                    { title: "Refine Remix", value: "refine-remix" },
                    { title: "Refine Vite", value: "refine-vite" },
                ],
                expectedOutput: [
                    { title: "Refine Vite", value: "refine-vite" },
                    { title: "Refine Next.js", value: "refine-nextjs" },
                    { title: "Refine Remix", value: "refine-remix" },
                    { title: "Refine React", value: "refine-react" },
                ],
            },
            {
                input: [],
                expectedOutput: [],
            },
        ];

        cases.forEach((c) => {
            expect(sort_project_types(c.input)).toEqual(c.expectedOutput);
        });
    });
});
