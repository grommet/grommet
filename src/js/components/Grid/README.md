## Grid
A grid system for laying out content. To use, define the
    rows and columns, create area names for adjacent cells, and then
    place Box components inside those areas using the Box.gridArea property.
    See https://css-tricks.com/snippets/css/complete-guide-grid/.

## Usage

```javascript
import { Grid } from 'grommet';
    <Grid/>
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

```
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
```

**gap**

Gap sizes between rows and/or columns.

```
small
medium
large
none
{
  horizontal: 
    small
    medium
    large
    none,
  vertical: 
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

```
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
```

**tag**

The DOM tag to use for the element. Defaults to `div`.

```
string
```
  