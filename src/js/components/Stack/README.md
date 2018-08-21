## Stack
Stacks components on top of the first child component.

[![](https://cdn-images-1.medium.com/fit/c/120/120/1*TD1P0HtIH9zF0UEH28zYtw.png)](https://storybook.grommet.io/?selectedKind=Stack&full=0&addons=0&stories=1&panelRight=0) [![](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/grommet/grommet-sandbox?initialpath=stack&module=%2Fsrc%2FStack.js)
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
  