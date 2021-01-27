import merge from "deepmerge";
import path from "path";

interface ExtendType extends Record<string, unknown> {
    _app: {
        import: string[];
        inner: string[];
        wrapper: [string, string][];
    };
    _document: {
        import: string[];
        initialProps: string[];
    };
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
};

type IgnoreType = {
    plugin?: string[];
    when: (answers: Record<string, string | string[]>) => boolean;
    pattern: string[];
};

type AnswersType = Record<string, string | string[]>;

type IgnoreHandlerFn = (
    ignores: IgnoreType[],
    answers: AnswersType,
    plugin: string,
) => Record<string, false>;

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
) => ExtendType = (base, plugins, sourcePath) => {
    const merged = merge.all<ExtendType>([
        base,
        ...plugins.map((plugin: string) => {
            const pluginExtendFile = getExtend(sourcePath, plugin);
            if (pluginExtendFile) {
                const pluginExtends = pluginExtendFile.extend(plugins);
                return pluginExtends;
            }
            return {};
        }),
    ]);

    return merged;
};

export const handleIgnore: IgnoreHandlerFn = (
    ignores: IgnoreType[],
    answers,
    plugin,
) => {
    const filters: ReturnType<IgnoreHandlerFn> = {};

    ignores.forEach((ignore) => {
        if (
            !!ignore.plugin === false ||
            (!!ignore.plugin && ignore.plugin.includes(plugin))
        ) {
            const condition = ignore.when?.(answers);
            if (condition) {
                ignore.pattern.forEach((pattern) => {
                    filters[pattern] = false;
                });
            }
        }
    });

    return filters;
};
