## Heading
Heading text structed in levels.

[![](https://cdn-images-1.medium.com/fit/c/120/120/1*TD1P0HtIH9zF0UEH28zYtw.png)](https://storybook.grommet.io/?selectedKind=Heading&full=0&addons=0&stories=1&panelRight=0) [![](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/grommet/grommet-sandbox?initialpath=heading&module=%2Fsrc%2FHeading.js)
## Usage

```javascript
import { Heading } from 'grommet';
<Heading />
```

## Properties

**color**

A color identifier to use for the text color. For example:
      'brand'.

```
string
```

**level**

The heading level. It corresponds to the number after the 'H' for
the DOM tag. Set the level for semantic accuracy and accessibility.
The sizing can be further adjusted using the size property.

```
1
2
3
4
1
2
3
4
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
    none
    small
    medium
    large,
  top: 
    none
    small
    medium
    large
}
```

**responsive**

Whether the font size should be scaled for
      mobile environments. Defaults to `true`.

```
boolean
```

**size**

The font size is primarily driven by the chosen tag. But, it can
be adjusted via this size property. The tag should be set for semantic
correctness and accessibility. This size property allows for stylistic
adjustments.

```
small
medium
large
```

**textAlign**

How to align the text inside the heading.

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
  