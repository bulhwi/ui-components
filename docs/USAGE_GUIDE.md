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

## 📊 Table 컴포넌트

### 기본 테이블
```tsx
import { Table } from 'mbsw-ui-kit';

const columns = [
  { 
    key: 'name', 
    title: '이름', 
    width: 200,
    sortable: true 
  },
  { 
    key: 'email', 
    title: '이메일', 
    width: 300,
    sortable: true 
  },
  { 
    key: 'role', 
    title: '역할', 
    width: 150 
  },
  { 
    key: 'status', 
    title: '상태', 
    width: 100,
    render: (value: string) => (
      <Badge color={value === 'active' ? 'success' : 'secondary'}>
        {value === 'active' ? '활성' : '비활성'}
      </Badge>
    )
  }
];

const data = [
  { 
    id: 1, 
    name: '김철수', 
    email: 'kim@example.com', 
    role: '개발자', 
    status: 'active' 
  },
  { 
    id: 2, 
    name: '이영희', 
    email: 'lee@example.com', 
    role: '디자이너', 
    status: 'inactive' 
  },
];

<Table 
  columns={columns}
  data={data}
  loading={false}
  caption="사용자 목록"
/>
```

### 고급 테이블 기능
```tsx
// 정렬, 필터링, 페이지네이션이 있는 테이블
<Table
  columns={columns}
  data={data}
  // 정렬 기능
  sortable={true}
  defaultSort={{ key: 'name', direction: 'asc' }}
  onSort={(sortConfig) => console.log('정렬:', sortConfig)}
  
  // 필터링 기능
  filterable={true}
  searchPlaceholder="사용자 검색..."
  onFilter={(filteredData) => console.log('필터된 데이터:', filteredData)}
  
  // 페이지네이션
  pagination={{
    enabled: true,
    pageSize: 10,
    showSizeChanger: true,
    showInfo: true,
    pageSizeOptions: [10, 20, 50, 100]
  }}
  
  // 행 선택
  selection={{
    enabled: true,
    type: 'multiple', // 'single' | 'multiple'
    onSelectionChange: (selectedRows) => console.log('선택된 행:', selectedRows)
  }}
  
  // 로딩 상태
  loading={isLoading}
  
  // 빈 상태 커스터마이징
  emptyState={{
    message: '데이터가 없습니다',
    action: <Button>데이터 추가</Button>
  }}
  
  // 행 액션
  onRowClick={(row) => console.log('행 클릭:', row)}
  onRowDoubleClick={(row) => console.log('행 더블클릭:', row)}
/>
```

### 반응형 테이블 (모바일)
```tsx
// 모바일에서 자동으로 카드 형태로 변환
<Table
  columns={columns}
  data={data}
  responsive={true}
  mobileBreakpoint={768}
  // 모바일에서 표시할 주요 필드들
  mobileKeyFields={['name', 'email']}
/>
```

### 테이블 액션 버튼
```tsx
const columnsWithActions = [
  ...columns,
  {
    key: 'actions',
    title: '액션',
    width: 120,
    render: (value: any, row: any) => (
      <div style={{ display: 'flex', gap: '8px' }}>
        <Button size="small" variant="secondary" onClick={() => handleEdit(row)}>
          수정
        </Button>
        <Button size="small" variant="danger" onClick={() => handleDelete(row)}>
          삭제
        </Button>
      </div>
    )
  }
];
```

## 🃏 Card 컴포넌트

### 기본 카드
```tsx
import { Card, CardContent, CardActions, Button } from 'mbsw-ui-kit';

// 단순한 카드
<Card>
  <CardContent>
    <h3>기본 카드</h3>
    <p>카드 내용입니다.</p>
  </CardContent>
</Card>

// 헤더와 액션이 있는 카드
<Card
  header={{
    title: '제품 카드',
    subtitle: '최신 업데이트',
    avatar: '/avatar.jpg'
  }}
  footer={{
    children: <Button variant="primary">자세히 보기</Button>,
    align: 'right'
  }}
>
  <CardContent>
    제품에 대한 상세 설명이 들어갑니다.
  </CardContent>
</Card>
```

### 카드 변형
```tsx
// 3가지 스타일 변형
<Card variant="filled">채워진 카드</Card>
<Card variant="outlined">테두리 카드</Card>
<Card variant="elevated">그림자 카드</Card>

// 3가지 크기
<Card size="small">작은 카드</Card>
<Card size="medium">보통 카드</Card>
<Card size="large">큰 카드</Card>

// 방향 설정
<Card direction="vertical">세로 카드</Card>
<Card direction="horizontal">가로 카드</Card>
```

### 이미지가 있는 카드
```tsx
<Card
  image={{
    src: '/product.jpg',
    alt: '제품 이미지',
    position: 'top', // 'top' | 'left' | 'right'
    aspectRatio: '16/9'
  }}
  header={{
    title: '제품명',
    subtitle: '₩99,000'
  }}
>
  <CardContent>
    제품에 대한 설명입니다.
  </CardContent>
  <CardActions>
    <Button variant="primary">구매하기</Button>
    <Button variant="secondary">장바구니</Button>
  </CardActions>
</Card>
```

### 인터랙티브 카드
```tsx
// 클릭 가능한 카드
<Card 
  clickable={true}
  onClick={() => navigate('/product/1')}
  selected={selectedCard === 1}
  hoverable={true}
>
  <CardContent>
    클릭 가능한 카드입니다.
  </CardContent>
</Card>

// 선택 가능한 카드 그룹
function SelectableCards() {
  const [selected, setSelected] = useState<string | null>(null);
  
  return (
    <CardGrid columns={3} gap="medium">
      {plans.map(plan => (
        <Card
          key={plan.id}
          clickable
          selected={selected === plan.id}
          onClick={() => setSelected(plan.id)}
          variant="outlined"
        >
          <CardContent>
            <h3>{plan.name}</h3>
            <p>{plan.price}</p>
            <p>{plan.description}</p>
          </CardContent>
        </Card>
      ))}
    </CardGrid>
  );
}
```

### 카드 레이아웃
```tsx
// 그리드 레이아웃
<CardGrid columns={3} gap="large" responsive={true}>
  <Card>카드 1</Card>
  <Card>카드 2</Card>
  <Card>카드 3</Card>
</CardGrid>

// 그룹 레이아웃 (공통 스타일 적용)
<CardGroup variant="outlined" spacing="medium">
  <Card>그룹 카드 1</Card>
  <Card>그룹 카드 2</Card>
</CardGroup>
```

### 로딩 상태 카드
```tsx
// 스켈레톤 로딩
<Card loading={true}>
  <CardContent>
    로딩 중일 때 스켈레톤이 표시됩니다.
  </CardContent>
</Card>

// 커스텀 로딩 상태
{isLoading ? (
  <Card>
    <CardContent>
      <LoadingSpinner text="데이터를 불러오는 중..." />
    </CardContent>
  </Card>
) : (
  <Card>
    <CardContent>
      실제 콘텐츠
    </CardContent>
  </Card>
)}
```

## 🔄 LoadingSpinner 컴포넌트

### 기본 스피너
```tsx
import { LoadingSpinner } from 'mbsw-ui-kit';

// 4가지 애니메이션 변형
<LoadingSpinner variant="circular" />
<LoadingSpinner variant="dots" />
<LoadingSpinner variant="bars" />
<LoadingSpinner variant="pulse" />

// 3가지 크기
<LoadingSpinner size="small" />
<LoadingSpinner size="medium" />
<LoadingSpinner size="large" />

// 3가지 색상
<LoadingSpinner color="primary" />
<LoadingSpinner color="secondary" />
<LoadingSpinner color="white" />
```

### 텍스트가 있는 스피너
```tsx
// 텍스트 위치 설정
<LoadingSpinner text="로딩 중..." textPosition="bottom" />
<LoadingSpinner text="처리 중..." textPosition="right" />

// 인라인 스피너 (텍스트 내 삽입)
<p>
  데이터를 불러오는 중 <LoadingSpinner size="small" inline /> 잠시 기다려주세요.
</p>
```

### 전체 화면 오버레이
```tsx
import { LoadingSpinnerOverlay } from 'mbsw-ui-kit';

function DataPage() {
  const [loading, setLoading] = useState(false);
  
  const fetchData = async () => {
    setLoading(true);
    try {
      await api.fetchData();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button onClick={fetchData}>데이터 로드</Button>
      
      <LoadingSpinnerOverlay
        show={loading}
        spinnerProps={{
          variant: 'circular',
          size: 'large',
          text: '데이터를 불러오는 중...',
          color: 'white'
        }}
        opacity={0.7}
        closeOnClick={true}
        onClose={() => setLoading(false)}
      />
    </div>
  );
}
```

### 복수 스피너 그룹
```tsx
import { LoadingSpinnerGroup } from 'mbsw-ui-kit';

// 수평 그룹
<LoadingSpinnerGroup direction="horizontal" spacing="large">
  <LoadingSpinner variant="circular" text="단계 1" />
  <LoadingSpinner variant="dots" text="단계 2" />
  <LoadingSpinner variant="bars" text="단계 3" />
</LoadingSpinnerGroup>

// 수직 그룹
<LoadingSpinnerGroup direction="vertical" spacing="medium">
  <LoadingSpinner text="파일 업로드 중..." />
  <LoadingSpinner text="데이터 처리 중..." />
  <LoadingSpinner text="완료 중..." />
</LoadingSpinnerGroup>
```

### 실용적인 로딩 패턴
```tsx
// 버튼 로딩 상태
function SubmitButton() {
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async () => {
    setLoading(true);
    try {
      await submitForm();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button onClick={handleSubmit} disabled={loading}>
      {loading ? (
        <>
          <LoadingSpinner size="small" color="white" inline />
          처리 중...
        </>
      ) : (
        '제출하기'
      )}
    </Button>
  );
}

// 페이지 로딩 상태
function PageLoader({ loading, children }: { loading: boolean; children: React.ReactNode }) {
  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '200px' 
      }}>
        <LoadingSpinner 
          variant="circular" 
          text="페이지를 불러오는 중..." 
        />
      </div>
    );
  }
  
  return <>{children}</>;
}
```

## 🔔 Toast 컴포넌트

### 기본 Toast 사용법
```tsx
import { ToastProvider, useToast } from 'mbsw-ui-kit';

function App() {
  return (
    <ToastProvider>
      <MyComponent />
    </ToastProvider>
  );
}

function MyComponent() {
  const toast = useToast();

  return (
    <div>
      <Button onClick={() => toast.success('성공적으로 저장되었습니다!')}>
        Success Toast
      </Button>
      <Button onClick={() => toast.error('오류가 발생했습니다.')}>
        Error Toast
      </Button>
      <Button onClick={() => toast.warning('주의가 필요합니다.')}>
        Warning Toast
      </Button>
      <Button onClick={() => toast.info('새로운 정보가 있습니다.')}>
        Info Toast
      </Button>
    </div>
  );
}
```

### Toast 옵션 설정
```tsx
function MyComponent() {
  const toast = useToast();

  const showCustomToast = () => {
    toast.success('파일이 업로드되었습니다.', {
      duration: 5000,           // 5초 후 자동 닫기
      position: 'top-center',   // 상단 중앙에 표시
      animation: 'bounce',      // 바운스 애니메이션
      closable: true,          // 수동 닫기 버튼 표시
      pauseOnHover: true,      // 마우스 호버 시 타이머 정지
      showProgress: true,      // 프로그레스 바 표시
    });
  };

  return (
    <Button onClick={showCustomToast}>
      커스텀 Toast 표시
    </Button>
  );
}
```

### Toast 위치 설정
```tsx
// 6가지 위치 지원
toast.info('우상단', { position: 'top-right' });
toast.info('좌상단', { position: 'top-left' });
toast.info('상단 중앙', { position: 'top-center' });
toast.info('우하단', { position: 'bottom-right' });
toast.info('좌하단', { position: 'bottom-left' });
toast.info('하단 중앙', { position: 'bottom-center' });
```

### 애니메이션 종류
```tsx
// 3가지 애니메이션 지원
toast.info('슬라이드 애니메이션', { animation: 'slide' });
toast.info('페이드 애니메이션', { animation: 'fade' });
toast.info('바운스 애니메이션', { animation: 'bounce' });
```

### 액션 버튼이 있는 Toast
```tsx
function FileUploadComponent() {
  const toast = useToast();

  const handleUpload = () => {
    toast.success('파일이 업로드되었습니다.', {
      duration: 0, // 수동으로만 닫기
      actions: [
        {
          label: '보기',
          onClick: () => {
            // 파일 보기 로직
            console.log('파일 보기');
          },
          variant: 'primary'
        },
        {
          label: '공유',
          onClick: () => {
            // 파일 공유 로직
            console.log('파일 공유');
          },
          variant: 'secondary'
        }
      ]
    });
  };

  return <Button onClick={handleUpload}>파일 업로드</Button>;
}
```

### Promise 기반 Toast
```tsx
function ApiCallComponent() {
  const toast = useToast();

  const handleApiCall = async () => {
    const apiCall = fetch('/api/data').then(res => res.json());
    
    // Promise 상태에 따라 자동으로 Toast 업데이트
    try {
      const data = await toast.promise(apiCall, {
        loading: 'API 호출 중...',
        success: (data) => `성공: ${data.message}`,
        error: (err) => `실패: ${err.message}`,
      });
      
      console.log('API 결과:', data);
    } catch (error) {
      console.error('API 에러:', error);
    }
  };

  return <Button onClick={handleApiCall}>API 호출</Button>;
}
```

### Toast 관리
```tsx
function ToastManagerComponent() {
  const toast = useToast();

  const showMultipleToasts = () => {
    const id1 = toast.success('첫 번째 메시지');
    const id2 = toast.info('두 번째 메시지');
    const id3 = toast.warning('세 번째 메시지');

    // 특정 Toast 닫기
    setTimeout(() => {
      toast.dismiss(id2);
    }, 2000);
  };

  const clearAllToasts = () => {
    // 모든 Toast 닫기
    toast.dismissAll();
  };

  return (
    <div>
      <Button onClick={showMultipleToasts}>여러 Toast 표시</Button>
      <Button onClick={clearAllToasts}>모든 Toast 닫기</Button>
    </div>
  );
}
```

### 커스텀 아이콘
```tsx
function CustomIconToast() {
  const toast = useToast();

  const showCustomIcon = () => {
    toast.info('커스텀 아이콘 Toast', {
      icon: <div>🎉</div>,
      showIcon: true,
    });
  };

  // 아이콘 숨기기
  const showWithoutIcon = () => {
    toast.info('아이콘 없는 Toast', {
      showIcon: false,
    });
  };

  return (
    <div>
      <Button onClick={showCustomIcon}>커스텀 아이콘</Button>
      <Button onClick={showWithoutIcon}>아이콘 없음</Button>
    </div>
  );
}
```

### 전역 설정
```tsx
import { ToastProvider } from 'mbsw-ui-kit';

function App() {
  return (
    <ToastProvider
      defaultOptions={{
        duration: 3000,
        position: 'top-right',
        animation: 'slide',
        pauseOnHover: true,
        closable: true,
        showProgress: true,
      }}
      maxToasts={5} // 최대 5개 Toast까지 표시
    >
      <MyApp />
    </ToastProvider>
  );
}
```

### 실용적인 Toast 패턴
```tsx
// 1. 폼 제출 피드백
function FormComponent() {
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    setLoading(true);
    
    try {
      await api.submitForm(formData);
      toast.success('성공적으로 저장되었습니다.', {
        actions: [
          {
            label: '목록으로',
            onClick: () => router.push('/list'),
            variant: 'primary'
          }
        ]
      });
    } catch (error) {
      toast.error(`저장 실패: ${error.message}`, {
        duration: 0, // 수동으로만 닫기
        actions: [
          {
            label: '다시 시도',
            onClick: () => handleSubmit(formData),
            variant: 'primary'
          }
        ]
      });
    } finally {
      setLoading(false);
    }
  };
}

// 2. 실시간 알림
function NotificationComponent() {
  const toast = useToast();

  useEffect(() => {
    const socket = io('/notifications');
    
    socket.on('notification', (data) => {
      toast.info(data.message, {
        duration: 8000,
        position: 'top-center',
        actions: [
          {
            label: '확인',
            onClick: () => markAsRead(data.id),
            variant: 'primary'
          }
        ]
      });
    });

    return () => socket.disconnect();
  }, [toast]);
}

// 3. 진행 상태 표시
function ProgressToast() {
  const toast = useToast();
  
  const handleLongTask = async () => {
    const taskId = toast.info('작업을 시작합니다...', { duration: 0 });
    
    try {
      for (let i = 1; i <= 5; i++) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        toast.dismiss(taskId);
        if (i < 5) {
          toast.info(`진행 중... (${i}/5)`, { duration: 0, id: taskId });
        }
      }
      
      toast.success('작업이 완료되었습니다!');
    } catch (error) {
      toast.dismiss(taskId);
      toast.error('작업 중 오류가 발생했습니다.');
    }
  };
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

## 🎯 고급 패턴 및 실용 예시

### 1. 데이터 테이블 + 필터링 + 모달 조합
```tsx
import { useState } from 'react';
import { 
  Table, Card, Modal, Button, Input, 
  LoadingSpinner, Badge 
} from 'mbsw-ui-kit';

interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'guest';
  status: 'active' | 'inactive';
  lastLogin: string;
}

function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const columns = [
    { key: 'name', title: '이름', sortable: true, width: 200 },
    { key: 'email', title: '이메일', sortable: true, width: 250 },
    { 
      key: 'role', 
      title: '역할', 
      width: 120,
      render: (role: string) => (
        <Badge 
          color={role === 'admin' ? 'info' : role === 'user' ? 'primary' : 'secondary'}
          variant="soft"
        >
          {role}
        </Badge>
      )
    },
    { 
      key: 'status', 
      title: '상태', 
      width: 100,
      render: (status: string) => (
        <Badge 
          color={status === 'active' ? 'success' : 'warning'}
          variant="dot"
        >
          {status === 'active' ? '활성' : '비활성'}
        </Badge>
      )
    },
    { 
      key: 'actions', 
      title: '액션', 
      width: 120,
      render: (_: any, user: User) => (
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button 
            size="small" 
            variant="secondary" 
            onClick={() => handleEditUser(user)}
          >
            수정
          </Button>
          <Button 
            size="small" 
            variant="danger" 
            onClick={() => handleDeleteUser(user.id)}
          >
            삭제
          </Button>
        </div>
      )
    }
  ];

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleDeleteUser = async (userId: number) => {
    if (window.confirm('정말로 삭제하시겠습니까?')) {
      setLoading(true);
      try {
        await api.deleteUser(userId);
        setUsers(users.filter(u => u.id !== userId));
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Card>
      <CardContent>
        <div style={{ marginBottom: '16px', display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Input
            type="search"
            placeholder="사용자 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ flex: 1 }}
          />
          <Button variant="primary" onClick={() => setShowModal(true)}>
            사용자 추가
          </Button>
        </div>
        
        <Table
          columns={columns}
          data={filteredUsers}
          loading={loading}
          pagination={{
            enabled: true,
            pageSize: 10,
            showSizeChanger: true
          }}
          selection={{
            enabled: true,
            type: 'multiple'
          }}
          emptyState={{
            message: '사용자가 없습니다',
            action: <Button onClick={() => setShowModal(true)}>첫 사용자 추가</Button>
          }}
        />
      </CardContent>

      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setSelectedUser(null);
        }}
        title={selectedUser ? '사용자 수정' : '사용자 추가'}
        size="medium"
      >
        <UserForm 
          user={selectedUser} 
          onSubmit={(userData) => {
            // 사용자 저장 로직
            setShowModal(false);
            setSelectedUser(null);
          }}
        />
      </Modal>
    </Card>
  );
}
```

### 2. 대시보드 레이아웃 패턴
```tsx
function Dashboard() {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const data = await api.getDashboardMetrics();
      setMetrics(data);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: '40px' }}>
        <LoadingSpinner 
          variant="circular" 
          size="large" 
          text="대시보드 데이터를 불러오는 중..." 
        />
      </div>
    );
  }

  return (
    <div style={{ padding: '24px' }}>
      {/* 메트릭 카드 그리드 */}
      <CardGrid columns={4} gap="large" responsive={true}>
        <Card variant="filled">
          <CardContent>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '2rem', fontWeight: 'bold' }}>
                  {metrics?.totalUsers?.toLocaleString()}
                </h3>
                <p style={{ margin: 0, color: '#666' }}>총 사용자</p>
              </div>
              <Badge color="success" variant="soft">
                +12%
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card variant="filled">
          <CardContent>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '2rem', fontWeight: 'bold' }}>
                  ₩{metrics?.revenue?.toLocaleString()}
                </h3>
                <p style={{ margin: 0, color: '#666' }}>월 매출</p>
              </div>
              <Badge color="info" variant="soft">
                +8%
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card variant="filled">
          <CardContent>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '2rem', fontWeight: 'bold' }}>
                  {metrics?.orders?.toLocaleString()}
                </h3>
                <p style={{ margin: 0, color: '#666' }}>주문 수</p>
              </div>
              <Badge color="warning" variant="soft">
                -2%
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card variant="filled">
          <CardContent>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '2rem', fontWeight: 'bold' }}>
                  {metrics?.satisfaction}%
                </h3>
                <p style={{ margin: 0, color: '#666' }}>고객 만족도</p>
              </div>
              <Badge color="success" variant="soft">
                +5%
              </Badge>
            </div>
          </CardContent>
        </Card>
      </CardGrid>

      {/* 차트 및 테이블 영역 */}
      <div style={{ marginTop: '32px', display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        <Card>
          <CardContent>
            <h3>최근 주문</h3>
            <Table
              columns={recentOrdersColumns}
              data={metrics?.recentOrders || []}
              pagination={{ enabled: false }}
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h3>빠른 액션</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Button variant="primary" fullWidth>
                새 제품 추가
              </Button>
              <Button variant="secondary" fullWidth>
                주문 처리
              </Button>
              <Button variant="tertiary" fullWidth>
                고객 지원
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
```

### 3. 폼 + 검증 + 단계별 진행
```tsx
function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  const steps = [
    { title: '기본 정보', component: BasicInfoStep },
    { title: '연락처', component: ContactStep },
    { title: '추가 정보', component: AdditionalStep },
    { title: '확인', component: ReviewStep }
  ];

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await api.submitForm(formData);
      // 성공 처리
    } finally {
      setLoading(false);
    }
  };

  const CurrentStepComponent = steps[currentStep - 1].component;

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '40px 20px' }}>
      {/* 진행 단계 표시 */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
          {steps.map((step, index) => (
            <div 
              key={index} 
              style={{ 
                flex: 1, 
                textAlign: 'center',
                opacity: index + 1 <= currentStep ? 1 : 0.5
              }}
            >
              <div style={{ 
                width: '32px', 
                height: '32px', 
                borderRadius: '50%', 
                backgroundColor: index + 1 <= currentStep ? '#007bff' : '#e9ecef',
                color: index + 1 <= currentStep ? 'white' : '#6c757d',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 8px'
              }}>
                {index + 1}
              </div>
              <small>{step.title}</small>
            </div>
          ))}
        </div>
        <div style={{ 
          width: '100%', 
          height: '4px', 
          backgroundColor: '#e9ecef', 
          borderRadius: '2px' 
        }}>
          <div style={{ 
            width: `${(currentStep / steps.length) * 100}%`, 
            height: '100%', 
            backgroundColor: '#007bff', 
            borderRadius: '2px',
            transition: 'width 0.3s ease'
          }} />
        </div>
      </div>

      {/* 현재 단계 폼 */}
      <Card>
        <CardContent>
          <h2>{steps[currentStep - 1].title}</h2>
          <CurrentStepComponent 
            data={formData} 
            onChange={setFormData} 
          />
        </CardContent>
        
        <div style={{ 
          padding: '16px 24px', 
          borderTop: '1px solid #e9ecef',
          display: 'flex', 
          justifyContent: 'space-between' 
        }}>
          <Button 
            variant="secondary" 
            onClick={handlePrev}
            disabled={currentStep === 1}
          >
            이전
          </Button>
          
          {currentStep === steps.length ? (
            <Button 
              variant="primary" 
              onClick={handleSubmit}
              loading={loading}
            >
              제출하기
            </Button>
          ) : (
            <Button 
              variant="primary" 
              onClick={handleNext}
            >
              다음
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}

// 단계별 컴포넌트 예시
function BasicInfoStep({ data, onChange }: StepProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <ValidatedInput
        label="회사명"
        validation={{ required: true, minLength: 2 }}
        value={data.companyName || ''}
        onChange={(e) => onChange({...data, companyName: e.target.value})}
      />
      
      <ValidatedInput
        label="대표자명"
        validation={{ required: true, minLength: 2 }}
        value={data.representative || ''}
        onChange={(e) => onChange({...data, representative: e.target.value})}
      />
      
      <ValidatedInput
        type="email"
        label="이메일"
        validation={VALIDATION_PRESETS.email}
        value={data.email || ''}
        onChange={(e) => onChange({...data, email: e.target.value})}
      />
    </div>
  );
}
```

### 4. 실시간 검색 + 자동완성
```tsx
function SmartSearchInput() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const searchProducts = useCallback(
    debounce(async (searchTerm: string) => {
      if (searchTerm.length < 2) {
        setSuggestions([]);
        return;
      }

      setLoading(true);
      try {
        const results = await api.searchProducts(searchTerm);
        setSuggestions(results);
        setShowSuggestions(true);
      } finally {
        setLoading(false);
      }
    }, 300),
    []
  );

  useEffect(() => {
    searchProducts(query);
  }, [query, searchProducts]);

  return (
    <div style={{ position: 'relative' }}>
      <Input
        type="search"
        placeholder="제품 검색..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        rightIcon={loading ? <LoadingSpinner size="small" /> : <SearchIcon />}
      />
      
      {showSuggestions && suggestions.length > 0 && (
        <Card style={{ 
          position: 'absolute', 
          top: '100%', 
          left: 0, 
          right: 0, 
          zIndex: 1000,
          maxHeight: '300px',
          overflowY: 'auto'
        }}>
          {suggestions.map((product, index) => (
            <div
              key={product.id}
              onClick={() => {
                setQuery(product.name);
                setShowSuggestions(false);
              }}
              style={{
                padding: '12px',
                borderBottom: index < suggestions.length - 1 ? '1px solid #e9ecef' : 'none',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#f8f9fa'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img 
                  src={product.image} 
                  alt={product.name}
                  style={{ width: '40px', height: '40px', borderRadius: '4px' }}
                />
                <div>
                  <div style={{ fontWeight: '500' }}>{product.name}</div>
                  <div style={{ fontSize: '0.875rem', color: '#666' }}>
                    ₩{product.price?.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Card>
      )}
    </div>
  );
}
```

### 5. 커스텀 훅 패턴
```tsx
// API 상태 관리 훅
function useApiState<T>(apiCall: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await apiCall();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [apiCall]);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return { data, loading, error, execute, reset };
}

// 테이블 상태 관리 훅
function useTableState<T>(initialData: T[] = []) {
  const [data, setData] = useState<T[]>(initialData);
  const [selectedRows, setSelectedRows] = useState<T[]>([]);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
  const [filters, setFilters] = useState<Record<string, any>>({});

  const filteredData = useMemo(() => {
    let result = [...data];
    
    // 필터링 적용
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        result = result.filter(item => 
          String(item[key]).toLowerCase().includes(String(value).toLowerCase())
        );
      }
    });
    
    // 정렬 적용
    if (sortConfig) {
      result.sort((a, b) => {
        const aVal = a[sortConfig.key];
        const bVal = b[sortConfig.key];
        
        if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    
    return result;
  }, [data, filters, sortConfig]);

  return {
    data: filteredData,
    selectedRows,
    sortConfig,
    filters,
    setData,
    setSelectedRows,
    setSortConfig,
    setFilters,
  };
}

// 사용 예시
function ProductList() {
  const { data: products, loading, execute: fetchProducts } = useApiState(() => api.getProducts());
  const tableState = useTableState(products);

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <div style={{ marginBottom: '16px', display: 'flex', gap: '16px' }}>
        <Input
          placeholder="제품 검색..."
          onChange={(e) => tableState.setFilters({...tableState.filters, name: e.target.value})}
        />
        <Button onClick={fetchProducts}>새로고침</Button>
      </div>

      <Table
        columns={productColumns}
        data={tableState.data}
        loading={loading}
        selection={{
          enabled: true,
          selectedRows: tableState.selectedRows,
          onSelectionChange: tableState.setSelectedRows
        }}
        sortable={true}
        sortConfig={tableState.sortConfig}
        onSort={tableState.setSortConfig}
      />
    </div>
  );
}
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

## 🚨 문제 해결 및 FAQ

### 자주 묻는 질문 (FAQ)

#### Q1. 테마가 적용되지 않아요
**A:** 모든 컴포넌트는 반드시 `ThemeProvider`로 감싸져야 합니다.

```tsx
// ❌ 잘못된 예시
function App() {
  return <Button>버튼</Button>;
}

// ✅ 올바른 예시
import { ThemeProvider } from 'styled-components';
import { lightTheme } from 'mbsw-ui-kit';

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <Button>버튼</Button>
    </ThemeProvider>
  );
}
```

#### Q2. 스타일이 깨져서 나와요
**A:** GlobalStyle을 적용했는지 확인해보세요.

```tsx
import { GlobalStyle, ThemeProvider, lightTheme } from 'mbsw-ui-kit';

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyle /> {/* 이것이 필요합니다 */}
      <div>앱 콘텐츠</div>
    </ThemeProvider>
  );
}
```

#### Q3. TypeScript 에러가 발생해요
**A:** 타입 정의를 확인하고, styled-components 타입을 설치했는지 확인하세요.

```bash
npm install --save-dev @types/styled-components
```

#### Q4. 커스텀 테마를 만들고 싶어요
**A:** 기존 테마를 확장하여 새로운 테마를 만들 수 있습니다.

```tsx
import { lightTheme } from 'mbsw-ui-kit';

const customTheme = {
  ...lightTheme,
  colors: {
    ...lightTheme.colors,
    primary: '#your-brand-color',
  },
};
```

#### Q5. 컴포넌트가 반응형으로 작동하지 않아요
**A:** 브레이크포인트를 올바르게 사용하고 있는지 확인하세요.

```tsx
// ✅ 올바른 브레이크포인트 사용
const ResponsiveCard = styled(Card)`
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.sm};
  }
`;
```

#### Q6. 검증이 제대로 작동하지 않아요
**A:** ValidatedInput과 VALIDATION_PRESETS를 올바르게 사용하고 있는지 확인하세요.

```tsx
import { ValidatedInput, VALIDATION_PRESETS } from 'mbsw-ui-kit';

<ValidatedInput
  validation={VALIDATION_PRESETS.email}
  validateOnChange={true} // 실시간 검증 활성화
/>
```

#### Q7. 테이블 데이터가 업데이트되지 않아요
**A:** data prop이 올바르게 전달되고 있는지, 그리고 key가 고유한지 확인하세요.

```tsx
<Table
  columns={columns}
  data={data} // 이 값이 변경되어야 합니다
  key={data.length} // 데이터 변경 시 리렌더링 강제
/>
```

### 일반적인 문제 해결

#### 1. 스타일이 적용되지 않을 때
```tsx
// styled-components 버전 확인
// package.json에서 "styled-components": "^5.0.0" 이상인지 확인

// CSS-in-JS 충돌 확인
// 다른 CSS 라이브러리와 함께 사용 시 우선순위 확인

// 개발자 도구에서 스타일 확인
// Elements 탭에서 실제 적용된 CSS 확인
```

#### 2. 성능 이슈가 있을 때
```tsx
// 1. 필요한 컴포넌트만 import
import { Button } from 'mbsw-ui-kit/Button';

// 2. React.memo 사용
const OptimizedComponent = memo(MyComponent);

// 3. 불필요한 리렌더링 방지
const memoizedCallback = useCallback(() => {}, [deps]);
```

#### 3. 접근성 문제 해결
```tsx
// 1. ARIA 속성 추가
<Button aria-label="메뉴 열기">☰</Button>

// 2. 키보드 네비게이션 확인
<Modal
  isOpen={isOpen}
  onClose={onClose}
  // ESC 키로 닫기 기본 지원됨
/>

// 3. 색상 대비 확인
// 테마의 색상이 WCAG 가이드라인을 준수하는지 확인
```

#### 4. 번들 크기 최적화
```tsx
// Tree shaking 활용
import { Button } from 'mbsw-ui-kit/Button';
import { Input } from 'mbsw-ui-kit/Input';

// webpack-bundle-analyzer로 번들 크기 분석
// npm install --save-dev webpack-bundle-analyzer
```

### 개발 팁

#### 1. Storybook 활용
```bash
# Storybook 실행하여 컴포넌트 미리보기
npm run storybook

# 컴포넌트 사용법과 예시 확인
# 각 컴포넌트의 Props 확인
# 다양한 상태와 변형 테스트
```

#### 2. 테스트 작성
```tsx
// Jest + React Testing Library 사용
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { Button, lightTheme } from 'mbsw-ui-kit';

const renderWithTheme = (component) => {
  return render(
    <ThemeProvider theme={lightTheme}>
      {component}
    </ThemeProvider>
  );
};

test('Button이 올바르게 렌더링된다', () => {
  renderWithTheme(<Button>테스트</Button>);
  expect(screen.getByRole('button')).toBeInTheDocument();
});
```

#### 3. 디버깅 도구
```tsx
// React Developer Tools 사용
// Components 탭에서 props와 state 확인
// Profiler 탭에서 성능 분석

// styled-components 디버깅
// displayName 설정으로 컴포넌트 식별 쉽게
const StyledButton = styled.button`
  /* styles */
`;
StyledButton.displayName = 'StyledButton';
```

### 마이그레이션 가이드

#### 기존 프로젝트에서 MBSW UI Kit로 이전

**1단계: 의존성 설치**
```bash
npm install mbsw-ui-kit styled-components
npm install --save-dev @types/styled-components
```

**2단계: 점진적 적용**
```tsx
// 기존 컴포넌트를 하나씩 교체
// 먼저 Button부터 시작하는 것을 권장

// Before
<button className="btn btn-primary" onClick={onClick}>
  클릭
</button>

// After
import { Button } from 'mbsw-ui-kit';
<Button variant="primary" onClick={onClick}>
  클릭
</Button>
```

**3단계: 테마 통합**
```tsx
// 기존 CSS 변수를 테마로 변환
const customTheme = {
  ...lightTheme,
  colors: {
    ...lightTheme.colors,
    primary: 'var(--your-primary-color)', // 기존 CSS 변수 활용
  },
};
```

**4단계: 스타일 정리**
```tsx
// 기존 CSS 파일에서 중복되는 스타일 제거
// UI Kit 컴포넌트로 대체된 부분 삭제
```

### 버전별 호환성

#### React 버전 지원
- React 16.8+ (Hooks 지원)
- React 17.x (권장)
- React 18.x (완전 지원)

#### TypeScript 버전
- TypeScript 4.0+ (권장)
- 최신 타입 정의 지원

#### 브라우저 지원
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

이 가이드를 통해 MBSW UI Kit를 효과적으로 활용하여 일관성 있고 접근 가능한 사용자 인터페이스를 구축할 수 있습니다.