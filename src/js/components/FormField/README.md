## FormField
A single field in a form. FormField wraps an input component with
      a label, help, and/or error messaging. It typically contains an input
      control like TextInput, TextArea, Select, etc.

[![](https://cdn-images-1.medium.com/fit/c/120/120/1*TD1P0HtIH9zF0UEH28zYtw.png)](https://storybook.grommet.io/?selectedKind=FormField&full=0&addons=0&stories=1&panelRight=0) [![](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/grommet/grommet-sandbox?initialpath=formfield&module=%2Fsrc%2FFormField.js)
## Usage

```javascript
import { FormField } from 'grommet';
<FormField />
```

## Properties

**error**

Any error text describing issues with the field

```
string
node
```

**help**

Any help text describing how the field works

```
string
node
```

**htmlFor**

The id of the input element contained in this field

```
string
```

**label**

A short label describing the field

```
string
node
```

**name**

The name of the value data when in a Form and the name of
      the input field.

```
string
```

**pad**

Whether to add padding to align with the padding of TextInput.

```
boolean
```

**required**

Whether the field is required.

```
boolean
```

**validate**

Validation rule. Provide a regular expression or a function. If a
      function is provided, it will be called with two arguments, the value
      for this field and the entire value object. This permits validation to
      encompass multiple fields. The function should return a string message
      describing the validation issue, if any.

```
{
  regexp: object,
  message: string
}
function
```
  
## Intrinsic element

```
div
```