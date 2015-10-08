// (C) Copyright 2014 Hewlett-Packard Development Company, L.P.

/*
 * Scroll provides smooth scrolling.
 */

"use strict";

var SCROLL_STEPS = 25;

var Scroll = {

  _easeInOutQuad: function _easeInOutQuad(t) {
    return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  },

  // component: component to scroll
  // property: 'scrollTop' | 'scrollLeft'
  // delta: amount to scroll

  scrollBy: function scrollBy(component, property, delta) {
    clearInterval(this._scrollToTimer);
    var start = component[property];
    var position = start + delta;
    var step = 1;
    this._scrollToTimer = setInterval((function () {
      var next;
      var easing = this._easeInOutQuad(step / SCROLL_STEPS);
      if (position > start) {
        next = Math.min(position, Math.max(component[property], Math.round(start + (position - start) * easing)));
      } else {
        next = Math.max(position, Math.min(component[property], Math.round(start - (start - position) * easing)));
      }
      component[property] = next;
      step += 1;
      if (step > SCROLL_STEPS) {
        // we're done
        clearInterval(this._scrollToTimer);
      }
    }).bind(this), 8);
  }
};

module.exports = Scroll;