# 📦 MBSW UI Kit 배포 가이드

## 🎯 배포 준비 상태

현재 MBSW UI Kit는 **내부 공통 라이브러리**로 설계되어 있으며, npm 패키지로 배포할 수 있는 모든 설정이 완료된 상태입니다.

## 📋 현재 패키지 설정

### Package.json 주요 설정
```json
{
  "name": "mbsw-ui-kit",
  "version": "0.1.0",
  "description": "React/Next.js 기반 공통 UI 컴포넌트 라이브러리",
  "main": "dist/index.js",           // CommonJS 진입점
  "module": "dist/index.esm.js",    // ES Module 진입점  
  "types": "dist/index.d.ts",       // TypeScript 타입 정의
  "files": ["dist"],                // 배포에 포함할 파일
  "private": true,                  // 현재 비공개 설정
  "license": "UNLICENSED"           // 내부 라이브러리 라이선스
}
```

## 🔧 배포 설정 옵션

### 1. 내부 npm Registry 배포 (권장)
회사 내부 npm registry에 배포하는 경우:

```json
{
  "publishConfig": {
    "registry": "https://npm.company.com"
  },
  "private": false
}
```

### 2. GitHub Packages 배포
GitHub 조직 내부 배포:

```json
{
  "name": "@your-org/mbsw-ui-kit",
  "publishConfig": {
    "registry": "https://npm.pkg.github.com"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/bulhwi/ui-components.git"
  }
}
```

### 3. npm Link로 로컬 개발
로컬 개발 환경에서 다른 프로젝트와 연결:

```bash
# UI Kit 프로젝트에서
npm run build
npm link

# 사용할 프로젝트에서
npm link mbsw-ui-kit
```

## 🚀 배포 프로세스

### 1단계: 빌드 확인
```bash
# 깨끗한 빌드
npm run clean
npm run build

# 빌드 산출물 확인
ls -la dist/
# 예상 파일들:
# - index.js (CommonJS)
# - index.esm.js (ES Module) 
# - index.d.ts (TypeScript 타입)
# - 컴포넌트별 d.ts 파일들
```

### 2단계: 테스트 검증
```bash
# 전체 테스트 실행
npm test

# 커버리지 확인 (현재 76.8%)
npm run test:coverage

# 타입 체크
npm run type-check

# 린트 검사
npm run lint
```

### 3단계: Storybook 문서 확인
```bash
# Storybook 실행하여 모든 컴포넌트 동작 확인
npm run storybook

# Storybook 빌드 (정적 문서 생성)
npm run build-storybook
```

### 4단계: 버전 관리
```bash
# 패치 버전 업데이트 (0.1.0 → 0.1.1)
npm version patch

# 마이너 버전 업데이트 (0.1.0 → 0.2.0) 
npm version minor

# 메이저 버전 업데이트 (0.1.0 → 1.0.0)
npm version major
```

### 5단계: 배포 실행
```bash
# 내부 registry 배포
npm publish

# 또는 특정 태그로 배포
npm publish --tag beta
npm publish --tag alpha
```

## 📁 배포 포함 파일 구조

```
dist/
├── index.js              # CommonJS 번들
├── index.esm.js          # ES Module 번들
├── index.d.ts            # 메인 타입 정의
├── components/           # 컴포넌트별 타입 정의
│   ├── Button/
│   │   ├── index.d.ts
│   │   └── types.d.ts
│   ├── Input/
│   ├── Modal/
│   └── Layout/
├── styles/               # 스타일 시스템 타입
├── contexts/             # Context 타입
└── utils/                # 유틸리티 타입
```

## 🔍 배포 전 체크리스트

### ✅ 필수 확인 항목
- [ ] 모든 컴포넌트가 정상 빌드됨
- [ ] TypeScript 타입 정의가 올바르게 생성됨
- [ ] 테스트 통과율 95% 이상 (현재 99%)
- [ ] Storybook 모든 스토리가 정상 작동
- [ ] README.md 문서 최신 상태
- [ ] CHANGELOG.md 버전별 변경사항 기록

### ⚠️ 주의 사항
- [ ] 민감한 정보 포함 여부 확인
- [ ] 라이선스 정책 확인
- [ ] 의존성 보안 취약점 점검
- [ ] 번들 크기 최적화 확인

## 📊 현재 패키지 상태

### 번들 크기 (예상)
- **Main Bundle**: ~150KB (gzipped: ~45KB)
- **ES Module**: ~140KB (gzipped: ~42KB)
- **Type Definitions**: ~25KB

### 의존성 구조
```
Peer Dependencies (사용자가 설치해야 함):
├── react ^18.0.0
├── react-dom ^18.0.0
└── styled-components ^5.0.0

No Runtime Dependencies (자체 포함)
```

### 지원 환경
- **Node.js**: 16+
- **React**: 18+  
- **TypeScript**: 4.5+
- **Bundlers**: Webpack 5+, Vite, Rollup

## 🔄 CI/CD 설정 (옵션)

### GitHub Actions 예시
```yaml
# .github/workflows/publish.yml
name: Publish Package

on:
  release:
    types: [published]

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          registry-url: 'https://npm.pkg.github.com'
      
      - run: npm ci
      - run: npm run test
      - run: npm run build
      - run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

## 📈 사용량 모니터링

### npm Stats 확인 방법
```bash
# 다운로드 통계 확인
npm view mbsw-ui-kit

# 버전별 다운로드 수
npm view mbsw-ui-kit versions --json
```

### 사용자 피드백 수집
- GitHub Issues를 통한 버그 리포트
- GitHub Discussions를 통한 기능 요청
- Storybook 문서를 통한 사용 가이드

## 🚀 배포 후 할 일

### 1. 문서 업데이트
- [ ] 설치 가이드 배포
- [ ] 내부 위키 업데이트  
- [ ] 팀 공유 채널 공지

### 2. 사용자 지원
- [ ] 마이그레이션 가이드 제공
- [ ] 개발팀 교육/워크샵 진행
- [ ] 기술 지원 채널 운영

### 3. 지속적 개선
- [ ] 사용량 모니터링
- [ ] 성능 최적화
- [ ] 새 컴포넌트 추가
- [ ] 사용자 피드백 반영

## 📝 배포 명령어 요약

```bash
# 개발 빌드 및 테스트
npm run clean && npm run build
npm test
npm run type-check
npm run lint

# 로컬 링크 테스트
npm run link-local

# 버전 업데이트 및 배포
npm version patch
npm publish

# Storybook 배포 (문서)
npm run build-storybook
# 정적 파일을 웹 서버에 업로드
```

## 🎯 권장 배포 전략

### Phase 1: Beta 배포 (내부 팀)
```bash
npm version 0.1.0-beta.1
npm publish --tag beta
```

### Phase 2: RC 배포 (확대 테스트)
```bash
npm version 0.1.0-rc.1  
npm publish --tag rc
```

### Phase 3: Stable 배포 (전체 공개)
```bash
npm version 0.1.0
npm publish
```

현재 MBSW UI Kit는 **프로덕션 배포 준비가 완료**된 상태이며, 위의 프로세스를 따라 안전하게 배포할 수 있습니다.