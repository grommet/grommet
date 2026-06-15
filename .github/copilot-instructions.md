# Grommet AI Contribution Guidelines

Welcome to the Grommet AI contribution guidelines! The purpose of these instructions is to act as a guardrail for AI tools (like GitHub Copilot) when generating code within the Grommet ecosystem. By adhering to these guidelines, AI-assisted code generation will be more aligned with Grommet's specific architecture, conventions, and semantics.

We encourage both internal maintainers and external contributors to update and refine these guidelines as new patterns are established or new friction points are discovered.

## Critical Focus Areas (Always Apply)

- **Semantic HTML & Forms:** Always use native elements correctly (e.g., `<button>` for clickables). Hook into the `FormField` context for state and validation. `a11yTitle` is still supported (and maps to `aria-label`), but prefer `aria-label` directly for new props.
- **Non-Destructive UX:** Never erase or revert a user's work abruptly when it fails validation. Expose errors explicitly through `FormField`.
- **Escape Hatches & Spreading:** Keep the API surface clean; spread `...rest` onto root elements and expose underlying props (e.g., `buttonProps`).

## Domain-Specific Instructions

When authoring a new component or substantially modifying an existing one, you **MUST** read the corresponding instruction file before writing code:

- 🏗️ **Architecture & Scaffolding:** Read `.github/ai-instructions/architecture.md` for directory layout, prop conventions, context/hooks, controlled vs. uncontrolled state patterns, and component archetype code examples (Simple Input, Picker, Display, Layout).
- 💅 **Theming & Styling:** Read `.github/ai-instructions/styling.md` for styled-components rules, t-shirt sizing, theme tokens, global focus styling, `disabledStyle()` / `readOnlyStyle()` helpers, and component primitives (`grommet-icons`).
- ♿ **Accessibility & i18n:** Read `.github/ai-instructions/accessibility.md` for deeper semantic rules, handling error states, declarative keyboard handling, and i18n via `MessageContext` / `AnnounceContext`.
- 🧪 **Testing & Storybook:** Read `.github/ai-instructions/testing.md` for the `@testing-library/react` stack, `axe` rules, and CSF-3 Storybook formatting.

## Anti-Patterns (Never Generate)

| ❌ Never Generate                                                        | ✅ Correct Pattern                                          |
| ------------------------------------------------------------------------ | ----------------------------------------------------------- |
| `import { useFormInput } from '../../hooks'`                             | `const formContext = useContext(FormContext); const [value, setValue] = formContext.useFormInput({ ... })` |
| `import { ThemeContext } from 'grommet'` then `useContext(ThemeContext)` | `const { theme } = useThemeValue()`                         |
| `import styled from 'styled-components/macro'`                           | `import styled from 'styled-components'`                    |
| `onChange(value)`                                                        | `onChange({ value })`                                       |
| `<MyComponent isDisabled />`                                             | `<MyComponent disabled />`                                  |
| `fireEvent.click(element)`                                               | `const user = userEvent.setup(); await user.click(element)` |
| `theme.global.myComponent`                                               | `theme.myComponent`                                         |
| Custom CSS for disabled/readOnly                                         | `disabledStyle()` / `readOnlyStyle()`                       |
| `useEffect` to sync controlled value                                     | `useFormInput({ value, initialValue })`                     |
| `React.createContext` in `src/js/contexts/` (for component-specific context) | Put component-specific contexts in the component directory; reserve `src/js/contexts/` for shared/global contexts |
| `onValueChange` / `onSelect` / `onUpdate`                                | Always `onChange` for the primary callback                  |
