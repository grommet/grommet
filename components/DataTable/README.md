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
      made available for the column. 'primary' indicates that this property
      should be used as the unique identifier, which gives the cell 'row' scope
      for accessibility. If 'primary' is not used for any column, and
      'primaryKey' isn't specified either, then the first column will be used. Defaults to `[]`.

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
  primary: boolean,
  property: string,
  render: function,
  search: boolean,
  sortable: boolean
}]
```

**data**

Array of data objects. Defaults to `[]`.

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

**primaryKey**

When supplied, indicates the property for a data object to use to
      get a unique identifier. See also the 'columns.primary' description.
      Use this property when the columns approach will not work for your
      data set.

```
string
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

**step**

How many items to render at a time. Defaults to `50`.

```
number
```
  
## Intrinsic element

```
table
```
## Theme
  
**dataTable.groupHeader.background**

The background color of the group header. Expects `string | { dark: string, light: string }`.

Defaults to

```
{ dark: 'dark-2', light: 'light-2' }
```

**dataTable.groupHeader.border.side**

The border side rendered for the group header. Expects `string`.

Defaults to

```
bottom
```

**dataTable.groupHeader.border.size**

The border size of the group header border. Expects `string`.

Defaults to

```
xsmall
```

**dataTable.groupHeader.fill**

Whether the height should fill the group header. Expects `string`.

Defaults to

```
vertical
```

**dataTable.groupHeader.pad**

The pad used for the group header. Expects `string | object`.

Defaults to

```
{ horizontal: 'small', vertical: 'xsmall' }
```

**dataTable.header**

Styles for the header. Expects `object`.

Defaults to

```
{}
```

**dataTable.icons.ascending**

The ascending icon. Expects `React.Element`.

Defaults to

```
<FormDown />
```

**dataTable.icons.contract**

The contract icon. Expects `React.Element`.

Defaults to

```
<FormUp />
```

**dataTable.icons.descending**

The descending icon. Expects `React.Element`.

Defaults to

```
<FormUp />
```

**dataTable.icons.expand**

The expand icon. Expects `React.Element`.

Defaults to

```
<FormDown />
```

**dataTable.primary.weight**

The font weight for primary cells. Expects `string`.

Defaults to

```
bold
```

**dataTable.resize.border.color**

The border color for resize. Expects `string | { dark: string, light: string }`.

Defaults to

```
border
```

**dataTable.resize.border.side**

The border side used for resize. Expects `string`.

Defaults to

```
right
```
