# Grommet → Vanilla Extract Migration Plan

**Date**: March 11, 2026  
**Branch**: `copilot-help-vanilla-extract`  
**Status**: Approved — ready for execution  
**Version target**: Major version bump (breaking change release)

---

## Decisions (Finalized)

| #   | Question                 | Decision                                                                                                              |
| --- | ------------------------ | --------------------------------------------------------------------------------------------------------------------- |
| 1   | Distribution build tool  | **Vite library mode**                                                                                                 |
| 2   | Runtime theme strategy   | **Option A** — custom `GrommetThemeContext` (React context)                                                           |
| 3   | `generate()` deprecation | **Keep working** (returns JS object for `deepMerge`); remove effect on VE CSS output; dev-mode warning on custom args |
| 4   | `ThemeContext.Extend`    | **Keep for Phase 1** — re-implemented as wrapper around new context                                                   |
| 5   | Backward compatibility   | **Yes, ~90%** — exceptions documented in breaking changes table                                                       |

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│  Consumer App                                               │
│                                                             │
│  <Grommet theme={deepMerge(grommet, customTokens)}>         │
│    <GrommetThemeContext.Provider value={mergedTheme}>       │
│      <Component className={recipe(...)} style={extendShim}> │
│    </GrommetThemeContext.Provider>                           │
│  </Grommet>                                                 │
└─────────────────────────────────────────────────────────────┘

Runtime (Option A — Phase 1):
  - GrommetThemeContext  →  plain React.createContext()
  - normalizeColor()     →  unchanged, reads from context
  - VE CSS              →  static, pre-compiled from generate(24, 6)
  - theme.X.extend      →  degraded shim via inline style + dev warning

Long-term target (Option B — Post Phase 1):
  - All tokens           →  CSS custom properties via createTheme()
  - Dark/light mode      →  CSS class swap on root element
  - normalizeColor()     →  removed from runtime bundle
  - SVG components       →  currentColor + CSS variable references
```

---

## Phase 0: Infrastructure (Weeks 1–2)

All items in this phase are **hard blockers** — no component migration can begin until
these are complete.

### 0.1 Vite Library Mode Build Config

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

---

### 0.2 `GrommetThemeContext` — Custom React Context

Replace styled-components' `ThemeContext` with Grommet's own `React.createContext()`.

**New file:**

```javascript
// src/js/contexts/ThemeContext/index.js
import React from 'react';

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

### 0.3 Static VE Theme Contract

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

export const grometTheme = createTheme(vars, {
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

### 0.4 Shared CSS Utility Migration

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

### 0.5 Test Infrastructure

**Checklist:**

- [ ] Remove `jest-styled-components` from `devDependencies`
- [ ] Add VE style mock proxy to `jest.config.js`
- [ ] Establish snapshot regeneration process for CI
- [ ] Confirm all existing tests pass with new context (no SC dependency in test setup)

---

## Phase 1: Simple Components (Weeks 2–4, ~20 components)

**Target components:**

| Group      | Components                                                |
| ---------- | --------------------------------------------------------- |
| Typography | Text, Heading, Paragraph                                  |
| Media      | Image, Avatar                                             |
| Indicators | Tag, Spinner                                              |
| Navigation | Anchor, SkipLink, Nav, Header, Footer, Main, Sidebar      |
| Layout     | Card, CardBody, CardFooter, CardHeader, Page, PageContent |

**Per-component migration pattern:**

```
src/js/components/Text/
  ├── StyledText.js          ← DELETE
  ├── Text.js                ← UPDATE (remove SC import, add className prop)
  ├── text.css.ts            ← ADD (VE recipe)
  └── __tests__/Text-test.js ← UPDATE (regenerate snapshots)
```

**VE recipe pattern:**

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

**Component update pattern:**

```jsx
// src/js/components/Text/Text.js
import { clsx } from 'clsx';
import { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';
import { resolveExtend } from '../../utils/extend';
import { textRecipe } from './text.css';

const Text = ({ size, weight, truncate, className, ...rest }) => {
  const theme = useContext(ThemeContext);

  // Degraded backward-compat shim — emits dev warning
  const extendStyle = resolveExtend(theme.text?.extend, { size, theme });

  return (
    <span
      className={clsx(textRecipe({ size, weight, truncate }), className)}
      style={extendStyle}
      {...rest}
    />
  );
};
```

**`resolveExtend` helper:**

```javascript
// src/js/utils/extend.js
export function resolveExtend(extend, props) {
  if (!extend) return undefined;

  if (process.env.NODE_ENV !== 'production') {
    console.warn(
      `[grommet] theme.X.extend is deprecated. ` +
        `Use the className prop instead. ` +
        `Note: pseudo-selectors and media queries in extend are not supported.`,
    );
  }

  const resolved =
    typeof extend === 'function'
      ? extend(props)
      : Array.isArray(extend)
      ? extend.map((p) => (typeof p === 'function' ? p(props) : p)).join('')
      : String(extend);

  return parseCssStringToObject(resolved);
}

// Parses simple "prop: value; prop: value;" strings only.
// Pseudo-selectors and media queries are silently dropped.
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

**Phase 1 checklist:**

- [ ] Text
- [ ] Heading
- [ ] Paragraph
- [ ] Image
- [ ] Avatar
- [ ] Tag
- [ ] Spinner
- [ ] SkipLink
- [ ] Anchor
- [ ] Nav
- [ ] Header
- [ ] Footer
- [ ] Main
- [ ] Sidebar
- [ ] Card / CardBody / CardFooter / CardHeader
- [ ] Page / PageContent

---

## Phase 2: Medium Components (Weeks 4–7, ~35 components)

**Target components:**

| Group        | Components                                                     |
| ------------ | -------------------------------------------------------------- |
| Interaction  | Button _(use POC directly)_, CheckBox, RadioButton, RangeInput |
| Layout       | Box _(largest — see note)_, Grid, Stack, Collapsible           |
| Navigation   | Tabs, Tab, Pagination                                          |
| Data display | List, Meter, Notification, Tip                                 |
| Charts       | Chart, Diagram                                                 |
| Other        | Accordion, WorldMap _(begin Option B path)_                    |

> **Box note**: Box is the largest migration in the entire codebase.
> It has 25+ interpolation functions, dynamic background resolution,
> responsive breakpoints, gap handling, and animation support.
> Allocate at least 3 days dedicated to Box alone.

**Button:**

The POC `Button.vanilla.tsx` is production-ready. Use it directly as the Phase 2
starting point — no re-work required.

**Phase 2 checklist:**

- [ ] Button _(promote POC)_
- [ ] Box
- [ ] Grid
- [ ] Stack
- [ ] Collapsible
- [ ] Accordion
- [ ] CheckBox
- [ ] RadioButton
- [ ] RangeInput
- [ ] Tabs / Tab
- [ ] Pagination
- [ ] List
- [ ] Meter
- [ ] Notification
- [ ] Tip
- [ ] Chart _(begin Option B: currentColor)_
- [ ] Diagram _(begin Option B: CSS variables)_
- [ ] WorldMap _(begin Option B)_

---

## Phase 3: Complex Components (Weeks 7–9, ~24 components)

**Target components:**

| Group     | Components                                                   |
| --------- | ------------------------------------------------------------ |
| Forms     | Form, FormField, TextInput, TextArea, MaskedInput, FileInput |
| Selects   | Select, SelectMultiple                                       |
| Date/Time | DateInput, Calendar                                          |
| Overlay   | Layer, Drop, Menu                                            |
| Data      | DataTable, DataChart, Distribution                           |
| Media     | Carousel, Video                                              |
| Utility   | Skeleton                                                     |

**Special cases:**

**Layer / Drop**: These re-provide the theme context with `dark` toggled when
background changes. The `GrommetThemeContext.Provider` re-wrap pattern must be
verified for correctness.

```jsx
// Pattern for Layer dark-region re-provision
<ThemeContext.Provider value={{ ...theme, dark: backgroundIsDark }}>
  {children}
</ThemeContext.Provider>
```

**SVG/canvas components (Option B migration)**:

For `Chart`, `Diagram`, `WorldMap`, `DataChart`, `Distribution` — begin replacing
explicit `fill` / `stroke` hex attribute values with `currentColor` and CSS custom
property references where the SVG rendering engine allows it.

```jsx
// Before (SC runtime):
<circle fill={normalizeColor('brand', theme)} />

// After (Option B target):
<circle fill="currentColor" style={{ color: vars.color.brand }} />
// or, where SVG supports it:
<circle fill={`var(${vars.color.brand})`} />
```

**Phase 3 checklist:**

- [ ] Form / FormField
- [ ] TextInput / TextArea / MaskedInput / FileInput
- [ ] Select / SelectMultiple
- [ ] DateInput / Calendar
- [ ] Layer
- [ ] Drop
- [ ] Menu
- [ ] DataTable
- [ ] DataChart / Distribution
- [ ] Carousel / Video
- [ ] Skeleton

---

## Phase 4: Release (Week 10)

### Dependency Cleanup

```json
// package.json changes
{
  "peerDependencies": {
    // REMOVE: "styled-components": ">=5"
    "react": ">=18",
    "react-dom": ">=18"
  },
  "devDependencies": {
    // REMOVE: "jest-styled-components"
    // REMOVE: "babel-plugin-styled-components"
  },
  "dependencies": {
    // REMOVE: "@emotion/is-prop-valid"
    // REMOVE: "styled-components" (if present as direct dep)
  }
}
```

**Checklist:**

- [ ] Remove `styled-components` from `peerDependencies`
- [ ] Remove `@emotion/is-prop-valid`
- [ ] Remove `babel-plugin-styled-components`
- [ ] Remove `jest-styled-components`
- [ ] Remove `externals: { 'styled-components': 'styled' }` from any remaining config
- [ ] Verify `styled-components` is not imported anywhere in `src/`
- [ ] Full test suite green
- [ ] Bundle size audit — confirm ~35–40kB reduction
- [ ] Consumer app smoke test

### Documentation

- [ ] Write `MIGRATION_GUIDE.md` (see template below)
- [ ] Update `README.md` — remove SC references
- [ ] Update Storybook — remove SC decorator
- [ ] Changelog entry

### Release

- [ ] Major version bump
- [ ] Beta release tag
- [ ] Announce to known ecosystem consumers (HPE Aries etc.)
- [ ] Stable release after 2-week beta soak

---

## Breaking Changes Reference

| Change                                                                  | Affected consumers                                 | Mitigation                                                  |
| ----------------------------------------------------------------------- | -------------------------------------------------- | ----------------------------------------------------------- |
| `styled-components` no longer a peer dependency                         | All consumers                                      | Remove from app's dependencies — see migration guide        |
| `theme.X.extend` pseudo-selectors / media queries silently ignored      | Consumers using complex `extend`                   | Dev warning emitted; use `className` prop instead           |
| `theme.X.extend` deprecated                                             | All consumers using `extend`                       | Dev warning points to `className` prop migration            |
| `generate(customBaseSpacing, customScale)` no longer affects CSS output | Ecosystem forks (HPE Aries etc.)                   | Dev warning; JS object still returned for context overrides |
| `ThemeContext` no longer re-exports styled-components' context          | Consumers using SC-specific APIs on `ThemeContext` | Document in release notes                                   |
| `passThemeFlag` pattern eliminated                                      | Internal only                                      | No consumer impact                                          |

---

## Backward Compatibility

### What works unchanged (~90% of consumers)

- `import { ThemeContext } from 'grommet/contexts'` — same shape, new implementation
- `<ThemeContext.Extend value={...}>` — re-implemented, identical API
- `generate()` called with defaults — still exported, still callable, still returns
  merge-able JS object
- `deepMerge(grommet, customTokens)` theme overrides — still work via runtime context
- All component props — unchanged
- `theme.X.extend` simple string values — shim applies as inline style

### What breaks (~10% of consumers)

- `theme.X.extend` with pseudo-selectors or media queries — silently ignored
  _(shim limitation — `style` prop cannot express these)_
- Direct use of styled-components APIs on `ThemeContext` — SC context no longer underlies it
- Apps listing `styled-components` as a peer requirement

---

## Consumer Migration Guide Template

```markdown
# Migrating to Grommet vX.0.0

## 1. Remove styled-components

styled-components is no longer a peer dependency of grommet.

\`\`\`bash
npm uninstall styled-components
\`\`\`

## 2. Migrate theme.X.extend to className

Before:
\`\`\`js
const theme = {
button: {
extend: `     font-weight: bold;
      &:hover { background: cadetblue; }
  `
}
}
\`\`\`

After — create a .css.ts file in your app:
\`\`\`typescript
// myApp/overrides/button.css.ts
import { style } from '@vanilla-extract/css';

export const myButton = style({
fontWeight: 'bold',
selectors: { '&:hover': { background: 'cadetblue' } },
});
\`\`\`

\`\`\`tsx
// Usage
<Button className={myButton} label="Save" />
\`\`\`

## 3. generate() with custom arguments

If you called generate(baseSpacing, scale) with custom arguments,
the returned JS object can still be passed via deepMerge for runtime
overrides, but it no longer affects the pre-compiled CSS output.

\`\`\`js
// Still works for JS-resolved values (colors, etc.):
const myTheme = deepMerge(grommet, generate(20, 5));
<Grommet theme={myTheme}>

// CSS spacing/sizing tokens will NOT reflect custom generate() args.
// See: [link to code-gen script — Phase 2 deliverable]
\`\`\`
```

---

## Performance Expectations

| Metric               | Option A (Phase 1)                                | Option B (Long-term)                 |
| -------------------- | ------------------------------------------------- | ------------------------------------ |
| Consumer bundle      | ~35–40kB smaller (SC removed)                     | ~55–65kB smaller (+ base.js removed) |
| Grommet own bundle   | ~20–30% smaller                                   | ~45–55% smaller                      |
| Per-render CPU       | Significant reduction                             | Maximum reduction                    |
| Initial paint        | Moderate improvement                              | Large improvement                    |
| Memory               | Moderate reduction                                | Large reduction                      |
| Re-render speed      | Large improvement (class lookup vs. 25 functions) | Maximum improvement                  |
| SSR / RSC compatible | No (React context)                                | Yes (no context required)            |

> Option A delivers meaningful real-world improvements immediately.
> Option B numbers assume SVG components fully migrated to `currentColor` + CSS vars,
> and `normalizeColor` removed from runtime bundle.

---

## Resources

- [POC Button](./button.css.ts)
- [POC Theme Contract](./theme.contract.css.ts)
- [POC Theme Implementation](./grommet.theme.css.ts)
- [POC Migrated Button Component](./Button.vanilla.tsx)
- [Build Config Notes](./BUILD_CONFIG.md)
- [Architecture Comparison](./COMPARISON.md)
- [Original POC Summary](./SUMMARY.md)
- [Plan Review Summary](./PLAN_REVIEW_SUMMARY.md)
- [Vanilla Extract Docs](https://vanilla-extract.style/)
