## Button
A button. We have a separate component from the browser base so we can style it.

[![](https://cdn-images-1.medium.com/fit/c/120/120/1*TD1P0HtIH9zF0UEH28zYtw.png)](https://storybook.grommet.io/?selectedKind=Button&full=0&addons=0&stories=1&panelRight=0) [![](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/grommet/grommet-sandbox?initialpath=button&module=%2Fsrc%2FButton.js)
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

**alignSelf**

How to align along the cross axis when contained in
      a Box or along the column axis when contained in a Grid.

```
start
center
end
stretch
```

**gridArea**

The name of the area to place
    this inside a parent Grid.

```
string
```

**margin**

The amount of margin around the component. An object can
      be specified to distinguish horizontal margin, vertical margin, and
      margin on a particular side.

```
none
xxsmall
xsmall
small
medium
large
xlarge
{
  bottom: 
    xxsmall
    xsmall
    small
    medium
    large
    xlarge
    string,
  horizontal: 
    xxsmall
    xsmall
    small
    medium
    large
    xlarge
    string,
  left: 
    xxsmall
    xsmall
    small
    medium
    large
    xlarge
    string,
  right: 
    xxsmall
    xsmall
    small
    medium
    large
    xlarge
    string,
  top: 
    xxsmall
    xsmall
    small
    medium
    large
    xlarge
    string,
  vertical: 
    xxsmall
    xsmall
    small
    medium
    large
    xlarge
    string
}
string
```

**active**

Whether the button is active.

```
boolean
```

**color**

Fill color for primary, border color otherwise.

```
string
```

**disabled**

Whether the button is disabled.

```
boolean
```

**fill**

Whether the button expands to fill all of the available width and height.

```
boolean
```

**focusIndicator**

Whether when 'plain' it should receive a focus outline. Defaults to `true`.

```
boolean
```

**hoverIndicator**

The hover indicator to apply when the user is mousing over the
button. An object can be also be specified for color index support:
{background: 'neutral-2'}. This prop is meant to be used only
with plain Buttons.

```
boolean
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

**type**

The type of button. Set the type to submit for the default button on forms. Defaults to `button`.

```
button
reset
submit
```
  
## Theme
  
**global.hover.color**

The background color when hovering. Expects `string`.

Defaults to

```
{ dark: 'white', light: 'black' }
```

**global.edgeSize.small**

The padding around an icon-only button. Expects `string`.

Defaults to

```
12px
```

**text.medium.size**

The font size of the text label. Expects `string`.

Defaults to

```
18px
```

**text.medium.height**

The line height of the text label. Expects `string`.

Defaults to

```
24px
```

**button.border.color**

The color of the border. Expects `string | { dark: string, light: string }`.

Defaults to

```
undefined
```

**button.border.radius**

The corner radius. Expects `string`.

Defaults to

```
18px
```

**button.border.width**

The border width. Expects `string`.

Defaults to

```
2px
```

**button.color**

The color of the text label. Expects `string | { dark: string, light: string }`.

Defaults to

```
undefined
```

**button.primary.color**

The color of the background for primary buttons. Expects `string | { dark: string, light: string }`.

Defaults to

```
undefined
```

**button.disabled.opacity**

The opacity when the button is disabled. Expects `number`.

Defaults to

```
0.3
```

**button.minWidth**

The minimum width. Expects `string`.

Defaults to

```
96px
```

**button.maxWidth**

The maximum width. Expects `string`.

Defaults to

```
384px
```

**button.padding.horizontal**

The horizontal padding. Expects `string`.

Defaults to

```
22px
```

**button.padding.vertical**

The vertical padding. Expects `string`.

Defaults to

```
4px
```

**button.extend**

Any additional style for the Button. Expects `string | (props) => {}`.

Defaults to

```
undefined
```
