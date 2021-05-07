## undefined

      Responsive single or multiple column layout.
      Control visibity of children via <Columns.ControlButton child={0} />.
    

[![](https://cdn-images-1.medium.com/fit/c/120/120/1*TD1P0HtIH9zF0UEH28zYtw.png)](https://storybook.grommet.io/?selectedKind=Layout-Columns&full=0&stories=1&panelRight=0) [![](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/grommet/grommet-sandbox?initialpath=/columns&module=%2Fsrc%2FColumns.js)
## Usage

```javascript
import { Columns } from 'grommet';
<Columns />
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

**columns**


      How each child should be handled.
      'hide'
        true - indicates that the child should be hidden on initial render
        false - indicates that the child shouldn't be hideable,
      'layer' indicates that the child should be shown in a layer.
      'width' indicates that the child should have a fixed width.
      'responsive' indicates how the child should behave when the responsive
      size is small.
      Control visibility of children via <Columns.ControlButton child={0} />.
    

```
[{
  hide: boolean,
  layer: boolean,
  responsive: 
    {
      hide: boolean,
      layer: boolean
    },
  width: 
    xsmall
    small
    medium
    large
    xlarge
    string
}]
```

**width**

Maximum width of the content.

```
xsmall
small
medium
large
xlarge
string
```
  
## Intrinsic element

```
div
```