## Grommet
The top level Grommet container.

[![](https://cdn-images-1.medium.com/fit/c/120/120/1*TD1P0HtIH9zF0UEH28zYtw.png)](https://storybook.grommet.io/?selectedKind=Grommet&full=0&addons=0&stories=1&panelRight=0) [![](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/grommet/grommet-sandbox?initialpath=grommet&module=%2Fsrc%2FGrommet.js)
## Usage

```javascript
import { Grommet } from 'grommet';
<Grommet>...</Grommet>
```

## Properties

**full**

Whether to take the whole viewport.

```
boolean
```

**plain**

Whether or not Grommet should apply a global font-family, font-size, and line-height.

```
boolean
```

**cssVars**

Whether to expose the css variables.

```
boolean
```

**theme**

Custom styles for Grommet app component.

```
object
```

**userAgent**

User agent used to detect the device width for setting the initial breakpoint.

```
string
```
  
## Intrinsic element

```
div
```
## Theme
  
**grommet.extend**

Any additional style for Grommet. Expects `string | (props) => {}`.

Defaults to

```
undefined
```

**global.font.face**

Custom font face declaration Expects `string | (props) => {}`.

Defaults to

```
undefined
```
