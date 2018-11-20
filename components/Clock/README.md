## Clock
A clock with timezone awareness.

[![](https://cdn-images-1.medium.com/fit/c/120/120/1*TD1P0HtIH9zF0UEH28zYtw.png)](https://storybook.grommet.io/?selectedKind=Clock&full=0&addons=0&stories=1&panelRight=0) [![](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/grommet/grommet-sandbox?initialpath=clock&module=%2Fsrc%2FClock.js)
## Usage

```javascript
import { Clock } from 'grommet';
<Clock />
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

**hourLimit**

Whether to roll over the hours after 12 or after 24. Defaults to `24`.

```
12
24
12
24
```

**onChange**

If the clock is running, this function will be called with the
      current time value each time it changes.

```
function
```

**precision**

How precise a time to represent. Defaults to `seconds`.

```
hours
minutes
seconds
```

**run**

Whether the clock should actively adjust time or be fixed to the
      time specified. 'backward' could be used as a countdown timer. Defaults to `forward`.

```
boolean
backward
forward
```

**size**

Clock size Defaults to `medium`.

```
small
medium
large
xlarge
string
```

**time**

ISO8601 time or duration. For example: 'PT8H12M23S',
      'T08:12:23', or '2015-02-22T08:12:23'. Any included date
      portion will be ignored for an analog clock. If not provided, the
      current browser time will be used.

```
string
```

**type**

What type of visualization to show. Defaults to `analog`.

```
analog
digital
```
  