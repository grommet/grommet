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

#### Fallbacks and compatibility

New themes should use `control` and `container`. Legacy tokens remain supported:

- Unselected control: `control.background`, then legacy `background.color`.
- Selected control: `control.selected.background`, then legacy
	`check.background.color`, then the resolved unselected control background.
- Unselected control hover: `control.hover.background`, then legacy
	`check.hover.background.color`, otherwise retain the unselected background.
- Selected control hover: `control.selected.hover.background`, then legacy
	`check.hover.background.color`, otherwise retain the selected background.
- Container hover: `container.hover.background`, then legacy
	`hover.background.color`, otherwise retain `container.background`.

Legacy background tokens keep their `{ color: ... }` shape. Legacy
`check.hover.background.color` applies to both selection states; the new
state-specific hover tokens do not cross over. An explicit new token, including
`'transparent'`, takes precedence over its corresponding legacy fallback.

Theme `extend` CSS runs after background tokens and can override them. An
existing `check.extend` that sets the control background takes precedence over
`control.background` and `control.selected.background`. Adjust that extension,
or set `check.extend: undefined`, when the theme tokens should determine the
fill. `container.extend` runs after the container and control hover styles.

When these tokens are omitted, the existing appearance is unchanged.
Render-function children own their control backgrounds, while container
backgrounds still apply. Existing border styling, custom icons, and
`RadioButtonGroup` integration with `Form` and `FormField` remain available.
