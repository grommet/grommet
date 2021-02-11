## DataTable
A data driven table.

[![](https://cdn-images-1.medium.com/fit/c/120/120/1*TD1P0HtIH9zF0UEH28zYtw.png)](https://storybook.grommet.io/?selectedKind=Visualizations-DataTable&full=0&stories=1&panelRight=0) [![](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/grommet/grommet-sandbox?initialpath=/datatable&module=%2Fsrc%2FDataTable.js)
## Usage

```javascript
import { DataTable } from 'grommet';
<DataTable />
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

**background**

Cell background. You can set the background per context by passing an
      object with keys for 'heading', 'body', and/or 'footer'. If you pass
      an array, rows will cycle between the array values.

```
string
[string]
{
  header: 
    string
    {
      dark: string,
      light: string
    }
    [string],
  body: 
    string
    {
      dark: string,
      light: string
    }
    [string],
  footer: 
    string
    {
      dark: string,
      light: string
    }
    [string],
  pinned: 
    string
    {
      dark: string,
      light: string
    }
    [string]
}
```

**border**

Cell border. You can set the border per context by passing an
      object with keys for 'heading', 'body', and/or 'footer'.

```
boolean
horizontal
vertical
top
bottom
left
right
{
  color: 
    string
    {
      dark: string,
      light: string
    },
  side: 
    horizontal
    vertical
    top
    bottom
    left
    right,
  size: 
    xxsmall
    xsmall
    small
    medium
    large
    xlarge
    string
}
{
  header: 
    boolean
    horizontal
    vertical
    top
    bottom
    left
    right
    {
      color: 
        string
        {
          dark: string,
          light: string
        },
      side: 
        horizontal
        vertical
        top
        bottom
        left
        right,
      size: 
        xxsmall
        xsmall
        small
        medium
        large
        xlarge
        string
    },
  body: 
    boolean
    horizontal
    vertical
    top
    bottom
    left
    right
    {
      color: 
        string
        {
          dark: string,
          light: string
        },
      side: 
        horizontal
        vertical
        top
        bottom
        left
        right,
      size: 
        xxsmall
        xsmall
        small
        medium
        large
        xlarge
        string
    },
  footer: 
    boolean
    horizontal
    vertical
    top
    bottom
    left
    right
    {
      color: 
        string
        {
          dark: string,
          light: string
        },
      side: 
        horizontal
        vertical
        top
        bottom
        left
        right,
      size: 
        xxsmall
        xsmall
        small
        medium
        large
        xlarge
        string
    }
}
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
      'primaryKey' isn't specified either, then the first column will be used.
      'pin' indicates that this column should not scroll out of view
      to the left when the table is scrolled horizontally.

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
  pin: boolean,
  primary: boolean,
  property: string,
  render: function,
  search: boolean,
  sortable: boolean,
  size: 
    small
    medium
    large
    xlarge
    1/2
    1/4
    2/4
    3/4
    1/3
    2/3
    string,
  units: string,
  verticalAlign: 
    middle
    top
    bottom
}]
```

**data**

Array of data objects.

```
[{

}]
```

**fill**

Whether the width and/or height should fill the container.

```
horizontal
vertical
boolean
```

**groupBy**

Property to group data by. If object is specified
      'property' is used to group data by, 'expand' accepts array of 
       group keys that sets expanded groups and 'onExpand' is a function
       that will be called after expand button is clicked with
       an array of keys of expanded groups.

```
string
{
  property: string,
  expand: [string],
  onExpand: function
}
```

**onClickRow**

When supplied, this function will be called with an event object that
      include a 'datum' property containing the data value associated with
      the clicked row. You should not include interactive elements, like
      Anchor or Button inside table cells as that can cause confusion with
      overlapping interactive elements.

```
function
```

**onMore**

Use this to indicate that 'data' doesn't contain all that it could.
      It will be called when all of the data rows have been rendered.
      This might be used when the total number of items that could be retrieved
      is more than you'd want to load into the browser. 'onMore' allows you
      to lazily fetch more from the server only when needed. This cannot
      be combined with properties that expect all data to be present in the
      browser, such as columns.search, sortable, groupBy, or 
      columns.aggregate.

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

**onSelect**

When supplied, causes checkboxes to be added to each row such that
      the user can indicate which rows should be selected. This function
      will be called with an array of primary key values, suitable to be
      passed to the 'select' property. If you are storing select state via
      a 'useState' hook, you can do something like:
      '<DataTable select={select} onSelect={setSelect} />'.

```
function
```

**onSort**

When supplied, this function will be called with an object
      with a 'property' property that indicates which property
      is being sorted on and a 'direction' property that will either be
      'asc' or 'desc'. onSort={({ property, direction }) => {}}

```
function
```

**pad**

Cell padding. You can set the padding per context by passing an
      object with keys for 'heading', 'body', and/or 'footer'.

```
xxsmall
xsmall
small
medium
large
xlarge
string
{
  horizontal: 
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
    string,
  top: 
    xxsmall
    xsmall
    small
    medium
    large
    xlarge
    string,
  bottom: 
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
    string
}
{
  header: custom,
  body: custom,
  footer: custom
}
```

**pin**

Whether the header and/or footer should be pinned when
      not all rows are visible. A value of true pins both header and footer.

```
boolean
header
footer
```

**placeholder**

A text message or any content to place over the table body.
      For example, to say "loading ..." when waiting for data to arrive.

```
string
node
```

**primaryKey**

When supplied, indicates the property for a data object to use to
      get a unique identifier. See also the 'columns.primary' description.
      Use this property when the columns approach will not work for your
      data set. Setting primaryKey to false indicates there should be no
      unique identifier, avoid this as it's less accessible.

```
string
boolean
```

**replace**

Whether to replace previously rendered items with a generic spacing
      element when they have scrolled out of view. This is more performant but
      means that in-page searching will not find elements that have been
      replaced.

```
boolean
```

**resizeable**

Whether to allow the user to resize column widths.

```
boolean
```

**rowProps**

Row specific background, border, and pad, keyed by primary key value.
      For example:
      { "primary-key-value": { background: ..., border: ..., pad: ... }},
      where the background, border, and pad accept the same values as
      the same named properties on DataTable.

```
{

}
```

**select**

When supplied, causes checkboxes to be added to each row to indicate
      which rows are selected. The values in this array should match
      the 'primaryKey' or 'columns[].primary' keyed value for the row's data
      object. If 'onSelect' is provided, the CheckBoxes are enabled
      and this function can be used to track select changes.

```
[
  string
  number
]
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

**sort**

Which property to sort on and which direction to sort. When 'external'
      is true, it indicates that the caller will take care of sorting
      the 'data' via 'onSort'. Otherwise, the existing data will be sorted
      within DataTable.

```
{
  direction: 
    asc
    desc,
  external: boolean,
  property: string
}
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
  
**global.hover.background**

The background style when hovering over an interactive row. Expects `string | { color: string, opacity: string }`.

Defaults to

```
{ color: 'active', opacity: 'medium' }
```

**global.hover.color**

The text color when hovering over an interactive row. Expects `string | { dark: string, light: string }`.

Defaults to

```
{ dark: 'white', light: 'black' }
```

**dataTable.body.extend**

Any additional style for an DataTable Body Expects `string | (props) => {}`.

Defaults to

```
undefined
```

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

**dataTable.header.background**

Any valid Box background value. Expects `string | 
    { dark: string, light: string } |
    { 
      color: { dark: string, light: string } | string, 
      dark: bool, 
      image: string, 
      position: string, 
      opacity: bool | string, 
      repeat: no-repeat | repeat, 
      size: cover | contain | string
    }`.

Defaults to

```
undefined
```

**dataTable.header.border**

Any valid Box border value. Expects `string | object`.

Defaults to

```
undefined
```

**dataTable.header.color**

The label and icon color in a header cell. Expects `{ dark: string, light: string } | string`.

Defaults to

```
undefined
```

**dataTable.header.extend**

Any additional styles for header cells. Expects `string | (props) => {}`.

Defaults to

```
undefined
```

**dataTable.header.font.weight**

The font weight for text in header cells. Expects `string`.

Defaults to

```
undefined
```

**dataTable.header.font.size**

The font size for text in header cells. Expects `string`.

Defaults to

```
undefined
```

**dataTable.header.gap**

The gap between elements within the header cell. Expects `object`.

Defaults to

```
small
```

**dataTable.header.hover.background**

The hover background color of the header cell contents, if 
    clickable. Any valid Box background options apply. Expects `string | 
    { dark: string, light: string } |
    { 
      color: { dark: string, light: string } | string, 
      dark: bool, 
      image: string, 
      position: string, 
      opacity: bool | string, 
      repeat: no-repeat | repeat, 
      size: cover | contain | string
    }`.

Defaults to

```
undefined
```

**dataTable.header.pad**

The pad around the contents of the header cell. Expects `string | object`.

Defaults to

```
undefined
```

**dataTable.header.units**

Any Text component properties for styling the
    header's units text. Expects `object`.

Defaults to

```
{
  color: "text-xweak",
  margin: { left: "xsmall" }
}
```

**dataTable.resize.hover.color**

The color of the resizer when hovered over. Expects `string | object`.

Defaults to

```
undefined
```

**dataTable.resize.hover.side**

The side of the resizer when hovered over. If color or size 
    are defined, this will default to 'end' which is the recommended value. Expects `string`.

Defaults to

```
undefined
```

**dataTable.resize.hover.size**

The size of the resizer when hovered over. Size values 
    correspond with those accepted by Box border. Expects `string`.

Defaults to

```
undefined
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

**dataTable.icons.sortable**

The icon indicating a column can be sorted. Expects `React.Element`.

Defaults to

```
undefined
```

**dataTable.pinned.body.background**

Any valid Box background options apply. Expects `string | 
      { dark: string, light: string } |
      { 
        color: { dark: string, light: string } | string, 
        dark: bool, 
        image: string, 
        position: string, 
        opacity: bool | string, 
        repeat: no-repeat | repeat, 
        size: cover | contain | string
      }`.

Defaults to

```
undefined
```

**dataTable.pinned.body.extend**

Any additional styles for pinned body cells. Expects `string | (props) => {}`.

Defaults to

```
undefined
```

**dataTable.pinned.header.background**

Any valid Box background options apply. Expects `string | 
      { dark: string, light: string } |
      { 
        color: { dark: string, light: string } | string, 
        dark: bool, 
        image: string, 
        position: string, 
        opacity: bool | string, 
        repeat: no-repeat | repeat, 
        size: cover | contain | string
      }`.

Defaults to

```
undefined
```

**dataTable.pinned.header.extend**

Any additional styles for pinned header cells. Expects `string | (props) => {}`.

Defaults to

```
undefined
```

**dataTable.pinned.footer.background**

Any valid Box background options apply. Expects `string | 
      { dark: string, light: string } |
      { 
        color: { dark: string, light: string } | string, 
        dark: bool, 
        image: string, 
        position: string, 
        opacity: bool | string, 
        repeat: no-repeat | repeat, 
        size: cover | contain | string
      }`.

Defaults to

```
undefined
```

**dataTable.pinned.footer.extend**

Any additional styles for pinned footer cells. Expects `string | (props) => {}`.

Defaults to

```
undefined
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

**table.row.hover.background**

The background color when hovering over an interactive row. Expects `string | { color: string, opacity: string }`.

Defaults to

```
undefined
```

**table.row.hover.color**

The text color when hovering over an interactive row. Expects `string | { dark: string, light: string }`.

Defaults to

```
undefined
```
