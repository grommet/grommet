## RadioButton
Documentation for this component: https://v2.grommet.io/radiobutton

### Backgrounds

Use `control` to theme the circular radio control and `container` to theme its
outer label. These tokens accept `BackgroundType`: a color string, a symbolic
theme color, or an object such as `{ color: 'background-input' }`.

| Token | Applies to |
| --- | --- |
| `radioButton.control.background` | Unselected circular control background. |
| `radioButton.control.hover.background` | Enabled unselected control on hover. |
| `radioButton.control.selected.background` | Selected control background. |
| `radioButton.control.selected.hover.background` | Enabled selected control on hover. |
| `radioButton.container.background` | Outer label background. |
| `radioButton.container.hover.background` | Enabled outer label hover background. |

Hovering the label text also hovers the control. Focus without a focus indicator
(for example, inside a `FormField`) uses the current selection state's hover
background. Disabled controls retain their state backgrounds and do not receive
hover treatment. Background tokens do not change label text or icon colors.

### Appearance

`radioButton.control` and `radioButton.container` accept the shared
`BoxPartThemeType` properties: `background`, `border`, `elevation`, `height`,
`margin`, `pad`, `round`, and `width`. Control `hover`, `selected`, and
`selected.hover`, and container `hover`, accept the `BoxStateThemeType`
properties: `background`, `border`, `elevation`, `pad`, and `round`.

Selected control styles inherit unspecified properties from the normal part.
Backgrounds retain the compatibility fallbacks below. Partial control border
objects inherit unspecified fields from the underlying normal, selected, or
legacy border. Other border values replace it. Borders support Box boolean,
side, object, and array values; dimensions support strings and min/max objects.
Use `border: false` and `round: false` to remove these treatments.

Hovering the label applies the current selection state's control hover styles
and the container hover styles. Focus without a focus indicator applies the
same styling. Disabled radios retain normal and selected styling without hover
or focus-as-hover overrides. State-specific hover styles never cross over to
the other selection state.

Render-function children own their control styling; container parts still
apply to the outer label. `check.extend` and `container.extend` remain the final
styling overrides on their respective parts. These tokens also apply to radios
rendered inside a `RadioButtonGroup`.

#### Fallbacks and compatibility

New themes should use `control` and `container`. Legacy tokens remain supported:

- Unselected control: `control.background`, then legacy `background.color`.
- Selected control: `control.selected.background`, then legacy
	`check.background.color`, then the resolved unselected control background.
- Unselected control hover: `control.hover.background`, otherwise retain the
	unselected background.
- Selected control hover: `control.selected.hover.background`, otherwise retain
	the selected background.
- Container hover: `container.hover.background`, then legacy
	`hover.background.color`, otherwise retain `container.background`.

Legacy background tokens keep their `{ color: ... }` shape. An explicit new
token, including `'transparent'`, takes precedence over its corresponding legacy
fallback. Control hover fills use only the state-specific `control` tokens.

These existing theme properties are deprecated but retain runtime support:

| Property | Replacement |
| --- | --- |
| `background` | `control.background` |
| `check.background` | `control.selected.background` |
| `check.radius` | `control.round` |
| `border.color` | `control.border.color` |
| `border.width` | `control.border.size` |
| `color` | `control.selected.border.color` |
| `hover.border.color` | Both `control.hover.border.color` and `control.selected.hover.border.color` |
| `hover.background` | `container.hover.background` |

When migrating the normal border color, set `control.selected.border.color`
explicitly to preserve a distinct selected outline, since selected parts inherit
unspecified properties from the normal part.

Theme `extend` CSS runs after background tokens and can override them. An
existing `check.extend` that sets the control background takes precedence over
`control.background` and `control.selected.background`. Adjust that extension,
or set `check.extend: undefined`, when the theme tokens should determine the
fill. `container.extend` runs after the container and control hover styles.

When these tokens are omitted, the existing appearance is unchanged.
Render-function children own their control backgrounds, while container
backgrounds still apply. Existing border styling, custom icons, and
`RadioButtonGroup` integration with `Form` and `FormField` remain available.
