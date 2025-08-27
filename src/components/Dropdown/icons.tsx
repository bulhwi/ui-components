import React from 'react';

export const ChevronDownIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.427 6.427a.6.6 0 0 1 .849 0L8 9.151l2.724-2.724a.6.6 0 1 1 .849.849l-3.148 3.148a.6.6 0 0 1-.849 0L4.427 7.276a.6.6 0 0 1 0-.849Z"/>
  </svg>
);

export const CheckIcon: React.FC<{ size?: number }> = ({ size = 12 }) => (
  <svg width={size} height={size} viewBox="0 0 12 12" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M10.28 3.22a.75.75 0 0 0-1.06 0L5 7.44 2.78 5.22a.75.75 0 0 0-1.06 1.06l2.75 2.75a.75.75 0 0 0 1.06 0l4.75-4.75a.75.75 0 0 0 0-1.06Z"/>
  </svg>
);

export const XIcon: React.FC<{ size?: number }> = ({ size = 12 }) => (
  <svg width={size} height={size} viewBox="0 0 12 12" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M3.22 3.22a.75.75 0 0 1 1.06 0L6 4.94l1.72-1.72a.75.75 0 1 1 1.06 1.06L7.06 6l1.72 1.72a.75.75 0 0 1-1.06 1.06L6 7.06 4.28 8.78a.75.75 0 0 1-1.06-1.06L5.94 6 4.22 4.28a.75.75 0 0 1 0-1.06Z"/>
  </svg>
);

export const SearchIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.5 1a5.5 5.5 0 1 0 3.25 9.93l2.96 2.96a.75.75 0 1 0 1.06-1.06L10.93 9.75A5.5 5.5 0 0 0 6.5 1ZM2.5 6.5a4 4 0 1 1 8 0 4 4 0 0 1-8 0Z"/>
  </svg>
);