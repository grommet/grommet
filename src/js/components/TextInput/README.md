## TextInput
A text input field with optional suggestions.

[![](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/grommet/grommet-site?initialpath=textinput&amp;module=%2Fscreens%2FTextInput.js)
## Usage

```javascript
import { TextInput } from 'grommet';
<TextInput id='item' name='item' />
```

## Properties

**defaultValue**

What text to start with in the input.

```
string
```

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

**onInput**

Function that will be called when the user types in the input.

```
function
```

**onSelect**

Function that will be called when the user selects a suggestion.
The suggestion contains the object chosen from the supplied suggestions.

```
function
```

**placeholder**

Placeholder text to use when no value is provided.

```
string
```

**plain**

Whether this is a plain input with no border or padding.
Only use this when the containing context provides sufficient affordance

```
boolean
```

**size**

The size of the TextInput.

```
small
medium
large
xlarge
```

**suggestions**

Suggestions to show. It is recommended to avoid showing too many
suggestions and instead rely on the user to type more.

```
[
  {
    label: node,
    value: any
  }
  string
]
```

**value**

What text to put in the input.

```
string
```
  