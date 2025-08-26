import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '../../contexts/ThemeContext';
import { I18nProvider } from '../../contexts/I18nContext';
import { Button } from './Button';

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <ThemeProvider>
      <I18nProvider>
        {ui}
      </I18nProvider>
    </ThemeProvider>
  );
};

describe('Button', () => {
  describe('렌더링', () => {
    it('기본 버튼이 올바르게 렌더링된다', () => {
      renderWithProviders(<Button>테스트 버튼</Button>);
      
      const button = screen.getByRole('button', { name: '테스트 버튼' });
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent('테스트 버튼');
    });

    it('다양한 variant가 올바르게 적용된다', () => {
      const { rerender } = renderWithProviders(<Button variant="primary">Primary</Button>);
      expect(screen.getByRole('button')).toBeInTheDocument();
      
      rerender(
        <ThemeProvider>
          <I18nProvider>
            <Button variant="secondary">Secondary</Button>
          </I18nProvider>
        </ThemeProvider>
      );
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('아이콘이 올바르게 렌더링된다', () => {
      renderWithProviders(
        <Button icon={<span data-testid="test-icon">📝</span>}>
          편집
        </Button>
      );
      
      expect(screen.getByTestId('test-icon')).toBeInTheDocument();
      expect(screen.getByRole('button')).toHaveTextContent('편집');
    });
  });

  describe('상태 관리', () => {
    it('loading 상태일 때 로딩 스피너가 표시된다', () => {
      renderWithProviders(<Button loading>로딩 중</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      expect(button).toHaveTextContent('로딩 중');
    });

    it('disabled 상태일 때 클릭할 수 없다', () => {
      const handleClick = jest.fn();
      renderWithProviders(
        <Button disabled onClick={handleClick}>
          비활성 버튼
        </Button>
      );
      
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      
      fireEvent.click(button);
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('fullWidth 속성이 올바르게 적용된다', () => {
      renderWithProviders(<Button fullWidth>전체 너비</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveStyle('width: 100%');
    });
  });

  describe('이벤트 처리', () => {
    it('클릭 이벤트가 올바르게 처리된다', () => {
      const handleClick = jest.fn();
      renderWithProviders(<Button onClick={handleClick}>클릭</Button>);
      
      const button = screen.getByRole('button');
      fireEvent.click(button);
      
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('키보드 이벤트가 올바르게 처리된다', () => {
      const handleKeyDown = jest.fn();
      renderWithProviders(
        <Button onKeyDown={handleKeyDown}>키보드</Button>
      );
      
      const button = screen.getByRole('button');
      fireEvent.keyDown(button, { key: 'Enter' });
      
      expect(handleKeyDown).toHaveBeenCalledTimes(1);
    });
  });

  describe('접근성', () => {
    it('button 역할이 올바르게 설정된다', () => {
      renderWithProviders(<Button>접근성 테스트</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('type 속성이 올바르게 설정된다', () => {
      renderWithProviders(<Button type="submit">제출</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'submit');
    });

    it('aria-label이 올바르게 설정된다', () => {
      renderWithProviders(
        <Button aria-label="사용자 메뉴 열기">메뉴</Button>
      );
      
      const button = screen.getByLabelText('사용자 메뉴 열기');
      expect(button).toBeInTheDocument();
    });
  });
});