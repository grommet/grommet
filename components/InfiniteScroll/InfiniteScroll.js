"use strict";

exports.__esModule = true;
exports.InfiniteScroll = void 0;
var _react = _interopRequireWildcard(require("react"));
var _useIsomorphicLayoutEffect = require("../../utils/use-isomorphic-layout-effect");
var _utils = require("../../utils");
var _Box = require("../Box");
var _propTypes = require("./propTypes");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _readOnlyError(r) { throw new TypeError('"' + r + '" is read-only'); }
var calculateLastPageBound = function calculateLastPageBound(show, step) {
  return show ? Math.floor((show + step) / step) - 1 : 0;
};
var InfiniteScroll = exports.InfiniteScroll = function InfiniteScroll(_ref) {
  var children = _ref.children,
    _ref$items = _ref.items,
    items = _ref$items === void 0 ? [] : _ref$items,
    onMore = _ref.onMore,
    renderMarker = _ref.renderMarker,
    replace = _ref.replace,
    show = _ref.show,
    _ref$step = _ref.step,
    step = _ref$step === void 0 ? 50 : _ref$step;
  // item index to be made visible initially
  var _useState = (0, _react.useState)(),
    scrollShow = _useState[0],
    setScrollShow = _useState[1];

  // the last page we have items for
  var lastPage = (0, _react.useMemo)(function () {
    return Math.max(0, Math.ceil(items.length / step) - 1);
  }, [items.length, step]);

  // the pages we are rendering
  var _useState2 = (0, _react.useState)([0, calculateLastPageBound(show, step)]),
    renderPageBounds = _useState2[0],
    setRenderPageBounds = _useState2[1];

  // the heights of the pages, approximated after we render the first page
  // and then updated for pages that have rendered
  var _useState3 = (0, _react.useState)([]),
    pageHeights = _useState3[0],
    setPageHeights = _useState3[1];

  // what we're waiting for onMore to give us
  var _useState4 = (0, _react.useState)(0),
    pendingLength = _useState4[0],
    setPendingLength = _useState4[1];
  var aboveMarkerRef = (0, _react.useRef)(); // only when replacing
  var belowMarkerRef = (0, _react.useRef)();

  // scroll and resize handling
  (0, _react.useEffect)(function () {
    var scrollParents;
    var evaluate = function evaluate() {
      if (!scrollParents) return;
      var scrollParent = scrollParents[0];

      // Determine the scroll position of the scroll container
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
        nextEndPage += 1;
        // when we haven't rendered the nextEndPage and we aren't replacing,
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
        var showPage = calculateLastPageBound(show, step);
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
    };

    // might not be there yet or might have already rendered everything
    if (belowMarkerRef.current) {
      scrollParents = (0, _utils.findScrollParents)(belowMarkerRef.current);
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
  }, [pageHeights, renderPageBounds, replace, show, step]);

  // check if we need to ask for more
  (0, _react.useEffect)(function () {
    if (onMore && renderPageBounds[1] === lastPage && items.length >= pendingLength && items.length > 0) {
      // remember we've asked for more, so we don't keep asking if it takes
      // a while
      setPendingLength(items.length + 1);
      onMore();
    }
  }, [items.length, lastPage, onMore, pendingLength, renderPageBounds, step]);
  (0, _react.useEffect)(function () {
    if (items.length === 0 && lastPage === 0 && pendingLength !== 0) {
      setPageHeights([]);
      setPendingLength(0);
      setRenderPageBounds([0, calculateLastPageBound(show, step)]);
    }
  }, [lastPage, pendingLength, show, step, items.length]);

  // scroll to any 'show'
  (0, _useIsomorphicLayoutEffect.useLayoutEffect)(function () {
    // ride out any animation delays, 100ms empirically measured
    var timer = setTimeout(function () {
      if (show && belowMarkerRef.current && show !== scrollShow) {
        // calculate show index based on beginPage
        var showIndex = show - renderPageBounds[0] * step + (renderPageBounds[0] ? 1 : 0);
        var showNode = belowMarkerRef.current.parentNode.children.item(showIndex);
        if (showNode) {
          var scrollParent = (0, _utils.findScrollParent)(showNode);
          if ((0, _utils.isNodeBeforeScroll)(showNode, scrollParent)) {
            showNode.scrollIntoView(true);
          } else if ((0, _utils.isNodeAfterScroll)(showNode, scrollParent)) {
            showNode.scrollIntoView(false);
          }
          // clean up after having shown
          setScrollShow(show);
        }
      }
    }, 100);
    return function () {
      return clearTimeout(timer);
    };
    // Omitting scrollShow as a dependency due to concern that setScrollShow
    // is being called within the timer. If left included, re-renders and other
    // dependency values could change in an unpredictable manner during timer
    // and potentially result in an infinite loop.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [renderPageBounds, show, step]);

  // calculate and keep track of page heights
  (0, _useIsomorphicLayoutEffect.useLayoutEffect)(function () {
    // if don't have a belowMarker, we must have rendered everything already
    if (!belowMarkerRef.current) return;

    // calculate page heights for rendered pages
    var rendered = belowMarkerRef.current.parentNode.children;
    // ensure we've rendered the state we have
    // above? + items in rendered pages + below === rendered DOM elements length
    if ((aboveMarkerRef.current ? 1 : 0) + (renderPageBounds[1] - renderPageBounds[0] + 1) * step + 1 === rendered.length) {
      var nextPageHeights;

      // step through each page
      var i = renderPageBounds[0];
      var lastBottom;
      while (i <= renderPageBounds[1]) {
        var topIndex = (aboveMarkerRef.current ? 1 : 0) + (i - renderPageBounds[0]) * step;
        var bottomIndex = Math.min(topIndex + step - 1, rendered.length - 1);
        // we use lastBottom for top to ensure grid layouts work
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
      }

      // estimate page heights for pages we haven't rendered yet
      while (replace && i <= lastPage) {
        if (!pageHeights[i] && pageHeights[i] !== pageHeights[0]) {
          if (!nextPageHeights) nextPageHeights = [].concat(pageHeights || []);
          // set to first page height
          var _nextPageHeights = nextPageHeights;
          nextPageHeights[i] = _nextPageHeights[0];
        }
        i += 1;
      }
      if (nextPageHeights) setPageHeights(nextPageHeights);
    }
  }, [lastPage, pageHeights, renderPageBounds, replace, step]);

  // calculate the height above the first rendered page using the pageHeights
  var aboveHeight = (0, _react.useMemo)(function () {
    if (!replace) return 0;
    var height = 0;
    var i = 0;
    while (i < renderPageBounds[0]) {
      height += pageHeights[i] || 0;
      i += 1;
    }
    return height;
  }, [pageHeights, renderPageBounds, replace]);

  // calculate the height below the last rendered page using the pageHeights
  var belowHeight = (0, _react.useMemo)(function () {
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
    var marker = /*#__PURE__*/_react["default"].createElement(_Box.Box, {
      key: "above",
      ref: aboveMarkerRef,
      flex: false,
      height: aboveHeight + "px"
    });
    if (renderMarker) {
      // need to give it a key
      marker = /*#__PURE__*/_react["default"].cloneElement(renderMarker(marker), {
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
    var _marker = /*#__PURE__*/_react["default"].createElement(_Box.Box, {
      key: "below",
      ref: !renderMarker && belowMarkerRef || undefined,
      flex: false,
      height: (belowHeight || 0) + "px"
    });
    if (renderMarker) {
      // need to give it a key
      var renderedMarker = renderMarker(_marker);
      _marker = /*#__PURE__*/_react["default"].cloneElement(renderedMarker, {
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
          belowMarkerRef.current = node;
          // Call the original ref, if any
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
InfiniteScroll.propTypes = _propTypes.InfiniteScrollPropTypes;