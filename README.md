# 공통UI킷 (MBSW)

React와 Next.js, TypeScript 기반의 공통 UI 컴포넌트 라이브러리

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/bulhwi/ui-components)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.2.0-blue)](https://reactjs.org/)
[![Storybook](https://img.shields.io/badge/Storybook-7.6.20-ff69b4)](https://storybook.js.org/)
[![Test Coverage](https://img.shields.io/badge/coverage-95%2B-brightgreen)](https://github.com/bulhwi/ui-components)

## 🎯 개요

프런트엔드 개발자가 프로젝트를 시작하거나 기존 프로젝트를 확장할 때, **일관성 있고 검증된 UI 컴포넌트**를 빠르게 가져다 쓸 수 있는 React·Next.js·TypeScript 기반 공통 라이브러리입니다. 

- 🎨 **Storybook**을 문서·프리뷰 허브로 활용
- 🌙 **다크모드·i18n·반응형** 기본 지원
- 🧪 **Jest 테스트**로 95% 이상 커버리지 보장
- ♿ **접근성(A11y)** 표준 준수

## 📦 설치

```bash
npm install mbsw-ui-kit styled-components
# 또는
yarn add mbsw-ui-kit styled-components
```

## 🚀 빠른 시작

```tsx
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { 
  Button, 
  Input, 
  Modal, 
  Header, 
  Footer, 
  Layout,
  lightTheme 
} from 'mbsw-ui-kit';

function App() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (
    <ThemeProvider theme={lightTheme}>
      <Layout
        header={
          <Header 
            logo={<div>My App</div>}
            navigation={[
              { label: '홈', href: '/', active: true },
              { label: '제품', href: '/products' },
            ]}
            actions={
              <Button variant="primary" onClick={() => setIsModalOpen(true)}>
                시작하기
              </Button>
            }
          />
        }
        footer={
          <Footer 
            copyright="© 2024 My Company" 
            socialLinks={[
              { platform: 'github', href: 'https://github.com/mycompany' }
            ]}
          />
        }
      >
        <div style={{ padding: '20px' }}>
          <h1>메인 콘텐츠</h1>
          <Input 
            label="이메일" 
            type="email" 
            placeholder="email@example.com"
            validation={{ email: true, required: true }}
          />
        </div>

        <Modal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)}
          title="환영합니다!"
        >
          <p>MBSW UI Kit에 오신 것을 환영합니다.</p>
        </Modal>
      </Layout>
    </ThemeProvider>
  );
}
```

## 🧩 컴포넌트 목록

### ✅ 완성된 컴포넌트

| 컴포넌트 | 설명 | 주요 기능 | 테스트 |
|----------|------|-----------|---------|
| **Button** | 다용도 버튼 | 4가지 변형, 로딩 상태, 아이콘 | 11개 테스트 ✅ |
| **Input** | 입력 필드 + 검증 | 7가지 타입, 실시간 검증, 에러 처리 | 31개 테스트 ✅ |
| **Modal** | 모달 다이얼로그 | Portal, 4가지 애니메이션, 접근성 | 29개 테스트 ✅ |
| **Layout** | 페이지 레이아웃 | Header+Footer+Main, 반응형, 스티키 | 24개 테스트 ✅ |
| **Table** | 데이터 테이블 | 정렬, 필터링, 페이지네이션, 행 선택 | 23개 테스트 ✅ |
| **Card** | 콘텐츠 카드 | 변형, 이미지, 인터랙션, 그리드 레이아웃 | 39개 테스트 ✅ |
| **LoadingSpinner** | 로딩 스피너 | 4가지 애니메이션, 오버레이, 그룹 | 40개 테스트 ✅ |

**총 197개+ 단위 테스트** 🎉

## 📚 주요 기능

### 🎨 테마 시스템
```tsx
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from 'mbsw-ui-kit';

// 라이트 모드
<ThemeProvider theme={lightTheme}>
  <App />
</ThemeProvider>

// 다크 모드  
<ThemeProvider theme={darkTheme}>
  <App />
</ThemeProvider>
```

### 🔍 실시간 검증 시스템
```tsx
import { ValidatedInput, VALIDATION_PRESETS } from 'mbsw-ui-kit';

// 이메일 검증
<ValidatedInput 
  validation={VALIDATION_PRESETS.email}
  validateOnChange={true}
/>

// 비밀번호 검증 (강력한 비밀번호 규칙)
<ValidatedInput 
  validation={VALIDATION_PRESETS.password}
  type="password"
/>

// 커스텀 검증
<ValidatedInput 
  validation={{
    required: true,
    minLength: 3,
    custom: [
      { 
        test: (value) => value.includes('@'),
        message: '@를 포함해야 합니다' 
      }
    ]
  }}
/>
```

### 🎭 모달 시스템
```tsx
import { Modal } from 'mbsw-ui-kit';

<Modal
  isOpen={isOpen}
  onClose={handleClose}
  size="large"
  animation="slideUp"
  title="제목"
  footer={<Button onClick={handleSubmit}>확인</Button>}
>
  모달 내용
</Modal>
```

### 📱 반응형 레이아웃
```tsx
import { Header, Footer, Layout } from 'mbsw-ui-kit';

<Layout
  header={
    <Header 
      logo={<YourLogo />}
      navigation={navigationItems}
      sticky={true}
      maxWidth="xl"
    />
  }
  footer={
    <Footer 
      sections={footerSections}
      socialLinks={socialLinks}
    />
  }
>
  <YourContent />
</Layout>
```

## 🛠️ 개발 환경

### 설치 및 실행

```bash
# 저장소 클론
git clone https://github.com/bulhwi/ui-components.git
cd ui-components

# 의존성 설치
npm install

# Storybook 실행 (개발 및 문서화)
npm run storybook

# 테스트 실행
npm run test

# 테스트 커버리지 확인
npm run test:coverage

# 빌드
npm run build

# 린트 + 타입 체크
npm run lint
npm run type-check
```

### 🏗️ 프로젝트 구조

```
src/
├── components/           # UI 컴포넌트
│   ├── Button/          # 버튼 (4가지 변형, 로딩, 아이콘)
│   ├── Input/           # 입력 + 실시간 검증
│   ├── Modal/           # 모달 (Portal, 애니메이션, 접근성)
│   ├── Layout/          # 레이아웃 (Header, Footer, Layout)
│   └── index.ts         # 통합 export
├── contexts/            # React Contexts
│   ├── ThemeContext.tsx # 테마 관리
│   └── I18nContext.tsx  # 국제화
├── styles/              # 스타일 시스템
│   ├── theme.ts         # 테마 정의 (light/dark)
│   └── GlobalStyle.ts   # 글로벌 스타일
├── utils/               # 유틸리티
│   └── validation.ts    # 검증 로직 + 프리셋
├── types/               # TypeScript 타입
└── index.ts            # 라이브러리 진입점
```

## 🧪 테스트 전략

- **단위 테스트**: React Testing Library + Jest
- **접근성 테스트**: @testing-library/jest-dom
- **비주얼 테스트**: Storybook Interactions
- **타입 안전성**: TypeScript strict mode
- **코드 품질**: ESLint + Prettier

```bash
# 모든 테스트 실행
npm test

# 특정 컴포넌트 테스트
npm test -- --testPathPattern=Button

# 커버리지 리포트
npm run test:coverage
```

## 📖 문서

- 📖 **[상세 사용 가이드](./docs/USAGE_GUIDE.md)** - 완벽한 사용법과 실용 예시
- 🔖 **[API 문서](./docs/COMPONENT_API_REFERENCE.md)** - 모든 컴포넌트 Props 및 타입
- ⚡ **[빠른 시작](./docs/QUICK_START.md)** - 5분 내 설정 완료
- 🎨 **Storybook**: `npm run storybook` → http://localhost:6006
- 🧪 **테스트 커버리지**: `npm run test:coverage`

## 🎯 로드맵 현황

| 주차 | 목표 | 상태 |
|------|------|------|
| **1주차** | 기반 구축 + Button | ✅ 완료 |
| **2주차** | Input + Modal + 테마 | ✅ 완료 |
| **3주차** | Layout + 테스트 강화 | ✅ 완료 |
| **4주차** | 문서화 + QA + 배포 | 🚧 진행중 |

### 🏁 MVP 달성 현황
- ✅ **Button**: 4가지 변형, 로딩, 아이콘, 11개 테스트
- ✅ **Input**: 7가지 타입, 실시간 검증, 31개 테스트  
- ✅ **Modal**: Portal, 4가지 애니메이션, 접근성, 29개 테스트
- ✅ **Layout**: Header, Footer, 반응형, 24개 테스트
- ✅ **Table**: 정렬, 필터링, 페이지네이션, 23개 테스트
- ✅ **Card**: 다양한 변형, 이미지, 그리드, 39개 테스트
- ✅ **LoadingSpinner**: 4가지 애니메이션, 오버레이, 40개 테스트
- ✅ **테마**: Light/Dark 모드, lineHeights 지원
- ✅ **검증**: 실시간 validation + 프리셋
- ✅ **접근성**: ARIA 속성, 키보드 네비게이션
- ✅ **i18n**: 기본 구조 (확장 가능)
- ✅ **Storybook**: 50개+ 스토리
- ✅ **테스트**: 197개+ 단위 테스트
- ✅ **문서화**: 상세 가이드, API 문서, FAQ

## 🤝 기여하기

1. Fork 프로젝트
2. Feature 브랜치 생성 (`git checkout -b feature/AmazingFeature`)
3. 변경사항 커밋 (`git commit -m 'Add some AmazingFeature'`)
4. 브랜치 Push (`git push origin feature/AmazingFeature`)
5. Pull Request 생성

### 새 컴포넌트 추가 가이드

1. `src/components/[ComponentName]/` 폴더 생성
2. 필수 파일들:
   - `types.ts` - TypeScript 인터페이스
   - `styles.ts` - styled-components 스타일
   - `ComponentName.tsx` - 메인 컴포넌트
   - `ComponentName.stories.tsx` - Storybook 스토리 (3개 이상)
   - `ComponentName.test.tsx` - Jest 테스트 (80% 이상 커버리지)
   - `index.ts` - export 파일
3. `src/components/index.ts`에 export 추가

## 📄 라이센스

공통 라이브러리 - 내부 사용

## 🏷️ 버전

- **v0.1.0**: 현재 MVP 버전
  - Button, Input, Modal, Layout 컴포넌트
  - 테마 시스템, 검증 시스템
  - Storybook 문서, 95+ 단위 테스트

---

**Made with ❤️ by MBSW Team**