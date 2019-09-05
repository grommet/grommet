## Stack
A container that stacks contents on top of each other. One child is
      designated as the `guidingChild` which determines the size. All
      other children are placed within that size, either above or below
      based on their order. Stack is typically used to decorate Meter, Chart,
      or icons.

[![](https://cdn-images-1.medium.com/fit/c/120/120/1*TD1P0HtIH9zF0UEH28zYtw.png)](https://storybook.grommet.io/?selectedKind=Stack&full=0&addons=0&stories=1&panelRight=0) [![](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/grommet/grommet-sandbox?initialpath=stack&module=%2Fsrc%2FStack.js)
## Usage

```javascript
import { Stack } from 'grommet';
<Stack />
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

**anchor**

Where to anchor children from. If not specified, children
      fill the guiding child's area.

```
center
left
right
top
bottom
top-left
bottom-left
top-right
bottom-right
```

**fill**

Whether to expand to fill
      all of the available width and height in the parent container.

```
boolean
```

**guidingChild**

Which child to guide layout from. All other children
      will be positioned within that area. Defaults to 'first'. Defaults to `first`.

```
number
first
last
```

**interactiveChild**

Which child to restrict user interaction to. All other children
      will have user interaction disabled.

```
number
first
last
```
  
## Intrinsic element

```
div
```
## Theme
  
**stack.extend**

Any additional style for the control of the Stack component. Expects `string | (props) => {}`.

Defaults to

```
undefined
```
