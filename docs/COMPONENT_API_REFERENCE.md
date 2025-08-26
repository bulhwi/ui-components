# 🔖 MBSW UI Kit - Component API Reference

완벽한 타입 안전성과 함께 모든 컴포넌트의 상세한 API 문서입니다.

## 📋 목차

- [Button](#button)
- [Input](#input)
- [Modal](#modal)
- [Layout](#layout)
- [Table](#table)
- [Card](#card)
- [LoadingSpinner](#loadingspinner)
- [Toast](#toast)

---

## Button

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'tertiary' \| 'danger'` | `'primary'` | 버튼 스타일 변형 |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | 버튼 크기 |
| `loading` | `boolean` | `false` | 로딩 상태 표시 |
| `disabled` | `boolean` | `false` | 비활성화 상태 |
| `fullWidth` | `boolean` | `false` | 전체 너비 사용 |
| `leftIcon` | `React.ReactNode` | - | 왼쪽 아이콘 |
| `rightIcon` | `React.ReactNode` | - | 오른쪽 아이콘 |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | HTML 타입 속성 |
| `onClick` | `(event: MouseEvent) => void` | - | 클릭 이벤트 핸들러 |
| `onFocus` | `(event: FocusEvent) => void` | - | 포커스 이벤트 핸들러 |
| `onBlur` | `(event: FocusEvent) => void` | - | 블러 이벤트 핸들러 |
| `className` | `string` | - | 추가 CSS 클래스 |
| `style` | `CSSProperties` | - | 인라인 스타일 |
| `children` | `React.ReactNode` | - | 버튼 내용 |

### Examples

```tsx
// 기본 사용
<Button variant="primary" size="medium">
  기본 버튼
</Button>

// 로딩 상태
<Button loading>로딩 중...</Button>

// 아이콘과 함께
<Button leftIcon={<PlusIcon />} rightIcon={<ArrowIcon />}>
  아이콘 버튼
</Button>

// 이벤트 핸들링
<Button 
  onClick={(e) => console.log('clicked', e)}
  onFocus={(e) => console.log('focused', e)}
>
  이벤트 버튼
</Button>
```

---

## Input

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `InputType` | `'text'` | 입력 타입 |
| `label` | `string` | - | 라벨 텍스트 |
| `description` | `string` | - | 설명 텍스트 |
| `placeholder` | `string` | - | 플레이스홀더 |
| `value` | `string` | - | 입력 값 (제어 컴포넌트) |
| `defaultValue` | `string` | - | 기본 값 (비제어 컴포넌트) |
| `required` | `boolean` | `false` | 필수 입력 여부 |
| `disabled` | `boolean` | `false` | 비활성화 상태 |
| `error` | `string` | - | 오류 메시지 |
| `leftIcon` | `React.ReactNode` | - | 왼쪽 아이콘 |
| `rightIcon` | `React.ReactNode` | - | 오른쪽 아이콘 |
| `onChange` | `(event: ChangeEvent<HTMLInputElement>) => void` | - | 변경 이벤트 |
| `onFocus` | `(event: FocusEvent<HTMLInputElement>) => void` | - | 포커스 이벤트 |
| `onBlur` | `(event: FocusEvent<HTMLInputElement>) => void` | - | 블러 이벤트 |

### InputType

```tsx
type InputType = 
  | 'text' 
  | 'email' 
  | 'password' 
  | 'number' 
  | 'tel' 
  | 'url' 
  | 'search';
```

---

## ValidatedInput

### Props

ValidatedInput은 Input의 모든 props에 추가로 다음 props를 지원합니다:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `validation` | `ValidationRules` | - | 검증 규칙 |
| `validateOnChange` | `boolean` | `false` | 실시간 검증 활성화 |
| `validateOnBlur` | `boolean` | `true` | 블러 시 검증 활성화 |
| `debounceMs` | `number` | `300` | 검증 디바운스 시간 |
| `showStrengthIndicator` | `boolean` | `false` | 비밀번호 강도 표시 |

### ValidationRules

```tsx
interface ValidationRules {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  email?: boolean;
  url?: boolean;
  number?: boolean;
  integer?: boolean;
  positive?: boolean;
  min?: number;
  max?: number;
  custom?: Array<{
    test: (value: string) => boolean;
    message: string;
  }>;
}
```

### VALIDATION_PRESETS

```tsx
const VALIDATION_PRESETS = {
  email: {
    required: true,
    email: true,
  },
  password: {
    required: true,
    minLength: 8,
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
  },
  phone: {
    required: true,
    pattern: /^01[0-9]-?[0-9]{4}-?[0-9]{4}$/,
  },
  url: {
    required: true,
    url: true,
  }
};
```

---

## Modal

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isOpen` | `boolean` | `false` | 모달 표시 여부 |
| `onClose` | `() => void` | - | 닫기 이벤트 핸들러 |
| `title` | `string` | - | 모달 제목 |
| `size` | `'small' \| 'medium' \| 'large' \| 'xl'` | `'medium'` | 모달 크기 |
| `animation` | `'fade' \| 'slideUp' \| 'slideDown' \| 'zoom'` | `'fade'` | 애니메이션 타입 |
| `closeOnOverlayClick` | `boolean` | `true` | 오버레이 클릭 시 닫기 |
| `closeOnEscape` | `boolean` | `true` | ESC 키로 닫기 |
| `showCloseButton` | `boolean` | `true` | 닫기 버튼 표시 |
| `footer` | `React.ReactNode` | - | 푸터 내용 |
| `className` | `string` | - | 추가 CSS 클래스 |
| `children` | `React.ReactNode` | - | 모달 본문 내용 |

---

## Layout

### Layout Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `header` | `React.ReactNode` | - | 헤더 컴포넌트 |
| `footer` | `React.ReactNode` | - | 푸터 컴포넌트 |
| `sidebar` | `React.ReactNode` | - | 사이드바 컴포넌트 |
| `maxWidth` | `'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'full'` | 최대 너비 |
| `className` | `string` | - | 추가 CSS 클래스 |
| `children` | `React.ReactNode` | - | 메인 콘텐츠 |

### Header Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `logo` | `React.ReactNode` | - | 로고 컴포넌트 |
| `logoHref` | `string` | `'/'` | 로고 링크 |
| `navigation` | `NavigationItem[]` | `[]` | 네비게이션 메뉴 |
| `actions` | `React.ReactNode` | - | 우측 액션 영역 |
| `sticky` | `boolean` | `false` | 고정 헤더 여부 |
| `maxWidth` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'xl'` | 최대 너비 |

### NavigationItem

```tsx
interface NavigationItem {
  label: string;
  href?: string;
  active?: boolean;
  disabled?: boolean;
  children?: NavigationItem[];
}
```

### Footer Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `sections` | `FooterSection[]` | `[]` | 푸터 섹션들 |
| `socialLinks` | `SocialLink[]` | `[]` | 소셜 링크들 |
| `logo` | `React.ReactNode` | - | 푸터 로고 |
| `copyright` | `string` | - | 저작권 텍스트 |
| `showDivider` | `boolean` | `true` | 구분선 표시 |
| `maxWidth` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'xl'` | 최대 너비 |

---

## Table

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `columns` | `TableColumn[]` | `[]` | 테이블 컬럼 정의 |
| `data` | `any[]` | `[]` | 테이블 데이터 |
| `loading` | `boolean` | `false` | 로딩 상태 |
| `sortable` | `boolean` | `false` | 정렬 기능 활성화 |
| `filterable` | `boolean` | `false` | 필터링 기능 활성화 |
| `pagination` | `PaginationConfig` | - | 페이지네이션 설정 |
| `selection` | `SelectionConfig` | - | 행 선택 설정 |
| `responsive` | `boolean` | `true` | 반응형 지원 |
| `emptyState` | `EmptyStateConfig` | - | 빈 상태 설정 |
| `onSort` | `(config: SortConfig) => void` | - | 정렬 이벤트 |
| `onFilter` | `(data: any[]) => void` | - | 필터링 이벤트 |
| `onRowClick` | `(row: any) => void` | - | 행 클릭 이벤트 |

### TableColumn

```tsx
interface TableColumn {
  key: string;
  title: string;
  width?: number;
  sortable?: boolean;
  filterable?: boolean;
  render?: (value: any, row: any, index: number) => React.ReactNode;
  align?: 'left' | 'center' | 'right';
}
```

### PaginationConfig

```tsx
interface PaginationConfig {
  enabled: boolean;
  pageSize?: number;
  showSizeChanger?: boolean;
  showInfo?: boolean;
  pageSizeOptions?: number[];
}
```

---

## Card

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'filled' \| 'outlined' \| 'elevated'` | `'outlined'` | 카드 스타일 변형 |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | 카드 크기 |
| `direction` | `'vertical' \| 'horizontal'` | `'vertical'` | 카드 방향 |
| `clickable` | `boolean` | `false` | 클릭 가능 여부 |
| `selected` | `boolean` | `false` | 선택 상태 |
| `disabled` | `boolean` | `false` | 비활성화 상태 |
| `loading` | `boolean` | `false` | 로딩 상태 |
| `bordered` | `boolean` | `false` | 테두리 강조 |
| `hoverable` | `boolean` | `true` | 호버 효과 |
| `image` | `CardImageProps` | - | 이미지 설정 |
| `header` | `CardHeaderProps` | - | 헤더 설정 |
| `footer` | `CardFooterProps` | - | 푸터 설정 |
| `onClick` | `() => void` | - | 클릭 이벤트 |
| `className` | `string` | - | 추가 CSS 클래스 |
| `children` | `React.ReactNode` | - | 카드 내용 |

### CardImageProps

```tsx
interface CardImageProps {
  src: string;
  alt: string;
  position?: 'top' | 'left' | 'right';
  aspectRatio?: string;
  loading?: 'lazy' | 'eager';
}
```

### CardGrid Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `columns` | `number \| ResponsiveColumns` | `3` | 컬럼 개수 |
| `gap` | `'small' \| 'medium' \| 'large'` | `'medium'` | 카드 간격 |
| `responsive` | `boolean` | `true` | 반응형 지원 |

---

## LoadingSpinner

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'circular' \| 'dots' \| 'bars' \| 'pulse'` | `'circular'` | 스피너 변형 |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | 스피너 크기 |
| `color` | `'primary' \| 'secondary' \| 'white'` | `'primary'` | 스피너 색상 |
| `text` | `string` | - | 로딩 텍스트 |
| `textPosition` | `'bottom' \| 'right'` | `'bottom'` | 텍스트 위치 |
| `overlay` | `boolean` | `false` | 오버레이 모드 |
| `overlayOpacity` | `number` | `0.5` | 오버레이 투명도 |
| `inline` | `boolean` | `false` | 인라인 표시 |
| `className` | `string` | - | 추가 CSS 클래스 |

### LoadingSpinnerOverlay Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `show` | `boolean` | `false` | 표시 여부 |
| `spinnerProps` | `Omit<LoadingSpinnerProps, 'overlay'>` | - | 스피너 속성 |
| `opacity` | `number` | `0.5` | 배경 투명도 |
| `zIndex` | `number` | `9999` | z-index 값 |
| `closeOnClick` | `boolean` | `false` | 클릭 시 닫기 |
| `onClose` | `() => void` | - | 닫기 이벤트 |

---

## Toast

### ToastProvider Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | - | 감싸질 컴포넌트들 |
| `defaultOptions` | `Partial<ToastOptions>` | - | 기본 토스트 옵션 |
| `maxToasts` | `number` | `10` | 최대 표시 가능한 토스트 개수 |

### ToastOptions Interface

```tsx
interface ToastOptions {
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number; // 밀리초, 0이면 수동으로만 닫기
  closable?: boolean;
  pauseOnHover?: boolean;
  position?: 'top-right' | 'top-left' | 'top-center' | 'bottom-right' | 'bottom-left' | 'bottom-center';
  animation?: 'slide' | 'fade' | 'bounce';
  actions?: ToastAction[];
  showIcon?: boolean;
  icon?: React.ReactNode;
  id?: string;
  showProgress?: boolean;
  role?: 'alert' | 'status';
}
```

### ToastAction Interface

```tsx
interface ToastAction {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}
```

### useToast Hook

`useToast` 훅은 다음과 같은 메서드들을 반환합니다:

| Method | Type | Description |
|--------|------|-------------|
| `success` | `(message: string, options?: Omit<ToastOptions, 'type'>) => string` | 성공 토스트 표시 |
| `error` | `(message: string, options?: Omit<ToastOptions, 'type'>) => string` | 에러 토스트 표시 |
| `warning` | `(message: string, options?: Omit<ToastOptions, 'type'>) => string` | 경고 토스트 표시 |
| `info` | `(message: string, options?: Omit<ToastOptions, 'type'>) => string` | 정보 토스트 표시 |
| `toast` | `(message: string, options?: ToastOptions) => string` | 커스텀 토스트 표시 |
| `dismiss` | `(id: string) => void` | 특정 토스트 제거 |
| `dismissAll` | `() => void` | 모든 토스트 제거 |
| `promise` | `<T>(promise: Promise<T>, options: PromiseOptions) => Promise<T>` | Promise 상태 기반 토스트 |

### PromiseOptions Interface

```tsx
interface PromiseOptions {
  loading: string;
  success: string | ((data: T) => string);
  error: string | ((error: any) => string);
}
```

### Examples

```tsx
// 기본 사용
const toast = useToast();

// 타입별 토스트
toast.success('성공했습니다!');
toast.error('오류가 발생했습니다.');
toast.warning('주의하세요.');
toast.info('정보를 확인하세요.');

// 옵션과 함께
toast.success('저장 완료', {
  duration: 3000,
  position: 'top-center',
  actions: [
    {
      label: '보기',
      onClick: () => navigate('/view'),
      variant: 'primary'
    }
  ]
});

// Promise 기반 토스트
await toast.promise(
  fetch('/api/data'),
  {
    loading: '로딩 중...',
    success: '성공!',
    error: '실패했습니다.'
  }
);

// 토스트 관리
const id = toast.info('영구 토스트', { duration: 0 });
setTimeout(() => toast.dismiss(id), 5000);
toast.dismissAll(); // 모든 토스트 제거
```

### 접근성

- 토스트는 기본적으로 `role="alert"`와 `aria-live="assertive"` 속성을 가집니다
- `aria-atomic="true"`로 전체 메시지가 읽힙니다
- 닫기 버튼에는 적절한 `aria-label`이 설정됩니다
- 키보드로 닫기 버튼에 접근 가능합니다

### 스타일링

기본 스타일은 테마 시스템을 따르며, 커스터마이징이 가능합니다:

```tsx
import styled from 'styled-components';
import { ToastWrapper } from 'mbsw-ui-kit';

const CustomToast = styled(ToastWrapper)`
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
`;
```

---

## 테마 시스템

### Theme Interface

```tsx
interface Theme {
  colors: {
    primary: string;
    primaryHover: string;
    primaryActive: string;
    secondary: string;
    secondaryHover: string;
    secondaryActive: string;
    background: string;
    surface: string;
    text: {
      primary: string;
      secondary: string;
      disabled: string;
    };
    border: string;
    shadow: string;
    success: string;
    warning: string;
    error: string;
    info: string;
  };
  fonts: {
    primary: string;
    sizes: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
    };
    weights: {
      normal: number;
      medium: number;
      semibold: number;
      bold: number;
    };
    lineHeights: {
      tight: number;
      normal: number;
      relaxed: number;
    };
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
  };
  breakpoints: {
    mobile: string;
    tablet: string;
    desktop: string;
    wide: string;
  };
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
    full: string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
  };
}
```

### 사용 가능한 테마

```tsx
import { lightTheme, darkTheme } from 'mbsw-ui-kit';

// 라이트 테마 (기본)
<ThemeProvider theme={lightTheme}>

// 다크 테마
<ThemeProvider theme={darkTheme}>
```

---

이 API 문서를 통해 각 컴포넌트의 모든 속성과 사용법을 정확히 파악할 수 있습니다. 추가적인 정보가 필요하거나 새로운 컴포넌트가 추가될 때마다 이 문서도 함께 업데이트됩니다.