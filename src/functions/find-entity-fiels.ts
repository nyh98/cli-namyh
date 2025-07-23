import * as fs from "fs";
import * as path from "path";
import { FileData } from "../types";

export const findEntityFiles = (searchPath: string) => {
    const entitys: FileData[] = [];

    fs.readdirSync(searchPath).forEach((file) => {
        const fullPath = path.join(searchPath, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            //재귀
            entitys.push(...findEntityFiles(fullPath));
        } else if (file.includes("entity")) {
            const originEntityName = file.replace(".entity.ts", "");
            const pascalEntityName = originEntityName
                .replace(/-./g, (match) => match[1].toUpperCase())
                .replace(/^./, (match) => match.toUpperCase());

            const repositoryFileName = `${originEntityName}.repository.ts`;
            const mathch = fullPath.match(/src.*/);
            const srcPath = mathch
                ? mathch[0].replaceAll(/\\/g, "/").replace(".ts", "")
                : "";

            entitys.push({
                fullPath,
                fileName: repositoryFileName,
                entityName: pascalEntityName,
                srcPath,
            });
        }
    });

    return entitys;
};
