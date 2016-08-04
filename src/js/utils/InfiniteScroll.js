// (C) Copyright 2014 Hewlett Packard Enterprise Development LP

import DOM from '../utils/DOM';

const SCROLL_MORE_DELAY = 500; // when the user scrolls
const SCROLL_MORE_INITIAL_DELAY = 50; // when we start out at the bottom already

function _evaluate(scrollState) {
  if (scrollState.scrollParent) {
    // are we at the bottom?
    var bottom;
    if (scrollState.scrollParent === document) {
      bottom = window.innerHeight;
    } else {
      bottom = scrollState.scrollParent.getBoundingClientRect().bottom;
    }
    var indicatorRect = scrollState.indicatorElement.getBoundingClientRect();
    // Only if bottom isn't zero. This can happen when content hasn't
    // arrived yet.
    // 10px offset is to ensure onEnd() gets called
    if (bottom && indicatorRect.bottom <= (bottom + 10)) {
      scrollState.onEnd();
    }
  }
}

function _onScroll(scrollState) {
  // delay a bit to ride out quick users
  clearTimeout(scrollState.scrollTimer);
  scrollState.scrollTimer = setTimeout(function () {
    _evaluate(scrollState);
  }, SCROLL_MORE_DELAY);
}

function _onResize(scrollState) {
  clearTimeout(scrollState.scrollTimer);
  scrollState.scrollTimer = setTimeout(function () {
    _evaluate(scrollState);
  }, SCROLL_MORE_DELAY);
}

export default {

  startListeningForScroll (indicatorElement, onEnd) {
    var scrollState = {
      onEnd: onEnd,
      indicatorElement: indicatorElement,
      scrollParent: DOM.findScrollParents(indicatorElement)[0]
    };

    scrollState._onResize = _onResize.bind(null, scrollState);
    scrollState._onScroll = _onScroll.bind(null, scrollState);

    scrollState.scrollParent.addEventListener("scroll", scrollState._onScroll);
    window.addEventListener("resize", scrollState._onResize);
    // check in case we're already at the bottom and the indicator is visible
    if (scrollState.scrollParent === document) {
      var rect = indicatorElement.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        scrollState.scrollTimer = setTimeout(onEnd, SCROLL_MORE_INITIAL_DELAY);
      }
    }
    return scrollState;
  },

  stopListeningForScroll (scrollState) {
    if (scrollState.scrollParent) {
      clearTimeout(scrollState.scrollTimer);
      scrollState.scrollParent.removeEventListener("scroll",
        scrollState._onScroll);
      window.removeEventListener("resize", scrollState._onResize);
      scrollState.scrollParent = null;
    }
  }
};
