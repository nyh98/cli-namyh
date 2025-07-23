export interface FileData {
    fullPath: string;
    fileName: string;
    entityName: string;
    srcPath: string;
}

export interface SftpJson {
    name: string;
    host: string;
    username: string;
    port: number;
    remotePath: string;
    password: string;
}

export interface UploadOption {
    clean?: boolean;
    folder: string | boolean;
    tag: string | boolean;
}

export interface GeneratorOption {
    mkRepositoryDir: string;
    searchPath: string;
}
export const COMMANDS = {
    REPO: "repo",
    SFTP: "sftp",
    IGNORE: "ignore",
};

export const OPTIONS = {
    SFTP: {
        CLEAN: {
            SHORT: "-c",
            LONG: "--clean",
            DESC: "sftp 서버의 src 폴더 삭제 후 로컬에서 작업한 src 폴더 업로드(소스코드 동기화를 위함)",
        },
    },
};
