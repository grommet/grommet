## Form
A form that manages state for its fields.

[![](https://cdn-images-1.medium.com/fit/c/120/120/1*TD1P0HtIH9zF0UEH28zYtw.png)](https://storybook.grommet.io/?selectedKind=Input-Form&full=0&stories=1&panelRight=0) [![](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/grommet/grommet-sandbox?initialpath=/form&module=%2Fsrc%2FForm.js)
## Usage

```javascript
import { Form } from 'grommet';
<Form />
```

## Properties

**errors**

An object representing any errors in the data. Their keys should
        match the keys in the value object. Defaults to `{}`.

```
{

}
```

**infos**

An object representing any information details in the data.
        Their keys should match the keys in the value object. Defaults to `{}`.

```
{

}
```

**messages**

Custom validation messages. Defaults to `{
  "invalid": "invalid",
  "required": "required"
}`.

```
{
  invalid: string,
  required: string
}
```

**onChange**

Function that will be called when any fields are updated.
      The fields must have a non-null `name` property assigned.

```
function
```

**onSubmit**

Function that will be called when the form is submitted. The
      single argument is an event containing the latest value object
      via `event.value` and an object indicating which fields were
      touched via `event.touched`.

```
function
```

**onReset**

Function that will be called when the form is reset. The
      single argument is the event provided by react.

```
function
```

**onValidate**

Function that will be called when the form is validated. The
      single argument is an event containing the latest error object
      via `validationResults.errors`, info object via 
      `validationResults.infos` and form's validity via `valid`.

```
function
```

**validate**

When to perform validation Defaults to `submit`.

```
blur
submit
change
```

**value**

An object representing all of the data in the form. Defaults to `{}`.

```
{

}
```
  
## Intrinsic element

```
form
```