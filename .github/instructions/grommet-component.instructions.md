---
description: "Core rules for Grommet React component development. Always applied when editing component source files. Covers required implementation patterns, onChange shape, theme access, accessibility, i18n, and the most common anti-patterns."
applyTo: "src/js/components/**"
---

## Required Patterns

- `React.forwardRef` + `displayName` on every component — no exceptions
- `useForwardedRef(refArg)` when the component needs internal access to the DOM node
- `const { theme, passThemeFlag } = useThemeValue()` — never `useContext(ThemeContext)` directly
- Spread `{...passThemeFlag}` on every styled component instance
- Spread `...rest` on the root DOM element

## onChange Shape

| Component type | Correct callback |
|---|---|
| Native element wrapper (TextInput, CheckBox) | `onChange(event)` — standard React synthetic event |
| Structured input that owns a parsed value (DateInput, Select) | `onChange({ value })` — Grommet object payload |

Never call `onChange(value)` — always wrap in an object or pass the event.

## Theme & Styling

- Theme tokens live at `theme.<componentName>` — never `theme.global.myComponent`
- Use `disabledStyle()` and `readOnlyStyle()` from `../../utils` for those states — no custom CSS
- No inline `style={{}}` attributes; no hardcoded pixel values when a theme token exists
- Use `styledComponentsConfig` (not custom `shouldForwardProp`) for styled components

## Controlled / Uncontrolled State

- Input components must support both `value` (controlled) and `defaultValue` (uncontrolled)
- Use `formContext.useFormInput({ name, value, initialValue })` — not raw `useState`
- This wires the component into `Form` submit/reset automatically

## Accessibility

- Use `<Keyboard>` for declarative key handling (not raw `onKeyDown`)
- Always handle Escape on overlays, drops, and layers
- Restore focus to the trigger element when closing a Drop or Layer: `requestAnimationFrame(() => ref.current?.focus())`
- Use `aria-label` directly — do not add `a11yTitle` to new component APIs

## Internationalization

- No hardcoded English strings for user-visible text — use `MessageContext.format({ id, messages })`
- Add defaults to `src/js/languages/default.json` under a namespaced key
- Use `AnnounceContext` for screen reader announcements; prefer `'polite'` over `'assertive'`

## Anti-Patterns

| Never | Use instead |
|-------|-------------|
| `useContext(ThemeContext)` | `useThemeValue()` |
| `onChange(value)` | `onChange({ value })` or `onChange(event)` |
| `import styled from 'styled-components/macro'` | `import styled from 'styled-components'` |
| Custom disabled/readOnly CSS | `disabledStyle()` / `readOnlyStyle()` |
| `theme.global.myComponent` | `theme.myComponent` |
| `useEffect` to sync controlled value | `formContext.useFormInput(...)` |
| `React.createContext` in `src/js/contexts/` | Context file in the component's own directory |
| `onSelect` / `onValueChange` / `onUpdate` | `onChange` |
