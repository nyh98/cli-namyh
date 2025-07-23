import { SftpJson } from "../types";

export const sftpValidate = (config: SftpJson) => {
    const { host, username, port, password, remotePath } = config;

    if (!host) {
        console.error("❌ sftp.json 파일에 host가 비어있습니다");
        process.exit(1);
    }

    if (!username) {
        console.error("❌ sftp.json 파일에 username이 비어있습니다");
        process.exit(1);
    }

    if (!port) {
        console.error("❌ sftp.json 파일에 port가 비어있습니다");
        process.exit(1);
    }

    if (!password) {
        console.error("❌ sftp.json 파일에 password가 비어있습니다");
        process.exit(1);
    }

    if (!remotePath) {
        console.error("❌ sftp.json 파일에 remotePath가 비어있습니다");
        process.exit(1);
    }
};
