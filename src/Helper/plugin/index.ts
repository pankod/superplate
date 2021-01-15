import path from "path";

type ExtendType = {
    _app: {
        import: string[];
        inner: string[];
        wrapper: string[];
    };
    _document: {
        import: string[];
        initialProps: string[];
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
        initialProps: [],
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
            ["_app", "_document"].forEach((fileKey) => {
                (fileKey === "_app"
                    ? ["import", "inner", "wrapper"]
                    : ["import", "initialProps"]
                ).forEach((key) => {
                    if (
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        (pluginExtends as Record<string, any>)?.[fileKey]?.[key]
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
