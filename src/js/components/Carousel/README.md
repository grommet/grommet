## Carousel
A carousel that cycles through children. Child components
      would typically be Images. It is the caller's responsibility to ensure
      that all children are the same size.

[![](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/grommet/grommet-sandbox?initialpath=carousel&module=%2Fsrc%2FCarousel.js)
## Usage

```javascript
import { Carousel } from 'grommet';
<Carousel />
```

## Properties

**play**

If specified, the number of
      milliseconds between automatically transitioning to the next child. It
      will loop through all children indefinitely.

```
number
```
  