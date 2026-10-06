## CheckBox
Documentation for this component: https://v2.grommet.io/checkbox

### Control backgrounds

The built-in square control supports these optional color theme tokens:

| Token | Applies to |
| --- | --- |
| `checkBox.background.color` | Normal (unchecked) control fill. |
| `checkBox.check.background.color` | Checked and indeterminate control fill; falls back to the normal fill when undefined. |
| `checkBox.check.hover.background.color` | Enabled control fill when hovering anywhere on the label/container, including the label text. |
| `checkBox.hover.background.color` | Existing label/container hover background, independent of the control fill. |

Enabled control hover takes precedence over checked/indeterminate fill, which
takes precedence over normal fill. Focus without a focus indicator (for example,
inside a `FormField`) uses the same control hover treatment. An undefined hover
fill leaves the current checked/indeterminate or normal fill in place. Disabled
controls retain their state fill and do not receive hover treatment.

Colors can be symbolic theme color names or light/dark color objects. When these
tokens are omitted, the existing appearance is unchanged. Toggle controls keep
their existing `checkBox.toggle` styling, and render-function children own their
backgrounds. Existing border styling, custom icons, and theme extend hooks remain
available.
