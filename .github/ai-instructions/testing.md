# Grommet Testing & Storybook Guidelines

### 1. Testing Rules

- **Stack:** The test stack is `@testing-library/react`, `jest-axe`, and `jest-styled-components`.
- **File Extensions:** Use `.tsx` for new test files. The codebase is incrementally migrating all tests to TypeScript.
- **Setup:** Prefer `userEvent.setup()` for interaction tests — it simulates full browser event sequences including focus, hover, and keyboard. Use `fireEvent` only for low-level events that `userEvent` does not support (e.g., dispatching custom or synthetic events directly on a node).
- **DOM Queries:** Query the DOM using `screen`. **Priority:** Prefer `getByRole`, then `getByLabelText`, then `getByText`.
- **Snapshots:** Use `asFragment()` for setting up component snapshots.
- **A11y Checks:** Every component test file must include at least one `axe` accessibility check as the very first test.
- **Wrappers:** Wrap renders in `<Grommet>` by default so theme tokens and contexts evaluate correctly; omit only when explicitly testing unwrapped behavior.
- **Coverage:** Target ≥85% unit test coverage for state logic, prop handling, and keyboard navigation.

### 2. Storybook Rules

- **File Extensions:** Use `.tsx` for new story files.
- **Format:** Strictly one story per file.
- **Titling:** The story title should follow `'ComponentCategory/ComponentName/StoryName'`.
- **Required Stories:**
  - Include a basic uncontrolled and/or controlled usage story when the component has a value contract.
  - Include `Form` + `FormField` integration when the component participates in forms.
  - Include a `CustomThemed` story _only_ when the component introduces new theme tokens.

---

_See the **Anti-Patterns (Never Generate)** table in `.github/copilot-instructions.md` for the full list of forbidden patterns._
