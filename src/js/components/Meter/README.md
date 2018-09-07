## Meter
A graphical meter.

[![](https://cdn-images-1.medium.com/fit/c/120/120/1*TD1P0HtIH9zF0UEH28zYtw.png)](https://storybook.grommet.io/?selectedKind=Meter&full=0&addons=0&stories=1&panelRight=0) [![](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/grommet/grommet-sandbox?initialpath=meter&module=%2Fsrc%2FMeter.js)
## Usage

```javascript
import { Meter } from 'grommet';
<Meter />
```

## Properties

**background**

Background color

```
string
{
  color: string,
  opacity: 
    weak
    medium
    strong
    boolean
}
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
string
```

**thickness**

The size of the Meter. Defaults to `medium`.

```
xsmall
small
medium
large
xlarge
string
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
  