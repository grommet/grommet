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

**component**

The component to insert in the FormField. Grommet will add update the form values when this field changes. Any additional properties (such as initial value) you pass to FormField will be forwarded to this component. The component may be custom as long it supports the proporties of name, value, onChange (event => {}), while event has either event.value or event.target.value.  

```
function
object
```

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

Validation rule when used within a grommet Form. Provide a regular
      expression or a function. If a
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
## Theme
  
**formField.border.color**

The border color. Expects `string | { 'dark': string, 'light': string }`.

Defaults to

```
border
```

**formField.border.error.color**

The border color of the error. Expects `string | {'dark': string, 'light': string}`.

Defaults to

```
{ dark: 'white', light: 'status-critical' },
```

**formField.border.position**

The border position. Expects `string`.

Defaults to

```
inner
```

**formField.border.side**

The border side of the FormField. Expects `string`.

Defaults to

```
bottom
```

**formField.content.pad**

The pad of the FormField content. Expects `object`.

Defaults to

```
{ horizontal: 'small', bottom: 'small' }
```

**formField.error.color**

The color of the FormField error. Expects `string | {'dark': string, 'light': string}`.

Defaults to

```
{ dark: 'status-critical', light: 'status-critical' }
```

**formField.error.margin**

The margin used for the FormField error. Expects `string | object`.

Defaults to

```
{ vertical: 'xsmall', horizontal: 'small' }
```

**formField.extend**

Any additional style for FormField. Expects `string | (props) => {}`.

Defaults to

```
undefined
```

**formField.help.color**

The color of the FormField help. Expects `string | {'dark': string, 'light': string}`.

Defaults to

```
{ dark: 'dark-3', light: 'dark-3' }
```

**formField.help.margin**

The margin for the FormField help. Expects `string | object`.

Defaults to

```
{ left: 'small' }
```

**formField.label.margin**

The margin for the FormField label. Expects `string | object`.

Defaults to

```
{ vertical: 'xsmall', horizontal: 'small' }
```

**formField.margin**

The margin of FormField. Expects `string | object`.

Defaults to

```
{ bottom: 'small' }
```

**global.borderSize**

The possible border sizes for FormField. Expects `object`.

Defaults to

```
{
  xsmall: '1px',
  small: '2px',
  medium: '4px',
  large: '12px',
  xlarge: '24px,
}
```
