## DropButton
A control that when clicked will render its children in a drop layer.
When opened, the drop will control the focus so that the contents behind it
are not focusable.
      

[![](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/grommet/grommet-sandbox?initialpath=dropbutton&module=%2Fsrc%2FDropButton.js)
## Usage

```javascript
import { DropButton } from 'grommet';
<DropButton control={element}>{dropContents...}</DropButton>
```

## Properties

**a11yTitle**

Custom title to be used by
      screen readers.

```
string
```

**align**

How to align the drop with respect to the control. Defaults to `{
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

**control**

Required. React node to open/close the
      drop content.

```
element
```

**onClose**

Callback for when the drop is closed

```
function
```

**open**

Whether the drop should be open or not.

```
boolean
```
  