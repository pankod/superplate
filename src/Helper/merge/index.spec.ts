import { mergeWithUnionArray } from "@Helper";

const bases = {
    babel: {
        presets: ["next/babel"],
    },
    package: {
        name: "test-refine",
        version: "0.1.0",
        private: true,
        scripts: {
            dev: "next dev",
            build: "next build",
            start: "next start",
        },
        dependencies: {
            next: "10.2.0",
            react: "17.0.2",
            "react-dom": "17.0.2",
            "next-compose-plugins": "^2.2.1",
        },
        devDependencies: {
            "@types/node": "^14.14.13",
            "@types/react": "^17.0.0",
            "@types/react-dom": "^17.0.0",
            typescript: "^4.1.3",
        },
    },
    extend: {
        _app: {
            refineImports: [],
            import: [],
            innerHooks: [],
            inner: [],
            refineProps: [],
        },
    },
};

const plugins = [
    {
        babelrc: {
            presets: ["next/babel"],
            plugins: [["styled-components", { ssr: true }]],
        },
        extend: {
            _app: {
                refineProps: [
                    "Title={Title}",
                    "Header={Header}",
                    "Sider={Sider}",
                    "Footer={Footer}",
                    "Layout={Layout}",
                    "OffLayoutArea={OffLayoutArea}",
                ],
                import: [
                    `import {Title, Header, Sider, Footer, Layout, OffLayoutArea} from "components"`,
                ],
            },
        },
    },
    {
        package: {
            scripts: {
                "apollo:download-schema":
                    "apollo client:download-schema schema.graphql",
                "apollo:generate-types":
                    "rm -rf __generated__ && apollo client:codegen --target typescript --outputFlat",
                "apollo:sync":
                    "npm run apollo:download-schema && npm run apollo:generate-types",
            },
            dependencies: {
                "@apollo/client": "^3.3.7",
                graphql: "^15.4.0",
            },
            devDependencies: {
                apollo: "^2.32.1",
            },
        },
        extend: {
            _app: {
                import: [`import { useTranslation } from "react-i18next";`],
                innerHooks: [`const { t, i18n } = useTranslation();`],
                inner: [
                    `
                    const i18nProvider = {
                        translate: (key: string, params: object) => t(key, params),
                        changeLocale: (lang: string) => i18n.changeLanguage(lang),
                        getLocale: () => i18n.language,
                    };
                    `,
                ],
                refineProps: ["i18nProvider={i18nProvider}", "Header={Header}"],
            },
        },
    },
    {
        package: {
            dependencies: {
                "@chakra-ui/react": "^1.1.4",
                "@emotion/react": "^11.1.4",
                "@emotion/styled": "^11.0.0",
                "framer-motion": "^3.2.1",
            },
        },
    },
    {
        babelrc: { presets: ["next/babel"] },
    },
];

describe("Merge Helper", () => {
    it("merges babelrc from plugins successfully", () => {
        const mergedBabelrc = mergeWithUnionArray(
            bases.babel,
            ...plugins.map((p) => p.babelrc ?? {}),
        );

        expect(mergedBabelrc).toEqual({
            presets: ["next/babel"],
            plugins: [["styled-components", { ssr: true }]],
        });
    });

    it("merges package.json from plugins successfully", () => {
        const mergedPackages = mergeWithUnionArray(
            bases.package,
            ...plugins.map((p) => p.package ?? {}),
        );

        expect(mergedPackages).toEqual({
            name: "test-refine",
            version: "0.1.0",
            private: true,
            scripts: {
                dev: "next dev",
                build: "next build",
                start: "next start",
                "apollo:download-schema":
                    "apollo client:download-schema schema.graphql",
                "apollo:generate-types":
                    "rm -rf __generated__ && apollo client:codegen --target typescript --outputFlat",
                "apollo:sync":
                    "npm run apollo:download-schema && npm run apollo:generate-types",
            },
            dependencies: {
                next: "10.2.0",
                react: "17.0.2",
                "react-dom": "17.0.2",
                "next-compose-plugins": "^2.2.1",
                "@chakra-ui/react": "^1.1.4",
                "@emotion/react": "^11.1.4",
                "@emotion/styled": "^11.0.0",
                "framer-motion": "^3.2.1",
                "@apollo/client": "^3.3.7",
                graphql: "^15.4.0",
            },
            devDependencies: {
                "@types/node": "^14.14.13",
                "@types/react": "^17.0.0",
                "@types/react-dom": "^17.0.0",
                typescript: "^4.1.3",
                apollo: "^2.32.1",
            },
        });
    });

    it("merges extend.js from plugins successfully", () => {
        const mergedExtend = mergeWithUnionArray(
            bases.extend,
            ...plugins.map((p) => p.extend ?? {}),
        );

        expect(mergedExtend).toMatchInlineSnapshot(`
            Object {
              "_app": Object {
                "import": Array [
                  "import {Title, Header, Sider, Footer, Layout, OffLayoutArea} from \\"components\\"",
                  "import { useTranslation } from \\"react-i18next\\";",
                ],
                "inner": Array [
                  "
                                const i18nProvider = {
                                    translate: (key: string, params: object) => t(key, params),
                                    changeLocale: (lang: string) => i18n.changeLanguage(lang),
                                    getLocale: () => i18n.language,
                                };
                                ",
                ],
                "innerHooks": Array [
                  "const { t, i18n } = useTranslation();",
                ],
                "refineImports": Array [],
                "refineProps": Array [
                  "Title={Title}",
                  "Header={Header}",
                  "Sider={Sider}",
                  "Footer={Footer}",
                  "Layout={Layout}",
                  "OffLayoutArea={OffLayoutArea}",
                  "i18nProvider={i18nProvider}",
                ],
              },
            }
        `);
    });
});
