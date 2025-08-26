# UI Component Library Code Guidelines

## 1. Project Overview

This document outlines the coding standards for a reusable internal UI component library built with React, Next.js, and TypeScript. The library utilizes Storybook for visual documentation and previews, supports dark mode, i18n, and responsiveness, and ensures quality through Jest-based testing. The initial deployment is via local linking.

Key architectural decisions include:

*   React for component-based architecture and reusability.
*   Next.js for server-side rendering and SEO optimization (future consideration).
*   TypeScript for static typing and improved code maintainability.
*   styled-components for component-level styling and theme support.
*   Storybook for component documentation and previewing.
*   Jest for unit testing and component behavior verification.

## 2. Core Principles

*   **Maintainability**: Write code that is easy to understand, modify, and debug.
*   **Reusability**: Design components to be generic and adaptable to various contexts.
*   **Testability**: Ensure components are easily testable with comprehensive unit tests.
*   **Consistency**: Adhere to consistent coding style and architectural patterns.
*   **Performance**: Optimize components for efficient rendering and minimal overhead.

## 3. Language-Specific Guidelines

### TypeScript

*   **File Organization**:
    *   Each component should reside in its own directory under `src/components`.
    *   Each component directory should contain:
        *   `Component.tsx`: The React component.
        *   `Component.styles.ts`: styled-components styles.
        *   `Component.types.ts`: TypeScript type definitions.
        *   `Component.test.tsx`: Jest tests.
        *   `Component.stories.tsx`: Storybook stories.
*   **Import/Dependency Management**:
    *   Use absolute imports for internal modules (e.g., `import Button from 'components/button/Button';`).
    *   Group imports by origin (e.g., libraries, then internal modules).
    *   Sort imports alphabetically within each group.
*   **Error Handling**:
    *   Use TypeScript's type system to prevent errors at compile time.
    *   Handle potential runtime errors gracefully, using `try...catch` blocks where appropriate.
    *   Provide informative error messages.

### React

*   **File Organization**: Follow the file structure specified in TypeScript section.
*   **Component Structure**:
    *   Use functional components with hooks.
    *   Separate concerns into smaller, reusable components.
    *   Use prop types effectively for type safety.
*   **State Management**:
    *   Prefer local component state using `useState` for simple cases.
    *   Avoid global state management solutions initially; consider `useContext` for simple shared state.
*   **Error Handling**:
    *   Use `ErrorBoundary` components to catch and handle errors within component trees.

### Next.js

*   **File Organization**:
    *   Utilize the `pages` directory for route-based components (if needed in the future).
    *   Place API routes in the `pages/api` directory (if needed in the future).
    *   Use the `public` directory for static assets.
*   **Data Fetching**:
    *   Use `getStaticProps` or `getServerSideProps` for data fetching (if needed in the future).
*   **Error Handling**:
    *   Implement custom error pages (`pages/_error.js`).

### styled-components

*   **File Organization**:
    *   Define styles in separate `Component.styles.ts` files within each component directory.
    *   Use the `theme.ts` file in the `src/styles` directory to define global theme variables.
*   **Styling Conventions**:
    *   Use semantic class names.
    *   Avoid inline styles.
    *   Use theme variables for consistent styling across components.
    *   Use media queries for responsive design.

### Storybook

*   **File Organization**:
    *   Create stories for each component in the `Component.stories.tsx` file within each component directory.
*   **Story Conventions**:
    *   Write at least three stories per component: a basic story, a variation story, and an edge case story.
    *   Use the `Docs` and `Controls` addons to automatically generate documentation and interactive controls.
    *   Document each prop and its purpose.

### Jest

*   **File Organization**:
    *   Create test files for each component in the `Component.test.tsx` file within each component directory.
*   **Testing Conventions**:
    *   Write unit tests for all components.
    *   Aim for 80% test coverage.
    *   Use `@testing-library/react` for testing React components.
    *   Test component behavior, not implementation details.
    *   Mock external dependencies.

## 4. Code Style Rules

### MUST Follow:

*   **Naming Conventions**:
    *   Components: PascalCase (e.g., `Button`, `Input`).
    *   Variables/Functions: camelCase (e.g., `handleClick`, `inputValue`).
    *   Constants: UPPER_SNAKE_CASE (e.g., `DEFAULT_SIZE`).
    *   Files: PascalCase.tsx/ts (e.g., `Button.tsx`, `Button.styles.ts`).
    *   Rationale: Improves readability and maintainability.
*   **Code Formatting**:
    *   Use Prettier for automatic code formatting.
    *   Configure Prettier to use consistent indentation, line length, and spacing.
    *   Rationale: Ensures consistent code style across the project.
*   **Linting**:
    *   Use ESLint to enforce code style rules and prevent errors.
    *   Configure ESLint with recommended React and TypeScript rules.
    *   Rationale: Helps catch potential issues early and maintain code quality.
*   **Comments**:
    *   Write clear and concise comments to explain complex logic or non-obvious code.
    *   Use JSDoc-style comments for documenting components and functions.
    *   Rationale: Improves code understanding and maintainability.
*   **Type Safety**:
    *   Use TypeScript's type system to define types for all variables, function parameters, and component props.
    *   Avoid using `any` type unless absolutely necessary.
    *   Rationale: Prevents type-related errors at runtime and improves code reliability.
*   **Component Composition**:
    *   Favor composition over inheritance.
    *   Create small, reusable components that can be composed together to build more complex UIs.
    *   Rationale: Promotes code reusability and maintainability.
*   **State Management**:
    *   Use local component state (`useState`) for simple state management.
    *   Consider using `useContext` for sharing state between components.
    *   Rationale: Keeps state management simple and predictable.
*   **Error Handling**:
    *   Use `try...catch` blocks to handle potential runtime errors.
    *   Use `ErrorBoundary` components to catch and handle errors within component trees.
    *   Rationale: Prevents application crashes and provides a better user experience.
*   **Testing**:
    *   Write unit tests for all components.
    *   Aim for 80% test coverage.
    *   Use `@testing-library/react` for testing React components.
    *   Rationale: Ensures component functionality and prevents regressions.

#### Examples:

```typescript
// MUST: Consistent naming convention
const buttonStyle = styled.button`
  /* ...styles */
`;

// MUST: Type definitions for component props
interface ButtonProps {
  label: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
  return <button onClick={onClick}>{label}</button>;
};

export default Button;
```

```typescript
// MUST NOT: Using 'any' type without a valid reason
let myVariable: any; // Avoid this

// Instead, define a specific type:
let myVariable: string;
```

### MUST NOT Do:

*   **Direct DOM Manipulation**:
    *   Avoid directly manipulating the DOM using `document.getElementById` or similar methods.
    *   Use React's virtual DOM to update the UI.
    *   Rationale: Violates React's principles and can lead to performance issues.
*   **Mutating Props**:
    *   Never directly modify props passed to a component.
    *   Props should be treated as read-only.
    *   Rationale: Can lead to unexpected behavior and difficult-to-debug issues.
*   **Ignoring ESLint/Prettier Warnings/Errors**:
    *   Always address ESLint and Prettier warnings and errors.
    *   Rationale: These tools are in place to help you write better code.
*   **Skipping Tests**:
    *   Do not skip writing tests for components.
    *   Rationale: Tests ensure component functionality and prevent regressions.
*   **Hardcoding Values**:
    *   Avoid hardcoding values directly in components.
    *   Use theme variables or configuration files for consistent styling and behavior.
    *   Rationale: Makes it easier to update values across the application.
*   **Complex State Management**:
    *   Avoid introducing complex state management libraries (Redux, MobX) prematurely.
    *   Start with local component state or `useContext` and only introduce more complex solutions if necessary.
    *   Rationale: Keeps the application simple and reduces unnecessary complexity.
*   **Nested Ternary Operators**:
    *   Avoid deeply nested ternary operators, as they can be hard to read.
    *   Rationale: Improves code readability and maintainability.
*   **Long Component Files**:
    *   Avoid creating very long and complex component files.
    *   Break down large components into smaller, more manageable sub-components.
    *   Rationale: Improves code readability and maintainability.
*   **Over-commenting**:
    *   Avoid over-commenting. Code should be self-explanatory where possible.
    *   Rationale: Focus on writing clean, understandable code.

#### Examples:

```typescript
// MUST NOT: Direct DOM manipulation
const handleClick = () => {
  document.getElementById('myElement').innerHTML = 'Hello'; // Avoid this
};

// Instead, use React's state management:
const [text, setText] = React.useState('Initial Text');

const handleClick = () => {
  setText('Hello');
};
```

```typescript
// MUST NOT: Mutating props
const MyComponent: React.FC<{ value: string }> = (props) => {
  props.value = 'New Value'; // Avoid this
  return <div>{props.value}</div>;
};

// Instead, create a local state if you need to modify the value:
const MyComponent: React.FC<{ initialValue: string }> = (props) => {
  const [value, setValue] = React.useState(props.initialValue);
  return <div>{value}</div>;
};
```

## 5. Architecture Patterns

*   **Component/Module Structure**:
    *   Follow the Domain-Driven Organization Strategy.
    *   Separate components by type (e.g., `components/button`, `components/input`).
    *   Use a Layer-Based Architecture within each component directory (e.g., `Button.tsx`, `Button.styles.ts`, `Button.types.ts`).
    *   Include related features (tests, stories) within the component directory (e.g., `Button.test.tsx`, `Button.stories.tsx`).
    *   Manage shared components and utilities in the `shared` directory.
*   **Data Flow Patterns**:
    *   Data flows from parent components to child components via props.
    *   Child components can communicate with parent components via callbacks passed as props.
*   **State Management Conventions**:
    *   Start with local component state using `useState`.
    *   Consider using `useContext` for sharing state between components.
    *   Avoid complex state management solutions unless necessary.
*   **API Design Standards**:
    *   N/A - No external API

#### Examples:

```typescript
// MUST: Component directory structure
// src/components/button/Button.tsx
// src/components/button/Button.styles.ts
// src/components/button/Button.types.ts
// src/components/button/Button.test.tsx
// src/components/button/Button.stories.tsx
```

```typescript
// MUST: Prop drilling
// Parent component
const ParentComponent = () => {
  const [data, setData] = React.useState('Hello from Parent');

  return <ChildComponent data={data} />;
};

// Child component
const ChildComponent: React.FC<{ data: string }> = ({ data }) => {
  return <div>{data}</div>;
};
```
