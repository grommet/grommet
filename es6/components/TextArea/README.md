## TextArea
A textarea.

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
true
false
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
  