import path from "path";

type PkgType = Record<string, unknown>;

type PkgFnType = {
    apply: (pkg: PkgType, answers: string[]) => Record<string, unknown>;
};

type MergerFn = (
    base: Record<string, unknown>,
    pluginsPath: string,
    plugins: string[],
    fileName: string,
) => Record<string, unknown>;

type PackageMergerFn = (
    base: Record<string, unknown>,
    pluginsPath: string,
    plugins: string[],
) => Record<string, unknown>;

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isObject = (value: any) => {
    return (
        !!value &&
        typeof value === "object" &&
        typeof value.getMonth !== "function" &&
        !Array.isArray(value)
    );
};

const merge: (
    ...sources: Record<string, unknown>[]
) => Record<string, unknown> = (...sources) => {
    const [target, ...rest] = sources;

    for (const object of rest) {
        for (const key in object) {
            const targetValue = target[key];
            const sourceValue = object[key];
            const isMergable = isObject(targetValue) && isObject(sourceValue);
            target[key] = isMergable
                ? merge(
                      {},
                      targetValue as Record<string, unknown>,
                      sourceValue as Record<string, unknown>,
                  )
                : sourceValue;
        }
    }

    return target;
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
    return merge(baseFile, ...pluginFiles);
};

export const mergePackages: PackageMergerFn = (
    base = {},
    pluginsPath,
    plugins,
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
            const fnPkg = pluginPkgFn.apply(pluginPkg, plugins);
            return fnPkg;
        } else if (pluginPkg) {
            return pluginPkg;
        }
        return {};
    });

    return merge(basePkg, ...pluginPkgs);
};
