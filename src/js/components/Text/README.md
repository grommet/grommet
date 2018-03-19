## Text
Arbitrary text.

[![](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/grommet/grommet-sandbox?initialpath=text&module=%2Fsrc%2FText.js)
## Usage

```javascript
import { Text } from 'grommet';
<Text />
```

## Properties

**color**

A color identifier to use for the text color. For example:
'status-critical'.

```
string
```

**margin**

The amount of margin above and/or below the heading. An object can be
specified to distinguish top margin and bottom margin.

```
none
small
medium
large
{
  bottom: 
    small
    medium
    large,
  top: 
    small
    medium
    large
}
```

**size**

The font size is primarily driven by the chosen tag. But, it can
be adjusted via this size property. The tag should be set for semantic
correctness and accessibility. This size property allows for stylistic
adjustments.

```
xsmall
small
medium
large
xlarge
xxlarge
```

**tag**

The DOM tag to use for the element. Defaults to `span`.

```
string
```

**textAlign**

How to align the text inside the component.

```
start
center
end
```

**truncate**

Restrict the text to a single line and truncate with ellipsis if it
is too long to all fit.

```
boolean
```

**weight**

Font weight

```
normal
bold
number
```
  