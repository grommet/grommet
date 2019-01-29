## RadioButton
A radio button control.

RadioButton should typically not be used directly.
      Instead, use RadioButtonGroup.

[![](https://cdn-images-1.medium.com/fit/c/120/120/1*TD1P0HtIH9zF0UEH28zYtw.png)](https://storybook.grommet.io/?selectedKind=RadioButton&full=0&addons=0&stories=1&panelRight=0) [![](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/grommet/grommet-sandbox?initialpath=radiobutton&module=%2Fsrc%2FRadioButton.js)
## Usage

```javascript
import { RadioButton } from 'grommet';
<RadioButton />
```

## Properties

**checked**

Same as React <input checked={} />

```
boolean
```

**disabled**

Same as React <input disabled={} />. Also adds a hidden input element
with the same name so form submissions work.

```
boolean
```

**id**

The DOM id attribute value to use for the underlying <input/> element.

```
string
```

**label**

Label text to place next to the control.

```
node
```

**name**

Required. The DOM name attribute value to use for the underlying <input/> element.

```
string
```

**onChange**

Function that will be called when the user clicks the radio button. It
      will be passed a React event object. The current state can be accessed
      via event.target.checked. Same as React <input onChange={} />.

```
function
```
  
## Intrinsic element

```
input
```