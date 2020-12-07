## Menu
A control that opens a Drop containing plain Buttons.

The labels and behavior of the contained Buttons are described
      via the `items` property.
      You can provide a single function child that will be called with
      'disabled', 'hover', 'focus', and 'drop' keys. 
      This allows you to customize the rendering of the Menu button 
      in those cases.

[![](https://cdn-images-1.medium.com/fit/c/120/120/1*TD1P0HtIH9zF0UEH28zYtw.png)](https://storybook.grommet.io/?selectedKind=Controls-Menu&full=0&stories=1&panelRight=0) [![](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/grommet/grommet-sandbox?initialpath=/menu&module=%2Fsrc%2FMenu.js)
## Usage

```javascript
import { Menu } from 'grommet';
<Menu />
```

## Properties

**a11yTitle**

Custom label to be used by screen readers. When provided, an aria-label will
   be added to the element.

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
  end: 
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
  start: 
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

**children**

Function that will be called to render the visual representation.
      It will be passed an object containing button props.
      It should return a react element.
      For example:
      `children={({ disabled, drop, hover, focus }) => <Box ...>{...}</Box>}`
      

```
function
```

**disabled**

Whether the menu should be disabled.

```
boolean
```

**dropAlign**

Where to place the drop down.
The keys correspond to a side of the drop down.
The values correspond to a side of the control. For instance,
{left: 'left', top: 'bottom'} would align the left edges and the top of
the drop down to the bottom of the control. At most one of left or right and
one of top or bottom should be specified. Defaults to `{
  "top": "top",
  "left": "left"
}`.

```
{
  top: 
    top
    bottom,
  bottom: 
    top
    bottom,
  left: 
    right
    left,
  right: 
    right
    left
}
```

**dropBackground**

Background color when drop is active

```
string
{
  color: string,
  opacity: 
    boolean
    number
    weak
    medium
    strong
}
```

**dropTarget**

Target where the drop will be aligned to. This should be
      a React reference. Typically, this is not required as the drop will be
      aligned to the Menu itself by default.

```
object
```

**dropProps**

Any valid Drop prop. Defaults to `{}`.

```
object
```

**justifyContent**

How to align the contents along the row axis. Defaults to `start`.

```
start
center
end
between
around
stretch
```

**icon**

Indicates the icon shown as a control to open it.

```
boolean
node
```

**items**

Required. Menu items to be placed inside the drop down.
The object values can be any Button prop, 
for example: label, onClick, and href. Defaults to `[]`.

```
[object]
```

**label**

Indicates the label shown as a control to open it.

```
string
node
```

**messages**

Custom messages. Used for accessibility by screen readers. 
      These values will be overridden if an a11yTitle is provided. Defaults to `{
  "openMenu": "Open Menu",
  "closeMenu": "Close Menu"
}`.

```
{
  closeMenu: string,
  openMenu: string
}
```

**open**

Whether the state of the component should be open

```
boolean
```

**size**

The size of the menu. Defaults to `medium`.

```
small
medium
large
xlarge
string
```
  
## Intrinsic element

```
button
```
## Theme
  
**global.colors.control**

The default color to use for the icon. Expects `string | { dark: string, light: string }`.

Defaults to

```
{ dark: 'accent-1', light: 'brand'}
```

**menu.icons.color**

The color to use for the icon. Expects `string | { dark: string, light: string }`.

Defaults to

```
control
```

**menu.background**

The color for the background of the menu Drop when it is open. Expects `string`.

Defaults to

```
undefined
```

**menu.extend**

Any additional style for the Menu. Expects `string | (props) => {}`.

Defaults to

```
undefined
```

**menu.icons.down**

The icon to show to the right of the label when menu is 
    closed. Expects `React.Element`.

Defaults to

```
<FormDown />
```

**menu.icons.up**

The icon to show to the right of the label when menu is 
    opened. Expects `undefined | React.Element`.

Defaults to

```
undefined
```
