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
        )} at ${chalk.bold(dir)}`,
    );
    console.log("");
    console.log("You can run several commands:");
    console.log("");

    console.log(
        `${indent()}${chalk.blueBright(
            pm === "yarn" || pm === "pnpm" ? `${pm} dev` : "npm run dev",
        )}`,
    );
    console.log(`${indent(2)}Starts the development server.`);
    console.log("");
    console.log(
        `${indent()}${chalk.blueBright(
            pm === "yarn" || pm === "pnpm" ? `${pm} build` : "npm run build",
        )}`,
    );
    console.log(`${indent(2)}Bundles the app for production.`);
    console.log("");
    console.log(
        `${indent()}${chalk.blueBright(
            pm === "yarn" || pm === "pnpm" ? `${pm} start` : "npm run start",
        )}`,
    );
    console.log(`${indent(2)}Starts the production server.`);
    console.log("");
    console.log("Start developing by typing:\n");
    console.log(`${indent()}${chalk.blueBright("cd")} ${name}`);
    console.log(
        `${indent()}${chalk.blueBright(
            pm === "yarn" || pm === "pnpm" ? `${pm} dev` : "npm run dev",
        )}`,
    );
    console.log("");
};

export const tips = {
    preInstall,
    postInstall,
};
