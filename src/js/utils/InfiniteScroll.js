// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import { findScrollParents } from './DOM';

const SCROLL_MORE_DELAY = 500; // when the user scrolls
const SCROLL_MORE_INITIAL_DELAY = 50; // when we start out at the bottom already

function _evaluate(scrollState) {
  (scrollState.scrollParents || []).forEach((scrollParent) => {
    // are we at the bottom?
    let bottom;
    if (scrollParent === document) {
      bottom = window.innerHeight;
    } else {
      bottom = scrollParent.getBoundingClientRect().bottom;
    }
    if (scrollState.onEnd ) {
      let indicatorRect =
        scrollState.endIndicatorElement.getBoundingClientRect();
      // Only if bottom isn't zero. This can happen when content hasn't
      // arrived yet.
      // 10px offset is to ensure onEnd() gets called
      if (bottom && indicatorRect.bottom <= (bottom + 10)) {
        scrollState.onEnd();
      }
    }
    if (scrollState.onTop ) {
      let indicatorRect =
        scrollState.startIndicatorElement.getBoundingClientRect();
      // If the bottom position is 0 we're right at it. Below it its negative
      // and scrolling too far up its positive.
      if (indicatorRect.bottom > 0  ) {
        scrollState.onTop();
      }
    }
  });
}

function _onScroll(scrollState) {
  // delay a bit to ride out quick users
  clearTimeout(scrollState.scrollTimer);
  scrollState.scrollTimer = setTimeout(() => _evaluate(scrollState),
    SCROLL_MORE_DELAY);
}

function _onResize(scrollState) {
  clearTimeout(scrollState.scrollTimer);
  scrollState.scrollTimer = setTimeout(() => _evaluate(scrollState),
    SCROLL_MORE_DELAY);
}

export default {

  startListeningForScroll(
    endIndicatorElement,
    onEnd,
    startIndicatorElement,
    onTop) {

    var scrollState = {
      onEnd: onEnd,
      endIndicatorElement: endIndicatorElement,
      onTop: onTop,
      startIndicatorElement: startIndicatorElement,
      scrollParents: findScrollParents(endIndicatorElement ||
        startIndicatorElement)
    };

    scrollState._onResize = _onResize.bind(this, scrollState);
    scrollState._onScroll = _onScroll.bind(this, scrollState);

    window.addEventListener("resize", scrollState._onResize);
    // check in case we're already at the extreme and the indicator is visible
    (scrollState.scrollParents || []).forEach((scrollParent, idx) => {
      scrollParent.addEventListener("scroll", scrollState._onScroll);

      if (startIndicatorElement) {
        const scrollElement = scrollParent === document ?
          scrollParent.scrollingElement : scrollParent;

        const rect = startIndicatorElement.getBoundingClientRect();

        //If not enough data to scroll we'll need to load more...
        if (scrollElement.getBoundingClientRect().height +
          rect.bottom >=
          scrollElement.scrollHeight) {
          scrollState.scrollTimer = setTimeout(
            onTop, SCROLL_MORE_INITIAL_DELAY);
        } else if ( !idx) {
          //If we're scrolling we need to move the scrollbar down slightly so
          // as to not trigger the onTop() until the user needs it.
          //Only do this for the first scrolling parent
          scrollState.scrollTimer = setTimeout(
            () => {
              const updatedRect = startIndicatorElement.getBoundingClientRect();
              scrollElement.scrollTop = updatedRect.bottom + 10;
            }, SCROLL_MORE_INITIAL_DELAY);
        }
      }

      if (scrollParent === document || scrollParent === document.body) {
        if (endIndicatorElement) {
          const rect = endIndicatorElement.getBoundingClientRect();
          if (rect.top < window.innerHeight) {
            scrollState.scrollTimer = setTimeout(
              onEnd, SCROLL_MORE_INITIAL_DELAY
            );
          }
        }
      }
    });
    return scrollState;
  },

  stopListeningForScroll (scrollState) {
    (scrollState.scrollParents || []).forEach((scrollParent) => {
      clearTimeout(scrollState.scrollTimer);
      scrollParent.removeEventListener("scroll",
        scrollState._onScroll);
      window.removeEventListener("resize", scrollState._onResize);
    });
    scrollState.scrollParents = undefined;
  }
};
