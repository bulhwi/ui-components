# 🎨 MBSW UI Kit 컴포넌트 쇼케이스

MBSW UI Kit의 모든 컴포넌트와 기능을 한눈에 보여주는 비주얼 가이드입니다.

## 🎭 테마 시스템

### 라이트 테마 vs 다크 테마
```tsx
import { lightTheme, darkTheme } from 'mbsw-ui-kit';

// 색상 팔레트
const colorShowcase = {
  light: {
    primary: '#007bff',      // 주요 액션
    secondary: '#6c757d',    // 보조 액션
    success: '#28a745',      // 성공 상태
    warning: '#ffc107',      // 경고 상태
    danger: '#dc3545',       // 위험/삭제
    background: '#ffffff',   // 배경
    surface: '#f8f9fa',      // 카드/패널
  },
  dark: {
    primary: '#0d6efd',      // 주요 액션 (더 밝게)
    secondary: '#adb5bd',    // 보조 액션
    success: '#198754',      // 성공 상태
    warning: '#fd7e14',      // 경고 상태  
    danger: '#dc3545',       // 위험/삭제
    background: '#121212',   // 배경 (어둡게)
    surface: '#1e1e1e',      // 카드/패널
  }
};
```

## 🔘 Button 컴포넌트 쇼케이스

### 4가지 변형 (Variants)
```tsx
<div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
  <Button variant="primary">Primary 버튼</Button>
  <Button variant="secondary">Secondary 버튼</Button> 
  <Button variant="tertiary">Tertiary 버튼</Button>
  <Button variant="danger">Danger 버튼</Button>
</div>
```

**시각적 특징:**
- **Primary**: 파란 배경, 흰 텍스트, 강한 그림자
- **Secondary**: 회색 테두리, 회색 텍스트, 투명 배경
- **Tertiary**: 텍스트만, 호버 시 배경색 변화
- **Danger**: 빨간색 배경, 위험한 액션용

### 3가지 크기 (Sizes)
```tsx
<div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
  <Button size="small">작은 버튼</Button>
  <Button size="medium">보통 버튼</Button>
  <Button size="large">큰 버튼</Button>
</div>
```

**크기별 특징:**
- **Small**: height 32px, padding 8px 12px, font-size 14px
- **Medium**: height 40px, padding 12px 16px, font-size 16px
- **Large**: height 48px, padding 16px 24px, font-size 18px

### 특수 상태
```tsx
<div style={{ display: 'flex', gap: '12px', flexDirection: 'column' }}>
  {/* 로딩 상태 */}
  <Button loading>처리 중...</Button>
  
  {/* 비활성화 */}
  <Button disabled>비활성화됨</Button>
  
  {/* 전체 너비 */}
  <Button fullWidth variant="primary">전체 너비 버튼</Button>
  
  {/* 아이콘 버튼 */}
  <Button leftIcon={<PlusIcon />} variant="primary">
    추가하기
  </Button>
  
  <Button rightIcon={<ArrowIcon />} variant="secondary">
    다음 단계
  </Button>
</div>
```

## 📝 Input 컴포넌트 쇼케이스

### 7가지 입력 타입
```tsx
<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
  <Input 
    type="text" 
    label="텍스트 입력" 
    placeholder="이름을 입력하세요" 
  />
  
  <Input 
    type="email" 
    label="이메일" 
    placeholder="email@example.com"
    leftIcon={<MailIcon />}
  />
  
  <Input 
    type="password" 
    label="비밀번호" 
    placeholder="비밀번호 입력"
    rightIcon={<EyeIcon />}
  />
  
  <Input 
    type="number" 
    label="숫자" 
    placeholder="나이"
    min={0}
    max={150}
  />
  
  <Input 
    type="tel" 
    label="전화번호" 
    placeholder="010-1234-5678"
  />
  
  <Input 
    type="url" 
    label="웹사이트" 
    placeholder="https://example.com"
  />
  
  <Input 
    type="search" 
    label="검색" 
    placeholder="검색어 입력"
    leftIcon={<SearchIcon />}
  />
</div>
```

### 입력 상태별 스타일
```tsx
{/* 기본 상태 */}
<Input label="기본 상태" placeholder="기본 입력 필드" />

{/* 포커스 상태 */}  
<Input label="포커스됨" placeholder="클릭하면 파란 테두리" autoFocus />

{/* 에러 상태 */}
<Input 
  label="에러 상태" 
  placeholder="잘못된 입력"
  error="올바른 형식이 아닙니다"
/>

{/* 성공 상태 */}
<Input 
  label="성공 상태" 
  placeholder="올바른 입력"
  success="입력이 올바릅니다"
/>

{/* 비활성화 */}
<Input 
  label="비활성화" 
  placeholder="수정할 수 없음"
  disabled
/>
```

### 실시간 검증 시스템
```tsx
import { ValidatedInput, VALIDATION_PRESETS } from 'mbsw-ui-kit';

<div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
  {/* 이메일 검증 */}
  <ValidatedInput 
    validation={VALIDATION_PRESETS.email}
    validateOnChange={true}
    label="이메일 검증"
    placeholder="실시간 이메일 형식 검증"
  />
  
  {/* 비밀번호 강도 */}
  <ValidatedInput 
    validation={VALIDATION_PRESETS.password}
    type="password"
    label="강력한 비밀번호"
    placeholder="8자 이상, 특수문자 포함"
    showStrengthIndicator={true}
  />
  
  {/* 전화번호 검증 */}
  <ValidatedInput 
    validation={VALIDATION_PRESETS.phone}
    type="tel"
    label="전화번호"
    placeholder="올바른 전화번호 형식"
  />
  
  {/* 커스텀 검증 */}
  <ValidatedInput 
    validation={{
      required: true,
      minLength: 3,
      maxLength: 20,
      pattern: /^[a-zA-Z0-9_]+$/,
      custom: [
        {
          test: (value) => !value.includes('admin'),
          message: '예약어는 사용할 수 없습니다'
        }
      ]
    }}
    validateOnChange={true}
    debounceMs={300}
    label="사용자명"
    placeholder="영문, 숫자, _ 만 사용 가능"
  />
</div>
```

**검증 규칙 프리셋:**
- **email**: 이메일 형식 검증
- **password**: 강력한 비밀번호 (8자+, 특수문자, 대소문자, 숫자)
- **phone**: 한국 전화번호 형식
- **url**: URL 형식
- **number**: 숫자 범위 검증

## 🎭 Modal 컴포넌트 쇼케이스

### 4가지 크기
```tsx
<div style={{ display: 'flex', gap: '12px' }}>
  <Button onClick={() => openModal('small')}>
    작은 모달 (400px)
  </Button>
  <Button onClick={() => openModal('medium')}>
    보통 모달 (600px)
  </Button>
  <Button onClick={() => openModal('large')}>  
    큰 모달 (800px)
  </Button>
  <Button onClick={() => openModal('xl')}>
    특대 모달 (1000px)
  </Button>
</div>

{/* 각 크기별 모달 */}
<Modal size="small" title="작은 모달">
  간단한 알림이나 확인 메시지용
</Modal>

<Modal size="large" title="큰 모달">
  복잡한 폼이나 상세 정보 표시용
  <div style={{ height: '400px', overflowY: 'auto' }}>
    많은 내용이 들어가는 경우...
  </div>
</Modal>
```

### 4가지 애니메이션
```tsx
<div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
  <Button onClick={() => openModalWithAnimation('fade')}>
    페이드 인/아웃
  </Button>
  <Button onClick={() => openModalWithAnimation('slideUp')}>
    아래에서 슬라이드 업
  </Button>
  <Button onClick={() => openModalWithAnimation('slideDown')}>
    위에서 슬라이드 다운  
  </Button>
  <Button onClick={() => openModalWithAnimation('zoom')}>
    줌 인/아웃
  </Button>
</div>

{/* 애니메이션별 설정 */}
<Modal animation="slideUp" title="슬라이드 업 모달">
  부드럽게 아래에서 올라오는 애니메이션
</Modal>

<Modal animation="zoom" title="줌 모달">
  중앙에서 확대되는 애니메이션  
</Modal>
```

### 모달 사용 패턴
```tsx
// 1. 기본 알림 모달
<Modal 
  isOpen={alertModal.isOpen}
  onClose={alertModal.close}
  title="알림"
  size="small"
>
  <p>작업이 완료되었습니다.</p>
  <div style={{ textAlign: 'right', marginTop: '16px' }}>
    <Button onClick={alertModal.close}>확인</Button>
  </div>
</Modal>

// 2. 확인 모달
<Modal
  isOpen={confirmModal.isOpen}
  onClose={confirmModal.close}
  title="삭제 확인"
  size="medium"
  footer={
    <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
      <Button variant="secondary" onClick={confirmModal.close}>
        취소
      </Button>
      <Button variant="danger" onClick={handleDelete}>
        삭제
      </Button>
    </div>
  }
>
  <p>정말로 이 항목을 삭제하시겠습니까?</p>
  <p style={{ color: '#dc3545', fontSize: '14px' }}>
    ⚠️ 삭제된 데이터는 복구할 수 없습니다.
  </p>
</Modal>

// 3. 폼 모달
<Modal
  isOpen={formModal.isOpen}
  onClose={formModal.close}
  title="사용자 정보 수정"
  size="large"
>
  <form onSubmit={handleSubmit}>
    <ValidatedInput 
      label="이름"
      validation={{ required: true, minLength: 2 }}
    />
    <ValidatedInput 
      label="이메일"
      validation={VALIDATION_PRESETS.email}
    />
    <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '24px' }}>
      <Button variant="secondary" onClick={formModal.close}>
        취소
      </Button>
      <Button variant="primary" type="submit">
        저장
      </Button>
    </div>
  </form>
</Modal>
```

## 🏗️ Layout 컴포넌트 쇼케이스

### Header 네비게이션 패턴
```tsx
// 1. 기본 Header
<Header 
  logo={<div style={{ fontWeight: 'bold', fontSize: '20px' }}>MBSW</div>}
  navigation={[
    { label: '홈', href: '/', active: true },
    { label: '제품', href: '/products' },
    { label: '서비스', href: '/services' },
    { label: '연락처', href: '/contact' },
  ]}
  actions={
    <div style={{ display: 'flex', gap: '8px' }}>
      <Button variant="secondary" size="small">로그인</Button>
      <Button variant="primary" size="small">회원가입</Button>
    </div>
  }
/>

// 2. 드롭다운 메뉴가 있는 Header
<Header 
  logo={<img src="/logo.png" alt="Logo" style={{ height: '32px' }} />}
  navigation={[
    { 
      label: '제품',
      children: [
        { label: '웹 서비스', href: '/products/web' },
        { label: '모바일 앱', href: '/products/mobile' },
        { label: 'API', href: '/products/api' },
      ]
    },
    { label: '가격', href: '/pricing' },
    { label: '문서', href: '/docs' },
  ]}
  sticky={true}
  maxWidth="xl"
/>

// 3. 모바일 대응 Header
<Header 
  logo={<div>모바일 로고</div>}
  navigation={mobileNavigation}
  showMobileMenu={isMobileMenuOpen}
  onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
/>
```

### Footer 섹션 구성
```tsx
const footerSections = [
  {
    title: '제품',
    links: [
      { label: 'UI 컴포넌트', href: '/components' },
      { label: '디자인 시스템', href: '/design-system' },
      { label: 'Storybook', href: '/storybook' },
      { label: 'NPM 패키지', href: '/npm' },
    ]
  },
  {
    title: '개발자',  
    links: [
      { label: 'API 문서', href: '/api-docs' },
      { label: 'GitHub', href: 'https://github.com/company' },
      { label: '코드 예제', href: '/examples' },
      { label: '기여하기', href: '/contributing' },
    ]
  },
  {
    title: '지원',
    links: [
      { label: '도움말', href: '/help' },
      { label: 'FAQ', href: '/faq' },
      { label: '커뮤니티', href: '/community' },
      { label: '연락처', href: '/contact' },
    ]
  },
  {
    title: '회사',
    links: [
      { label: '회사소개', href: '/about' },
      { label: '팀', href: '/team' },
      { label: '채용', href: '/careers' },
      { label: '블로그', href: '/blog' },
    ]
  }
];

const socialLinks = [
  { platform: 'github', href: 'https://github.com/company' },
  { platform: 'twitter', href: 'https://twitter.com/company' },
  { platform: 'linkedin', href: 'https://linkedin.com/company/company' },
  { platform: 'slack', href: 'https://company.slack.com' },
];

<Footer
  sections={footerSections}
  socialLinks={socialLinks}
  logo={<img src="/logo-white.png" alt="Logo" />}
  copyright="© 2024 MBSW Team. All rights reserved."
  showDivider={true}
  maxWidth="xl"
/>
```

### 완전한 Layout 예시
```tsx
function AppLayout({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false);
  
  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <Layout
        header={
          <Header
            logo={<div style={{ fontWeight: 'bold', fontSize: '20px' }}>MBSW</div>}
            navigation={[
              { label: '홈', href: '/', active: true },
              { label: '컴포넌트', href: '/components' },
              { label: '가이드', href: '/guide' },
            ]}
            actions={
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <Button
                  variant="secondary"
                  size="small"
                  onClick={() => setIsDark(!isDark)}
                >
                  {isDark ? '☀️' : '🌙'}
                </Button>
                <Button variant="primary" size="small">
                  시작하기
                </Button>
              </div>
            }
            sticky={true}
            maxWidth="xl"
          />
        }
        footer={
          <Footer
            sections={[
              {
                title: 'MBSW UI Kit',
                links: [
                  { label: 'GitHub', href: 'https://github.com/company' },
                  { label: 'Storybook', href: '/storybook' },
                  { label: '문서', href: '/docs' },
                ]
              }
            ]}
            copyright="© 2024 MBSW Team"
          />
        }
      >
        {children}
      </Layout>
    </ThemeProvider>
  );
}
```

## 📱 반응형 디자인 쇼케이스

### 브레이크포인트 시스템
```tsx
const breakpoints = {
  mobile: '480px',    // 모바일
  tablet: '768px',    // 태블릿  
  desktop: '1024px',  // 데스크톱
  wide: '1200px',     // 와이드 스크린
};

// 사용 예시
const ResponsiveGrid = styled.div`
  display: grid;
  gap: 16px;
  
  /* 모바일: 1열 */
  grid-template-columns: 1fr;
  
  /* 태블릿: 2열 */
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  /* 데스크톱: 3열 */
  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;
```

### 모바일 최적화 예시
```tsx
// 모바일에서 자동으로 스택 레이아웃으로 변경
<div style={{ 
  display: 'flex',
  gap: '16px',
  '@media (max-width: 768px)': {
    flexDirection: 'column'
  }
}}>
  <Button variant="primary" fullWidth>
    모바일에서 전체 너비
  </Button>
  <Button variant="secondary" fullWidth>
    버튼들이 세로로 배치
  </Button>
</div>

// Header는 자동으로 햄버거 메뉴로 변환
<Header 
  navigation={navigation}
  // 768px 이하에서 자동으로 모바일 메뉴 활성화
/>
```

## 🌐 국제화(i18n) 쇼케이스

```tsx
import { I18nProvider, useI18n } from 'mbsw-ui-kit';

const messages = {
  ko: {
    // 공통 UI
    confirm: '확인',
    cancel: '취소', 
    save: '저장',
    edit: '수정',
    delete: '삭제',
    
    // 입력 검증
    'validation.email.invalid': '올바른 이메일 형식이 아닙니다',
    'validation.password.weak': '비밀번호가 너무 약합니다',
    'validation.required': '필수 입력 항목입니다',
    
    // 모달
    'modal.close': '닫기',
    'modal.confirm.title': '확인',
    'modal.confirm.message': '정말로 실행하시겠습니까?',
  },
  en: {
    // 공통 UI  
    confirm: 'Confirm',
    cancel: 'Cancel',
    save: 'Save', 
    edit: 'Edit',
    delete: 'Delete',
    
    // 입력 검증
    'validation.email.invalid': 'Invalid email format',
    'validation.password.weak': 'Password is too weak',
    'validation.required': 'This field is required',
    
    // 모달
    'modal.close': 'Close',
    'modal.confirm.title': 'Confirm',
    'modal.confirm.message': 'Are you sure you want to proceed?',
  }
};

function MultiLanguageApp() {
  return (
    <I18nProvider messages={messages} defaultLocale="ko">
      <MultiLanguageForm />
    </I18nProvider>
  );
}

function MultiLanguageForm() {
  const { t, locale, setLocale } = useI18n();
  
  return (
    <div>
      {/* 언어 전환 버튼 */}
      <div style={{ marginBottom: '16px' }}>
        <Button 
          variant="secondary" 
          size="small"
          onClick={() => setLocale(locale === 'ko' ? 'en' : 'ko')}
        >
          {locale === 'ko' ? 'English' : '한국어'}
        </Button>
      </div>
      
      {/* 다국어 폼 */}
      <ValidatedInput 
        label={t('validation.email.invalid').replace('올바른 ', '').replace(' 형식이 아닙니다', '')}
        validation={VALIDATION_PRESETS.email}
        placeholder={locale === 'ko' ? 'email@example.com' : 'Enter your email'}
      />
      
      <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
        <Button variant="primary">
          {t('save')}
        </Button>
        <Button variant="secondary">
          {t('cancel')}
        </Button>
      </div>
    </div>
  );
}
```

## 🎨 커스터마이제이션 쇼케이스

### 테마 확장
```tsx
// 커스텀 브랜드 색상 추가
const customTheme = {
  ...lightTheme,
  colors: {
    ...lightTheme.colors,
    brand: '#ff6b6b',
    accent: '#4ecdc4',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  // 커스텀 그림자
  shadows: {
    ...lightTheme.shadows,
    brand: '0 4px 20px rgba(255, 107, 107, 0.3)',
    glow: '0 0 20px rgba(76, 201, 196, 0.5)',
  }
};

// 커스텀 테마 사용
<ThemeProvider theme={customTheme}>
  <CustomBrandButton />
</ThemeProvider>
```

### 컴포넌트 스타일 확장
```tsx
// Button 확장
const GradientButton = styled(Button)`
  background: ${({ theme }) => theme.colors.gradient};
  border: none;
  color: white;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: left 0.5s;
  }
  
  &:hover::before {
    left: 100%;
  }
`;

// Input 확장
const FloatingLabelInput = styled(Input)`
  .input-wrapper {
    position: relative;
    
    label {
      position: absolute;
      top: 50%;
      left: 12px;
      transform: translateY(-50%);
      transition: all 0.2s;
      pointer-events: none;
      color: ${({ theme }) => theme.colors.text.secondary};
    }
    
    input:focus + label,
    input:not(:placeholder-shown) + label {
      top: 0;
      left: 8px;
      font-size: 12px;
      background: ${({ theme }) => theme.colors.background};
      padding: 0 4px;
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;
```

## 🧪 테스트 가이드 쇼케이스

### 컴포넌트 테스트 예시
```tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { Button, Modal, ValidatedInput, lightTheme } from 'mbsw-ui-kit';

// 테스트 래퍼
const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={lightTheme}>
    {children}
  </ThemeProvider>
);

// Button 테스트
describe('Button Component', () => {
  test('모든 변형이 올바르게 렌더링된다', () => {
    render(
      <TestWrapper>
        <Button variant="primary" data-testid="primary">Primary</Button>
        <Button variant="secondary" data-testid="secondary">Secondary</Button>
        <Button variant="tertiary" data-testid="tertiary">Tertiary</Button>
        <Button variant="danger" data-testid="danger">Danger</Button>
      </TestWrapper>
    );
    
    expect(screen.getByTestId('primary')).toBeInTheDocument();
    expect(screen.getByTestId('secondary')).toBeInTheDocument();
    expect(screen.getByTestId('tertiary')).toBeInTheDocument();
    expect(screen.getByTestId('danger')).toBeInTheDocument();
  });
  
  test('클릭 이벤트가 정상 작동한다', () => {
    const handleClick = jest.fn();
    
    render(
      <TestWrapper>
        <Button onClick={handleClick}>클릭 테스트</Button>
      </TestWrapper>
    );
    
    fireEvent.click(screen.getByText('클릭 테스트'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});

// Modal 테스트
describe('Modal Component', () => {
  test('ESC 키로 모달을 닫을 수 있다', () => {
    const handleClose = jest.fn();
    
    render(
      <TestWrapper>
        <Modal isOpen={true} onClose={handleClose} title="테스트 모달">
          모달 내용
        </Modal>
      </TestWrapper>
    );
    
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});

// ValidatedInput 테스트
describe('ValidatedInput Component', () => {
  test('실시간 이메일 검증이 작동한다', async () => {
    render(
      <TestWrapper>
        <ValidatedInput 
          validation={{ email: true }}
          validateOnChange={true}
          data-testid="email-input"
        />
      </TestWrapper>
    );
    
    const input = screen.getByTestId('email-input');
    
    // 잘못된 이메일 입력
    fireEvent.change(input, { target: { value: 'invalid-email' } });
    
    await waitFor(() => {
      expect(screen.getByText(/올바른 이메일 형식이 아닙니다/)).toBeInTheDocument();
    });
    
    // 올바른 이메일 입력
    fireEvent.change(input, { target: { value: 'test@example.com' } });
    
    await waitFor(() => {
      expect(screen.queryByText(/올바른 이메일 형식이 아닙니다/)).not.toBeInTheDocument();
    });
  });
});
```

## 📊 성능 최적화 쇼케이스

### 번들 크기 최적화
```tsx
// ❌ 전체 라이브러리 임포트 (권장하지 않음)
import { Button, Input, Modal } from 'mbsw-ui-kit';

// ✅ 개별 컴포넌트 임포트 (권장)
import { Button } from 'mbsw-ui-kit/Button';
import { Input } from 'mbsw-ui-kit/Input';
import { Modal } from 'mbsw-ui-kit/Modal';

// ✅ Tree shaking 지원
import { Button, Input } from 'mbsw-ui-kit'; // Rollup/Webpack에서 자동으로 tree shaking
```

### React.memo 최적화
```tsx
import React, { memo, useMemo, useCallback } from 'react';
import { Button, Input } from 'mbsw-ui-kit';

// 최적화된 폼 컴포넌트
const OptimizedForm = memo(function OptimizedForm({ 
  onSubmit, 
  initialData 
}: {
  onSubmit: (data: any) => void;
  initialData: any;
}) {
  const [formData, setFormData] = useState(initialData);
  
  // 콜백 메모이제이션
  const handleInputChange = useCallback((field: string) => 
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData(prev => ({ ...prev, [field]: e.target.value }));
    }, []
  );
  
  // 검증 규칙 메모이제이션
  const validationRules = useMemo(() => ({
    email: VALIDATION_PRESETS.email,
    password: VALIDATION_PRESETS.password,
  }), []);
  
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(formData); }}>
      <ValidatedInput 
        validation={validationRules.email}
        onChange={handleInputChange('email')}
        value={formData.email}
      />
      <ValidatedInput 
        type="password"
        validation={validationRules.password}
        onChange={handleInputChange('password')}
        value={formData.password}
      />
      <Button type="submit" variant="primary">
        제출
      </Button>
    </form>
  );
});
```

## 🎯 실제 프로젝트 적용 예시

### E-commerce 사이트
```tsx
function ProductPage() {
  return (
    <Layout
      header={
        <Header 
          logo={<ShopLogo />}
          navigation={[
            { label: '카테고리', children: categoryMenu },
            { label: '베스트', href: '/best' },
            { label: '할인', href: '/sale' },
          ]}
          actions={<CartIcon />}
        />
      }
    >
      <ProductGrid />
      <FilterModal />
      <CartModal />
    </Layout>
  );
}
```

### 관리자 대시보드
```tsx
function AdminDashboard() {
  return (
    <Layout
      header={
        <Header 
          logo={<AdminLogo />}
          navigation={adminNavigation}
          actions={<UserProfile />}
        />
      }
    >
      <DashboardStats />
      <DataTable />
      <ActionModals />
    </Layout>
  );
}
```

### SaaS 랜딩 페이지
```tsx
function LandingPage() {
  return (
    <Layout
      header={
        <Header 
          logo={<CompanyLogo />}
          navigation={[
            { label: '기능', href: '#features' },
            { label: '가격', href: '#pricing' },
            { label: '고객사', href: '#customers' },
          ]}
          actions={
            <div style={{ display: 'flex', gap: '8px' }}>
              <Button variant="secondary">로그인</Button>
              <Button variant="primary">무료 체험</Button>
            </div>
          }
          transparent={true}
          sticky={true}
        />
      }
      footer={<CompanyFooter />}
    >
      <HeroSection />
      <FeaturesSection />
      <PricingSection />
      <CTASection />
    </Layout>
  );
}
```

이 쇼케이스를 통해 MBSW UI Kit의 모든 컴포넌트와 기능을 실제 프로젝트에서 어떻게 활용할 수 있는지 확인할 수 있습니다. 각 컴포넌트는 독립적으로 사용하거나 조합하여 복잡한 UI를 구성할 수 있습니다.