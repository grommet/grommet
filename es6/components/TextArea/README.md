## TextArea
A control to input multiple lines of text.

[![](https://cdn-images-1.medium.com/fit/c/120/120/1*TD1P0HtIH9zF0UEH28zYtw.png)](https://storybook.grommet.io/?selectedKind=TextArea&full=0&addons=0&stories=1&panelRight=0) [![](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/grommet/grommet-sandbox?initialpath=textarea&module=%2Fsrc%2FTextArea.js)
## Usage

```javascript
import { TextArea } from 'grommet';
<TextArea id='item' name='item' />
```

## Properties

**id**

The id attribute of the textarea.

```
string
```

**fill**

Whether the width and height should fill the container.

```
boolean
```

**focusIndicator**

Whether the plain textarea should receive a focus outline.

```
boolean
```

**name**

The name attribute of the textarea.

```
string
```

**onChange**

Function that will be called when the user types in the textarea.

```
function
```

**placeholder**

Placeholder text to use when no value is provided.

```
string
```

**plain**

Whether this is a plain textarea with no border or padding.
Only use this when the containing context provides sufficient affordance.

```
boolean
```

**value**

What text to put in the textarea.

```
string
```

**resize**

Whether user is allowed to resize the textarea. Defaults to `true`.

```
vertical
horizontal
boolean
```
  
## Intrinsic element

```
textarea
```
## Theme
  
**global.colors.border**

The color of the border. Expects `string | { dark: string, light: string }`.

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

**textArea.extend**

Any additional style for Text. Expects `string | (props) => {}`.

Defaults to

```
undefined
```

**textArea.disabled.opacity**

The opacity when the textArea is disabled. Expects `number`.

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

**global.control.disabled.opacity**

The opacity when a component is disabled. Expects `number`.

Defaults to

```
0.3
```
