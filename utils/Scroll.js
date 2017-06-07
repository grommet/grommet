"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

/*
 * Scroll provides smooth scrolling.
 */

var SCROLL_STEPS = 25;

function easeInOutQuad(t) {
  return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

exports.default = {

  // component: component to scroll
  // property: 'scrollTop' | 'scrollLeft'
  // delta: amount to scroll
  // doneHandler: optional function called when the scroll is done

  scrollBy: function scrollBy(component, property, delta, doneHandler) {
    var _this = this;

    clearInterval(this._scrollToTimer);
    var start = component[property];
    var end = start + delta;
    var step = 1;
    this._scrollToTimer = setInterval(function () {
      var current = component[property];
      var next = void 0;
      var easing = easeInOutQuad(step / SCROLL_STEPS);
      if (end > start) {
        next = Math.min(end, Math.max(current, Math.round(start + (end - start) * easing)));
      } else {
        next = Math.max(end, Math.min(current, Math.round(start - (start - end) * easing)));
      }
      component[property] = next;
      step += 1;
      if (step > SCROLL_STEPS) {
        // we're done, but the browser/OS might still be easing from a
        // mouse wheel interaction. So, set it one more time after a bit.
        clearInterval(_this._scrollToTimer);
        _this._scrollToTimer = setTimeout(function () {
          component[property] = next;
          if (doneHandler) {
            doneHandler();
          }
        }, 200);
      }
    }, 8);
  }
};
module.exports = exports["default"];