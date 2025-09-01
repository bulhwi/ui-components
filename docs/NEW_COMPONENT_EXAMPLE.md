# 신규 컴포넌트 개발 가이드

이 문서는 UI 라이브러리에 새로운 컴포넌트를 추가할 때 따라야 할 설계 패턴과 구조를 설명합니다.

## 📁 파일 구조

컴포넌트는 다음과 같은 파일 구조를 따라야 합니다:

```
src/components/ComponentName/
├── ComponentName.tsx          # 메인 컴포넌트
├── ComponentName.stories.tsx  # Storybook 스토리
├── ComponentName.test.tsx     # 테스트 파일
├── types.ts                   # TypeScript 타입 정의
├── styles.ts                  # styled-components 스타일
├── index.ts                   # export 파일
└── __tests__/                 # 추가 테스트 (필요시)
    └── ComponentName.test.tsx
```

## 🏗️ 컴포넌트 개발 패턴

### 1. 타입 정의 (types.ts)

먼저 컴포넌트의 props와 variant 타입을 정의합니다:

```typescript
// types.ts
import React, { ButtonHTMLAttributes } from 'react';

// Variant 타입은 Union 타입으로 정의
export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'danger';
export type ButtonSize = 'small' | 'medium' | 'large';

// 기본 HTML 속성을 확장하는 인터페이스
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  // 필수 props
  children: React.ReactNode;
  
  // 선택적 props (기본값 포함)
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  
  // 아이콘 관련 props
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}
```

**중요한 패턴들:**
- HTML 기본 속성 확장: `extends ButtonHTMLAttributes<HTMLButtonElement>`
- Union 타입으로 variant 제한
- 선택적 props에는 `?` 사용
- React.ReactNode로 children 타입 지정

### 2. 스타일 정의 (styles.ts)

styled-components를 사용하여 테마 기반 스타일을 작성합니다:

```typescript
// styles.ts
import styled, { css } from 'styled-components';
import { ButtonProps } from './types';

// Variant별 스타일 함수
const getVariantStyles = (variant: ButtonProps['variant']) => {
  switch (variant) {
    case 'primary':
      return css`
        background-color: ${({ theme }) => theme.colors.primary};
        color: white;
        border: 1px solid ${({ theme }) => theme.colors.primary};

        &:hover:not(:disabled) {
          background-color: ${({ theme }) => theme.colors.primaryHover};
          border-color: ${({ theme }) => theme.colors.primaryHover};
        }
      `;
    case 'secondary':
      return css`
        background-color: transparent;
        color: ${({ theme }) => theme.colors.secondary};
        border: 1px solid ${({ theme }) => theme.colors.border};
      `;
    default:
      return css``;
  }
};

// Size별 스타일 함수
const getSizeStyles = (size: ButtonProps['size']) => {
  switch (size) {
    case 'small':
      return css`
        height: 2rem;
        padding: 0 ${({ theme }) => theme.spacing.sm};
        font-size: ${({ theme }) => theme.fonts.sizes.sm};
      `;
    case 'medium':
      return css`
        height: 2.5rem;
        padding: 0 ${({ theme }) => theme.spacing.md};
        font-size: ${({ theme }) => theme.fonts.sizes.md};
      `;
    default:
      return css``;
  }
};

// 메인 스타일 컴포넌트
export const StyledButton = styled.button.withConfig({
  // DOM에 전달되지 않을 props 필터링
  shouldForwardProp: (prop) => !['variant', 'size', 'fullWidth', 'loading'].includes(prop),
})<ButtonProps>`
  // 기본 스타일
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.xs};
  font-family: ${({ theme }) => theme.fonts.primary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  transition: all 0.2s ease;
  outline: none;

  // 동적 스타일 적용
  ${({ variant }) => getVariantStyles(variant)}
  ${({ size }) => getSizeStyles(size)}

  // 조건부 스타일
  ${({ fullWidth }) =>
    fullWidth &&
    css`
      width: 100%;
    `}

  ${({ loading }) =>
    loading &&
    css`
      pointer-events: none;
      opacity: 0.7;
    `}

  // 상태별 스타일
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;

// 보조 컴포넌트들
export const IconWrapper = styled.span<{ position: 'left' | 'right' }>`
  display: inline-flex;
  align-items: center;
  order: ${({ position }) => (position === 'left' ? -1 : 1)};
`;
```

**핵심 패턴들:**
- `shouldForwardProp`으로 DOM 오염 방지
- Theme 기반 색상/크기 사용
- 함수형 스타일로 variant/size 관리
- 조건부 스타일은 `css` 헬퍼 사용
- 접근성을 위한 focus-visible 스타일

### 3. 메인 컴포넌트 (ComponentName.tsx)

React 컴포넌트를 구현합니다:

```typescript
// Button.tsx
import React from 'react';
import { ButtonProps } from './types';
import { StyledButton, IconWrapper, LoadingSpinner } from './styles';

export const Button: React.FC<ButtonProps> = ({
  // props 구조분해와 기본값 설정
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  loading = false,
  icon,
  iconPosition = 'left',
  children,
  disabled,
  ...rest // 나머지 HTML 속성들
}) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      loading={loading}
      disabled={disabled || loading}
      {...rest}
    >
      {/* 조건부 렌더링 */}
      {loading && <LoadingSpinner />}
      {!loading && icon && (
        <IconWrapper position={iconPosition}>{icon}</IconWrapper>
      )}
      {children}
    </StyledButton>
  );
};

// DevTools에서 식별을 위한 displayName
Button.displayName = 'Button';
```

### 4. 더 복잡한 컴포넌트 예시 (Input)

복잡한 구조를 가진 컴포넌트의 패턴:

```typescript
// Input.tsx
import React, { forwardRef } from 'react';
import { InputProps } from './types';
import {
  StyledInputContainer,
  StyledLabel,
  StyledInputWrapper,
  StyledInput,
  StyledIconWrapper,
  StyledHelperText,
  StyledRequiredMark,
} from './styles';

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  variant = 'default',
  size = 'medium',
  type = 'text',
  label,
  placeholder,
  helperText,
  error = false,
  errorMessage,
  disabled = false,
  fullWidth = false,
  required = false,
  leftIcon,
  rightIcon,
  onIconClick,
  id,
  ...rest
}, ref) => {
  // 내부 로직 처리
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  const hasLeftIcon = Boolean(leftIcon);
  const hasRightIcon = Boolean(rightIcon);
  const displayHelperText = error && errorMessage ? errorMessage : helperText;

  const handleIconClick = (position: 'left' | 'right') => {
    if (onIconClick && !disabled) {
      onIconClick(position);
    }
  };

  return (
    <StyledInputContainer fullWidth={fullWidth} disabled={disabled}>
      {/* 조건부 렌더링: 라벨 */}
      {label && (
        <StyledLabel htmlFor={inputId}>
          {label}
          {required && <StyledRequiredMark>*</StyledRequiredMark>}
        </StyledLabel>
      )}
      
      {/* 중첩 구조: Wrapper > Icons + Input */}
      <StyledInputWrapper
        variant={variant}
        size={size}
        error={error}
        disabled={disabled}
        hasLeftIcon={hasLeftIcon}
        hasRightIcon={hasRightIcon}
      >
        {leftIcon && (
          <StyledIconWrapper
            position="left"
            clickable={Boolean(onIconClick)}
            onClick={() => handleIconClick('left')}
          >
            {leftIcon}
          </StyledIconWrapper>
        )}
        
        <StyledInput
          ref={ref}
          id={inputId}
          type={type}
          variant={variant}
          size={size}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          hasLeftIcon={hasLeftIcon}
          hasRightIcon={hasRightIcon}
          {...rest}
        />
        
        {rightIcon && (
          <StyledIconWrapper
            position="right"
            clickable={Boolean(onIconClick)}
            onClick={() => handleIconClick('right')}
          >
            {rightIcon}
          </StyledIconWrapper>
        )}
      </StyledInputWrapper>
      
      {/* 헬퍼 텍스트 */}
      {displayHelperText && (
        <StyledHelperText error={error}>
          {displayHelperText}
        </StyledHelperText>
      )}
    </StyledInputContainer>
  );
});

Input.displayName = 'Input';
```

### 5. Export 파일 (index.ts)

컴포넌트와 관련 요소들을 export합니다:

```typescript
// index.ts
export { Button } from './Button';
export type { ButtonProps, ButtonVariant, ButtonSize } from './types';
export { StyledButton, IconWrapper } from './styles';
```

## 🎨 스타일링 베스트 프랙티스

### 1. Theme 활용
```typescript
// 항상 theme을 통해 값 참조
color: ${({ theme }) => theme.colors.primary};
font-size: ${({ theme }) => theme.fonts.sizes.md};
spacing: ${({ theme }) => theme.spacing.sm};
```

### 2. shouldForwardProp 사용
```typescript
// DOM에 전달되지 않을 props 필터링
export const StyledComponent = styled.div.withConfig({
  shouldForwardProp: (prop) => !['customProp', 'variant'].includes(prop),
})<Props>`
  // styles...
`;
```

### 3. 조건부 스타일
```typescript
// css 헬퍼 사용
${({ isActive }) =>
  isActive &&
  css`
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
  `}
```

## 🔧 개발 체크리스트

### ✅ 필수 구현사항
- [ ] TypeScript 타입 정의
- [ ] styled-components 스타일링
- [ ] 기본값이 있는 props 설정
- [ ] forwardRef 구현 (DOM 요소 접근 필요시)
- [ ] displayName 설정
- [ ] shouldForwardProp 적절히 설정

### ✅ 접근성 (a11y)
- [ ] 키보드 네비게이션 지원
- [ ] ARIA 속성 적절히 설정
- [ ] focus-visible 스타일 구현
- [ ] 스크린 리더 지원

### ✅ 반응형 & 테마
- [ ] 테마 색상 시스템 활용
- [ ] 다크모드 고려
- [ ] 반응형 크기 지원
- [ ] 일관된 spacing 사용

### ✅ 성능
- [ ] 불필요한 리렌더링 방지
- [ ] 메모화 필요시 적용
- [ ] DOM props 오염 방지

## 📝 Storybook 스토리 작성

```typescript
// ComponentName.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'tertiary', 'danger'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Button',
  },
};

export const WithIcon: Story = {
  args: {
    variant: 'primary',
    children: 'Button',
    icon: <span>🚀</span>,
  },
};
```

## 🧪 테스트 작성

```typescript
// ComponentName.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../styles/theme';
import { Button } from './Button';

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe('Button', () => {
  it('renders children correctly', () => {
    renderWithTheme(<Button>Test Button</Button>);
    expect(screen.getByText('Test Button')).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    renderWithTheme(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('disables button when loading', () => {
    renderWithTheme(<Button loading>Loading Button</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });
});
```

이 가이드를 따라 일관성 있고 재사용 가능한 컴포넌트를 개발할 수 있습니다. 각 패턴들은 현재 라이브러리의 기존 컴포넌트들과 일치하는 구조를 제공합니다.