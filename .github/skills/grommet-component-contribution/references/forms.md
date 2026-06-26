# Forms Integration Reference

## FormContext.useFormInput()

Connect any input component to Grommet's `Form` / `FormField` system via `useFormInput`. This handles controlled/uncontrolled state and wires the component into `Form`'s submit and reset lifecycle automatically:

```js
import { useContext } from 'react';
import { FormContext } from '../../contexts/FormContext';

const MyInput = forwardRef(
  ({ value: valueProp, defaultValue, name, onChange, ...rest }, refArg) => {
    const formContext = useContext(FormContext);
    const [value, setValue] = formContext.useFormInput({
      name,
      value: valueProp,           // controlled prop
      initialValue: defaultValue, // uncontrolled fallback
    });

    return (
      <input
        name={name}
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

Do not use raw `useState` for the committed value of an input component — always go through `formContext.useFormInput` so the component participates in `Form`'s submit/reset.

## Surfacing Errors via FormField

Do not write custom error display logic. `FormField` owns the visual error display and links errors to inputs via ARIA. Surface validation state through `FormField`'s `error` prop — the component itself does not need to render error messages.

## Non-Destructive Validation UX

**Never** erase or revert the user's draft when it fails validation. For example, do not clear a text field on blur if the value is invalid. Keep the draft visible and show the error state alongside it so the user can correct their own input.
