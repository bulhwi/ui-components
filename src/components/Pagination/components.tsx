import React, { useState, KeyboardEvent, ChangeEvent } from 'react';
import {
  PageSizeSelectorProps,
  PageJumpProps,
  PaginationInfoProps,
  PaginationButtonProps
} from './types';
import {
  PaginationButton,
  PageSizeSelector as PageSizeSelectorContainer,
  PageSizeSelect,
  PageJumper as PageJumperContainer,
  PageJumpInput,
  PaginationInfo as PaginationInfoContainer,
} from './styles';

/**
 * Individual pagination button component
 */
export const PaginationButtonComponent: React.FC<PaginationButtonProps> = ({
  children,
  active = false,
  disabled = false,
  onClick,
  size = 'md',
  type = 'page',
  'aria-label': ariaLabel,
  'data-testid': testId,
}) => {
  const isEllipsis = type === 'ellipsis';
  
  return (
    <PaginationButton
      $active={active}
      $disabled={disabled}
      $size={size}
      $isEllipsis={isEllipsis}
      $buttonType={type}
      onClick={onClick}
      disabled={disabled || isEllipsis}
      aria-label={ariaLabel}
      aria-current={active ? 'page' : undefined}
      data-testid={testId}
      type="button"
    >
      {children}
    </PaginationButton>
  );
};

/**
 * Page size selector component
 */
export const PageSizeSelectorComponent: React.FC<PageSizeSelectorProps> = ({
  value,
  options,
  onChange,
  size = 'md',
  disabled = false,
  label = 'Show',
}) => {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newSize = parseInt(event.target.value, 10);
    onChange(newSize);
  };

  return (
    <PageSizeSelectorContainer $size={size} $disabled={disabled}>
      <label htmlFor="page-size-selector">{label}</label>
      <PageSizeSelect
        id="page-size-selector"
        value={value}
        onChange={handleChange}
        disabled={disabled}
        $size={size}
        aria-label="Items per page"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </PageSizeSelect>
      <span>per page</span>
    </PageSizeSelectorContainer>
  );
};

/**
 * Page jump input component
 */
export const PageJumperComponent: React.FC<PageJumpProps> = ({
  currentPage,
  totalPages,
  onJump,
  size = 'md',
  disabled = false,
  label = 'Go to',
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    // Allow empty or valid numbers only
    if (value === '' || (/^\d+$/.test(value) && parseInt(value) > 0)) {
      setInputValue(value);
    }
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleJump();
    }
  };

  const handleJump = () => {
    const page = parseInt(inputValue, 10);
    if (page && page >= 1 && page <= totalPages && page !== currentPage) {
      onJump(page);
    }
    setInputValue('');
  };

  return (
    <PageJumperContainer $size={size} $disabled={disabled}>
      <label htmlFor="page-jump-input">{label}</label>
      <PageJumpInput
        id="page-jump-input"
        type="number"
        min="1"
        max={totalPages}
        value={inputValue}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        onBlur={handleJump}
        disabled={disabled || totalPages <= 1}
        placeholder={currentPage.toString()}
        $size={size}
        aria-label="Jump to page"
      />
    </PageJumperContainer>
  );
};

/**
 * Pagination info component
 */
export const PaginationInfoComponent: React.FC<PaginationInfoProps> = ({
  currentPage,
  pageSize,
  total,
  position = 'left',
  render,
}) => {
  const start = total === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, total);
  const totalPages = Math.ceil(total / pageSize);

  const info = {
    start,
    end,
    total,
    currentPage,
    totalPages,
  };

  return (
    <PaginationInfoContainer $position={position}>
      {render ? render(info) : `Showing ${start}-${end} of ${total} items`}
    </PaginationInfoContainer>
  );
};

/**
 * Navigation icon components
 */
export const ChevronLeftIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="15,18 9,12 15,6" />
  </svg>
);

export const ChevronRightIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="9,18 15,12 9,6" />
  </svg>
);

export const ChevronsLeftIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="11,17 6,12 11,7" />
    <polyline points="18,17 13,12 18,7" />
  </svg>
);

export const ChevronsRightIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="13,17 18,12 13,7" />
    <polyline points="6,17 11,12 6,7" />
  </svg>
);

export const MoreHorizontalIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="1" />
    <circle cx="19" cy="12" r="1" />
    <circle cx="5" cy="12" r="1" />
  </svg>
);