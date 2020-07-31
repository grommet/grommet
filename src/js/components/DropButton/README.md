## DropButton
A Button that controls a Drop. When opened, the Drop will contain
      whatever is specified via `dropContent`. The Drop will control the focus
      so that the contents behind it are not focusable. All properties and 
      theme properties of Button or Drop can be passed through.
      

[![](https://cdn-images-1.medium.com/fit/c/120/120/1*TD1P0HtIH9zF0UEH28zYtw.png)](https://storybook.grommet.io/?selectedKind=DropButton&full=0&addons=0&stories=1&panelRight=0) [![](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/grommet/grommet-sandbox?initialpath=/dropbutton&module=%2Fsrc%2FDropButton.js)
## Usage

```javascript
import { DropButton } from 'grommet';
<DropButton dropContent={...} />
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

**dropProps**

Any valid Drop prop.

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
  
## Intrinsic element

```
button
```