# ⚡ MBSW UI Kit - 빠른 시작 가이드

5분 내에 MBSW UI Kit를 시작할 수 있는 최소 필수 설정 가이드입니다.

## 🚀 설치

```bash
npm install mbsw-ui-kit styled-components
# 또는
yarn add mbsw-ui-kit styled-components

# TypeScript 사용시
npm install --save-dev @types/styled-components
```

## 🎨 기본 설정

### 1. 테마 설정 (필수)

```tsx
// App.tsx
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle, lightTheme } from 'mbsw-ui-kit';

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyle />
      <div>
        {/* 앱 콘텐츠 */}
      </div>
    </ThemeProvider>
  );
}

export default App;
```

## 🔥 첫 번째 컴포넌트

```tsx
import { Button, Input, Card, CardContent } from 'mbsw-ui-kit';

function MyFirstComponent() {
  return (
    <Card>
      <CardContent>
        <h2>환영합니다!</h2>
        <Input label="이메일" type="email" placeholder="email@example.com" />
        <Button variant="primary" fullWidth style={{ marginTop: '16px' }}>
          시작하기
        </Button>
      </CardContent>
    </Card>
  );
}
```

## 📋 5분 체크리스트

- [ ] `mbsw-ui-kit`와 `styled-components` 설치
- [ ] `ThemeProvider`로 앱 감싸기
- [ ] `GlobalStyle` 추가
- [ ] 첫 번째 `Button` 컴포넌트 사용
- [ ] 브라우저에서 정상 작동 확인

## 🎯 다음 단계

1. **더 많은 컴포넌트 사용해보기**
   ```tsx
   import { Modal, Table, LoadingSpinner, ValidatedInput } from 'mbsw-ui-kit';
   ```

2. **다크모드 추가하기**
   ```tsx
   import { darkTheme } from 'mbsw-ui-kit';
   const [isDark, setIsDark] = useState(false);
   <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
   ```

3. **폼 검증 사용하기**
   ```tsx
   import { VALIDATION_PRESETS } from 'mbsw-ui-kit';
   <ValidatedInput validation={VALIDATION_PRESETS.email} />
   ```

## 💡 도움이 필요하신가요?

- 📖 [상세 사용 가이드](./USAGE_GUIDE.md)
- 🔖 [API 문서](./COMPONENT_API_REFERENCE.md)
- 🎨 [Storybook 예시](http://localhost:6006) (`npm run storybook`)

---

**🎉 축하합니다!** MBSW UI Kit를 성공적으로 설정했습니다.