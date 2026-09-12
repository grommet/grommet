---
name: grommet-component-review
description: 'Review Grommet component diffs or pull requests against repo conventions. Use when doing code review for component API design, accessibility, theming, form integration, i18n, tests, stories, TypeScript declarations, exports, or regression risk. Covers forwardRef and displayName, useThemeValue, FormContext, MessageContext, AnnounceContext, theme token placement, axe-first tests, Storybook requirements, and compatibility with existing Grommet patterns.'
argument-hint: "Describe the review target (e.g. 'review this DateInput refactor' or 'check this new component PR for convention gaps')"
---

# Grommet Component Review Skill

## When to Use

- Reviewing a component pull request or diff
- Auditing a new component for acceptance into Grommet core
- Checking a refactor for regressions against Grommet patterns
- Verifying tests, stories, exports, and docs before merge

## Review Order

1. API shape and backwards compatibility
2. Component architecture and state model
3. Accessibility and keyboard behavior
4. Theming and styling token placement
5. Forms and i18n integration
6. Tests, stories, types, and exports

## Findings to Look For

- Public API drift, speculative props, or breaking default behavior
- Missing `forwardRef`, `displayName`, `useThemeValue()`, or `FormContext` integration where required
- Hardcoded English strings instead of `MessageContext` or missing `AnnounceContext` usage
- Custom disabled or readOnly styling instead of shared helpers or theme tokens in the right namespace
- Missing `axe` coverage, weak keyboard tests, or absent `FormField` stories for form-participating components
- Missing `propTypes.js`, `index.d.ts`, README, or top-level export registration

## Output Expectations

- Prioritize findings over summary
- Reference concrete files and behaviors
- Call out accessibility regressions, compatibility risks, and test gaps explicitly
- If no issues are found, state that clearly and mention any residual risk or missing validation

## See Also

- [../../ai-instructions/architecture.md](../../ai-instructions/architecture.md)
- [../../ai-instructions/accessibility.md](../../ai-instructions/accessibility.md)
- [../../ai-instructions/styling.md](../../ai-instructions/styling.md)
- [../../ai-instructions/forms.md](../../ai-instructions/forms.md)
- [../../ai-instructions/i18n.md](../../ai-instructions/i18n.md)
- [../../ai-instructions/testing.md](../../ai-instructions/testing.md)
