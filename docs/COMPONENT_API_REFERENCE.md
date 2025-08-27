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
- [Dropdown](#dropdown)

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

## Dropdown

### DropdownProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `options` | `DropdownOption<T>[] \| DropdownOptionGroup<T>[]` | - | 옵션 목록 또는 그룹화된 옵션 |
| `value` | `T` | - | 선택된 값 (단일 선택) |
| `values` | `T[]` | - | 선택된 값들 (다중 선택) |
| `multiple` | `boolean` | `false` | 다중 선택 모드 |
| `onChange` | `(value: T \| null) => void` | - | 단일 선택 변경 콜백 |
| `onMultiChange` | `(values: T[]) => void` | - | 다중 선택 변경 콜백 |
| `placeholder` | `string` | `'선택하세요'` | 플레이스홀더 텍스트 |
| `disabled` | `boolean` | `false` | 비활성화 상태 |
| `loading` | `boolean` | `false` | 로딩 상태 |
| `error` | `boolean` | `false` | 에러 상태 |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | 크기 |
| `fullWidth` | `boolean` | `false` | 전체 너비 사용 |
| `position` | `DropdownPosition` | `'bottom-start'` | 드롭다운 메뉴 위치 |
| `searchable` | `boolean` | `false` | 검색 가능 여부 |
| `searchPlaceholder` | `string` | `'검색...'` | 검색 플레이스홀더 |
| `closeOnSelect` | `boolean` | `true` | 선택 시 메뉴 닫기 |
| `noOptionsText` | `string` | `'옵션이 없습니다'` | 옵션 없을 때 텍스트 |
| `maxHeight` | `number` | `300` | 메뉴 최대 높이 (픽셀) |
| `virtualized` | `boolean` | `false` | 가상화 활성화 |
| `itemHeight` | `number` | `40` | 가상화 시 아이템 높이 |
| `renderOption` | `(option: DropdownOption<T>, isSelected: boolean) => React.ReactNode` | - | 커스텀 옵션 렌더링 |
| `renderValue` | `(value: T \| null, option: DropdownOption<T> \| null) => React.ReactNode` | - | 커스텀 선택된 값 렌더링 |
| `renderValues` | `(values: T[], options: DropdownOption<T>[]) => React.ReactNode` | - | 커스텀 다중 선택 값 렌더링 |
| `showTags` | `boolean` | `true` | 태그 형태로 다중 선택 표시 |
| `maxTags` | `number` | `3` | 최대 태그 개수 |
| `open` | `boolean` | - | 제어된 열림 상태 |
| `defaultOpen` | `boolean` | `false` | 기본 열림 상태 |
| `onOpenChange` | `(open: boolean) => void` | - | 열림 상태 변경 콜백 |
| `onSearch` | `(query: string) => void` | - | 검색어 변경 콜백 |
| `className` | `string` | - | CSS 클래스 |
| `style` | `React.CSSProperties` | - | 인라인 스타일 |

### DropdownOption Interface

```tsx
interface DropdownOption<T = any> {
  label: string;
  value: T;
  disabled?: boolean;
  icon?: React.ReactNode;
  description?: string;
  group?: string;
}
```

### DropdownOptionGroup Interface

```tsx
interface DropdownOptionGroup<T = any> {
  label: string;
  options: DropdownOption<T>[];
  disabled?: boolean;
}
```

### useDropdown Hook

`useDropdown` 훅은 다음과 같은 값을 반환합니다:

| Property | Type | Description |
|----------|------|-------------|
| `isOpen` | `boolean` | 열림 상태 |
| `selectedValues` | `T[]` | 선택된 값들 |
| `highlightedIndex` | `number` | 하이라이트된 인덱스 |
| `searchQuery` | `string` | 검색어 |
| `filteredOptions` | `DropdownOption<T>[]` | 필터링된 옵션들 |
| `toggle` | `() => void` | 열기/닫기 토글 |
| `open` | `() => void` | 열기 |
| `close` | `() => void` | 닫기 |
| `selectOption` | `(option: DropdownOption<T>) => void` | 옵션 선택 |
| `removeOption` | `(value: T) => void` | 옵션 제거 (다중 선택) |
| `clearAll` | `() => void` | 모든 옵션 제거 |
| `setSearchQuery` | `(query: string) => void` | 검색어 설정 |
| `handleKeyDown` | `(event: React.KeyboardEvent) => void` | 키보드 핸들러 |
| `getAriaProps` | `() => DropdownAriaProps` | ARIA 속성 |

### Examples

```tsx
// 기본 사용
const options = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
];

<Dropdown 
  options={options} 
  onChange={(value) => console.log(value)}
  placeholder="과일 선택" 
/>

// 다중 선택
<Dropdown
  options={options}
  multiple
  values={selectedValues}
  onMultiChange={setSelectedValues}
  showTags
  maxTags={2}
/>

// 검색 가능
<Dropdown
  options={options}
  searchable
  searchPlaceholder="검색..."
  placeholder="검색해서 선택"
/>

// 그룹화된 옵션
const groupedOptions = [
  {
    label: 'Fruits',
    options: [
      { label: 'Apple', value: 'apple' },
      { label: 'Banana', value: 'banana' },
    ]
  }
];

<Dropdown options={groupedOptions} />

// 가상화된 대용량 리스트
<Dropdown
  options={largeOptionsList}
  virtualized
  itemHeight={40}
  maxHeight={300}
  searchable
/>

// useDropdown 훅 사용
const dropdown = useDropdown({
  options,
  onChange: handleChange,
});

<button 
  onClick={dropdown.toggle}
  onKeyDown={dropdown.handleKeyDown}
  {...dropdown.getAriaProps()}
>
  Custom Trigger
</button>
```

### 키보드 네비게이션

- `Arrow Down` / `Arrow Up`: 옵션 간 이동
- `Enter`: 하이라이트된 옵션 선택
- `Escape`: 드롭다운 닫기
- `Space`: 옵션 선택 (검색 모드가 아닐 때)
- `Home` / `End`: 첫 번째 / 마지막 옵션으로 이동
- `Tab`: 다음 요소로 포커스 이동하며 드롭다운 닫기

### 접근성

- `role="combobox"` 및 관련 ARIA 속성 자동 설정
- `aria-expanded`, `aria-multiselectable` 상태 관리
- `aria-activedescendant`로 현재 하이라이트된 옵션 지시
- 키보드 전용 네비게이션 지원
- 스크린 리더 호환성

### 가상화

대용량 옵션 리스트를 위한 가상화 기능:

```tsx
<Dropdown
  options={thousandsOfOptions}
  virtualized={true}
  itemHeight={40}
  maxHeight={300}
  searchable // 대용량에서는 검색 권장
/>
```

### 커스터마이징

스타일드 컴포넌트를 사용한 커스터마이징:

```tsx
import styled from 'styled-components';
import { DropdownTrigger } from 'mbsw-ui-kit';

const CustomTrigger = styled(DropdownTrigger)`
  border-radius: 20px;
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
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

## Typography

Typography 컴포넌트는 일관된 텍스트 표시를 위한 종합적인 솔루션입니다.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | `ReactNode` | - | 표시할 콘텐츠 |
| variant | `TypographyVariant` | `'body1'` | Typography 변형 |
| color | `TypographyColor` | - | 텍스트 색상 |
| align | `TypographyAlign` | - | 텍스트 정렬 |
| weight | `TypographyWeight` | - | 폰트 가중치 |
| truncate | `boolean` | `false` | 말줄임표 활성화 |
| maxLines | `number` | - | 최대 줄 수 제한 |
| underline | `boolean` | `false` | 밑줄 표시 |
| strikeThrough | `boolean` | `false` | 취소선 표시 |
| italic | `boolean` | `false` | 기울임체 표시 |
| as | `keyof JSX.IntrinsicElements` | - | 커스텀 HTML 요소 |
| className | `string` | - | 추가 CSS 클래스 |

### Types

```tsx
type TypographyVariant = 
  | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' 
  | 'subtitle1' | 'subtitle2'
  | 'body1' | 'body2'
  | 'caption' | 'overline'
  | 'code' | 'inlineCode';

type TypographyColor = 
  | 'primary' | 'secondary' | 'disabled' 
  | 'success' | 'warning' | 'error' | 'info';

type TypographyAlign = 'left' | 'center' | 'right' | 'justify';

type TypographyWeight = 'normal' | 'medium' | 'semibold' | 'bold';
```

### 기본 사용법

```tsx
import { Typography } from 'mbsw-ui-kit';

// 기본 사용
<Typography variant="h1">제목</Typography>
<Typography variant="body1" color="secondary">본문</Typography>

// 텍스트 정렬 및 스타일링
<Typography 
  variant="h3" 
  align="center" 
  weight="bold" 
  color="primary"
>
  중앙 정렬된 굵은 제목
</Typography>

// 말줄임표
<Typography truncate maxLines={2}>
  긴 텍스트 내용...
</Typography>

// 코드 텍스트
<Typography variant="inlineCode">const code = true;</Typography>
<Typography variant="code">
{`function example() {
  return 'Hello World';
}`}
</Typography>

// 커스텀 요소
<Typography variant="h2" as="span">span으로 렌더링</Typography>
```

### Semantic HTML 매핑

Typography는 variant에 따라 자동으로 적절한 semantic HTML 요소를 선택합니다:

- `h1` → `<h1>`
- `h2` → `<h2>`
- `h3` → `<h3>`
- `h4` → `<h4>`
- `h5` → `<h5>`
- `h6` → `<h6>`
- `subtitle1`, `subtitle2` → `<h6>`
- `body1`, `body2` → `<p>`
- `caption`, `overline` → `<span>`
- `code` → `<pre>`
- `inlineCode` → `<code>`

### 반응형 지원

Typography는 자동으로 반응형 폰트 크기를 적용합니다:

```tsx
// 헤딩은 모바일에서 자동으로 작아집니다
<Typography variant="h1">반응형 제목</Typography>

// 본문 텍스트도 모바일에서 최적화됩니다
<Typography variant="body1">반응형 본문</Typography>
```

### 테마 통합

Typography는 테마 시스템과 완전히 통합되어 일관된 폰트, 색상, 크기를 사용합니다:

```tsx
// 테마의 폰트 설정 사용
typography: {
  fontFamily: theme.fonts.primary,
  fontSize: theme.fonts.sizes.md,
  fontWeight: theme.fonts.weights.normal,
  lineHeight: theme.fonts.lineHeights.normal,
  color: theme.colors.text.primary
}
```

## Badge

Badge 컴포넌트는 상태 표시, 카운트 표시, 라벨링을 위한 다목적 배지 컴포넌트입니다.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | `ReactNode` | - | 배지에 표시할 콘텐츠 |
| variant | `BadgeVariant` | `'filled'` | 배지 변형 스타일 |
| color | `BadgeColor` | `'primary'` | 배지 색상 테마 |
| size | `BadgeSize` | `'medium'` | 배지 크기 |
| position | `BadgePosition` | - | 상위 요소 기준 위치 |
| visible | `boolean` | `true` | 배지 가시성 |
| count | `number` | - | 표시할 숫자 카운트 |
| maxCount | `number` | `99` | 최대 카운트 (초과시 + 표시) |
| showZero | `boolean` | `false` | 0 카운트 표시 여부 |
| closable | `boolean` | `false` | 삭제 버튼 표시 여부 |
| icon | `ReactNode` | - | 배지에 표시할 아이콘 |
| dot | `boolean` | `false` | 점 배지로 표시 여부 |
| className | `string` | - | 추가 CSS 클래스 |
| onClick | `function` | - | 클릭 이벤트 핸들러 |
| onClose | `function` | - | 삭제 버튼 클릭 핸들러 |

### Types

```tsx
type BadgeVariant = 'filled' | 'outlined' | 'soft' | 'dot';

type BadgeColor = 
  | 'primary' | 'secondary' 
  | 'success' | 'warning' | 'error' | 'info';

type BadgeSize = 'small' | 'medium' | 'large';

type BadgePosition = 
  | 'top-right' | 'top-left' 
  | 'bottom-right' | 'bottom-left';
```

### 기본 사용법

```tsx
import { Badge } from 'mbsw-ui-kit';

// 기본 배지
<Badge color="primary">New</Badge>
<Badge color="success">Active</Badge>

// 카운트 배지
<Badge count={5} />
<Badge count={100} maxCount={99} />  // 99+ 표시

// 점 배지
<Badge dot color="success" />

// 삭제 가능한 배지
<Badge closable onClose={handleClose}>Removable</Badge>

// 위치가 지정된 오버레이 배지
<div style={{ position: 'relative' }}>
  <Button>Messages</Button>
  <Badge count={3} position="top-right" color="error" />
</div>
```

### 변형 스타일

```tsx
// Filled (기본) - 채워진 배경
<Badge variant="filled" color="primary">Filled</Badge>

// Outlined - 윤곽선만
<Badge variant="outlined" color="primary">Outlined</Badge>

// Soft - 반투명 배경
<Badge variant="soft" color="primary">Soft</Badge>

// Dot - 점 표시만
<Badge variant="dot" color="success" />
```

### 카운트 처리

```tsx
// 기본 카운트
<Badge count={5} />

// 최대값 초과시 + 표시
<Badge count={150} maxCount={99} />  // "99+" 표시

// 0 카운트 처리
<Badge count={0} />  // 숨겨짐
<Badge count={0} showZero />  // "0" 표시

// 조건부 표시
<Badge count={messageCount} visible={messageCount > 0} />
```

### 아이콘과 함께

```tsx
<Badge icon={<span>🎉</span>}>Celebration</Badge>
<Badge icon={<span>⚠️</span>} color="warning">Warning</Badge>
```

## BadgeWrapper

BadgeWrapper는 다른 요소에 배지를 쉽게 위치시키기 위한 래퍼 컴포넌트입니다.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | `ReactNode` | - | 래핑할 자식 요소 |
| badge | `BadgeProps` | - | 배지 설정 |
| inline | `boolean` | `false` | 인라인 표시 여부 |
| className | `string` | - | 추가 CSS 클래스 |

### 사용법

```tsx
import { BadgeWrapper, Button } from 'mbsw-ui-kit';

// 버튼에 알림 배지
<BadgeWrapper 
  badge={{ count: 5, position: 'top-right', color: 'error' }}
>
  <Button>Inbox</Button>
</BadgeWrapper>

// 아바타에 온라인 상태
<BadgeWrapper 
  badge={{ dot: true, position: 'bottom-right', color: 'success' }}
  inline
>
  <Avatar src="/user.jpg" />
</BadgeWrapper>
```

### 실제 사용 예제

```tsx
// 네비게이션 바에서 알림 표시
function Navigation() {
  const [notificationCount, setNotificationCount] = useState(12);
  
  return (
    <nav>
      <BadgeWrapper 
        badge={{
          count: notificationCount,
          position: 'top-right',
          color: 'error',
          visible: notificationCount > 0
        }}
      >
        <Button variant="ghost">
          <NotificationIcon />
        </Button>
      </BadgeWrapper>
    </nav>
  );
}

// 태그 목록에서 삭제 가능한 배지
function TagList() {
  const [tags, setTags] = useState(['React', 'TypeScript']);
  
  const removeTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };
  
  return (
    <div className="tag-list">
      {tags.map(tag => (
        <Badge
          key={tag}
          variant="soft"
          closable
          onClose={() => removeTag(tag)}
        >
          {tag}
        </Badge>
      ))}
    </div>
  );
}
```

### 접근성

Badge 컴포넌트는 접근성을 고려하여 설계되었습니다:

```tsx
// 상태 정보를 제공하는 배지
<Badge role="status" aria-label="3 new messages">3</Badge>

// 클릭 가능한 배지
<Badge onClick={handleClick} role="button" tabIndex={0}>
  Clickable
</Badge>

// 삭제 버튼은 자동으로 적절한 aria-label 제공
<Badge closable onClose={handleClose}>
  Closable Badge
</Badge>
```

## Tooltip

Tooltip 컴포넌트는 추가 정보나 도움말을 표시하기 위한 오버레이 컴포넌트입니다.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| content | `ReactNode` | - | 툴팁에 표시할 콘텐츠 |
| children | `ReactNode` | - | 대상 요소 |
| position | `TooltipPosition` | `'top'` | 툴팁 위치 |
| trigger | `TooltipTrigger` | `'hover'` | 툴팁 트리거 방식 |
| theme | `TooltipTheme` | `'dark'` | 툴팁 테마 |
| visible | `boolean` | - | 툴팁 가시성 (수동 제어) |
| delayIn | `number` | `0` | 표시 지연 시간 (ms) |
| delayOut | `number` | `0` | 숨김 지연 시간 (ms) |
| showArrow | `boolean` | `true` | 화살표 표시 여부 |
| maxWidth | `number` | `320` | 최대 너비 (px) |
| disabled | `boolean` | `false` | 비활성화 여부 |
| zIndex | `number` | `9999` | Z-index 값 |
| closeOnOutsideClick | `boolean` | `true` | 외부 클릭시 닫기 |
| closeOnEscape | `boolean` | `true` | ESC 키로 닫기 |
| offset | `number` | `8` | 대상 요소로부터의 거리 |
| className | `string` | - | 추가 CSS 클래스 |
| onVisibilityChange | `function` | - | 가시성 변경 콜백 |

### Types

```tsx
type TooltipPosition = 
  | 'top' | 'bottom' | 'left' | 'right'
  | 'top-start' | 'top-end'
  | 'bottom-start' | 'bottom-end'
  | 'left-start' | 'left-end'
  | 'right-start' | 'right-end'
  | 'auto';

type TooltipTrigger = 'hover' | 'click' | 'focus' | 'manual';

type TooltipTheme = 'light' | 'dark';
```

### 기본 사용법

```tsx
import { Tooltip } from 'mbsw-ui-kit';

// 기본 호버 툴팁
<Tooltip content="도움말 텍스트">
  <Button>버튼</Button>
</Tooltip>

// 클릭 툴팁
<Tooltip content="클릭해서 표시" trigger="click">
  <Button>클릭 툴팁</Button>
</Tooltip>

// 수동 제어
<Tooltip
  content="수동 제어 툴팁"
  trigger="manual"
  visible={isVisible}
  onVisibilityChange={setIsVisible}
>
  <Button>대상</Button>
</Tooltip>
```

### 위치 설정

```tsx
// 기본 위치
<Tooltip content="상단 툴팁" position="top">
  <Button>Top</Button>
</Tooltip>

// 세부 위치
<Tooltip content="상단 시작" position="top-start">
  <Button>Top Start</Button>
</Tooltip>

// 자동 위치 조정
<Tooltip content="자동 위치" position="auto">
  <Button>Auto Position</Button>
</Tooltip>
```

### 테마 및 스타일링

```tsx
// 라이트 테마
<Tooltip content="밝은 테마" theme="light">
  <Button>Light</Button>
</Tooltip>

// 다크 테마 (기본)
<Tooltip content="어두운 테마" theme="dark">
  <Button>Dark</Button>
</Tooltip>

// 화살표 없음
<Tooltip content="화살표 없음" showArrow={false}>
  <Button>No Arrow</Button>
</Tooltip>

// 커스텀 너비
<Tooltip content="긴 텍스트..." maxWidth={200}>
  <Button>Custom Width</Button>
</Tooltip>
```

### 지연 시간

```tsx
// 표시 지연
<Tooltip content="지연된 표시" delayIn={500}>
  <Button>Delay In</Button>
</Tooltip>

// 숨김 지연
<Tooltip content="지연된 숨김" delayOut={500}>
  <Button>Delay Out</Button>
</Tooltip>
```

### 복합 콘텐츠

```tsx
<Tooltip 
  content={
    <div>
      <h4>제목</h4>
      <p>설명 텍스트</p>
      <ul>
        <li>항목 1</li>
        <li>항목 2</li>
      </ul>
    </div>
  }
  maxWidth={250}
>
  <Button>Rich Content</Button>
</Tooltip>
```

## useTooltip Hook

useTooltip 훅은 커스텀 툴팁 구현을 위한 로직을 제공합니다.

### Parameters

```tsx
interface UseTooltipOptions {
  trigger: TooltipTrigger;
  delayIn: number;
  delayOut: number;
  visible?: boolean;
  disabled: boolean;
  closeOnOutsideClick: boolean;
  closeOnEscape: boolean;
  onVisibilityChange?: (visible: boolean) => void;
}
```

### Return Value

```tsx
interface UseTooltipReturn {
  isVisible: boolean;
  targetRef: React.RefObject<HTMLElement>;
  tooltipRef: React.RefObject<HTMLDivElement>;
  show: () => void;
  hide: () => void;
  toggle: () => void;
  targetProps: {
    ref: React.RefObject<HTMLElement>;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
    onClick?: () => void;
    onFocus?: () => void;
    onBlur?: () => void;
    onKeyDown?: (event: React.KeyboardEvent) => void;
    'aria-describedby'?: string;
  };
  tooltipProps: {
    ref: React.RefObject<HTMLDivElement>;
    id: string;
    role: string;
  };
}
```

### 사용법

```tsx
import { useTooltip } from 'mbsw-ui-kit';

function CustomTooltip() {
  const tooltip = useTooltip({
    trigger: 'hover',
    delayIn: 200,
    delayOut: 100,
    disabled: false,
    closeOnOutsideClick: true,
    closeOnEscape: true,
    onVisibilityChange: (visible) => console.log('Tooltip:', visible),
  });

  return (
    <div>
      <button {...tooltip.targetProps}>
        Custom Button
      </button>
      
      {tooltip.isVisible && (
        <div 
          {...tooltip.tooltipProps}
          style={{
            position: 'absolute',
            background: '#333',
            color: 'white',
            padding: '8px',
            borderRadius: '4px',
          }}
        >
          Custom Tooltip
        </div>
      )}
    </div>
  );
}
```

### 위치 계산

툴팁은 뷰포트 경계를 자동으로 감지하고 최적의 위치를 선택합니다:

1. **우선순위**: 지정된 위치 → 대안 위치 → 폴백 위치
2. **자동 조정**: 화면 밖으로 나가지 않도록 위치 자동 조정
3. **화살표 위치**: 툴팁 위치에 따라 화살표 자동 배치
4. **경계 클램핑**: 필요시 뷰포트 내부로 위치 강제 조정

### 접근성

Tooltip 컴포넌트는 완전한 접근성을 지원합니다:

```tsx
// 자동 ARIA 속성
<Tooltip content="접근 가능한 툴팁">
  <Button>버튼</Button>  {/* aria-describedby 자동 설정 */}
</Tooltip>

// 키보드 지원
// - Enter/Space: 클릭 트리거에서 툴팁 토글
// - Escape: 툴팁 닫기
// - Tab: 포커스 트리거에서 툴팁 표시/숨김

// 스크린 리더 지원
// - role="tooltip" 자동 설정
// - 적절한 ID 연결
// - 가시성 상태 관리
```

## Pagination

Pagination 컴포넌트는 대용량 데이터를 페이지 단위로 나누어 표시하고 탐색할 수 있게 해주는 컴포넌트입니다.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `current` | `number` | - | 현재 페이지 (1부터 시작) |
| `total` | `number` | - | 전체 항목 수 |
| `pageSize` | `number` | `10` | 페이지당 항목 수 |
| `pageSizeOptions` | `number[]` | `[10, 20, 50, 100]` | 페이지 크기 선택 옵션 |
| `showSizeChanger` | `boolean` | `false` | 페이지 크기 선택기 표시 |
| `showTotal` | `boolean \| function` | `false` | 총 항목 정보 표시 |
| `showQuickJumper` | `boolean` | `false` | 빠른 페이지 이동 입력 표시 |
| `variant` | `'default' \| 'simple' \| 'compact'` | `'default'` | 페이지네이션 변형 |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | 컴포넌트 크기 |
| `disabled` | `boolean` | `false` | 비활성화 상태 |
| `simple` | `boolean` | `false` | 간단한 모드 (이전/다음만) |
| `hideOnSinglePage` | `boolean` | `false` | 단일 페이지일 때 숨김 |
| `showFirstLast` | `boolean` | `false` | 첫/마지막 페이지 버튼 표시 |
| `prevText` | `ReactNode` | - | 이전 버튼 텍스트 |
| `nextText` | `ReactNode` | - | 다음 버튼 텍스트 |
| `firstText` | `ReactNode` | - | 첫 페이지 버튼 텍스트 |
| `lastText` | `ReactNode` | - | 마지막 페이지 버튼 텍스트 |
| `siblingCount` | `number` | `1` | 현재 페이지 주변 표시 페이지 수 |
| `boundaryCount` | `number` | `1` | 경계 페이지 수 |
| `className` | `string` | - | 추가 CSS 클래스 |
| `style` | `CSSProperties` | - | 인라인 스타일 |
| `onChange` | `(page: number, pageSize: number) => void` | - | 페이지 변경 콜백 |
| `onShowSizeChange` | `(current: number, pageSize: number) => void` | - | 페이지 크기 변경 콜백 |
| `itemRender` | `function` | - | 커스텀 아이템 렌더러 |

### 기본 사용법

```tsx
import { Pagination } from 'mbsw-ui-kit';
import { useState } from 'react';

// 기본 페이지네이션
function BasicPagination() {
  const [current, setCurrent] = useState(1);
  
  return (
    <Pagination
      current={current}
      total={500}
      pageSize={20}
      onChange={(page) => setCurrent(page)}
    />
  );
}

// 페이지 크기 선택기 포함
<Pagination
  current={1}
  total={1000}
  pageSize={20}
  showSizeChanger
  pageSizeOptions={[10, 20, 50, 100]}
  onChange={(page, size) => {
    console.log('페이지:', page, '크기:', size);
  }}
/>

// 완전한 기능
<Pagination
  current={5}
  total={2000}
  pageSize={25}
  showSizeChanger
  showTotal
  showQuickJumper
  showFirstLast
  onChange={handleChange}
/>
```

### 변형 및 크기

```tsx
// Simple 변형 (이전/다음만)
<Pagination
  current={1}
  total={100}
  variant="simple"
  onChange={handleChange}
/>

// Compact 변형
<Pagination
  current={1}
  total={100}
  variant="compact"
  onChange={handleChange}
/>

// 크기 변형
<Pagination current={1} total={100} size="sm" onChange={handleChange} />
<Pagination current={1} total={100} size="md" onChange={handleChange} />
<Pagination current={1} total={100} size="lg" onChange={handleChange} />
```

### 커스텀 정보 표시

```tsx
// 함수형 총 정보
<Pagination
  current={1}
  total={1000}
  pageSize={20}
  showTotal={(total, range) => 
    `총 ${total}개 중 ${range[0]}-${range[1]}번째 표시`
  }
  onChange={handleChange}
/>

// 커스텀 텍스트
<Pagination
  current={5}
  total={500}
  showFirstLast
  prevText="이전"
  nextText="다음"
  firstText="처음"
  lastText="끝"
  onChange={handleChange}
/>
```

## usePagination Hook

usePagination 훅은 페이지네이션 상태 관리와 로직을 제공합니다.

### Parameters

```tsx
interface UsePaginationOptions {
  total: number;
  initialPage?: number;
  initialPageSize?: number;
  siblingCount?: number;
  boundaryCount?: number;
  onChange?: (page: number, pageSize: number) => void;
  onPageSizeChange?: (pageSize: number, page: number) => void;
}
```

### Return Value

```tsx
interface UsePaginationReturn {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  hasPrevious: boolean;
  hasNext: boolean;
  goToPrevious: () => void;
  goToNext: () => void;
  goToFirst: () => void;
  goToLast: () => void;
  goToPage: (page: number) => void;
  changePageSize: (size: number) => void;
  getVisiblePages: () => (number | 'ellipsis')[];
  getRangeInfo: () => { start: number; end: number; total: number };
}
```

### 사용법

```tsx
import { usePagination } from 'mbsw-ui-kit';

function CustomPagination() {
  const pagination = usePagination({
    total: 1000,
    initialPage: 1,
    initialPageSize: 20,
    onChange: (page, pageSize) => {
      console.log('페이지 변경:', page, pageSize);
    },
  });

  const visiblePages = pagination.getVisiblePages();
  const rangeInfo = pagination.getRangeInfo();

  return (
    <div>
      <div>
        페이지 {pagination.currentPage} / {pagination.totalPages}
        ({rangeInfo.start}-{rangeInfo.end} of {rangeInfo.total})
      </div>
      
      <div>
        <button 
          onClick={pagination.goToPrevious}
          disabled={!pagination.hasPrevious}
        >
          이전
        </button>
        
        {visiblePages.map((page, index) => (
          <button
            key={index}
            onClick={() => typeof page === 'number' && pagination.goToPage(page)}
            disabled={page === 'ellipsis'}
            style={{
              fontWeight: page === pagination.currentPage ? 'bold' : 'normal'
            }}
          >
            {page === 'ellipsis' ? '...' : page}
          </button>
        ))}
        
        <button 
          onClick={pagination.goToNext}
          disabled={!pagination.hasNext}
        >
          다음
        </button>
      </div>
    </div>
  );
}
```

### 페이지 계산 로직

```tsx
// 페이지 범위 계산 유틸리티
import { calculatePaginationInfo } from 'mbsw-ui-kit';

const info = calculatePaginationInfo(5, 20, 1000);
console.log(info);
// {
//   totalPages: 50,
//   start: 81,
//   end: 100,
//   hasPrevious: true,
//   hasNext: true
// }

// 페이지 크기 옵션 생성
import { generatePageSizeOptions } from 'mbsw-ui-kit';

const options = generatePageSizeOptions([10, 25, 50, 100]);
console.log(options); // [10, 25, 50, 100]
```

### 접근성

Pagination 컴포넌트는 완전한 접근성을 지원합니다:

```tsx
// 자동 ARIA 속성
<Pagination
  current={5}
  total={500}
  onChange={handleChange}
/>
// - aria-label="Go to page X" 자동 설정
// - aria-current="page" 현재 페이지에 설정
// - role="navigation" 네비게이션 역할

// 키보드 지원
// - Tab: 버튼 간 이동
// - Enter/Space: 페이지 선택
// - Arrow Keys: 빠른 이동 (옵션)

// 스크린 리더 지원
// - 현재 페이지 상태 안내
// - 총 페이지 수 정보 제공
// - 페이지 변경 알림
```

---

이 API 문서를 통해 각 컴포넌트의 모든 속성과 사용법을 정확히 파악할 수 있습니다. 추가적인 정보가 필요하거나 새로운 컴포넌트가 추가될 때마다 이 문서도 함께 업데이트됩니다.