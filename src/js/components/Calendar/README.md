## Calendar
Calendar of days in months.
      It can be used to select a single date, a range of dates, or multiple
      individual dates.

[![](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/grommet/grommet-sandbox?initialpath=calendar&module=%2Fsrc%2FCalendar.js)
## Usage

```javascript
import { Calendar } from 'grommet';
<Calendar />
```

## Properties

**bounds**

An array of two numbers indicating the limits on
        navigation in ISO8601 format

```
[string]
```

**date**

The selected date in ISO8601 format

```
string
```

**dates**

Multiple selected dates in ISO8601 format.
      Items that are an array indicate a range of dates.

```
[
  string
  [string]
]
```

**disabled**

Multiple dates in ISO8601 format that should not be
        selectable. Items that are an array indicate a range of dates.

```
[
  string
  [string]
]
```

**locale**

The locale to use. It must already
      have been loaded. See: https://momentjs.com/docs/#/i18n/

```
string
```

**onSelect**

Called with an ISO8601 date when
      the user selects a day.
      For single select, make this the subsequent `date` property value.
      For multiple select or ranges, toggle values in `dates`.
      Not specifying this property makes the component read only.

```
function
```

**size**

What size to make it.

```
small
medium
large
```
  