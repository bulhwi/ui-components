import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { DropdownProps, DropdownOption, DropdownOptionGroup } from './types';
import { LoadingSpinner } from '../LoadingSpinner';
import {
  DropdownContainer,
  DropdownTrigger,
  TriggerContent,
  TriggerText,
  TagsContainer,
  Tag,
  TagRemoveButton,
  MoreTag,
  ArrowContainer,
  LoadingContainer,
  DropdownPortal,
  DropdownMenu,
  SearchContainer,
  SearchInput,
  OptionsContainer,
  OptionGroup,
  GroupHeader,
  OptionItem,
  OptionIcon,
  OptionContent,
  OptionLabel,
  OptionDescription,
  Checkbox,
  EmptyState,
  LoadingState,
} from './styles';
import { ChevronDownIcon, CheckIcon, XIcon, SearchIcon } from './icons';

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

// 검색 필터링 함수
function filterOptions<T>(
  options: (DropdownOption<T> | DropdownOptionGroup<T>)[], 
  searchQuery: string
): (DropdownOption<T> | DropdownOptionGroup<T>)[] {
  if (!searchQuery) return options;
  
  const query = searchQuery.toLowerCase();
  
  return options.reduce<(DropdownOption<T> | DropdownOptionGroup<T>)[]>((acc, item) => {
    if (isOptionGroup(item)) {
      const filteredGroupOptions = item.options.filter(option =>
        option.label.toLowerCase().includes(query) ||
        (option.description && option.description.toLowerCase().includes(query))
      );
      
      if (filteredGroupOptions.length > 0) {
        acc.push({ ...item, options: filteredGroupOptions });
      }
    } else {
      if (item.label.toLowerCase().includes(query) ||
          (item.description && item.description.toLowerCase().includes(query))) {
        acc.push(item);
      }
    }
    
    return acc;
  }, []);
}

export const Dropdown = <T,>({
  options,
  value,
  values,
  multiple = false,
  onChange,
  onMultiChange,
  placeholder = '선택하세요',
  disabled = false,
  loading = false,
  error = false,
  size = 'medium',
  fullWidth = false,
  position = 'bottom-start',
  searchable = false,
  searchPlaceholder = '검색...',
  closeOnSelect = true,
  noOptionsText = '옵션이 없습니다',
  maxHeight = 300,
  virtualized = false,
  itemHeight = 40,
  renderOption,
  renderValue,
  renderValues,
  showTags = true,
  maxTags = 3,
  open,
  defaultOpen = false,
  onOpenChange,
  onSearch,
  onFocus,
  onBlur,
  className,
  style,
  'data-testid': testId,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
}: DropdownProps<T>) => {
  // State
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [searchQuery, setSearchQuery] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [triggerRect, setTriggerRect] = useState<DOMRect | null>(null);
  
  // Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const optionRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  // Controlled state
  const controlled = open !== undefined;
  const actualIsOpen = controlled ? open! : isOpen;
  
  // 현재 선택된 값들
  const selectedValues = useMemo(() => {
    if (multiple) {
      return values || [];
    }
    return value !== undefined && value !== null ? [value] : [];
  }, [multiple, values, value]);
  
  // 필터링된 옵션들
  const filteredOptions = useMemo(() => {
    return filterOptions(options, searchQuery);
  }, [options, searchQuery]);
  
  // 평탄화된 옵션들 (키보드 네비게이션용)
  const flatOptions = useMemo(() => {
    return flattenOptions(filteredOptions);
  }, [filteredOptions]);
  
  // 선택된 옵션들 찾기
  const selectedOptions = useMemo(() => {
    const allOptions = flattenOptions(options);
    return selectedValues
      .map(val => allOptions.find(opt => opt.value === val))
      .filter((opt): opt is DropdownOption<T> => opt !== undefined);
  }, [selectedValues, options]);
  
  // 표시 텍스트 생성
  const displayText = useMemo(() => {
    if (selectedOptions.length === 0) return '';
    
    if (multiple) {
      if (renderValues) {
        return renderValues(selectedValues, selectedOptions);
      }
      if (showTags) return ''; // 태그로 표시
      return `${selectedOptions.length}개 선택됨`;
    }
    
    const selectedOption = selectedOptions[0];
    if (renderValue) {
      return renderValue(selectedOption.value, selectedOption);
    }
    
    return selectedOption.label;
  }, [selectedOptions, selectedValues, multiple, renderValue, renderValues, showTags]);
  
  // 드롭다운 열기/닫기
  const toggleDropdown = useCallback(() => {
    if (disabled) return;
    
    const newOpen = !actualIsOpen;
    
    if (!controlled) {
      setIsOpen(newOpen);
    }
    
    onOpenChange?.(newOpen);
    
    if (newOpen && triggerRef.current) {
      setTriggerRect(triggerRef.current.getBoundingClientRect());
      setHighlightedIndex(-1);
      setSearchQuery('');
    }
  }, [actualIsOpen, controlled, disabled, onOpenChange]);
  
  // 드롭다운 닫기
  const closeDropdown = useCallback(() => {
    if (!controlled) {
      setIsOpen(false);
    }
    onOpenChange?.(false);
    setSearchQuery('');
    setHighlightedIndex(-1);
  }, [controlled, onOpenChange]);
  
  // 옵션 선택 핸들러
  const handleOptionSelect = useCallback((option: DropdownOption<T>) => {
    if (option.disabled) return;
    
    if (multiple) {
      const newValues = selectedValues.includes(option.value)
        ? selectedValues.filter(v => v !== option.value)
        : [...selectedValues, option.value];
      
      onMultiChange?.(newValues);
      
      if (!closeOnSelect) return;
    } else {
      onChange?.(option.value);
    }
    
    if (closeOnSelect) {
      closeDropdown();
    }
  }, [multiple, selectedValues, onMultiChange, onChange, closeOnSelect, closeDropdown]);
  
  // 태그 제거 핸들러
  const handleTagRemove = useCallback((valueToRemove: T) => {
    if (disabled) return;
    
    const newValues = selectedValues.filter(v => v !== valueToRemove);
    onMultiChange?.(newValues);
  }, [selectedValues, onMultiChange, disabled]);
  
  // 모든 태그 제거
  const handleClearAll = useCallback(() => {
    if (disabled) return;
    
    if (multiple) {
      onMultiChange?.([]);
    } else {
      onChange?.(null);
    }
  }, [multiple, onMultiChange, onChange, disabled]);
  
  // 검색어 변경 핸들러
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    setHighlightedIndex(-1);
    onSearch?.(query);
  }, [onSearch]);
  
  // 키보드 네비게이션
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (disabled) return;
    
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (!actualIsOpen) {
          toggleDropdown();
        } else {
          setHighlightedIndex(prev => 
            prev < flatOptions.length - 1 ? prev + 1 : prev
          );
        }
        break;
        
      case 'ArrowUp':
        e.preventDefault();
        if (actualIsOpen) {
          setHighlightedIndex(prev => prev > 0 ? prev - 1 : 0);
        }
        break;
        
      case 'Enter':
        e.preventDefault();
        if (!actualIsOpen) {
          toggleDropdown();
        } else if (highlightedIndex >= 0 && highlightedIndex < flatOptions.length) {
          handleOptionSelect(flatOptions[highlightedIndex]);
        }
        break;
        
      case 'Escape':
        if (actualIsOpen) {
          e.preventDefault();
          closeDropdown();
          triggerRef.current?.focus();
        }
        break;
        
      case ' ':
        if (!searchable) {
          e.preventDefault();
          if (!actualIsOpen) {
            toggleDropdown();
          } else if (highlightedIndex >= 0) {
            handleOptionSelect(flatOptions[highlightedIndex]);
          }
        }
        break;
    }
  }, [actualIsOpen, toggleDropdown, closeDropdown, highlightedIndex, flatOptions, handleOptionSelect, disabled, searchable]);
  
  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (actualIsOpen && 
          containerRef.current && 
          !containerRef.current.contains(e.target as Node) &&
          menuRef.current &&
          !menuRef.current.contains(e.target as Node)) {
        closeDropdown();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [actualIsOpen, closeDropdown]);
  
  // 검색 인풋에 포커스
  useEffect(() => {
    if (actualIsOpen && searchable && searchInputRef.current) {
      const timer = setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [actualIsOpen, searchable]);
  
  // 하이라이트된 옵션 스크롤
  useEffect(() => {
    if (highlightedIndex >= 0 && optionRefs.current[highlightedIndex]) {
      optionRefs.current[highlightedIndex]?.scrollIntoView({
        block: 'nearest'
      });
    }
  }, [highlightedIndex]);
  
  // 태그 렌더링
  const renderTags = () => {
    if (!multiple || !showTags || selectedOptions.length === 0) return null;
    
    const displayTags = selectedOptions.slice(0, maxTags);
    const remainingCount = selectedOptions.length - maxTags;
    
    return (
      <TagsContainer>
        {displayTags.map((option, index) => (
          <Tag key={`${option.value}`} $size={size}>
            <span>{option.label}</span>
            <TagRemoveButton
              onClick={(e) => {
                e.stopPropagation();
                handleTagRemove(option.value);
              }}
              disabled={disabled}
              type="button"
            >
              <XIcon />
            </TagRemoveButton>
          </Tag>
        ))}
        {remainingCount > 0 && (
          <MoreTag $size={size}>
            +{remainingCount}
          </MoreTag>
        )}
      </TagsContainer>
    );
  };
  
  // 옵션 렌더링
  const renderOptionContent = (option: DropdownOption<T>, isSelected: boolean) => {
    if (renderOption) {
      return renderOption(option, isSelected);
    }
    
    return (
      <>
        {multiple && (
          <Checkbox $checked={isSelected}>
            {isSelected && <CheckIcon />}
          </Checkbox>
        )}
        {option.icon && (
          <OptionIcon>{option.icon}</OptionIcon>
        )}
        <OptionContent>
          <OptionLabel>{option.label}</OptionLabel>
          {option.description && (
            <OptionDescription>{option.description}</OptionDescription>
          )}
        </OptionContent>
      </>
    );
  };
  
  // 옵션 리스트 렌더링
  const renderOptions = () => {
    if (loading) {
      return (
        <LoadingState>
          <LoadingSpinner size="small" />
          로딩 중...
        </LoadingState>
      );
    }
    
    if (filteredOptions.length === 0) {
      return <EmptyState>{noOptionsText}</EmptyState>;
    }
    
    let optionIndex = 0;
    
    return filteredOptions.map((item, groupIndex) => {
      if (isOptionGroup(item)) {
        const groupStartIndex = optionIndex;
        
        return (
          <OptionGroup key={`group-${groupIndex}`}>
            <GroupHeader $disabled={item.disabled}>
              {item.label}
            </GroupHeader>
            {item.options.map((option, index) => {
              const currentIndex = optionIndex++;
              const isSelected = selectedValues.includes(option.value);
              const isHighlighted = highlightedIndex === currentIndex;
              
              return (
                <OptionItem
                  key={`${groupIndex}-${index}`}
                  ref={el => optionRefs.current[currentIndex] = el}
                  $isSelected={isSelected}
                  $isHighlighted={isHighlighted}
                  $disabled={option.disabled || item.disabled}
                  $height={virtualized ? itemHeight : undefined}
                  onClick={() => handleOptionSelect(option)}
                  data-disabled={option.disabled || item.disabled}
                >
                  {renderOptionContent(option, isSelected)}
                </OptionItem>
              );
            })}
          </OptionGroup>
        );
      } else {
        const currentIndex = optionIndex++;
        const isSelected = selectedValues.includes(item.value);
        const isHighlighted = highlightedIndex === currentIndex;
        
        return (
          <OptionItem
            key={currentIndex}
            ref={el => optionRefs.current[currentIndex] = el}
            $isSelected={isSelected}
            $isHighlighted={isHighlighted}
            $disabled={item.disabled}
            $height={virtualized ? itemHeight : undefined}
            onClick={() => handleOptionSelect(item)}
            data-disabled={item.disabled}
          >
            {renderOptionContent(item, isSelected)}
          </OptionItem>
        );
      }
    });
  };
  
  return (
    <DropdownContainer
      ref={containerRef}
      $fullWidth={fullWidth}
      className={className}
      style={style}
      data-testid={testId}
    >
      <DropdownTrigger
        ref={triggerRef}
        $size={size}
        $isOpen={actualIsOpen}
        $error={error}
        $fullWidth={fullWidth}
        $disabled={disabled}
        disabled={disabled}
        onClick={toggleDropdown}
        onKeyDown={handleKeyDown}
        onFocus={onFocus}
        onBlur={onBlur}
        type="button"
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedBy}
        aria-expanded={actualIsOpen}
        aria-haspopup="listbox"
        aria-multiselectable={multiple}
      >
        <TriggerContent>
          {multiple && showTags ? (
            renderTags()
          ) : (
            <TriggerText $hasValue={selectedOptions.length > 0}>
              {displayText || placeholder}
            </TriggerText>
          )}
        </TriggerContent>
        
        {loading ? (
          <LoadingContainer>
            <LoadingSpinner size="small" />
          </LoadingContainer>
        ) : (
          <ArrowContainer $isOpen={actualIsOpen} $disabled={disabled}>
            <ChevronDownIcon />
          </ArrowContainer>
        )}
      </DropdownTrigger>
      
      {actualIsOpen && triggerRect && createPortal(
        <DropdownPortal $position={position}>
          <DropdownMenu
            ref={menuRef}
            $maxHeight={maxHeight}
            $position={position}
            style={{
              width: triggerRect.width,
              ...(() => {
                const spaceBelow = window.innerHeight - triggerRect.bottom;
                const spaceAbove = triggerRect.top;
                
                if (position === 'auto') {
                  if (spaceBelow < maxHeight && spaceAbove > spaceBelow) {
                    return {
                      position: 'fixed' as const,
                      top: triggerRect.top - maxHeight - 4,
                      left: triggerRect.left,
                    };
                  }
                }
                
                return {
                  position: 'fixed' as const,
                  top: triggerRect.bottom + 4,
                  left: triggerRect.left,
                };
              })(),
            }}
          >
            {searchable && (
              <SearchContainer>
                <SearchInput
                  ref={searchInputRef}
                  type="text"
                  placeholder={searchPlaceholder}
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </SearchContainer>
            )}
            <OptionsContainer $maxHeight={maxHeight - (searchable ? 60 : 0)}>
              {renderOptions()}
            </OptionsContainer>
          </DropdownMenu>
        </DropdownPortal>,
        document.body
      )}
    </DropdownContainer>
  );
};

export default Dropdown;