# Grommet Component Styling Reference

## Accessing the Theme in a Component

```js
import { useThemeValue } from '../../utils/useThemeValue';

const MyComponent = forwardRef(({ ...rest }, ref) => {
  const { theme, passThemeFlag } = useThemeValue();

  return (
    <StyledMyComponent
      ref={ref}
      {...passThemeFlag}  // required — propagates theme to styled component
      {...rest}
    />
  );
});
```

## Styled Component Pattern

```js
import styled, { css } from 'styled-components';
import {
  genericStyles,
  normalizeColor,
  styledComponentsConfig,
} from '../../utils';
import { disabledStyle, readOnlyStyle } from '../../utils';

const StyledMyComponent = styled.div.withConfig(styledComponentsConfig)`
  box-sizing: border-box;

  color: ${({ theme }) => normalizeColor(theme.myComponent.color, theme)};
  background: ${({ theme }) =>
    normalizeColor(theme.myComponent.background, theme)};

  ${({ size, theme }) => {
    const data = theme.myComponent.size?.[size] ?? theme.myComponent.size?.medium;
    return data ? css`font-size: ${data.size}; line-height: ${data.height};` : '';
  }}

  ${({ disabled }) => disabled && disabledStyle()}
  ${({ readOnly }) => readOnly && readOnlyStyle()}

  &:hover {
    ${({ theme }) => css`
      color: ${normalizeColor(theme.myComponent.hover?.color, theme)};
    `}
  }

  ${genericStyles}
`;
```

Key points:
- `styledComponentsConfig` — prevents non-DOM props (`colorProp`, `hasIcon`, custom booleans) from leaking to the DOM
- `genericStyles` — **always last**; injects `margin`, `alignSelf`, `gridArea` when the component accepts layout props
- `normalizeColor(value, theme)` — resolves Grommet color names (`'brand'`, `'text-weak'`) and hex values to CSS
- `css` template tag — use for conditional style blocks to preserve styled-components' interpolation semantics

## Theme Token Registration

### base.js (alphabetical position)

```js
myComponent: {
  background: 'background-front',
  color: 'text',
  pad: 'small',
  border: {
    color: 'border',
    size: 'xsmall',
    radius: '4px',
  },
  hover: {
    color: 'text-strong',
  },
  size: {
    small: { size: '14px', height: '20px' },
    medium: { size: '18px', height: '24px' },
    large: { size: '22px', height: '28px' },
  },
},
```

### base.d.ts (mirror the shape)

```ts
myComponent?: {
  background?: BackgroundType;
  color?: ColorType;
  pad?: PadType;
  border?: BorderType;
  hover?: { color?: ColorType };
  size?: {
    [key: string]: { size?: string; height?: string };
  };
};
```

## Disabled & ReadOnly States

Import and use the helpers — never write custom CSS for these:

```js
import { disabledStyle, readOnlyStyle } from '../../utils';

// In a styled component:
${({ disabled }) => disabled && disabledStyle()}
${({ readOnly }) => readOnly && readOnlyStyle()}
```

## T-Shirt Sizing

Reference theme tokens instead of hardcoded pixels:

```js
// Correct:
padding: ${({ theme }) => theme.global.edgeSize[theme.myComponent.pad]};
font-size: ${({ size, theme }) => theme.text[size ?? 'medium'].size};

// Incorrect:
padding: 8px;
font-size: 14px;
```

## Composing with Grommet Primitives

| Avoid | Prefer |
|-------|--------|
| `<div>` for layout | `<Box>` |
| `<span>` for text | `<Text>` |
| `<button>` for actions | `<Button>` |
| `<a>` for navigation | `<Anchor>` |
| Raw `<svg>` elements | `grommet-icons` |
| `style={{}}` | Styled-component props |
