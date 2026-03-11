# Vanilla Extract Migration: Plan Review Summary

**Date**: March 11, 2026  
**Branch**: `copilot-help-vanilla-extract`  
**Status**: Architecture review — ready for team decision

---

## Overview

This document captures the findings and architectural decisions from a deep review of the
proposed Grommet → Vanilla Extract migration plan. It supplements the existing POC
(`SUMMARY.md`, `README.md`) with critical gaps identified through codebase analysis and
answers to key architectural questions.

---

## What the Initial POC Gets Right

- The Button component POC is production-worthy as a reference pattern
- The `recipe()` / `styleVariants()` approach is the correct VE pattern for variant-heavy
  components
- The theme contract structure (`theme.contract.css.ts`) is the right architectural
  foundation
- The 8–10 week timeline is realistic _if_ infrastructure decisions are front-loaded
- Performance projections (render speed, bundle size) are directionally correct

---

## Critical Gaps in the Initial Proposed Approach

The initial SUMMARY.md understates complexity in four areas that must be resolved before
component migration begins:

### 1. The `ThemeContext` Coupling is Deeper Than Described

Every one of the 79 components calls `useThemeValue()`, which re-exports `ThemeContext`
directly from styled-components. This is not a "Phase 1 infrastructure" item — it is the
most architecturally complex piece and must be designed first.

### 2. The Parameterized Theme (`generate()`) is Incompatible With Build-Time CSS

`base.js` exports `generate(baseSpacing, scale)` which derives ~230+ token values
dynamically. VE's `createTheme()` requires concrete values at build time.

### 3. `theme.extend` Has No Direct VE Equivalent

Over 40 components expose `theme.X.extend` — arbitrary CSS injection at runtime. The POC
does not address this, and it affects 100+ theme paths across the codebase.

### 4. The Babel Distribution Path Cannot Process `.css.ts` Files

The current build produces `dist/` (CJS) and `dist-es6/` (ESM) via Babel. Babel cannot
extract Vanilla Extract files. The build pipeline must change before any VE code can ship.

---

## Architectural Decision 1: Runtime Theme Strategy

**Context**: `normalizeColor` is called 150+ times across the codebase. It requires the
full live theme object — including the `theme.dark` boolean — to resolve color aliases like
`'brand'` → `'#7D4CDB'` or `{ dark: '#fff', light: '#000' }`. It cannot be made purely
static.

### Option A: Keep a Lean Custom React Context _(Recommended for migration)_

Replace styled-components' `ThemeContext` with Grommet's own `React.createContext()`. The
theme object (a plain JS object including `theme.dark`) continues to live in React context.
VE handles all visual styling (CSS generation); the context handles runtime color resolution
and dark/light state.

**What changes:**

- `Grommet.js` provides `<GrommetThemeContext.Provider value={mergedTheme}>` instead of
  styled-components' `<ThemeProvider>`
- `useThemeValue()` calls `useContext(GrommetThemeContext)` instead of
  `useContext(ThemeContext from 'styled-components')`
- `normalizeColor(color, theme)` continues to work unchanged
- `Box`, `Layer`, `Drop` continue to re-provide a mutated theme
  (`{ ...theme, dark: true/false }`) when background changes
- `ThemeContext.Extend` becomes a simple wrapper around the new context's Provider
- SVG/canvas/icon components keep calling `normalizeColor()` in render — nothing changes

**Pros:**

- ✅ Low-risk, incremental migration — runtime behaviour preserved exactly
- ✅ Backward-compatible public API — `import { ThemeContext } from 'grommet/contexts'` still works
- ✅ ~150 `normalizeColor` call sites require no changes
- ✅ `ThemeContext.Extend` is trivial to re-implement (already just a React context deep-merge)
- ✅ Unblocks component migration immediately

**Cons:**

- ❌ Not the "pure" VE zero-runtime architecture
- ❌ Does not eliminate runtime style computation (`normalizeColor`, `backgroundIsDark`, etc.)
- ❌ Theme JS object (~2,552 lines) still ships in the bundle
- ❌ `passThemeFlag` pattern still needs rethinking (though simplified)

---

### Option B: Fully Static CSS Variables _(Long-term target)_

Eliminate the runtime theme JS object entirely. All theme values — including colors — become
CSS custom properties defined via VE's `createTheme`. Dark/light mode is handled by
switching a CSS class on the root element.

**What changes:**

- `lightTheme` and `darkTheme` become two VE `createTheme()` calls
- `<Grommet themeMode="dark">` applies `className={darkTheme}` to the root element
- SVG/canvas colors switch to `currentColor` or CSS variable references
- `ThemeContext.Extend` for scoped overrides becomes applying a nested `createTheme()` class
- The `generate()` function becomes a build-time code generation script

**Pros:**

- ✅ Maximum performance — zero JS runtime theme object
- ✅ True VE architecture
- ✅ Dark/light mode is pure CSS — switching themes requires only a class change, no React
  re-render propagation
- ✅ Removes `normalizeColor`, `isDarkColor`, `backgroundIsDark` from runtime bundle
- ✅ Eliminates `passThemeFlag` entirely
- ✅ React Server Component compatible — no React context for theming

**Cons:**

- ❌ SVG/canvas/icon color resolution is a hard problem (~15 components use resolved hex
  colors as explicit SVG attributes — CSS variables cannot be used as SVG attribute values
  directly)
- ❌ `theme.extend` escape hatch is a breaking change — must be dropped
- ❌ `ThemeContext.Extend` API changes publicly — breaking for consumers
- ❌ `generate(baseSpacing, scale)` must become a code-gen script
- ❌ Requires solving all architectural problems before migrating any component
- ❌ Color alias chains must be flattened at build time

---

### Recommendation: Hybrid Approach

> **Use Option A as the migration vehicle, with Option B as the long-term target.**

Implement a custom `GrommetThemeContext` (Option A) to unblock component-by-component
migration immediately. As SVG-heavy components (`Chart`, `Diagram`, `WorldMap`, etc.) are
migrated, redesign them to use `currentColor` and CSS variables, incrementally moving toward
Option B. The `theme.extend` breaking change and the parameterized theme code-gen are scoped
to a future major version.

---

## Architectural Decision 2: Parameterized Theme (`generate()`)

**Context**: `generate(baseSpacing = 24, scale = 6)` derives ~230+ token values. This is
called exactly once in the entire codebase with `generate(24)` — the defaults. Every
consumer theme (`grommet.js`, `dark.js`, all stories) uses `deepMerge` to override specific
tokens. No consumer in this repo calls `generate()` with custom arguments.

### Option 1: Single Static Default Theme _(Recommended to unblock migration)_

Pre-compute `generate(24, 6)` once, flatten all derived values into a `.css.ts` file with
`createTheme()`.

**Pros:**

- ✅ Zero complexity — one pre-written VE theme file
- ✅ Covers 99%+ of consumers
- ✅ Pure VE architecture — no runtime JS math
- ✅ Unblocks the entire migration immediately
- ✅ Consumer `deepMerge` overrides still work through the Option A runtime context

**Cons:**

- ❌ `generate(customBaseSpacing, customScale)` becomes a breaking change for ecosystem
  forks (e.g. HPE Aries) that rely on proportional rescaling
- ❌ The "mathematical coherence" guarantee is broken — overriding `edgeSize.medium` won't
  auto-rescale `edgeSize.large`, `font.size`, etc.
- ❌ The public `generate` export needs a deprecation notice

---

### Option 2: Build-Time Code Generation Script _(Follow-on, post-migration)_

Ship a CLI script (e.g. `grommet-theme-gen`) that consumers run in their own build
pipeline. They pass their parameters, the script runs the math, and outputs a concrete
`.css.ts` file.

**Pros:**

- ✅ Preserves the proportional scaling guarantee for ecosystem consumers
- ✅ No breaking change for `generate()` power users
- ✅ Clean separation — default static theme for 99%; script only for custom-scale users

**Cons:**

- ❌ Non-trivial engineering effort — must accurately reproduce all ~230 arithmetic
  expressions
- ❌ New build step for consumers using custom scales
- ❌ Version coupling — consumers must re-run script when grommet updates `generate()` math
- ❌ Delays the migration — script must be built and tested before it can be claimed as
  backward-compatible

---

### Recommendation

Start with the **static default**. Flag `generate()` with custom params as deprecated in the
migration guide. Any consumer using non-default `generate()` calls is a known explicit
breaking change — document it in the major version release notes. Build the codegen script
as a **Phase 2 deliverable**, not a blocker.

---

## Architectural Decision 3: `theme.extend` Escape Hatch

**Context**: Over 40 components expose `theme.X.extend` at 100+ theme paths. The value can
be:

```js
// 1. Plain string
button: {
  extend: `font-weight: bold;`;
}

// 2. css-tagged template (static)
button: {
  extend: css`
    text-transform: uppercase;
  `;
}

// 3. css-tagged template with function interpolations (most powerful — receives SC props)
button: {
  extend: css`
    ${(props) => !props.plain && 'font-weight: bold;'}
  `;
}

// 4. Arrow function returning a string
button: {
  extend: (props) => (props.primary ? `text-transform: uppercase;` : ``);
}
```

Forms 3 and 4 are the hardest — they receive runtime `props` from styled-components'
interpolation engine, which has no equivalent in VE.

### Approach A: `style` Prop (Inline Styles)

Resolve `extend` at render time and pass the result as a React inline `style` attribute
alongside the VE class name.

```tsx
// Button.tsx (VE version)
const Button = ({ primary, plain, label, ...rest }) => {
  const { theme } = useContext(GrommetThemeContext);

  const extendValue = theme.button?.extend;
  const extendStyle = resolveExtend(extendValue, { primary, plain, theme });

  return (
    <button
      className={styles.buttonRecipe({ primary, plain })}
      style={extendStyle}
      {...rest}
    >
      {label}
    </button>
  );
};

// Helper to handle all 4 value forms
function resolveExtend(extend, props) {
  if (!extend) return undefined;
  if (typeof extend === 'function') {
    // Form 4: (props) => `font-weight: bold;`
    const result = extend(props);
    return result ? parseCssStringToObject(result) : undefined;
  }
  if (Array.isArray(extend)) {
    // Form 3: css-tagged template result — resolve embedded functions
    const resolved = extend
      .map((part) => (typeof part === 'function' ? part(props) : part))
      .join('');
    return parseCssStringToObject(resolved);
  }
  // Forms 1 & 2: plain string or static css-tagged result
  return parseCssStringToObject(String(extend));
}
```

**Limitation**: `parseCssStringToObject` can only handle simple property declarations.
These **silently break**:

- Pseudo-selectors: `&:hover { color: red; }`
- Media queries: `@media (max-width: 768px) { ... }`
- Child selectors: `& > span { ... }`
- Animations/keyframes

The `grommet.js` theme's own `button.extend` uses `&:focus { clip-path: none; }` — this
would break with this approach.

---

### Approach B: `className` Prop _(Recommended)_

Expose a `className` prop that consumers provide. They generate their own VE class at build
time in their own `.css.ts` file.

```tsx
// Button.tsx (VE version)
import { clsx } from 'clsx';

const Button = ({ primary, plain, label, className, ...rest }) => {
  return (
    <button
      className={clsx(styles.buttonRecipe({ primary, plain }), className)}
      {...rest}
    >
      {label}
    </button>
  );
};
```

**Consumer usage — they create their own `.css.ts` file:**

```ts
// myApp/overrides/button.overrides.css.ts
import { style } from '@vanilla-extract/css';

export const boldPrimaryButton = style({
  textTransform: 'uppercase',
  fontWeight: 'bold',
  selectors: {
    '&:focus': { clipPath: 'none' }, // ✅ works — impossible with style prop
    '&:hover': { background: 'cadetblue' },
  },
  '@media': {
    'screen and (max-width: 768px)': { fontSize: '12px' }, // ✅ works
  },
});
```

```tsx
// myApp/MyButton.tsx
import { boldPrimaryButton } from './overrides/button.overrides.css';

<Button primary label="Save" className={boldPrimaryButton} />;
```

**For sub-component slots** (e.g. `checkBox.toggle.knob.extend`), expose named class props
per slot:

```tsx
// CheckBox.tsx
const CheckBox = ({
  className,        // container
  toggleClassName,  // toggle track
  knobClassName,    // toggle knob
  iconClassName,    // checkmark icon
  ...rest
}) => { ... };
```

---

### `style` Prop vs. `className` Comparison

|                                           | `style` prop                               | `className` prop                     |
| ----------------------------------------- | ------------------------------------------ | ------------------------------------ |
| **Pseudo-selectors** (`:hover`, `:focus`) | ❌ Impossible                              | ✅ Full support                      |
| **Media queries**                         | ❌ Impossible                              | ✅ Full support                      |
| **Child selectors**                       | ❌ Impossible                              | ✅ Full support                      |
| **Animations / keyframes**                | ❌ Impossible                              | ✅ Full support                      |
| **Consumer migration effort**             | ✅ Zero (for simple cases)                 | ❌ Must rewrite to `.css.ts`         |
| **Backward compatibility**                | ⚠️ Partial — pseudo/media silently ignored | ❌ Breaking change — new API         |
| **TypeScript safety**                     | ❌ Runtime string parsing                  | ✅ Full type safety                  |
| **Performance**                           | ❌ Inline styles, specificity issues       | ✅ Static class, no runtime overhead |
| **VE philosophy**                         | ❌ Contradicts zero-runtime goal           | ✅ Aligned with VE architecture      |

---

### Recommendation: Two-Tier Strategy

1. **Ship `className` as the primary override mechanism** — the VE-native, fully capable
   approach. Document it clearly in the migration guide.

2. **Keep a degraded `extend` via `style` prop as a compatibility shim** — resolve
   `theme.X.extend` if it is a plain string or simple function, apply as inline style. Emit
   a dev-mode console warning:
   ```
   "theme.button.extend is deprecated. Use the className prop instead.
    Note: pseudo-selectors and media queries in extend are not supported."
   ```
   This gives consumers time to migrate without an immediate hard break, while being honest
   that pseudo-selectors and media queries in `extend` will not work.

---

## Revised Migration Plan

### Infrastructure Prerequisites (Must complete before any component migration)

1. **Choose and implement the distribution build strategy** — switch from Babel to Rollup
   or tsup for the `dist/` and `dist-es6/` outputs, adding
   `@vanilla-extract/rollup-plugin` or equivalent. The current webpack config only handles
   `.js` via Babel; Babel cannot process `.css.ts` files.

2. **Implement `GrommetThemeContext`** — create `src/js/contexts/ThemeContext/index.js` as
   a proper `React.createContext()` (no longer re-exporting from styled-components). Update
   `useThemeValue()` to read from it. Update `Grommet.js` to provide it instead of
   styled-components' `ThemeProvider`.

3. **Expand the VE theme contract** — extend `theme.contract.css.ts` from ~10–15% coverage
   (Button only) to cover all 79 components. Pre-compute `generate(24, 6)` as the concrete
   static theme implementation.

4. **Migrate shared CSS utility files first** — rewrite `src/js/utils/styles.js`,
   `background.js`, `animation.js`, `border.js`, and `mixins.js` from `css` template
   literals to VE `style()` / `styleVariants()` / pre-compiled keyframes. These are used by
   all 79 components — they must be done before any individual component can be fully
   migrated.

5. **Update Jest configuration** — remove `jest-styled-components`, replace the
   `moduleNameMapper` for styled-components with the VE style mock proxy, and plan for
   snapshot regeneration across the test suite.

### Phase 1: Infrastructure (Weeks 1–2)

- [ ] Decision: Rollup vs. tsup for distribution build
- [ ] Implement `GrommetThemeContext` (custom React context)
- [ ] Update `useThemeValue()` and `Grommet.js`
- [ ] Pre-compute static VE theme from `generate(24, 6)`
- [ ] Expand theme contract to full coverage
- [ ] Migrate `utils/styles.js`, `utils/background.js`, `utils/animation.js`
- [ ] Set up Jest VE mock and CI pipeline

### Phase 2: Simple Components (Weeks 2–4, ~20 components)

Target: Text, Heading, Paragraph, Image, Avatar, Tag, Spinner, SkipLink, Nav, Header,
Footer, Main, Sidebar, Card, CardBody, CardFooter, CardHeader, Page, PageContent, Anchor

- Remove `Styled*.js` files
- Replace with VE `recipe()` in `component.css.ts`
- Add `className` prop for override support
- Add deprecation shim for `theme.X.extend`

### Phase 3: Medium Components (Weeks 4–7, ~35 components)

Target: Button, Box, Accordion, Collapsible, CheckBox, RadioButton, RangeInput, Tabs, Tab,
List, Meter, Chart, Notification, Pagination, Tip, Diagram, Stack, Grid, etc.

- Button: Use POC as direct reference
- Box: Largest migration — 25+ interpolation functions, dynamic background, responsive
  breakpoints, gap styled component
- Establish patterns for conditional styling, responsive props

### Phase 4: Complex Components (Weeks 7–9, ~24 components)

Target: DataTable, Form, FormField, Select, SelectMultiple, DateInput, Calendar, Layer,
Drop, Menu, MaskedInput, TextInput, TextArea, FileInput, DataChart, Distribution, WorldMap,
Carousel, Video, Skeleton

- SVG/canvas components (`Chart`, `Diagram`, `WorldMap`): begin Option B migration
  (switch to `currentColor` / CSS variable references)
- Layer/Drop: handle theme re-provision for nested dark regions

### Phase 5: Release (Week 10)

- [ ] Remove styled-components from `peerDependencies`
- [ ] Remove `@emotion/is-prop-valid` runtime dependency
- [ ] Remove `babel-plugin-styled-components` and `jest-styled-components`
- [ ] Remove `externals: { 'styled-components': 'styled' }` from webpack config
- [ ] Write consumer migration guide (covering `extend` → `className`, `generate()` deprecation)
- [ ] Major version bump (this is a breaking change release)
- [ ] Beta release → stable release

---

## Performance Expectations (Option A)

| Metric             | Expected Gain        | Source                                                                     |
| ------------------ | -------------------- | -------------------------------------------------------------------------- |
| Consumer bundle    | ~35–40kB smaller     | styled-components removed from peerDeps                                    |
| Grommet own bundle | ~20–30% smaller      | Removes Styled\*.js template bodies and CSS-gen utils                      |
| Per-render CPU     | Large reduction      | All 17–25+ interpolation functions eliminated per component render         |
| Initial paint      | Moderate improvement | CSS loads as static file vs. injected after JS executes                    |
| Memory             | Moderate reduction   | SC's in-memory StyleSheet cache eliminated                                 |
| Re-render speed    | Significant          | Box/Button re-renders go from executing 25 functions to a classname lookup |

> **Note**: The theme JS object (`base.js`, ~2,552 lines) and `normalizeColor` remain in
> the runtime bundle under Option A. The ~50% performance gains cited in the original POC
> assume Option B (fully static). Option A delivers meaningful but more modest improvements.

---

## Known Breaking Changes (Major Version)

| Change                                                                  | Affected consumers                                                  |
| ----------------------------------------------------------------------- | ------------------------------------------------------------------- |
| `styled-components` no longer a peer dependency                         | All consumers — must remove from their app                          |
| `theme.X.extend` pseudo-selectors / media queries silently ignored      | Consumers using complex `extend` values                             |
| `theme.X.extend` deprecated (console warning)                           | All consumers using `extend`                                        |
| `generate(customBaseSpacing, customScale)` no longer affects CSS output | Ecosystem design system forks (HPE Aries etc.)                      |
| `ThemeContext` no longer re-exports styled-components' context          | Consumers importing `ThemeContext` and using SC-specific APIs on it |
| `passThemeFlag` pattern eliminated                                      | Internal only — not a public API                                    |

---

## Open Questions / Team Decisions Required

1. **Distribution build tool**: Rollup + `@vanilla-extract/rollup-plugin` vs. tsup vs.
   Vite library mode? This decision affects the entire build pipeline.

2. **Dark mode mechanism for Option B path**: CSS class on root element vs.
   `@media prefers-color-scheme` vs. `data-theme` attribute? Affects the theme contract
   shape for all 79 components when SVG components are eventually migrated.

3. **`generate()` deprecation timeline**: Deprecate immediately in this major version, or
   keep it working (returning a JS object for `deepMerge` use) while just removing its
   effect on the VE CSS output?

4. **`ThemeContext.Extend` consumer API**: Keep it (backed by the new custom context) or
   deprecate it in favour of a new VE-native scoped theme API?

5. **Major version number**: This is clearly a breaking change release. What is the version
   strategy — `v3.0.0`, or an entirely new package name?

---

## Resources

- [Vanilla Extract Docs](https://vanilla-extract.style/)
- [POC Button Implementation](./button.css.ts)
- [POC Theme Contract](./theme.contract.css.ts)
- [POC Theme Implementation](./grommet.theme.css.ts)
- [POC Migrated Button Component](./Button.vanilla.tsx)
- [Build Config Notes](./BUILD_CONFIG.md)
- [Full Comparison](./COMPARISON.md)
- [Original Summary](./SUMMARY.md)
