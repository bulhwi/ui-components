# 사내UI킷 (MBSW)

React와 Next.js, TypeScript 기반의 사내 전용 UI 컴포넌트 라이브러리

## 개요
사내 프런트엔드 개발자가 프로젝트를 시작하거나 기존 프로젝트를 확장할 때, 일관성 있고 검증된 UI 컴포넌트를 빠르게 가져다 쓸 수 있는 React·Next.js·TypeScript 기반 내부 전용 라이브러리입니다. Storybook을 문서·프리뷰 허브로 사용하며, 다크모드·i18n·반응형을 기본 지원하고 Jest 테스트로 품질을 담보합니다.

## 목표
1. 4주 이내 MVP(버튼·인풋·모달·레이아웃 등 필수 6종) 제공
2. 새로운 사내 프로젝트 세팅 소요 시간을 30% 단축
3. 컴포넌트 중복 구현 사례 50% 이상 감소

## 기술 스택
- **React 18** - 최신 React 기능 활용
- **TypeScript** - 타입 안전성 보장
- **Next.js** - 서버사이드 렌더링 지원
- **Storybook 7+** - 컴포넌트 문서화 및 프리뷰
- **styled-components** - CSS-in-JS 스타일링 및 테마 시스템
- **Jest + React Testing Library** - 유닛 테스트 (80% 이상 커버리지)
- **ESLint + Prettier + Husky** - 코드 품질 및 일관성 유지

## 주요 기능
| 분류 | 기능 | 설명 |
|------|------|------|
|카탈로그|Storybook 프리뷰|컴포넌트별 실시간 렌더·Docs 패널 자동 생성|
|테마|다크 모드 스위처|Global 토글 및 ThemeProvider 구현|
|국제화|i18n 지원|Storybook UI & 데모 텍스트 다국어|
|품질|Jest + RTL 테스트|유닛 테스트·커버리지 리포트|
|반응형|뷰포트 컨트롤|스토리북 애드온으로 모바일/태블릿 미리보기|

## 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# Storybook 실행
npm run storybook

# 테스트 실행
npm run test

# 테스트 커버리지 확인
npm run test:coverage

# 빌드
npm run build

# 린트 검사
npm run lint

# 타입 체크
npm run type-check
```

## 사용법

```typescript
import { Button, Input, Modal } from 'mbsw-ui-kit';
import { ThemeProvider } from 'styled-components';

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <Button variant="primary" size="large">
        클릭하세요
      </Button>
      <Input placeholder="이메일을 입력하세요" />
      <Modal isOpen={isOpen} onClose={handleClose}>
        모달 내용
      </Modal>
    </ThemeProvider>
  );
}
```

## 프로젝트 구조

```
src/
├── components/          # UI 컴포넌트
│   ├── Button/         # 버튼 컴포넌트
│   ├── Input/          # 입력 컴포넌트
│   ├── Modal/          # 모달 컴포넌트
│   ├── Layout/         # 레이아웃 컴포넌트
│   └── index.ts        # 컴포넌트 export
├── stories/            # Storybook 스토리
├── styles/             # 테마 및 글로벌 스타일
│   ├── theme.ts        # 테마 정의
│   └── GlobalStyle.ts  # 글로벌 스타일
├── i18n/               # 국제화 리소스
├── utils/              # 유틸리티 함수
├── types/              # 타입 정의
└── index.ts            # 라이브러리 진입점
```

## 개발 가이드

### 새 컴포넌트 추가
1. `src/components/[ComponentName]/` 폴더 생성
2. 컴포넌트 구현 (`index.tsx`, `styles.ts`, `types.ts`)
3. Storybook 스토리 작성 (최소 3개: 기본/변형/Edge)
4. Jest 테스트 작성 (80% 이상 커버리지)
5. `src/components/index.ts`에 export 추가

### 테마 시스템
- 다크/라이트 모드 지원
- styled-components ThemeProvider 활용
- 일관된 색상, 폰트, 간격 정의

### 국제화 (i18n)
- 기본 언어: 한국어 (ko), 영어 (en)
- JSON 리소스 파일 관리
- Storybook UI 및 데모 텍스트 다국어 지원

## 4주 로드맵
| 주차 | 산출물 |
|------|---------|
|1주차|리포지토리·Lint 설정, Storybook 초기 설정, Button, IconButton|
|2주차|Input(Text, Number), Modal, 다크모드 테마 시스템|
|3주차|Layout(Header, Footer), i18n 설정, 테스트 작성 강화|
|4주차|반응형 뷰포트 애드온, 문서화 보강, QA & 내부 베타 배포|

## 라이센스
사내 전용 라이브러리