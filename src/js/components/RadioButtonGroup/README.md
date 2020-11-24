## RadioButtonGroup
A group of radio buttons.

[![](https://cdn-images-1.medium.com/fit/c/120/120/1*TD1P0HtIH9zF0UEH28zYtw.png)](https://storybook.grommet.io/?selectedKind=Input-RadioButtonGroup&full=0&stories=1&panelRight=0) [![](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/grommet/grommet-sandbox?initialpath=/radiobuttongroup&module=%2Fsrc%2FRadioButtonGroup.js)
## Usage

```javascript
import { RadioButtonGroup } from 'grommet';
<RadioButtonGroup />
```

## Properties

**children**

Function that will be called to render the visual representation.
      It will be passed an object indicating whether the button is checked. It
      should return a react element.
      For example:
      `children={(option, { checked }) => <Box ...>{...}</Box>}`
      

```
function
```

**disabled**

Disables all options.

```
boolean
```

**name**

Required. The DOM name attribute value to use for the underlying <input/> 
      elements.

```
string
```

**onChange**

Function that will be called when the user clicks on one of the radio
      buttons. It will be passed a React event object.

```
function
```

**options**

Required. Options can be either a string, boolean, number 
      or an object. Each option is rendered as a single RadioButton.

```
[string]
[number]
[boolean]
[{
  disabled: boolean,
  id: string,
  label: 
    string
    element,
  value: 
    string
    number
    boolean
}]
```

**value**

Currently selected option value.

```
string
number
boolean
object
```
  
## Intrinsic element

```
div
```
## Theme
  
**radioButtonGroup.container**

Any valid Box props for the RadioButtonGroup container. Expects `object`.

Defaults to

```
undefined
```
