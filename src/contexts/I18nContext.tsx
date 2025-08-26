import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Locale, I18nResources } from '../types/i18n';
import { resources } from '../i18n/resources';

interface I18nContextValue {
  locale: Locale;
  resources: I18nResources;
  setLocale: (locale: Locale) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
}

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

export const useI18n = (): I18nContextValue => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};

interface I18nProviderProps {
  children: ReactNode;
  initialLocale?: Locale;
}

export const I18nProvider: React.FC<I18nProviderProps> = ({ 
  children, 
  initialLocale = 'ko' 
}) => {
  const [locale, setLocale] = useState<Locale>(initialLocale);
  
  const t = useCallback((key: string, params?: Record<string, string | number>): string => {
    const keys = key.split('.');
    let value: any = resources[locale];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key; // Return key if translation not found
      }
    }
    
    if (typeof value === 'string') {
      if (params) {
        return value.replace(/\{(\w+)\}/g, (match, paramKey) => {
          return params[paramKey]?.toString() || match;
        });
      }
      return value;
    }
    
    return key;
  }, [locale]);
  
  const contextValue: I18nContextValue = {
    locale,
    resources: resources[locale],
    setLocale,
    t,
  };

  return (
    <I18nContext.Provider value={contextValue}>
      {children}
    </I18nContext.Provider>
  );
};