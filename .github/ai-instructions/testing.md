# Grommet Testing & Storybook Guidelines

### 1. Testing Rules

- **Stack:** The test stack is `@testing-library/react`, `jest-axe`, and `jest-styled-components`.
- **File Extensions:** Match the neighboring test files in the component folder (e.g., if the folder uses `.js`, the test should be `.js`; if `.tsx`, test uses `.tsx`).
- **Setup:** Always call `userEvent.setup()` at the start of interactions (never use `fireEvent`).
- **DOM Queries:** Query the DOM using `screen`. **Priority:** Prefer `getByRole`, then `getByLabelText`, then `getByText`.
- **Snapshots:** Use `asFragment()` for setting up component snapshots.
- **A11y Checks:** Every component test file must include at least one `axe` accessibility check as the very first test.
- **Wrappers:** Always wrap renders in `<Grommet>` so theme tokens and contexts evaluate correctly during tests.
- **Coverage:** Target ≥85% unit test coverage for state logic, prop handling, and keyboard navigation.

### 2. Storybook Rules

- **File Extensions:** Match the neighboring story files in the component folder (`.js` or `.tsx`).
- **Format:** Strictly one story per file, using CSF-3 format.
- **Titling:** The story title should follow `'ComponentCategory/ComponentName/StoryName'`.
- **Required Stories:**
  - Include a basic uncontrolled and/or controlled usage story when the component has a value contract.
  - Include `Form` + `FormField` integration when the component participates in forms.
  - Include a `CustomThemed` story _only_ when the component introduces new theme tokens.

---

_See the **Anti-Patterns (Never Generate)** table in `.github/copilot-instructions.md` for the full list of forbidden patterns._
