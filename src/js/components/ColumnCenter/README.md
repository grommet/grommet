## undefined
Typical variations on responsive multiple column layouts.

[![](https://cdn-images-1.medium.com/fit/c/120/120/1*TD1P0HtIH9zF0UEH28zYtw.png)](https://storybook.grommet.io/?selectedKind=Layout-Columns&full=0&stories=1&panelRight=0) [![](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/grommet/grommet-sandbox?initialpath=/columns&module=%2Fsrc%2FColumns.js)
## Usage

```javascript
import { Columns } from 'grommet';
<Columns />
```

## Properties

**aside**

Maximum width of the last child.

```
xsmall
small
medium
large
xlarge
string
```

**center**


      Whether to center the Columns component.
     Defaults to `true`.

```
boolean
```

**gutter**


      Minimum vertical gutters when 'center' is true.
      

```
xsmall
small
medium
large
xlarge
string
```

**sidebar**


      If specified, a sidebar element. Use 'Columns.SidebarToggleButton'
      to control whether the sidebar is shown in small responsive contexts.
      Use 'Columns.SidebarCloseButton' to close the sidebar in small
      responsive contexts.
      

```
node
```

**size**


      The uniform minimum width of columns. Children will wrap as needed.
    

```
xsmall
small
medium
large
xlarge
string
```

**width**

Maximum width of the content when 'center' is true.

```
{
  max: 
    xsmall
    small
    medium
    large
    xlarge
    string
}
```
  
## Intrinsic element

```
div
```