import * as path from "path";
import fse from "fs-extra";
import { IGNORE_NAME } from "../const";

export const handleCreateIgnore = async () => {
    const IGNORE_CONTENT = `
node_modules
coverage
log.txt
.vscode
.env
.env.*
dist
    `.trimStart();

    const targetPath = path.join(process.cwd(), IGNORE_NAME);

    const exists = await fse.pathExists(targetPath);

    if (exists) {
        console.log(`\n⚠️ ${IGNORE_NAME} 파일이 이미 존재하므로 스킵함\n`);
        return;
    }

    await fse.writeFile(targetPath, IGNORE_CONTENT, "utf8");
    console.log(`✅ ${IGNORE_NAME} 생성 완료!`);
};
