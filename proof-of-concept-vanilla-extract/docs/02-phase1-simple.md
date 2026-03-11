# Phase 1: Simple Components (Weeks 2–4, ~20 components)

**Target components:**

| Group      | Components                                                |
| ---------- | --------------------------------------------------------- |
| Typography | Text, Heading, Paragraph                                  |
| Media      | Image, Avatar                                             |
| Indicators | Tag, Spinner                                              |
| Navigation | Anchor, SkipLink, Nav, Header, Footer, Main, Sidebar      |
| Layout     | Card, CardBody, CardFooter, CardHeader, Page, PageContent |

---

## Per-Component Migration Pattern

```
src/js/components/Text/
  ├── StyledText.js          ← DELETE
  ├── Text.js                ← UPDATE (remove SC import, add className prop)
  ├── text.css.ts            ← ADD (VE recipe)
  └── __tests__/Text-test.js ← UPDATE (regenerate snapshots)
```

---

## VE Recipe Pattern

```typescript
// src/js/components/Text/text.css.ts
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '../../themes/grommet/theme.contract.css';

export const textRecipe = recipe({
  base: {
    fontFamily: vars.font.family,
    color: vars.color.text,
  },
  variants: {
    size: {
      small: { fontSize: vars.font.size.small },
      medium: { fontSize: vars.font.size.medium },
      large: { fontSize: vars.font.size.large },
    },
    weight: {
      normal: { fontWeight: vars.font.weight.normal },
      bold: { fontWeight: vars.font.weight.bold },
    },
    truncate: {
      true: {
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
      },
    },
  },
  defaultVariants: {
    size: 'medium',
    weight: 'normal',
  },
});
```

---

## Component Update Pattern

```jsx
// src/js/components/Text/Text.js
import { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';
import { cx } from '../../utils/classes';
import { resolveExtend } from '../../utils/extend';
import { textRecipe } from './text.css';

const Text = ({ size, weight, truncate, className, ...rest }) => {
  const theme = useContext(ThemeContext);

  // Backward-compat shim — emits dev warning if extend is used
  const extendStyle = resolveExtend(theme.text?.extend, { size, theme });

  return (
    <span
      className={cx(textRecipe({ size, weight, truncate }), className)}
      style={extendStyle}
      {...rest}
    />
  );
};
```

---

## Phase 1 Checklist

- [ ] Text
- [ ] Heading
- [ ] Paragraph
- [ ] Image
- [ ] Avatar
- [ ] Tag
- [ ] Spinner
- [ ] SkipLink
- [ ] Anchor
- [ ] Nav / Header / Footer / Main / Sidebar
- [ ] Card / CardBody / CardFooter / CardHeader
- [ ] Page / PageContent

> **Escape hatch**: Unmigrated components can continue to use their existing
> `StyledX.js` files updated to import from the new `GrommetThemeContext` instead
> of styled-components' context. This allows a partial migration to ship if
> any component stalls.
