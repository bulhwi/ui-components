import { renderHook, act } from '@testing-library/react';
import { useDropdown, useDropdownSearch, useDropdownKeyboard } from '../useDropdown';
import { DropdownOption, DropdownOptionGroup } from '../types';

const basicOptions: DropdownOption<string>[] = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' },
];

const groupedOptions: DropdownOptionGroup<string>[] = [
  {
    label: 'Fruits',
    options: [
      { label: 'Apple', value: 'apple' },
      { label: 'Banana', value: 'banana' },
    ]
  },
  {
    label: 'Vegetables',
    options: [
      { label: 'Carrot', value: 'carrot' },
      { label: 'Broccoli', value: 'broccoli' },
    ]
  },
];

describe('useDropdown Hook', () => {
  describe('Basic Functionality', () => {
    it('초기 상태를 올바르게 설정한다', () => {
      const { result } = renderHook(() => 
        useDropdown({ options: basicOptions })
      );
      
      expect(result.current.isOpen).toBe(false);
      expect(result.current.selectedValues).toEqual([]);
      expect(result.current.highlightedIndex).toBe(-1);
      expect(result.current.searchQuery).toBe('');
      expect(result.current.filteredOptions).toEqual(basicOptions);
    });

    it('기본값으로 열림 상태를 설정할 수 있다', () => {
      const { result } = renderHook(() => 
        useDropdown({ 
          options: basicOptions,
          defaultOpen: true
        })
      );
      
      expect(result.current.isOpen).toBe(true);
    });

    it('단일 선택 모드에서 초기값을 설정할 수 있다', () => {
      const { result } = renderHook(() => 
        useDropdown({ 
          options: basicOptions,
          value: 'banana'
        })
      );
      
      expect(result.current.selectedValues).toEqual(['banana']);
    });

    it('다중 선택 모드에서 초기값들을 설정할 수 있다', () => {
      const { result } = renderHook(() => 
        useDropdown({ 
          options: basicOptions,
          multiple: true,
          values: ['apple', 'cherry']
        })
      );
      
      expect(result.current.selectedValues).toEqual(['apple', 'cherry']);
    });
  });

  describe('Open/Close Operations', () => {
    it('toggle 함수가 열림 상태를 토글한다', () => {
      const onOpenChange = jest.fn();
      const { result } = renderHook(() => 
        useDropdown({ 
          options: basicOptions,
          onOpenChange
        })
      );
      
      act(() => {
        result.current.toggle();
      });
      
      expect(result.current.isOpen).toBe(true);
      expect(onOpenChange).toHaveBeenCalledWith(true);
      
      act(() => {
        result.current.toggle();
      });
      
      expect(result.current.isOpen).toBe(false);
      expect(onOpenChange).toHaveBeenCalledWith(false);
    });

    it('open 함수가 드롭다운을 연다', () => {
      const onOpenChange = jest.fn();
      const { result } = renderHook(() => 
        useDropdown({ 
          options: basicOptions,
          onOpenChange
        })
      );
      
      act(() => {
        result.current.open();
      });
      
      expect(result.current.isOpen).toBe(true);
      expect(onOpenChange).toHaveBeenCalledWith(true);
    });

    it('close 함수가 드롭다운을 닫는다', () => {
      const onOpenChange = jest.fn();
      const { result } = renderHook(() => 
        useDropdown({ 
          options: basicOptions,
          defaultOpen: true,
          onOpenChange
        })
      );
      
      act(() => {
        result.current.close();
      });
      
      expect(result.current.isOpen).toBe(false);
      expect(onOpenChange).toHaveBeenCalledWith(false);
    });
  });

  describe('Option Selection', () => {
    it('단일 선택 모드에서 옵션을 선택한다', () => {
      const onChange = jest.fn();
      const { result } = renderHook(() => 
        useDropdown({ 
          options: basicOptions,
          onChange
        })
      );
      
      act(() => {
        result.current.selectOption(basicOptions[0]);
      });
      
      expect(onChange).toHaveBeenCalledWith('apple');
      expect(result.current.selectedValues).toEqual(['apple']);
    });

    it('다중 선택 모드에서 옵션을 선택한다', () => {
      const onMultiChange = jest.fn();
      const { result } = renderHook(() => 
        useDropdown({ 
          options: basicOptions,
          multiple: true,
          onMultiChange
        })
      );
      
      act(() => {
        result.current.selectOption(basicOptions[0]);
      });
      
      expect(onMultiChange).toHaveBeenCalledWith(['apple']);
      
      act(() => {
        result.current.selectOption(basicOptions[1]);
      });
      
      expect(onMultiChange).toHaveBeenCalledWith(['apple', 'banana']);
    });

    it('다중 선택 모드에서 이미 선택된 옵션을 다시 선택하면 제거한다', () => {
      const onMultiChange = jest.fn();
      const { result } = renderHook(() => 
        useDropdown({ 
          options: basicOptions,
          multiple: true,
          values: ['apple', 'banana'],
          onMultiChange
        })
      );
      
      act(() => {
        result.current.selectOption(basicOptions[0]); // Apple 제거
      });
      
      expect(onMultiChange).toHaveBeenCalledWith(['banana']);
    });

    it('비활성화된 옵션은 선택할 수 없다', () => {
      const onChange = jest.fn();
      const disabledOptions: DropdownOption<string>[] = [
        { label: 'Apple', value: 'apple', disabled: true },
        { label: 'Banana', value: 'banana' },
      ];
      
      const { result } = renderHook(() => 
        useDropdown({ 
          options: disabledOptions,
          onChange
        })
      );
      
      act(() => {
        result.current.selectOption(disabledOptions[0]);
      });
      
      expect(onChange).not.toHaveBeenCalled();
    });
  });

  describe('Option Management', () => {
    it('removeOption이 다중 선택에서 특정 옵션을 제거한다', () => {
      const onMultiChange = jest.fn();
      const { result } = renderHook(() => 
        useDropdown({ 
          options: basicOptions,
          multiple: true,
          values: ['apple', 'banana', 'cherry'],
          onMultiChange
        })
      );
      
      act(() => {
        result.current.removeOption('banana');
      });
      
      expect(onMultiChange).toHaveBeenCalledWith(['apple', 'cherry']);
    });

    it('clearAll이 모든 선택을 해제한다', () => {
      const onMultiChange = jest.fn();
      const { result } = renderHook(() => 
        useDropdown({ 
          options: basicOptions,
          multiple: true,
          values: ['apple', 'banana'],
          onMultiChange
        })
      );
      
      act(() => {
        result.current.clearAll();
      });
      
      expect(onMultiChange).toHaveBeenCalledWith([]);
    });

    it('단일 선택 모드에서 clearAll이 null을 설정한다', () => {
      const onChange = jest.fn();
      const { result } = renderHook(() => 
        useDropdown({ 
          options: basicOptions,
          value: 'apple',
          onChange
        })
      );
      
      act(() => {
        result.current.clearAll();
      });
      
      expect(onChange).toHaveBeenCalledWith(null);
    });
  });

  describe('Search Functionality', () => {
    it('검색어를 설정하면 옵션이 필터링된다', () => {
      const onSearch = jest.fn();
      const { result } = renderHook(() => 
        useDropdown({ 
          options: basicOptions,
          onSearch
        })
      );
      
      act(() => {
        result.current.setSearchQuery('ap');
      });
      
      expect(result.current.searchQuery).toBe('ap');
      expect(result.current.filteredOptions).toEqual([basicOptions[0]]);
      expect(onSearch).toHaveBeenCalledWith('ap');
    });

    it('그룹화된 옵션에서 검색이 작동한다', () => {
      const { result } = renderHook(() => 
        useDropdown({ 
          options: groupedOptions
        })
      );
      
      act(() => {
        result.current.setSearchQuery('carr');
      });
      
      expect(result.current.filteredOptions).toHaveLength(1);
      expect(result.current.filteredOptions[0]).toEqual({
        label: 'Vegetables',
        options: [{ label: 'Carrot', value: 'carrot' }]
      });
    });
  });

  describe('Keyboard Navigation', () => {
    it('ArrowDown 키가 드롭다운을 열고 하이라이트를 이동한다', () => {
      const { result } = renderHook(() => 
        useDropdown({ options: basicOptions })
      );
      
      const mockKeyEvent = {
        key: 'ArrowDown',
        preventDefault: jest.fn()
      } as any;
      
      // 드롭다운 열기
      act(() => {
        result.current.handleKeyDown(mockKeyEvent);
      });
      
      expect(result.current.isOpen).toBe(true);
      
      // 하이라이트 이동
      act(() => {
        result.current.handleKeyDown(mockKeyEvent);
      });
      
      expect(result.current.highlightedIndex).toBe(0);
    });

    it('Enter 키가 하이라이트된 옵션을 선택한다', () => {
      const onChange = jest.fn();
      const { result } = renderHook(() => 
        useDropdown({ 
          options: basicOptions,
          defaultOpen: true,
          onChange
        })
      );
      
      // 첫 번째 옵션 하이라이트
      const arrowEvent = {
        key: 'ArrowDown',
        preventDefault: jest.fn()
      } as any;
      
      act(() => {
        result.current.handleKeyDown(arrowEvent);
      });
      
      // Enter로 선택
      const enterEvent = {
        key: 'Enter',
        preventDefault: jest.fn()
      } as any;
      
      act(() => {
        result.current.handleKeyDown(enterEvent);
      });
      
      expect(onChange).toHaveBeenCalledWith('apple');
    });

    it('Escape 키가 드롭다운을 닫는다', () => {
      const { result } = renderHook(() => 
        useDropdown({ 
          options: basicOptions,
          defaultOpen: true
        })
      );
      
      const escapeEvent = {
        key: 'Escape',
        preventDefault: jest.fn(),
        stopPropagation: jest.fn()
      } as any;
      
      act(() => {
        result.current.handleKeyDown(escapeEvent);
      });
      
      expect(result.current.isOpen).toBe(false);
    });
  });

  describe('ARIA Properties', () => {
    it('올바른 ARIA 속성을 반환한다', () => {
      const { result } = renderHook(() => 
        useDropdown({ 
          options: basicOptions,
          multiple: true
        })
      );
      
      const ariaProps = result.current.getAriaProps();
      
      expect(ariaProps).toEqual({
        role: 'combobox',
        'aria-expanded': false,
        'aria-multiselectable': true,
        'aria-autocomplete': 'none',
        'aria-activedescendant': undefined,
      });
    });

    it('검색 모드에서 올바른 ARIA 속성을 반환한다', () => {
      const { result } = renderHook(() => 
        useDropdown({ options: basicOptions })
      );
      
      act(() => {
        result.current.setSearchQuery('test');
      });
      
      const ariaProps = result.current.getAriaProps();
      expect(ariaProps['aria-autocomplete']).toBe('list');
    });
  });
});

describe('useDropdownSearch Hook', () => {
  it('초기 상태를 올바르게 설정한다', () => {
    const { result } = renderHook(() => 
      useDropdownSearch(basicOptions)
    );
    
    expect(result.current.searchQuery).toBe('');
    expect(result.current.filteredOptions).toEqual(basicOptions);
    expect(result.current.hasResults).toBe(true);
  });

  it('검색어를 설정하면 옵션이 필터링된다', () => {
    const { result } = renderHook(() => 
      useDropdownSearch(basicOptions)
    );
    
    act(() => {
      result.current.setSearchQuery('ap');
    });
    
    expect(result.current.searchQuery).toBe('ap');
    expect(result.current.filteredOptions).toEqual([basicOptions[0]]);
    expect(result.current.hasResults).toBe(true);
  });

  it('검색 결과가 없을 때 hasResults가 false다', () => {
    const { result } = renderHook(() => 
      useDropdownSearch(basicOptions)
    );
    
    act(() => {
      result.current.setSearchQuery('xyz');
    });
    
    expect(result.current.filteredOptions).toEqual([]);
    expect(result.current.hasResults).toBe(false);
  });

  it('clearSearch가 검색을 초기화한다', () => {
    const { result } = renderHook(() => 
      useDropdownSearch(basicOptions)
    );
    
    act(() => {
      result.current.setSearchQuery('test');
    });
    
    expect(result.current.searchQuery).toBe('test');
    
    act(() => {
      result.current.clearSearch();
    });
    
    expect(result.current.searchQuery).toBe('');
  });
});

describe('useDropdownKeyboard Hook', () => {
  const mockOnSelect = jest.fn();
  
  beforeEach(() => {
    mockOnSelect.mockClear();
  });

  it('초기 상태를 올바르게 설정한다', () => {
    const { result } = renderHook(() => 
      useDropdownKeyboard(basicOptions, mockOnSelect)
    );
    
    expect(result.current.highlightedIndex).toBe(-1);
  });

  it('ArrowDown 키가 하이라이트 인덱스를 증가시킨다', () => {
    const { result } = renderHook(() => 
      useDropdownKeyboard(basicOptions, mockOnSelect)
    );
    
    const keyEvent = {
      key: 'ArrowDown',
      preventDefault: jest.fn()
    } as any;
    
    act(() => {
      result.current.handleKeyDown(keyEvent);
    });
    
    expect(result.current.highlightedIndex).toBe(0);
    
    act(() => {
      result.current.handleKeyDown(keyEvent);
    });
    
    expect(result.current.highlightedIndex).toBe(1);
  });

  it('ArrowUp 키가 하이라이트 인덱스를 감소시킨다', () => {
    const { result } = renderHook(() => 
      useDropdownKeyboard(basicOptions, mockOnSelect)
    );
    
    // 먼저 인덱스를 1로 설정
    act(() => {
      result.current.setHighlightedIndex(1);
    });
    
    const keyEvent = {
      key: 'ArrowUp',
      preventDefault: jest.fn()
    } as any;
    
    act(() => {
      result.current.handleKeyDown(keyEvent);
    });
    
    expect(result.current.highlightedIndex).toBe(0);
  });

  it('Enter 키가 하이라이트된 옵션을 선택한다', () => {
    const { result } = renderHook(() => 
      useDropdownKeyboard(basicOptions, mockOnSelect)
    );
    
    // 첫 번째 옵션 하이라이트
    act(() => {
      result.current.setHighlightedIndex(0);
    });
    
    const keyEvent = {
      key: 'Enter',
      preventDefault: jest.fn()
    } as any;
    
    act(() => {
      result.current.handleKeyDown(keyEvent);
    });
    
    expect(mockOnSelect).toHaveBeenCalledWith(basicOptions[0]);
  });

  it('Home 키가 첫 번째 옵션으로 이동한다', () => {
    const { result } = renderHook(() => 
      useDropdownKeyboard(basicOptions, mockOnSelect)
    );
    
    // 마지막 옵션으로 설정
    act(() => {
      result.current.setHighlightedIndex(2);
    });
    
    const keyEvent = {
      key: 'Home',
      preventDefault: jest.fn()
    } as any;
    
    act(() => {
      result.current.handleKeyDown(keyEvent);
    });
    
    expect(result.current.highlightedIndex).toBe(0);
  });

  it('End 키가 마지막 옵션으로 이동한다', () => {
    const { result } = renderHook(() => 
      useDropdownKeyboard(basicOptions, mockOnSelect)
    );
    
    const keyEvent = {
      key: 'End',
      preventDefault: jest.fn()
    } as any;
    
    act(() => {
      result.current.handleKeyDown(keyEvent);
    });
    
    expect(result.current.highlightedIndex).toBe(2);
  });

  it('드롭다운이 닫혀있을 때는 키보드 이벤트를 처리하지 않는다', () => {
    const { result } = renderHook(() => 
      useDropdownKeyboard(basicOptions, mockOnSelect, false) // isOpen = false
    );
    
    const keyEvent = {
      key: 'ArrowDown',
      preventDefault: jest.fn()
    } as any;
    
    act(() => {
      result.current.handleKeyDown(keyEvent);
    });
    
    expect(result.current.highlightedIndex).toBe(-1);
    expect(keyEvent.preventDefault).not.toHaveBeenCalled();
  });
});