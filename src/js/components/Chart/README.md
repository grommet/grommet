## Chart
A graphical chart.

[![](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/grommet/grommet-sandbox?initialpath=chart&module=%2Fsrc%2FChart.js)
## Usage

```javascript
import { Chart } from 'grommet';
<Chart />
```

## Properties

**bounds**

The limits for the values, specified as a two dimensional array.
      If not specified, the bounds will automatically be set to fit
      the provided values.

```
[[number]]
```

**color**

A color identifier to use for the graphic color. Defaults to `accent-1`.

```
string
```

**onClick**

Called when the user clicks on it.
      This is only available when the type is line or area.

```
function
```

**onHover**

Called with a boolean argument
      indicating when the user hovers onto or away from it.
      This is only available when the type is line or area.

```
function
```

**round**

Whether to round the line ends.

```
boolean
```

**size**

The size of the Chart. Defaults to `{
  "width": "medium",
  "height": "small"
}`.

```
xxsmall
xsmall
small
medium
large
xlarge
full
{
  height: 
    xxsmall
    xsmall
    small
    medium
    large
    xlarge
    full,
  width: 
    xxsmall
    xsmall
    small
    medium
    large
    xlarge
    full
}
```

**thickness**

The width of the stroke. Defaults to `medium`.

```
xsmall
small
medium
large
xlarge
none
```

**type**

The visual type of meter. Defaults to `bar`.

```
bar
line
area
```

**values**

Required. Array of value objects describing the data.
      'value' is a tuple indicating the coordinate of the value or a triple
      indicating the x coordinate and a range of two y coordinates.
      'label' is a text string describing it.
      'onHover' and 'onClick' only work when type='bar'.

```
[{
  label: string,
  onClick: function,
  onHover: function,
  value: [number]
}]
```
  