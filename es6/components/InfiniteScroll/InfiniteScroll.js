import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { findScrollParent, findScrollParents, isNodeAfterScroll, isNodeBeforeScroll } from '../../utils';
import { Box } from '../Box';

var InfiniteScroll = function InfiniteScroll(_ref) {
  var children = _ref.children,
      _ref$items = _ref.items,
      items = _ref$items === void 0 ? [] : _ref$items,
      onMore = _ref.onMore,
      renderMarker = _ref.renderMarker,
      replace = _ref.replace,
      showProp = _ref.show,
      _ref$step = _ref.step,
      step = _ref$step === void 0 ? 50 : _ref$step;

  // item index to be made visible initially
  var _useState = useState(showProp),
      show = _useState[0],
      setShow = _useState[1]; // the last page we have items for


  var lastPage = useMemo(function () {
    return Math.floor(items.length / step);
  }, [items.length, step]); // the pages we are rendering

  var _useState2 = useState([0, show ? Math.floor((show + step) / step) - 1 : 0]),
      renderPageBounds = _useState2[0],
      setRenderPageBounds = _useState2[1]; // the heights of the pages, approximated after we render the first page
  // and then updated for pages that have rendered


  var _useState3 = useState([]),
      pageHeights = _useState3[0],
      setPageHeights = _useState3[1]; // what we're waiting for onMore to give us


  var _useState4 = useState(0),
      pendingLength = _useState4[0],
      setPendingLength = _useState4[1];

  var aboveMarkerRef = useRef(); // only when replacing

  var belowMarkerRef = useRef(); // scroll and resize handling

  useEffect(function () {
    var scrollParents;

    var evaluate = function evaluate() {
      if (!scrollParents) return;
      var scrollParent = scrollParents[0]; // Determine the scroll position of the scroll container

      var top;
      var height;

      if (scrollParent === document) {
        top = document.documentElement.scrollTop || document.body.scrollTop;
        height = window.innerHeight;
      } else {
        top = scrollParent.scrollTop;
        var rect = scrollParent.getBoundingClientRect();
        height = rect.height;
      }

      var offset = height / 4; // so we pre-load when the user scrolls slowly
      // Use the pageHeights to determine what pages we should render based
      // on the current scroll window.

      var nextBeginPage = 0;
      var index = 0;
      var pagesHeight = pageHeights[index] || 0;

      while (pageHeights[index + 1] && pagesHeight < top - offset) {
        index += 1;
        nextBeginPage += 1;
        pagesHeight += pageHeights[index];
      }

      var nextEndPage = nextBeginPage;

      while (pageHeights[index] !== undefined && pagesHeight < top + height + offset) {
        index += 1;
        nextEndPage += 1; // when we haven't rendered the nextEndPage and we aren't replacing,
        // we might not have a height for it yet

        pagesHeight += pageHeights[index] || 0;
      }

      if (!replace) {
        // when not replacing, never shrink bounds
        nextBeginPage = 0;
        nextEndPage = Math.max(renderPageBounds[1], nextEndPage);
      }

      if (show) {
        // ensure we try to render any show page
        var showPage = Math.floor((show + step) / step) - 1;
        nextBeginPage = Math.min(showPage, nextBeginPage);
        nextEndPage = Math.max(showPage, nextEndPage);
      }

      if (nextBeginPage !== renderPageBounds[0] || nextEndPage !== renderPageBounds[1]) {
        setRenderPageBounds([nextBeginPage, nextEndPage]);
      }
    };

    var timer;

    var debounce = function debounce() {
      clearTimeout(timer);
      timer = setTimeout(evaluate, 10);
    }; // might not be there yet or might have already rendered everything


    if (belowMarkerRef.current) {
      scrollParents = findScrollParents(belowMarkerRef.current);
      scrollParents.forEach(function (sp) {
        return sp.addEventListener('scroll', debounce);
      });
    }

    window.addEventListener('resize', debounce);
    evaluate();
    return function () {
      if (scrollParents) {
        scrollParents.forEach(function (sp) {
          return sp.removeEventListener('scroll', debounce);
        });
      }

      window.removeEventListener('resize', debounce);
      clearTimeout(timer);
    };
  }, [pageHeights, renderPageBounds, replace, show, step]); // check if we need to ask for more

  useEffect(function () {
    if (onMore && renderPageBounds[1] === lastPage && items.length >= pendingLength) {
      // remember we've asked for more, so we don't keep asking if it takes
      // a while
      setPendingLength(items.length + 1);
      onMore();
    }
  }, [items.length, lastPage, onMore, pendingLength, renderPageBounds, step]); // scroll to any 'show'

  useLayoutEffect(function () {
    // ride out any animation delays, 100ms empirically measured
    var timer = setTimeout(function () {
      if (show && belowMarkerRef.current) {
        // calculate show index based on beginPage
        var showIndex = show - renderPageBounds[0] * step + (renderPageBounds[0] ? 1 : 0);
        var showNode = belowMarkerRef.current.parentNode.children.item(showIndex);

        if (showNode) {
          var scrollParent = findScrollParent(showNode);

          if (isNodeBeforeScroll(showNode, scrollParent)) {
            showNode.scrollIntoView(true);
          } else if (isNodeAfterScroll(showNode, scrollParent)) {
            showNode.scrollIntoView(false);
          } // clean up after having shown


          setShow(undefined);
        }
      }
    }, 100);
    return function () {
      return clearTimeout(timer);
    };
  }, [renderPageBounds, show, step]); // calculate and keep track of page heights

  useLayoutEffect(function () {
    // if don't have a belowMarker, we must have rendered everything already
    if (!belowMarkerRef.current) return; // calculate page heights for rendered pages

    var rendered = belowMarkerRef.current.parentNode.children; // ensure we've rendered the state we have
    // above? + items in rendered pages + below === rendered DOM elements length

    if ((aboveMarkerRef.current ? 1 : 0) + (renderPageBounds[1] - renderPageBounds[0] + 1) * step + 1 === rendered.length) {
      var nextPageHeights; // step through each page

      var i = renderPageBounds[0];
      var lastBottom;

      while (i <= renderPageBounds[1]) {
        var topIndex = (aboveMarkerRef.current ? 1 : 0) + (i - renderPageBounds[0]) * step;
        var bottomIndex = Math.min(topIndex + step - 1, rendered.length - 1); // we use lastBottom for top to ensure grid layouts work

        var top = lastBottom !== undefined ? lastBottom : rendered.item(topIndex).getBoundingClientRect().top;

        var _rendered$item$getBou = rendered.item(bottomIndex).getBoundingClientRect(),
            bottom = _rendered$item$getBou.bottom;

        var height = bottom - top;

        if (bottom && (!pageHeights || pageHeights[i] !== height)) {
          if (!nextPageHeights) nextPageHeights = [].concat(pageHeights || []);
          nextPageHeights[i] = height;
        }

        lastBottom = bottom;
        i += 1;
      } // estimate page heights for pages we haven't rendered yet


      while (replace && i <= lastPage) {
        if (!pageHeights[i] && pageHeights[i] !== pageHeights[0]) {
          if (!nextPageHeights) nextPageHeights = [].concat(pageHeights || []);
          var _nextPageHeights = nextPageHeights;
          nextPageHeights[i] = _nextPageHeights[0];
        }

        i += 1;
      }

      if (nextPageHeights) setPageHeights(nextPageHeights);
    }
  }, [lastPage, pageHeights, renderPageBounds, replace, step]); // calculate the height above the first rendered page using the pageHeights

  var aboveHeight = useMemo(function () {
    if (!replace) return 0;
    var height = 0;
    var i = 0;

    while (i < renderPageBounds[0]) {
      height += pageHeights[i] || 0;
      i += 1;
    }

    return height;
  }, [pageHeights, renderPageBounds, replace]); // calculate the height below the last rendered page using the pageHeights

  var belowHeight = useMemo(function () {
    if (!replace) return 0;
    var height = 0;
    var i = renderPageBounds[1] + 1;

    while (i <= lastPage) {
      height += pageHeights[i] || 0;
      i += 1;
    }

    return height;
  }, [lastPage, pageHeights, renderPageBounds, replace]);
  var firstIndex = renderPageBounds[0] * step;
  var lastIndex = Math.min((renderPageBounds[1] + 1) * step, items.length) - 1;
  var result = [];

  if (aboveHeight) {
    var marker = /*#__PURE__*/React.createElement(Box, {
      key: "above",
      ref: aboveMarkerRef,
      flex: false,
      height: aboveHeight + "px"
    });

    if (renderMarker) {
      // need to give it a key
      marker = /*#__PURE__*/React.cloneElement(renderMarker(marker), {
        key: 'above'
      });
    }

    result.push(marker);
  }

  items.slice(firstIndex, lastIndex + 1).forEach(function (item, index) {
    var itemsIndex = firstIndex + index;
    var child = children(item, itemsIndex);
    result.push(child);
  });

  if (replace || renderPageBounds[1] < lastPage || onMore) {
    var _marker = /*#__PURE__*/React.createElement(Box, {
      key: "below",
      ref: !renderMarker && belowMarkerRef || undefined,
      flex: false,
      height: (belowHeight || 0) + "px"
    });

    if (renderMarker) {
      // need to give it a key
      var renderedMarker = renderMarker(_marker);
      _marker = /*#__PURE__*/React.cloneElement(renderedMarker, {
        key: 'below',
        // We need to make sure our belowMarkerRef is tied to a component
        // that has the same parent as the items being rendered. This is so
        // we can use belowMarkerRef.current.parentNode.children to
        // get a reference to the items in the DOM for calculating pageHeights.
        //
        // Since the caller might have included a ref in what their
        // renderMarker returns, we have to take care of both refs.
        // https://github.com/facebook/react/issues/8873#issuecomment-489579878
        ref: function ref(node) {
          // Keep your own reference
          belowMarkerRef.current = node; // Call the original ref, if any

          var ref = renderedMarker.ref;

          if (typeof ref === 'function') {
            ref(node);
          } else if (ref !== null) {
            ref.current = node;
          }
        }
      });
    }

    result.push(_marker);
  }

  return result;
};

var InfiniteScrollDoc;

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  InfiniteScrollDoc = require('./doc').doc(InfiniteScroll);
}

var InfiniteScrollWrapper = InfiniteScrollDoc || InfiniteScroll;
export { InfiniteScrollWrapper as InfiniteScroll };