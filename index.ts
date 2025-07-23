#!/usr/bin/env node
import { Command } from "commander";
import * as path from "path";
import { handleAutoCreateRepository } from "./src/handler/handle-auto-create-repository";
import { handleAutoUploadSftp } from "./src/handler/handle-auto-upload-sftp";

import { COMMANDS, OPTIONS, UploadOption } from "./src/types";
import { handleCreateIgnore } from "./src/handler/handle-create-ignore";

const program = new Command();
const currentPath = process.cwd();

program
    .name("cli-namyh")
    .description("📦 automation CLI Tool by 남용환")
    .version("1.0.0")
    .addHelpText(
        "after",
        `
        (づ｡◕‿‿◕｡)づ Happy Coding!
        `
    );

// ------------------ Repository Command ------------------

program
    .command(COMMANDS.REPO)
    .description("repository 템플릿 자동 생성")
    .argument("[inputPath]", "entity 포함된 파일들을 찾을 경로", "src")
    .argument("[outputPath]", "repository를 생성할 경로", "src/repositories")
    .addHelpText(
        "after",
        `
    Examples:
    cli-namyh  -repo src/api/user src/api/user/repositories
    cli-namyh  -en
    `
    )
    .action((inputPath, outputPath) => {
        const searchPath = path.join(currentPath, inputPath);
        const mkRepositoryDir = path.join(currentPath, outputPath);
        handleAutoCreateRepository({ searchPath, mkRepositoryDir });
    });

// ------------------ SFTP Command ------------------

program
    .command(COMMANDS.SFTP)
    .description("sftp 자동 업로드")
    .argument("<destProjectPath>", "파일을 업로드할 대상 프로젝트 경로")
    .option("-f, --folder [folder]", "업로드할 폴더명", "src")
    .option("-t, --tag [tag]", "태그 지정", "unknown")
    .option(
        `${OPTIONS.SFTP.CLEAN.SHORT}, ${OPTIONS.SFTP.CLEAN.LONG}`,
        "업로드 전에 sftp 서버의 폴더 삭제(-f 로 지정한 폴더)"
    )
    .addHelpText(
        "after",
        `
    Examples:
    cli-namyh -s  C:/Users/example/target-project
    cli-namyh -s  ../example/target-project -c
        `
    )
    .action(async (destProjectPath: string, options: UploadOption) => {
        try {
            await handleAutoUploadSftp(destProjectPath, options);
        } catch (err) {
            console.error("❌ 오류:", err);
            process.exit(1);
        }
    });

// ------------------ .cli-namyhignore Command ------------------

program
    .command(COMMANDS.IGNORE)
    .description("ignore 파일 자동 생성")
    .addHelpText(
        "after",
        `
    백업시 포함하지 않는 파일들을 지정하는 ignore 파일 자동 생성 
    `
    )
    .action(async () => {
        try {
            await handleCreateIgnore();
        } catch (err) {
            console.error("❌ 오류:", err);
            process.exit(1);
        }
    });

program.parse(process.argv);
