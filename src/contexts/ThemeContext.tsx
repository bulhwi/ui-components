import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { Theme, ThemeMode } from '../types/theme';
import { lightTheme, darkTheme } from '../styles/theme';
import { GlobalStyle } from '../styles/GlobalStyle';

interface ThemeContextValue {
  mode: ThemeMode;
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
  initialMode?: ThemeMode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ 
  children, 
  initialMode = 'light' 
}) => {
  const [mode, setMode] = useState<ThemeMode>(initialMode);
  
  const theme = mode === 'light' ? lightTheme : darkTheme;
  
  const toggleTheme = useCallback(() => {
    setMode(prevMode => prevMode === 'light' ? 'dark' : 'light');
  }, []);
  
  const setTheme = useCallback((newMode: ThemeMode) => {
    setMode(newMode);
  }, []);
  
  const contextValue: ThemeContextValue = {
    mode,
    theme,
    toggleTheme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      <StyledThemeProvider theme={theme}>
        <GlobalStyle />
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};