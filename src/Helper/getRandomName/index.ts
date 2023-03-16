import humanId from "human-id";

export const getRandomName = (): string => {
    const name = humanId({
        separator: "-",
        capitalize: false,
        adjectiveCount: 1,
    });

    return name;
};
