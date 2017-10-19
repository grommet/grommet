## DropButton
A control that when clicked will render its children in a drop layer.
    When opened, the drop will control the focus so that the contents behind it are not focusable.
    

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

**control**

Required. React node to open/close the drop content.

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
  