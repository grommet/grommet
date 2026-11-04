---
name: grommet-component-accessibility
description: 'Review or implement accessibility for Grommet React components. Use when fixing keyboard interaction, focus management, overlays, tabs or other composite widgets, semantic HTML, aria-label usage, AnnounceContext announcements, or accessibility regressions in Grommet components. Covers Button vs Anchor choice, Keyboard, useKeyboard, Drop/Layer focus restore, Escape handling, tab patterns, MessageContext, AnnounceContext, and repo-specific a11y testing expectations.'
argument-hint: "Describe the accessibility task or component (e.g. 'review Select keyboard behavior' or 'fix Layer focus restore')"
---

# Grommet Component Accessibility Skill

## When to Use

- Reviewing a component for accessibility regressions
- Fixing keyboard behavior, focus order, or screen reader support
- Implementing or repairing `Drop`, `Layer`, `Select`, `Tabs`, menus, or other composite widgets
- Auditing semantic HTML, labeling, announcements, and reduced-motion behavior in Grommet components

## Workflow

1. Start with semantics: choose the correct Grommet primitive before adding ARIA.
2. Verify keyboard path: tab order, arrow-key behavior where applicable, Enter and Space activation, and Escape handling for overlays.
3. Check focus management: initial focus, focus containment when needed, and restoring focus to the trigger only when focus moved.
4. Check announcements and labels: `aria-label`, `MessageContext`, `AnnounceContext`, and panel or popup naming.
5. Validate with tests: `axe` first, then targeted `userEvent` keyboard and focus coverage.

## Non-Negotiable Rules

- Prefer `Button` for actions and `Anchor` for navigation.
- Do not add `a11yTitle` to new component APIs; use `aria-label`.
- Use `Keyboard` for declarative key handling and `useKeyboard()` when keyboard detection is needed.
- Open `Drop` and `Layer` interactions on Enter or Space, not focus alone.
- Always support Escape to close overlays.
- Restore focus with `requestAnimationFrame(() => ref.current?.focus())` only when focus actually entered the overlay.
- Use `MessageContext` for user-visible strings and `AnnounceContext` for live region updates.
- For composite widgets, use roving `tabindex`, skip disabled items during keyboard navigation, and preserve stable `aria-controls` or naming relationships.

## Review Checklist

- Semantic element or Grommet primitive is correct for the interaction
- Programmatic name matches the visible intent
- Keyboard interaction matches the widget pattern
- Focus is visible and restoration behavior is correct
- Dynamic updates are announced at the right politeness level
- Tests cover `axe`, keyboard interaction, and focus management

## See Also

- [../../ai-instructions/accessibility.md](../../ai-instructions/accessibility.md)
- [../../ai-instructions/testing.md](../../ai-instructions/testing.md)
- [../../ai-instructions/i18n.md](../../ai-instructions/i18n.md)
