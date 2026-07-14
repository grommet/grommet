# Accessibility Reference

## Semantic HTML First

- Use `<Button />` for actions, `<Anchor />` for navigation
- When `onClick` must go on a `<div>` or other non-interactive element, add `role="button"` and `onKeyDown` to preserve the same semantic contract a native element provides
- New components use `aria-label` directly — do **not** add `a11yTitle` to new component APIs

```jsx
// Correct — new component API:
<MyComponent aria-label="Close dialog" />

// Backwards-compatible only — existing components:
// a11yTitle maps to aria-label but should not be added to new APIs
```

## Keyboard Handling with `<Keyboard>`

Use the declarative `<Keyboard>` component for key handling. Do not write raw `onKeyDown` handlers when `<Keyboard>` covers the case:

```jsx
import { Keyboard } from '../Keyboard';

<Keyboard
  onEnter={handleEnter}
  onSpace={handleSpace}
  onEscape={handleClose}
  onUp={handleUp}
  onDown={handleDown}
>
  <button ref={ref} onClick={handleClick}>
    {children}
  </button>
</Keyboard>
```

For hook-level detection (e.g., deciding whether focus should be restored when closing a drop): `useKeyboard()` from `../../utils`.

## Opening Drops & Layers

- Open on Space or Enter keypress — **not** on focus alone
- Always handle Escape to close overlays, drops, layers, and selects

## Focus Restoration

When a Drop or Layer closes and focus was inside it, restore focus to the trigger element:

```js
const handleClose = () => {
  setOpen(false);
  requestAnimationFrame(() => {
    triggerRef.current?.focus();
  });
};
```

Only restore focus if the overlay was closed while focus was actually inside it — do not restore focus if the drop was dismissed without the user ever entering it.
