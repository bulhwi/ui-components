import type { Meta, StoryObj } from '@storybook/react';
import { ValidatedInput } from './ValidatedInput';
import { ValidatedInputProps } from './ValidatedInput';
import { VALIDATION_PRESETS } from '../../utils/validation';

const meta: Meta<typeof ValidatedInput> = {
  title: 'Components/ValidatedInput',
  component: ValidatedInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '실시간 검증 기능이 포함된 Input 컴포넌트입니다. 다양한 검증 규칙을 지원하며, 사용자 친화적인 에러 메시지를 제공합니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    validation: {
      control: 'object',
      description: '검증 옵션 객체',
    },
    validateOnChange: {
      control: 'boolean',
      description: '입력값 변경 시 검증 실행 여부',
    },
    validateOnBlur: {
      control: 'boolean',
      description: 'blur 이벤트 시 검증 실행 여부',
    },
    showValidationOnType: {
      control: 'boolean',
      description: '타이핑 중에도 검증 결과 표시 여부',
    },
  },
};

export default meta;
type Story = StoryObj<ValidatedInputProps>;

// 이메일 검증
export const EmailValidation: Story = {
  args: {
    label: '이메일',
    type: 'email',
    placeholder: 'example@email.com',
    validation: VALIDATION_PRESETS.email,
    validateOnChange: true,
    validateOnBlur: true,
  },
};

// 비밀번호 검증
export const PasswordValidation: Story = {
  args: {
    label: '비밀번호',
    type: 'password',
    placeholder: '비밀번호를 입력하세요',
    validation: VALIDATION_PRESETS.password,
    validateOnChange: true,
    validateOnBlur: true,
    helperText: '대소문자, 숫자, 특수문자를 포함한 8자 이상',
  },
};

// 전화번호 검증
export const PhoneValidation: Story = {
  args: {
    label: '전화번호',
    type: 'tel',
    placeholder: '010-1234-5678',
    validation: VALIDATION_PRESETS.phone,
    validateOnChange: true,
    validateOnBlur: true,
  },
};

// 이름 검증
export const NameValidation: Story = {
  args: {
    label: '이름',
    placeholder: '홍길동',
    validation: VALIDATION_PRESETS.name,
    validateOnChange: true,
    validateOnBlur: true,
  },
};

// URL 검증
export const UrlValidation: Story = {
  args: {
    label: '웹사이트',
    type: 'url',
    placeholder: 'https://example.com',
    validation: VALIDATION_PRESETS.url,
    validateOnChange: true,
    validateOnBlur: true,
  },
};

// 커스텀 검증
export const CustomValidation: Story = {
  args: {
    label: '사용자 ID',
    placeholder: 'user123',
    validation: {
      required: true,
      minLength: 4,
      maxLength: 20,
      pattern: /^[a-zA-Z0-9_]+$/,
      custom: [
        {
          test: (value: string) => !value.startsWith('_'),
          message: '언더스코어로 시작할 수 없습니다',
        },
        {
          test: (value: string) => !value.endsWith('_'),
          message: '언더스코어로 끝날 수 없습니다',
        },
      ],
    },
    validateOnChange: true,
    validateOnBlur: true,
    helperText: '4-20자, 영문/숫자/언더스코어만 가능 (언더스코어는 중간에만)',
  },
};

// 즉시 검증 (타이핑 중 표시)
export const ShowValidationOnType: Story = {
  args: {
    label: '실시간 검증',
    placeholder: '타이핑하면서 검증됩니다',
    validation: {
      required: true,
      minLength: 5,
    },
    validateOnChange: true,
    showValidationOnType: true,
    helperText: '최소 5자 이상 입력해주세요',
  },
};

// blur 후에만 검증 표시
export const ShowValidationOnBlur: Story = {
  args: {
    label: 'Blur 후 검증',
    placeholder: '포커스를 잃으면 검증됩니다',
    validation: {
      required: true,
      minLength: 3,
    },
    validateOnBlur: true,
    showValidationOnType: false,
    helperText: '필드를 벗어나면 검증 결과가 표시됩니다',
  },
};

// 다양한 검증 조합
export const ValidationCombination: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', minWidth: '400px' }}>
      <ValidatedInput
        label="이메일 (필수)"
        type="email"
        placeholder="example@email.com"
        validation={VALIDATION_PRESETS.email}
        validateOnChange={true}
        validateOnBlur={true}
      />
      <ValidatedInput
        label="비밀번호 (강력)"
        type="password"
        placeholder="Strong password"
        validation={VALIDATION_PRESETS.password}
        validateOnChange={true}
        showValidationOnType={true}
        helperText="대소문자, 숫자, 특수문자 포함 8자 이상"
      />
      <ValidatedInput
        label="전화번호"
        type="tel"
        placeholder="010-1234-5678"
        validation={VALIDATION_PRESETS.phone}
        validateOnBlur={true}
      />
      <ValidatedInput
        label="웹사이트 (선택)"
        type="url"
        placeholder="https://example.com"
        validation={VALIDATION_PRESETS.url}
        validateOnChange={true}
      />
      <ValidatedInput
        label="사용자명"
        placeholder="user123"
        validation={{
          required: true,
          minLength: 3,
          maxLength: 15,
          pattern: /^[a-zA-Z0-9]+$/,
        }}
        validateOnChange={true}
        helperText="3-15자, 영문/숫자만 가능"
      />
    </div>
  ),
};

// 검증 이벤트 핸들링
export const WithValidationCallback: Story = {
  render: () => {
    const handleValidation = (result: any) => {
      console.log('Validation Result:', result);
    };

    return (
      <ValidatedInput
        label="검증 결과 콘솔 확인"
        placeholder="입력해보세요"
        validation={{
          required: true,
          minLength: 3,
        }}
        validateOnChange={true}
        onValidation={handleValidation}
        helperText="콘솔에서 검증 결과를 확인하세요"
      />
    );
  },
};