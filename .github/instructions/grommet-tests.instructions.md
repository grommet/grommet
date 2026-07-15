---
description: "Rules for writing tests and Storybook stories for Grommet components. Always applied when editing test or story files. Covers jest-axe, @testing-library/react, userEvent, query priority, Grommet wrapper, CSF-3 story format, and required story types."
applyTo: ["src/js/components/**/__tests__/**", "src/js/components/**/stories/**"]
---

## Test File Rules

- **axe check must be the first test** in every file — use `jest-axe` wrapped in `<Grommet>`
- **Wrap all renders in `<Grommet>`** so theme tokens and contexts evaluate correctly; omit only when explicitly testing unwrapped behavior
- **File extension**: `.tsx` for all new test files
- **Target ≥85% coverage** for state logic, prop handling, and keyboard navigation

## Interactions

```tsx
// Preferred — simulates full browser event sequences:
const user = userEvent.setup();
await user.click(element);
await user.type(input, 'value');
await user.keyboard('{Escape}');

// Only for synthetic events userEvent cannot produce:
fireEvent.custom(element, { detail: ... });
```

Never use `fireEvent.click` for standard user interactions — use `userEvent`.

## DOM Query Priority

1. `screen.getByRole('button', { name: /label/i })` — first choice; reflects semantics
2. `screen.getByLabelText('Email')` — for labeled inputs
3. `screen.getByText('Submit')` — last resort

Avoid `getByTestId` and `querySelector`.

## Snapshots

Use `asFragment()`, not `container.innerHTML`:
```tsx
expect(asFragment()).toMatchSnapshot();
```

## Storybook Story Rules

- **One story per file**, CSF-3 format
- **Title format**: `'ComponentCategory/ComponentName/StoryName'`
- **File extension**: `.tsx` for new story files
- **Always include**: basic uncontrolled and/or controlled usage when the component has a value contract
- **Always include**: `Form` + `FormField` integration story when the component participates in forms
- **Only add** a `CustomThemed` story when the component introduces new theme tokens
