## Paragraph
A paragraph of text.

[![](https://cdn-images-1.medium.com/fit/c/120/120/1*TD1P0HtIH9zF0UEH28zYtw.png)](https://storybook.grommet.io/?selectedKind=Paragraph&full=0&addons=0&stories=1&panelRight=0) [![](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/grommet/grommet-sandbox?initialpath=paragraph&module=%2Fsrc%2FParagraph.js)
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
    large
    string,
  top: 
    small
    medium
    large
    string
}
string
```

**size**

The size of the Paragraph text. Defaults to `medium`.

```
small
medium
large
xlarge
string
```

**textAlign**

How to align the text inside the paragraph.

```
start
center
end
```
  