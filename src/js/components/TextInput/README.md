## TextInput
Documentation for this component: https://v2.grommet.io/textinput

### Shared Input Appearance

`global.input` accepts the `BoxPartThemeType` properties `background`, `border`,
`elevation`, `height`, `margin`, `pad`, `round`, and `width`. Its `hover`, `focus`,
`disabled`, and `readOnly` parts accept `BoxStateThemeType`: `background`,
`border`, `elevation`, `pad`, and `round`. `placeholder` accepts text `color`,
`size`, and `weight`. Validation error styling remains owned by FormField.

These opt-in defaults are shared by TextInput, TextArea, and MaskedInput. The
visible surfaces of Select, SelectMultiple, formatted DateInput, and FileInput
also consume them. Wrapper-owned controls apply the border and fill once;
TextInput and formatted DateInput keep text padding on the inner input.
Render-function values and component-specific extension CSS retain their own
styling responsibilities.

Plain inputs, including those made plain by FormField, do not paint the shared
background, border, elevation, or interactive surface states. Their spacing
continues to follow the input padding configuration. Style the FormField
wrapper through `formField` and its per-input parts instead.

`pad` takes precedence over legacy `padding` and uses Box spacing values without
legacy border subtraction. Existing `padding`, `font`, `weight`, and `extend`
behavior is retained. Partial border-state objects inherit normal border fields.
Disabled controls suppress hover/focus appearance states; read-only controls
suppress interactive appearance states. Existing global focus indicators remain
in place. Global input extension CSS runs after the new native input defaults;
component-specific extension hooks remain later overrides.