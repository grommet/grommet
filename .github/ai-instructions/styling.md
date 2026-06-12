# Grommet Styling & Primitives Guidelines

When styling components, AI tools must adhere to Grommet's visual constraints and primitives.

### 1. Theming & Styling

- **Use `styled-components`:** Grommet utilizes `styled-components` extensively. AI should generate styled components and heavily rely on `theme` variables. Filter non-DOM props before styling using `shouldForwardProp`.
- **Consuming & Namespacing Themes:** Inside a component, always extract theme values using `const { theme, passThemeFlag } = useThemeValue()`. When creating a new component, all its default theme tokens must live under a dedicated `theme.<componentName>` namespace in `base.js`.
- **Theme Registration:** Keep theme keys alphabetical in `base.js` and add matching declarations in `base.d.ts`. Avoid theme fallbacks unless migrating.
- **No Class Names or Inline Styles:** Do not output CSS class names or inline React `style={{}}` tags.
- **Disabled and ReadOnly states:** Do not inject custom CSS for disabled or readOnly. Instead, explicitly use the `disabledStyle()` and `readOnlyStyle()` helpers.
- **Global Focus:** Global focus styling should come from theme `global.focus.focusStyle`.
- **Colors & Backgrounds:** Use `background` instead of `backgroundColor` or `bg`. Use the `color` prop for text colors or icon strokes.

### 2. Sizing & Spacing

- **Use "T-Shirt" Sizes:** Always favor theme-based "t-shirt" sizing (`xsmall`, `small`, `medium`, `large`, `xlarge`) over hardcoded pixel values (e.g., do not use `12px` or `24px` directly in CSS strings if a theme token exists).
- **Spacing Props:** Use `pad` (not `padding`) and `margin`. When applying complex spacing, **prefer** object syntax (e.g., `pad={{ horizontal: 'small', vertical: 'medium' }}`) over strings.

### 3. Component Usage

- **Leverage Existing Atoms:** Always compose UI using existing Grommet primitives (`Box`, `Text`, `Button`, etc.).
- **Icons:** Use the `grommet-icons` package for iconography by default. Do not manually generate custom, raw `<svg>` elements. Additionally, always provide a way to override which icon is used via the component's theme tokens.

---

_See the **Anti-Patterns (Never Generate)** table in `.github/copilot-instructions.md` for the full list of forbidden patterns._
