# 📦 cli-namyh

### automation CLI Tool by **남용환**

1. 개발 템플릿 자동화
2. SFTP 업로드 자동화 도구
3. SFTP 업로드시 자동백업(버전관리)

---

## 📥 설치 방법

```bash
npm install -g cli-namyh
```

> 글로벌 설치 후 `cli-namyh` 명령어를 어디서든 사용 가능

---

## 🚀 사용법

```bash
cli-namyh [command] [...args] [options]
```

명령어 목록:

| Command  | 설명                                                          |
| -------- | ------------------------------------------------------------- |
| `repo`   | Entity 기반 repository 템플릿 자동 생성                       |
| `sftp`   | 대상 프로젝트를 sftp로 자동 업로드                            |
| `ignore` | 업로드시 제외할 파일 및 폴더가 명시된 ignore 템플릿 자동 생성 |

---

### 📁 Repository 자동 생성

```bash
cli-namyh repo [inputPath] [outputPath]
```

-   `inputPath`: entity가 포함된 경로 (기본값: `src`)
-   `outputPath`: repository 생성 경로 (기본값: `src/repositories`)

#### ✅ 예시

```bash
cli-namyh repo src/api/user src/api/user/repositories
```

---

### ☁️ SFTP 자동 업로드

```bash
cli-namyh sftp <destProjectPath> [options]
```

| 옵션             | 설명                     | 기본값    |
| ---------------- | ------------------------ | --------- |
| `-f`, `--folder` | 업로드할 폴더명          | `src`     |
| `-t`, `--tag`    | 태그 지정                | `unknown` |
| `-c`, `--clean`  | 업로드 전 대상 폴더 제거 | -         |

-   `-c`, `--clean` 옵션은 불필요한 파일 제거를 위한 옵션입니다
-   sftp 서버의 파일 삭제시 `임시 백업본`이 생성되므로 에러 발생시 `자동 롤백처리`됩니다.
-   `-t`,`--tag` 옵션은 커밋이나 배포를 구분하는 태그 문자열을 지정하는 데 사용합니다.

#### ✅ 예시

```bash
cli-namyh sftp ../dest-project -f dist -t hot-fix -c
cli-namyh sftp  C:/Users/example/target-project
```

---

### ☁️ ignore 파일 자동 생성

-   업로드시 제외할 파일 및 폴더가 명시된 ignore 템플릿 자동 생성

#### ✅ 예시

```bash
cli-namyh ignore
```

---

## ❓ 도움말 보기

```bash
cli-namyh --help
cli-namyh repo --help
cli-namyh sftp --help
```

---

## ✨ 기타

-   Node.js 기반 CLI 자동화 도구입니다.
-   Nest 프로젝트 및 Window OS에 초점을 맞췄으며 귀찮은 작업을 줄이기 위해 제작되었습니다
-   피드백이나 이슈는 언제든 환영입니다!

---

## (づ｡◕‿‿◕｡)づ Happy Coding!
