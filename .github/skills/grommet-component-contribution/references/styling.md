# Styling & Theming Reference

## Accessing the Theme

```js
// Inside the component:
const { theme, passThemeFlag } = useThemeValue();

// Spread passThemeFlag onto every styled component instance:
<StyledMyComponent {...passThemeFlag} {...rest} />
```

Never use `useContext(ThemeContext)` directly — always use `useThemeValue()`.

## Styled Component Pattern

```js
import styled, { css } from 'styled-components';
import {
  genericStyles,
  styledComponentsConfig,
  normalizeColor,
} from '../../utils';
import { disabledStyle, readOnlyStyle } from '../../utils';

const StyledMyComponent = styled.div.withConfig(styledComponentsConfig)`
  color: ${({ theme }) => normalizeColor(theme.myComponent.color, theme)};
  padding: ${({ theme }) => theme.global.edgeSize[theme.myComponent.pad]};

  ${({ disabled }) => disabled && css`${disabledStyle}`}
  ${({ readOnly }) => readOnly && css`${readOnlyStyle}`}

  ${genericStyles}
`;
```

- `styledComponentsConfig` — import from `../../utils`; prevents non-DOM props from leaking to the DOM element
- `genericStyles` — appended **last**; adds layout props (`margin`, `alignSelf`, `gridArea`) when the component uses `genericProps`
- `normalizeColor(color, theme)` — resolves a Grommet color name or hex string to a CSS value
- `css` template tag — use for conditional style blocks to maintain proper interpolation

## Theme Token Namespace

Add tokens under `theme.<componentName>` at the **top level** of `base.js` (alphabetical order):

```js
// src/js/themes/base.js — add in alphabetical position
myComponent: {
  color: 'text',
  pad: 'small',
  border: {
    color: 'border',
    size: 'xsmall',
  },
},
```

Mirror the shape in `base.d.ts` as a TypeScript interface.

**Do not** nest under `theme.global.myComponent` — all component tokens live at the top level.

**Do not** add hardcoded fallbacks (`theme.foo ?? '#000'`) — this silently hides missing tokens from users with custom themes. Only add a fallback when explicitly migrating from an older token shape.

## Disabled & ReadOnly States

```js
import { disabledStyle, readOnlyStyle } from '../../utils';

// In a styled component:
${({ disabled }) => disabled && disabledStyle()}
${({ readOnly }) => readOnly && readOnlyStyle()}
```

Never write custom CSS for disabled or readOnly — always use these helpers for consistency.

## Global Focus Styling

Global focus styles come from `theme.global.focus.focusStyle`. Do not write custom focus CSS in component-level styled components.

## Sizing & Spacing

- T-shirt sizes: `xsmall`, `small`, `medium`, `large`, `xlarge` — reference theme tokens, not hardcoded pixels
- Use `pad` (not `padding`) and `margin` as prop names
- Object syntax for complex spacing: `pad={{ horizontal: 'small', vertical: 'medium' }}`
- Use `background` (not `backgroundColor`); use `color` for text/icon colors

## Composing with Grommet Primitives

Prefer Grommet's existing atoms over raw HTML:

| Need | Use |
|------|-----|
| Layout / wrapping | `<Box>` |
| Typography | `<Text>` |
| Interactive control | `<Button>` |
| Navigation | `<Anchor>` |
| Iconography | `grommet-icons` package |

Do not use raw `<svg>` elements or inline `style={{}}` attributes. Always allow icon override via theme token.
