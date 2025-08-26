export interface ValidationRule {
  test: (value: string) => boolean;
  message: string;
}

export interface ValidationOptions {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  email?: boolean;
  number?: boolean;
  url?: boolean;
  phone?: boolean;
  custom?: ValidationRule[];
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

const VALIDATION_PATTERNS = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^[+]?[0-9][\s\-()]*[0-9]{1,}[\s\-()0-9]*$/,
  url: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/,
  number: /^-?\d*\.?\d+$/,
};

const VALIDATION_MESSAGES = {
  required: '이 필드는 필수입니다',
  minLength: (min: number) => `최소 ${min}자 이상 입력해주세요`,
  maxLength: (max: number) => `최대 ${max}자까지 입력 가능합니다`,
  email: '유효한 이메일 주소를 입력해주세요',
  phone: '유효한 전화번호를 입력해주세요',
  url: '유효한 URL을 입력해주세요',
  number: '유효한 숫자를 입력해주세요',
  pattern: '올바른 형식으로 입력해주세요',
};

export const validateInput = (
  value: string = '',
  options: ValidationOptions = {}
): ValidationResult => {
  const errors: string[] = [];

  // Required 검증
  if (options.required && (!value || value.trim() === '')) {
    errors.push(VALIDATION_MESSAGES.required);
    return { isValid: false, errors }; // 필수값이 없으면 다른 검증은 하지 않음
  }

  // 값이 없으면 다른 검증은 통과 (required가 아닌 경우)
  if (!value || value.trim() === '') {
    return { isValid: true, errors: [] };
  }

  // 길이 검증
  if (options.minLength && value.length < options.minLength) {
    errors.push(VALIDATION_MESSAGES.minLength(options.minLength));
  }

  if (options.maxLength && value.length > options.maxLength) {
    errors.push(VALIDATION_MESSAGES.maxLength(options.maxLength));
  }

  // 이메일 검증
  if (options.email && !VALIDATION_PATTERNS.email.test(value)) {
    errors.push(VALIDATION_MESSAGES.email);
  }

  // 전화번호 검증
  if (options.phone && !VALIDATION_PATTERNS.phone.test(value)) {
    errors.push(VALIDATION_MESSAGES.phone);
  }

  // URL 검증
  if (options.url && !VALIDATION_PATTERNS.url.test(value)) {
    errors.push(VALIDATION_MESSAGES.url);
  }

  // 숫자 검증
  if (options.number && !VALIDATION_PATTERNS.number.test(value)) {
    errors.push(VALIDATION_MESSAGES.number);
  }

  // 패턴 검증
  if (options.pattern && !options.pattern.test(value)) {
    errors.push(VALIDATION_MESSAGES.pattern);
  }

  // 커스텀 검증
  if (options.custom) {
    options.custom.forEach(rule => {
      if (!rule.test(value)) {
        errors.push(rule.message);
      }
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

// 실시간 검증을 위한 디바운스 유틸리티
export const createDebouncedValidator = (
  validationOptions: ValidationOptions,
  delay: number = 300
) => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return (
    value: string,
    callback: (result: ValidationResult) => void
  ): void => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      const result = validateInput(value, validationOptions);
      callback(result);
    }, delay);
  };
};

// 자주 사용되는 검증 프리셋
export const VALIDATION_PRESETS = {
  email: {
    email: true,
    required: true,
  } as ValidationOptions,
  
  password: {
    required: true,
    minLength: 8,
    custom: [
      {
        test: (value: string) => /[A-Z]/.test(value),
        message: '대문자를 포함해야 합니다',
      },
      {
        test: (value: string) => /[a-z]/.test(value),
        message: '소문자를 포함해야 합니다',
      },
      {
        test: (value: string) => /\d/.test(value),
        message: '숫자를 포함해야 합니다',
      },
      {
        test: (value: string) => /[!@#$%^&*(),.?":{}|<>]/.test(value),
        message: '특수문자를 포함해야 합니다',
      },
    ],
  } as ValidationOptions,
  
  phone: {
    phone: true,
    required: true,
  } as ValidationOptions,
  
  url: {
    url: true,
  } as ValidationOptions,
  
  name: {
    required: true,
    minLength: 2,
    maxLength: 50,
    pattern: /^[가-힣a-zA-Z\s]+$/,
  } as ValidationOptions,
};