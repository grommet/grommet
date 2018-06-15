## DataTable
A data driven table.

[![](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/grommet/grommet-sandbox?initialpath=datatable&module=%2Fsrc%2FDataTable.js)
## Usage

```javascript
import { DataTable } from 'grommet';
<DataTable />
```

## Properties

**bodyProps**

Properties to pass to configure body cells.

```
{

}
```

**columns**


      A description of the data. The order controls the column order.
      'property' indicates which property in the data objects to associate
      the column with. 'label' indicates what to display in the column
      header. 'render' allows for custom rendering of body cells. Use 'render'
      for custom formatting for things like currency and date or to
      display rich content like Meters. 'align' indicates how the cells in
      the column are aligned. 'aggregate' indicates how the data in the
      column should be aggregated. This only applies to a footer or groupBy
      context. 'footer' indicates what should be shown in the footer for
      the column. 'search' indicates whether a search filter should be
      made available for the column.
    

```
[{
  property: string,
  label: string,
  render: function,
  align: 
    center
    start
    end,
  aggregate: 
    avg
    max
    min
    sum,
  footer: 
    string
    {
      aggregate: boolean
    },
  search: boolean
}]
```

**data**

Array of data objects.

```
[{

}]
```

**footerProps**

Properties to pass to configure footer cells.

```
{

}
```

**groupBy**

Property to group data by.

```
string
```

**headerProps**

Properties to pass to configure header cells.

```
{

}
```

**resizeable**

Whether to allow the user to resize column widths.

```
string
```

**sortable**

Whether to allow the user to sort columns.

```
string
```
  