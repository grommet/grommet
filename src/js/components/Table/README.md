## Table
A table of data organized in cells.

[![](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/grommet/grommet-sandbox?initialpath=table&module=%2Fsrc%2FTable.js)
## Usage

```javascript
import { Table, TableCell } from 'grommet';
<Table />
```

## Properties

**caption**

One line summary

```
string
```

**columns**

Required. Description of the table columns. Either property or
        renderData must be specified. If property is specified, a TableCell
        containing the datum property value will be rendered in Text. It is
        recommended to use TableCell for header, footer, and in renderData.

```
[{
  basis: 
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
    3/4,
  dataHeader: boolean,
  footer: node,
  header: node,
  label: string,
  property: string,
  renderData: function
}]
```

**data**

Data objects to populate the table with. Each object in
        the array will be placed in a separate row. Properties of each object
        are rendered according to how columns are defined.

```
[object]
```
  