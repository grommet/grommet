## Box
A container that lays out its contents in one direction. Box
      provides CSS flexbox capabilities for layout, as well as general
      styling of things like background color, border, and animation.

[![](https://cdn-images-1.medium.com/fit/c/120/120/1*TD1P0HtIH9zF0UEH28zYtw.png)](https://storybook.grommet.io/?selectedKind=Box&full=0&addons=0&stories=1&panelRight=0) [![](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/grommet/grommet-sandbox?initialpath=/box&module=%2Fsrc%2FBox.js)
## Usage

```javascript
import { Box } from 'grommet';
<Box />
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

**align**

How to align the contents along the cross axis.

```
start
center
end
baseline
stretch
```

**alignContent**

How to align the contents when there is extra space in
        the cross axis. Defaults to `stretch`.

```
start
center
end
between
around
stretch
```

**animation**

Animation effect(s) to use. 'duration' and 'delay' should
        be in milliseconds. 'jiggle' and 'pulse' types are intended for
        small elements, like icons.

```
fadeIn
fadeOut
jiggle
pulse
rotateLeft
rotateRight
slideUp
slideDown
slideLeft
slideRight
zoomIn
zoomOut
{
  type: 
    fadeIn
    fadeOut
    jiggle
    pulse
    rotateLeft
    rotateRight
    slideUp
    slideDown
    slideLeft
    slideRight
    zoomIn
    zoomOut,
  delay: number,
  duration: number,
  size: 
    xsmall
    small
    medium
    large
    xlarge
}
[
  fadeIn
  fadeOut
  jiggle
  pulse
  rotateLeft
  rotateRight
  slideUp
  slideDown
  slideLeft
  slideRight
  zoomIn
  zoomOut
  {
    type: 
      fadeIn
      fadeOut
      jiggle
      pulse
      rotateLeft
      rotateRight
      slideUp
      slideDown
      slideLeft
      slideRight
      zoomIn
      zoomOut,
    delay: number,
    duration: number,
    size: 
      xsmall
      small
      medium
      large
      xlarge
  }
]
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

**basis**

A fixed or relative size along its container's main axis.

```
xxsmall
xsmall
small
medium
large
xlarge
xxlarge
full
1/2
1/3
2/3
1/4
2/4
3/4
auto
string
```

**border**

Include a border. 'between' will place a border in the gap between
      child elements. You must have a 'gap' to use 'between'.

```
boolean
top
left
bottom
right
start
end
horizontal
vertical
all
between
{
  color: 
    string
    {
      dark: string,
      light: string
    },
  side: 
    top
    left
    bottom
    right
    start
    end
    horizontal
    vertical
    all
    between,
  size: 
    xsmall
    small
    medium
    large
    xlarge
    string,
  style: 
    solid
    dashed
    dotted
    double
    groove
    ridge
    inset
    outset
    hidden
}
[{
  color: 
    string
    {
      dark: string,
      light: string
    },
  side: 
    top
    left
    bottom
    right
    start
    end
    horizontal
    vertical
    all
    between,
  size: 
    xsmall
    small
    medium
    large
    xlarge
    string,
  style: 
    solid
    dashed
    dotted
    double
    groove
    ridge
    inset
    outset
    hidden
}]
```

**direction**

The orientation to layout the child components in. Defaults to `column`.

```
row
column
row-responsive
row-reverse
column-reverse
```

**elevation**

Elevated height above the underlying context, indicated
        via a drop shadow. Defaults to `none`.

```
none
xsmall
small
medium
large
xlarge
string
```

**flex**

Whether flex-grow and/or flex-shrink is true and at a desired factor.

```
grow
shrink
boolean
{
  grow: number,
  shrink: number
}
```

**fill**

Whether the width and/or height should fill the container.

```
horizontal
vertical
boolean
```

**focusIndicator**

When interactive via 'onClick', whether it should receive a focus
        outline. Defaults to `true`.

```
boolean
```

**gap**

The amount of spacing between child elements. This
        should not be used in conjunction with 'wrap' as the gap elements
        will not wrap gracefully. If a child is a Fragment,
        Box will not add a gap between the choldren of the Fragment.

```
none
xxsmall
xsmall
small
medium
large
xlarge
string
```

**height**

A fixed height.

```
xxsmall
xsmall
small
medium
large
xlarge
xxlarge
string
{
  min: 
    xxsmall
    xsmall
    small
    medium
    large
    xlarge
    xxlarge
    string,
  max: 
    xxsmall
    xsmall
    small
    medium
    large
    xlarge
    xxlarge
    string
}
```

**hoverIndicator**

When 'onClick' has been specified, the hover indicator to apply
        when the user is mousing over the box.

```
boolean
string
background
{
  color: string,
  dark: 
    boolean
    string,
  image: string,
  light: string,
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
    string
}
```

**justify**

How to align the contents along the main axis. Defaults to `stretch`.

```
around
between
center
end
evenly
start
stretch
```

**onClick**

Click handler. Setting this property adds additional attributes to
      the DOM for accessibility.

```
function
```

**overflow**

box overflow.

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

**pad**

The amount of padding around the box contents. An
    object can be specified to distinguish horizontal padding, vertical
    padding, and padding on a particular side of the box Defaults to `none`.

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

**responsive**

Whether margin, pad, and border
      sizes should be scaled for mobile environments. Defaults to `true`.

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

**tag**

The DOM tag to use for the element. NOTE: This is deprecated in favor
of indicating the DOM tag via the 'as' property.

```
string
function
```

**as**

The DOM tag or react component to use for the element. Defaults to `div`.

```
string
function
```

**width**

A fixed width.

```
xxsmall
xsmall
small
medium
large
xlarge
xxlarge
string
{
  min: 
    xxsmall
    xsmall
    small
    medium
    large
    xlarge
    xxlarge
    string,
  max: 
    xxsmall
    xsmall
    small
    medium
    large
    xlarge
    xxlarge
    string
}
```

**wrap**

Whether children can wrap if they can't all fit.

```
boolean
reverse
```
  
## Intrinsic element

```
div
```
## Theme
  
**global.animation**

The animation configuration for the Box. Expects `object`.

Defaults to

```
{
  duration: '1s',
  jiggle: {
    duration: '0.1s',
  },
}
```

**global.borderSize**

The possible border sizes in the Box. Expects `object`.

Defaults to

```
{
  xsmall: '1px',
  small: '2px',
  medium: '4px',
  large: '12px',
  xlarge: '24px,
}
```

**global.elevation**

The possible shadows in Box elevation. Expects `object`.

Defaults to

```
{
  light: {
    none: 'none',
    xsmall: '0px 1px 2px rgba(100, 100, 100, 0.50)',
    small: '0px 2px 4px rgba(100, 100, 100, 0.50)',
    medium: '0px 3px 8px rgba(100, 100, 100, 0.50)',
    large: '0px 6px 12px rgba(100, 100, 100, 0.50)',
    xlarge: '0px 8px 16px rgba(100, 100, 100, 0.50)',
  },
  dark: {
    none: 'none',
    xsmall: '0px 2px 2px rgba(255, 255, 255, 0.40)',
    small: '0px 4px 4px rgba(255, 255, 255, 0.40)',
    medium: '0px 6px 8px rgba(255, 255, 255, 0.40)',
    large: '0px 8px 16px rgba(255, 255, 255, 0.40)',
    xlarge: '0px 10px 24px rgba(255, 255, 255, 0.40)',
  },
}
```

**global.colors.border**

The color of the border Expects `string | { dark: string, light: string }`.

Defaults to

```
{ dark: rgba(255, 255, 255, 0.33), light: rgba(0, 0, 0, 0.33), }
```

**global.hover.background.color**

The color of the default background when hovering Expects `string | { dark: string, light: string }`.

Defaults to

```
active
```

**global.hover.background.opacity**

The opacity of the default background when hovering Expects `string | { dark: string, light: string }`.

Defaults to

```
medium
```

**global.hover.color**

The color of the default background when hovering Expects `string | { dark: string, light: string }`.

Defaults to

```
{ dark: "white", light: "black" }
```

**global.opacity.medium**

The value used when background opacity is set to true. Expects `number`.

Defaults to

```
0.4
```

**global.size**

The possible sizes for width, height, and basis. Expects `object`.

Defaults to

```
{
  xxsmall: '48px',
  xsmall: '96px',
  small: '192px',
  medium: '384px',
  large: '768px',
  xlarge: '1152px',
  xxlarge: '1536px',
  full: '100%',
}
```

**box.extend**

Any additional style for the Box. Expects `string | (props) => {}`.

Defaults to

```
undefined
```

**box.responsiveBreakpoint**

The actual breakpoint to trigger changes in the border, 
    direction, gap, margin, pad, and round. Expects `string`.

Defaults to

```
small
```

**global.edgeSize**

The possible sizes for any of gap, margin, and pad. Expects `object`.

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
