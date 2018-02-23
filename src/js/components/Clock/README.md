## Clock
A clock with timezone awareness.

[![](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/grommet/grommet-sandbox?initialpath=clock&module=%2Fsrc%2FClock.js)
## Usage

```javascript
import { Clock } from 'grommet';
<Clock />
```

## Properties

**onChange**

If the clock is running, this function will be called with the
      current time value each time it changes.

```
function
```

**precision**

How precise a time to represent.

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
```

**time**

ISO8601 time or duration. For example: 'PT8H12M23S',
      'T08:12:23', or '2015-02-22T08:12:23'. Any included date
      portion will be ignored for an analog clock.

```
string
```

**type**

What type of visualization to show. Defaults to `analog`.

```
analog
digital
```
  