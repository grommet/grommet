"use strict";

exports.__esModule = true;
exports.InfiniteScroll = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactDom = require("react-dom");

var _utils = require("../../utils");

var _Box = require("../Box");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var Ref = /*#__PURE__*/function (_Component) {
  _inheritsLoose(Ref, _Component);

  function Ref() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = Ref.prototype;

  _proto.render = function render() {
    var children = this.props.children;
    return children;
  };

  return Ref;
}(_react.Component);

var InfiniteScroll = function InfiniteScroll(_ref) {
  var children = _ref.children,
      _ref$items = _ref.items,
      items = _ref$items === void 0 ? [] : _ref$items,
      onMore = _ref.onMore,
      renderMarker = _ref.renderMarker,
      replace = _ref.replace,
      show = _ref.show,
      _ref$step = _ref.step,
      step = _ref$step === void 0 ? 50 : _ref$step;
  // the last page we have items for
  var lastPage = (0, _react.useMemo)(function () {
    return Math.floor(items.length / step);
  }, [items.length, step]); // the first page we are displaying

  var _useState = (0, _react.useState)(0),
      beginPage = _useState[0],
      setBeginPage = _useState[1]; // the last page we are displaying


  var _useState2 = (0, _react.useState)(show ? Math.floor((show + step) / step) - 1 : 0),
      endPage = _useState2[0],
      setEndPage = _useState2[1]; // how tall we've measured a page to be


  var _useState3 = (0, _react.useState)(),
      pageHeight = _useState3[0],
      setPageHeight = _useState3[1]; // how much area a page requires


  var _useState4 = (0, _react.useState)(),
      pageArea = _useState4[0],
      setPageArea = _useState4[1]; // whether the items are laid out in a grid instead of linearly


  var _useState5 = (0, _react.useState)(),
      multiColumn = _useState5[0],
      setMultiColumn = _useState5[1]; // what we're waiting for onMore to give us


  var _useState6 = (0, _react.useState)(0),
      pendingLength = _useState6[0],
      setPendingLength = _useState6[1];

  var belowMarkerRef = (0, _react.useRef)();
  var firstPageItemRef = (0, _react.useRef)();
  var lastPageItemRef = (0, _react.useRef)();
  var showRef = (0, _react.useRef)(); // calculating space based on where the first and last items being displayed
  // are located

  (0, _react.useEffect)(function () {
    if (firstPageItemRef.current && lastPageItemRef.current && !pageHeight) {
      /* eslint-disable react/no-find-dom-node */
      var beginRect = firstPageItemRef.current.getBoundingClientRect ? firstPageItemRef.current.getBoundingClientRect() : (0, _reactDom.findDOMNode)(firstPageItemRef.current).getBoundingClientRect();
      var endRect = lastPageItemRef.current.getBoundingClientRect ? lastPageItemRef.current.getBoundingClientRect() : (0, _reactDom.findDOMNode)(lastPageItemRef.current).getBoundingClientRect(); // Need to adjust for cases such as show where first and last page item
      // refs can be much larger than the step.

      var initialPage = show ? Math.floor(show / step) : 0;
      var nextPageHeight = (endRect.top + endRect.height - beginRect.top) / (initialPage + 1); // Check if the items are arranged in a single column or not.

      var nextMultiColumn = nextPageHeight / step < endRect.height;
      var nextPageArea = endRect.height * endRect.width * step;
      setPageHeight(nextPageHeight);
      setPageArea(nextPageArea);
      setMultiColumn(nextMultiColumn);
    }
  }, [pageHeight, step, show]); // scroll handling

  (0, _react.useEffect)(function () {
    var scrollParents;

    var onScroll = function onScroll() {
      var scrollParent = scrollParents[0]; // Determine the window into the first scroll parent

      var top;
      var height;
      var width;

      if (scrollParent === document) {
        top = document.documentElement.scrollTop || document.body.scrollTop;
        height = window.innerHeight;
        width = window.innerWidth;
      } else {
        top = scrollParent.scrollTop;
        var rect = scrollParent.getBoundingClientRect();
        height = rect.height;
        width = rect.width;
      } // Figure out which pages we should make visible based on the scroll
      // window.


      var offset = height / 4; // nextBeginPage will increment/decrement when using replace, otherwise
      // the beginPage will be at 0.

      var nextBeginPage = replace ? Math.min(lastPage, Math.max(0, multiColumn ? Math.floor(Math.max(0, top - offset) * width / pageArea) : Math.floor(Math.max(0, top - offset) / pageHeight))) : 0; // Increment nextEndPage when nearing end of current page

      var nextEndPage = Math.min(lastPage, Math.max(!replace && endPage || 0, multiColumn ? Math.ceil((top + height + offset) * width / pageArea) : Math.floor((top + height + offset) / pageHeight)));
      if (nextBeginPage !== beginPage) setBeginPage(nextBeginPage);
      if (nextEndPage !== endPage) setEndPage(nextEndPage);
    };

    if (pageHeight && belowMarkerRef.current) {
      scrollParents = (0, _utils.findScrollParents)(belowMarkerRef.current);
      scrollParents.forEach(function (scrollParent) {
        return scrollParent.addEventListener('scroll', onScroll);
      });
      onScroll();
    }

    return function () {
      if (scrollParents) {
        scrollParents.forEach(function (scrollParent) {
          return scrollParent.removeEventListener('scroll', onScroll);
        });
      }
    };
  }, [beginPage, endPage, lastPage, multiColumn, pageArea, pageHeight, replace]); // check if we need to ask for more

  (0, _react.useEffect)(function () {
    if (onMore && endPage === lastPage && items.length >= pendingLength) {
      // remember we've asked for more, so we don't keep asking if it takes
      // a while
      setPendingLength(items.length + 1);
      onMore();
    }
  }, [endPage, items.length, lastPage, onMore, pendingLength, step]); // scroll to any 'show'

  (0, _react.useEffect)(function () {
    // ride out any animation delays, 100ms empirically measured
    var timer = setTimeout(function () {
      if (show && showRef.current) {
        var showNode = showRef.current.scrollIntoView ? showRef.current : (0, _reactDom.findDOMNode)(showRef.current);
        var scrollParent = (0, _utils.findScrollParent)(showNode);

        if ((0, _utils.isNodeBeforeScroll)(showNode, scrollParent)) {
          showNode.scrollIntoView(true);
        } else if ((0, _utils.isNodeAfterScroll)(showNode, scrollParent)) {
          showNode.scrollIntoView(false);
        }
      }
    }, 100);
    return function () {
      return clearTimeout(timer);
    };
  }, [show]);
  var firstIndex = beginPage * step;
  var lastIndex = Math.min((endPage + 1) * step, items.length) - 1;
  var result = [];

  if (replace && pageHeight && firstIndex) {
    var marker = /*#__PURE__*/_react["default"].createElement(_Box.Box, {
      key: "above",
      flex: false,
      height: beginPage * pageHeight + "px"
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
    var ref;
    var child = children(item, itemsIndex, ref); // Set firstPageItemRef & lastPageItemRef if we don't know the pageHeight.

    if (!pageHeight && itemsIndex === 0) {
      // We pass the ref we want to the children render function.
      // If we don't see that our ref was set, wrap it ("the old way").
      child = children(item, itemsIndex, firstPageItemRef);

      if (child.ref !== firstPageItemRef) {
        child = /*#__PURE__*/_react["default"].createElement(Ref, {
          key: "first",
          ref: firstPageItemRef
        }, child);
      }
    }

    if (!pageHeight && (itemsIndex === step - 1 || itemsIndex === lastIndex)) {
      // If show && show > step, we only want a single lastPageItemRef and it
      // should be set at lastIndex. Ignore step - 1 scenario, otherwise will
      // create duplicates.
      child = show && show > step && itemsIndex === step - 1 ? child : children(item, itemsIndex, lastPageItemRef); // We pass the ref we want to the children render function.
      // If we don't see that our ref was set, wrap it ("the old way").

      if (child.ref !== lastPageItemRef && !(show && show > step && itemsIndex === step - 1)) {
        child = /*#__PURE__*/_react["default"].createElement(Ref, {
          key: "last",
          ref: lastPageItemRef
        }, child);
      }
    } // Set showRef


    if (show && show === itemsIndex) {
      child = children(item, itemsIndex, showRef);

      if (child.ref !== showRef) {
        child = /*#__PURE__*/_react["default"].createElement(Ref, {
          key: "show",
          ref: showRef
        }, child);
      }
    }

    result.push(child);
  });

  if (endPage < lastPage || replace || onMore) {
    var _marker = /*#__PURE__*/_react["default"].createElement(_Box.Box, {
      key: "below",
      ref: belowMarkerRef,
      flex: false,
      height: (replace ? (lastPage - endPage) * pageHeight : 0) + "px"
    });

    if (renderMarker) {
      // need to give it a key
      _marker = /*#__PURE__*/_react["default"].cloneElement(renderMarker(_marker), {
        key: 'below'
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
exports.InfiniteScroll = InfiniteScrollWrapper;