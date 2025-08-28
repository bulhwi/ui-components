import React from 'react';

// 기본 옵션 타입
export interface DropdownOption<T = any> {
  label: string;
  value: T;
  disabled?: boolean;
  icon?: React.ReactNode;
  description?: string;
  group?: string;
}

// 그룹화된 옵션
export interface DropdownOptionGroup<T = any> {
  label: string;
  options: DropdownOption<T>[];
  disabled?: boolean;
}

// 포지션 타입
export type DropdownPosition = 
  | 'bottom-start' 
  | 'bottom-end' 
  | 'top-start' 
  | 'top-end' 
  | 'auto';

// 사이즈 타입
export type DropdownSize = 'small' | 'medium' | 'large';

// 기본 Dropdown Props
export interface DropdownProps<T = any> {
  /** 옵션 목록 */
  options: DropdownOption<T>[] | DropdownOptionGroup<T>[];
  /** 선택된 값 (single select) */
  value?: T;
  /** 선택된 값들 (multi select) */
  values?: T[];
  /** 다중 선택 모드 */
  multiple?: boolean;
  /** 변경 콜백 (single select) */
  onChange?: (value: T | null) => void;
  /** 변경 콜백 (multi select) */
  onMultiChange?: (values: T[]) => void;
  /** 플레이스홀더 텍스트 */
  placeholder?: string;
  /** 비활성화 상태 */
  disabled?: boolean;
  /** 로딩 상태 */
  loading?: boolean;
  /** 에러 상태 */
  error?: boolean;
  /** 크기 */
  size?: DropdownSize;
  /** 전체 너비 사용 */
  fullWidth?: boolean;
  /** 드롭다운 메뉴 위치 */
  position?: DropdownPosition;
  /** 검색 가능 여부 */
  searchable?: boolean;
  /** 검색 플레이스홀더 */
  searchPlaceholder?: string;
  /** 선택 시 메뉴 닫기 (다중 선택에서 false 가능) */
  closeOnSelect?: boolean;
  /** 옵션 없을 때 텍스트 */
  noOptionsText?: string;
  /** 최대 높이 */
  maxHeight?: number;
  /** 가상화 활성화 */
  virtualized?: boolean;
  /** 가상화 시 아이템 높이 */
  itemHeight?: number;
  /** 커스텀 옵션 렌더링 */
  renderOption?: (option: DropdownOption<T>, isSelected: boolean) => React.ReactNode;
  /** 커스텀 선택된 값 렌더링 */
  renderValue?: (value: T | null, option: DropdownOption<T> | null) => React.ReactNode;
  /** 커스텀 다중 선택 값 렌더링 */
  renderValues?: (values: T[], options: DropdownOption<T>[]) => React.ReactNode;
  /** 태그 형태로 다중 선택 표시 */
  showTags?: boolean;
  /** 최대 태그 개수 */
  maxTags?: number;
  /** 열림 상태 제어 */
  open?: boolean;
  /** 기본 열림 상태 */
  defaultOpen?: boolean;
  /** 열림 상태 변경 콜백 */
  onOpenChange?: (open: boolean) => void;
  /** 검색어 변경 콜백 */
  onSearch?: (query: string) => void;
  /** 포커스 콜백 */
  onFocus?: (event: React.FocusEvent) => void;
  /** 블러 콜백 */
  onBlur?: (event: React.FocusEvent) => void;
  /** CSS 클래스 */
  className?: string;
  /** 스타일 */
  style?: React.CSSProperties;
  /** 테스트 ID */
  'data-testid'?: string;
  /** ARIA 레이블 */
  'aria-label'?: string;
  /** ARIA 설명 */
  'aria-describedby'?: string;
}

// Dropdown Trigger Props
export interface DropdownTriggerProps {
  /** 선택된 옵션 표시 텍스트 */
  displayText?: string;
  /** 플레이스홀더 */
  placeholder?: string;
  /** 비활성화 상태 */
  disabled?: boolean;
  /** 로딩 상태 */
  loading?: boolean;
  /** 에러 상태 */
  error?: boolean;
  /** 크기 */
  size?: DropdownSize;
  /** 열림 상태 */
  isOpen?: boolean;
  /** 전체 너비 */
  fullWidth?: boolean;
  /** 클릭 핸들러 */
  onClick?: () => void;
  /** 키보드 핸들러 */
  onKeyDown?: (event: React.KeyboardEvent) => void;
  /** 포커스 핸들러 */
  onFocus?: (event: React.FocusEvent) => void;
  /** 블러 핸들러 */
  onBlur?: (event: React.FocusEvent) => void;
  /** 참조 */
  ref?: React.RefObject<HTMLButtonElement>;
  /** CSS 클래스 */
  className?: string;
  /** 태그들 (다중 선택) */
  tags?: Array<{ label: string; onRemove: () => void }>;
  /** 최대 태그 개수 */
  maxTags?: number;
}

// Dropdown Menu Props  
export interface DropdownMenuProps<T = any> {
  /** 옵션 목록 */
  options: DropdownOption<T>[] | DropdownOptionGroup<T>[];
  /** 선택된 값(들) */
  selectedValues?: T[];
  /** 옵션 클릭 핸들러 */
  onOptionClick?: (option: DropdownOption<T>) => void;
  /** 검색어 */
  searchQuery?: string;
  /** 검색 가능 여부 */
  searchable?: boolean;
  /** 검색 플레이스홀더 */
  searchPlaceholder?: string;
  /** 검색어 변경 핸들러 */
  onSearchChange?: (query: string) => void;
  /** 옵션 없을 때 텍스트 */
  noOptionsText?: string;
  /** 최대 높이 */
  maxHeight?: number;
  /** 가상화 */
  virtualized?: boolean;
  /** 아이템 높이 */
  itemHeight?: number;
  /** 하이라이트된 인덱스 */
  highlightedIndex?: number;
  /** 커스텀 옵션 렌더링 */
  renderOption?: (option: DropdownOption<T>, isSelected: boolean) => React.ReactNode;
  /** 로딩 상태 */
  loading?: boolean;
  /** CSS 클래스 */
  className?: string;
}

// Dropdown Option Item Props
export interface DropdownOptionProps<T = any> {
  /** 옵션 */
  option: DropdownOption<T>;
  /** 선택 상태 */
  isSelected?: boolean;
  /** 하이라이트 상태 */
  isHighlighted?: boolean;
  /** 클릭 핸들러 */
  onClick?: () => void;
  /** 커스텀 렌더링 */
  renderOption?: (option: DropdownOption<T>, isSelected: boolean) => React.ReactNode;
  /** 높이 (가상화용) */
  height?: number;
  /** CSS 클래스 */
  className?: string;
}

// Tag Props
export interface TagProps {
  /** 태그 라벨 */
  label: string;
  /** 제거 핸들러 */
  onRemove?: () => void;
  /** 비활성화 상태 */
  disabled?: boolean;
  /** 크기 */
  size?: DropdownSize;
  /** CSS 클래스 */
  className?: string;
}

// 검색 필터링을 위한 유틸리티 타입
export interface FilterOptions {
  /** 대소문자 구분 안함 */
  ignoreCase?: boolean;
  /** 부분 매치 */
  includesMatch?: boolean;
  /** 시작 매치만 */
  startsWith?: boolean;
  /** 커스텀 필터 함수 */
  customFilter?: (option: DropdownOption, query: string) => boolean;
}

// 키보드 네비게이션을 위한 타입
export interface KeyboardNavigationState {
  /** 현재 하이라이트된 인덱스 */
  highlightedIndex: number;
  /** 열림 상태 */
  isOpen: boolean;
  /** 검색 모드 */
  isSearching: boolean;
}

// 가상화를 위한 타입
export interface VirtualizationConfig {
  /** 가상화 활성화 */
  enabled: boolean;
  /** 아이템 높이 */
  itemHeight: number;
  /** 컨테이너 높이 */
  containerHeight: number;
  /** 버퍼 크기 */
  buffer?: number;
}

// 접근성을 위한 ARIA 속성
export interface DropdownAriaProps {
  /** 콤보박스 역할 */
  role?: 'combobox' | 'listbox';
  /** 확장 상태 */
  'aria-expanded'?: boolean;
  /** 다중 선택 */
  'aria-multiselectable'?: boolean;
  /** 자동 완성 */
  'aria-autocomplete'?: 'none' | 'inline' | 'list' | 'both';
  /** 활성 후손 */
  'aria-activedescendant'?: string;
  /** 레이블 */
  'aria-label'?: string;
  /** 설명 참조 */
  'aria-describedby'?: string;
  /** 필수 여부 */
  'aria-required'?: boolean;
  /** 유효하지 않음 */
  'aria-invalid'?: boolean;
}

// Hook 반환 타입
export interface UseDropdownReturn<T = any> {
  /** 열림 상태 */
  isOpen: boolean;
  /** 선택된 값(들) */
  selectedValues: T[];
  /** 하이라이트된 인덱스 */
  highlightedIndex: number;
  /** 검색어 */
  searchQuery: string;
  /** 필터링된 옵션들 */
  filteredOptions: (DropdownOption<T> | DropdownOptionGroup<T>)[];
  /** 열기/닫기 토글 */
  toggle: () => void;
  /** 열기 */
  open: () => void;
  /** 닫기 */
  close: () => void;
  /** 옵션 선택 */
  selectOption: (option: DropdownOption<T>) => void;
  /** 옵션 제거 (다중 선택) */
  removeOption: (value: T) => void;
  /** 모든 옵션 제거 */
  clearAll: () => void;
  /** 검색어 설정 */
  setSearchQuery: (query: string) => void;
  /** 키보드 핸들러 */
  handleKeyDown: (event: React.KeyboardEvent) => void;
  /** ARIA 속성 */
  getAriaProps: () => DropdownAriaProps;
}