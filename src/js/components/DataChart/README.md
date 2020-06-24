## DataChart
Takes a data set and visualizes it. While Chart renders a
    single value across a data set. DataChart allows multiple overlayed
    Charts and adds guides and axes for decoration.

[![](https://cdn-images-1.medium.com/fit/c/120/120/1*TD1P0HtIH9zF0UEH28zYtw.png)](https://storybook.grommet.io/?selectedKind=DataChart&full=0&addons=0&stories=1&panelRight=0) [![](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/grommet/grommet-sandbox?initialpath=datachart&module=%2Fsrc%2FDataChart.js)
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

TBD

```
boolean
{
  x: 
    string
    {
      property: string,
      granularity: 
        coarse
        medium
        fine
    },
  y: 
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

**chart**

How to visualize the data.
    'property' indicates which property of the data objects to use.
    When 'property' is an array, multiple properties are used for a
    stacked bar chart.

```
{
  property: 
    string
    [{
  key: string,
  color: 
    string
    {
      color: string,
      opacity: 
        weak
        medium
        strong
        boolean
    }
    [{
  color: string,
  value: number
}]
}],
  dash: boolean,
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
    line
    area
    point
}
[{
  property: 
    string
    [{
  key: string,
  color: 
    string
    {
      color: string,
      opacity: 
        weak
        medium
        strong
        boolean
    }
    [{
  color: string,
  value: number
}]
}],
  dash: boolean,
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
    line
    area
    point
}]
```

**data**

the data set

```
[{

}]
```

**detail**

TBD

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

TBD

```
boolean
{
  x: 
    {
      granularity: 
        coarse
        medium
        fine
    },
  y: 
    {
      granularity: 
        coarse
        medium
        fine
    }
}
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

**property**

TBD

```
{
  bounds: [number],
  color: 
    string
    {
      color: string,
      opacity: 
        weak
        medium
        strong
        boolean
    }
    [{
  color: string,
  value: number
}],
  label: 
    string,
  prefix: string,
  property: string,
  render: function,
  suffix: string
}
[{
  bounds: [number],
  color: 
    string
    {
      color: string,
      opacity: 
        weak
        medium
        strong
        boolean
    }
    [{
  color: string,
  value: number
}],
  label: 
    string,
  prefix: string,
  property: string,
  render: function,
  suffix: string
}]
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