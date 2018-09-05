## SkipLinks
Describe a list of elements to skip to.

[![](https://cdn-images-1.medium.com/fit/c/120/120/1*TD1P0HtIH9zF0UEH28zYtw.png)](https://storybook.grommet.io/?selectedKind=SkipLinks&full=0&addons=0&stories=1&panelRight=0) [![](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/grommet/grommet-sandbox?initialpath=skiplinks&module=%2Fsrc%2FSkipLinks.js)
## Usage

```javascript
import { SkipLinks } from 'grommet';
<SkipLinks elements={['main', 'footer']} />
```

## Properties

**children**

Required. Array of SkipLink

```
node
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
  