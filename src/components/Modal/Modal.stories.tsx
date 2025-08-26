import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Modal } from './Modal';
import { ModalProps } from './types';
import { Button } from '../Button/Button';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '다양한 크기와 애니메이션을 지원하는 Modal 컴포넌트입니다. Portal을 사용하여 DOM 트리 최상위에 렌더링되며, 접근성과 키보드 네비게이션을 완벽히 지원합니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: '모달 표시 상태',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large', 'fullscreen'],
      description: '모달 크기',
    },
    animation: {
      control: 'select',
      options: ['fade', 'slideUp', 'slideDown', 'scale'],
      description: '모달 애니메이션 타입',
    },
    showCloseButton: {
      control: 'boolean',
      description: '닫기 버튼 표시 여부',
    },
    closeOnOverlayClick: {
      control: 'boolean',
      description: '오버레이 클릭 시 닫기 여부',
    },
    closeOnEscapeKey: {
      control: 'boolean',
      description: 'ESC 키로 닫기 여부',
    },
    centered: {
      control: 'boolean',
      description: '중앙 정렬 여부',
    },
    fullHeight: {
      control: 'boolean',
      description: '전체 높이 사용 여부',
    },
  },
};

export default meta;
type Story = StoryObj<ModalProps>;

// 기본 모달
export const Default: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>모달 열기</Button>
        <Modal
          {...args}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="기본 모달"
        >
          <p>이것은 기본 모달입니다. ESC 키를 누르거나 오버레이를 클릭하여 닫을 수 있습니다.</p>
        </Modal>
      </>
    );
  },
  args: {
    size: 'medium',
    animation: 'scale',
    showCloseButton: true,
    closeOnOverlayClick: true,
    closeOnEscapeKey: true,
  },
};

// 크기별 모달
export const Sizes: Story = {
  render: () => {
    const [openModal, setOpenModal] = useState<string | null>(null);
    
    return (
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <Button onClick={() => setOpenModal('small')}>Small</Button>
        <Button onClick={() => setOpenModal('medium')}>Medium</Button>
        <Button onClick={() => setOpenModal('large')}>Large</Button>
        <Button onClick={() => setOpenModal('fullscreen')}>Fullscreen</Button>
        
        <Modal
          isOpen={openModal === 'small'}
          onClose={() => setOpenModal(null)}
          title="Small 모달"
          size="small"
        >
          <p>작은 크기의 모달입니다.</p>
        </Modal>
        
        <Modal
          isOpen={openModal === 'medium'}
          onClose={() => setOpenModal(null)}
          title="Medium 모달"
          size="medium"
        >
          <p>중간 크기의 모달입니다. 기본 크기입니다.</p>
        </Modal>
        
        <Modal
          isOpen={openModal === 'large'}
          onClose={() => setOpenModal(null)}
          title="Large 모달"
          size="large"
        >
          <p>큰 크기의 모달입니다. 더 많은 콘텐츠를 표시할 수 있습니다.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </Modal>
        
        <Modal
          isOpen={openModal === 'fullscreen'}
          onClose={() => setOpenModal(null)}
          title="Fullscreen 모달"
          size="fullscreen"
        >
          <div>
            <p>전체 화면 크기의 모달입니다.</p>
            <p>화면 전체를 차지하며, 복잡한 콘텐츠나 폼을 표시하는 데 적합합니다.</p>
            <div style={{ height: '400px', background: '#f5f5f5', borderRadius: '8px', padding: '20px', marginTop: '20px' }}>
              <p>여기에 더 많은 콘텐츠가 들어갈 수 있습니다.</p>
            </div>
          </div>
        </Modal>
      </div>
    );
  },
};

// 애니메이션별 모달
export const Animations: Story = {
  render: () => {
    const [openModal, setOpenModal] = useState<string | null>(null);
    
    return (
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <Button onClick={() => setOpenModal('fade')}>Fade</Button>
        <Button onClick={() => setOpenModal('slideUp')}>Slide Up</Button>
        <Button onClick={() => setOpenModal('slideDown')}>Slide Down</Button>
        <Button onClick={() => setOpenModal('scale')}>Scale</Button>
        
        <Modal
          isOpen={openModal === 'fade'}
          onClose={() => setOpenModal(null)}
          title="Fade 애니메이션"
          animation="fade"
        >
          <p>페이드 인/아웃 애니메이션입니다.</p>
        </Modal>
        
        <Modal
          isOpen={openModal === 'slideUp'}
          onClose={() => setOpenModal(null)}
          title="Slide Up 애니메이션"
          animation="slideUp"
        >
          <p>아래에서 위로 슬라이드되는 애니메이션입니다.</p>
        </Modal>
        
        <Modal
          isOpen={openModal === 'slideDown'}
          onClose={() => setOpenModal(null)}
          title="Slide Down 애니메이션"
          animation="slideDown"
        >
          <p>위에서 아래로 슬라이드되는 애니메이션입니다.</p>
        </Modal>
        
        <Modal
          isOpen={openModal === 'scale'}
          onClose={() => setOpenModal(null)}
          title="Scale 애니메이션"
          animation="scale"
        >
          <p>크기가 변하는 애니메이션입니다. (기본값)</p>
        </Modal>
      </div>
    );
  },
};

// 푸터가 있는 모달
export const WithFooter: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    
    const footer = (
      <>
        <Button variant="secondary" onClick={() => setIsOpen(false)}>
          취소
        </Button>
        <Button variant="primary" onClick={() => setIsOpen(false)}>
          확인
        </Button>
      </>
    );
    
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>푸터 모달 열기</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="확인이 필요한 작업"
          footer={footer}
        >
          <p>이 작업을 계속하시겠습니까?</p>
          <p>이 작업은 되돌릴 수 없습니다. 신중하게 결정해주세요.</p>
        </Modal>
      </>
    );
  },
};

// 커스텀 헤더
export const WithCustomHeader: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    
    const customHeader = (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{ width: '24px', height: '24px', background: '#007bff', borderRadius: '50%' }}></div>
        <div>
          <h3 style={{ margin: 0, fontSize: '18px' }}>커스텀 헤더</h3>
          <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>부제목도 함께 표시</p>
        </div>
      </div>
    );
    
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>커스텀 헤더 모달</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          header={customHeader}
        >
          <p>커스텀 헤더를 사용한 모달입니다.</p>
          <p>제목 대신 header prop을 사용하여 자유로운 레이아웃을 구성할 수 있습니다.</p>
        </Modal>
      </>
    );
  },
};

// 긴 콘텐츠 스크롤
export const LongContent: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>긴 콘텐츠 모달</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="스크롤 가능한 콘텐츠"
          size="medium"
        >
          <div>
            <p>이 모달은 긴 콘텐츠를 포함하고 있어 스크롤이 가능합니다.</p>
            {Array.from({ length: 20 }, (_, i) => (
              <p key={i}>
                단락 {i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
              </p>
            ))}
            <p>마지막 단락입니다.</p>
          </div>
        </Modal>
      </>
    );
  },
};

// 닫기 제한 모달
export const RestrictedClose: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>제한된 닫기 모달</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="중요한 알림"
          showCloseButton={false}
          closeOnOverlayClick={false}
          closeOnEscapeKey={false}
          footer={
            <Button variant="primary" onClick={() => setIsOpen(false)}>
              확인했습니다
            </Button>
          }
        >
          <p>이 모달은 확인 버튼을 눌러야만 닫을 수 있습니다.</p>
          <p>ESC 키, 오버레이 클릭, X 버튼이 모두 비활성화되어 있습니다.</p>
        </Modal>
      </>
    );
  },
};

// 폼이 있는 모달
export const WithForm: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      console.log('Form submitted:', formData);
      setIsOpen(false);
      setFormData({ name: '', email: '', message: '' });
    };
    
    const footer = (
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '8px', width: '100%', justifyContent: 'flex-end' }}>
        <Button type="button" variant="secondary" onClick={() => setIsOpen(false)}>
          취소
        </Button>
        <Button type="submit" variant="primary">
          전송
        </Button>
      </form>
    );
    
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>문의 폼 모달</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="문의하기"
          footer={footer}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'medium' }}>
                이름 *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}
                required
              />
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'medium' }}>
                이메일 *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}
                required
              />
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'medium' }}>
                메시지 *
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '14px',
                  minHeight: '100px',
                  resize: 'vertical'
                }}
                required
              />
            </div>
          </div>
        </Modal>
      </>
    );
  },
};

// 중첩 모달
export const NestedModals: Story = {
  render: () => {
    const [firstModalOpen, setFirstModalOpen] = useState(false);
    const [secondModalOpen, setSecondModalOpen] = useState(false);
    
    return (
      <>
        <Button onClick={() => setFirstModalOpen(true)}>첫 번째 모달 열기</Button>
        
        <Modal
          isOpen={firstModalOpen}
          onClose={() => setFirstModalOpen(false)}
          title="첫 번째 모달"
          zIndex={1000}
        >
          <p>이것은 첫 번째 모달입니다.</p>
          <Button onClick={() => setSecondModalOpen(true)}>
            두 번째 모달 열기
          </Button>
        </Modal>
        
        <Modal
          isOpen={secondModalOpen}
          onClose={() => setSecondModalOpen(false)}
          title="두 번째 모달"
          zIndex={1100}
          size="small"
        >
          <p>이것은 두 번째 모달입니다.</p>
          <p>더 높은 z-index를 가지고 있어 첫 번째 모달 위에 표시됩니다.</p>
        </Modal>
      </>
    );
  },
};