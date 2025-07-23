import ignore, { Ignore } from "ignore";
import * as path from "path";
import { IGNORE_NAME } from "../const";
import { readIgnore } from "../helper/read-ignore";

//overloading

export function fsFileFilter(
    type: "fs"
): (src: string, dest: string) => boolean;
export function fsFileFilter(
    type: "sftp"
): (src: string, isDirectory: boolean) => boolean;
export function fsFileFilter(type: "sftp" | "fs") {
    const projectDir = process.cwd();
    const ignorePath = path.join(projectDir, IGNORE_NAME);
    const ignore = readIgnore(ignorePath);

    switch (type) {
        case "fs":
            return (src: string, dest: string) => {
                if (ignore) {
                    const relative = path.relative(projectDir, src);

                    if (!relative) return true;

                    return !ignore.ignores(relative);
                }
                return true;
            };
        default:
            return (src: string, isDirectory: boolean) => {
                if (ignore) {
                    const relative = path.relative(projectDir, src);

                    if (!relative) return true;

                    return !ignore.ignores(relative);
                }
                return true;
            };
    }
}
