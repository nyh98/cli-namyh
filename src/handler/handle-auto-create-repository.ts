import { findEntityFiles } from "../functions/find-entity-fiels";
import { GeneratorOption } from "../types";
import * as path from "path";
import * as fs from "fs";
import { createRepositoryTemplate } from "../templates/repostiory";

export const handleAutoCreateRepository = (option: GeneratorOption) => {
    const { mkRepositoryDir, searchPath } = option;

    const entities = findEntityFiles(searchPath);

    if (!fs.existsSync(mkRepositoryDir)) {
        fs.mkdirSync(mkRepositoryDir, { recursive: true });
    }

    entities.forEach((file) => {
        const repositoryContent = createRepositoryTemplate(
            file.entityName,
            file.srcPath
        );

        const repositoryFilePath = path.join(mkRepositoryDir, file.fileName);

        //파일이 존재하지 않을때만 생성 덮어씌우기 방지
        if (!fs.existsSync(repositoryFilePath)) {
            fs.writeFileSync(repositoryFilePath, repositoryContent);
            console.log(`Repository created: ${file.fileName}`);
        }
    });
};
