import * as path from "path";
import { IGNORE_NAME, LOCAL_BACKUP_DIR_NAME } from "../const";
import { readIgnore } from "../helper/read-ignore";
import * as fse from "fs-extra";
import { realpath } from "fs";
import { fsFileFilter } from "./fs-file-filter";

export async function createLocalBackup(
    projectDir: string,
    destPath: string,
    tag: string | boolean
) {
    //전체 폴더 백업(.cli-namyhignore 에 있는 제외 항목 뺴고)
    const backUpDir = path.join(
        destPath,
        LOCAL_BACKUP_DIR_NAME,
        `${Date.now()}-[${tag}]-backup`
    );

    console.log(`\n🗂️ 로컬 백업 생성 중: ${backUpDir}\n`);

    await fse.copy(projectDir, backUpDir, {
        filter: fsFileFilter("fs"),
    });

    return backUpDir;
}
