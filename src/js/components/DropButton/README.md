## DropButton
A Button that when clicked will a Drop with the specified 'dropContent'.
      When opened, the drop will control the focus so that the contents behind
      it are not focusable. All properties of Button can be passed through.
      

[![](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/grommet/grommet-sandbox?initialpath=dropbutton&module=%2Fsrc%2FDropButton.js)
## Usage

```javascript
import { DropButton } from 'grommet';
<DropButton dropContent={...} />
```

## Properties

**a11yTitle**

Custom title to be used by screen readers.

```
string
```

**disabled**

Whether the button should be disabled.

```
boolean
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

**dropTarget**

Target where the drop will be aligned to. This should be
      a React reference. Typically, this is not required as the drop will be
      aligned to the DropButton itself by default.

```
object
```

**onClose**

Callback for when the drop is closed

```
function
```

**onOpen**

Callback for when the drop is opened

```
function
```

**open**

Whether the drop should be open or not. Setting this property does not
      influence user interaction after it has been rendered.

```
boolean
```
  