## RadioButtonGroup
A group of radio buttons.

[![](https://cdn-images-1.medium.com/fit/c/120/120/1*TD1P0HtIH9zF0UEH28zYtw.png)](https://storybook.grommet.io/?selectedKind=RadioButtonGroup&full=0&addons=0&stories=1&panelRight=0) [![](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/grommet/grommet-sandbox?initialpath=radiobuttongroup&module=%2Fsrc%2FRadioButtonGroup.js)
## Usage

```javascript
import { RadioButtonGroup } from 'grommet';
<RadioButtonGroup />
```

## Properties

**name**

Required. The DOM name attribute value to use for the underlying <input/> elements.

```
string
```

**onChange**

Function that will be called when the user clicks on of the radio
      buttons. It will be passed a React event object.

```
function
```

**options**

Required. Options can be either a string or an object.

```
[string]
[{
  disabled: boolean,
  id: string,
  label: 
    string
    element,
  value: string
}]
```

**value**

Currently selected option value.

```
string
```
  
## Intrinsic element

```
div
```