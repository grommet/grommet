# Grommet Styling & Primitives Guidelines

When styling components, AI tools must adhere to Grommet's visual constraints and primitives.

### 1. Theming & Styling

- **Use `styled-components`:** Grommet utilizes `styled-components` extensively. AI should generate styled components and heavily rely on `theme` variables. Filter non-DOM props before styling using `shouldForwardProp`.
- **Consuming & Namespacing Themes:** Inside a component, always extract theme values using `const { theme, passThemeFlag } = useThemeValue()`. When creating a new component, default theme tokens should live under a dedicated `theme.<componentName>` namespace in `base.js`. When a component is closely related to or extends an existing one (e.g., `SelectMultiple` extending `Select`), it may reuse or extend the existing component's theme namespace rather than introducing a wholly new one.
- **Theme Registration:** Keep theme keys alphabetical in `base.js` and add matching declarations in `base.d.ts`. Avoid hardcoded theme fallbacks (e.g., `theme.myComponent.color ?? '#000'`) — fallbacks hide missing tokens from users with custom themes. Only add a fallback when explicitly migrating from an older theme shape to a new one.
- **Implementation-Independent Parts:** Name theme paths for the visual part callers style, not the DOM element or internal component used to render it. If a part is visually Box-like or Text-like, expose the corresponding shared theme contract even when its implementation is a `span`, `div`, or composite.
- **Preserve Primitive Contracts:** Prefer shared Box/Text theme types over component-specific subsets. Keep the primitive's supported value shapes and allow relevant state styling to use the complete state contract; narrow options only for a documented behavioral or accessibility constraint.
- **Centralize Defaults:** Put default theme values in `base.js`. Avoid repeating defaults as inline rendering fallbacks; add a component-level fallback only when runtime behavior requires it and the reason is documented.
- **No Class Names or Inline Styles:** Do not output CSS class names or inline React `style={{}}` tags.
- **Disabled and ReadOnly states:** Do not inject custom CSS for disabled or readOnly. Instead, explicitly use the `disabledStyle()` and `readOnlyStyle()` helpers.
- **Global Focus:** Global focus styling should come from theme `global.focus.focusStyle`.
- **Colors & Backgrounds:** Use `background` instead of `backgroundColor` or `bg`. Use the `color` prop for text colors or icon strokes.

### 2. Sizing & Spacing

- **Use "T-Shirt" Sizes:** Always favor theme-based "t-shirt" sizing (`xsmall`, `small`, `medium`, `large`, `xlarge`) over hardcoded pixel values (e.g., do not use `12px` or `24px` directly in CSS strings if a theme token exists).
- **Spacing Props:** Use `pad` (not `padding`) and `margin`. When applying complex spacing, **prefer** object syntax (e.g., `pad={{ horizontal: 'small', vertical: 'medium' }}`) over strings.

### 3. Component Usage

- **Prefer Grommet Primitives:** Compose UI with existing primitives (`Box`, `Text`, `Button`, etc.) whenever one fits the visual and behavioral need. Use `styled.div`, `styled.span`, or another native element only when no suitable primitive exists or the required HTML semantics call for it; keep native elements semantic and accessible.
- **Icons:** Use the `grommet-icons` package for iconography by default. Do not manually generate custom, raw `<svg>` elements. Additionally, always provide a way to override which icon is used via the base theme.
