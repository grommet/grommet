## RoutedAnchor
An Anchor with support for React Router.

[![](https://cdn-images-1.medium.com/fit/c/120/120/1*TD1P0HtIH9zF0UEH28zYtw.png)](https://storybook.grommet.io/?selectedKind=Controls-RoutedAnchor&full=0&stories=1&panelRight=0) [![](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/grommet/grommet-sandbox?initialpath=/routedanchor&module=%2Fsrc%2FRoutedAnchor.js)
## Usage

```javascript
import { RoutedAnchor } from 'grommet';
<RoutedAnchor primary path='/documentation' />
```

## Properties

**path**

Required. Indicates the path to be used for react-router link.

```
string
```

**method**

Indicates whether the browser history should be appended to or 
      replaced. Defaults to `push`.

```
push
replace
```
  
## Intrinsic element

```
a
```