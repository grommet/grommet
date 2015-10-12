// (C) Copyright 2014 Hewlett-Packard Development Company, L.P.

var DOM = require('../utils/DOM');

var SCROLL_MORE_DELAY = 500; // when the user scrolls
var SCROLL_MORE_INITIAL_DELAY = 50; // when we start out at the bottom already

var InfiniteScroll = {

  _infiniteScroll: {
    indicatorElement: null,
    scrollParent: null,
    onEnd: null
  },

  _onScroll: function () {
    // delay a bit to ride out quick users
    clearTimeout(this._infiniteScroll.scrollTimer);
    this._infiniteScroll.scrollTimer = setTimeout(function () {
      // are we at the bottom?
      var parentRect = this._infiniteScroll.scrollParent.getBoundingClientRect();
      var indicatorRect = this._infiniteScroll.indicatorElement.getBoundingClientRect();
      if (indicatorRect.bottom <= parentRect.bottom) {
        this._infiniteScroll.onEnd();
      }
    }.bind(this), SCROLL_MORE_DELAY);
  },

  startListeningForScroll: function (indicatorElement, onEnd) {
    this._infiniteScroll.onEnd = onEnd;
    this._infiniteScroll.indicatorElement = indicatorElement;
    this._infiniteScroll.scrollParent = DOM.findScrollParents(indicatorElement)[0];
    this._infiniteScroll.scrollParent.addEventListener("scroll", this._onScroll);
    // check in case we're already at the bottom
    if (this._infiniteScroll.scrollParent === document) {
      this._infiniteScroll.scrollTimer = setTimeout(onEnd, SCROLL_MORE_INITIAL_DELAY);
    }
  },

  stopListeningForScroll: function () {
    if (this._infiniteScroll.scrollParent) {
      clearTimeout(this._infiniteScroll.scrollTimer);
      this._infiniteScroll.scrollParent.removeEventListener("scroll", this._onScroll);
      this._infiniteScroll.scrollParent = null;
    }
  },

  componentWillUnmount: function () {
    this.stopListeningForScroll();
  }
};

module.exports = InfiniteScroll;
