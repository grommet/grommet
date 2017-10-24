## Button
A button. We have a separate component from the browser base so we can style it.

[![](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/grommet/grommet-site?initialpath=button&amp;module=%2Fscreens%2FButton.js)
## Usage

```javascript
import { Button } from 'grommet';
<Button primary={true} label='Label' />
```

## Properties

**a11yTitle**

Custom title to be used by screen readers.

```
string
```

**accent**

Whether this is a accent button.

```
boolean
```

**active**

Whether the button is active.

```
boolean
```

**critical**

Whether this is an critical button.

```
boolean
```

**fill**

Whether the button expands to fill all of the available width and height.

```
boolean
```

**hoverIndicator**

The hover indicator to apply when the user is mousing over the
button. An object can be also be specified for color index support:
{background: 'neutral-2'}. This prop is meant to be used only
with plain Buttons.

```
background
{
  background: 
    boolean
    string
}
```

**href**

If specified, the button will behave like an anchor tag.

```
string
```

**icon**

Icon element to place in the button.

```
element
```

**label**

Label text to place in the button.

```
node
```

**onClick**

Click handler. Not setting this property and not specifying a href
causes the Button to be disabled.

```
function
```

**plain**

Whether this is a plain button with no border or padding.
Use this when wrapping children that provide the complete visualization
of the control. Do not use plain with label or icon properties.

```
boolean
```

**primary**

Whether this is a primary button. There should be at most one per page or screen.

```
boolean
```

**reverse**

Whether an icon and label should be reversed so that the icon is at the
end of the anchor.

```
boolean
```

**secondary**

Whether this is a secondary button.

```
boolean
```

**type**

The type of button. Set the type to submit for the default button on forms. Defaults to `button`.

```
button
reset
submit
```
  