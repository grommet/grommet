## Stack
Stacks components on top of the first child component.

[![](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/grommet/grommet-sandbox?initialpath=stack&module=%2Fsrc%2FStack.js)
## Usage

```javascript
import { Stack } from 'grommet';
<Stack />
```

## Properties

**anchor**

Where to anchor children from. If not specified, children
      fill the guiding child's area.

```
center
left
right
top
bottom
top-left
bottom-left
top-right
bottom-right
```

**fill**

Whether to expand to fill
      all of the available width and height in the parent container.

```
boolean
```

**guidingChild**

Which child to guide layout from. All other children
      will be positioned within that area. Defaults to 'first'. Defaults to `first`.

```
number
first
last
```
  