## MaskedInput
An input field with formalized syntax.

[![](https://cdn-images-1.medium.com/fit/c/120/120/1*TD1P0HtIH9zF0UEH28zYtw.png)](https://storybook.grommet.io/?selectedKind=Input-MaskedInput&full=0&stories=1&panelRight=0) [![](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/grommet/grommet-sandbox?initialpath=/maskedinput&module=%2Fsrc%2FMaskedInput.js)
## Usage

```javascript
import { MaskedInput } from 'grommet';
<MaskedInput id='item' name='item' />
```

## Properties

**a11yTitle**

Custom title to be used by screen readers.

```
string
```

**dropHeight**

The height of the drop container.

```
xsmall
small
medium
large
xlarge
string
```

**dropProps**

Any valid Drop prop.

```
object
```

**icon**

An optional icon to show. This could be used to provide an
      indication of what kind of input is expected, like an email icon,
      or what the input will be used for, like a search icon.

```
element
```

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
      as the user types characters one by one. When using regexp to match number
      values make sure that the option values are numbers as well.

```
[{
  length: 
    number
    [number],
  fixed: string,
  options: [
  string
  number
],
  regexp: 
    {

    }
}]
```

**reverse**

Whether an icon should be reversed so that the icon is at the
      end of the input.

```
boolean
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
number
```
  
## Intrinsic element

```
input
```
## Theme
  
**global.hover.background**

The background style when hovering. Expects `string | { color: string, opacity: string }`.

Defaults to

```
{ color: 'active', opacity: 'medium' }
```

**global.hover.color**

The text color when hovering. Expects `string | { dark: string, light: string }`.

Defaults to

```
{ dark: 'white', light: 'black' }
```

**maskedInput.extend**

Any additional style for MaskedInput. Expects `string | (props) => {}`.

Defaults to

```
undefined
```

**maskedInput.container.extend**

Any additional style for the container surrounding the input 
    and, if present, icon. Expects `string | (props) => {}`.

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

**maskedInput.disabled.opacity**

The opacity when the MaskedInput is disabled. Expects `number | string`.

Defaults to

```
undefined
```

**global.control.disabled.opacity**

The opacity when a component is disabled. Expects `number`.

Defaults to

```
0.3
```

**global.focus.border.color**

The border color of the component when in focus. Expects `string | { dark: string, light: string }`.

Defaults to

```
focus
```

**global.focus.outline.color**

The outline color around the component when in focus. Expects `string | { dark: string, light: string }`.

Defaults to

```
undefined
```

**global.focus.outline.size**

The size of the outline around the component when in focus. Expects `string`.

Defaults to

```
undefined
```

**global.focus.shadow.color**

The shadow color around the component when in focus. Expects `string | { dark: string, light: string }`.

Defaults to

```
focus
```

**global.focus.shadow.size**

The size of the shadow around the component when in focus. Expects `string`.

Defaults to

```
2px
```

**global.colors.placeholder**

The placeholder color used for the component. Expects `string`.

Defaults to

```
#AAAAAA
```

**global.input.font.height**

The line-height of the text. Expects `string`.

Defaults to

```
undefined
```

**global.input.font.size**

The size of the text. Expects `string`.

Defaults to

```
undefined
```

**global.input.font.weight**

The font-weight of the text. This value will only be 
      applied if global.input.weight is undefined. Expects `number | string`.

Defaults to

```
600
```

**global.input.weight**

This value has been deprecated and replaced by 
      global.input.font.weight. Expects `number | string`.

Defaults to

```
undefined
```

**global.input.padding**

The padding of the text. Expects `string | { top: string, bottom: string, left: string, right: 
        string, horizontal: string, vertical: string }`.

Defaults to

```
12px
```

**global.input.extend**

Any additional style for an input. Expects `string | (props) => {}`.

Defaults to

```
undefined
```
