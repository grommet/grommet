## Layer
A modal overlay. It is the caller's responsibility to provide a control for
      the user to close the layer.

[![](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/grommet/grommet-site?initialpath=layer&amp;module=%2Fscreens%2FLayer.js)
## Usage

```javascript
import { Layer } from 'grommet';
<Layer />
```

## Properties

**onClickOverlay**

Function that will be called if the overlay background is clicked.

```
boolean
```

**onEsc**

Function that will be called when the user presses the escape key inside the Layer.

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
  