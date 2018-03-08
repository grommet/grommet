## FormField
A field in a form.

[![](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/grommet/grommet-sandbox?initialpath=formfield&module=%2Fsrc%2FFormField.js)
## Usage

```javascript
import { FormField } from 'grommet';
<FormField />
```

## Properties

**border**

What sort of border to use. Setting this to false
      will not show any border and will leave the focus indicator to
      the children. Defaults to `{
  "color": "border",
  "position": "inner",
  "side": "bottom"
}`.

```
boolean
{
  color: string,
  position: 
    outer
    inner,
  side: 
    top
    left
    bottom
    right
    horizontal
    vertical
    all,
  size: 
    small
    medium
    large
}
```

**error**

Any error text describing issues with the field

```
string
```

**help**

Any help text describing how the field works

```
string
```

**label**

A short label describing the field

```
string
```
  