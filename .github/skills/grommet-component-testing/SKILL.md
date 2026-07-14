---
name: grommet-component-testing
description: "Write tests and Storybook stories for Grommet components. Use when writing unit tests with @testing-library/react and jest-axe, setting up userEvent interactions, querying the DOM, or creating CSF-3 Storybook stories. Covers required axe accessibility checks as the first test, userEvent vs fireEvent guidance, query priority (getByRole first), Grommet wrapper requirement, snapshot usage, coverage targets, story file format, FormField integration stories, and CustomThemed stories."
argument-hint: "Describe what needs testing or which stories to write (e.g. 'write tests for a RangeSlider component')"
---

# Grommet Component Testing Skill

## When to Use
- Writing a new `__tests__/ComponentName-test.tsx` file
- Adding test cases to an existing test file
- Creating Storybook story files in `stories/`
- Reviewing tests against Grommet's coverage and accessibility requirements

## Workflow

### Tests
1. **axe first** — the very first test in every file must be an axe accessibility check wrapped in `<Grommet>`.
2. **Queries** — query via `screen.getByRole` → `getByLabelText` → `getByText`. Use `getByRole` whenever a semantic role is available.
3. **Interactions** — use `userEvent.setup()` for all user interactions (click, type, keyboard). Use `fireEvent` only for low-level synthetic events that `userEvent` cannot produce.
4. **Snapshots** — use `asFragment()` for snapshot assertions, not `container.innerHTML`.
5. **Wrappers** — wrap renders in `<Grommet>` by default. Omit only when explicitly testing unwrapped/unstyled behavior.
6. **Coverage** — target ≥85% for state logic, prop handling, and keyboard navigation.

### Stories
1. One story per file, CSF-3 format.
2. Title: `'ComponentCategory/ComponentName/StoryName'`.
3. Always include a basic controlled and/or uncontrolled usage story when the component has a value contract.
4. Include a `Form` + `FormField` integration story when the component participates in forms.
5. Add a `CustomThemed` story **only** when the component introduces new theme tokens.

## Key Rules
- File extension: `.tsx` for both test files and new story files
- Test files live in `__tests__/`, story files live in `stories/`
- `userEvent.setup()` not `fireEvent` for simulating user interactions
- `screen.getByRole` as the first query choice — it reflects actual accessibility semantics
- Every test file starts with an axe check
- Wrap all renders in `<Grommet>` unless testing unwrapped behavior explicitly

## See Also
- [REFERENCE.md](./REFERENCE.md) — full code examples for test structure, axe setup, userEvent patterns, story CSF-3 format, and FormField integration
