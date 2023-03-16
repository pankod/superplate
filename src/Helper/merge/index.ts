import { readFile } from "fs";
import isArray from "lodash/isArray";
import mergeWith from "lodash/mergeWith";
import union from "lodash/union";
import path from "path";
import { promisify } from "util";

type PkgType = Record<string, unknown>;

type PkgFnType = {
    apply: (
        pkg: PkgType,
        answers: Record<string, string | string[] | boolean | undefined>,
    ) => Record<string, unknown>;
};

type MergerFn = (
    base: Record<string, unknown>,
    pluginsPath: string,
    plugins: string[],
    fileName: string,
    mergeOptions?: Record<string, unknown>,
) => Record<string, unknown>;

type PackageMergerFn = (
    base: Record<string, unknown>,
    pluginsPath: string,
    plugins: string[],
    answers: Record<string, string | string[] | boolean | undefined>,
) => Record<string, unknown>;

type AsyncMergerFn = (
    base: Record<string, unknown>,
    pluginsPath: string,
    plugins: string[],
) => Promise<Record<string, unknown>>;

const getPluginFile: <ReturnType extends any>(
    pluginPath: string,
    pluginName: string,
    fileName: string,
) => ReturnType | undefined = (pluginPath, pluginName, fileName) => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const pluginFile = require(path.join(
            pluginPath,
            "plugins",
            pluginName,
            fileName,
        ));

        return pluginFile;
    } catch (e) {
        return undefined;
    }
};

const getStringFile = async (
    pluginPath: string,
    pluginName: string,
    fileName: string,
) => {
    try {
        const str = await promisify(readFile)(
            path.join(pluginPath, "plugins", pluginName, fileName),
            "utf8",
        );
        if (typeof str === "string") {
            return str;
        } else {
            return "{}";
        }
    } catch (e) {
        return "{}";
    }
};

export const mergeJSONFiles: MergerFn = (
    base = {},
    pluginsPath,
    plugins,
    fileName,
) => {
    const baseFile = { ...base };
    const pluginFiles = plugins.map((plugin) => {
        const file = getPluginFile<PkgType>(pluginsPath, plugin, fileName);
        return file ?? {};
    });
    return mergeWithUnionArray(baseFile, ...pluginFiles) as Record<
        string,
        unknown
    >;
};

type PluginData = Record<"name" | "description" | "url", string>;

export const mergePluginData: MergerFn = (
    base = {},
    pluginsPath,
    plugins,
    fileName,
) => {
    const baseFile = { ...base };
    baseFile.plugins = [];
    plugins.map((plugin) => {
        if (["npm", "yarn", "react", "nextjs", "refine"].includes(plugin))
            return;
        const file =
            getPluginFile<PkgType>(pluginsPath, plugin, fileName) ?? {};

        (baseFile.plugins as PluginData[]).push({
            name: (file.name as string) ?? plugin,
            description: (file.description as string) ?? "",
            url: (file.url as string) ?? "",
        });
    });
    return baseFile;
};

export const mergeBabel: AsyncMergerFn = async (base, pluginsPath, plugins) => {
    const baseBabel = { ...base };

    const pluginRcs = await Promise.all(
        plugins.map(async (plugin) => {
            const str = await getStringFile(pluginsPath, plugin, ".babelrc");
            const parsed = JSON.parse(str);

            return parsed ?? {};
        }),
    );

    const merged = mergeWithUnionArray(baseBabel, ...pluginRcs) as Record<
        string,
        unknown
    >;

    const uniquePresets: string[] = [];
    const presetsSet = new Set((merged.presets as string[]) ?? []);
    presetsSet.forEach((el) => uniquePresets.push(el));
    merged.presets = uniquePresets;

    return merged;
};

export const mergePackages: PackageMergerFn = (
    base = {},
    pluginsPath,
    plugins,
    answers,
) => {
    const basePkg = { ...base };
    const pluginPkgs = plugins.map((plugin) => {
        const pluginPkg = getPluginFile<PkgType>(
            pluginsPath,
            plugin,
            "package.json",
        );
        const pluginPkgFn = getPluginFile<PkgFnType>(
            pluginsPath,
            plugin,
            "package.js",
        );

        if (pluginPkgFn && pluginPkg) {
            const fnPkg = pluginPkgFn.apply(pluginPkg, answers);
            return fnPkg;
        } else if (pluginPkg) {
            return pluginPkg;
        }
        return {};
    });

    return mergeWithUnionArray(basePkg, ...pluginPkgs) as Record<
        string,
        unknown
    >;
};

const unionArrays = (objValue: string[], srcValue: string[]) => {
    if (isArray(objValue) && isArray(srcValue)) {
        return union(objValue, srcValue);
    }
};

export const mergeWithUnionArray = (
    ...args: Record<string, unknown>[]
): Record<string, unknown> => mergeWith({}, ...args, unionArrays);
