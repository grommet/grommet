'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.smallSize = smallSize;
// (C) Copyright 2014 Hewlett Packard Enterprise Development LP

/*
 * Responsive is a utility for tracking the display size.
 * It aligns with CSS media queries.
 */

var SMALL_WIDTH_EM = 44.9375; // align with _settings.responsive.scss

function smallSize() {
  var fontSize = '16px';
  // unit tests don't have getComputedStyle
  if (window.getComputedStyle) {
    fontSize = window.getComputedStyle(document.documentElement).fontSize;
  }
  return SMALL_WIDTH_EM * parseFloat(fontSize);
}

exports.default = {

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
      timer: undefined,
      small: undefined,
      smallSize: this.smallSize()
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
    // Don't debounce so we align more closely with how the stylesheets are
    // processed.
    responsive.layout();
  },
  _check: function _check(responsive) {
    if (window.innerWidth <= responsive.smallSize) {
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
  },


  smallSize: smallSize
};