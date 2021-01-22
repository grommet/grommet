## Pagination
A control that enables selection of a single page from a 
      range of pages.

[![](https://cdn-images-1.medium.com/fit/c/120/120/1*TD1P0HtIH9zF0UEH28zYtw.png)](https://storybook.grommet.io/?selectedKind=undefined-Pagination&full=0&stories=1&panelRight=0) [![](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/grommet/grommet-sandbox?initialpath=/pagination&module=%2Fsrc%2FPagination.js)
## Usage

```javascript
import { Pagination } from 'grommet';
      <Pagination />
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

**numberEdgePages**

The number of page buttons visible at the start and end of page 
        range. Defaults to `1`.

```
number
```

**numberItems**

The number of items to paginate.

```
number
```

**numberMiddlePages**

The number of page buttons visible in the middle of the controls. Defaults to `3`.

```
number
```

**onChange**

Function that will be called when the user clicks a page or 
        arrow button. The single argument is an event containing the latest 
        page via `event.page`, and the startIndex and endIndex for data on 
        this page via `event.startIndex` and `event.endIndex`, 
        respectively.

```
function
```

**page**

The default page. If used with onChange, it can be used to control the 
        active page via state.

```
number
```

**size**

Specifies what size the pagination control buttons should be. Defaults to `medium`.

```
small
medium
large
```

**step**

The number of items per page. Defaults to `10`.

```
number
```
  
## Intrinsic element

```
nav
```
## Theme
  
**pagination**

The possible sizes of the Pagination in terms of its 
      max-width, font-size and line-height. Expects `object`.

Defaults to

```
{
      small: {
        size: '14px',
        height: '20px',
        maxWidth: '336px',
       },
      medium: {
        size: '18px',
        height: '24px',
        maxWidth: '432px',
      },
      large: {
        size: '22px',
        height: '28px',
        maxWidth: '528px',
      },
      xlarge: {
        size: '26px',
        height: '32px',
        maxWidth: '624px',
      },
      xxlarge: {
        size: '34px',
        height: '40px',
        maxWidth: '816px',
      },
    }
```

**pagination.extend**

Any additional style for the Pagination. Expects `string | (props) => {}`.

Defaults to

```
undefined
```

**global.edgeSize**

The possible sizes for margin. Expects `object`.

Defaults to

```
{
    edgeSize: {
      none: '0px',
      hair: '1px',
      xxsmall: '3px',
      xsmall: '6px',
      small: '12px',
      medium: '24px',
      large: '48px',
      xlarge: '96px',
      responsiveBreakpoint: 'small',
    },
  }
```
