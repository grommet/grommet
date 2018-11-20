## RangeInput
A range input with custom styles.

[![](https://cdn-images-1.medium.com/fit/c/120/120/1*TD1P0HtIH9zF0UEH28zYtw.png)](https://storybook.grommet.io/?selectedKind=RangeInput&full=0&addons=0&stories=1&panelRight=0) [![](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/grommet/grommet-sandbox?initialpath=rangeinput&module=%2Fsrc%2FRangeInput.js)
## Usage

```javascript
import { RangeInput } from 'grommet';
<RangeInput />
```

## Properties

**id**

The id attribute of the range input.

```
string
```

**min**

The minimum value permitted.

```
number
string
```

**max**

The maximum value permitted.

```
number
string
```

**name**

The name attribute of the range input.

```
string
```

**onChange**

Function that will be called when the user changes the value. It will
      be passed an event object. The new input value will be available
      via 'event.target.value'.

```
function
```

**step**

The step interval between values.

```
number
```

**value**

The current value.

```
number
string
```
  