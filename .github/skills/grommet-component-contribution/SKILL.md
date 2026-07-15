---
name: grommet-component-contribution
description: "Build and contribute Grommet React components following official team conventions. Use when creating a new component from scratch, refactoring a component to align with Grommet conventions, preparing a PR for Grommet core contribution, or reviewing a component against acceptance criteria. Covers scaffolding, forwardRef, displayName, useThemeValue, FormContext, propTypes, TypeScript declarations, accessibility, i18n, and testing."
argument-hint: "Describe the component or task (e.g. 'create a RangeSlider dual-handle input component')"
---

# Grommet Component Contribution Skill

## Use When
- Building a new Grommet component from scratch
- Refactoring a component to align with Grommet conventions
- Preparing a PR for Grommet core contribution
- Reviewing a component against the Grommet acceptance criteria

## Workflow
1. Discover: read the closest existing component, its tests, propTypes, types, and stories.
2. Plan: define the value contract, commit model, minimum props, and composition boundaries.
3. Scaffold: create the component files, register exports, and add docs/tests/stories.
4. Implement: build pure utilities first, then the component with `forwardRef`, `useForwardedRef`, `useThemeValue`, and `FormContext` integration.
5. Test: start with accessibility, then value emission, form integration, keyboard, and edge cases.
6. Stories: controlled usage, `FormField` integration, and `CustomThemed` only if new theme tokens exist.
7. Validate: lint, full tests, and top-level `grommet` export coverage.

## Non-Negotiable Principles
- Compose small primitives before building a monolith.
- Prefer native browser APIs such as `Intl` over custom format/parse logic.
- Put customization in theme tokens, not instance props.
- Keep accessibility, semantic HTML, and keyboard support mandatory.
- Use `onChange` with the `{ value }` shape for structured inputs.
  - Native element wrappers (TextInput, CheckBox) emit the standard React synthetic event via `onChange(event)`.
  - Structured inputs that own a parsed/formatted value (DateInput) emit `onChange({ value })`.
- Simple inputs emit on every meaningful interaction; structured inputs emit only when the composed value is valid.
- Spread `...rest` onto the root DOM element, though some components may be selective about placement.

## Default API Shape
- Start with only truly universal props: `aria-label`, `id`, and `...rest`.
- Apply `disabled` only to value-input components (TextInput, CheckBox, Select, DateInput, etc.).
- Do NOT add `disabled` to non-interactive display components (Text, Heading, Anchor).
- Use `genericProps` for layout and style passthrough.
- See [REFERENCE.md](./REFERENCE.md) for component-specific API shapes.

## Implementation Checklist
- `React.forwardRef` plus `displayName`
- `useForwardedRef(refArg)` instead of raw refs
- `const { theme, passThemeFlag } = useThemeValue()`
- `FormContext` integration via `useFormInput` when the component participates in forms
- TypeScript declarations in `index.d.ts`
- `propTypes.js` guarded for production
- Component barrel export and top-level export registration
- Theme defaults live under a dedicated `theme.<componentName>` namespace
- Stories in CSF-3 format
- Tests use `@testing-library/user-event`, `jest-axe`, and `<Grommet>` wrappers

## When Unsure
1. Check the nearest similar component.
2. Check existing theme tokens.
3. Check shared utilities or `FormContext`.
4. Ask before inventing a new pattern.
5. Read [REFERENCE.md](./REFERENCE.md) before making implementation decisions.
6. Review [EXAMPLES.md](./EXAMPLES.md) for a matching archetype before drafting new APIs.

## Detailed Reference
- [REFERENCE.md](./REFERENCE.md) — anti-hallucination rules, implementation patterns, PR checklist, decision tree, and anti-patterns
- [EXAMPLES.md](./EXAMPLES.md) — archetype code examples for all 4 component types (Simple Input, Drop/Modal, Display Only, Layout)
- [references/architecture.md](./references/architecture.md) — forwardRef, useForwardedRef, useThemeValue, FormContext/useFormInput, directory structure, propTypes, TypeScript declarations
- [references/styling.md](./references/styling.md) — styled-components, styledComponentsConfig, theme token namespace, disabledStyle/readOnlyStyle, t-shirt sizing
- [references/accessibility.md](./references/accessibility.md) — Keyboard component, focus restore, aria-label, Escape handling, semantic HTML rules
- [references/forms.md](./references/forms.md) — FormContext.useFormInput(), FormField error surfacing, non-destructive UX
- [references/i18n.md](./references/i18n.md) — MessageContext string keys, AnnounceContext live regions, polite vs assertive
