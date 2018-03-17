## Menu
Presents a list of choices within a drop down via a control that
      opens it.

[![](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/grommet/grommet-sandbox?initialpath=menu&module=%2Fsrc%2FMenu.js)
## Usage

```javascript
import { Menu } from 'grommet';
<Menu />
```

## Properties

**disabled**

Whether the menu should be disabled.

```
boolean
```

**dropAlign**

Where to place the drop down. The keys correspond to a side of the drop down.
The values correspond to a side of the control. For instance,
{left: 'left', top: 'bottom'} would align the left edges and the top of
the drop down to the bottom of the control. At most one of left or right and
one of top or bottom should be specified.

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

**dropBackground**

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

**dropTarget**

Target where the drop will be aligned to. This should be
      a React reference. Typically, this is not required as the drop will be
      aligned to the Menu itself by default.

```
object
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

Custom messages. Used for accessibility by screen readers.

```
{
  closeMenu: string,
  openMenu: string
}
```

**size**

The size of the menu.

```
small
medium
large
```
  