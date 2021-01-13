import path from "path";

const getPackageJSON: (
    pluginPath: string,
    pluginName: string,
) => Record<string, unknown> | undefined = (pluginPath, pluginName) => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const pluginPkg = require(path.join(
            pluginPath,
            "plugins",
            pluginName,
            "package.json",
        ));

        return pluginPkg;
    } catch (e) {
        return undefined;
    }
};

const getPackage: (
    pluginPath: string,
    pluginName: string,
) =>
    | {
          apply: (
              pkg: Record<string, unknown>,
              answers: string[],
          ) => Record<string, unknown>;
      }
    | undefined = (pluginPath, pluginName) => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const pluginPkg = require(path.join(
            pluginPath,
            "plugins",
            pluginName,
            "package.js",
        ));

        return pluginPkg;
    } catch (e) {
        return undefined;
    }
};

export const mergePackages: (
    base: Record<string, unknown>,
    pluginsPath: string,
    plugins: string[],
) => Record<string, unknown> = (base, pluginsPath, plugins) => {
    const basePkg = { ...base };

    plugins.forEach((plugin) => {
        const pluginPkg = getPackageJSON(pluginsPath, plugin);
        const pluginPkgFn = getPackage(pluginsPath, plugin);

        if (pluginPkgFn && pluginPkg) {
            const fnPkg = pluginPkgFn.apply(pluginPkg, plugins);
            Object.keys(fnPkg).forEach((key) => {
                Object.assign(basePkg, {
                    [key]: {
                        ...((basePkg[key] as Record<string, unknown>) ?? {}),
                        ...((fnPkg[key] as Record<string, unknown>) ?? {}),
                    },
                });
            });
        } else if (pluginPkg) {
            Object.keys(pluginPkg).forEach((key) => {
                Object.assign(basePkg, {
                    [key]: {
                        ...((basePkg[key] as Record<string, unknown>) ?? {}),
                        ...((pluginPkg[key] as Record<string, unknown>) ?? {}),
                    },
                });
            });
        }
    });

    return basePkg;
};
