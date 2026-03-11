# Phase 0: Infrastructure (Weeks 1–2)

All items in this phase are **hard blockers** — no component migration can begin until
these are complete.

---

## 0.1 Vite Library Mode Build Config

Replace the current Babel/webpack `dist/` and `dist-es6/` pipeline.

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react(), vanillaExtractPlugin()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/js/index.js'),
      name: 'Grommet',
      formats: ['es', 'cjs'],
      fileName: (format) => `grommet.${format === 'es' ? 'mjs' : 'cjs'}`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'grommet-icons'],
      output: {
        globals: { react: 'React', 'react-dom': 'ReactDOM' },
        preserveModules: true,
        preserveModulesRoot: 'src/js',
      },
    },
  },
});
```

**Checklist:**

- [ ] Remove `webpack.config.js` and Babel dist pipeline
- [ ] Add `vite.config.ts`
- [ ] Verify `@vanilla-extract/vite-plugin` processes `.css.ts` files
- [ ] Verify dual ESM + CJS output
- [ ] Verify tree-shaking with a sample consumer app
- [ ] Update `package.json` `main`, `module`, `exports` fields

> **Rollback**: If VE + Vite cannot be made to work, fall back to
> `@vanilla-extract/rollup-plugin` with the existing Rollup config as a
> lower-risk alternative.

---

## 0.2 `GrommetThemeContext` — Custom React Context

Replace styled-components' `ThemeContext` with Grommet's own `React.createContext()`.

**New file:**

```javascript
// src/js/contexts/ThemeContext/index.js
import React from 'react';
import { deepMerge } from '../../utils/deepMerge';

const GrommetThemeContext = React.createContext({});

// Backward-compatible: ThemeContext.Extend re-implemented as context Provider wrapper
GrommetThemeContext.Extend = ({ value, children }) => (
  <GrommetThemeContext.Consumer>
    {(existingTheme) => (
      <GrommetThemeContext.Provider value={deepMerge(existingTheme, value)}>
        {children}
      </GrommetThemeContext.Provider>
    )}
  </GrommetThemeContext.Consumer>
);

export { GrommetThemeContext as ThemeContext };
export default GrommetThemeContext;
```

**Changes to existing files:**

```javascript
// src/js/utils/useThemeValue.js
// Before:
import { useContext } from 'react';
import { ThemeContext } from 'styled-components';

// After:
import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
```

```javascript
// src/js/components/Grommet/Grommet.js
// Before:
import { ThemeProvider } from 'styled-components';
// <ThemeProvider theme={mergedTheme}>

// After:
import { ThemeContext } from '../../contexts/ThemeContext';
// <ThemeContext.Provider value={mergedTheme}>
```

**Checklist:**

- [ ] Create `src/js/contexts/ThemeContext/index.js`
- [ ] Update `useThemeValue()` — remove styled-components import
- [ ] Update `Grommet.js` — replace `ThemeProvider` with `ThemeContext.Provider`
- [ ] Verify `ThemeContext.Extend` works with existing consumer tests
- [ ] Verify `Box`/`Layer`/`Drop` theme re-provision still works

---

## 0.3 Static VE Theme Contract

Pre-compute `generate(24, 6)` into Vanilla Extract files.

```typescript
// src/js/themes/grommet/theme.contract.css.ts
import { createThemeContract } from '@vanilla-extract/css';

export const vars = createThemeContract({
  color: {
    brand: null,
    background: null,
    text: null,
    // ... all ~230 tokens
  },
  space: {
    xsmall: null,
    small: null,
    medium: null,
    large: null,
    xlarge: null,
  },
  font: {
    size: { small: null, medium: null, large: null },
    weight: { normal: null, bold: null },
    family: null,
  },
  // ... full coverage for all 79 components
});
```

```typescript
// src/js/themes/grommet/grommet.theme.css.ts
import { createTheme } from '@vanilla-extract/css';
import { vars } from './theme.contract.css';

export const grommetTheme = createTheme(vars, {
  color: {
    brand: '#7D4CDB',
    background: '#FFFFFF',
    text: '#444444',
    // ... pre-computed from generate(24, 6)
  },
  space: {
    xsmall: '6px', // 24 * 0.25
    small: '12px', // 24 * 0.5
    medium: '24px', // 24
    large: '48px', // 24 * 2
    xlarge: '96px', // 24 * 4
  },
  // ...
});
```

**`generate()` shim:**

```javascript
// src/js/themes/base.js  (updated)
export const generate = (baseSpacing = 24, scale = 6) => {
  if (
    process.env.NODE_ENV !== 'production' &&
    (baseSpacing !== 24 || scale !== 6)
  ) {
    console.warn(
      '[grommet] generate(baseSpacing, scale) with custom arguments no longer ' +
        'affects CSS output. CSS tokens are pre-compiled from generate(24, 6). ' +
        'Runtime JS overrides from the returned object still apply via ' +
        'GrommetThemeContext for non-CSS values. ' +
        'See the migration guide for alternatives.',
    );
  }
  // ... existing math, unchanged — still returns JS object for deepMerge
};
```

**Checklist:**

- [ ] Create `theme.contract.css.ts` with full token coverage (all 79 components)
- [ ] Create `grommet.theme.css.ts` with pre-computed `generate(24, 6)` values
- [ ] Add dev-mode warning to `generate()` for custom args
- [ ] Verify `deepMerge` overrides still flow through context correctly

---

## 0.4 Shared CSS Utility Migration

These utilities are imported by all 79 components — they must be migrated before any
individual component can be fully migrated.

| File                  | Current                    | After                                     |
| --------------------- | -------------------------- | ----------------------------------------- |
| `utils/styles.js`     | `css` template literals    | VE `style()` / `styleVariants()`          |
| `utils/background.js` | SC interpolation functions | VE `style()` + runtime `normalizeColor()` |
| `utils/animation.js`  | `keyframes` from SC        | VE `keyframes()`                          |
| `utils/border.js`     | `css` template literals    | VE `style()`                              |

**Checklist:**

- [ ] Migrate `utils/styles.js`
- [ ] Migrate `utils/background.js`
- [ ] Migrate `utils/animation.js`
- [ ] Migrate `utils/border.js`
- [ ] Run existing utility unit tests — all must pass

---

## 0.5 Shared Internal Utilities

New utilities added during Phase 0 to support all component migrations.

**`cx` — class name helper** (replaces `clsx` — no new dependency):

```javascript
// src/js/utils/classes.js

// Merges two or more class name strings, filtering out falsy values.
// Used by all migrated components to combine VE recipe output with
// consumer-supplied className props.
// No external dependency — grommet does not use clsx or classnames.
export const cx = (...args) => args.filter(Boolean).join(' ');
```

**`resolveExtend` — backward-compat shim for `theme.X.extend`:**

```javascript
// src/js/utils/extend.js

export function resolveExtend(extend, props) {
  if (!extend) return undefined;

  const resolved =
    typeof extend === 'function'
      ? extend(props)
      : Array.isArray(extend)
      ? extend.map((p) => (typeof p === 'function' ? p(props) : p)).join('')
      : String(extend);

  // Detect and warn about rules that cannot be expressed via the style prop.
  if (process.env.NODE_ENV !== 'production') {
    const hasPseudo = /&[\w\s:[\]()>+~*,]+\s*\{/.test(resolved);
    const hasAtRule = /@[\w-]+/.test(resolved);
    const detected = [
      ...(hasPseudo ? ['pseudo-selectors'] : []),
      ...(hasAtRule ? ['@-rules'] : []),
    ];

    if (detected.length > 0) {
      console.warn(
        `[grommet] theme.X.extend contains ${detected.join(' and ')} ` +
          `which cannot be applied via the style prop shim and have been dropped. ` +
          `Migrate to the className prop instead. ` +
          `See the migration guide: [link]`,
      );
    } else {
      console.warn(
        `[grommet] theme.X.extend is deprecated. ` +
          `Use the className prop instead. ` +
          `See the migration guide: [link]`,
      );
    }
  }

  return parseCssStringToObject(resolved);
}

// Parses flat CSS declarations (property: value pairs).
// Does NOT support nested rules, pseudo-selectors, or @-rules —
// those are detected and warned about above before this is called.
// Values containing colons (e.g. rgb(), url()) are handled correctly.
function parseCssStringToObject(cssString) {
  if (!cssString) return undefined;
  return cssString
    .split(';')
    .filter(Boolean)
    .reduce((acc, declaration) => {
      const [prop, ...valueParts] = declaration.split(':');
      if (prop && valueParts.length) {
        const camelProp = prop
          .trim()
          .replace(/-([a-z])/g, (_, c) => c.toUpperCase());
        acc[camelProp] = valueParts.join(':').trim();
      }
      return acc;
    }, {});
}
```

**Checklist:**

- [ ] Add `src/js/utils/classes.js` with `cx` helper
- [ ] Add `src/js/utils/extend.js` with `resolveExtend` helper
- [ ] Unit test `cx` — falsy filtering, multiple args, undefined className
- [ ] Unit test `resolveExtend` — string, function, array, pseudo-selector detection

---

## 0.6 Test Infrastructure

**Checklist:**

- [ ] Remove `jest-styled-components` from `devDependencies`
- [ ] Add VE style mock proxy to `jest.config.js`
- [ ] Establish snapshot regeneration process for CI
- [ ] Confirm all existing tests pass with new context (no SC dependency in test setup)
