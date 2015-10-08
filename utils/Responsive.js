// (C) Copyright 2014 Hewlett-Packard Development Company, L.P.

/*
 * Responsive is a utility for tracking the display size.
 * It aligns with CSS media queries.
 */

'use strict';

var SMALL_WIDTH_EM = 44.9375; // align with _settings.responsive.scss

function _smallSize() {
  var fontSize = '16px';
  // unit tests don't have getComputedStyle
  if (window.getComputedStyle) {
    fontSize = window.getComputedStyle(document.documentElement).fontSize;
  }
  return SMALL_WIDTH_EM * parseFloat(fontSize);
}

var Responsive = {

  // Track responsive sizing.
  //
  // Example:
  // inside componentDidMount()
  //   this._responsive = Responsive.start(this._onResponsive);
  // inside componentWillUnmount()
  //   this._responsive.stop()

  start: function start(func) {
    var responsive = {
      func: func,
      timer: null,
      small: null,
      smallSize: _smallSize()
    };
    responsive.onResize = this._onResize.bind(this, responsive);
    responsive.layout = this._check.bind(this, responsive);
    responsive.stop = this._stop.bind(this, responsive);
    window.addEventListener('resize', responsive.onResize);
    responsive.layout();
    return responsive;
  },

  _stop: function _stop(responsive) {
    clearTimeout(responsive.timer);
    window.removeEventListener('resize', responsive.onResize);
  },

  _onResize: function _onResize(responsive) {
    // debounce
    clearTimeout(responsive.timer);
    responsive.timer = setTimeout(responsive.layout, 50);
  },

  _check: function _check(responsive) {
    if (window.innerWidth < responsive.smallSize) {
      if (!responsive.small) {
        responsive.small = true;
        responsive.func(true);
      }
    } else {
      if (false !== responsive.small) {
        responsive.small = false;
        responsive.func(false);
      }
    }
  }
};

module.exports = Responsive;