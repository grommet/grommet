// (C) Copyright 2014 Hewlett Packard Enterprise Development LP

/*
 * Scroll provides smooth scrolling.
 */

const SCROLL_STEPS = 25;

export default {

  _easeInOutQuad (t) {
    return (t < .5 ?  2 * t * t : -1 + (4 - 2 * t) * t);
  },

  // component: component to scroll
  // property: 'scrollTop' | 'scrollLeft'
  // delta: amount to scroll

  scrollBy (component, property, delta) {
    clearInterval(this._scrollToTimer);
    var start = component[property];
    var position = start + delta;
    var step = 1;
    this._scrollToTimer = setInterval(function () {
      var next;
      var easing = this._easeInOutQuad(step / SCROLL_STEPS);
      if (position > start) {
        next = Math.min(position, Math.max(component[property],
          Math.round(start + ((position - start) * easing))));
      } else {
        next = Math.max(position, Math.min(component[property],
          Math.round(start - ((start - position) * easing))));
      }
      component[property] = next;
      step += 1;
      if (step > SCROLL_STEPS) {
        // we're done, but the browser/OS might still be easing from a
        // mouse wheel interaction. So, set it one more time after a bit.
        clearInterval(this._scrollToTimer);
        this._scrollToTimer = setTimeout(function () {
          component[property] = next;
        }, 200);
      }
    }.bind(this), 8);
  }
};
