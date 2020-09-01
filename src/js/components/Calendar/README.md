## Calendar
A calendar of days displayed by month.
      It can be used to select a single date, a range of dates, or multiple
      individual dates.

[![](https://cdn-images-1.medium.com/fit/c/120/120/1*TD1P0HtIH9zF0UEH28zYtw.png)](https://storybook.grommet.io/?selectedKind=Calendar&full=0&addons=0&stories=1&panelRight=0) [![](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/grommet/grommet-sandbox?initialpath=/calendar&module=%2Fsrc%2FCalendar.js)
## Usage

```javascript
import { Calendar } from 'grommet';
<Calendar />
```

## Properties

**a11yTitle**

Custom label to be used by screen readers. When provided, an aria-label will
   be added to the element.

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

**animate**

Whether to animate the calender as the user interacts with it. Defaults to `true`.

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

**daysOfWeek**

Whether to show the days of the week.

```
boolean
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

`onPreviousMonth` and `onNextMonth` are callbacks that will tell the 
calendar to move between months.
`previousInBound` and `nextInBound` are booleans that tell, when using 
`bounds`, if the current date is within that range. You can then use that 
to disable the previous and next buttons.


```
function
```

**locale**

The locale to use. Defaults to `en-US`.

```
string
```

**onReference**

Called with an ISO8601 date when the user navigates to a different
       month.

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

Whether to show the days from the previous and next months. Defaults to `true`.

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
  
## Intrinsic element

```
div
```
## Theme
  
**calendar.day.extend**

Any additional style for the day of Calendar. Expects `string | (props) => {}`.

Defaults to

```
undefined
```

**calendar.extend**

Any additional style for the Calendar. Expects `string | (props) => {}`.

Defaults to

```
undefined
```

**calendar.heading.level**

The heading level used for the calendar. Expects `number`.

Defaults to

```
4
```

**calendar.icons.next**

The icon to use for the next month navigation control. Expects `element`.

Defaults to

```
<Next />
```

**calendar.icons.previous**

The icon to use for the previous month navigation control. Expects `element`.

Defaults to

```
<Previous />
```

**calendar.icons.small.next**

The icon to use for the next month navigation control when small. Expects `element`.

Defaults to

```
<FormNext />
```

**calendar.icons.small.previous**

The icon to use for the previous month navigation control when small. Expects `element`.

Defaults to

```
<FormPrevious />
```

**calendar.large.daySize**

The size of a day when large. Expects `string`.

Defaults to

```
109.7px
```

**calendar.large.fontSize**

The font size to use for days when large. Expects `string`.

Defaults to

```
30px
```

**calendar.large.lineHeight**

The line height to use for days when large. Expects `number`.

Defaults to

```
1.11
```

**calendar.large.slideDuration**

How long it animate the slide between months when large. Expects `string`.

Defaults to

```
0.8s
```

**calendar.medium.daySize**

The size of a day when medium. Expects `string`.

Defaults to

```
54.84px
```

**calendar.medium.fontSize**

The font size to use for days when medium. Expects `string`.

Defaults to

```
18px
```

**calendar.medium.lineHeight**

The line height to use for days when medium. Expects `number`.

Defaults to

```
1.45
```

**calendar.medium.slideDuration**

How long it animate the slide between months when medium. Expects `string`.

Defaults to

```
0.5s
```

**calendar.small.daySize**

The size of a day when small. Expects `string`.

Defaults to

```
27.42px
```

**calendar.small.fontSize**

The font size to use for days when small. Expects `string`.

Defaults to

```
14px
```

**calendar.small.lineHeight**

The line height to use for days when small. Expects `number`.

Defaults to

```
1.375
```

**calendar.small.slideDuration**

How long it animate the slide between months when small. Expects `string`.

Defaults to

```
0.2s
```

**global.size.small**

The width of the calendar when small. Expects `string`.

Defaults to

```
192px
```

**global.size.medium**

The width of the calendar when medium. Expects `string`.

Defaults to

```
384px
```

**global.size.large**

The width of the calendar when large. Expects `string`.

Defaults to

```
768px
```

**global.colors.icon**

The color of a given icon. Expects `string | { dark: string, light: string }`.

Defaults to

```
{ dark: #f8f8f8, light: #666666 }
```

**global.edgeSize**

The possible sizes for margin. Expects `object`.

Defaults to

```
{
    edgeSize: {
      none: '0px',
      hair: '1px',
      xxsmall: '3px',
      xsmall: '6px',
      small: '12px',
      medium: '24px',
      large: '48px',
      xlarge: '96px',
      responsiveBreakpoint: 'small',
    },
  }
```
