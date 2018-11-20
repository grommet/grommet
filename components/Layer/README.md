## Layer
A modal overlay. It is the caller's responsibility to provide a control for
      the user to close the layer.

[![](https://cdn-images-1.medium.com/fit/c/120/120/1*TD1P0HtIH9zF0UEH28zYtw.png)](https://storybook.grommet.io/?selectedKind=Layer&full=0&addons=0&stories=1&panelRight=0) [![](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/grommet/grommet-sandbox?initialpath=layer&module=%2Fsrc%2FLayer.js)
## Usage

```javascript
import { Layer } from 'grommet';
<Layer />
```

## Properties

**full**

Whether the width and/or height should fill the current viewport size.

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

Whether there should be an overlay preventing interaction underneath the layer. Defaults to `true`.

```
boolean
```

**onClickOutside**

Function that will be invoked when the user clicks outside the layer.

```
function
```

**onEsc**

Function that will be called when the user presses the escape key inside the layer.

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
center
hidden
left
right
top
```

**responsive**

Whether the layer should take full width and height on mobile Defaults to `true`.

```
boolean
```
  