---
name: grommet-component-styling
description: "Style Grommet components using styled-components and the Grommet theme system. Use when creating or modifying StyledComponentName.js files, adding or updating theme tokens in base.js and base.d.ts, applying disabledStyle or readOnlyStyle helpers, choosing t-shirt sizing values, or composing UI with Grommet primitives. Covers useThemeValue, styledComponentsConfig, passThemeFlag, normalizeColor, genericStyles, and theme namespace conventions."
argument-hint: "Describe the styling task (e.g. 'add theme tokens for a new RangeSlider component')"
---

# Grommet Component Styling Skill

## When to Use
- Creating or modifying a `StyledComponentName.js` file
- Adding or extending theme tokens in `src/js/themes/base.js` and `base.d.ts`
- Applying disabled or readOnly visual states to a component
- Choosing sizing and spacing values
- Composing UI using Grommet primitives (`Box`, `Text`, `Button`, etc.)
- Troubleshooting why a theme value is not applying, or why a styled component is leaking props to the DOM

## Workflow

1. **Read the theme** — check `src/js/themes/base.js` for the component's existing namespace (`theme.<componentName>`) or the nearest related component's namespace.
2. **Create the styled component** — use `styled.element.withConfig(styledComponentsConfig)`. Import `styledComponentsConfig`, `genericStyles`, `normalizeColor`, and any state helpers from `../../utils`.
3. **Wire to the component** — call `useThemeValue()` in the React component and spread `{...passThemeFlag}` on every styled component instance so the theme propagates correctly.
4. **Add theme tokens** — add the namespace to `base.js` in alphabetical order. Mirror the exact shape in `base.d.ts`.
5. **Apply state styles** — use `disabledStyle()` for disabled states and `readOnlyStyle()` for readOnly states. Never write custom CSS for these.
6. **Size with t-shirt values** — reference theme tokens (`xsmall`, `small`, `medium`, `large`, `xlarge`) rather than hardcoded pixel values.
7. **Compose with primitives** — prefer Grommet atoms (`Box`, `Text`, `Button`) over raw HTML elements for layout and typography.

## Key Rules
- `const { theme, passThemeFlag } = useThemeValue()` — always; never `useContext(ThemeContext)` directly
- Spread `{...passThemeFlag}` on every styled component instance
- Theme namespace: `theme.<componentName>` at the **top level** of `base.js` (not `theme.global.myComponent`)
- No inline `style={{}}` attributes or CSS class names
- No hardcoded fallbacks: `theme.foo ?? '#000'` silently hides missing tokens from custom theme users
- Use `background` not `backgroundColor`; use `color` for text and icon colors
- Icons: `grommet-icons` package only; always allow icon override via theme token

## See Also
- [REFERENCE.md](./REFERENCE.md) — complete code examples for styledComponentsConfig, normalizeColor, genericStyles, disabledStyle, readOnlyStyle, and theme token registration
