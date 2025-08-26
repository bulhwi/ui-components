import React, { useState, useCallback, useEffect } from 'react';
import { Input } from './Input';
import { InputProps } from './types';
import { 
  validateInput, 
  ValidationOptions, 
  ValidationResult,
  createDebouncedValidator
} from '../../utils/validation';

export interface ValidatedInputProps extends Omit<InputProps, 'error' | 'errorMessage'> {
  validation?: ValidationOptions;
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
  validationDelay?: number;
  onValidation?: (result: ValidationResult) => void;
  showValidationOnType?: boolean;
}

export const ValidatedInput: React.FC<ValidatedInputProps> = ({
  validation,
  validateOnChange = true,
  validateOnBlur = true,
  validationDelay = 300,
  onValidation,
  showValidationOnType = false,
  value: controlledValue,
  onChange,
  onBlur,
  ...inputProps
}) => {
  const [internalValue, setInternalValue] = useState(controlledValue || '');
  const [validationResult, setValidationResult] = useState<ValidationResult>({ 
    isValid: true, 
    errors: [] 
  });
  const [hasBlurred, setHasBlurred] = useState(false);
  const [, setIsValidating] = useState(false);

  // 제어되는 컴포넌트인지 확인
  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : internalValue;

  // 디바운스된 검증 함수 생성
  const debouncedValidator = useCallback(
    createDebouncedValidator(validation || {}, validationDelay),
    [validation, validationDelay]
  );

  // 검증 실행
  const performValidation = useCallback(
    (value: string, immediate = false) => {
      if (!validation) return;

      if (immediate) {
        const result = validateInput(value, validation);
        setValidationResult(result);
        onValidation?.(result);
        setIsValidating(false);
      } else {
        setIsValidating(true);
        debouncedValidator(value, (result) => {
          setValidationResult(result);
          onValidation?.(result);
          setIsValidating(false);
        });
      }
    },
    [validation, debouncedValidator, onValidation]
  );

  // 값 변경 핸들러
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;

      // 내부 상태 업데이트 (비제어 컴포넌트일 때만)
      if (!isControlled) {
        setInternalValue(newValue);
      }

      // 부모 onChange 호출
      onChange?.(event);

      // 검증 실행
      if (validation && validateOnChange) {
        // showValidationOnType이 false이고 아직 blur가 발생하지 않았으면 검증하지 않음
        if (showValidationOnType || hasBlurred) {
          performValidation(String(newValue));
        }
      }
    },
    [
      isControlled,
      onChange,
      validation,
      validateOnChange,
      showValidationOnType,
      hasBlurred,
      performValidation,
    ]
  );

  // 블러 핸들러
  const handleBlur = useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      setHasBlurred(true);

      // 부모 onBlur 호출
      onBlur?.(event);

      // 검증 실행
      if (validation && validateOnBlur) {
        performValidation(String(currentValue), true);
      }
    },
    [onBlur, validation, validateOnBlur, currentValue, performValidation]
  );

  // 초기 검증 (required 필드인 경우)
  useEffect(() => {
    if (validation?.required && currentValue) {
      performValidation(String(currentValue), true);
    }
  }, [validation?.required, currentValue, performValidation]);

  // 에러 메시지 결정
  const errorMessage = validationResult.errors[0] || '';
  const hasError = !validationResult.isValid && (hasBlurred || showValidationOnType);

  return (
    <Input
      {...inputProps}
      value={currentValue}
      onChange={handleChange}
      onBlur={handleBlur}
      error={hasError}
      errorMessage={errorMessage}
    />
  );
};