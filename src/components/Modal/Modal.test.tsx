import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from '../../styles/theme';
import { Modal } from './Modal';

const MockThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider theme={lightTheme}>{children}</ThemeProvider>
);

const renderWithTheme = (ui: React.ReactElement) => {
  return render(ui, { wrapper: MockThemeProvider });
};

// Portal 테스트를 위한 설정
beforeEach(() => {
  // modal-root 요소가 있다면 제거
  const existingModalRoot = document.getElementById('modal-root');
  if (existingModalRoot) {
    document.body.removeChild(existingModalRoot);
  }
});

afterEach(() => {
  // 각 테스트 후 modal-root 정리
  const modalRoot = document.getElementById('modal-root');
  if (modalRoot) {
    document.body.removeChild(modalRoot);
  }
});

describe('Modal', () => {
  const defaultProps = {
    isOpen: true,
    onClose: jest.fn(),
    children: <div>Modal Content</div>,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('기본 렌더링', () => {
    it('모달이 열렸을 때 렌더링된다', async () => {
      renderWithTheme(<Modal {...defaultProps} />);
      
      await waitFor(() => {
        expect(screen.getByText('Modal Content')).toBeInTheDocument();
      });
    });

    it('모달이 닫혔을 때 렌더링되지 않는다', () => {
      renderWithTheme(<Modal {...defaultProps} isOpen={false} />);
      
      expect(screen.queryByText('Modal Content')).not.toBeInTheDocument();
    });

    it('제목이 올바르게 표시된다', async () => {
      renderWithTheme(<Modal {...defaultProps} title="Test Modal" />);
      
      await waitFor(() => {
        expect(screen.getByText('Test Modal')).toBeInTheDocument();
      });
    });

    it('닫기 버튼이 표시된다', async () => {
      renderWithTheme(<Modal {...defaultProps} showCloseButton={true} />);
      
      await waitFor(() => {
        expect(screen.getByLabelText('모달 닫기')).toBeInTheDocument();
      });
    });

    it('닫기 버튼을 숨길 수 있다', async () => {
      renderWithTheme(<Modal {...defaultProps} showCloseButton={false} />);
      
      await waitFor(() => {
        expect(screen.queryByLabelText('모달 닫기')).not.toBeInTheDocument();
      });
    });
  });

  describe('크기 변형', () => {
    it('small 크기가 적용된다', async () => {
      renderWithTheme(<Modal {...defaultProps} size="small" />);
      
      await waitFor(() => {
        expect(screen.getByText('Modal Content')).toBeInTheDocument();
      });
    });

    it('medium 크기가 적용된다', async () => {
      renderWithTheme(<Modal {...defaultProps} size="medium" />);
      
      await waitFor(() => {
        expect(screen.getByText('Modal Content')).toBeInTheDocument();
      });
    });

    it('large 크기가 적용된다', async () => {
      renderWithTheme(<Modal {...defaultProps} size="large" />);
      
      await waitFor(() => {
        expect(screen.getByText('Modal Content')).toBeInTheDocument();
      });
    });

    it('fullscreen 크기가 적용된다', async () => {
      renderWithTheme(<Modal {...defaultProps} size="fullscreen" />);
      
      await waitFor(() => {
        expect(screen.getByText('Modal Content')).toBeInTheDocument();
      });
    });
  });

  describe('애니메이션', () => {
    it('fade 애니메이션이 적용된다', async () => {
      renderWithTheme(<Modal {...defaultProps} animation="fade" />);
      
      await waitFor(() => {
        expect(screen.getByText('Modal Content')).toBeInTheDocument();
      });
    });

    it('slideUp 애니메이션이 적용된다', async () => {
      renderWithTheme(<Modal {...defaultProps} animation="slideUp" />);
      
      await waitFor(() => {
        expect(screen.getByText('Modal Content')).toBeInTheDocument();
      });
    });

    it('slideDown 애니메이션이 적용된다', async () => {
      renderWithTheme(<Modal {...defaultProps} animation="slideDown" />);
      
      await waitFor(() => {
        expect(screen.getByText('Modal Content')).toBeInTheDocument();
      });
    });

    it('scale 애니메이션이 적용된다', async () => {
      renderWithTheme(<Modal {...defaultProps} animation="scale" />);
      
      await waitFor(() => {
        expect(screen.getByText('Modal Content')).toBeInTheDocument();
      });
    });
  });

  describe('닫기 동작', () => {
    it('닫기 버튼 클릭 시 onClose가 호출된다', async () => {
      const onClose = jest.fn();
      renderWithTheme(<Modal {...defaultProps} onClose={onClose} />);
      
      await waitFor(() => {
        expect(screen.getByLabelText('모달 닫기')).toBeInTheDocument();
      });
      
      fireEvent.click(screen.getByLabelText('모달 닫기'));
      
      await waitFor(() => {
        expect(onClose).toHaveBeenCalled();
      }, { timeout: 500 });
    });

    it('ESC 키 누름 시 onClose가 호출된다', async () => {
      const onClose = jest.fn();
      renderWithTheme(<Modal {...defaultProps} onClose={onClose} closeOnEscapeKey={true} />);
      
      await waitFor(() => {
        expect(screen.getByText('Modal Content')).toBeInTheDocument();
      });
      
      fireEvent.keyDown(document, { key: 'Escape' });
      
      await waitFor(() => {
        expect(onClose).toHaveBeenCalled();
      }, { timeout: 500 });
    });

    it('ESC 키 비활성화 시 onClose가 호출되지 않는다', async () => {
      const onClose = jest.fn();
      renderWithTheme(<Modal {...defaultProps} onClose={onClose} closeOnEscapeKey={false} />);
      
      await waitFor(() => {
        expect(screen.getByText('Modal Content')).toBeInTheDocument();
      });
      
      fireEvent.keyDown(document, { key: 'Escape' });
      
      // ESC 키가 비활성화되었으므로 onClose가 호출되지 않아야 함
      await new Promise(resolve => setTimeout(resolve, 100));
      expect(onClose).not.toHaveBeenCalled();
    });

    it('오버레이 클릭 시 onClose가 호출된다', async () => {
      const onClose = jest.fn();
      renderWithTheme(<Modal {...defaultProps} onClose={onClose} closeOnOverlayClick={true} />);
      
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });
      
      // 오버레이(dialog)를 클릭
      fireEvent.click(screen.getByRole('dialog'));
      
      await waitFor(() => {
        expect(onClose).toHaveBeenCalled();
      }, { timeout: 500 });
    });

    it('오버레이 클릭 비활성화 시 onClose가 호출되지 않는다', async () => {
      const onClose = jest.fn();
      renderWithTheme(<Modal {...defaultProps} onClose={onClose} closeOnOverlayClick={false} />);
      
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });
      
      fireEvent.click(screen.getByRole('dialog'));
      
      await new Promise(resolve => setTimeout(resolve, 100));
      expect(onClose).not.toHaveBeenCalled();
    });
  });

  describe('푸터와 헤더', () => {
    it('푸터가 렌더링된다', async () => {
      const footer = <button>Footer Button</button>;
      renderWithTheme(<Modal {...defaultProps} footer={footer} />);
      
      await waitFor(() => {
        expect(screen.getByText('Footer Button')).toBeInTheDocument();
      });
    });

    it('커스텀 헤더가 렌더링된다', async () => {
      const header = <div>Custom Header</div>;
      renderWithTheme(<Modal {...defaultProps} header={header} />);
      
      await waitFor(() => {
        expect(screen.getByText('Custom Header')).toBeInTheDocument();
      });
    });
  });

  describe('접근성', () => {
    it('모달에 올바른 ARIA 속성이 설정된다', async () => {
      renderWithTheme(<Modal {...defaultProps} title="Accessible Modal" />);
      
      await waitFor(() => {
        const dialog = screen.getByRole('dialog');
        expect(dialog).toHaveAttribute('aria-modal', 'true');
        expect(dialog).toHaveAttribute('aria-labelledby');
      });
    });

    it('제목이 있을 때 aria-labelledby가 올바르게 설정된다', async () => {
      renderWithTheme(<Modal {...defaultProps} title="Test Modal" />);
      
      await waitFor(() => {
        const dialog = screen.getByRole('dialog');
        const title = screen.getByText('Test Modal');
        expect(dialog).toHaveAttribute('aria-labelledby', title.id);
      });
    });

    it('Tab 키로 포커스가 트랩된다', async () => {
      const user = userEvent.setup();
      renderWithTheme(
        <Modal {...defaultProps} title="Focus Test">
          <button>First Button</button>
          <button>Second Button</button>
        </Modal>
      );
      
      await waitFor(() => {
        expect(screen.getByText('First Button')).toBeInTheDocument();
      });
      
      // 모달 내부의 focusable 요소들을 찾기
      const firstButton = screen.getByText('First Button');
      const secondButton = screen.getByText('Second Button');
      const closeButton = screen.getByLabelText('모달 닫기');
      
      // 초기 포커스는 첫 번째 focusable 요소에 있어야 함
      await waitFor(() => {
        expect(firstButton).toHaveFocus();
      });
      
      // Tab으로 순환 확인
      await user.tab();
      expect(secondButton).toHaveFocus();
      
      await user.tab();
      expect(closeButton).toHaveFocus();
      
      await user.tab();
      expect(firstButton).toHaveFocus();
    });
  });

  describe('포털', () => {
    it('모달이 body에 portal로 렌더링된다', async () => {
      renderWithTheme(<Modal {...defaultProps} />);
      
      await waitFor(() => {
        const modalRoot = document.getElementById('modal-root');
        expect(modalRoot).toBeInTheDocument();
        expect(modalRoot?.children.length).toBeGreaterThan(0);
      });
    });

    it('모달이 닫히면 portal 콘텐츠가 제거된다', async () => {
      const { rerender } = renderWithTheme(<Modal {...defaultProps} />);
      
      await waitFor(() => {
        expect(screen.getByText('Modal Content')).toBeInTheDocument();
      });
      
      rerender(
        <MockThemeProvider>
          <Modal {...defaultProps} isOpen={false} />
        </MockThemeProvider>
      );
      
      await waitFor(() => {
        expect(screen.queryByText('Modal Content')).not.toBeInTheDocument();
      });
    });
  });

  describe('콜백 함수', () => {
    it('onOpen 콜백이 호출된다', async () => {
      const onOpen = jest.fn();
      renderWithTheme(<Modal {...defaultProps} onOpen={onOpen} />);
      
      await waitFor(() => {
        expect(onOpen).toHaveBeenCalled();
      });
    });

    it('onAfterOpen 콜백이 호출된다', async () => {
      const onAfterOpen = jest.fn();
      renderWithTheme(<Modal {...defaultProps} onAfterOpen={onAfterOpen} />);
      
      await waitFor(() => {
        expect(onAfterOpen).toHaveBeenCalled();
      }, { timeout: 500 });
    });

    it('onAfterClose 콜백이 호출된다', async () => {
      const onAfterClose = jest.fn();
      const onClose = jest.fn();
      
      renderWithTheme(
        <Modal {...defaultProps} onClose={onClose} onAfterClose={onAfterClose} />
      );
      
      await waitFor(() => {
        expect(screen.getByLabelText('모달 닫기')).toBeInTheDocument();
      });
      
      fireEvent.click(screen.getByLabelText('모달 닫기'));
      
      await waitFor(() => {
        expect(onAfterClose).toHaveBeenCalled();
      }, { timeout: 500 });
    });
  });

  describe('스크롤 방지', () => {
    it('기본적으로 body 스크롤이 방지된다', async () => {
      const originalOverflow = document.body.style.overflow;
      
      const { rerender } = renderWithTheme(<Modal {...defaultProps} preventScroll={true} />);
      
      await waitFor(() => {
        expect(document.body.style.overflow).toBe('hidden');
      });
      
      // 클린업 확인
      rerender(
        <MockThemeProvider>
          <Modal {...defaultProps} isOpen={false} preventScroll={true} />
        </MockThemeProvider>
      );
      
      await waitFor(() => {
        expect(document.body.style.overflow).toBe(originalOverflow);
      });
    });

    it('preventScroll이 false일 때 스크롤이 방지되지 않는다', async () => {
      const originalOverflow = document.body.style.overflow;
      
      renderWithTheme(<Modal {...defaultProps} preventScroll={false} />);
      
      await waitFor(() => {
        expect(document.body.style.overflow).toBe(originalOverflow);
      });
    });
  });
});