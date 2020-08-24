## Drop
A container that is overlaid next to a target.

[![](https://cdn-images-1.medium.com/fit/c/120/120/1*TD1P0HtIH9zF0UEH28zYtw.png)](https://storybook.grommet.io/?selectedKind=Drop&full=0&addons=0&stories=1&panelRight=0) [![](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/grommet/grommet-sandbox?initialpath=/drop&module=%2Fsrc%2FDrop.js)
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

**stretch**

Whether the drop element should be stretched to at least match the
      width of the target element. The default is true because
      that is what most uses of Drop want, like Select and Menu. Defaults to `true`.

```
boolean
```

**target**

Required. Target where the drop will be aligned to. This should be a React 
      reference.

```
object
```

**elevation**

Elevated height of the target, indicated via a drop shadow.

```
none
xsmall
small
medium
large
xlarge
string
```

**plain**

Whether the drop element should have no background nor shadow

```
boolean
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

The max height of the Drop container Expects `string`.

Defaults to

```
undefined
```

**global.drop.background**

The background color of Drop Expects `string | { dark: string, light: string }`.

Defaults to

```
#ffffff
```

**global.drop.border.radius**

The corner radius Expects `string`.

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

**global.drop.shadowSize**

Elevated height of the Drop Expects `string`.

Defaults to

```
small
```

**global.drop.zIndex**

The stack order of the Drop Expects `number`.

Defaults to

```
20
```
