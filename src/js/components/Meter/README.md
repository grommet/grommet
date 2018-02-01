## Meter
A graphical meter.

[![](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/grommet/grommet-sandbox?initialpath=meter&module=%2Fsrc%2FMeter.js)
## Usage

```javascript
import { Meter } from 'grommet';
<Meter />
```

## Properties

**background**

A color identifier to use for the background color. For example:
      'light-1'.

```
string
```

**round**

Whether to round the line ends

```
boolean
```

**size**

The size of the Meter. Defaults to `medium`.

```
xsmall
small
medium
large
xlarge
full
```

**thickness**

The size of the Meter. Defaults to `medium`.

```
xsmall
small
medium
large
xlarge
```

**type**

The visual type of meter.

```
bar
circle
```

**values**

Array of value objects describing the data.
      'value' is the actual numeric value.
      'label' is a text string describing it.
      'color' indicates the color name to use. If not specified a default one
      will be chosen.
      'onClick' will be called when the user clicks on it.
      Set 'highlight' to call attention to it.
      'onHover' will be called with a boolean argument indicating when the
      user hovers onto or away from it.

```
[{
  color: string,
  highlight: boolean,
  label: string,
  onClick: function,
  onHover: function,
  value: number
}]
```
  