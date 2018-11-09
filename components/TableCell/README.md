## TableCell
A cell of data in a table.

## Usage

```javascript
import { TableCell } from 'grommet';
<TableCell />
```

## Properties

**plain**

Whether default styling context should be removed.

```
boolean
```

**scope**

For header cells, what scope the header is for.
        Typically, the cells in a TableHeader have 'col' scope and
        the primary cell in each row in the TableBody has 'row' scope.

```
col
row
```

**size**

What size the cell should be. Typically, this is not needed
      unless you are trying to align multiple tables.

```
xxsmall
xsmall
small
medium
large
xlarge
1/2
1/3
2/3
1/4
2/4
3/4
string
```

**verticalAlign**

How to align the contents vertically.

```
top
middle
bottom
```
  