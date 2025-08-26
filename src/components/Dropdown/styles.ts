import styled, { css, keyframes } from 'styled-components';
import { DropdownSize } from './types';

// 애니메이션 키프레임
const slideDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-8px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(8px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

// 크기별 스타일
const getSizeStyles = (size: DropdownSize) => {
  const styles = {
    small: css`
      min-height: 32px;
      padding: 0 ${({ theme }) => theme.spacing.sm};
      font-size: ${({ theme }) => theme.fonts.sizes.sm};
    `,
    medium: css`
      min-height: 40px;
      padding: 0 ${({ theme }) => theme.spacing.md};
      font-size: ${({ theme }) => theme.fonts.sizes.md};
    `,
    large: css`
      min-height: 48px;
      padding: 0 ${({ theme }) => theme.spacing.lg};
      font-size: ${({ theme }) => theme.fonts.sizes.lg};
    `,
  };
  
  return styles[size];
};

// Dropdown 컨테이너
export const DropdownContainer = styled.div<{ $fullWidth?: boolean }>`
  position: relative;
  display: inline-block;
  width: ${({ $fullWidth }) => $fullWidth ? '100%' : 'auto'};
  min-width: 200px;
`;

// Dropdown Trigger
export const DropdownTrigger = styled.button<{
  $size: DropdownSize;
  $isOpen?: boolean;
  $error?: boolean;
  $fullWidth?: boolean;
  $disabled?: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: ${({ $fullWidth }) => $fullWidth ? '100%' : 'auto'};
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme, $error, $isOpen }) => 
    $error 
      ? theme.colors.error 
      : $isOpen 
        ? theme.colors.primary 
        : theme.colors.border
  };
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.text.primary};
  cursor: ${({ $disabled }) => $disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.2s ease-in-out;
  
  ${({ $size }) => getSizeStyles($size)}
  
  &:hover:not(:disabled) {
    border-color: ${({ theme, $error }) => 
      $error ? theme.colors.error : theme.colors.primary
    };
  }
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}20;
  }
  
  &:disabled {
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text.disabled};
    border-color: ${({ theme }) => theme.colors.border};
  }
`;

// Trigger 내용
export const TriggerContent = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  min-width: 0;
  gap: ${({ theme }) => theme.spacing.xs};
`;

// 선택된 값 텍스트
export const TriggerText = styled.span<{ $hasValue?: boolean }>`
  flex: 1;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${({ theme, $hasValue }) => 
    $hasValue 
      ? theme.colors.text.primary 
      : theme.colors.text.secondary
  };
`;

// 태그 컨테이너 (다중 선택)
export const TagsContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.xs};
  flex: 1;
  min-width: 0;
`;

// 태그
export const Tag = styled.span<{ $size: DropdownSize }>`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme, $size }) => 
    $size === 'small' 
      ? theme.fonts.sizes.xs 
      : $size === 'large'
        ? theme.fonts.sizes.sm
        : theme.fonts.sizes.xs
  };
  padding: ${({ theme, $size }) => 
    $size === 'small' 
      ? `2px ${theme.spacing.xs}`
      : $size === 'large'
        ? `4px ${theme.spacing.sm}`
        : `3px ${theme.spacing.xs}`
  };
  max-width: 120px;
  
  span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

// 태그 제거 버튼
export const TagRemoveButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  padding: 0;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
  
  &:focus {
    outline: none;
    background-color: rgba(255, 255, 255, 0.3);
  }
`;

// 더보기 태그 (+N)
export const MoreTag = styled(Tag)`
  background-color: ${({ theme }) => theme.colors.text.secondary};
`;

// 화살표 아이콘 컨테이너
export const ArrowContainer = styled.div<{ $isOpen?: boolean; $disabled?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  color: ${({ theme, $disabled }) => 
    $disabled 
      ? theme.colors.text.disabled 
      : theme.colors.text.secondary
  };
  transition: transform 0.2s ease;
  transform: ${({ $isOpen }) => $isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
`;

// 로딩 스피너 컨테이너  
export const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
`;

// Dropdown Menu 포털 컨테이너
export const DropdownPortal = styled.div<{ $position?: string }>`
  position: absolute;
  z-index: 9999;
  
  ${({ $position }) => {
    switch ($position) {
      case 'top-start':
        return css`bottom: 100%; left: 0; margin-bottom: 4px;`;
      case 'top-end': 
        return css`bottom: 100%; right: 0; margin-bottom: 4px;`;
      case 'bottom-start':
        return css`top: 100%; left: 0; margin-top: 4px;`;
      case 'bottom-end':
        return css`top: 100%; right: 0; margin-top: 4px;`;
      default:
        return css`top: 100%; left: 0; margin-top: 4px;`;
    }
  }}
`;

// Dropdown Menu
export const DropdownMenu = styled.div<{ 
  $maxHeight?: number;
  $position?: string;
}>`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  overflow: hidden;
  min-width: 200px;
  max-height: ${({ $maxHeight }) => $maxHeight || 300}px;
  
  animation: ${({ $position }) => 
    $position?.includes('top') ? slideUp : slideDown
  } 0.2s ease-out;
  
  will-change: opacity, transform;
`;

// 검색 입력 컨테이너
export const SearchContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.sm};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

// 검색 입력
export const SearchInput = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.fonts.sizes.sm};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`;

// 옵션 리스트 컨테이너
export const OptionsContainer = styled.div<{ $maxHeight?: number }>`
  max-height: ${({ $maxHeight }) => $maxHeight ? `${$maxHeight}px` : 'auto'};
  overflow-y: auto;
  
  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.border};
    border-radius: 3px;
    
    &:hover {
      background: ${({ theme }) => theme.colors.text.secondary};
    }
  }
`;

// 옵션 그룹
export const OptionGroup = styled.div`
  &:not(:first-child) {
    border-top: 1px solid ${({ theme }) => theme.colors.border};
  }
`;

// 그룹 헤더
export const GroupHeader = styled.div<{ $disabled?: boolean }>`
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme, $disabled }) => 
    $disabled 
      ? theme.colors.text.disabled 
      : theme.colors.text.secondary
  };
  font-size: ${({ theme }) => theme.fonts.sizes.xs};
  font-weight: ${({ theme }) => theme.fonts.weights.semibold};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

// 개별 옵션
export const OptionItem = styled.div<{
  $isSelected?: boolean;
  $isHighlighted?: boolean;
  $disabled?: boolean;
  $height?: number;
}>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  cursor: ${({ $disabled }) => $disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.15s ease-in-out;
  user-select: none;
  min-height: ${({ $height }) => $height ? `${$height}px` : '40px'};
  
  background-color: ${({ theme, $isSelected, $isHighlighted, $disabled }) => {
    if ($disabled) return 'transparent';
    if ($isSelected && $isHighlighted) return theme.colors.primary + '30';
    if ($isSelected) return theme.colors.primary + '20';
    if ($isHighlighted) return theme.colors.background;
    return 'transparent';
  }};
  
  color: ${({ theme, $disabled, $isSelected }) => {
    if ($disabled) return theme.colors.text.disabled;
    if ($isSelected) return theme.colors.primary;
    return theme.colors.text.primary;
  }};
  
  &:hover:not([data-disabled="true"]) {
    background-color: ${({ theme, $isSelected }) => 
      $isSelected 
        ? theme.colors.primary + '30'
        : theme.colors.background
    };
  }
`;

// 옵션 아이콘
export const OptionIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 20px;
  height: 20px;
`;

// 옵션 내용
export const OptionContent = styled.div`
  flex: 1;
  min-width: 0;
`;

// 옵션 라벨
export const OptionLabel = styled.div`
  font-size: ${({ theme }) => theme.fonts.sizes.sm};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

// 옵션 설명
export const OptionDescription = styled.div`
  font-size: ${({ theme }) => theme.fonts.sizes.xs};
  color: ${({ theme }) => theme.colors.text.secondary};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 2px;
`;

// 체크박스 (다중 선택)
export const Checkbox = styled.div<{ $checked?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  border: 1px solid ${({ theme, $checked }) => 
    $checked ? theme.colors.primary : theme.colors.border
  };
  border-radius: 3px;
  background-color: ${({ theme, $checked }) => 
    $checked ? theme.colors.primary : 'transparent'
  };
  color: white;
  font-size: 10px;
  transition: all 0.15s ease;
`;

// 빈 상태
export const EmptyState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => `${theme.spacing.lg} ${theme.spacing.md}`};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.fonts.sizes.sm};
  text-align: center;
`;

// 로딩 상태
export const LoadingState = styled(EmptyState)`
  gap: ${({ theme }) => theme.spacing.sm};
`;

// 아이콘 컴포넌트들
export const ChevronDownIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.427 6.427a.6.6 0 0 1 .849 0L8 9.151l2.724-2.724a.6.6 0 1 1 .849.849l-3.148 3.148a.6.6 0 0 1-.849 0L4.427 7.276a.6.6 0 0 1 0-.849Z"/>
  </svg>
);

export const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M10.28 3.22a.75.75 0 0 0-1.06 0L5 7.44 2.78 5.22a.75.75 0 0 0-1.06 1.06l2.75 2.75a.75.75 0 0 0 1.06 0l4.75-4.75a.75.75 0 0 0 0-1.06Z"/>
  </svg>
);

export const XIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M3.22 3.22a.75.75 0 0 1 1.06 0L6 4.94l1.72-1.72a.75.75 0 1 1 1.06 1.06L7.06 6l1.72 1.72a.75.75 0 0 1-1.06 1.06L6 7.06 4.28 8.78a.75.75 0 0 1-1.06-1.06L5.94 6 4.22 4.28a.75.75 0 0 1 0-1.06Z"/>
  </svg>
);

export const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.5 1a5.5 5.5 0 1 0 3.25 9.93l2.96 2.96a.75.75 0 1 0 1.06-1.06L10.93 9.75A5.5 5.5 0 0 0 6.5 1ZM2.5 6.5a4 4 0 1 1 8 0 4 4 0 0 1-8 0Z"/>
  </svg>
);