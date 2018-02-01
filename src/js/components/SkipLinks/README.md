## SkipLinks
Describe a list of elements to skip to.

[![](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/grommet/grommet-sandbox?initialpath=skiplinks&module=%2Fsrc%2FSkipLinks.js)
## Usage

```javascript
import { SkipLinks } from 'grommet';
<SkipLinks elements={['main', 'footer']} />
```

## Properties

**children**

Required. SkipLink array

```
[new SkipLink(...)]
```

**messages**

Custom messages for SkipLinks. Used for accessibility by screen readers. Defaults to `{
  "skipTo": "Skip To"
}`.

```
{
  skipTo: string
}
```
  