# Grommet Component Contribution Reference

This file contains the detailed rules behind the main skill. Keep the main `SKILL.md` concise and use this reference when you need implementation detail.

## 1. Grommet Philosophy

- Composition over monoliths: build small focused primitives and compose them.
- Browser APIs first: prefer `Intl.DateTimeFormat`, `Intl.NumberFormat`, and similar browser primitives over custom parsing/formatting when possible.
- Escape hatches via theme: customization belongs in theme tokens, not per-instance props.
- Standard form semantics:
  - Native element wrappers emit standard React synthetic events via `onChange(event)`.
  - Structured inputs that manage parsed/formatted values emit `onChange({ value })`.
- Accessibility is mandatory: semantic HTML, keyboard support, ARIA, and screen-reader compatibility are required.
- `...rest` spreading: pass unknown props to the root DOM element unless there is a strong reason not to.

## 2. Directory Structure

```
src/js/components/<ComponentName>/
├── ComponentName.js
├── ComponentNameContext.js
├── StyledComponentName.js
├── propTypes.js
├── index.d.ts
├── index.js
├── README.md
├── __tests__/ComponentName-test.tsx
└── stories/FeatureName.stories.{js,tsx}
```

Rules:
- Subcomponents are peer directories, not nested.
- Context files live in the component directory, not in `src/js/contexts/`.
- Test files live in `__tests__/` and should use `.tsx`.
- Story files live in `stories/` and should match the local component convention (`.js` or `.tsx`).

## 3. Component Implementation

Required pattern:

```js
import React, { forwardRef } from 'react';
import { useForwardedRef } from '../../utils';
import { useThemeValue } from '../../utils/useThemeValue';
import { MyComponentPropTypes } from './propTypes';

const MyComponent = forwardRef(({ 'aria-label': ariaLabel, id, name, ...rest }, refArg) => {
  const { theme, passThemeFlag } = useThemeValue();
  const ref = useForwardedRef(refArg);
  return <div ref={ref} aria-label={ariaLabel} {...rest} />;
});

MyComponent.displayName = 'MyComponent';

if (process.env.NODE_ENV !== 'production') {
  MyComponent.propTypes = MyComponentPropTypes;
}

export { MyComponent };
```

Checklist:
- Use `React.forwardRef` and set `displayName`.
- Use `useForwardedRef(refArg)` instead of a raw ref.
- Access theme with `const { theme, passThemeFlag } = useThemeValue()`.
- Integrate forms through `FormContext` and `useFormInput` when the component participates in forms.
- Keep `value` + `defaultValue` + `onChange` patterns consistent.
- Spread `...rest` on the root DOM element.

## 4. Props API Design

Start with the minimum viable API:

Component shapes differ. Do not apply input defaults to non-input components.

| Category | Core MVP Props | Defer |
|---|---|---|
| All components | `aria-label`, `id`, `...rest` | `margin`, `alignSelf`, `gridArea` via `genericProps` |
| Input components | `value`, `defaultValue`, `onChange`, `name`, `disabled` | `onBlur`, `onFocus`, `plain`, `readOnlyCopy` |
| Drop or Modal | internal open state + trigger | `inline`, `openOnFocus`, `dropProps`, `buttonProps` |
| Constrained values | `bounds` or `options` | Separate `min`/`max`, `step` |
| Formatted display | derive from `Intl` or locale | Custom format strings |
| Customization | theme only | per-instance `icon`, `size` |

Recommended interpretation:
- Universal props belong in the first row only.
- `value`, `defaultValue`, `onChange`, and `name` are input-component defaults, not universal defaults.
- `disabled` applies to interactive components that support user interaction; non-interactive display components (Text, Heading, Anchor) do not include it.
- Use the row that matches the component archetype before adding any API.

Do not:
- Copy input defaults onto display-only components.
- Expose `dropProps`, `buttonProps`, or `openOnFocus` unless the component is actually a drop/modal surface.
- Add per-instance style props when a theme token already exists.
- Invent a custom value contract when the nearest Grommet component already establishes one.

### onChange Semantics

- Native element wrappers: fire on every meaningful interaction via standard React synthetic event `onChange(event)`.
- Structured inputs: fire only when the composed value is valid via `onChange({ value })`.
