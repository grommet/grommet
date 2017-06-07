"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _DOM = require("./DOM");

var SCROLL_MORE_DELAY = 500; // when the user scrolls
// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var SCROLL_MORE_INITIAL_DELAY = 50; // when we start out at the bottom already

function _evaluate(scrollState) {
  (scrollState.scrollParents || []).forEach(function (scrollParent) {
    // are we at the bottom?
    var bottom;
    if (scrollParent === document) {
      bottom = window.innerHeight;
    } else {
      bottom = scrollParent.getBoundingClientRect().bottom;
    }
    var indicatorRect = scrollState.indicatorElement.getBoundingClientRect();
    // Only if bottom isn't zero. This can happen when content hasn't
    // arrived yet.
    // 10px offset is to ensure onEnd() gets called
    if (bottom && indicatorRect.bottom <= bottom + 10) {
      scrollState.onEnd();
    }
  });
}

function _onScroll(scrollState) {
  // delay a bit to ride out quick users
  clearTimeout(scrollState.scrollTimer);
  scrollState.scrollTimer = setTimeout(function () {
    return _evaluate(scrollState);
  }, SCROLL_MORE_DELAY);
}

function _onResize(scrollState) {
  clearTimeout(scrollState.scrollTimer);
  scrollState.scrollTimer = setTimeout(function () {
    return _evaluate(scrollState);
  }, SCROLL_MORE_DELAY);
}

exports.default = {
  startListeningForScroll: function startListeningForScroll(indicatorElement, onEnd) {
    var scrollState = {
      onEnd: onEnd,
      indicatorElement: indicatorElement,
      scrollParents: (0, _DOM.findScrollParents)(indicatorElement)
    };

    scrollState._onResize = _onResize.bind(this, scrollState);
    scrollState._onScroll = _onScroll.bind(this, scrollState);

    window.addEventListener("resize", scrollState._onResize);
    // check in case we're already at the bottom and the indicator is visible
    (scrollState.scrollParents || []).forEach(function (scrollParent) {
      scrollParent.addEventListener("scroll", scrollState._onScroll);
      if (scrollParent === document || scrollParent === document.body) {
        var rect = indicatorElement.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
          scrollState.scrollTimer = setTimeout(onEnd, SCROLL_MORE_INITIAL_DELAY);
        }
      }
    });
    return scrollState;
  },
  stopListeningForScroll: function stopListeningForScroll(scrollState) {
    (scrollState.scrollParents || []).forEach(function (scrollParent) {
      clearTimeout(scrollState.scrollTimer);
      scrollParent.removeEventListener("scroll", scrollState._onScroll);
      window.removeEventListener("resize", scrollState._onResize);
    });
    scrollState.scrollParents = undefined;
  }
};
module.exports = exports["default"];