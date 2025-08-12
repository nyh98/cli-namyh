import consola from "consola";

export function exitWithError(message: string): never {
    console.error(`\n❌ ${message}\n`);

    process.exit(1);
}
