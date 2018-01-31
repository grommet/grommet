## Menu
Presents a list of choices within a drop down via a control that
      opens it.

[![](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/grommet/grommet-sandbox?initialpath=menu&amp;module=%2Fsrc%2FMenu.js)
## Usage

```javascript
import { Menu } from 'grommet';
<Menu />
```

## Properties

**background**

Background color when drop is active

```
string
{
  color: string,
  opacity: 
    weak
    medium
    strong
    boolean
}
```

**dropAlign**

Where to place the drop down. The keys correspond to a side of the drop down.
The values correspond to a side of the control. For instance,
{left: 'left', top: 'bottom'} would align the left edges and the top of
the drop down to the bottom of the control. At most one of left or right and
one of top or bottom should be specified. Defaults to `{
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
  left: 
    right
    left,
  right: 
    right
    left
}
```

**icon**

Indicates the icon shown as a control to open it.

```
node
```

**items**

Required. Menu items to be placed inside the drop down.
The object values can be any Button prop, for example: label and onClick.

```
[object]
```

**label**

Indicates the label shown as a control to open it.

```
string
node
```

**messages**

Custom messages for Menu. Used for accessibility by screen readers.

```
{
  closeMenu: string,
  openMenu: string
}
```
  