## RangeSelector
A control to allow selecting a range of values.

[![](https://cdn-images-1.medium.com/fit/c/120/120/1*TD1P0HtIH9zF0UEH28zYtw.png)](https://storybook.grommet.io/?selectedKind=RangeSelector&full=0&addons=0&stories=1&panelRight=0) [![](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/grommet/grommet-sandbox?initialpath=rangeselector&module=%2Fsrc%2FRangeSelector.js)
## Usage

```javascript
import { RangeSelector } from 'grommet';
<RangeSelector />
```

## Properties

**color**

What color to use to indicate the selection.

```
string
```

**direction**

 Defaults to `horizontal`.

```
horizontal
vertical
```

**invert**

Whether to indicate what has not been selected.

```
boolean
```

**max**

The maximum value permitted. Defaults to `100`.

```
number
```

**messages**

Custom messages. Used for accessibility by screen readers.

```
{
  lower: string,
  upper: string
}
```

**min**

The minimum value permitted.

```
number
```

**onChange**

Function that will be called when the user changes one of the
      values. It will be passed an array of two numbers indicating
      the new values selected.

```
function
```

**opacity**

 Defaults to `medium`.

```
weak
medium
strong
```

**round**

How much to round the corners.

```
xsmall
small
medium
large
full
string
```

**size**

How thick to make the selection indicator. Defaults to `medium`.

```
xxsmall
xsmall
small
medium
large
xlarge
full
string
```

**step**

The step interval between values. Defaults to `1`.

```
number
```

**values**

Required. The current values.

```
[number]
```
  