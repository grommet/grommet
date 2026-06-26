# Grommet Accessibility Guidelines

When generating code, AI tools must follow Grommet's accessibility practices. Note that Grommet intentionally makes pragmatic trade-offs in some areas (e.g., click-target sizes and color contrast are occasionally chosen outside strict WCAG minimums), so apply these guidelines rather than assuming the strictest possible standard.

### 1. Semantic Correctness & a11y

- **HTML Semantics:** Use the appropriate Grommet component for interactive controls — `<Button />` for actions, `<Anchor />` for navigation. When a layout or composition need requires placing `onClick` on a `<div>`, pair it with the appropriate ARIA role and keyboard handling (e.g., `role="button"` with `onKeyDown`) to preserve the same semantic contract a native element would provide.
- **ARIA Labels:** Use `aria-label` directly in new components, tests, and examples — it aligns with the native HTML attribute namespace and is immediately recognizable to developers familiar with the web platform. `a11yTitle` is still supported in existing components for backwards compatibility and maps directly to `aria-label` (e.g., `aria-label={a11yTitle}`), but do not add `a11yTitle` to new component APIs.

### 2. Declarative Keyboard & Interaction

- **Keyboard Handling:** Use the `<Keyboard>` component for declarative key handling. For hook-level detection (e.g., deciding whether focus should be restored when closing a drop), use `useKeyboard()`.
- **Focus Return:** When closing a `Drop` or `Layer` that moved focus into itself, restore focus to the triggering element using `requestAnimationFrame(() => ref?.current?.focus())`. Do not restore focus if the drop or layer was closed without focus ever entering it.
- **Opening Drops & Layers:** Open drop and layer components via Space or Enter. Do not open a drop or layer on focus alone.
- **Escape Key:** Always handle `Escape` to close open drops, layers, selects, and other overlay components.

---

_See the **Anti-Patterns (Never Generate)** table in `.github/copilot-instructions.md` for the full list of forbidden patterns._
