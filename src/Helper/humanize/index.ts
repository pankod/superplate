export const HumanizeChoices = {
    get: (
        choice: string,
    ): { title: string; description: string; value: string } => {
        switch (choice) {
            case "react":
                return {
                    title: "React",
                    description: "Creates a React CRA project",
                    value: choice,
                };
            case "nextjs":
                return {
                    title: "NextJS",
                    description: "Creates a Next.js project",
                    value: choice,
                };
            case "refine-vite":
                return {
                    title: "refine(Vite)",
                    description:
                        "Creates a refine React Vite project (Recommended for CRUD applications).",
                    value: choice,
                };
            case "refine-nextjs":
                return {
                    title: "refine(Next.js)",
                    description:
                        "Creates a refine Next.js project with SSR support (Recommended for CRUD applications).",
                    value: choice,
                };
            case "refine-remix":
                return {
                    title: "refine(Remix)",
                    description:
                        "Creates a refine Remix project with SSR support (Recommended for CRUD applications)",
                    value: choice,
                };
            case "refine-react":
                return {
                    title: "refine(CRA) [Legacy]",
                    description:
                        "Creates a basic refine project (Recommended for CRUD applications)",
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
