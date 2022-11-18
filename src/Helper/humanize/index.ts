export const HumanizeChoices = {
    get: (
        choice: string,
    ): { title: string; description: string; value: string } => {
        switch (choice) {
            case "react":
                return {
                    title: "React",
                    description:
                        "Creates a React CRA project without SSR support",
                    value: choice,
                };
            case "nextjs":
                return {
                    title: "NextJS",
                    description: "Creates a Next.js project with SSR support",
                    value: choice,
                };
            case "refine-react":
                return {
                    title: "refine(CRA)",
                    description:
                        "Creates a basic refine project without SRR support.",
                    value: choice,
                };
            case "refine-nextjs":
                return {
                    title: "refine(Next.js)",
                    description:
                        "Creates a refine Next.js project with SSR support.",
                    value: choice,
                };
            case "refine-remix":
                return {
                    title: "refine(Remix)",
                    description:
                        "Creates a refine Remix project with SSR support.",
                    value: choice,
                };
            default:
                return {
                    title: choice,
                    description: "",
                    value: choice,
                };
        }
    },
};
