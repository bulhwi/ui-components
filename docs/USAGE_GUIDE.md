# 📖 MBSW UI Kit 사용 가이드

React와 Next.js 프로젝트에서 MBSW UI Kit를 효과적으로 사용하는 방법에 대한 포괄적인 가이드입니다.

## 📦 설치 및 초기 설정

### 1. 패키지 설치
```bash
npm install mbsw-ui-kit styled-components
# 또는
yarn add mbsw-ui-kit styled-components

# TypeScript 지원을 위해 (선택사항)
npm install --save-dev @types/styled-components
```

### 2. 기본 설정
```tsx
// App.tsx
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle, lightTheme } from 'mbsw-ui-kit';

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyle />
      <div className="App">
        {/* 애플리케이션 콘텐츠 */}
      </div>
    </ThemeProvider>
  );
}

export default App;
```

## 🎨 테마 시스템

### 라이트/다크 모드 구현
```tsx
import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme, Button } from 'mbsw-ui-kit';

function ThemedApp() {
  const [isDark, setIsDark] = useState(false);

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <div>
        <Button 
          variant="secondary" 
          onClick={() => setIsDark(!isDark)}
        >
          {isDark ? '라이트 모드' : '다크 모드'}
        </Button>
        {/* 나머지 앱 콘텐츠 */}
      </div>
    </ThemeProvider>
  );
}
```

### 커스텀 테마 생성
```tsx
import { DefaultTheme } from 'styled-components';
import { lightTheme } from 'mbsw-ui-kit';

const customTheme: DefaultTheme = {
  ...lightTheme,
  colors: {
    ...lightTheme.colors,
    primary: '#007bff',
    secondary: '#6c757d',
  },
  fonts: {
    ...lightTheme.fonts,
    family: {
      primary: '"Noto Sans KR", sans-serif',
    },
  },
};
```

## 🔘 Button 컴포넌트

### 기본 사용법
```tsx
import { Button } from 'mbsw-ui-kit';

// 4가지 변형
<Button variant="primary">주요 버튼</Button>
<Button variant="secondary">보조 버튼</Button>
<Button variant="tertiary">3차 버튼</Button>
<Button variant="danger">위험 버튼</Button>

// 3가지 크기
<Button size="small">작은 버튼</Button>
<Button size="medium">보통 버튼</Button>
<Button size="large">큰 버튼</Button>
```

### 고급 기능
```tsx
// 로딩 상태
<Button loading>처리 중...</Button>

// 비활성화
<Button disabled>비활성화됨</Button>

// 아이콘과 함께
<Button 
  leftIcon={<PlusIcon />}
  rightIcon={<ArrowIcon />}
>
  아이콘 버튼
</Button>

// 전체 너비
<Button fullWidth>전체 너비 버튼</Button>

// 이벤트 핸들링
<Button 
  onClick={() => console.log('클릭됨')}
  onFocus={() => console.log('포커스됨')}
>
  이벤트 버튼
</Button>
```

## 📝 Input 컴포넌트

### 기본 Input 사용법
```tsx
import { Input } from 'mbsw-ui-kit';

// 7가지 타입 지원
<Input type="text" label="텍스트" placeholder="텍스트 입력" />
<Input type="email" label="이메일" placeholder="email@example.com" />
<Input type="password" label="비밀번호" />
<Input type="number" label="숫자" min={0} max={100} />
<Input type="tel" label="전화번호" />
<Input type="url" label="웹사이트" />
<Input type="search" label="검색" />

// 설명 및 아이콘
<Input 
  label="사용자명" 
  description="3-20자 사이로 입력해주세요"
  leftIcon={<UserIcon />}
  rightIcon={<CheckIcon />}
/>
```

### 실시간 검증 시스템
```tsx
import { ValidatedInput, VALIDATION_PRESETS } from 'mbsw-ui-kit';

// 이메일 검증
<ValidatedInput 
  validation={VALIDATION_PRESETS.email}
  validateOnChange={true}
  label="이메일"
/>

// 비밀번호 검증 (강력한 규칙)
<ValidatedInput 
  validation={VALIDATION_PRESETS.password}
  type="password"
  label="비밀번호"
  showStrengthIndicator={true}
/>

// 전화번호 검증
<ValidatedInput 
  validation={VALIDATION_PRESETS.phone}
  type="tel"
  label="전화번호"
/>

// 커스텀 검증 규칙
<ValidatedInput 
  validation={{
    required: true,
    minLength: 3,
    maxLength: 20,
    pattern: /^[a-zA-Z0-9_]+$/,
    custom: [
      {
        test: (value: string) => !value.includes('admin'),
        message: '관리자 예약어는 사용할 수 없습니다'
      },
      {
        test: (value: string) => value.length >= 3,
        message: '최소 3자 이상 입력해주세요'
      }
    ]
  }}
  validateOnChange={true}
  debounceMs={300}
/>
```

### 폼 통합 예시
```tsx
function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  return (
    <form>
      <ValidatedInput 
        validation={VALIDATION_PRESETS.email}
        value={formData.email}
        onChange={(e) => setFormData({...formData, email: e.target.value})}
        label="이메일"
        required
      />
      
      <ValidatedInput 
        validation={VALIDATION_PRESETS.password}
        type="password"
        value={formData.password}
        onChange={(e) => setFormData({...formData, password: e.target.value})}
        label="비밀번호"
        required
      />
      
      <Button type="submit" variant="primary" fullWidth>
        로그인
      </Button>
    </form>
  );
}
```

## 🎭 Modal 컴포넌트

### 기본 모달
```tsx
import { Modal, Button } from 'mbsw-ui-kit';
import { useState } from 'react';

function BasicModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        모달 열기
      </Button>
      
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="기본 모달"
      >
        <p>모달 내용입니다.</p>
      </Modal>
    </>
  );
}
```

### 고급 모달 설정
```tsx
// 다양한 크기
<Modal size="small" title="작은 모달">작은 모달</Modal>
<Modal size="medium" title="보통 모달">보통 모달</Modal>
<Modal size="large" title="큰 모달">큰 모달</Modal>
<Modal size="xl" title="매우 큰 모달">매우 큰 모달</Modal>

// 4가지 애니메이션
<Modal animation="fade" title="페이드">페이드 애니메이션</Modal>
<Modal animation="slideUp" title="슬라이드 업">슬라이드 업 애니메이션</Modal>
<Modal animation="slideDown" title="슬라이드 다운">슬라이드 다운 애니메이션</Modal>
<Modal animation="zoom" title="줌">줌 애니메이션</Modal>

// 사용자 정의 푸터
<Modal
  title="확인 모달"
  footer={
    <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
      <Button variant="secondary" onClick={handleCancel}>
        취소
      </Button>
      <Button variant="primary" onClick={handleConfirm}>
        확인
      </Button>
    </div>
  }
>
  정말로 삭제하시겠습니까?
</Modal>
```

### 모달 훅 패턴
```tsx
// useModal 커스텀 훅
function useModal() {
  const [isOpen, setIsOpen] = useState(false);
  
  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);
  
  return { isOpen, openModal, closeModal };
}

// 사용법
function App() {
  const confirmModal = useModal();
  const settingsModal = useModal();

  return (
    <div>
      <Button onClick={confirmModal.openModal}>확인 모달</Button>
      <Button onClick={settingsModal.openModal}>설정 모달</Button>
      
      <Modal {...confirmModal} title="확인">
        작업을 계속하시겠습니까?
      </Modal>
      
      <Modal {...settingsModal} title="설정" size="large">
        설정 내용
      </Modal>
    </div>
  );
}
```

## 🏗️ Layout 컴포넌트

### 기본 레이아웃
```tsx
import { Layout, Header, Footer } from 'mbsw-ui-kit';

function App() {
  const navigationItems = [
    { label: '홈', href: '/', active: true },
    { label: '제품', href: '/products' },
    { label: '서비스', href: '/services' },
    { label: '연락처', href: '/contact' },
  ];

  return (
    <Layout
      header={
        <Header 
          logo={<div>My App</div>}
          navigation={navigationItems}
        />
      }
      footer={
        <Footer 
          copyright="© 2024 My Company"
        />
      }
    >
      <main>
        페이지 콘텐츠
      </main>
    </Layout>
  );
}
```

### 고급 Header 설정
```tsx
const advancedNavigationItems = [
  { 
    label: '제품', 
    children: [ // 드롭다운 메뉴
      { label: '웹 서비스', href: '/products/web' },
      { label: '모바일 앱', href: '/products/mobile' },
    ]
  },
  { label: '회사소개', href: '/about' },
  { label: '연락처', href: '/contact', disabled: true },
];

<Header
  logo={<img src="/logo.png" alt="Logo" />}
  logoHref="/"
  navigation={advancedNavigationItems}
  actions={
    <div style={{ display: 'flex', gap: '8px' }}>
      <Button variant="secondary" size="small">로그인</Button>
      <Button variant="primary" size="small">회원가입</Button>
    </div>
  }
  sticky={true}
  maxWidth="xl"
/>
```

### 고급 Footer 설정
```tsx
const footerSections = [
  {
    title: '제품',
    links: [
      { label: '웹 서비스', href: '/products/web' },
      { label: '모바일 앱', href: '/products/mobile' },
      { label: 'API', href: '/api' },
    ]
  },
  {
    title: '회사',
    links: [
      { label: '회사소개', href: '/about' },
      { label: '팀', href: '/team' },
      { label: '채용', href: '/careers' },
    ]
  },
  {
    title: '지원',
    links: [
      { label: '문서', href: '/docs' },
      { label: '커뮤니티', href: '/community' },
      { label: '연락처', href: '/contact' },
    ]
  },
];

const socialLinks = [
  { platform: 'github', href: 'https://github.com/company' },
  { platform: 'twitter', href: 'https://twitter.com/company' },
  { platform: 'linkedin', href: 'https://linkedin.com/company/company' },
];

<Footer
  sections={footerSections}
  socialLinks={socialLinks}
  logo={<img src="/logo.png" alt="Logo" />}
  copyright="© 2024 My Company. All rights reserved."
  showDivider={true}
  maxWidth="xl"
/>
```

## 📱 반응형 디자인

### 브레이크포인트 사용
```tsx
import styled from 'styled-components';

const ResponsiveContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.sm};
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing.md};
  }
  
  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding: ${({ theme }) => theme.spacing.lg};
  }
`;
```

### 모바일 우선 개발
```tsx
// 모든 컴포넌트는 모바일 우선으로 설계됨
<Header 
  // 모바일에서 자동으로 햄버거 메뉴로 변환
  navigation={navigationItems}
  // 태블릿 이하에서 모바일 메뉴 표시
  showMobileMenu={true}
/>
```

## 🌐 국제화 (i18n)

### 다국어 지원 설정
```tsx
import { I18nProvider, useI18n } from 'mbsw-ui-kit';

const messages = {
  ko: {
    login: '로그인',
    logout: '로그아웃',
    email: '이메일',
    password: '비밀번호',
  },
  en: {
    login: 'Login',
    logout: 'Logout', 
    email: 'Email',
    password: 'Password',
  },
};

function App() {
  return (
    <I18nProvider messages={messages} defaultLocale="ko">
      <LoginForm />
    </I18nProvider>
  );
}

function LoginForm() {
  const { t, locale, setLocale } = useI18n();
  
  return (
    <div>
      <Button onClick={() => setLocale(locale === 'ko' ? 'en' : 'ko')}>
        {locale === 'ko' ? 'English' : '한국어'}
      </Button>
      
      <ValidatedInput 
        label={t('email')}
        validation={VALIDATION_PRESETS.email}
      />
      
      <ValidatedInput 
        type="password"
        label={t('password')}
        validation={VALIDATION_PRESETS.password}
      />
      
      <Button variant="primary">
        {t('login')}
      </Button>
    </div>
  );
}
```

## 🧪 테스팅

### 컴포넌트 테스트 작성
```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { Button, lightTheme } from 'mbsw-ui-kit';

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={lightTheme}>
      {component}
    </ThemeProvider>
  );
};

test('Button 클릭 이벤트가 정상 작동한다', () => {
  const handleClick = jest.fn();
  
  renderWithTheme(
    <Button onClick={handleClick}>
      테스트 버튼
    </Button>
  );
  
  const button = screen.getByRole('button', { name: '테스트 버튼' });
  fireEvent.click(button);
  
  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

### 접근성 테스트
```tsx
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

test('Modal 컴포넌트가 접근성 규칙을 준수한다', async () => {
  const { container } = renderWithTheme(
    <Modal isOpen={true} title="테스트 모달">
      모달 내용
    </Modal>
  );
  
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

## ⚡ 성능 최적화

### 번들 크기 최적화
```tsx
// 필요한 컴포넌트만 가져오기
import { Button } from 'mbsw-ui-kit/Button';
import { Input } from 'mbsw-ui-kit/Input';

// 대신 다음과 같이 사용하지 마세요:
// import { Button, Input } from 'mbsw-ui-kit'; // 전체 라이브러리 로드
```

### React.memo 사용
```tsx
import React, { memo } from 'react';
import { Button } from 'mbsw-ui-kit';

const OptimizedComponent = memo(function OptimizedComponent({ 
  title, 
  onAction 
}: {
  title: string;
  onAction: () => void;
}) {
  return (
    <div>
      <h2>{title}</h2>
      <Button onClick={onAction}>액션</Button>
    </div>
  );
});
```

## 🔧 커스터마이제이션

### 스타일 오버라이드
```tsx
import styled from 'styled-components';
import { Button as BaseButton } from 'mbsw-ui-kit';

const CustomButton = styled(BaseButton)`
  border-radius: 0;
  text-transform: uppercase;
  
  &:hover {
    transform: scale(1.05);
  }
`;
```

### 테마 확장
```tsx
declare module 'styled-components' {
  interface DefaultTheme {
    // 기본 테마 확장
    customColors: {
      brand: string;
      accent: string;
    };
  }
}

const extendedTheme = {
  ...lightTheme,
  customColors: {
    brand: '#ff6b6b',
    accent: '#4ecdc4',
  },
};
```

## 📊 실제 사용 예시

### 전체 애플리케이션 구조
```tsx
import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import {
  Layout,
  Header,
  Footer,
  Button,
  Modal,
  ValidatedInput,
  lightTheme,
  darkTheme,
  GlobalStyle,
  VALIDATION_PRESETS
} from 'mbsw-ui-kit';

function App() {
  const [isDark, setIsDark] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigationItems = [
    { label: '홈', href: '/', active: true },
    { label: '제품', href: '/products' },
    { label: '서비스', href: '/services' },
    { label: '연락처', href: '/contact' },
  ];

  const footerSections = [
    {
      title: '제품',
      links: [
        { label: 'UI Kit', href: '/ui-kit' },
        { label: 'Templates', href: '/templates' },
      ]
    }
  ];

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <GlobalStyle />
      <Layout
        header={
          <Header
            logo={<div>MBSW</div>}
            navigation={navigationItems}
            actions={
              <div style={{ display: 'flex', gap: '8px' }}>
                <Button
                  variant="secondary"
                  size="small"
                  onClick={() => setIsDark(!isDark)}
                >
                  {isDark ? '라이트' : '다크'}
                </Button>
                <Button
                  variant="primary"
                  size="small"
                  onClick={() => setIsModalOpen(true)}
                >
                  시작하기
                </Button>
              </div>
            }
            sticky={true}
          />
        }
        footer={
          <Footer
            sections={footerSections}
            socialLinks={[
              { platform: 'github', href: 'https://github.com/company' }
            ]}
            copyright="© 2024 MBSW Team"
          />
        }
      >
        <main style={{ padding: '40px 20px', flex: 1 }}>
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h1>환영합니다!</h1>
            <p>MBSW UI Kit를 사용한 예시 애플리케이션입니다.</p>

            <div style={{ marginTop: '32px' }}>
              <ValidatedInput
                label="이메일"
                validation={VALIDATION_PRESETS.email}
                validateOnChange={true}
                placeholder="이메일을 입력하세요"
              />
              
              <ValidatedInput
                type="password"
                label="비밀번호"
                validation={VALIDATION_PRESETS.password}
                showStrengthIndicator={true}
                placeholder="비밀번호를 입력하세요"
              />

              <div style={{ marginTop: '24px' }}>
                <Button variant="primary" fullWidth>
                  가입하기
                </Button>
              </div>
            </div>
          </div>
        </main>

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="MBSW UI Kit에 오신 것을 환영합니다!"
          animation="slideUp"
          size="medium"
        >
          <p>
            React와 TypeScript로 구축된 현대적인 UI 컴포넌트 라이브러리입니다.
          </p>
          <p>
            다크모드, 실시간 검증, 반응형 디자인을 기본 지원합니다.
          </p>
        </Modal>
      </Layout>
    </ThemeProvider>
  );
}

export default App;
```

## 🚨 주의사항 및 Best Practices

### 1. 테마 제공자 필수
모든 컴포넌트는 `ThemeProvider`로 감싸져야 합니다.

### 2. 접근성 고려
- `aria-label`, `aria-describedby` 등 ARIA 속성 활용
- 키보드 내비게이션 지원
- 적절한 색상 대비 유지

### 3. 성능 최적화
- 필요한 컴포넌트만 임포트
- `React.memo` 적극 활용
- 불필요한 리렌더링 방지

### 4. 검증 규칙 재사용
- `VALIDATION_PRESETS` 활용
- 커스텀 검증 규칙은 별도 파일로 관리

### 5. 타입 안전성
- TypeScript 타입 정의 활용
- 제네릭 타입으로 확장성 확보

이 가이드를 통해 MBSW UI Kit를 효과적으로 활용하여 일관성 있고 접근 가능한 사용자 인터페이스를 구축할 수 있습니다.