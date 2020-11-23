## Grommet
The top level Grommet container.

[![](https://cdn-images-1.medium.com/fit/c/120/120/1*TD1P0HtIH9zF0UEH28zYtw.png)](https://storybook.grommet.io/?selectedKind=Utilities-Grommet&full=0&stories=1&panelRight=0) [![](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/grommet/grommet-sandbox?initialpath=/grommet&module=%2Fsrc%2FGrommet.js)
## Usage

```javascript
import { Grommet } from 'grommet';
<Grommet>...</Grommet>
```

## Properties

**background**

Either a color 
identifier to use for the background color. For example: 'neutral-1'. Or, a 
'url()' for an image. Dark is not needed if color is provided.

```
string
{
  color: 
    string
    {
      dark: string,
      light: string
    },
  dark: 
    boolean
    string,
  image: string,
  position: string,
  opacity: 
    string
    boolean
    number
    weak
    medium
    strong,
  repeat: 
    no-repeat
    repeat
    string,
  size: 
    cover
    contain
    string,
  light: string
}
```

**dir**

Layout direction for right to left contexts

```
rtl
```

**full**

Whether to take the whole viewport.

```
boolean
```

**plain**

Whether or not Grommet should apply a global font-family, font-size,
        and line-height.

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

**themeMode**

Dark vs. light theme variation. Default is unspecified and left to
      theme.

```
dark
light
```

**userAgent**

User agent used to detect the device width for setting the initial
      breakpoint.

```
string
```

**containerTarget**

The node where Drop and Layer containers are inserted. Defaults to
      document.body which is almost always the right choice. This is used
      for less common cases like rendering within an internal node (e.g.
      shadow root).

```
object
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
