import path from "path";

interface ExtendType {
    _app: {
        import: string[];
        inner: string[];
        wrapper: string[];
    };
    _document: {
        import: string[];
        initialProps: string[];
    };
    testSetup:
        | {
              import: string[];
              inner: string[];
              wrapper: string[];
          }
        | undefined
        | boolean;
}

export const extendBase: Required<ExtendType> = {
    _app: {
        import: [],
        inner: [],
        wrapper: [],
    },
    _document: {
        import: [],
        initialProps: [],
    },
    testSetup: {
        import: [],
        inner: [],
        wrapper: [],
    },
};

type Answer = string | string[] | boolean | undefined;

export const getPluginsArray: (answers: Record<string, Answer>) => string[] = (
    answers,
) => {
    return Object.entries(answers)
        .reduce((acc: string[], [key, value]) => {
            if (typeof value === "boolean" && value) return [...acc, key];
            if (typeof value === "string") return [...(acc as string[]), value];
            if (Array.isArray(value)) return [...(acc as string[]), ...value];
            return acc;
        }, [])
        .filter((value: string) => value !== "none");
};

export const getExtend: (
    pluginPath: string,
    pluginName: string,
) => { extend: (plugins: string[]) => ExtendType } | undefined = (
    pluginPath,
    pluginName,
) => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const pluginExtend = require(path.join(
            pluginPath,
            "plugins",
            pluginName,
            "extend.js",
        ));

        return pluginExtend;
    } catch (e) {
        return undefined;
    }
};

export const concatExtend: (
    base: ExtendType,
    plugins: string[],
    sourcePath: string,
) => Record<string, unknown> = (base, plugins, sourcePath) => {
    const baseExtend = { ...base };

    plugins.forEach((plugin: string) => {
        const pluginExtendFile = getExtend(sourcePath, plugin);

        if (pluginExtendFile) {
            const pluginExtends = pluginExtendFile.extend(plugins);

            const { _app, _document, testSetup } = pluginExtends;

            if (_app) {
                baseExtend._app.import = [
                    ...baseExtend._app.import,
                    ...(_app.import ?? []),
                ];

                baseExtend._app.inner = [
                    ...baseExtend._app.inner,
                    ...(_app.inner ?? []),
                ];

                const insertIndex = Math.ceil(
                    baseExtend._app.wrapper.length / 2,
                );

                baseExtend._app.wrapper.splice(
                    insertIndex,
                    0,
                    ...(_app.wrapper ?? []),
                );

                if (typeof testSetup === "undefined" || testSetup === true) {
                    // use _app extend for tests
                    if (typeof baseExtend.testSetup === "object") {
                        baseExtend.testSetup.import = [
                            ...baseExtend.testSetup.import,
                            ...(_app.import ?? []),
                        ];
                        baseExtend.testSetup.inner = [
                            ...baseExtend.testSetup.inner,
                            ...(_app.inner ?? []),
                        ];
                        const testInsertIndex = Math.ceil(
                            baseExtend.testSetup.wrapper.length / 2,
                        );
                        baseExtend.testSetup.wrapper.splice(
                            testInsertIndex,
                            0,
                            ...(_app.wrapper ?? []),
                        );
                    }
                }
            }
            if (_document) {
                baseExtend._document.import = [
                    ...baseExtend._document.import,
                    ...(_document.import ?? []),
                ];

                baseExtend._document.initialProps = [
                    ...baseExtend._document.initialProps,
                    ...(_document.initialProps ?? []),
                ];
            }
            if (typeof testSetup === "object") {
                // use custom testSetup extend
                if (typeof baseExtend.testSetup === "object") {
                    baseExtend.testSetup.import = [
                        ...baseExtend.testSetup.import,
                        ...(testSetup.import ?? []),
                    ];

                    baseExtend.testSetup.inner = [
                        ...baseExtend.testSetup.inner,
                        ...(testSetup.inner ?? []),
                    ];

                    const insertIndex = Math.ceil(
                        baseExtend.testSetup.wrapper.length / 2,
                    );

                    baseExtend.testSetup.wrapper.splice(
                        insertIndex,
                        0,
                        ...(testSetup.wrapper ?? []),
                    );
                }
            }
        }
    });

    return baseExtend;
};
