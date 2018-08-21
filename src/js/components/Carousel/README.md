## Carousel
A carousel that cycles through children. Child components
      would typically be Images. It is the caller's responsibility to ensure
      that all children are the same size.

[![](https://cdn-images-1.medium.com/fit/c/120/120/1*TD1P0HtIH9zF0UEH28zYtw.png)](https://storybook.grommet.io/?selectedKind=Carousel&full=0&addons=0&stories=1&panelRight=0) [![](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/grommet/grommet-sandbox?initialpath=carousel&module=%2Fsrc%2FCarousel.js)
## Usage

```javascript
import { Carousel } from 'grommet';
<Carousel />
```

## Properties

**fill**

Whether to expand to fill
      all of the available width and height in the parent container.

```
boolean
```

**play**

If specified, the number of
      milliseconds between automatically transitioning to the next child. It
      will loop through all children indefinitely.

```
number
```
  