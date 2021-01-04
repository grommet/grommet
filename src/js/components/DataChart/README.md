## DataChart
Takes a data set and visualizes it. While Chart renders a
    single value across a data set. DataChart allows multiple overlayed
    Charts and adds guides and axes for decoration.

[![](https://cdn-images-1.medium.com/fit/c/120/120/1*TD1P0HtIH9zF0UEH28zYtw.png)](https://storybook.grommet.io/?selectedKind=Visualizations-DataChart&full=0&stories=1&panelRight=0) [![](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/grommet/grommet-sandbox?initialpath=/datachart&module=%2Fsrc%2FDataChart.js)
## Usage

```javascript
import { DataChart } from 'grommet';
<DataChart data={data} property={} />
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

**axis**

Whether to show an axis and how it should look.
      If 'x' or 'y' is a string, it indicates the property to use
      to determine the values to show.
      If axis or 'x' is true, DataChart will look for a property called 'date'
      or 'time' and automatically use that for the x-axis. If DataChart
      can't find a property to use, it will use the data index for the x-axis.
      If axis or 'y' is true, DataChart will use the first property in 'series'.
      'granularity' indicates how many values to show.
      'coarse' granularity shows two values, one at each end.
      'fine' granularity shows all x-axis values and 5 y-axis values.
      'medium' granularity picks something in between. Defaults to `true`.

```
boolean
{
  x: 
    boolean
    string
    {
      property: string,
      granularity: 
        coarse
        medium
        fine
    },
  y: 
    boolean
    string
    {
      property: string,
      granularity: 
        coarse
        medium
        fine
    }
}
```

**bounds**

When set to 'align', indicates that the bounds of all series
      should be aligned. When not set, the bounds of each series
      property are based solely on the data found for that property. Defaults to `align`.

```
align
```

**chart**

How to visualize the data.
    'property' indicates which property of the data objects to use.
    When 'property' is an array, multiple properties are used for a
    stacked bar chart. If only a string is specified, that is the property
    to use and all other aspects are defaulted. If 'property' is an object,
    it specifies a map of properties to graphic aspects: x, y, color, thickness.
    If 'transform' is specified, it will be used to transform the data value
    before using it. For example, to convert a data value to a hex color
    string for the color.

```
string
{
  property: 
    string
    [
      string
      {
        property: string,
        color: 
          string
          [{
  color: string,
  value: number
}]
      }
    ]
    {
      color: 
        string
        {
          property: string,
          transform: function
        },
      thickness: 
        string
        {
          property: string,
          transform: function
        },
      x: string,
      y: string
    },
  color: 
    string
    [{
  color: string,
  value: number
}],
  dash: boolean,
  opacity: 
    weak
    medium
    strong
    number
    boolean,
  point: 
    circle
    diamond
    square
    star
    triangle
    triangleDown,
  round: boolean,
  thickness: 
    hair
    xsmall
    small
    medium
    large
    xlarge
    none
    string,
  type: 
    bar
    bars
    line
    area
    point
}
[
  string
  {
    property: 
      string
      [
        string
        {
          property: string,
          color: 
            string
            [{
  color: string,
  value: number
}]
        }
      ]
      {
        color: 
          string
          {
            property: string,
            transform: function
          },
        thickness: 
          string
          {
            property: string,
            transform: function
          },
        x: string,
        y: string
      },
    color: 
      string
      [{
  color: string,
  value: number
}],
    dash: boolean,
    opacity: 
      weak
      medium
      strong
      number
      boolean,
    point: 
      circle
      diamond
      square
      star
      triangle
      triangleDown,
    round: boolean,
    thickness: 
      hair
      xsmall
      small
      medium
      large
      xlarge
      none
      string,
    type: 
      bar
      bars
      line
      area
      point
  }
]
```

**data**

the data set

```
[{

}]
```

**detail**

Whether to add the ability to interact with the chart
      via mouse or keyboard to show details on specific values in the chart.
      It shows all properties specified in 'series', using any 'render'
      functions therein.

```
boolean
```

**gap**

The spacing between the axes and the Charts.

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

**guide**

Whether to put guidelines underneath the chart graphics.
    See the description of 'granularity' under 'axis'.

```
boolean
{
  x: 
    boolean
    {
      granularity: 
        coarse
        medium
        fine
    },
  y: 
    boolean
    {
      granularity: 
        coarse
        medium
        fine
    }
}
```

**legend**

Whether to include a legend

```
boolean
```

**pad**

Spacing around the outer edge of
    the drawing coordinate area for the graphic elements to overflow into. Defaults to `none`.

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

**series**

Describes which parts of the 'data' are of interest and
    how to handle them. 'property' indicates which property of the 'data'
    objects this series refers to. 'label' indicates how to label the series
    in a legend or hover details. 'prefix' and 'suffix' are applied to the
    data values shown in an axis, legend, or details. 'render' allows custom
    rendering of the data value. 'render' is called with:
    (value, datum, property) => { return < />; }

```
string
{
  label: 
    string,
  prefix: string,
  property: string,
  render: function,
  suffix: string
}
[
  string
  {
    label: 
      string,
    prefix: string,
    property: string,
    render: function,
    suffix: string
  }
]
```

**size**

The size of the Charts. This does not include the axes
      and any gap. It is passed through to the underlying Chart.

```
fill
{
  height: 
    xxsmall
    xsmall
    small
    medium
    large
    xlarge
    fill
    string,
  width: 
    xxsmall
    xsmall
    small
    medium
    large
    xlarge
    fill
    auto
    string
}
```
  
## Intrinsic element

```
div
```