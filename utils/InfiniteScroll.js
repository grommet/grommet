// (C) Copyright 2014 Hewlett Packard Enterprise Development LP

"use strict";

var DOM = require('../utils/DOM');

var SCROLL_MORE_DELAY = 500; // when the user scrolls
var SCROLL_MORE_INITIAL_DELAY = 50; // when we start out at the bottom already

function _onScroll(scrollState) {
  // delay a bit to ride out quick users
  clearTimeout(scrollState.scrollTimer);
  scrollState.scrollTimer = setTimeout(function () {
    if (scrollState.scrollParent) {
      // are we at the bottom?
      var parentRect = scrollState.scrollParent.getBoundingClientRect();
      var indicatorRect = scrollState.indicatorElement.getBoundingClientRect();
      if (indicatorRect.bottom <= parentRect.bottom) {
        scrollState.onEnd();
      }
    }
  }, SCROLL_MORE_DELAY);
}

var InfiniteScroll = {

  startListeningForScroll: function startListeningForScroll(indicatorElement, onEnd) {
    var scrollState = {
      onEnd: onEnd,
      indicatorElement: indicatorElement,
      scrollParent: DOM.findScrollParents(indicatorElement)[0]
    };
    scrollState.scrollParent.addEventListener("scroll", _onScroll.bind(null, scrollState));
    // check in case we're already at the bottom
    if (scrollState.scrollParent === document) {
      scrollState.scrollTimer = setTimeout(onEnd, SCROLL_MORE_INITIAL_DELAY);
    }
    return scrollState;
  },

  stopListeningForScroll: function stopListeningForScroll(scrollState) {
    if (scrollState.scrollParent) {
      clearTimeout(scrollState.scrollTimer);
      scrollState.scrollParent.removeEventListener("scroll", _onScroll);
      scrollState.scrollParent = null;
    }
  }
};

module.exports = InfiniteScroll;