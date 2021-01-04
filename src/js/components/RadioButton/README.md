## RadioButton
A radio button control.

RadioButton should typically not be used directly.
      Instead, use RadioButtonGroup.

[![](https://cdn-images-1.medium.com/fit/c/120/120/1*TD1P0HtIH9zF0UEH28zYtw.png)](https://storybook.grommet.io/?selectedKind=Input-RadioButton&full=0&stories=1&panelRight=0) [![](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/grommet/grommet-sandbox?initialpath=/radiobutton&module=%2Fsrc%2FRadioButton.js)
## Usage

```javascript
import { RadioButton } from 'grommet';
<RadioButton />
```

## Properties

**a11yTitle**

Custom label to be used by screen readers.
      When provided, an aria-label will be added to the element.

```
string
```

**checked**

Same as React <input checked={} />

```
boolean
```

**children**

Function that will be called to render the visual representation.
      It will be passed an object indicating whether the button is checked. It
      should return a react element.
      For example:
      `children={({ checked }) => <Box ...>{...}</Box>}`
      

```
function
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

Required. The DOM name attribute value to use for the underlying <input/>
       element.

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
## Theme
  
**global.colors.control**

The default color of the border surrounding 
    the checked icon in RadioButton checked state. Expects `string | { dark: string, light: string }`.

Defaults to

```
{ dark: 'accent-1', light: 'brand'}
```

**radioButton.border.color**

The color of the border of the Radio Button. Expects `string | { dark: string, light: string }`.

Defaults to

```
{dark: 'rgba(255, 255, 255, 0.5), light: 'rgba(0, 0, 0, 0.15)}
```

**radioButton.border.width**

The width size of the border of the RadioButton. Expects `string`.

Defaults to

```
2px
```

**radioButton.check.background.color**

The background color of the checked icon in the RadioButton. Expects `string | {dark: string, light: string}`.

Defaults to

```
undefined
```

**radioButton.check.color**

The color of the checked icon in the RadioButton. Expects `string | { dark: string, light: string }`.

Defaults to

```
undefined
```

**radioButton.check.extend**

Any additional style for the checked RadioButton. Expects `string | (props) => {}`.

Defaults to

```
undefined
```

**radioButton.check.radius**

The border-radius of the RadioButton. Expects `string`.

Defaults to

```
100%
```

**radioButton.color**

The color of the border surrounding the checked 
    icon in RadioButton checked state. Expects `string | { dark: string, light: string }`.

Defaults to

```
undefined
```

**radioButton.container.extend**

Any additional style for the container around 
    the radio button and its label. Expects `string | (props) => {}`.

Defaults to

```
undefined
```

**radioButton.extend**

Any additional style for the radio button itself. Expects `string | (props) => {}`.

Defaults to

```
undefined
```

**radioButton.font.weight**

The font weight of the label. Expects `number | string`.

Defaults to

```
undefined
```

**radioButton.gap**

The gap between the label and the RadioButton itself. Expects `string`.

Defaults to

```
small
```

**radioButton.hover.background.color**

The background color of the Box surrounding the RadioButton
    when hovered over. Expects `string | { dark: string, light: string }`.

Defaults to

```
undefined
```

**radioButton.hover.border.color**

The color of the RadioButton border when hovered over. Expects `string | { dark: string, light: string }`.

Defaults to

```
{dark: white, light: black}
```

**radioButton.icon.extend**

Any additional style for the RadioButton icon. Expects `string | (props) => {}`.

Defaults to

```
undefined
```

**radioButton.icon.size**

The size of the icon in the RadioButton. Expects `string`.

Defaults to

```
undefined
```

**radioButton.icons.circle**

The icon to replace the inner checked circle. Expects `React.Element`.

Defaults to

```
undefined
```

**radioButton.size**

The size of the RadioButton. Expects `string`.

Defaults to

```
24px
```
