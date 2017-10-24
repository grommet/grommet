## Chart
A graphical chart.

[![](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/grommet/grommet-site?initialpath=chart&amp;module=%2Fscreens%2FChart.js)
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

```
[{
  label: string,
  value: [number]
}]
```
  