## Heading
Heading text structed in levels.

[![](https://cdn-images-1.medium.com/fit/c/120/120/1*TD1P0HtIH9zF0UEH28zYtw.png)](https://storybook.grommet.io/?selectedKind=Heading&full=0&addons=0&stories=1&panelRight=0) [![](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/grommet/grommet-sandbox?initialpath=heading&module=%2Fsrc%2FHeading.js)
## Usage

```javascript
import { Heading } from 'grommet';
<Heading />
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

**color**

A color identifier to use for the text color.

```
string
```

**level**

The heading level. It corresponds to the number after the 'H' for
the DOM tag. Set the level for semantic accuracy and accessibility.
The sizing can be further adjusted using the size property. Defaults to `1`.

```
1
2
3
4
5
6
1
2
3
4
5
6
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
adjustments. Defaults to `medium`.

```
small
medium
large
xlarge
string
```

**textAlign**

How to align the text inside the heading. Defaults to `start`.

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
  