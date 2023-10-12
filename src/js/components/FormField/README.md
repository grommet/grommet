## FormField
A single field in a form. FormField wraps an input component with
      a label, help, and/or error messaging. It typically contains an input
      control like TextInput, TextArea, Select, etc.

[![](https://cdn-images-1.medium.com/fit/c/120/120/1*TD1P0HtIH9zF0UEH28zYtw.png)](https://storybook.grommet.io/?selectedKind=Input-FormField&full=0&stories=1&panelRight=0) [![](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/grommet/grommet-sandbox?initialpath=/formfield&module=%2Fsrc%2FFormField.js)
## Usage

```javascript
import { FormField } from 'grommet';
<FormField />
```

## Properties

**a11yTitle**

Custom label to be used by screen readers.
       Should only be provided if FormField has no children.
       When a11yTitle is provided an aria-label will be added to the element
       if it has no children.

```
string
```

**component**

The component to insert in the FormField. Grommet will add update the
      form values when this field changes. Any additional properties
      (such as initial value) you pass to FormField will be forwarded to this
      component. The component may be custom as long it supports the properties
      of name, value, onChange (event => {}), while event has either event.value
      or event.target.value.

```
function
object
```

**contentProps**

Any valid Box property. These
     properties are applied to the FormField contents container and will
     override properties from the theme.

```
object
```

**disabled**

Whether the field should look disabled.

```
boolean
```

**error**

Any error text describing issues with the field's value

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

**info**

Any informational text regarding the field's value

```
string
node
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

**margin**

The amount of margin around the component. An object can
    be specified to distinguish horizontal margin, vertical margin, and
    margin on a particular side.

```
none
xxsmall
xsmall
small
medium
large
xlarge
{
  bottom: 
    xxsmall
    xsmall
    small
    medium
    large
    xlarge
    string,
  end: 
    xxsmall
    xsmall
    small
    medium
    large
    xlarge
    string,
  horizontal: 
    xxsmall
    xsmall
    small
    medium
    large
    xlarge
    string,
  left: 
    xxsmall
    xsmall
    small
    medium
    large
    xlarge
    string,
  right: 
    xxsmall
    xsmall
    small
    medium
    large
    xlarge
    string,
  start: 
    xxsmall
    xsmall
    small
    medium
    large
    xlarge
    string,
  top: 
    xxsmall
    xsmall
    small
    medium
    large
    xlarge
    string,
  vertical: 
    xxsmall
    xsmall
    small
    medium
    large
    xlarge
    string
}
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

Validation rule when used within a grommet Form. Provide an object
      with a regular expression, a function, or an array of these. If a
      function is provided, it will be called with two arguments, the value
      for this field and the entire value object. This permits validation to
      encompass multiple fields. The function should return a string message
      describing the validation issue, if any, or an object with 'message'
      and 'status' properties.

```
{
  regexp: new RegExp(...),
  message: 
    string
    node,
  status: 
    error
    info
}
function
[
  {
    regexp: new RegExp(...),
    message: 
      string
      node,
    status: 
      error
      info
  }
  function
]
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

The border color of the error. Deprecated, use 
    error.border.color instead. Expects `string | {'dark': string, 'light': string}`.

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

**formField.content.margin**

The margin of the FormField content. Expects `object`.

Defaults to

```
undefined
```

**formField.content.pad**

The pad of the FormField content. Expects `object`.

Defaults to

```
small
```

**formField.disabled.background.color**

The color of the FormField background when it is disabled. Expects `string | {'dark': string, 'light': string}`.

Defaults to

```
undefined
```

**formField.disabled.background.opacity**

The opacity of the FormField background when it is disabled. Expects `string | boolean | number`.

Defaults to

```
undefined
```

**formField.disabled.border.color**

The color of the FormField border when it is disabled. Expects `string | {'dark': string, 'light': string}`.

Defaults to

```
undefined
```

**formField.disabled.label.color**

The color of the FormField label when it is disabled. Expects `string | {'dark': string, 'light': string}`.

Defaults to

```
undefined
```

**formField.error.background.color**

The color of the FormField background when there is an error. Expects `string | {'dark': string, 'light': string}`.

Defaults to

```
undefined
```

**formField.error.background.opacity**

The opacity of the FormField background when there is an error. Expects `string | boolean | number`.

Defaults to

```
undefined
```

**formField.error.border.color**

The border color of the error. Expects `string | {'dark': string, 'light': string}`.

Defaults to

```
{ dark: 'white', light: 'status-critical' },
```

**formField.error.color**

The color of the FormField error. Expects `string | {'dark': string, 'light': string}`.

Defaults to

```
status-critical
```

**formField.error.container**

Any valid Box props for the container surrounding the error 
    message and icon. Expects `object`.

Defaults to

```
undefined
```

**formField.error.icon**

An icon placed in a row with the error message. Expects `React.Element`.

Defaults to

```
undefined
```

**formField.error.size**

The size of the error message to be displayed.
     The default size is medium. Expects `string`.

Defaults to

```
medium
```

**formField.error.size.xsmall**

The size of a 'xsmall' error message. Expects `string`.

Defaults to

```
12px
```

**formField.error.size.small**

The size of a 'small' error message. Expects `string`.

Defaults to

```
14px
```

**formField.error.size.medium**

The size of a 'medium' error message. Expects `string`.

Defaults to

```
18px
```

**formField.error.size.large**

The size of a 'large' error message. Expects `string`.

Defaults to

```
22px
```

**formField.error.size.xlarge**

The size of a 'xlarge' error message. Expects `string`.

Defaults to

```
26px
```

**formField.info.container**

Any valid Box props for the container surrounding the info 
    message and icon. Expects `object`.

Defaults to

```
undefined
```

**formField.info.icon**

An icon placed in a row with the info message. Expects `React.Element`.

Defaults to

```
undefined
```

**formField.error.margin**

The margin used for the FormField error. Expects `string | object`.

Defaults to

```
{ vertical: 'xsmall', horizontal: 'small' }
```

**formField.focus.background.color**

The color of the FormField background when it is in focus. Expects `string | {'dark': string, 'light': string}`.

Defaults to

```
undefined
```

**formField.focus.border.color**

The color of the FormField border when it is in focus. Expects `string | {'dark': string, 'light': string}`.

Defaults to

```
undefined
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

**formField.info.color**

The color of the FormField info. Expects `string | {'dark': string, 'light': string}`.

Defaults to

```
text-xweak
```

**formField.info.margin**

The margin used for the FormField info. Expects `string | object`.

Defaults to

```
{ vertical: 'xsmall', horizontal: 'small' }
```

**formField.label**

Any props of Text that will be applied on the FormField label. Expects `object`.

Defaults to

```
undefined
```

**formField.label.margin**

The margin for the FormField label. Expects `string | object`.

Defaults to

```
{ vertical: 'xsmall', horizontal: 'small' }
```

**formField.label.requiredIndicator**

Whether an asterisk (*) indicating that an input is required 
    should be displayed adjacent to the FormField's label. If providing a 
    custom element, for accessibility it is recommended that you include 
    an a11yTitle of "required" to assist screen readers. If using "true", the 
    a11yTitle is automatically applied. Expects `boolean | element | string`.

Defaults to

```
undefined
```

**formField.margin**

The margin of FormField. Expects `string | object`.

Defaults to

```
{ bottom: 'small' }
```

**formField.round**

The rounding of the FormField. Expects `boolean | string | object`.

Defaults to

```
undefined
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
