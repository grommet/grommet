# Grommet AI Contribution Guidelines

Welcome to the Grommet AI contribution guidelines! The purpose of these instructions is to act as a guardrail for AI tools (like GitHub Copilot) when generating code within the Grommet ecosystem. By adhering to these guidelines, AI-assisted code generation will be more aligned with Grommet's specific architecture, conventions, and semantics.

We encourage both internal maintainers and external contributors to update and refine these guidelines as new patterns are established or new friction points are discovered.

## Critical Focus Areas (Always Apply)

- **Semantic HTML & Forms:** Prefer semantic elements where practical. Grommet uses `onClick` on `<div>` elements in many places — when doing so, always pair with the appropriate ARIA role and keyboard support. Use the Grommet `<Button />` component for standalone interactive controls. Hook into the `FormField` context for state and validation. `a11yTitle` is still supported in existing components (maps to `aria-label`), but do not add it to new component APIs.
- **Non-Destructive UX:** Never erase or revert a user's work abruptly when it fails validation. Expose errors explicitly through `FormField`.

## Domain-Specific Instructions

When authoring a new component or substantially modifying an existing one, you **MUST** read the corresponding instruction file before writing code:

- 🏗️ **Architecture & Scaffolding:** Read `.github/ai-instructions/architecture.md` for directory layout, prop conventions, context/hooks, controlled vs. uncontrolled state patterns, and component archetype code examples (Simple Input, Picker, Display, Layout).
- 💅 **Theming & Styling:** Read `.github/ai-instructions/styling.md` for styled-components rules, t-shirt sizing, theme tokens, global focus styling, `disabledStyle()` / `readOnlyStyle()` helpers, and component primitives (`grommet-icons`).
- ♿ **Accessibility:** Read `.github/ai-instructions/accessibility.md` for deeper semantic rules and declarative keyboard handling.
- 📋 **Forms:** Read `.github/ai-instructions/forms.md` for `FormContext` integration, `FormField` error handling, and non-destructive UX patterns.
- 🌐 **Internationalization (i18n):** Read `.github/ai-instructions/i18n.md` for `MessageContext` string keys, `AnnounceContext` live regions, and `polite` vs `assertive` guidance.
- 🧪 **Testing & Storybook:** Read `.github/ai-instructions/testing.md` for the `@testing-library/react` stack, `axe` rules, and CSF-3 Storybook formatting.

## Anti-Patterns (Never Generate)

| ❌ Never Generate                                                        | ✅ Correct Pattern                                          | Why                                                                                                                                |
| ------------------------------------------------------------------------ | ----------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `import { useFormInput } from '../../hooks'`                             | `const { useFormInput } = useContext(FormContext)`          | `useFormInput` is consumed from `FormContext`, not imported directly                                                               |
| `import { ThemeContext } from 'grommet'` then `useContext(ThemeContext)` | `const { theme } = useThemeValue()`                         | `useThemeValue()` is the established internal hook and avoids a direct context import                                              |
| `import styled from 'styled-components/macro'`                           | `import styled from 'styled-components'`                    | Grommet does not use the `/macro` transform                                                                                        |
| `onChange(value)`                                                        | `onChange({ value })`                                       | Grommet's change callbacks use an object payload for extensibility                                                                 |
| `<MyComponent isDisabled />`                                             | `<MyComponent disabled />`                                  | Matches the standard HTML attribute name                                                                                           |
| `fireEvent.click(element)` in most interaction tests                     | `const user = userEvent.setup(); await user.click(element)` | `userEvent` simulates full browser event sequences; use `fireEvent` only for low-level synthetic events `userEvent` cannot produce |
| `theme.global.myComponent`                                               | `theme.myComponent`                                         | Component theme tokens live at the top level, not under `global`                                                                   |
| Custom CSS for disabled/readOnly                                         | `disabledStyle()` / `readOnlyStyle()`                       | Keeps disabled/readOnly styling consistent and centrally managed                                                                   |
| `useEffect` to sync controlled value                                     | `useFormInput({ value, initialValue })`                     | `useFormInput` handles controlled/uncontrolled sync without side effects                                                           |
| `React.createContext` in `src/js/contexts/`                              | Context files live in the component directory               | Collocating context with its component keeps the codebase navigable                                                                |
| `onValueChange` / `onSelect` / `onUpdate`                                | Always `onChange` for the primary callback                  | Consistent callback naming across all Grommet components                                                                           |
