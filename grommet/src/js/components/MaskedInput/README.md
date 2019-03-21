## MaskedInput
An input field with formalized syntax.

[![](https://cdn-images-1.medium.com/fit/c/120/120/1*TD1P0HtIH9zF0UEH28zYtw.png)](https://storybook.grommet.io/?selectedKind=MaskedInput&full=0&addons=0&stories=1&panelRight=0) [![](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/grommet/grommet-sandbox?initialpath=maskedinput&module=%2Fsrc%2FMaskedInput.js)
## Usage

```javascript
import { MaskedInput } from 'grommet';
<MaskedInput id='item' name='item' />
```

## Properties

**id**

The id attribute of the input.

```
string
```

**name**

The name attribute of the input.

```
string
```

**onChange**

Function that will be called when the user types or pastes text.

```
function
```

**onBlur**

Function that will be called when the user leaves the field.

```
function
```

**mask**

Describes the structure of the mask. If a regexp is provided, it should
      allow both the final full string element as well as partial strings
      as the user types characters one by one. Defaults to `[]`.

```
[{
  length: 
    number
    [number],
  fixed: string,
  options: [string],
  regexp: 
    {

    }
}]
```

**size**

The size of the text.

```
small
medium
large
xlarge
string
```

**value**

What text to put in the input. The caller should ensure that it
      is initially valid with respect to the mask.

```
string
```
  
## Intrinsic element

```
input
```
## Theme
  
**maskedInput.extend**

Any additional style for MaskedInput. Expects `string | (props) => {}`.

Defaults to

```
undefined
```

**text.medium**

The size of the text for MaskedInput. Expects `string`.

Defaults to

```
18px
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
