## DropButton
A Button that when clicked will a Drop with the specified 'dropContent'.
      When opened, the drop will control the focus so that the contents behind
      it are not focusable. All properties of Button can be passed through.
      

[![](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/grommet/grommet-sandbox?initialpath=dropbutton&module=%2Fsrc%2FDropButton.js)
## Usage

```javascript
import { DropButton } from 'grommet';
<DropButton control={element}>{dropContents...}</DropButton>
```

## Properties

**a11yTitle**

Custom title to be used by screen readers.

```
string
```

**dropAlign**

How to align the drop with respect to the button. Defaults to `{
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

**dropContent**

Required. Content to put inside the Drop.

```
element
```

**onClose**

Callback for when the drop is closed

```
function
```

**open**

Whether the drop should be open or not. Setting it to 'false' will
      disable the button.

```
boolean
```
  