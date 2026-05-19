## Component Implementation Guidelines for Grommet Contributions

### Directory Structure

- Each component lives in its own directory under `src/js/components/<ComponentName>/`.
- Child and subcomponents are implemented as **peers** of the parent, not nested inside it. For example, `CardBody`, `CardHeader`, and `CardFooter` are siblings of `Card`, each in their own directory. See `Card/`, `Data/`, and `Table/` for reference.
- The standard file layout for a component directory is:

  ```
  ComponentName/
  ├── ComponentName.js      # Component implementation
  ├── ComponentNameContext.js  # Context provider (if needed; see Accordion, Tabs)
  ├── StyledComponentName.js   # Styled-components (if needed; see Anchor, Avatar)
  ├── propTypes.js          # Runtime prop validation (development only)
  ├── index.d.ts            # TypeScript declarations
  ├── index.js              # Public exports
  ├── README.md             # Component overview
  ├── __tests__/
  │   └── ComponentName-test.tsx
  └── stories/
      └── FeatureName.stories.tsx  # One story per file
  ```

- Context files (e.g., `AccordionContext.js`, `TabsContext.js`) belong inside the parent component's directory alongside its implementation, not in `src/js/contexts/`. The `src/js/contexts/` directory is reserved for app-level or cross-cutting contexts like `ThemeContext`, `ResponsiveContext`, and `MessageContext`.

### Component Implementation

- Use `React.forwardRef` to expose the underlying DOM ref. Assign `Component.displayName` to ensure the component is identifiable in React DevTools and error messages. Example:

  ```js
  const MyComponent = forwardRef(({ ...props }, ref) => {
    // ...
  });
  MyComponent.displayName = 'MyComponent';
  export { MyComponent };
  ```

- Access theme values via the `useThemeValue()` hook (see `Card.js`, `Data.js`). Do not read `ThemeContext` directly.
- Support the controlled/uncontrolled state pattern where applicable. `Form` and `Select` are the canonical references. In short: accept both a value prop (controlled) and a default value prop (uncontrolled), and call an `onChange`/`onActive` callback when state changes.
- Include `a11yTitle` in `propTypes` and `index.d.ts`. It is a standard Grommet prop on all interactive components and maps to `aria-label`. The `genericProps` utility object from `src/js/utils/general-prop-types.js` includes `a11yTitle` and should be spread into `propTypes` for most components.
- Spread `...rest` onto the root DOM element so consumers can pass standard HTML attributes and event handlers without the component needing to explicitly declare each one.

### Context and Hooks

- When a component needs to share state with subcomponents, create a context file in the component's own directory (e.g., `AccordionContext.js`). Export the context from `index.js` if consumers need to access it directly.
- For components that expose a programmatic consumer API (e.g., Stepper, Wizard), expose a custom hook (e.g., `useStepper()`, `useWizard()`) as the primary access point. Subcomponents and consumer code use the hook rather than importing the context object directly. The hook should call `React.useContext` internally.

  ```js
  // MyComponentContext.js
  import { createContext } from 'react';
  export const MyComponentContext = createContext({});
  ```

  ```js
  // In MyComponent.js or a dedicated hook file
  export const useMyComponent = () => React.useContext(MyComponentContext);
  ```

### Exports

- Each component's `index.js` exports only its public API by name:

  ```js
  export { MyComponent } from './MyComponent';
  ```

- After implementing the component, add it to `src/js/components/index.js` using `export * from './ComponentName'`. Add entries in alphabetical order to match the existing file convention.
- If the component introduces new types that consumers need (e.g., `StepType`, `StepChangeEvent`), declare them in the component's `index.d.ts` and re-export them from `src/js/components/index.d.ts` (if it exists) and `src/js/index.d.ts` so they are part of the top-level `grommet` package exports.
- When a component introduces a context that is part of the public API, export it from both the component's `index.js` and the top-level `src/js/components/index.js`.

### TypeScript Declarations

- TypeScript support is provided via `index.d.ts` files rather than rewriting components in TypeScript. This preserves backward compatibility with React 16, 17, and 18.
- Declare component props as an interface (e.g., `TabsProps`) and a separate extended interface that merges with the relevant HTML element's props (e.g., `TabsExtendedProps extends TabsProps, divProps`). See `Tabs/index.d.ts` and `Accordion/index.d.ts` for the pattern.
- Use types from `src/js/utils/index.d.ts` for common prop types such as `A11yTitleType`, `MarginType`, `AlignSelfType`, and `GridAreaType` rather than redefining them.

### PropTypes

- PropTypes are defined in a separate `propTypes.js` file and imported into the component. Guard the definition with `process.env.NODE_ENV !== 'production'` to eliminate them from production bundles:

  ```js
  // propTypes.js
  import PropTypes from 'prop-types';
  import { genericProps } from '../../utils/general-prop-types';

  let PropType = {};
  if (process.env.NODE_ENV !== 'production') {
    PropType = {
      ...genericProps, // includes a11yTitle, alignSelf, gridArea, margin
      myProp: PropTypes.string,
    };
  }
  export const MyComponentPropTypes = PropType;
  ```

- Import the propTypes in the component file and assign them at the bottom:

  ```js
  // MyComponent.js
  import { MyComponentPropTypes } from './propTypes';

  // ... component definition ...

  MyComponent.propTypes = MyComponentPropTypes;
  ```

### Accessibility

- All components must meet a minimum of WCAG AA. When possible try to meet AAA requirements. This includes semantic HTML, correct ARIA attributes, full keyboard navigation, and screen reader compatibility.
- Use `aria-label` to provide an accessible label when the visual label is absent or insufficient.
- For keyboard interactions (arrow key navigation, roving tabindex, etc.), the `Keyboard` component from `src/js/components/Keyboard/` is available for declarative key event handling.
- Live regions for screen reader announcements should use the `AnnounceContext` from `src/js/contexts/` (see `Data.js` for usage).

---

## Styling Guidelines for Grommet Components

- Component styles are defined in `Styled[ComponentName].js` and controlled via Grommet's theme for easy customization. Defaults are defined in `src/js/themes/base.js` and can be overridden in custom themes such as `grommet-theme-hpe` or a component's props when appropriate.
- Component implementation should be focused on behavior, functionality, and accessibility, with styling delegated entirely to the theme.
- Do not include hardcoded styles or inline styles in component code. All style defaults belong in `base.js` and are accessed at runtime via `useThemeValue()`.

### Adding Theme Tokens

- New component tokens are namespaced under the component name in `base.js` (e.g., `theme.tabs`, `theme.accordion`). Add the new namespace in alphabetical order alongside existing entries.
- Define sensible defaults in `base.js` that produce correct rendering without any consumer-supplied theme overrides.
- Add corresponding TypeScript declarations for the new token namespace in `src/js/themes/base.d.ts`.

### Custom Theme Testing

- HPE-specific styling is out of scope for this RFC. The component should be designed so HPE theming can be applied purely through token overrides without changes to the component itself.

* To verify that a component is fully themeable, create a `CustomThemed` story that defines a partial `customTheme` object containing only the new component tokens and passes it directly to `<Grommet theme={customTheme}>`. Grommet's `theme` prop merges with the default theme internally — no manual merge utility is needed.

---

## Storybook Guidelines for Grommet Components

- Stories live in a `stories/` directory inside the component directory (e.g., `Stepper/stories/`).
- Write **one story per file** for discoverability and ease of maintenance.
- Follow [CSF-3 format](https://storybook.js.org/docs/api/csf): a default export for metadata and named exports for each story. See [PR #7942](https://github.com/grommet/grommet/pull/7942) for examples.
- Stories must be written in TypeScript (`.stories.tsx`).
- The story title follows the pattern `'ComponentCategory/ComponentName/StoryName'` (e.g., `'Navigation/Stepper/Horizontal Steps'`). Check adjacent components for the correct category.
- Stories should not import from relative paths outside the component directory. Import from `'grommet'` and `'grommet/themes'` as consumers would.
- Include a `CustomThemed` story for any component that introduces new theme tokens.

---

## Testing Guidelines for Grommet Components

- All tests must be written in TypeScript and located in a `__tests__` directory adjacent to the component implementation.
- Name test files `<ComponentName>-test.tsx` (e.g., `Stepper-test.tsx`).
- The standard test stack is `@testing-library/react`, `jest-axe`, and `jest-styled-components`. At the top of each test file, import:

  ```tsx
  import { render, screen } from '@testing-library/react';
  import userEvent from '@testing-library/user-event';
  import { axe } from 'jest-axe';
  import 'jest-axe/extend-expect';
  import 'jest-styled-components';
  ```

  See `Tabs/__tests__/Tabs-test.tsx` and `Accordion/__tests__/Accordion-test.tsx` for reference.

- Every component test file must include at least one `axe` accessibility check as the first test:

  ```tsx
  test('should have no accessibility violations', async () => {
    const { container } = render(
      <Grommet>
        <MyComponent />
      </Grommet>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
  ```

- Use `userEvent` from `@testing-library/user-event` for all interaction tests. Call `userEvent.setup()` at the start of each test that simulates user input, then `await` each interaction. `fireEvent` exists in older tests but should not be used in new ones — `userEvent` more accurately simulates real browser behavior. See `Accordion/__tests__/Accordion-test.tsx` (the canonical reference cited in `CONTRIBUTING.md`) which uses `userEvent.setup()` exclusively. Example:

  ```tsx
  const user = userEvent.setup();
  await user.click(screen.getByRole('button', { name: 'Step 1' }));
  await user.keyboard('{ArrowRight}');
  await user.tab();
  ```

- Use `screen` for all DOM queries. Query priority (per React Testing Library best practices, also documented in `CONTRIBUTING.md`): prefer `getByRole` → `getByLabelText` → `getByText` → `getByTestId`. Avoid querying by class name or element type.
- For snapshot tests, use `asFragment()` rather than `container.firstChild`. Snapshots are acceptable for DOM structure regression but must be paired with behavioral assertions — do not rely on them alone.
- Target **≥85% unit test coverage** for state logic, prop handling, keyboard navigation, and callback firing.
- Wrap renders in `<Grommet>` to ensure theme and context are available. Test rendering outside of `<Grommet>` only where the component is explicitly designed to work without it.
- For components that integrate with others (e.g., Stepper inside Wizard), write integration tests that exercise the full composition rather than mocking internal dependencies.
