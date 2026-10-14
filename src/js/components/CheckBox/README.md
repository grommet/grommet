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

#### Fallbacks and compatibility

New themes should use `control` and `container`. Legacy tokens remain supported:

- Unselected control: `control.background`, then legacy `background.color`.
- Selected or indeterminate control: `control.selected.background`, then legacy
	`check.background.color`, then the resolved unselected control background.
- Unselected control hover: `control.hover.background`, then legacy
	`check.hover.background.color`, otherwise retain the unselected background.
- Selected control hover: `control.selected.hover.background`, then legacy
	`check.hover.background.color`, otherwise retain the selected background.
- Container hover: `container.hover.background`, then legacy
	`hover.background.color`, otherwise retain `container.background`.

Legacy background tokens keep their `{ color: ... }` shape. The legacy
`check.hover.background.color` applies to both selection states; the new
state-specific hover tokens do not cross over to the other state. An explicit
new token, including `'transparent'`, takes precedence over its corresponding
legacy fallback.

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
