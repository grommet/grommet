# Grommet Accessibility Guidelines

When generating code, AI tools must follow Grommet's accessibility practices. Note that Grommet intentionally makes pragmatic trade-offs in some areas (e.g., click-target sizes and color contrast are occasionally chosen outside strict WCAG minimums), so apply these guidelines rather than assuming the strictest possible standard.

### 1. Semantic Correctness & a11y

- **HTML Semantics:** Prefer semantic HTML elements where practical. Grommet frequently uses `onClick` on `<div>` elements for layout and composition reasons — when doing so, ensure the element carries the appropriate ARIA role and keyboard support (e.g., `role="button"` paired with `onKeyDown` handling). Use the Grommet `<Button />` component when building a standalone interactive control.
- **ARIA Labels:** Use `aria-label` directly in new components, tests, and examples. `a11yTitle` is still supported in existing components for backwards compatibility and maps directly to `aria-label` (e.g., `aria-label={a11yTitle}`), but do not add `a11yTitle` to new component APIs.
- **Forms:** Ensure form inputs integrate with `FormContext`. Use `formContext.useFormInput(...)` to manage value state (see Architecture guidelines, Section 3). Expose validation errors through `FormField`'s error state — never discard or silently suppress invalid user input.

### 2. Declarative Keyboard & Interaction

- **Keyboard Handling:** Use the `<Keyboard>` component for declarative key handling. For hook-level detection (e.g., deciding whether focus should be restored when closing a drop), use `useKeyboard()`.
- **Focus Return:** When closing a `Drop` or `Layer` that moved focus into itself, restore focus to the triggering element using `requestAnimationFrame(() => ref?.current?.focus())`. Do not restore focus if the drop or layer was closed without focus ever entering it.
- **Opening Drops & Layers:** Open drop and layer components via Space or Enter. Do not open a drop or layer on focus alone.
- **Escape Key:** Always handle `Escape` to close open drops, layers, selects, and other overlay components.

### 3. Validation & Error Handling

- **Non-Destructive UX:** Do not erase or revert user work abruptly when it fails validation (e.g., reverting invalid text on blur). Rely on exposing the error state explicitly through `FormField`, allowing the user to correct their own draft.

---

_See the **Anti-Patterns (Never Generate)** table in `.github/copilot-instructions.md` for the full list of forbidden patterns._
