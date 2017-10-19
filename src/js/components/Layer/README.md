## Layer
A modal overlay. It is the caller's responsibility to provide a control for
    the user to close the layer.

## Usage

```javascript
import { Layer } from 'grommet';
    <Layer/>
```

## Properties

**align**

Which direction the layer contents should emanate from. Defaults to `center`.

```
center
top
bottom
left
right
```

**onEsc**

Function that will be called when the user presses the escape key inside the Layer.

```
function
```

**size**

Size for the Layer.

```
xxsmall
xsmall
small
medium
large
xlarge
xxlarge
full
```
  