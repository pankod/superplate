import { mergeWithUnionArray } from "@Helper";
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

type Answer = string | string[] | boolean | undefined;
type AnswersType = Record<string, Answer>;

type IgnoreType = {
    plugin?: string[];
    when: (answers: Record<string, Answer>) => boolean;
    pattern: string[];
};

type IgnoreHandlerFn = (
    ignores: IgnoreType[],
    answers: AnswersType,
    plugin: string,
) => Record<string, false>;

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
        .filter((value: string) => value !== "none" && value !== "no");
};

export const getExtend: (
    pluginPath: string,
    pluginName: string,
) => { extend: (answers: Record<string, Answer>) => ExtendType } | undefined = (
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
    answers: Record<string, Answer>,
) => ExtendType = (base, plugins, sourcePath, answers) => {
    const merged = mergeWithUnionArray(
        base,
        ...plugins.map((plugin: string) => {
            const pluginExtendFile = getExtend(sourcePath, plugin);
            if (pluginExtendFile) {
                const pluginExtends = pluginExtendFile.extend(answers);
                return pluginExtends;
            }
            return {};
        }),
    );

    return merged as ExtendType;
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
