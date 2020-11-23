## DateInput
A control to input a single date or a date range.

[![](https://cdn-images-1.medium.com/fit/c/120/120/1*TD1P0HtIH9zF0UEH28zYtw.png)](https://storybook.grommet.io/?selectedKind=Input-DateInput&full=0&stories=1&panelRight=0) [![](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/grommet/grommet-sandbox?initialpath=/dateinput&module=%2Fsrc%2FDateInput.js)
## Usage

```javascript
import { DateInput } from 'grommet';
<DateInput id='item' name='item' />
```

## Properties

**buttonProps**

Any properties to pass on to the underlying DropButton
      when not inline and no format.

```
{

}
```

**calendarProps**

Any properties to pass on to the underlying Calendar.

```
{

}
```

**defaultValue**

The default date or date range value in ISO8601 format.

```
string
[string]
```

**dropProps**

Any properties to pass on to the underlying Drop when not inline. Defaults to `{
  "align": {
    "top": "bottom",
    "left": "left"
  }
}`.

```
{

}
```

**format**

The date format to use. If not specified, the date value will not
      be displayed as a text string and the user will not be able to enter
      a date by typing. For example: 'mm/dd/yyyy', or for a range:
      'mm/dd/yyyy-mm/dd/yyyy'. This property should be used when in a Form.

```
string
```

**id**

The id of the input.

```
string
```

**inline**

Whether the calendar should always be shown or via a Drop when
      interacting with the input.

```
boolean
```

**inputProps**

Any properties to pass on to the underlying MaskedInput
      when there is a format.

```
{

}
```

**name**

The name of the input.
      This property is required when used within FormField.

```
string
```

**onChange**

Function that will be called when the user types or selects a date.
      The updated value will be available via 'event.value'.

```
function
```

**value**

The date or date range value(s) in ISO8601 format.

```
string
[string]
```
  
## Intrinsic element

```
div
```
## Theme
  
**dateInput.icon.size**

The size of the Calendar icon Expects `string`.

Defaults to

```
24px
```
