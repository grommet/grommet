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
  
## Intrinsic element

```
td
```
## Theme
  
**table.body.align**

How to align the body inside the Table. Expects `string`.

Defaults to

```
start
```

**table.body.border**

The border side of the body. Expects `string`.

Defaults to

```
undefined
```

**table.body.extend**

Any additional style for Table body. Expects `string | (props) => {}`.

Defaults to

```
undefined
```

**table.body.pad**

The padding of the body. Expects `string | object`.

Defaults to

```
{ horizontal: 'small', vertical: 'xsmall' }
```

**table.footer.align**

How to align the footer inside the Table. Expects `string`.

Defaults to

```
start
```

**table.footer.border**

The border side of the footer. Expects `string`.

Defaults to

```
top
```

**table.footer.extend**

Any additional style for Table footer. Expects `string | (props) => {}`.

Defaults to

```
undefined
```

**table.footer.fill**

Whether the height should fill the footer. Expects `string`.

Defaults to

```
vertical
```

**table.footer.pad**

The padding of the footer. Expects `string | object`.

Defaults to

```
{ horizontal: 'small', vertical: 'xsmall' }
```

**table.footer.verticalAlign**

How to align the content vertically. Expects `string`.

Defaults to

```
top
```

**table.header.align**

How to align the header inside the Table. Expects `string`.

Defaults to

```
start
```

**table.header.background**

The background color of the header. Expects `string | object`.

Defaults to

```
undefined
```

**table.header.border**

The border side of the header. Expects `string`.

Defaults to

```
bottom
```

**table.header.fill**

Whether the height should fill the header. Expects `string`.

Defaults to

```
vertical
```

**table.header.extend**

Any additional style for Table header. Expects `string | (props) => {}`.

Defaults to

```
undefined
```

**table.header.pad**

The padding of the header. Expects `string | object`.

Defaults to

```
{ horizontal: 'small', vertical: 'xsmall' }
```

**table.header.verticalAlign**

How to align the content vertically. Expects `string`.

Defaults to

```
bottom
```
