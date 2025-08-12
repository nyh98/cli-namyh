import consola from "consola";

export const askYesNo = async (question: string): Promise<Boolean> => {
    return consola.prompt(question, {
        type: "confirm",
    });
};
