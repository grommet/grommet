## Layer
An overlay. Layer is typically modal and anchored to an edge, corner, or
      center of the window. It is the caller's responsibility to provide a
      control for the user to close the layer.

[![](https://cdn-images-1.medium.com/fit/c/120/120/1*TD1P0HtIH9zF0UEH28zYtw.png)](https://storybook.grommet.io/?selectedKind=Layout-Layer&full=0&stories=1&panelRight=0) [![](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/grommet/grommet-sandbox?initialpath=/layer&module=%2Fsrc%2FLayer.js)
## Usage

```javascript
import { Layer } from 'grommet';
<Layer />
```

## Properties

**animate**

Whether to animate the Layer content when it opens. This
        property is deprecated and will be removed in the next major version
        of grommet. Instead, use 'animation'. Defaults to `true`.

```
boolean
```

**animation**

Animation transition of the Layer content when it opens and closes. Defaults to `slide`.

```
slide
fadeIn
none
boolean
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

**full**

Whether the width and/or height should fill the current viewport
        size.

```
boolean
vertical
horizontal
```

**margin**

The amount of margin around the Layer. An object can be specified to
distinguish horizontal margin, vertical margin, and margin on a
particular side of the layer

```
none
xxsmall
xsmall
small
medium
large
{
  bottom: 
    xxsmall
    xsmall
    small
    medium
    large
    string,
  end: 
    xxsmall
    xsmall
    small
    medium
    large
    string,
  horizontal: 
    xxsmall
    xsmall
    small
    medium
    large
    string,
  left: 
    xxsmall
    xsmall
    small
    medium
    large
    string,
  right: 
    xxsmall
    xsmall
    small
    medium
    large
    string,
  start: 
    xxsmall
    xsmall
    small
    medium
    large
    string,
  top: 
    xxsmall
    xsmall
    small
    medium
    large
    string,
  vertical: 
    xxsmall
    xsmall
    small
    medium
    large
    string
}
string
```

**modal**

Whether there should be an overlay preventing interaction underneath
        the layer. Defaults to `true`.

```
boolean
```

**onClickOutside**

Function that will be invoked on modal layers when the user clicks
      outside the layer.

```
function
```

**onEsc**

Function that will be called when the user presses the escape key inside
       the layer.

```
function
```

**plain**

Whether this is a plain Layer with no background color or border.

```
boolean
```

**position**

Position of the layer content. Defaults to `center`.

```
bottom
bottom-left
bottom-right
center
end
hidden
left
right
start
top
top-left
top-right
```

**responsive**

Whether the layer should take full width and height on mobile Defaults to `true`.

```
boolean
```

**target**

Target where the layer will be aligned to. This should be a React
      reference.

```
object
```
  
## Intrinsic element

```
div
```
## Theme
  
**global.size.xxsmall**

The minimal height of the Layer. Expects `string`.

Defaults to

```
48px
```

**layer.background**

The background color of the Layer Container. Expects `string`.

Defaults to

```
white
```

**layer.border.radius**

The rounding of the Layer corners. Expects `string`.

Defaults to

```
white
```

**layer.border.intelligentRounding**

Whether the border-radius of the Layer should adapt based on 
    the Layer's position. Wherever the Layer is touching the edge of the 
    screen, a border-radius of 0 will be applied. Expects `boolean`.

Defaults to

```
undefined
```

**layer.container.zIndex**

The stack order of Layer Container. Expects `number`.

Defaults to

```
20
```

**layer.extend**

Any additional style for Layer. Expects `string | (props) => {}`.

Defaults to

```
undefined
```

**layer.container.elevation**

Elevated height above the underlying container, indicated via 
    a drop shadow. Any Box elevation value is valid. Expects `'none' | 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | 
    string`.

Defaults to

```
undefined
```

**layer.container.extend**

Any additional style for Layer Container. Expects `string | (props) => {}`.

Defaults to

```
undefined
```

**layer.overlay.background**

The background of the Layer overlay. Expects `string`.

Defaults to

```
rgba(0, 0, 0, 0.5)
```

**layer.responsiveBreakpoint**

The actual breakpoint to trigger changes in the border,
direction, gap, margin, pad, and round. Expects `string`.

Defaults to

```
small
```

**layer.zIndex**

The stack order of Layer. Expects `number`.

Defaults to

```
20
```

**global.breakpoints**

The possible breakpoints that could affect border, direction, gap, margin,
    pad, and round. Expects `object`.

Defaults to

```
{
    small: {
      value: '768px',
      borderSize: {
        xsmall: '1px',
        small: '2px',
        medium: '4px',
        large: '6px',
        xlarge: '12px',
      },
      edgeSize: {
        none: '0px',
        hair: '1px',
        xxsmall: '2px',
        xsmall: '3px',
        small: '6px',
        medium: '12px',
        large: '24px',
        xlarge: '48px',
      },
      size: {
        xxsmall: '24px',
        xsmall: '48px',
        small: '96px',
        medium: '192px',
        large: '384px',
        xlarge: '768px',
        full: '100%',
      },
    },
    medium: {
      value: '1536px',
    },
    large: {},
  }
```
