## FormField

Documentation for this component: https://v2.grommet.io/formfield

### Owned parts and states

FormField owns two Box parts:

- `container`: the root, including the label and messages.
- `content`: the frame around the input, not the input's internal elements.

Set them under `theme.formField.container` and `theme.formField.content`.
Input-specific overrides use `theme.formField.inputs.<inputName>.container`
and `.content`, for example `inputs.textInput.content`. Recognized Grommet
children, an internal `component`, and the internal default TextInput use the
same camel-cased input name. Non-input siblings do not change that name.

| Location | Supported Box properties |
| --- | --- |
| Part base | `background`, `border`, `elevation`, `height`, `margin`, `pad`, `round`, `width` |
| `hover`, `error`, `disabled`, `readOnly` | `background`, `border`, `elevation`, `pad`, `round` |
| `error.hover` | The same five state properties |

`hover` and `error.hover` also accept `false` to disable the entire part hover.

The types derive from `BoxPartThemeType`; states are a restricted `Pick` of
that type. Structural props, events, ARIA attributes, `extend`, and `focus`
are not part of these style bags. Existing legacy extensions and global focus
configuration remain supported. This API does not introduce focus tokens,
message parts, kind variants, or grouped input item parts.

### Resolution and opt-outs

1. Resolve the existing legacy placement and style fallbacks.
2. Merge the shared and input-specific named part, including its state objects.
3. Apply its base styles and **one** application state: **error > disabled >
   readOnly**. Losing states are not layered, even for properties absent from
   the selected state. The selected state inherits the part's base styles.
4. Apply instance props: root props (including `margin`) and `contentProps`.

New named paths always style their named part, independently of legacy
`border.position`, including when the legacy border is disabled or undefined.
Plain objects merge recursively; arrays and scalars replace. Missing keys
and **`undefined`** mean no override: inherit any available shared or legacy
fallback, recursively, including nested properties and whole state objects.
New part data is filtered without mutating the theme. Use `hover: false` to
disable the entire part hover, including legacy fallback; `error.hover: false`
does so only while error is selected. Specificity is shared part → input part
→ selected `error.hover`: a more-specific hover object (including `{}`) can
override a less-specific `false`, but `undefined` cannot. Explicit `{}` opts
into named hover; missing/undefined hover alone does not.
Use Box values such as `border: false`, `border: []`, `round: false`,
`pad: 'none'`, `elevation: 'none'`, or `background: 'transparent'` for explicit
resets. Undefined never resets the part's at-rest appearance.

**Theme composition boundary:** global `deepMerge` and theme providers retain
their existing behavior, which can overwrite a value with `undefined` before
FormField receives the theme. FormField inherits only fallbacks still present
in that final theme; it cannot reconstruct an erased shared value or `false`.
For example, externally merging `content.background: undefined` over a defined
`content.background` erases it, whereas an input-specific undefined inherits
a shared background that is still available. Omit undefined keys during
upstream composition when those same-path values need to be retained.

Hover is CSS-based and supports all five state properties using Box's theme,
dark/light, spacing, radius, elevation, border, and responsive helpers. Partial
hover border objects inherit the at-rest border geometry. Strings, booleans,
arrays, side/size/style changes, and resets are supported. `error.hover`
overrides/inherits the ordinary part hover. An editable error field may hover;
actual disabled or readOnly flags always suppress hover, even when error wins.
Legacy hover still suppresses focused fields. Named-part hover is independent
of the existing global focus indicator; no new focus-state tokens are added.
When hover elevation and a field-owned focus shadow overlap, the focus shadow
takes precedence so the keyboard focus indicator is not erased.

### Compatibility and ownership

Legacy-only themes retain their existing, property-specific state precedence
and placement behavior, including legacy own-undefined opt-outs. New defined
part values override those fallbacks;
this does not reinterpret all legacy values as a single new state resolver.
Base theme defaults and existing snapshots are not migrated to new paths.

The legacy shared `content.pad` gate is retained: it normally pads grouped and
range inputs, or fields with `pad`. Explicit input-specific padding and selected
state padding bypass this gate; `contentProps.pad` remains the instance escape
hatch. Error ARIA linkage, input plain/focus handoff, FileInput border borrowing,
TimeInput focus-within, and outer-border abut behavior remain in place.
ReadOnly is detected on TextInput and DateInput children and their internal
equivalents, including the default TextInput. Field or recognized child disabled
flags suppress hover without changing field-wide disabled state inference.

Child input visuals and grouped-option styling remain owned by their input
themes, not FormField. The HPE PartsAndStates story demonstrates transparent
frame resets for CheckBoxGroup and RadioButtonGroup without changing their
option themes.

See [THEMING-C.md](./THEMING-C.md) for the approved scope and historical design
assessment, and [PartsAndStates](./stories/CustomThemed/PartsAndStates.stories.tsx)
for a working HPE-themed example.