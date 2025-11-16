import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { DropdownOption, DropdownOptionGroup, UseDropdownReturn, FilterOptions } from './types';

// 옵션이 그룹인지 확인하는 타입 가드
function isOptionGroup<T>(item: DropdownOption<T> | DropdownOptionGroup<T>): item is DropdownOptionGroup<T> {
  return 'options' in item;
}

// 옵션 평탄화 함수
function flattenOptions<T>(options: (DropdownOption<T> | DropdownOptionGroup<T>)[]): DropdownOption<T>[] {
  return options.reduce<DropdownOption<T>[]>((acc, item) => {
    if (isOptionGroup(item)) {
      return [...acc, ...item.options];
    }
    return [...acc, item];
  }, []);
}

// 기본 필터링 함수
function defaultFilter<T>(option: DropdownOption<T>, query: string): boolean {
  const searchStr = query.toLowerCase();
  return (
    option.label.toLowerCase().includes(searchStr) ||
    (option.description ? option.description.toLowerCase().includes(searchStr) : false)
  );
}

// 검색 필터링 함수
function filterOptions<T>(
  options: (DropdownOption<T> | DropdownOptionGroup<T>)[], 
  searchQuery: string,
  filterConfig?: FilterOptions
): (DropdownOption<T> | DropdownOptionGroup<T>)[] {
  if (!searchQuery) return options;
  
  const config = {
    ignoreCase: true,
    includesMatch: true,
    startsWith: false,
    ...filterConfig,
  };
  
  const query = config.ignoreCase ? searchQuery.toLowerCase() : searchQuery;
  
  const matchesQuery = (text: string): boolean => {
    const targetText = config.ignoreCase ? text.toLowerCase() : text;
    
    if (config.customFilter) {
      return true; // customFilter는 별도로 처리
    }
    
    if (config.startsWith) {
      return targetText.startsWith(query);
    }
    
    return targetText.includes(query);
  };
  
  return options.reduce<(DropdownOption<T> | DropdownOptionGroup<T>)[]>((acc, item) => {
    if (isOptionGroup(item)) {
      const filteredGroupOptions = item.options.filter(option => {
        if (config.customFilter) {
          return config.customFilter(option, searchQuery);
        }
        
        return matchesQuery(option.label) || 
               (option.description && matchesQuery(option.description));
      });
      
      if (filteredGroupOptions.length > 0) {
        acc.push({ ...item, options: filteredGroupOptions });
      }
    } else {
      if (config.customFilter) {
        if (config.customFilter(item, searchQuery)) {
          acc.push(item);
        }
      } else {
        if (matchesQuery(item.label) || 
            (item.description && matchesQuery(item.description))) {
          acc.push(item);
        }
      }
    }
    
    return acc;
  }, []);
}

interface UseDropdownOptions<T> {
  options: (DropdownOption<T> | DropdownOptionGroup<T>)[];
  value?: T;
  values?: T[];
  multiple?: boolean;
  defaultOpen?: boolean;
  closeOnSelect?: boolean;
  onChange?: (value: T | null) => void;
  onMultiChange?: (values: T[]) => void;
  onOpenChange?: (open: boolean) => void;
  onSearch?: (query: string) => void;
  filterOptions?: FilterOptions;
}

export function useDropdown<T = any>({
  options,
  value,
  values,
  multiple = false,
  defaultOpen = false,
  closeOnSelect = true,
  onChange,
  onMultiChange,
  onOpenChange,
  onSearch,
  filterOptions: filterConfig,
}: UseDropdownOptions<T>): UseDropdownReturn<T> {
  // State
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [searchQuery, setSearchQuery] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [isSearching, setIsSearching] = useState(false);
  
  // Refs
  const triggerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLElement>(null);
  const optionRefs = useRef<(HTMLElement | null)[]>([]);
  
  // 내부 상태 관리 (비제어 모드)
  const [internalValue, setInternalValue] = useState<T | null>(value ?? null);
  const [internalValues, setInternalValues] = useState<T[]>(values ?? []);

  // 현재 선택된 값들
  const selectedValues = useMemo(() => {
    if (multiple) {
      return values ?? internalValues;
    }
    const currentValue = value ?? internalValue;
    return currentValue !== undefined && currentValue !== null ? [currentValue] : [];
  }, [multiple, values, value, internalValues, internalValue]);
  
  // 필터링된 옵션들
  const filteredOptions = useMemo(() => {
    return filterOptions(options, searchQuery, filterConfig);
  }, [options, searchQuery, filterConfig]);
  
  // 평탄화된 옵션들 (키보드 네비게이션용)
  const flatOptions = useMemo(() => {
    return flattenOptions(filteredOptions);
  }, [filteredOptions]);
  
  // 열기/닫기 토글
  const toggle = useCallback(() => {
    const newOpen = !isOpen;
    setIsOpen(newOpen);
    onOpenChange?.(newOpen);
    
    if (newOpen) {
      setHighlightedIndex(-1);
      setSearchQuery('');
      setIsSearching(false);
    }
  }, [isOpen, onOpenChange]);
  
  // 열기
  const open = useCallback(() => {
    if (!isOpen) {
      setIsOpen(true);
      onOpenChange?.(true);
      setHighlightedIndex(-1);
      setSearchQuery('');
      setIsSearching(false);
    }
  }, [isOpen, onOpenChange]);
  
  // 닫기
  const close = useCallback(() => {
    if (isOpen) {
      setIsOpen(false);
      onOpenChange?.(false);
      setSearchQuery('');
      setHighlightedIndex(-1);
      setIsSearching(false);
    }
  }, [isOpen, onOpenChange]);

  // 옵션 선택
  const selectOption = useCallback((option: DropdownOption<T>) => {
    if (option.disabled) return;

    if (multiple) {
      const currentValues = values ?? internalValues;
      const newValues = currentValues.includes(option.value)
        ? currentValues.filter(v => v !== option.value)
        : [...currentValues, option.value];

      // 비제어 모드일 때 내부 상태 업데이트
      if (values === undefined) {
        setInternalValues(newValues);
      }

      onMultiChange?.(newValues);

      if (!closeOnSelect) return;
    } else {
      const newValue = option.value;

      // 비제어 모드일 때 내부 상태 업데이트
      if (value === undefined) {
        setInternalValue(newValue);
      }

      onChange?.(newValue);
    }

    if (closeOnSelect) {
      close();
    }
  }, [multiple, values, internalValues, value, internalValue, onMultiChange, onChange, closeOnSelect, close]);
  
  // 옵션 제거 (다중 선택)
  const removeOption = useCallback((valueToRemove: T) => {
    if (!multiple) return;

    const currentValues = values ?? internalValues;
    const newValues = currentValues.filter(v => v !== valueToRemove);

    // 비제어 모드일 때 내부 상태 업데이트
    if (values === undefined) {
      setInternalValues(newValues);
    }

    onMultiChange?.(newValues);
  }, [multiple, values, internalValues, onMultiChange]);

  // 모든 옵션 제거
  const clearAll = useCallback(() => {
    if (multiple) {
      // 비제어 모드일 때 내부 상태 업데이트
      if (values === undefined) {
        setInternalValues([]);
      }
      onMultiChange?.([]);
    } else {
      // 비제어 모드일 때 내부 상태 업데이트
      if (value === undefined) {
        setInternalValue(null);
      }
      onChange?.(null);
    }
  }, [multiple, values, value, onMultiChange, onChange]);
  
  // 검색어 설정
  const handleSetSearchQuery = useCallback((query: string) => {
    setSearchQuery(query);
    setHighlightedIndex(-1);
    setIsSearching(query.length > 0);
    onSearch?.(query);
  }, [onSearch]);
  
  // 키보드 핸들러
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (!isOpen) {
          open();
        } else if (flatOptions.length > 0) {
          setHighlightedIndex(prev => 
            Math.min(prev + 1, flatOptions.length - 1)
          );
        }
        break;
        
      case 'ArrowUp':
        e.preventDefault();
        if (isOpen && flatOptions.length > 0) {
          setHighlightedIndex(prev => Math.max(prev - 1, 0));
        }
        break;
        
      case 'Enter':
        e.preventDefault();
        if (!isOpen) {
          open();
        } else if (highlightedIndex >= 0 && highlightedIndex < flatOptions.length) {
          selectOption(flatOptions[highlightedIndex]);
        }
        break;
        
      case 'Escape':
        if (isOpen) {
          e.preventDefault();
          e.stopPropagation();
          close();
        }
        break;
        
      case ' ':
        // 스페이스는 검색 중이 아닐 때만 처리
        if (!isSearching) {
          e.preventDefault();
          if (!isOpen) {
            open();
          } else if (highlightedIndex >= 0) {
            selectOption(flatOptions[highlightedIndex]);
          }
        }
        break;
        
      case 'Home':
        if (isOpen) {
          e.preventDefault();
          setHighlightedIndex(0);
        }
        break;
        
      case 'End':
        if (isOpen) {
          e.preventDefault();
          setHighlightedIndex(flatOptions.length - 1);
        }
        break;
        
      case 'Tab':
        if (isOpen) {
          close();
        }
        break;
    }
  }, [isOpen, open, close, flatOptions, highlightedIndex, selectOption, isSearching]);
  
  // ARIA 속성 생성
  const getAriaProps = useCallback(() => ({
    role: 'combobox' as const,
    'aria-expanded': isOpen,
    'aria-multiselectable': multiple,
    'aria-autocomplete': isSearching ? ('list' as const) : ('none' as const),
    'aria-activedescendant': highlightedIndex >= 0 ? `option-${highlightedIndex}` : undefined,
  }), [isOpen, multiple, isSearching, highlightedIndex]);
  
  // 하이라이트된 옵션이 화면에 보이도록 스크롤
  useEffect(() => {
    if (highlightedIndex >= 0 && optionRefs.current[highlightedIndex]) {
      const element = optionRefs.current[highlightedIndex];
      element?.scrollIntoView({
        block: 'nearest',
        behavior: 'smooth',
      });
    }
  }, [highlightedIndex]);
  
  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isOpen && 
          triggerRef.current &&
          menuRef.current &&
          !triggerRef.current.contains(e.target as Node) &&
          !menuRef.current.contains(e.target as Node)) {
        close();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, close]);
  
  // 검색 모드에서 첫 번째 옵션 하이라이트
  useEffect(() => {
    if (isSearching && filteredOptions.length > 0) {
      setHighlightedIndex(0);
    }
  }, [isSearching, filteredOptions.length]);
  
  return {
    isOpen,
    selectedValues,
    highlightedIndex,
    searchQuery,
    filteredOptions,
    toggle,
    open,
    close,
    selectOption,
    removeOption,
    clearAll,
    setSearchQuery: handleSetSearchQuery,
    handleKeyDown,
    getAriaProps,
  };
}

// 검색 전용 훅
export function useDropdownSearch<T>(
  options: (DropdownOption<T> | DropdownOptionGroup<T>)[],
  filterConfig?: FilterOptions
) {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredOptions = useMemo(() => {
    return filterOptions(options, searchQuery, filterConfig);
  }, [options, searchQuery, filterConfig]);
  
  const clearSearch = useCallback(() => {
    setSearchQuery('');
  }, []);
  
  return {
    searchQuery,
    setSearchQuery,
    filteredOptions,
    clearSearch,
    hasResults: filteredOptions.length > 0,
  };
}

// 키보드 네비게이션 전용 훅
export function useDropdownKeyboard<T>(
  options: DropdownOption<T>[],
  onSelect: (option: DropdownOption<T>) => void,
  isOpen: boolean = true
) {
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!isOpen || options.length === 0) return;
    
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev => 
          Math.min(prev + 1, options.length - 1)
        );
        break;
        
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => Math.max(prev - 1, 0));
        break;
        
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0) {
          onSelect(options[highlightedIndex]);
        }
        break;
        
      case 'Home':
        e.preventDefault();
        setHighlightedIndex(0);
        break;
        
      case 'End':
        e.preventDefault();
        setHighlightedIndex(options.length - 1);
        break;
    }
  }, [isOpen, options, highlightedIndex, onSelect]);
  
  // 옵션이 변경되면 하이라이트 초기화
  useEffect(() => {
    setHighlightedIndex(-1);
  }, [options]);
  
  return {
    highlightedIndex,
    setHighlightedIndex,
    handleKeyDown,
  };
}

export default useDropdown;