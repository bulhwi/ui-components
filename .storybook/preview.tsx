import type { Preview } from '@storybook/react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { ThemeProvider } from '../src/contexts/ThemeContext';
import { I18nProvider } from '../src/contexts/I18nContext';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      toc: true,
    },
    viewport: {
      viewports: {
        ...INITIAL_VIEWPORTS,
        mobile1: {
          name: 'Small mobile',
          styles: { width: '320px', height: '568px' },
        },
        mobile2: {
          name: 'Large mobile',
          styles: { width: '414px', height: '896px' },
        },
        tablet: {
          name: 'Tablet',
          styles: { width: '768px', height: '1024px' },
        },
        desktop: {
          name: 'Desktop',
          styles: { width: '1024px', height: '768px' },
        },
      },
    },
    a11y: {
      element: '#storybook-root',
      config: {
        rules: [
          {
            id: 'autocomplete-valid',
            enabled: true,
          },
          {
            id: 'button-name',
            enabled: true,
          },
        ],
      },
    },
  },
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'light', left: '☀️', title: 'Light mode' },
          { value: 'dark', left: '🌙', title: 'Dark mode' },
        ],
        dynamicTitle: true,
      },
    },
    locale: {
      description: 'Internationalization locale',
      defaultValue: 'ko',
      toolbar: {
        icon: 'globe',
        items: [
          { value: 'ko', right: '🇰🇷', title: '한국어' },
          { value: 'en', right: '🇺🇸', title: 'English' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const { theme, locale } = context.globals;
      
      return (
        <ThemeProvider initialMode={theme}>
          <I18nProvider initialLocale={locale}>
            <div style={{ padding: '1rem' }}>
              <Story />
            </div>
          </I18nProvider>
        </ThemeProvider>
      );
    },
  ],
};

export default preview;