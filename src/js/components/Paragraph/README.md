## Paragraph
A paragraph of text.

[![](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/grommet/grommet-sandbox?initialpath=paragraph&module=%2Fsrc%2FParagraph.js)
## Usage

```javascript
import { Paragraph } from 'grommet';
<Paragraph />
```

## Properties

**color**

A color identifier to use for the text color. For example:
'status-critical'.

```
string
```

**margin**

The amount of margin above and/or below the paragraph. An object can be
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

The size of the Paragraph text. Defaults to `medium`.

```
small
medium
large
xlarge
```

**textAlign**

How to align the text inside the paragraph.

```
start
center
end
```
  