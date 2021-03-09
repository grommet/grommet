## Drop
A container that is overlaid next to a target.

[![](https://cdn-images-1.medium.com/fit/c/120/120/1*TD1P0HtIH9zF0UEH28zYtw.png)](https://storybook.grommet.io/?selectedKind=Controls-Drop&full=0&stories=1&panelRight=0) [![](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/grommet/grommet-sandbox?initialpath=/drop&module=%2Fsrc%2FDrop.js)
## Usage

```javascript
import { Drop } from 'grommet';
<Drop target={reference}>...</Drop>
```

## Properties

**align**

How to align the drop with respect to the target element. Not 
        specifying a vertical or horizontal alignment will cause it to be 
        aligned in the center. Defaults to `{
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
  right: 
    left
    right,
  left: 
    left
    right
}
```

**background**

Either a color 
identifier to use for the background color. For example: 'neutral-1'. Or, a 
'url()' for an image. Dark is not needed if color is provided.

```
string
{
  color: 
    string
    {
      dark: string,
      light: string
    },
  dark: 
    boolean
    string,
  image: string,
  position: string,
  opacity: 
    string
    boolean
    number
    weak
    medium
    strong,
  repeat: 
    no-repeat
    repeat
    string,
  size: 
    cover
    contain
    string,
  light: string
}
```

**elevation**

Elevated height of the target, indicated via a drop shadow. 
      Only applicable if the Drop isn't plain.

```
none
xsmall
small
medium
large
xlarge
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

**onClickOutside**

Function that will be invoked when the user clicks outside the drop.

```
function
```

**onEsc**

Function that will be called when the user presses the escape key inside
       the drop.

```
function
```

**overflow**

How to control the overflow inside the drop. Defaults to `auto`.

```
auto
hidden
scroll
visible
{
  horizontal: 
    auto
    hidden
    scroll
    visible,
  vertical: 
    auto
    hidden
    scroll
    visible
}
string
```

**plain**

Whether the drop element should have no background, 
        elevation, margin or round.

```
boolean
```

**responsive**

Whether to dynamically re-place when resized. Defaults to `true`.

```
boolean
```

**restrictFocus**

Whether the drop should control focus.

```
boolean
```

**round**

How much to round the corners.

```
boolean
xsmall
small
medium
large
xlarge
full
string
{
  corner: 
    top
    left
    bottom
    right
    top-left
    top-right
    bottom-left
    bottom-right,
  size: 
    xsmall
    small
    medium
    large
    xlarge
    string
}
```

**stretch**

If set to true the drop element will be stretched to at least match the
      width of the target element. If set to align the width of the drop element
      will be restricted to the width of the target element. The default is true
      because that is what most uses of Drop want, like Select and Menu. Defaults to `true`.

```
boolean
align
```

**target**

Required. Target where the drop will be aligned to. This should be a React 
      reference.

```
object
```

**trapFocus**

Traps keyboard focus inside of drop. Defaults to `true`.

```
boolean
```
  
## Intrinsic element

```
div
```
## Theme
  
**drop.maxHeight**

The max height of the Drop container. Expects `string`.

Defaults to

```
undefined
```

**global.drop.background**

The background color of Drop. Expects `string | { dark: string, light: string }`.

Defaults to

```
{
      dark: 'black',
      light: 'white',
    }
```

**global.drop.border.radius**

The border radius of the Drop container. Expects `string`.

Defaults to

```
0px
```

**global.drop.extend**

Any additional style for Drop. Expects `string | (props) => {}`.

Defaults to

```
undefined
```

**global.edgeSize**

The possible sizes for the Drop margin. Expects `object`.

Defaults to

```
{
    edgeSize: {
      none: '0px',
      hair: '1px',
      xxsmall: '3px',
      xsmall: '6px',
      small: '12px',
      medium: '24px',
      large: '48px',
      xlarge: '96px',
      responsiveBreakpoint: 'small',
    },
  }
```

**global.drop.elevation**

Elevated height above the underlying context, indicated
    via a drop shadow. Expects `string`.

Defaults to

```
small
```

**global.drop.margin**

The margin of the drop from the target. Expects `string | object`.

Defaults to

```
undefined
```

**global.drop.shadowSize**

Deprecated. Use 'global.drop.elevation' instead. Expects `string`.

Defaults to

```
undefined
```

**global.drop.zIndex**

The stack order of the Drop. Expects `number`.

Defaults to

```
20
```
