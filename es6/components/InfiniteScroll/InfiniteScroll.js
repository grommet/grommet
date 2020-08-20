function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/* eslint-disable react/no-find-dom-node */
import React, { Component, useEffect, useMemo, useRef, useState } from 'react';
import { findDOMNode } from 'react-dom';
import { findScrollParent, findScrollParents, isNodeAfterScroll, isNodeBeforeScroll } from '../../utils';
import { Box } from '../Box';

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
}(Component);

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
  var lastPage = useMemo(function () {
    return Math.floor(items.length / step);
  }, [items.length, step]); // the first page we are displaying

  var _useState = useState(0),
      beginPage = _useState[0],
      setBeginPage = _useState[1]; // the last page we are displaying


  var _useState2 = useState(show ? Math.floor((show + step) / step) - 1 : 0),
      endPage = _useState2[0],
      setEndPage = _useState2[1]; // how tall we've measured a page to be


  var _useState3 = useState(),
      pageHeight = _useState3[0],
      setPageHeight = _useState3[1]; // how much area a page requires


  var _useState4 = useState(),
      pageArea = _useState4[0],
      setPageArea = _useState4[1]; // whether the items are laid out in a grid instead of linearly


  var _useState5 = useState(),
      multiColumn = _useState5[0],
      setMultiColumn = _useState5[1]; // what we're waiting for onMore to give us


  var _useState6 = useState(0),
      pendingLength = _useState6[0],
      setPendingLength = _useState6[1];

  var belowMarkerRef = useRef();
  var firstPageItemRef = useRef();
  var lastPageItemRef = useRef();
  var showRef = useRef(); // calculating space based on where the first and last items being displayed
  // are located

  useEffect(function () {
    if (firstPageItemRef.current && lastPageItemRef.current && !pageHeight) {
      /* eslint-disable react/no-find-dom-node */
      var beginRect = firstPageItemRef.current.getBoundingClientRect ? firstPageItemRef.current.getBoundingClientRect() : findDOMNode(firstPageItemRef.current).getBoundingClientRect();
      var endRect = lastPageItemRef.current.getBoundingClientRect ? lastPageItemRef.current.getBoundingClientRect() : findDOMNode(lastPageItemRef.current).getBoundingClientRect(); // Need to adjust for cases such as show where first and last page item
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

  useEffect(function () {
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
      scrollParents = findScrollParents(belowMarkerRef.current);
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

  useEffect(function () {
    if (onMore && endPage === lastPage && items.length >= pendingLength) {
      // remember we've asked for more, so we don't keep asking if it takes
      // a while
      setPendingLength(items.length + 1);
      onMore();
    }
  }, [endPage, items.length, lastPage, onMore, pendingLength, step]); // scroll to any 'show'

  useEffect(function () {
    // ride out any animation delays, 100ms empirically measured
    var timer = setTimeout(function () {
      if (show && showRef.current) {
        var showNode = showRef.current.scrollIntoView ? showRef.current : findDOMNode(showRef.current);
        var scrollParent = findScrollParent(showNode);

        if (isNodeBeforeScroll(showNode, scrollParent)) {
          showNode.scrollIntoView(true);
        } else if (isNodeAfterScroll(showNode, scrollParent)) {
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
    var marker = /*#__PURE__*/React.createElement(Box, {
      key: "above",
      flex: false,
      height: beginPage * pageHeight + "px"
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
    var ref;
    var child = children(item, itemsIndex, ref); // Set firstPageItemRef & lastPageItemRef if we don't know the pageHeight.

    if (!pageHeight && itemsIndex === 0) {
      // We pass the ref we want to the children render function.
      // If we don't see that our ref was set, wrap it ("the old way").
      child = children(item, itemsIndex, firstPageItemRef);

      if (child.ref !== firstPageItemRef) {
        child = /*#__PURE__*/React.createElement(Ref, {
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
        child = /*#__PURE__*/React.createElement(Ref, {
          key: "last",
          ref: lastPageItemRef
        }, child);
      }
    } // Set showRef


    if (show && show === itemsIndex) {
      child = children(item, itemsIndex, showRef);

      if (child.ref !== showRef) {
        child = /*#__PURE__*/React.createElement(Ref, {
          key: "show",
          ref: showRef
        }, child);
      }
    }

    result.push(child);
  });

  if (endPage < lastPage || replace || onMore) {
    var _marker = /*#__PURE__*/React.createElement(Box, {
      key: "below",
      ref: belowMarkerRef,
      flex: false,
      height: (replace ? (lastPage - endPage) * pageHeight : 0) + "px"
    });

    if (renderMarker) {
      // need to give it a key
      _marker = /*#__PURE__*/React.cloneElement(renderMarker(_marker), {
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
export { InfiniteScrollWrapper as InfiniteScroll };