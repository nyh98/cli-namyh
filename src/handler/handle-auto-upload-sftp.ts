import * as path from "path";
import * as fs from "fs";
import { OPTIONS, SftpJson, UploadOption } from "../types";
import sftp from "ssh2-sftp-client";
import { sftpValidate } from "../validator/sftp-validate";
import * as fse from "fs-extra";
import { readIgnore } from "../helper/read-ignore";
import { IGNORE_NAME, LOCAL_BACKUP_DIR_NAME } from "../const";
import { readSftpJson } from "../helper/read-sftp-json";
import { exitWithError } from "../helper/exit-with-error";
import { createLocalBackup } from "../functions/craete-local-backup";
import { backupAndCleanRemote } from "../functions/backup-and-clean-remote";
import { fsFileFilter } from "../functions/fs-file-filter";

export const handleAutoUploadSftp = async (
    inputDestProjectPath: string,
    option: UploadOption
) => {
    const { clean, folder, tag } = option;

    const sftpDestClient = new sftp("dest");
    const targetDir =
        typeof folder === "boolean" ? "src" : folder.replaceAll("\\", "/");
    const projectDir = process.cwd();
    const projectSrc = path.join(projectDir, targetDir);
    const tempBackUpName = "temp-backup";
    let localBackupDir: string | null = null;

    const { json: sftpJson, readPath } = readSftpJson(inputDestProjectPath);

    if (!sftpJson)
        exitWithError(
            `.vscode/sftp.json 파일이 없습니다.\n검색 경로 ${readPath}`
        );

    sftpValidate(sftpJson);

    const destDir = path.posix.join(sftpJson.remotePath, targetDir);

    const destLocalSrcPath = path.join(inputDestProjectPath, targetDir);

    try {
        localBackupDir = await createLocalBackup(
            projectDir,
            inputDestProjectPath,
            tag
        );

        if (!fs.existsSync(projectSrc)) {
            exitWithError(
                `업로드할 ${folder} 폴더를 찾지 못함. 경로 : ${projectSrc}`
            );
        }

        console.log(`\n🔐 ${sftpJson.name} SFTP 서버에 연결 중...\n`);
        await sftpDestClient.connect(sftpJson);

        if (clean) {
            await backupAndCleanRemote(
                sftpDestClient,
                destDir,
                sftpJson.remotePath,
                tempBackUpName,
                folder
            );
        }

        console.log(`\n💨 서버에 업로드중....\n${projectSrc} ➡  ${destDir}\n`);
        await sftpDestClient.uploadDir(projectSrc, destDir, {
            filter: fsFileFilter("sftp"),
        });

        if (clean && (await fse.exists(destLocalSrcPath))) {
            await fse.remove(destLocalSrcPath);
        }

        console.log(
            `\n💫 로컬 파일 동기화중....\n${projectSrc} ➡  ${destLocalSrcPath}\n`
        );
        await fse.copy(projectSrc, destLocalSrcPath, {
            filter: fsFileFilter("fs"),
        });

        console.log(`\n✅ 파일 업로드 완료\n${projectSrc} ➡  ${destDir}\n`);
    } catch (err) {
        if (clean) {
            console.log(`\n🔧 오류 발생 이전 상태로 되돌리는중....\n`);
            const destBackUpDir = path.posix.join(
                sftpJson.remotePath,
                tempBackUpName
            );
            await sftpDestClient.rename(destBackUpDir, destDir);
        }
        if (localBackupDir && (await fse.exists(localBackupDir))) {
            await fse.remove(localBackupDir);
        }

        console.error(`\n❌ 오류:\n`, err, "\n");
    } finally {
        console.log(`\n🔧 SFTP 연결 종료 중....\n`);
        if (clean) {
            const destBackUpDir = path.posix.join(
                sftpJson.remotePath,
                tempBackUpName
            );
            if (await sftpDestClient.exists(destBackUpDir)) {
                await sftpDestClient.rmdir(destBackUpDir, true);
            }
        }

        await sftpDestClient.end();
    }
};
