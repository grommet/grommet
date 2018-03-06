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
      The 'fromTarget' and 'toTarget' may be either DOM element ids or
      React references.
      'offset' can be used to shift a bit to reduce the amount of overlap
      with other connection lines to make the lines easier to distinguish.

```
[{
  color: string,
  fromTarget: 
    string
    object,
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
  toTarget: 
    string
    object,
  type: 
    direct
    curved
    rectilinear
}]
```
  