import path from "path";

type ExtendType = {
    _app: {
        import: string[];
        inner: string[];
        wrapper: string[];
    };
    _document: {
        import: string[];
        inner: string[];
        wrapper: string[];
    };
    [key: string]: {
        [key: string]: string[];
    };
};

export const extendBase: Required<ExtendType> = {
    _app: {
        import: [],
        inner: [],
        wrapper: [],
    },
    _document: {
        import: [],
        inner: [],
        wrapper: [],
    },
};

export const getPluginsArray: (answers: Record<string, any>) => string[] = (
    answers,
) => {
    const selectedPlugins = (Object.values(answers).reduce((acc, curr) => {
        if (typeof curr === "string") return [...acc, curr];
        if (Array.isArray(curr)) return [...acc, ...curr];
    }, []) as string[]).filter((value: string) => value !== "none");

    return selectedPlugins;
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
            ["_app", "_document"].forEach((fileKey) => {
                ["import", "inner", "wrapper"].forEach((key) => {
                    if (
                        pluginExtends?.[fileKey as "_app" | "_document"]?.[
                            key as "import" | "inner" | "wrapper"
                        ]
                    ) {
                        if (key !== "wrapper") {
                            baseExtend[fileKey][key] = [
                                ...baseExtend[fileKey][key],
                                ...pluginExtends[fileKey][key],
                            ];
                        } else {
                            const length = (baseExtend[fileKey][
                                key
                            ] as string[]).length;
                            const half = Math.floor(length / 2);
                            const firstHalf = (baseExtend[fileKey][
                                key
                            ] as string[]).slice(0, half);
                            const secondHalf = (baseExtend[fileKey][
                                key
                            ] as string[]).slice(half, length);
                            baseExtend[fileKey][key] = [
                                ...firstHalf,
                                ...pluginExtends[fileKey][key],
                                ...secondHalf,
                            ];
                        }
                    }
                });
            });
            // for (const fileKey in Object.keys(pluginExtends)) {
            //     for (const key in Object.keys(
            //         pluginExtends[fileKey as string],
            //     )) {
            //     }
            // }
        }
    });

    return baseExtend;
};
