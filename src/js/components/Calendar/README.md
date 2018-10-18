## Calendar
Calendar of days in months.
      It can be used to select a single date, a range of dates, or multiple
      individual dates.

[![](https://cdn-images-1.medium.com/fit/c/120/120/1*TD1P0HtIH9zF0UEH28zYtw.png)](https://storybook.grommet.io/?selectedKind=Calendar&full=0&addons=0&stories=1&panelRight=0) [![](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/grommet/grommet-sandbox?initialpath=calendar&module=%2Fsrc%2FCalendar.js)
## Usage

```javascript
import { Calendar } from 'grommet';
<Calendar />
```

## Properties

**a11yTitle**

Custom title to be used by screen readers.

```
string
```

**alignSelf**

How to align along the cross axis when contained in
      a Box or along the column axis when contained in a Grid.

```
start
center
end
stretch
```

**gridArea**

The name of the area to place
    this inside a parent Grid.

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

**animate**


      Whether to animate the calender as the user interacts with it.
     Defaults to `true`.

```
boolean
```

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

**firstDayOfWeek**

The first day of the week. 0 for Sunday. 1 for Monday.

```
0
1
```

**header**

If specified, the entire calendar header will be managed by the caller.
The function passes the following options:

```
  {
    date: Date,
    locale: string,
    onPreviousMonth: func,
    onNextMonth: func,
    previousInBound: bool,
    nextInBound: bool,
  }
```

`onPreviousMonth` and `onNextMonth` are callbacks that will tell the calendar to move between months.
`previousInBound` and `nextInBound` are booleans that tell, when using `bounds`, if the current date is within that range.
You can then use that to disable the previous and next buttons.


```
function
```

**locale**

The locale to use. Defaults to `en-US`.

```
string
```

**onReference**


      Called with an ISO8601 date when the user navigates to a different month.
    

```
function
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

**range**


      Whether to automatically manage multiple date selection as a range.
      When the user clicks the first date, onSelect will be called with that
      date. When the user selects another date, onSelect will be called with
      an array of two dates.
    

```
boolean
```

**reference**

The date to show if `date` isn't set, in ISO8601 format

```
string
```

**showAdjacentDays**


      Whether to show the days from the previous and next months.
     Defaults to `true`.

```
boolean
```

**size**

What size to make it. Defaults to `medium`.

```
small
medium
large
string
```
  