## InfiniteScroll
A container that lazily renders items.

[![](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/grommet/grommet-sandbox?initialpath=infinitescroll&module=%2Fsrc%2FInfiniteScroll.js)
## Usage

```javascript
import { InfiniteScroll } from 'grommet';
<InfiniteScroll />
```

## Properties

**children**

Function that will be called when each item is rendered.

```
function
```

**items**

The children callback will be called to render each item. Defaults to `[]`.

```
[any]
```

**onMore**

Use this to indicate that 'items' doesn't contain all that it could.
      It will be called when the entire list of items has been rendered.
      This might be used when the total number of items that could be retrieved
      is more than you'd want to load into the browser. 'onMore' allows you
      to lazily fetch more from the server only when needed.

```
function
```

**step**

How many items to render at a time. Defaults to `50`.

```
number
```
  