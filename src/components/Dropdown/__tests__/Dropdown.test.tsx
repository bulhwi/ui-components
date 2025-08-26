import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from '../../../styles/theme';
import { Dropdown, DropdownOption, DropdownOptionGroup } from '../index';

// Mock Portal
jest.mock('react-dom', () => {
  const originalModule = jest.requireActual('react-dom');
  return {
    ...originalModule,
    createPortal: (children: React.ReactNode) => children,
  };
});

const renderWithTheme = (ui: React.ReactElement) => {
  return render(
    <ThemeProvider theme={lightTheme}>
      {ui}
    </ThemeProvider>
  );
};

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

describe('Dropdown Component', () => {
  beforeEach(() => {
    // Portal 컨테이너 생성
    const portalRoot = document.createElement('div');
    portalRoot.setAttribute('id', 'portal');
    document.body.appendChild(portalRoot);
  });

  afterEach(() => {
    // Portal 컨테이너 정리
    const portalRoot = document.getElementById('portal');
    if (portalRoot) {
      document.body.removeChild(portalRoot);
    }
  });

  describe('Basic Functionality', () => {
    it('기본 드롭다운을 렌더링한다', () => {
      renderWithTheme(
        <Dropdown options={basicOptions} placeholder="Select option" />
      );
      
      expect(screen.getByRole('combobox')).toBeInTheDocument();
      expect(screen.getByText('Select option')).toBeInTheDocument();
    });

    it('클릭하면 드롭다운이 열린다', async () => {
      renderWithTheme(
        <Dropdown options={basicOptions} placeholder="Select option" />
      );
      
      const trigger = screen.getByRole('combobox');
      fireEvent.click(trigger);
      
      await waitFor(() => {
        expect(screen.getByRole('listbox')).toBeInTheDocument();
        basicOptions.forEach(option => {
          expect(screen.getByText(option.label)).toBeInTheDocument();
        });
      });
    });

    it('옵션을 선택할 수 있다', async () => {
      const handleChange = jest.fn();
      renderWithTheme(
        <Dropdown 
          options={basicOptions} 
          onChange={handleChange}
          placeholder="Select option" 
        />
      );
      
      const trigger = screen.getByRole('combobox');
      fireEvent.click(trigger);
      
      await waitFor(() => {
        expect(screen.getByText('Apple')).toBeInTheDocument();
      });
      
      fireEvent.click(screen.getByText('Apple'));
      
      expect(handleChange).toHaveBeenCalledWith('apple');
    });

    it('선택된 값이 표시된다', () => {
      renderWithTheme(
        <Dropdown 
          options={basicOptions} 
          value="banana"
          placeholder="Select option" 
        />
      );
      
      expect(screen.getByText('Banana')).toBeInTheDocument();
    });
  });

  describe('Keyboard Navigation', () => {
    it('ArrowDown으로 드롭다운이 열린다', async () => {
      renderWithTheme(
        <Dropdown options={basicOptions} placeholder="Select option" />
      );
      
      const trigger = screen.getByRole('combobox');
      trigger.focus();
      fireEvent.keyDown(trigger, { key: 'ArrowDown' });
      
      await waitFor(() => {
        expect(screen.getByRole('listbox')).toBeInTheDocument();
      });
    });

    it('Enter로 옵션을 선택할 수 있다', async () => {
      const handleChange = jest.fn();
      renderWithTheme(
        <Dropdown 
          options={basicOptions} 
          onChange={handleChange}
          placeholder="Select option" 
        />
      );
      
      const trigger = screen.getByRole('combobox');
      trigger.focus();
      
      // 드롭다운 열기
      fireEvent.keyDown(trigger, { key: 'ArrowDown' });
      
      await waitFor(() => {
        expect(screen.getByRole('listbox')).toBeInTheDocument();
      });
      
      // 다음 옵션으로 이동
      fireEvent.keyDown(trigger, { key: 'ArrowDown' });
      
      // 선택
      fireEvent.keyDown(trigger, { key: 'Enter' });
      
      expect(handleChange).toHaveBeenCalledWith('apple');
    });

    it('Escape로 드롭다운을 닫을 수 있다', async () => {
      renderWithTheme(
        <Dropdown options={basicOptions} placeholder="Select option" />
      );
      
      const trigger = screen.getByRole('combobox');
      trigger.focus();
      fireEvent.keyDown(trigger, { key: 'ArrowDown' });
      
      await waitFor(() => {
        expect(screen.getByRole('listbox')).toBeInTheDocument();
      });
      
      fireEvent.keyDown(trigger, { key: 'Escape' });
      
      await waitFor(() => {
        expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
      });
    });
  });

  describe('Multi-select Functionality', () => {
    it('다중 선택 모드에서 여러 옵션을 선택할 수 있다', async () => {
      const handleChange = jest.fn();
      renderWithTheme(
        <Dropdown 
          options={basicOptions}
          multiple
          onMultiChange={handleChange}
          closeOnSelect={false}
          placeholder="Select options" 
        />
      );
      
      const trigger = screen.getByRole('combobox');
      fireEvent.click(trigger);
      
      await waitFor(() => {
        expect(screen.getByRole('listbox')).toBeInTheDocument();
      });
      
      // 첫 번째 옵션 선택
      fireEvent.click(screen.getByText('Apple'));
      expect(handleChange).toHaveBeenCalledWith(['apple']);
      
      // 두 번째 옵션 선택
      fireEvent.click(screen.getByText('Banana'));
      expect(handleChange).toHaveBeenCalledWith(['apple', 'banana']);
    });

    it('태그 형태로 선택된 값들을 표시한다', () => {
      renderWithTheme(
        <Dropdown 
          options={basicOptions}
          multiple
          values={['apple', 'banana']}
          showTags
          placeholder="Select options" 
        />
      );
      
      expect(screen.getByText('Apple')).toBeInTheDocument();
      expect(screen.getByText('Banana')).toBeInTheDocument();
    });

    it('태그의 X 버튼으로 개별 선택을 해제할 수 있다', () => {
      const handleChange = jest.fn();
      renderWithTheme(
        <Dropdown 
          options={basicOptions}
          multiple
          values={['apple', 'banana']}
          onMultiChange={handleChange}
          showTags
          placeholder="Select options" 
        />
      );
      
      const removeButtons = screen.getAllByRole('button', { name: '' });
      fireEvent.click(removeButtons[0]); // Apple 제거
      
      expect(handleChange).toHaveBeenCalledWith(['banana']);
    });
  });

  describe('Search Functionality', () => {
    it('검색 입력을 표시한다', async () => {
      renderWithTheme(
        <Dropdown 
          options={basicOptions}
          searchable
          searchPlaceholder="Search fruits..."
          placeholder="Select option" 
        />
      );
      
      const trigger = screen.getByRole('combobox');
      fireEvent.click(trigger);
      
      await waitFor(() => {
        expect(screen.getByPlaceholderText('Search fruits...')).toBeInTheDocument();
      });
    });

    it('검색어에 따라 옵션을 필터링한다', async () => {
      const user = userEvent.setup();
      renderWithTheme(
        <Dropdown 
          options={basicOptions}
          searchable
          placeholder="Select option" 
        />
      );
      
      const trigger = screen.getByRole('combobox');
      fireEvent.click(trigger);
      
      const searchInput = await screen.findByRole('textbox');
      await user.type(searchInput, 'ap');
      
      await waitFor(() => {
        expect(screen.getByText('Apple')).toBeInTheDocument();
        expect(screen.queryByText('Banana')).not.toBeInTheDocument();
        expect(screen.queryByText('Cherry')).not.toBeInTheDocument();
      });
    });
  });

  describe('Grouped Options', () => {
    it('그룹화된 옵션들을 렌더링한다', async () => {
      renderWithTheme(
        <Dropdown options={groupedOptions} placeholder="Select option" />
      );
      
      const trigger = screen.getByRole('combobox');
      fireEvent.click(trigger);
      
      await waitFor(() => {
        expect(screen.getByText('Fruits')).toBeInTheDocument();
        expect(screen.getByText('Vegetables')).toBeInTheDocument();
        expect(screen.getByText('Apple')).toBeInTheDocument();
        expect(screen.getByText('Carrot')).toBeInTheDocument();
      });
    });

    it('그룹 내의 옵션을 선택할 수 있다', async () => {
      const handleChange = jest.fn();
      renderWithTheme(
        <Dropdown 
          options={groupedOptions}
          onChange={handleChange}
          placeholder="Select option" 
        />
      );
      
      const trigger = screen.getByRole('combobox');
      fireEvent.click(trigger);
      
      await waitFor(() => {
        expect(screen.getByText('Apple')).toBeInTheDocument();
      });
      
      fireEvent.click(screen.getByText('Apple'));
      expect(handleChange).toHaveBeenCalledWith('apple');
    });
  });

  describe('States', () => {
    it('로딩 상태를 표시한다', async () => {
      renderWithTheme(
        <Dropdown options={[]} loading placeholder="Loading..." />
      );
      
      const trigger = screen.getByRole('combobox');
      fireEvent.click(trigger);
      
      await waitFor(() => {
        expect(screen.getByText('로딩 중...')).toBeInTheDocument();
      });
    });

    it('에러 상태를 표시한다', () => {
      renderWithTheme(
        <Dropdown options={basicOptions} error placeholder="Error state" />
      );
      
      const trigger = screen.getByRole('combobox');
      expect(trigger).toHaveStyle('border-color: ' + lightTheme.colors.error);
    });

    it('비활성화 상태에서는 클릭할 수 없다', () => {
      renderWithTheme(
        <Dropdown options={basicOptions} disabled placeholder="Disabled" />
      );
      
      const trigger = screen.getByRole('combobox');
      expect(trigger).toBeDisabled();
      
      fireEvent.click(trigger);
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });

    it('옵션이 없을 때 메시지를 표시한다', async () => {
      renderWithTheme(
        <Dropdown 
          options={[]} 
          noOptionsText="No options available"
          placeholder="No options" 
        />
      );
      
      const trigger = screen.getByRole('combobox');
      fireEvent.click(trigger);
      
      await waitFor(() => {
        expect(screen.getByText('No options available')).toBeInTheDocument();
      });
    });
  });

  describe('Accessibility', () => {
    it('올바른 ARIA 속성을 가진다', () => {
      renderWithTheme(
        <Dropdown 
          options={basicOptions}
          placeholder="Select option"
          aria-label="Test dropdown" 
        />
      );
      
      const trigger = screen.getByRole('combobox');
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
      expect(trigger).toHaveAttribute('aria-haspopup', 'listbox');
      expect(trigger).toHaveAttribute('aria-label', 'Test dropdown');
    });

    it('다중 선택에서 올바른 ARIA 속성을 가진다', () => {
      renderWithTheme(
        <Dropdown 
          options={basicOptions}
          multiple
          placeholder="Select options" 
        />
      );
      
      const trigger = screen.getByRole('combobox');
      expect(trigger).toHaveAttribute('aria-multiselectable', 'true');
    });

    it('검색 모드에서 올바른 ARIA 속성을 가진다', async () => {
      renderWithTheme(
        <Dropdown 
          options={basicOptions}
          searchable
          placeholder="Select option" 
        />
      );
      
      const trigger = screen.getByRole('combobox');
      fireEvent.click(trigger);
      
      const searchInput = await screen.findByRole('textbox');
      fireEvent.change(searchInput, { target: { value: 'ap' } });
      
      expect(trigger).toHaveAttribute('aria-autocomplete', 'list');
    });
  });

  describe('Custom Rendering', () => {
    it('커스텀 옵션 렌더링을 사용할 수 있다', async () => {
      const renderOption = (option: DropdownOption<string>, isSelected: boolean) => (
        <div data-testid={`custom-${option.value}`}>
          Custom: {option.label} {isSelected ? '✓' : ''}
        </div>
      );
      
      renderWithTheme(
        <Dropdown 
          options={basicOptions}
          renderOption={renderOption}
          value="apple"
          placeholder="Select option" 
        />
      );
      
      const trigger = screen.getByRole('combobox');
      fireEvent.click(trigger);
      
      await waitFor(() => {
        expect(screen.getByTestId('custom-apple')).toBeInTheDocument();
        expect(screen.getByText('Custom: Apple ✓')).toBeInTheDocument();
      });
    });

    it('커스텀 값 렌더링을 사용할 수 있다', () => {
      const renderValue = (value: string | null, option: DropdownOption<string> | null) => (
        <span data-testid="custom-value">
          Selected: {option?.label || 'None'}
        </span>
      );
      
      renderWithTheme(
        <Dropdown 
          options={basicOptions}
          renderValue={renderValue}
          value="banana"
          placeholder="Select option" 
        />
      );
      
      expect(screen.getByTestId('custom-value')).toBeInTheDocument();
      expect(screen.getByText('Selected: Banana')).toBeInTheDocument();
    });
  });

  describe('Event Handlers', () => {
    it('onOpenChange 콜백을 호출한다', () => {
      const handleOpenChange = jest.fn();
      renderWithTheme(
        <Dropdown 
          options={basicOptions}
          onOpenChange={handleOpenChange}
          placeholder="Select option" 
        />
      );
      
      const trigger = screen.getByRole('combobox');
      fireEvent.click(trigger);
      
      expect(handleOpenChange).toHaveBeenCalledWith(true);
    });

    it('onSearch 콜백을 호출한다', async () => {
      const handleSearch = jest.fn();
      const user = userEvent.setup();
      
      renderWithTheme(
        <Dropdown 
          options={basicOptions}
          searchable
          onSearch={handleSearch}
          placeholder="Select option" 
        />
      );
      
      const trigger = screen.getByRole('combobox');
      fireEvent.click(trigger);
      
      const searchInput = await screen.findByRole('textbox');
      await user.type(searchInput, 'test');
      
      expect(handleSearch).toHaveBeenCalledWith('test');
    });

    it('onFocus와 onBlur 콜백을 호출한다', () => {
      const handleFocus = jest.fn();
      const handleBlur = jest.fn();
      
      renderWithTheme(
        <Dropdown 
          options={basicOptions}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="Select option" 
        />
      );
      
      const trigger = screen.getByRole('combobox');
      
      fireEvent.focus(trigger);
      expect(handleFocus).toHaveBeenCalled();
      
      fireEvent.blur(trigger);
      expect(handleBlur).toHaveBeenCalled();
    });
  });

  describe('Edge Cases', () => {
    it('빈 옵션 배열을 처리한다', () => {
      renderWithTheme(
        <Dropdown options={[]} placeholder="No options" />
      );
      
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('undefined 값을 처리한다', () => {
      renderWithTheme(
        <Dropdown 
          options={basicOptions}
          value={undefined}
          placeholder="Select option" 
        />
      );
      
      expect(screen.getByText('Select option')).toBeInTheDocument();
    });

    it('null 값을 처리한다', () => {
      const handleChange = jest.fn();
      renderWithTheme(
        <Dropdown 
          options={basicOptions}
          value={null as any}
          onChange={handleChange}
          placeholder="Select option" 
        />
      );
      
      expect(screen.getByText('Select option')).toBeInTheDocument();
    });

    it('maxTags보다 많은 선택이 있을 때 +N을 표시한다', () => {
      renderWithTheme(
        <Dropdown 
          options={basicOptions}
          multiple
          values={['apple', 'banana', 'cherry']}
          showTags
          maxTags={2}
          placeholder="Select options" 
        />
      );
      
      expect(screen.getByText('Apple')).toBeInTheDocument();
      expect(screen.getByText('Banana')).toBeInTheDocument();
      expect(screen.getByText('+1')).toBeInTheDocument();
    });
  });
});