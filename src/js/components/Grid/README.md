## Grid
A grid system for laying out content. To use, define the
rows and columns, create area names for adjacent cells, and then
place Box components inside those areas using the Box.gridArea property.
See https://css-tricks.com/snippets/css/complete-guide-grid/.
The availability of Grid can be tested via 'Grid.available'. Use this
to create fallback rendering for older browsers, like ie11.

[![](https://cdn-images-1.medium.com/fit/c/120/120/1*TD1P0HtIH9zF0UEH28zYtw.png)](https://storybook.grommet.io/?selectedKind=Grid&full=0&addons=0&stories=1&panelRight=0) [![](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/grommet/grommet-sandbox?initialpath=grid&module=%2Fsrc%2FGrid.js)
## Usage

```javascript
import { Grid } from 'grommet';
<Grid />
```

## Properties

**align**

How to align the individual items inside the grid when there is extra
space in the column axis. Defaults to `stretch`.

```
start
center
end
stretch
```

**alignContent**

How to align the contents along the column axis.

```
start
center
end
between
around
stretch
```

**areas**

Area names and column,row coordinates.

```
[{
  name: string,
  start: [number],
  end: [number]
}]
```

**columns**

Column sizes.
      If an array value is an array, the inner array indicates the
      minimum and maximum sizes for the column.
      Specifying a single string will repeat multiple columns
      of that size, as long as there is room for more.
      Specifying an object allows indicating how the columns
      stretch to fit the available space.

```
[
  xsmall
  small
  medium
  large
  xlarge
  full
  1/2
  1/3
  2/3
  1/4
  3/4
  flex
  [xsmall
small
medium
large
xlarge
full
1/2
1/3
2/3
1/4
3/4
flex]
]
xsmall
small
medium
large
xlarge
{
  count: 
    fit
    fill,
  size: 
    xsmall
    small
    medium
    large
    xlarge
    [xsmall
small
medium
large
xlarge
full
1/2
1/3
2/3
1/4
3/4
flex]
}
```

**fill**

Whether the width and/or height should fill the container.

```
horizontal
vertical
true
false
```

**gap**

Gap sizes between rows and/or columns.

```
small
medium
large
none
{
  row: 
    small
    medium
    large
    none,
  column: 
    small
    medium
    large
    none
}
```

**justify**

How to align the individual items inside the grid when there is extra
space in the row axis. Defaults to `stretch`.

```
start
center
end
stretch
```

**justifyContent**

How to align the contents along the row axis.

```
start
center
end
between
around
stretch
```

**rows**

Row sizes.
      If an array value is an array, the inner array indicates the
      minimum and maximum sizes for the row.
      Specifying a single string will cause automatically added rows to be
      the specified size.

```
[
  xsmall
  small
  medium
  large
  xlarge
  full
  1/2
  1/3
  2/3
  1/4
  3/4
  flex
  [xsmall
small
medium
large
xlarge
full
1/2
1/3
2/3
1/4
3/4
flex]
]
xsmall
small
medium
large
xlarge
```

**tag**

The DOM tag to use for the element. Defaults to `div`.

```
string
```
  