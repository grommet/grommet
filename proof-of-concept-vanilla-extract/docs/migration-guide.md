# Migrating to Grommet v3.0.0

## 1. Remove styled-components

styled-components is no longer a peer dependency of grommet.

```bash
npm uninstall styled-components
```

---

## 2. Migrate theme.X.extend to className

### Before:

```js
const theme = {
  button: {
    extend: `
      font-weight: bold;
      &:hover { background: cadetblue; }
    `,
  },
};
```

### After — create a .css.ts file in your app:

```typescript
// myApp/overrides/button.css.ts
import { style } from '@vanilla-extract/css';

export const myButton = style({
  fontWeight: 'bold',
  selectors: {
    '&:hover': { background: 'cadetblue' },
  },
});
```

```tsx
<Button className={myButton} label="Save" />
```

---

## 3. generate() with custom arguments

`generate(baseSpacing, scale)` with custom arguments no longer affects CSS output.
The returned JS object can still be passed via `deepMerge` for runtime overrides.

```js
// Still works for JS-resolved values:
const myTheme = deepMerge(grommet, generate(20, 5));
<Grommet theme={myTheme}>

// CSS spacing/sizing tokens will NOT reflect custom generate() args.
```
