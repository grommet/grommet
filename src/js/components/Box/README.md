## Box
A flexible box that lays out its contents along a single direction.

[![](https://cdn-images-1.medium.com/fit/c/120/120/1*TD1P0HtIH9zF0UEH28zYtw.png)](https://storybook.grommet.io/?selectedKind=Box&full=0&addons=0&stories=1&panelRight=0) [![](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/grommet/grommet-sandbox?initialpath=box&module=%2Fsrc%2FBox.js)
## Usage

```javascript
import { Box } from 'grommet';
<Box />
```

## Properties

**a11yTitle**

Custom title to be used by screen readers.

```
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

**alignSelf**

How to align along the cross axis when contained in
        a Box or along the column axis when contained in a Grid.

```
start
center
end
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

Either a color identifier to use for the background
        color. For example: 'neutral-1'. Or, a 'url()' for an image. Dark
        is not needed if color is provided.

```
string
{
  color: string,
  dark: 
    boolean
    string,
  image: string,
  position: string,
  opacity: 
    weak
    medium
    strong
    boolean,
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
full
1/2
1/3
2/3
1/4
3/4
auto
string
```

**border**

Include a border.

```
boolean
top
left
bottom
right
horizontal
vertical
all
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
    horizontal
    vertical
    all,
  size: 
    xsmall
    small
    medium
    large
    xlarge
    string
}
```

**direction**

The orientation to layout the child components in. Defaults to `column`.

```
row
column
row-responsive
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

Whether flex-grow and/or flex-shrink is true.

```
grow
shrink
true
false
```

**fill**

Whether the width and/or height should fill the container.

```
horizontal
vertical
true
false
```

**gap**

The amount of spacing between child elements. This
        should not be used in conjunction with 'wrap' as the gap elements
        will not wrap gracefully.

```
xsmall
small
medium
large
xlarge
string
```

**gridArea**

The name of the area to place
      this Box in inside a parent Grid.

```
string
```

**height**

A fixed height.

```
xsmall
small
medium
large
xlarge
string
```

**justify**

How to align the contents along the main axis.

```
start
center
between
end
```

**margin**

The amount of margin around the box. An object can
        be specified to distinguish horizontal margin, vertical margin, and
        margin on a particular side of the box

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

**overflow**

box overflow.

```
auto
hidden
scroll
visible
```

**pad**

The amount of padding around the box contents. An
        object can be specified to distinguish horizontal padding, vertical
        padding, and padding on a particular side of the box

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
    xlarge,
  horizontal: 
    xxsmall
    xsmall
    small
    medium
    large
    xlarge,
  left: 
    xxsmall
    xsmall
    small
    medium
    large
    xlarge,
  right: 
    xxsmall
    xsmall
    small
    medium
    large
    xlarge,
  top: 
    xxsmall
    xsmall
    small
    medium
    large
    xlarge,
  vertical: 
    xxsmall
    xsmall
    small
    medium
    large
    xlarge
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

The DOM tag to use for the element. Defaults to `div`.

```
string
```

**width**

A fixed width.

```
xsmall
small
medium
large
xlarge
string
```

**wrap**

Whether children can wrap if they
      can't all fit.

```
boolean
```
  