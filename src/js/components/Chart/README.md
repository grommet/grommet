## Chart
A graphical chart.

[![](https://cdn-images-1.medium.com/fit/c/120/120/1*TD1P0HtIH9zF0UEH28zYtw.png)](https://storybook.grommet.io/?selectedKind=Chart&full=0&addons=0&stories=1&panelRight=0) [![](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/grommet/grommet-sandbox?initialpath=chart&module=%2Fsrc%2FChart.js)
## Usage

```javascript
import { Chart } from 'grommet';
<Chart />
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
{
  color: string,
  opacity: 
    weak
    medium
    strong
    boolean
}
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

**overflow**

Whether the chart strokes should overflow the component. Set this
      to true for precise positioning when stacking charts or including
      precise axes. Set this to false to have the graphical elements
      align with the component boundaries.

```
boolean
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
    full
    string,
  width: 
    xxsmall
    xsmall
    small
    medium
    large
    xlarge
    full
    string
}
string
```

**thickness**

The width of the stroke. Defaults to `medium`.

```
hair
xsmall
small
medium
large
xlarge
none
string
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
[
  number
  [number]
  {
    label: string,
    onClick: function,
    onHover: function,
    value: 
      number
      [number]
  }
]
```
  
## Theme
  
**chart.extend**

Any additional style for the Chart. Expects `string | (props) => {}`.

Defaults to

```
undefined
```

**global.colors**

color options used for Chart fill area. Expects `object`.

Defaults to

```
accent-1
```

**global.edgeSize**

The possible sizes for the thickness in the Chart. Expects `object`.

Defaults to

```
{
        none: '0px',
        hair: '1px',
        xxsmall: '3px',
        xsmall: '6px',
        small: '12px',
        medium: '24px',
        large: '48px',
        xlarge: '96px',
        responsiveBreakpoint: 'small',
    }
```

**global.opacity**

The opacity of the Chart stroke. Expects `string`.

Defaults to

```
undefined
```

**global.size**

The possible sizes for Chart width and height. Expects `object`.

Defaults to

```
{
      xxsmall: '48px',
      xsmall: '96px',
      small: '192px',
      medium: '384px',
      large: '768px',
      xlarge: '1152px',
      xxlarge: '1536px',
      full: '100%',
      }
```
