import * as path from "path";
import * as fs from "fs";
import { SftpJson } from "../types";

export const readSftpJson = (
    projectDir: string
): { json: SftpJson | null; readPath: string } => {
    const jsonPath = path.join(projectDir, ".vscode", "sftp.json");

    if (!fs.existsSync(jsonPath)) {
        return { json: null, readPath: jsonPath };
    }

    return {
        json: JSON.parse(fs.readFileSync(jsonPath, "utf8")),
        readPath: jsonPath,
    };
};
