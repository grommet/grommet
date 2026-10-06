## RadioButton
Documentation for this component: https://v2.grommet.io/radiobutton

### Control backgrounds

The built-in circular control supports these optional color theme tokens:

| Token | Applies to |
| --- | --- |
| `radioButton.background.color` | Normal (unchecked) control fill. |
| `radioButton.check.background.color` | Selected control fill; falls back to the normal fill when undefined. |
| `radioButton.check.hover.background.color` | Enabled control fill when hovering anywhere on the label/container, including the label text. |
| `radioButton.hover.background.color` | Existing label/container hover background, independent of the control fill. |

Enabled control hover takes precedence over selected fill, which takes precedence
over normal fill. Focus without a focus indicator (for example, inside a
`FormField`) uses the same control hover treatment. An undefined hover fill leaves
the current selected or normal fill in place. Disabled controls retain their
state fill and do not receive hover treatment.

Colors can be symbolic theme color names or light/dark color objects. When these
tokens are omitted, the existing appearance is unchanged. Render-function children
own their backgrounds. Existing border styling, custom icons, and theme extend
hooks remain available. `RadioButtonGroup` controls use these same tokens,
including when integrated with `Form` and `FormField`.
