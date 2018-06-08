## Select
An select-like field with optional search capability.

[![](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/grommet/grommet-sandbox?initialpath=select&module=%2Fsrc%2FSelect.js)
## Usage

```javascript
import { Select } from 'grommet';
<Select />
```

## Properties

**a11yTitle**

Custom title to be used by screen readers.

```
string
```

**children**

Function that will be called when each option is rendered.

```
function
```

**disabled**

Whether the select should be disabled.

```
boolean
```

**dropAlign**

How to align the drop. Defaults to `{
  "top": "top",
  "left": "left"
}`.

```
{
  top: 
    top
    bottom,
  bottom: 
    top
    bottom,
  right: 
    left
    right,
  left: 
    left
    right
}
```

**dropBackground**

Background color

```
string
{
  color: string,
  opacity: 
    weak
    medium
    strong
    boolean
}
```

**dropTarget**

Target where the options drop will be aligned to. This should be
      a React reference. Typically, this is not required as the drop will be
      aligned to the Select itself by default.

```
object
```

**focusIndicator**

Whether when 'plain' it should receive a focus outline.

```
boolean
```

**messages**

Custom messages.

```
{
  multiple: string
}
```

**multiple**

Whether to allow multiple options to be selected.

```
boolean
```

**onChange**

Function that will be called when the user selects an option.

```
function
```

**onClose**

Function that will be called when the Select drop closes.

```
function
```

**onSearch**

Function that will be called when the user types in the search input.
      If this property is not provided, no search field will be rendered.

```
function
```

**options**

Required. Options can be either a string or an object. If an object is used, use
      children callback in order to render anything based on the current item.

```
[
  string
  element
  object
]
```

**placeholder**

Placeholder text to use when no value is provided.

```
string
node
```

**plain**

Whether this is a plain Select input with no border or padding.

```
boolean
```

**searchPlaceholder**

Placeholder text to use in the search box when the search input is empty.

```
string
```

**selected**

Index of the currently selected option. When multiple, the set of
      options selected. This property is required when multiple.

```
number
[number]
```

**size**

The size of the select.

```
small
medium
large
xlarge
```

**value**

Currently selected value. This can be an array
      when multiple. Passing an element allows the caller to control how
      the value is rendered.

```
string
element
object
[
  string
  object
]
```
  