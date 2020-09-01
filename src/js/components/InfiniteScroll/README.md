## InfiniteScroll
A container that lazily renders items.

[![](https://cdn-images-1.medium.com/fit/c/120/120/1*TD1P0HtIH9zF0UEH28zYtw.png)](https://storybook.grommet.io/?selectedKind=InfiniteScroll&full=0&addons=0&stories=1&panelRight=0) [![](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/grommet/grommet-sandbox?initialpath=/infinitescroll&module=%2Fsrc%2FInfiniteScroll.js)
## Usage

```javascript
import { InfiniteScroll } from 'grommet';
<InfiniteScroll />
```

## Properties

**children**

Function that will be called when each item is rendered. It will be
      called with three arguments, the item to render, the index of the item,
      and a ref that should be applied to the element. For example:
      {(item, index, ref) => <li key={index} ref={ref}>{item}</li>}

```
function
```

**items**

The children callback will be called to render each item.

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

**renderMarker**

Function that will be called to render the marker element that
      is inserted into the DOM to track when scrolling nears the end of the
      rendered items. It will be called with a single element that should
      be wrapped appropriately. This is needed when the default
      element, a <span>, isn't sufficient, such as a row of a table body.

```
function
```

**replace**

Whether to replace previously rendered items with a generic spacing
      element when they have scrolled out of view. This is more performant but
      means that in-page searching will not find elements that have been
      replaced. In general, this should be set to true within Drop containers
      and false otherwise.

```
boolean
```

**scrollableAncestor**

A custom ancestor to determine if the marker is visible in it.
      This is useful in cases where you do not want the immediate
      scrollable ancestor to be the container. For example, when your
      marker is in a div that has overflow auto but you are detecting
      visibility based on the window.
      This should typically be a reference to a DOM node, but it will
      also work to pass it the string "window" if you are using server
      rendering.

```
node
window
```

**show**

Ensure that the item at this index is visible initially.

```
number
```

**step**

How many items to render at a time. Defaults to `50`.

```
number
```
  