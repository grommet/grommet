## Box
A flexible box that lays out its contents along a single
      direction.

## Usage

```javascript
import { Box } from 'grommet';
      <Box/>
```

## Properties

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

How to align the contents when there is extra space in the cross axis. Defaults to `stretch`.

```
start
center
end
between
around
stretch
```

**alignSelf**

How to align along the cross axis when contained in a Box or along
      the column axis when contained in a Grid.

```
start
center
end
stretch
```

**animation**

Animation effect(s) to use. 'duration' and 'delay' should be in milliseconds.

```
fadeIn
fadeOut
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
    slideUp
    slideDown
    slideLeft
    slideRight
    zoomIn
    zoomOut,
  delay: number,
  duration: number
}
[
  fadeIn
  fadeOut
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
      slideUp
      slideDown
      slideLeft
      slideRight
      zoomIn
      zoomOut,
    delay: number,
    duration: number
  }
]
```

**background**

Either a color identifier to use for the background color. For example:
      'neutral-1'. Or, a 'url()' for an image. Dark is not needed if color is provided.

```
string
{
  color: string,
  dark: boolean,
  image: string,
  opacity: 
    weak
    medium
    strong
    boolean
}
```

**basis**

A fixed or relative size along its container's main axis.

```
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
```

**border**

Include a border.

```
top
left
bottom
right
horizontal
vertical
all
{
  color: string,
  side: 
    top
    left
    bottom
    right
    horizontal
    vertical
    all,
  size: 
    small
    medium
    large
}
```

**direction**

The orientation to layout the child components in. Defaults to `column`.

```
row
column
```

**flex**

Whether flex-grow and/or flex-shrink is true.

```
grow
shrink
true
false
```

**full**

Whether the width and/or height should take the full viewport size.

```
horizontal
vertical
true
false
grow
```

**gridArea**

The name of the area to place this Box in inside a parent Grid.

```
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

**justifySelf**

How to align along the row axis when contained in a Grid.

```
start
center
end
stretch
```

**margin**

The amount of margin around the box. An object can be specified to
      distinguish horizontal margin, vertical margin, and margin on a
      particular side of the box

```
none
xsmall
small
medium
large
{
  bottom: 
    xsmall
    small
    medium
    large,
  horizontal: 
    xsmall
    small
    medium
    large,
  left: 
    xsmall
    small
    medium
    large,
  right: 
    xsmall
    small
    medium
    large,
  top: 
    xsmall
    small
    medium
    large,
  vertical: 
    xsmall
    small
    medium
    large
}
```

**overflow**

box overflow.

```
auto
hidden
scroll
```

**pad**

The amount of padding around the box contents. An object can be specified to
      distinguish horizontal padding, vertical padding, and padding on a
      particular side of the box

```
none
xsmall
small
medium
large
{
  bottom: 
    xsmall
    small
    medium
    large,
  horizontal: 
    xsmall
    small
    medium
    large,
  left: 
    xsmall
    small
    medium
    large,
  right: 
    xsmall
    small
    medium
    large,
  top: 
    xsmall
    small
    medium
    large,
  vertical: 
    xsmall
    small
    medium
    large
}
```

**responsive**

Whether children laid out in a row direction should be switched to a
      column layout when the display area narrows.

```
boolean
```

**reverse**

Whether to reverse the order of the child components.

```
boolean
```

**round**

How much to round the corners.

```
xsmall
small
medium
large
full
```

**tag**

The DOM tag to use for the element. Defaults to `div`.

```
string
```

**textAlign**

How to align the text inside the box.

```
start
center
end
```

**wrap**

Whether children can wrap if they can't all fit.

```
boolean
```
  