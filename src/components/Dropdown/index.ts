// Main exports
export { default as Dropdown } from './Dropdown';
export { VirtualizedList, useVirtualizedList } from './VirtualizedList';
export { useDropdown, useDropdownSearch, useDropdownKeyboard } from './useDropdown';

// Type exports
export type {
  DropdownOption,
  DropdownOptionGroup,
  DropdownPosition,
  DropdownSize,
  DropdownProps,
  DropdownTriggerProps,
  DropdownMenuProps,
  DropdownOptionProps,
  TagProps,
  FilterOptions,
  KeyboardNavigationState,
  VirtualizationConfig,
  DropdownAriaProps,
  UseDropdownReturn,
} from './types';

// Style exports (for advanced customization)
export {
  DropdownContainer,
  DropdownTrigger,
  TriggerContent,
  TriggerText,
  TagsContainer,
  Tag,
  TagRemoveButton,
  MoreTag,
  ArrowContainer,
  LoadingContainer,
  DropdownPortal,
  DropdownMenu,
  SearchContainer,
  SearchInput,
  OptionsContainer,
  OptionGroup,
  GroupHeader,
  OptionItem,
  OptionIcon,
  OptionContent,
  OptionLabel,
  OptionDescription,
  Checkbox,
  EmptyState,
  LoadingState,
} from './styles';

// Icon exports
export {
  ChevronDownIcon,
  CheckIcon,
  XIcon,
  SearchIcon,
} from './icons';