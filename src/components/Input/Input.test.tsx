import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from '../../styles/theme';
import { Input } from './Input';

const MockThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider theme={lightTheme}>{children}</ThemeProvider>
);

const TestIcon = () => <span data-testid="test-icon">🔍</span>;

describe('Input', () => {
  const defaultProps = {
    placeholder: 'Test placeholder',
  };

  const renderWithTheme = (ui: React.ReactElement) => {
    return render(ui, { wrapper: MockThemeProvider });
  };

  describe('기본 렌더링', () => {
    it('기본적으로 렌더링된다', () => {
      renderWithTheme(<Input {...defaultProps} />);
      expect(screen.getByPlaceholderText('Test placeholder')).toBeInTheDocument();
    });

    it('라벨이 올바르게 표시된다', () => {
      renderWithTheme(<Input {...defaultProps} label="Test Label" />);
      expect(screen.getByText('Test Label')).toBeInTheDocument();
    });

    it('필수 마크가 표시된다', () => {
      renderWithTheme(<Input {...defaultProps} label="Test Label" required />);
      expect(screen.getByText('*')).toBeInTheDocument();
    });

    it('도움말 텍스트가 표시된다', () => {
      renderWithTheme(<Input {...defaultProps} helperText="Helper text" />);
      expect(screen.getByText('Helper text')).toBeInTheDocument();
    });
  });

  describe('변형(Variants)', () => {
    it('default 변형이 적용된다', () => {
      renderWithTheme(<Input {...defaultProps} variant="default" />);
      expect(screen.getByPlaceholderText('Test placeholder')).toBeInTheDocument();
    });

    it('filled 변형이 적용된다', () => {
      renderWithTheme(<Input {...defaultProps} variant="filled" />);
      expect(screen.getByPlaceholderText('Test placeholder')).toBeInTheDocument();
    });

    it('outlined 변형이 적용된다', () => {
      renderWithTheme(<Input {...defaultProps} variant="outlined" />);
      expect(screen.getByPlaceholderText('Test placeholder')).toBeInTheDocument();
    });
  });

  describe('크기(Sizes)', () => {
    it('small 크기가 적용된다', () => {
      renderWithTheme(<Input {...defaultProps} size="small" />);
      expect(screen.getByPlaceholderText('Test placeholder')).toBeInTheDocument();
    });

    it('medium 크기가 적용된다', () => {
      renderWithTheme(<Input {...defaultProps} size="medium" />);
      expect(screen.getByPlaceholderText('Test placeholder')).toBeInTheDocument();
    });

    it('large 크기가 적용된다', () => {
      renderWithTheme(<Input {...defaultProps} size="large" />);
      expect(screen.getByPlaceholderText('Test placeholder')).toBeInTheDocument();
    });
  });

  describe('타입(Types)', () => {
    it('text 타입이 적용된다', () => {
      renderWithTheme(<Input {...defaultProps} type="text" />);
      expect(screen.getByPlaceholderText('Test placeholder')).toHaveAttribute('type', 'text');
    });

    it('email 타입이 적용된다', () => {
      renderWithTheme(<Input {...defaultProps} type="email" />);
      expect(screen.getByPlaceholderText('Test placeholder')).toHaveAttribute('type', 'email');
    });

    it('password 타입이 적용된다', () => {
      renderWithTheme(<Input {...defaultProps} type="password" />);
      expect(screen.getByPlaceholderText('Test placeholder')).toHaveAttribute('type', 'password');
    });

    it('number 타입이 적용된다', () => {
      renderWithTheme(<Input {...defaultProps} type="number" />);
      expect(screen.getByPlaceholderText('Test placeholder')).toHaveAttribute('type', 'number');
    });
  });

  describe('상태 관리', () => {
    it('비활성화 상태가 적용된다', () => {
      renderWithTheme(<Input {...defaultProps} disabled />);
      expect(screen.getByPlaceholderText('Test placeholder')).toBeDisabled();
    });

    it('에러 상태에서 에러 메시지가 표시된다', () => {
      renderWithTheme(
        <Input {...defaultProps} error errorMessage="Error message" helperText="Helper text" />
      );
      expect(screen.getByText('Error message')).toBeInTheDocument();
      expect(screen.queryByText('Helper text')).not.toBeInTheDocument();
    });

    it('required 속성이 적용된다', () => {
      renderWithTheme(<Input {...defaultProps} required />);
      expect(screen.getByPlaceholderText('Test placeholder')).toBeRequired();
    });

    it('fullWidth 속성이 적용된다', () => {
      renderWithTheme(<Input {...defaultProps} fullWidth />);
      expect(screen.getByPlaceholderText('Test placeholder')).toBeInTheDocument();
    });
  });

  describe('아이콘 기능', () => {
    it('왼쪽 아이콘이 표시된다', () => {
      renderWithTheme(<Input {...defaultProps} leftIcon={<TestIcon />} />);
      expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    });

    it('오른쪽 아이콘이 표시된다', () => {
      renderWithTheme(<Input {...defaultProps} rightIcon={<TestIcon />} />);
      expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    });

    it('아이콘 클릭 이벤트가 발생한다', () => {
      const handleIconClick = jest.fn();
      renderWithTheme(
        <Input {...defaultProps} leftIcon={<TestIcon />} onIconClick={handleIconClick} />
      );
      
      fireEvent.click(screen.getByTestId('test-icon'));
      expect(handleIconClick).toHaveBeenCalledWith('left');
    });

    it('비활성화 상태에서 아이콘 클릭이 작동하지 않는다', () => {
      const handleIconClick = jest.fn();
      renderWithTheme(
        <Input {...defaultProps} leftIcon={<TestIcon />} onIconClick={handleIconClick} disabled />
      );
      
      fireEvent.click(screen.getByTestId('test-icon'));
      expect(handleIconClick).not.toHaveBeenCalled();
    });
  });

  describe('사용자 상호작용', () => {
    it('텍스트 입력이 가능하다', async () => {
      const user = userEvent.setup();
      renderWithTheme(<Input {...defaultProps} />);
      
      const input = screen.getByPlaceholderText('Test placeholder');
      await user.type(input, 'Hello World');
      
      expect(input).toHaveValue('Hello World');
    });

    it('onChange 이벤트가 발생한다', async () => {
      const handleChange = jest.fn();
      const user = userEvent.setup();
      renderWithTheme(<Input {...defaultProps} onChange={handleChange} />);
      
      const input = screen.getByPlaceholderText('Test placeholder');
      await user.type(input, 'H');
      
      expect(handleChange).toHaveBeenCalled();
    });

    it('onFocus 이벤트가 발생한다', () => {
      const handleFocus = jest.fn();
      renderWithTheme(<Input {...defaultProps} onFocus={handleFocus} />);
      
      const input = screen.getByPlaceholderText('Test placeholder');
      fireEvent.focus(input);
      
      expect(handleFocus).toHaveBeenCalled();
    });

    it('onBlur 이벤트가 발생한다', () => {
      const handleBlur = jest.fn();
      renderWithTheme(<Input {...defaultProps} onBlur={handleBlur} />);
      
      const input = screen.getByPlaceholderText('Test placeholder');
      fireEvent.focus(input);
      fireEvent.blur(input);
      
      expect(handleBlur).toHaveBeenCalled();
    });
  });

  describe('접근성', () => {
    it('라벨이 입력 필드와 올바르게 연결된다', () => {
      renderWithTheme(<Input {...defaultProps} label="Test Label" id="test-input" />);
      
      const label = screen.getByText('Test Label');
      const input = screen.getByPlaceholderText('Test placeholder');
      
      expect(label).toHaveAttribute('for', 'test-input');
      expect(input).toHaveAttribute('id', 'test-input');
    });

    it('자동 생성된 ID가 사용된다', () => {
      renderWithTheme(<Input {...defaultProps} label="Test Label" />);
      
      const input = screen.getByPlaceholderText('Test placeholder');
      const id = input.getAttribute('id');
      
      expect(id).toMatch(/^input-/);
    });

    it('aria 속성이 올바르게 설정된다', () => {
      renderWithTheme(<Input {...defaultProps} required />);
      
      const input = screen.getByPlaceholderText('Test placeholder');
      expect(input).toBeRequired();
    });
  });

  describe('forwardRef', () => {
    it('ref가 올바르게 전달된다', () => {
      const ref = React.createRef<HTMLInputElement>();
      renderWithTheme(<Input {...defaultProps} ref={ref} />);
      
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });

    it('ref를 통해 입력 필드에 포커스할 수 있다', () => {
      const ref = React.createRef<HTMLInputElement>();
      renderWithTheme(<Input {...defaultProps} ref={ref} />);
      
      ref.current?.focus();
      expect(ref.current).toHaveFocus();
    });
  });
});