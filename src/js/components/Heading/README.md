## Heading
Heading text structured in levels.

[![](https://cdn-images-1.medium.com/fit/c/120/120/1*TD1P0HtIH9zF0UEH28zYtw.png)](https://storybook.grommet.io/?selectedKind=Type-Heading&full=0&stories=1&panelRight=0) [![](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/grommet/grommet-sandbox?initialpath=/heading&module=%2Fsrc%2FHeading.js)
## Usage

```javascript
import { Heading } from 'grommet';
<Heading />
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

**color**

A color identifier to use for the text color.

```
string
{
  dark: string,
  light: string
}
```

**fill**

Whether the width should fill the container.

```
boolean
```

**level**

The heading level. It corresponds to the number after the 'H' for
the DOM tag. Set the level for semantic accuracy and accessibility.
The sizing can be further adjusted using the size property. Defaults to `1`.

```
1
2
3
4
5
6
1
2
3
4
5
6
```

**responsive**

Whether the font size should be scaled for
      mobile environments. Defaults to `true`.

```
boolean
```

**size**

The font size is primarily driven by the chosen tag. But, it can
be adjusted via this size property. The tag should be set for semantic
correctness and accessibility. This size property allows for stylistic
adjustments. Defaults to `medium`.

```
small
medium
large
xlarge
string
```

**textAlign**

How to align the text inside the heading. Defaults to `start`.

```
start
center
end
```

**truncate**

Restrict the text to a single line and truncate with ellipsis if it
is too long to all fit.

```
boolean
```
  
## Intrinsic element

```
h1,h2,h3,h4
```
## Theme
  
**global.breakpoints**

The possible breakpoints that could affect font-size and max-width Expects `object`.

Defaults to

```
{
    small: {
      value: '768px',
      borderSize: {
        xsmall: '1px',
        small: '2px',
        medium: '4px',
        large: '6px',
        xlarge: '12px',
      },
      edgeSize: {
        none: '0px',
        hair: '1px',
        xxsmall: '2px',
        xsmall: '3px',
        small: '6px',
        medium: '12px',
        large: '24px',
        xlarge: '48px',
      },
      size: {
        xxsmall: '24px',
        xsmall: '48px',
        small: '96px',
        medium: '192px',
        large: '384px',
        xlarge: '768px',
        full: '100%',
      },
    },
    medium: {
      value: '1536px',
    },
    large: {},
  }
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

**heading.extend**

Any additional style for Heading. Expects `string | (props) => {}`.

Defaults to

```
undefined
```

**heading.level**

The level that impacts line-height, max-width, font size,
weight and family of the Heading. Heading styling is automatically adjusted at
different screen sizes. When the heading.responsiveBreakpoint is hit ("small"
by default), all heading styles will automatically be adjusted. A heading of
level 1, for example, will use the styling defined in heading level 2; a
heading of level 2 will use the styling defined in heading level 3 and so
forth. The tag in the DOM is not adjusted. A heading of level 1 remains an h1.
The styling adjustment is intended to aid readability on smaller screens but
will not semantically affect your application structure. If you do not want
this responsive styling to occur, you can set header.responsiveBreakpoint to
undefined. Expects `object`.

Defaults to

```

      1: {
        medium: {
          size: 34px,
          height: 40px,
          width: 826px,
        },
      },
      weight: 600,
      font:
        {
          family: undefined,
        }
```

**heading.weight**

Default heading weight used unless a per level heading is defined. Expects `number`.

Defaults to

```
600
```

**heading.font**

Default heading font used unless a per level heading is defined. Expects `object`.

Defaults to

```
undefined
```

**heading.responsiveBreakpoint**

The breakpoint to trigger changes in the Heading layout.
The actual values will be derived from global.breakpoints. Expects `string`.

Defaults to

```
small
```
