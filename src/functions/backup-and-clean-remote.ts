import sftp from "ssh2-sftp-client";
import * as path from "path";

export async function backupAndCleanRemote(
    client: sftp,
    destDir: string,
    remoteRoot: string,
    tempName: string,
    folder: string | boolean
) {
    console.log(`\n🧹 서버 ${folder} 디렉토리 삭제중... \n`);

    const exists = await client.exists(destDir);
    if (exists) {
        const backupDir = path.posix.join(remoteRoot, tempName);
        await client.rename(destDir, backupDir);
    }

    console.log(`\n✅ 서버 ${folder} 삭제 완료 : ${destDir}\n`);
}
