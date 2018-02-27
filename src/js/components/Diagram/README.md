## Diagram
Graphical lines between DOM elements.
      Diagram is meant to be used with Stack.

[![](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/grommet/grommet-sandbox?initialpath=diagram&module=%2Fsrc%2FDiagram.js)
## Usage

```javascript
import { Diagram } from 'grommet';
<Diagram />
```

## Properties

**connections**

Required. Array of objects describing the connections.
      The 'fromId' and 'toId' must be DOM element ids.
      'offset' can be used to shift a bit to reduce the amount of overlap
      with other connection lines

```
[{
  color: string,
  fromId: string,
  label: string,
  offset: 
    xsmall
    small
    medium
    large,
  thickness: 
    xsmall
    small
    medium
    large,
  toId: string,
  type: 
    direct
    curved
    rectilinear
}]
```
  