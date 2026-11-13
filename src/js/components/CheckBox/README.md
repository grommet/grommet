## CheckBox
Documentation for this component: https://v2.grommet.io/checkbox

### Backgrounds

Use `control` to theme the built-in square checkbox and `container` to theme its
outer label. These tokens accept `BackgroundType`: a color string, a symbolic
theme color, or an object such as `{ color: 'background-input' }`.

| Token | Applies to |
| --- | --- |
| `checkBox.control.background` | Unselected square control background. |
| `checkBox.control.hover.background` | Enabled unselected control on hover. |
| `checkBox.control.selected.background` | Checked or indeterminate control background. |
| `checkBox.control.selected.hover.background` | Enabled checked or indeterminate control on hover. |
| `checkBox.container.background` | Outer label background, including toggles and custom render-function children. |
| `checkBox.container.hover.background` | Enabled outer label hover background. |

Hovering the label text also hovers the control. Focus without a focus indicator
(for example, inside a `FormField`) uses the current selection state's hover
background. Disabled controls retain their state backgrounds and do not receive
hover treatment. Background tokens do not change text or icon colors.

### Control appearance

`checkBox.control` accepts the shared Box-part properties `background`, `border`,
`elevation`, `height`, `margin`, `pad`, `round`, and `width`. Its `hover`,
`selected`, and `selected.hover` parts accept the Box-state properties
`background`, `border`, `elevation`, `pad`, and `round`. Checked and indeterminate
controls use `selected`, inheriting unspecified properties from the normal part.
Background inheritance follows the fallbacks listed below.

Width and height support Box string and min/max object values. Border supports
Box boolean, side, object, and array values. Partial border objects inherit
unspecified fields from the underlying normal, selected, or legacy border;
other border values replace it. Use `border: false` and `round: false` to remove
these treatments. Control padding is independent of the CheckBox `pad` prop.

Hovering the label applies the current selection state's hover part to the
square. Focus without a focus indicator applies the same styles. Disabled
controls retain normal and selected styles without hover or focus-as-hover
overrides. Toggle tracks, knobs, and custom render-function children do not use
these control parts. `checkBox.check.extend` remains the final square styling
override.

### Container appearance

`checkBox.container` accepts the shared Box-part properties `background`,
`border`, `elevation`, `height`, `margin`, `pad`, `round`, and `width`.
`container.hover` accepts the Box-state properties `background`, `border`,
`elevation`, `pad`, and `round`. These styles affect the outer label, not the
square control or toggle track and knob. Width and height accept the same
string and min/max object values as Box; border accepts the same boolean,
side, object, and array values. Use `border: false` or `round: false` to remove
the corresponding treatment.

Hover styles also apply during focus when `focusIndicator` is false. Disabled
containers retain their normal styles without hover or focus-as-hover styling.
An explicit CheckBox `pad` prop takes precedence over both normal and hover
container padding; otherwise `container.pad` overrides legacy `checkBox.pad`.
`checkBox.extend` remains the final styling override.

#### Fallbacks and compatibility

New themes should use `control` and `container`. Legacy tokens remain supported:

- Unselected control: `control.background`.
- Selected or indeterminate control: `control.selected.background`, then
	`control.background`.
- Unselected control hover: `control.hover.background`, otherwise retain the
	unselected background.
- Selected control hover: `control.selected.hover.background`, otherwise retain
	the selected background.
- Container hover: `container.hover.background`, then legacy
	`hover.background.color`, otherwise retain `container.background`.

State-specific control hover tokens do not cross over to the other state.
Legacy container `hover.background` keeps its `{ color: ... }` shape. An explicit
`container.hover.background`, including `'transparent'`, takes precedence over
that fallback. Existing `check.radius`, `check.thickness`, and `check.extend`
remain supported; control fills use only the `control` background tokens.

Theme `extend` CSS runs after the background tokens and can override them. For
example, an existing `check.extend` that sets the control background wins over
`control.background` and `control.selected.background`. Adjust that extension,
or set `check.extend: undefined`, when the theme tokens should determine the
fill. `checkBox.extend` follows the container and control hover styles.

Control background tokens do not affect toggle tracks or knobs; those retain
`checkBox.toggle` styling. They also do not fill custom render-function
children, though container backgrounds still apply. Existing border styling,
custom icons, `checkBox.check.extend`, and `checkBox.toggle.extend` remain
available.
