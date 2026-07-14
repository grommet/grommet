# Grommet Forms Guidelines

### 1. FormContext Integration

- **useFormInput:** Ensure form inputs integrate with `FormContext`. Use `formContext.useFormInput(...)` to manage value state (see Architecture guidelines, Section 3). This handles both controlled and uncontrolled patterns and wires the component into `Form`'s submit/reset lifecycle automatically.
- **Expose errors via FormField:** Surface validation errors through `FormField`'s error state. Never discard or silently suppress invalid user input — always give the user a chance to see and correct it.

### 2. Validation & Error Handling

- **Non-Destructive UX:** Do not erase or revert user work abruptly when it fails validation (e.g., reverting invalid text on blur). Rely on exposing the error state explicitly through `FormField`, allowing the user to correct their own draft.

---

_See the **Anti-Patterns (Never Generate)** table in `.github/copilot-instructions.md` for the full list of forbidden patterns._
