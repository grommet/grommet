## TextInput
A text input field with optional suggestions.

[![](https://cdn-images-1.medium.com/fit/c/120/120/1*TD1P0HtIH9zF0UEH28zYtw.png)](https://storybook.grommet.io/?selectedKind=TextInput&full=0&addons=0&stories=1&panelRight=0) [![](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/grommet/grommet-sandbox?initialpath=textinput&module=%2Fsrc%2FTextInput.js)
## Usage

```javascript
import { TextInput } from 'grommet';
<TextInput id='item' name='item' />
```

## Properties

**dropAlign**

How to align the drop. Defaults to `{
  "top": "top",
  "left": "left"
}`.

```
{
  top: 
    top
    bottom,
  bottom: 
    top
    bottom,
  right: 
    left
    right,
  left: 
    left
    right
}
```

**dropTarget**

Target where any suggestions drop will be aligned to. This should be
      a React reference. Typically, this is not required as the drop will be
      aligned to the TextInput itself by default.

```
object
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

**messages**

Custom messages for TextInput. Used for accessibility by screen readers. Defaults to `{
  "enterSelect": "(Press Enter to Select)",
  "suggestionsCount": "suggestions available",
  "suggestionsExist": "This input has suggestions use arrow keys to navigate",
  "suggestionIsOpen": "Suggestions drop is open, continue to use arrow keys to navigate"
}`.

```
{
  enterSelect: string,
  suggestionsCount: string,
  suggestionsExist: string,
  suggestionIsOpen: string
}
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

**onSelect**

Function that will be called when the user selects a suggestion.
The suggestion contains the object chosen from the supplied suggestions.

```
function
```

**onSuggestionsOpen**

Function that will be called when the suggestions drop is opened.

```
function
```

**onSuggestionsClose**

Function that will be called when the suggestions drop is closed.

```
function
```

**placeholder**

Placeholder to use when no value is provided.

```
string
node
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
string
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
  