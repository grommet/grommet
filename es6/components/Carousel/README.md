## Carousel
A carousel that cycles through children. Child components
      would typically be Images. It is the caller's responsibility to ensure
      that all children are the same size.

[![](https://cdn-images-1.medium.com/fit/c/120/120/1*TD1P0HtIH9zF0UEH28zYtw.png)](https://storybook.grommet.io/?selectedKind=Carousel&full=0&addons=0&stories=1&panelRight=0) [![](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/grommet/grommet-sandbox?initialpath=carousel&module=%2Fsrc%2FCarousel.js)
## Usage

```javascript
import { Carousel } from 'grommet';
<Carousel />
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

**fill**

Whether to expand to fill
      all of the available width and height in the parent container.

```
boolean
```

**play**

If specified, the number of
      milliseconds between automatically transitioning to the next child. It
      will loop through all children indefinitely.

```
number
```
  
## Intrinsic element

```
div
```
## Theme
  
**carousel.icons.next**

The icon to use for the next image navigation control. Expects `element`.

Defaults to

```
<Next />
```

**carousel.icons.previous**

The icon to use for the previous image navigation control. Expects `element`.

Defaults to

```
<Previous />
```

**carousel.icons.current**

The icon to use on the middle navigation control. One icon per carousel image. Expects `element`.

Defaults to

```
<Next />
```

**carousel.icons.color**

The color used for Carousel icons. Expects `string`.

Defaults to

```
undefined
```

**global.colors.icon**

The color used for Carousel icons. Expects `object`.

Defaults to

```
[object Object]
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
