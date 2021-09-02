import path from "path";
import mergeWith from "lodash/mergeWith";
import isArray from "lodash/isArray";
import union from "lodash/union";

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
        .filter((value: string) => value !== "none");
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

const unionArrays = (objValue: any[], srcValue: any[]) => {
    if (isArray(objValue) && isArray(srcValue)) {
        return union(objValue, srcValue);
    }
};

export const mergeWithUnionArray = (...args: any[]): any =>
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    mergeWith(...args, unionArrays);

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
