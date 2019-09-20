## RangeInput
A slider control to input a value within a fixed range.

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
  
## Intrinsic element

```
input
```
## Theme
  
**global.focus.border.color**

The color around the component when in focus. Expects `string | { dark: string, light: string }`.

Defaults to

```
focus
```

**global.spacing**

The height, width and border-radius of the range thumb. Expects `string`.

Defaults to

```
24px
```

**rangeInput.extend**

Any additional style for the RangeInput. Expects `string | (props) => {}`.

Defaults to

```
undefined
```

**rangeInput.thumb.color**

The color of the thumb. Expects `string | { dark: undefined, light: undefined }`.

Defaults to

```
undefined
```

**rangeInput.thumb.extend**

Any additional style for the thumb. Expects `string | (props) => {}`.

Defaults to

```
undefined
```

**rangeInput.track.color**

The color of the track. Expects `string`.

Defaults to

```
{ dark: rgba(255, 255, 255, 0.33), light: rgba(0, 0, 0, 0.33) }
```

**rangeInput.track.extend**

Any additional style for the track. Expects `string | (props) => {}`.

Defaults to

```
undefined
```

**rangeInput.track.height**

The height of the track. Expects `string`.

Defaults to

```
4px
```
