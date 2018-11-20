## DataTable
A data driven table.

[![](https://cdn-images-1.medium.com/fit/c/120/120/1*TD1P0HtIH9zF0UEH28zYtw.png)](https://storybook.grommet.io/?selectedKind=DataTable&full=0&addons=0&stories=1&panelRight=0) [![](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/grommet/grommet-sandbox?initialpath=datatable&module=%2Fsrc%2FDataTable.js)
## Usage

```javascript
import { DataTable } from 'grommet';
<DataTable />
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

**columns**


      A description of the data. The order controls the column order.
      'property' indicates which property in the data objects to associate
      the column with. 'header' indicates what to display in the column
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
    node
    {
      aggregate: boolean
    },
  header: 
    string
    node
    {
      aggregate: boolean
    },
  property: string,
  render: function,
  search: boolean
}]
```

**data**

Array of data objects.

```
[{

}]
```

**groupBy**

Property to group data by.

```
string
```

**onMore**

Use this to indicate that 'data' doesn't contain all that it could.
      It will be called when all of the data rows have been rendered.
      This might be used when the total number of items that could be retrieved
      is more than you'd want to load into the browser. 'onMore' allows you
      to lazily fetch more from the server only when needed. This cannot
      be combined with properties that expect all data to be present in the
      browser, such as columns.search, sortable, groupBy, or columns.aggregate.

```
function
```

**onSearch**

When supplied, and when at least one column has 'search' enabled,
      this function will be called with an object with keys for property
      names and values which are the search text strings. This is typically
      employed so a back-end can be used to search through the data.

```
function
```

**resizeable**

Whether to allow the user to resize column widths.

```
boolean
```

**size**


      The height of the table body. If set, the table body will have a fixed
      height and the rows will be scrollable within it. In order to preserve
      header and footer cell alignment, all cells will have the same
      width. This cannot be used in combination with 'resizeable'.
    

```
small
medium
large
xlarge
string
```

**sortable**

Whether to allow the user to sort columns.

```
boolean
```
  