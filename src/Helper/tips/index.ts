import chalk from "chalk";

const indent = (indent = 1, tabWidth = 2) => {
    return "".padStart(indent * tabWidth);
};

const preInstall = (): void => undefined;

type PostInstallFn = (opts: {
    name: string;
    dir: string;
    pm: "yarn" | "npm" | "pnpm";
}) => void;

const postInstall: PostInstallFn = ({ name, dir, pm }) => {
    console.log("");

    console.log(
        `${chalk.green.bold("Success!")} Created ${chalk.greenBright.bold(
            name,
        )} at ${chalk.bold(dir)} 🚀`,
    );
    console.log("");

    console.log("Start developing by:\n");
    console.log(`${indent()}\u203a ${chalk.greenBright("cd")} ${dir}`);
    console.log(
        `${indent()}\u203a ${chalk.greenBright(
            pm === "yarn" || pm === "pnpm" ? `${pm} dev` : "npm run dev",
        )}`,
    );
    console.log("");

    console.log(
        `${indent()}\u203a Join us at ${chalk.cyanBright(
            "https://discord.gg/refine",
        )}`,
    );
    console.log("");
};

export const tips = {
    preInstall,
    postInstall,
};
