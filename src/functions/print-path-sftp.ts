import * as path from "path";

export const printPathSftp = (currentPath: string, destProjectPath: string) => {
    console.log("------------------------------------------------------");
    console.info(`📂 시작 폴더: ${currentPath}`);
    console.info(`📂 대상 폴더: ${path.resolve(destProjectPath)}`);
    console.log("------------------------------------------------------");
};
