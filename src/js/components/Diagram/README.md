## Diagram
Graphical connection lines. Diagram is meant to be used with Stack.
      Boxes can be used in the `guidingChild` layer of Stack and then
      Diagram can be used to draw lines connecting the Boxes.

[![](https://cdn-images-1.medium.com/fit/c/120/120/1*TD1P0HtIH9zF0UEH28zYtw.png)](https://storybook.grommet.io/?selectedKind=Diagram&full=0&addons=0&stories=1&panelRight=0) [![](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/grommet/grommet-sandbox?initialpath=/diagram&module=%2Fsrc%2FDiagram.js)
## Usage

```javascript
import { Diagram } from 'grommet';
<Diagram />
```

## Properties

**connections**

Required. Array of objects describing the connections.
      The 'fromTarget' and 'toTarget' may be either DOM element ids or
      React references.
      'offset' can be used to shift a bit to reduce the amount of overlap
      with other connection lines to make the lines easier to distinguish. Defaults to `[]`.

```
[{
  anchor: 
    center
    vertical
    horizontal,
  color: 
    string
    {
      dark: string,
      light: string
    },
  fromTarget: 
    string
    object,
  label: string,
  offset: 
    xsmall
    small
    medium
    large
    string,
  thickness: 
    hair
    xxsmall
    xsmall
    small
    medium
    large
    string,
  toTarget: 
    string
    object,
  type: 
    direct
    curved
    rectilinear
}]
```
  
## Intrinsic element

```
svg
```
## Theme
  
**diagram.extend**

Any additional style for Diagram. Expects `string | (props) => {}`.

Defaults to

```
undefined
```

**diagram.line.color**

The color of the connection line. Expects `string | {dark: string, light: string}`.

Defaults to

```
accent-1
```

**global.colors**

Color options. Expects `object`.

Defaults to

```
{
      "accent-1": "#6FFFB0",
      "graph-0": "accent-1",
      "graph-1": "neutral-1",
      ...
    }
```

**global.edgeSize**

The possible sizes for the connections thickness and offset. Expects `object`.

Defaults to

```
{
        none: '0px',
        hair: '1px',
        xxsmall: '3px',
        xsmall: '6px',
        small: '12px',
        medium: '24px',
        large: '48px',
        xlarge: '96px',
        responsiveBreakpoint: 'small',
    }
```
