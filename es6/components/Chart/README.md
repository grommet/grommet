## Chart
A graphical chart.

[![](https://cdn-images-1.medium.com/fit/c/120/120/1*TD1P0HtIH9zF0UEH28zYtw.png)](https://storybook.grommet.io/?selectedKind=Visualizations-Chart&full=0&stories=1&panelRight=0) [![](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/grommet/grommet-sandbox?initialpath=/chart&module=%2Fsrc%2FChart.js)
## Usage

```javascript
import { Chart } from 'grommet';
<Chart />
```

## Properties

**a11yTitle**

Custom label to be used by screen readers. When provided, an aria-label will
   be added to the element.

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
  end: 
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
  start: 
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

**animate**

Whether to animate drawing.

```
boolean
```

**bounds**

The limits for the values, specified as a two dimensional array. 
      The first array specifies the limits of the x-axis. The second array 
      specifies the limits of the y-axis. 
      For example: [[x-min, x-max], [y-min, y-max]].
      If not specified, the bounds will automatically be set to fit
      the provided values.

```
[[number]]
```

**color**

A color identifier to use for the graphic color. If an
      array is specified, it is used to create a gradient mask. Array objects
      indicate what color to show at what value. In the simplest case, the
      values should map to the Y bounds values, resulting in a vertical
      gradient. Specifying more objects allows more fine grained control over
      where the gradient colors change. Defaults to `accent-1`.

```
string
{
  dark: string,
  light: string
}
{
  color: 
    string
    {
      dark: string,
      light: string
    },
  opacity: 
    weak
    medium
    strong
    boolean
}
[{
  color: 
    string
    {
      dark: string,
      light: string
    },
  value: number
}]
```

**id**

A unique identifier for the Chart. This
      is required if more than one Chart is shown and they use color
      gradients.

```
string
```

**dash**

Whether to use dashed lines for line or bar charts.

```
boolean
```

**gap**

The amount of spacing between data points. This
      is only used when the size specifies width as 'auto'.

```
none
xxsmall
xsmall
small
medium
large
xlarge
string
```

**onClick**

Called when the user clicks on the
     visualization. Clicking on individual bars or points are handled via
     values[].onClick for those types of charts.

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

**opacity**

What opacity to apply to the visuals. Supercedes 'color.opacity'

```
weak
medium
strong
boolean
```

**overflow**

Whether the chart strokes should overflow the component. Set this
      to true for precise positioning when stacking charts or including
      precise axes. Set this to false to have the graphical elements
      align with the component boundaries.

```
boolean
```

**pad**

Spacing around the outer edge of the drawing coordinate area.
      Related to 'overflow', this allows control over how much space
      is available for bars and points to overflow into. Defaults to `none`.

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
  end: 
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
  start: 
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

**point**

When using a 'point' type, what shape the points should use.
      If this property is not specified, points will be drawn as a square or
      a circle, based on how 'round' is specified.

```
circle
diamond
square
star
triangle
triangleDown
```

**round**

Whether to round the line ends.

```
boolean
```

**size**

The size of the Chart.
      'full' is deprecated as 'fill' is more consistent with how that term is
      used elsewhere. Defaults to `{
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
fill
full
{
  height: 
    xxsmall
    xsmall
    small
    medium
    large
    xlarge
    fill
    full
    string,
  width: 
    xxsmall
    xsmall
    small
    medium
    large
    xlarge
    fill
    full
    auto
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
number
```

**type**

The visual type of chart. Defaults to `bar`.

```
bar
line
area
point
```

**values**

Required. Array of value objects describing the data.
      'value' is a tuple indicating the coordinate of the value or a triple
      indicating the x coordinate and a range of two y coordinates.
      'label' is a text string describing it.
      'onHover' and 'onClick' only work when type='bar'.
      'color', 'opacity', and 'thickness' allow bar and point charts to have
      color variation per-value.

```
[
  number
  [number]
  {
    color: 
      string
      {
        dark: string,
        light: string
      },
    label: string,
    onClick: function,
    onHover: function,
    opacity: 
      string
      number,
    thickness: 
      hair
      xsmall
      small
      medium
      large
      xlarge
      none
      string
      number,
    value: 
      number
      [number]
  }
]
```
  
## Theme
  
**chart.color**

Color of the Chart. Expects `string | {dark: string, light: string}`.

Defaults to

```
accent-1
```

**chart.extend**

Any additional style for the Chart. Expects `string | (props) => {}`.

Defaults to

```
undefined
```

**global.colors**

Color options. Expects `object`.

Defaults to

```
{
      "accent-1": "#6FFFB0",
      "graph-0": "accent-1",
      ...
    }
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

The opacity of the Chart stroke. Expects `object`.

Defaults to

```
{
      strong: 0.8,
      medium: 0.4,
      weak: 0.1,
    }
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
