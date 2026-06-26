# Grommet Component Contribution Examples

Use these examples to match the component archetype before adding new props or behavior. The goal is to keep the public API aligned with how Grommet components already work.
The snippets are intentionally abbreviated. Adapt the event payload and commit flow to the component's actual contract.

## 1. Simple Input

Use when the component edits one committed value with little or no transient display state. Native element wrappers should emit the standard React synthetic event.

Examples: `TextInput`, `CheckBox`, `RadioButton`

```js
const MyInput = forwardRef(({ value: valueProp, defaultValue, onChange, name, disabled, ...rest }, refArg) => {
  const [value, setValue] = useControlled({
    prop: valueProp,
    defaultProp: defaultValue,
  });

  return (
    <input
      ref={refArg}
      name={name}
      disabled={disabled}
      value={value}
      onChange={(event) => {
        setValue(event.target.value);
        onChange?.(event);  // Emit standard React synthetic event
      }}
      {...rest}
    />
  );
});
```

Rules:
- Keep the API focused on the value contract.
- Emit the standard React synthetic event `onChange(event)` for native element wrappers.
- Do not add extra transient state for simple inputs; add transient display state only when formatting or validation requires it.

## 2. Drop or Modal

Use when the component opens a drop, popup, calendar, or selection surface.

Examples: `Select`, `DateInput`, `DropButton`

```js
const MyDropButton = forwardRef(({ value, defaultValue, onChange, ...rest }, refArg) => {
  const ref = useForwardedRef(refArg);
  const { useFormInput } = useContext(FormContext);
  const [committedValue, setCommittedValue] = useFormInput({
    value: value,
    initialValue: defaultValue,
  });
  const [open, setOpen] = useState(false);

  const commit = (nextValue) => {
    setCommittedValue(nextValue);
    onChange?.({ value: nextValue });
    setOpen(false);
    // Restore focus to the trigger element after closing
    requestAnimationFrame(() => {
      ref.current?.focus();
    });
  };

  return (
    <button ref={ref} onClick={() => setOpen((next) => !next)} {...rest}>
      {/* Render the drop/modal surface here and call commit(nextValue) when the selection is confirmed. */}
    </button>
  );
});
```

Rules:
- Keep open state internal unless there is a clear need for a controlled open prop.
- Use `FormContext.useFormInput()` to integrate with forms and manage the committed value.
- Keep transient UI state internal; do not expose internal state in the public API.
- Restore focus to the trigger element on close.

## 3. Display Only

Use when the component renders content but does not own a value.

Examples: `Text`, `Heading`, `Anchor`

```js
import styled from 'styled-components';

const StyledBox = styled.div`
  // component styling
`;

const MyDisplay = forwardRef(({ 'aria-label': ariaLabel, children, ...rest }, refArg) => {
  return (
    <StyledBox ref={refArg} aria-label={ariaLabel} {...rest}>
      {children}
    </StyledBox>
  );
});
```
