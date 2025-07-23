import { COMMANDS, OPTIONS } from "../types";

export const helperText = `
 📦 automation CLI Tool by **남용환**

  파라미터 순서 지켜야함!

  Usage: cli-namyh [flag] [input1] [input2] ...
  
  Flags:
    ${COMMANDS.REPO}, repository 템플릿 자동 생성
    ${COMMANDS.SFTP}, sftp 자동 업로드(src 폴더만)
  
  Arguments: ${COMMANDS.REPO} 의 경우
    [input1 = inputPath]  (optional) entity라는 이름을 포함한 파일들을 찾을 경로 Default: "src"
    [input2 = outputPath] (optional) 찾은 파일들로 repository를 생성할 폴더 Default: "src/repositories"
  
  Examples:
    cli-namyh  -repo src/api/user src/api/user/repositories
    cli-namyh  -en
 
  Arguments: ${COMMANDS.SFTP} 의 경우
    [input1 = destProjectPath]  파일을 업로드할 대상 프로젝트 폴더 경로를 입력해주세요
    [input2 = clean] (${OPTIONS.SFTP.CLEAN.SHORT}, ${OPTIONS.SFTP.CLEAN.LONG}]) ${OPTIONS.SFTP.CLEAN.DESC}

    
    
 Examples:
    cli-namyh -s  C:/Users/example/target-project
    cli-namyh -s  ../example/target-project -c
 
   (づ｡◕‿‿◕｡)づ Happy Coding!
`;
