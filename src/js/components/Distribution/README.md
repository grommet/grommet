## Distribution
Approximately proportionally sized grid of boxes. The
      area given to each box isn't mathematically precise according to the
      ratio to the total values. Instead, the boxes are laid out in a
      manner that makes them more visually easy to scan. For example,
      two values of 48 and 52 will actually each get 50% of the area.

[![](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/grommet/grommet-sandbox?initialpath=distribution&module=%2Fsrc%2FDistribution.js)
## Usage

```javascript
import { Distribution } from 'grommet';
<Distribution />
```

## Properties

**children**

Function that will be called when each value is rendered.

```
function
```

**gap**

The amount of spacing between child elements.

```
xsmall
small
medium
large
xlarge
```

**values**

Required. Array of objects containing a value. The array should already be
      sorted from largest to smallest value. The caller can put other
      properties in the object. The children function will be called to
      render the contents of each value.

```
[{
  value: number
}]
```
  