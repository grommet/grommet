---
description: "Scaffold all required files for a new Grommet React component following the official directory structure, archetype patterns, and contribution conventions."
argument-hint: "Component name and one-sentence purpose (e.g. RangeSlider — dual-handle range input)"
agent: "agent"
---

Scaffold a complete new Grommet component. Read [.github/skills/grommet-component-contribution/SKILL.md](.github/skills/grommet-component-contribution/SKILL.md) before starting, and reference [.github/skills/grommet-component-contribution/EXAMPLES.md](.github/skills/grommet-component-contribution/EXAMPLES.md) to choose the right archetype.

## Step 1 — Identify the Component

Confirm:
- **Name**: PascalCase (e.g. `RangeSlider`)
- **Purpose**: one sentence
- **Archetype**: which pattern fits best?
  - **Simple Input** — edits one committed value (like `TextInput`, `CheckBox`)
  - **Drop or Modal** — opens a selection surface (like `Select`, `DateInput`)
  - **Display Only** — renders content, no value (like `Text`, `Anchor`, `Button`)
  - **Layout / Composition** — arranges children (like `Box`, `Grid`)

Read 1-2 similar existing components before writing any code.

## Step 2 — Scaffold the Directory

Create `src/js/components/<ComponentName>/` with all required files:

### `ComponentName.js`
- `React.forwardRef` with `displayName`
- `useForwardedRef(refArg)` for internal ref
- `const { theme, passThemeFlag } = useThemeValue()`
- `formContext.useFormInput(...)` if the component participates in forms
- `...rest` spread on the root DOM element
- `process.env.NODE_ENV !== 'production'` guard for propTypes

### `StyledComponentName.js`
- `styled.element.withConfig(styledComponentsConfig)`
- Theme values via `props.theme.<componentName>.*`
- `${genericStyles}` appended last
- `disabledStyle()` / `readOnlyStyle()` if needed

### `propTypes.js`
- `PropTypes` for every public prop

### `index.d.ts`
- TypeScript declarations matching the prop shape

### `index.js`
- Named export only: `export { ComponentName } from './ComponentName';`

### `README.md`
- Component name, one-sentence description, and basic usage example

### `__tests__/ComponentName-test.tsx`
- axe check as the **first** test
- Renders wrapped in `<Grommet>`
- Key interaction and prop tests with `userEvent`

### `stories/Default.stories.tsx`
- CSF-3 format, one story
- Title: `'ComponentCategory/ComponentName/Default'`

## Step 3 — Register Exports

- Add named export to `src/js/components/index.js` (alphabetical)
- Add type export to `src/js/index.d.ts`
- Add i18n keys to `src/js/languages/default.json` if the component has user-visible strings
- Add theme tokens to `src/js/themes/base.js` and `base.d.ts` if the component introduces new tokens

## Step 4 — Validate

After all files are created:
- Confirm `displayName` is set
- Confirm the axe test is the first test
- Confirm `onChange` shape matches the archetype contract
- Confirm theme namespace is at the top level (`theme.<componentName>`, not `theme.global.<componentName>`)
