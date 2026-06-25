# Architecture & Implementation Reference

## Directory Structure

```
src/js/components/<ComponentName>/
├── ComponentName.js              # Component implementation
├── ComponentNameContext.js       # Context provider (if needed)
├── StyledComponentName.js        # Styled-components
├── propTypes.js                  # Runtime prop validation
├── index.d.ts                    # TypeScript declarations
├── index.js                      # Public exports
├── README.md                     # Component overview
├── __tests__/
│   └── ComponentName-test.tsx    # Tests
└── stories/
    └── FeatureName.stories.tsx   # One story per file (CSF-3)
```

- Subcomponents are **peer directories**, not nested (`CardBody` sits beside `Card`, not inside it)
- Context files belong in the component directory, not `src/js/contexts/`
- Test files use `.tsx` extension
- Story files use `.tsx` extension

## Component Shell

```js
import React, { forwardRef, useContext } from 'react';
import { useForwardedRef } from '../../utils';
import { useThemeValue } from '../../utils/useThemeValue';
import { FormContext } from '../../contexts/FormContext';
import { MyComponentPropTypes } from './propTypes';

const MyComponent = forwardRef(
  ({ 'aria-label': ariaLabel, id, ...rest }, refArg) => {
    const ref = useForwardedRef(refArg);
    const { theme, passThemeFlag } = useThemeValue();

    return (
      <div
        ref={ref}
        aria-label={ariaLabel}
        id={id}
        {...passThemeFlag}
        {...rest}
      />
    );
  },
);

MyComponent.displayName = 'MyComponent';

if (process.env.NODE_ENV !== 'production') {
  MyComponent.propTypes = MyComponentPropTypes;
}

export { MyComponent };
```

- Always `React.forwardRef` — required for ref forwarding and `FormField` integration
- Always assign `displayName` — used by React DevTools, error stacks, and `FormField` to identify wrapped children
- `useForwardedRef(refArg)` — use when the component needs internal access to the DOM node
- `useThemeValue()` — the only correct way to access the theme; never `useContext(ThemeContext)` directly
- Spread `{...passThemeFlag}` on styled components so theme propagation works correctly
- Spread `...rest` on the root DOM element

## Exports

In `ComponentName/index.js`:
```js
export { MyComponent } from './MyComponent';
```

In `src/js/components/index.js` (alphabetical order):
```js
export { MyComponent } from './MyComponent';
```

Also update `src/js/index.d.ts` and `src/js/languages/default.json` for any i18n keys the component uses.

## Controlled / Uncontrolled Pattern

Input components must support both controlled (`value`) and uncontrolled (`defaultValue`) usage via `FormContext.useFormInput`:

```js
const formContext = useContext(FormContext);
const [value, setValue] = formContext.useFormInput({
  name,
  value: valueProp,           // controlled prop
  initialValue: defaultValue, // uncontrolled fallback
});
```

- `onChange` for structured inputs: `onChange?.({ value: nextValue })`
- `onChange` for native element wrappers: `onChange?.(event)`
- Do not use raw `useControlled` — `formContext.useFormInput` is the established pattern across the codebase

## propTypes.js

```js
import PropTypes from 'prop-types';

const MyComponentPropTypes = {
  'aria-label': PropTypes.string,
  id: PropTypes.string,
  // ...
};

export { MyComponentPropTypes };
```

Assign inside the component file, guarded by the `process.env` check so propTypes are stripped in production:

```js
if (process.env.NODE_ENV !== 'production') {
  MyComponent.propTypes = MyComponentPropTypes;
}
```

## TypeScript (index.d.ts)

Types live in `.d.ts` declaration files, not inline TypeScript source. Follow the shape of nearby components in the codebase. Keep the JavaScript source as-is and update only the declaration file.

## Context & Named Hooks

When a parent needs to share state with deeply nested children, create a React context. Export a **named hook** as the public API — not the context object directly:

```js
// MyComponentContext.js
import React, { useContext } from 'react';

const MyComponentContext = React.createContext({});

const useMyComponent = () => useContext(MyComponentContext);

export { MyComponentContext, useMyComponent };
```

Context files live in the component directory alongside the component, not in `src/js/contexts/`.

## Drop / Layer Draft Pattern

Keep a draft value separate from the committed value. The draft only becomes committed when the user confirms:

```js
const [open, setOpen] = useState(false);
const [draftValue, setDraftValue] = useState(value ?? defaultValue ?? null);
```

Keep open state internal unless a controlled `open` prop is explicitly required.

## Escape Hatch Props

Expose `{underlying}Props` (e.g., `buttonProps`, `dropProps`) only where there is a clearly demonstrated need. Do not add them speculatively.
