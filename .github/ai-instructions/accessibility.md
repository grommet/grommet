# Grommet Accessibility & i18n Guidelines

When generating code, AI tools must adhere to the highest standard of Web Accessibility (a11y) and Internationalization (i18n).

### 1. Semantic Correctness & a11y

- **HTML Semantics:** Use semantically correct HTML elements. Specifically, do not use `<div>` or `<span>` tags with `onClick` handlers as interactive controls; use the native `<button>` element or the Grommet `<Button />` component.
- **ARIA Labels:** `a11yTitle` is still supported and maps directly to `aria-label` (e.g., `aria-label={a11yTitle}`). For new props, prefer using the standard `aria-label` directly.
- **Forms:** Ensure form inputs are properly structured and rely on the standard `FormField` context for state and validation.

### 2. Declarative Keyboard & Interaction

- **Keyboard Handling:** Use the `<Keyboard>` component for declarative key handling. For hook-level detection (e.g., deciding if focus should be restored when closing a drop), use `useKeyboard()`.
- **Focus Return:** When closing a `Drop`, ensure focus returns to the triggering element using `requestAnimationFrame(() => ref?.current?.focus())`.
- **Drops:** Open drop components using Space/Enter, not just focus.

### 3. Validation & Error Handling

- **Non-Destructive UX:** Do not erase or revert user work abruptly when it fails validation (e.g., reverting invalid text on blur).
- **FormField Integration:** Validation should mirror current Grommet `FormField` patterns. Do not use local React state (like `useState`) to hide or destroy invalid user input on blur. Rely completely on exposing the error state explicitly through the `FormField` context, allowing the user to correct their own draft.

### 4. Internationalization (i18n) & Screen Readers

- **Message Objects/Context:** To support internationalized strings, use `MessageContext` with namespaced keys and keep defaults in `src/js/languages/default.json`. Do not hardcode raw English text deeply into components when standard messages apply.
- **Live Regions:** Use `AnnounceContext` for pushing announcements to screen readers.

---

_See the **Anti-Patterns (Never Generate)** table in `.github/copilot-instructions.md` for the full list of forbidden patterns._
