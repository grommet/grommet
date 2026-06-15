# Grommet Architecture & Scaffolding Guidelines

When scaffolding new components or modifying the architecture of Grommet components, AI tools must adhere to these rules:

### 1. File & Directory Structure

When a new component is generated, construct it following Grommet's standard layout. Child and subcomponents must be implemented as peers in their own directories, not nested (e.g., `CardBody` is a sibling of `Card`). Typical file structure:

```
ComponentName/
├── ComponentName.js           # Component implementation
├── ComponentNameContext.js    # Context provider (if needed)
├── StyledComponentName.js     # Styled-components
├── propTypes.js               # Runtime prop validation
├── index.d.ts                 # TypeScript declarations
├── index.js                   # Public exports
├── README.md                  # Component overview
├── __tests__/
│   └── ComponentName-test.tsx # Tests using @testing-library/react and jest-axe
└── stories/
    └── FeatureName.stories.tsx # One story per file (CSF-3 format)
```

Component-specific context files live in the component directory; shared/global contexts live in `src/js/contexts/`.

### 2. General Implementation Rules

- **Flexibility through Composition:** Grommet focuses on extreme flexibility through composition and customizable "escape hatch" props. Always forward the DOM ref with `React.forwardRef`. When the component needs internal access to the node (e.g., to manage focus), wrap the forwarded ref with `useForwardedRef(ref)` and attach that wrapped ref to the DOM element; otherwise the forwarded `ref` may be passed straight through. Ensure `Component.displayName` is assigned.
- **Context & Hooks:** Context files belong inside the parent component's directory. For components with programmatic APIs, expose a custom hook (e.g., `useAccordion()`) as the primary access point that calls `React.useContext` internally.
- **Exports:** Each component's `index.js` must export only its public API by name. Also ensure you add the export to `src/js/components/index.js` in alphabetical order, update `index.d.ts`, and update `src/js/languages/default.json` for i18n keys.
- **Controlled vs Uncontrolled:** If a component handles user input or state, you **MUST** support the controlled/uncontrolled pattern. Accept both a value prop (controlled) and a default value prop (uncontrolled). Use `useFormInput` (see Section 3) to manage this state and integrate with `Form`. When state changes, call the `onChange` callback using the `{ value }` payload shape.
- **Prop Spreading:** Ensure you spread `...rest` onto the root DOM element so standard HTML attributes pass through natively.
- **TypeScript & PropTypes:** TypeScript support is provided strictly via `index.d.ts` files to preserve backwards compatibility. Ensure `PropTypes` are defined in a separate `propTypes.js` file, guarded by `process.env.NODE_ENV !== 'production'`.
- **Component Escape Hatches:** Expose `{underlying}Props` (e.g., `buttonProps`, `dropProps`) to safely pass configuration downwards.

### 3. State & Form Integration

- **Dual-State / Draft Pattern:** For complex inputs, keep a committed value plus a display/draft value. Use `const [committedValue, setCommittedValue] = useFormInput({ name, value, initialValue })`, alongside `const [textValue, setTextValue] = useState(formatForDisplay(committedValue))`.
- **Drop / Picker Draft Pattern:** Keep a draft selection separate from the committed value. `const [open, setOpen] = useState(false); const [draftSelection, setDraftSelection] = useState(null)`.
- **FormContext Integration:** Read `FormContext` via `const formContext = useContext(FormContext)` and call `formContext.useFormInput(...)`. Do not silently discard invalid user input.

### 4. Props API / Archetype Guidelines

Do not apply input defaults to non-input components.

- **Universal props:** `a11yTitle`, `id`, `disabled`, `...rest`. (Defer `margin`, `alignSelf`, `gridArea` via `genericProps`).
- **Input components:** `value`, `defaultValue`, `onChange`, `name`.
- **Picker/overlay:** internal open state + trigger.
- **Formatted display:** Derive from `Intl` or locale. Prefer `Intl.DateTimeFormat`, `Intl.NumberFormat` over custom parsing patterns.

### 5. Internal Utils

When building features, aim to reuse internal `/src/js/utils/` functions. Prefer core native browser APIs over custom logic wherever possible before relying on external libraries.

### 6. Component Archetypes & Examples

Use these as starting points to match the component archetype before adding new props or behavior. Adapt the event payload and commit flow to the component's actual contract.

#### 6.1 Simple Input

Use when the component edits one committed value with little or no draft state (e.g., `TextInput`, `CheckBox`, `RadioButton`).

```js
const MyInput = forwardRef(
  (
    {
      value: valueProp,
      defaultValue,
      onChange,
      name,
      disabled,
      a11yTitle,
      ...rest
    },
    ref,
  ) => {
    const inputRef = useForwardedRef(ref);
    const formContext = useContext(FormContext);
    const [value, setValue] = formContext.useFormInput({
      name,
      value: valueProp,
      initialValue: defaultValue,
    });

    return (
      <input
        ref={inputRef}
        name={name}
        disabled={disabled}
        aria-label={a11yTitle}
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
          onChange?.({ value: event.target.value });
        }}
        {...rest}
      />
    );
  },
);
```

- Use `formContext.useFormInput(...)` for value state so the component integrates with `Form`/`FormField` (this is the standard across `TextInput`, `CheckBox`, etc.). `useControlled` exists but is not the established pattern.
- Emit `onChange({ value })` when the component contract expects the Grommet shape.
- Add draft state only when formatting or validation requires it.

#### 6.2 Picker or Overlay

Use when the component opens a drop, popup, calendar, or selection surface (e.g., `Select`, `DateInput`, `DropButton`).

```js
const MyPicker = forwardRef(
  ({ value, defaultValue, onChange, ...rest }, ref) => {
    const buttonRef = useForwardedRef(ref);
    const [open, setOpen] = useState(false);
    const [draftValue, setDraftValue] = useState(value ?? defaultValue ?? null);

    const commit = (nextValue) => {
      setDraftValue(nextValue);
      onChange?.({ value: nextValue });
      setOpen(false);
      requestAnimationFrame(() => buttonRef.current?.focus()); // Restore focus
    };

    return (
      <button
        ref={buttonRef}
        onClick={() => setOpen((next) => !next)}
        {...rest}
      >
        {/* Render overlay and call commit(nextValue) on selection */}
      </button>
    );
  },
);
```

- Keep open state internal unless controlled open is explicitly needed.
- Separate draft from committed selection.

#### 6.3 Display Only

Use when the component renders content but does not own a value (e.g., `Button`, `Text`, `Heading`, `Anchor`).

```js
const MyDisplay = forwardRef(({ a11yTitle, children, ...rest }, ref) => {
  const containerRef = useForwardedRef(ref);
  return (
    <div ref={containerRef} aria-label={a11yTitle} {...rest}>
      {children}
    </div>
  );
});
```

- Do not add `value` or `defaultValue` by default.
- Prefer theme tokens & variants over ad-hoc styling props.

#### 6.4 Layout or Composition

Use when the component arranges children or composes other components (e.g., `Box`, `Grid`, `Stack`, `Layer`).

```js
const MyLayout = forwardRef(({ children, ...rest }, ref) => {
  const containerRef = useForwardedRef(ref);
  return (
    <div ref={containerRef} {...rest}>
      {children}
    </div>
  );
});
```

- Keep data handling out of the API.
- Prefer universal layout props plus theme-driven styling.

---

_See the **Anti-Patterns (Never Generate)** table in `.github/copilot-instructions.md` for the full list of forbidden patterns._
