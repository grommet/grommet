## Distribution
Proportionally sized grid of boxes. The proportions are approximate. The
      area given to each box isn't mathematically precise according to the
      ratio to the total values. Instead, the boxes are laid out in a
      manner that makes them more visually easy to scan. For example,
      two values of 48 and 52 will actually each get 50% of the area.

[![](https://cdn-images-1.medium.com/fit/c/120/120/1*TD1P0HtIH9zF0UEH28zYtw.png)](https://storybook.grommet.io/?selectedKind=Distribution&full=0&addons=0&stories=1&panelRight=0) [![](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/grommet/grommet-sandbox?initialpath=distribution&module=%2Fsrc%2FDistribution.js)
## Usage

```javascript
import { Distribution } from 'grommet';
<Distribution />
```

## Properties

**a11yTitle**

Custom title to be used by screen readers.

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

**children**

Function that will be called when each value is rendered. Defaults to `function children(value) {
    return _react.default.createElement(_Box.Box, {
      fill: true,
      border: true
    }, _react.default.createElement(_Text.Text, null, value.value));
  }`.

```
function
```

**fill**

Whether the distribution expands to fill all of the available width and height.

```
boolean
```

**gap**

The amount of spacing between child elements. Defaults to `xsmall`.

```
xsmall
small
medium
large
xlarge
string
```

**values**

Required. Array of objects containing a value. The array should already be
      sorted from largest to smallest value. The caller can put other
      properties in the object. The children function will be called to
      render the contents of each value. Defaults to `[]`.

```
[{
  value: number
}]
```
  
## Intrinsic element

```
div
```