import * as path from "path";
import * as fs from "fs";
import ignore from "ignore";
import { IGNORE_NAME } from "../const";

export const readIgnore = (ignorePath: string) => {
    const ignoreFilePath = path.join(process.cwd(), IGNORE_NAME); // 또는 '.ignore'

    if (!fs.existsSync(ignoreFilePath)) {
        return null;
    }

    const ignoreContent = fs.readFileSync(ignoreFilePath, "utf8");

    const ig = ignore().add(ignoreContent);

    return ig;
};
