---
name: grommet-component-architecture
description: "Architect or refactor Grommet React components using the repo's standard structure and state patterns. Use when scaffolding a new component, reorganizing files, defining prop APIs, choosing controlled vs uncontrolled behavior, adding FormContext integration, placing component context files, wiring exports, or aligning a component with Grommet conventions. Covers forwardRef, displayName, useForwardedRef, useThemeValue, propTypes, index.d.ts, top-level exports, and composition over configuration."
argument-hint: "Describe the architecture task (e.g. 'scaffold a new picker component' or 'refactor this component to use FormContext')"
---

# Grommet Component Architecture Skill

## When to Use

- Creating a new component or subcomponent structure
- Refactoring a component that drifted from Grommet conventions
- Designing a prop API, value contract, or context boundary
- Adding controlled and uncontrolled state behavior or form participation

## Workflow

1. Identify the archetype: simple input, drop or layer, display-only, or layout or composition.
2. Mirror the nearest existing component directory and public API shape.
3. Implement with `forwardRef`, `displayName`, `useForwardedRef`, and `useThemeValue()`.
4. Choose controlled and uncontrolled behavior deliberately and integrate with `FormContext` when the component owns user input.
5. Register the public surface: `index.js`, top-level exports, `index.d.ts`, docs, tests, and stories.

## Non-Negotiable Rules

- Prefer composition over configuration.
- Start with the minimum viable API; avoid speculative props.
- Always forward refs and assign `displayName`.
- Use `useThemeValue()` instead of reading `ThemeContext` directly.
- Use `formContext.useFormInput(...)` for form-participating inputs.
- Emit `onChange({ value })` for structured inputs and `onChange(event)` for native wrappers.
- Keep component-specific context in the component directory.
- Maintain `propTypes.js` and `index.d.ts` alongside the implementation.
- Add exports in alphabetical order and update language defaults for new message keys.

## Design Questions

- Is this an input, picker, display, or layout component?
- Does it own committed value, draft value, or only presentation?
- Does it need a component context or can composition stay flat?
- Should flexibility come from theme tokens instead of new props?
- Does the API preserve backwards compatibility and avoid renames or default-behavior breaks?

## See Also

- [../../ai-instructions/architecture.md](../../ai-instructions/architecture.md)
- [../../ai-instructions/forms.md](../../ai-instructions/forms.md)
- [../../ai-instructions/styling.md](../../ai-instructions/styling.md)
- [../../ai-instructions/i18n.md](../../ai-instructions/i18n.md)
