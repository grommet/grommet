## Drop
A drop container that opens next to a target.

## Usage

```javascript
import { Drop } from 'grommet';
    <Drop target={element}>...</Drop>
```

## Properties

**align**

How to align the drop with respect to the target element. Defaults to `{
  "defaultProp": {
    "top": "top",
    "left": "left"
  }
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

Required. Target container where the drop will be aligned.

```
object
```

**dir**

Whether text should be rendered right to left or not. Defaults to
      inherit from the document context.

```
rtl
ltr
```

**restrictFocus**

Whether the drop should control focus.

```
boolean
```

**onClose**

Function that will be invoked when the user clicks outside the drop area.

```
function
```

**responsive**

Whether to dynamically re-place when resized. Defaults to `{
  "defaultProp": true
}`.

```
boolean
```

**theme**

Custom styles for Drop component.

```
object
```
  