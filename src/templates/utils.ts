//이거도 쓸까..? 고민중
export const getUtilsTemplate = () => `
import { unlink } from "fs";
import { join } from "path";

export class Utils {
    static skipOperation(page: number, limit: number) {
        return (page - 1) * limit;
    }

    static totalPageOperation(totalCount: number, limit: number) {
        return Math.ceil(totalCount / limit);
    }

    // static cookieExtractor(key: TOKEN_TYPES) {
    //   return (req: any) => {
    //     if (req && req.cookies) {
    //       return req.cookies[key];
    //     }

    //     return null;
    //   };
    // }

    // static removeStaticFile(fileCategory: FILE_CATEGORY, fileName: string) {
    //   unlink(join(ASSETS_PATH, fileCategory, fileName), (err) => {
    //     if (err) {
    //       console.error('파일 삭제 에러' ,err);
    //     }
    //   });
    // }
}
`;
