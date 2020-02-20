## NumberInput
A control to input a nnumbers

[![](https://cdn-images-1.medium.com/fit/c/120/120/1*TD1P0HtIH9zF0UEH28zYtw.png)](https://storybook.grommet.io/?selectedKind=NumberInput&full=0&addons=0&stories=1&panelRight=0) [![](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/grommet/grommet-sandbox?initialpath=numberinput&module=%2Fsrc%2FNumberInput.js)
## Usage

```javascript
import { NumberInput } from 'grommet';
      <NumberInput id='item' name='item' />
```

## Properties

**id**

The id attribute of the input.

```
string
```

**focusIndicator**

Whether the plain text input should receive a focus outline.

```
boolean
```

**name**

The name attribute of the input.

```
string
```

**onChange**

Function that will be called when the user types in the input.

```
function
```

**placeholder**

Placeholder to use when no value is provided.

```
node
```

**plain**

Whether this is a plain input with no border or padding.
Only use this when the containing context provides sufficient affordance

```
boolean
```

**size**

The size of the NumberInput.

```
small
medium
large
xlarge
string
```

**value**

What number to put in the input.

```
number
```
  
## Intrinsic element

```
input
```
## Theme
  
**global.colors.border**

The color of the border. Expects `object`.

Defaults to

```
[object Object]
```

**global.control.border.color**

The border color. Expects `string`.

Defaults to

```
border
```

**global.control.border.radius**

The border radius. Expects `string`.

Defaults to

```
4px
```

**global.control.border.width**

The border width. Expects `string`.

Defaults to

```
1px
```

**text**

The possible sizes of the text in terms of its font-size and
    line-height. Expects `object`.

Defaults to

```
{
      xsmall: {
        size: '12px',
        height: '18px',
       },
      small: {
        size: '14px',
        height: '20px',
       },
      medium: {
        size: '18px',
        height: '24px',
      },
      large: {
        size: '22px',
        height: '28px',
      },
      xlarge: {
        size: '26px',
        height: '32px',
      },
      xxlarge: {
        size: '34px',
        height: '40px',
      },
    }
```

**textInput.extend**

Any additional style for NumberInput. Expects `string | (props) => {}`.

Defaults to

```
undefined
```

**textInput.container.extend**

Any additional style for NumberInput container. Expects `string | (props) => {}`.

Defaults to

```
undefined
```

**textInput.placeholder.extend**

Any additional style for non-string placeholder inside NumberInput. Expects `string | (props) => {}`.

Defaults to

```
undefined
```

**textInput.disabled.opacity**

The opacity when the textInput is disabled. Expects `number`.

Defaults to

```
0.3
```

**global.focus.border.color**

The color around the component when in focus. Expects `string | { dark: string, light: string }`.

Defaults to

```
focus
```

**global.colors.placeholder**

The placeholder color used for the component. Expects `string`.

Defaults to

```
#AAAAAA
```

**global.control.disabled.opacity**

The opacity when a component is disabled. Expects `number`.

Defaults to

```
0.3
```

**global.input.weight**

The font weight of the text entered. Expects `number`.

Defaults to

```
600
```

**global.input.padding**

The padding of the text. Expects `string`.

Defaults to

```
12px
```
