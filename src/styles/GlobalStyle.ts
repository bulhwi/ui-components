import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    font-family: ${({ theme }) => theme.fonts.primary};
    font-size: ${({ theme }) => theme.fonts.sizes.md};
    font-weight: ${({ theme }) => theme.fonts.weights.normal};
    line-height: 1.5;
    color: ${({ theme }) => theme.colors.text.primary};
    background-color: ${({ theme }) => theme.colors.background};
    transition: color 0.2s ease, background-color 0.2s ease;
  }

  button {
    font-family: inherit;
    border: none;
    outline: none;
    cursor: pointer;
    background: transparent;
  }

  input, textarea, select {
    font-family: inherit;
    outline: none;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  ul, ol {
    list-style: none;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  /* Focus styles */
  *:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;