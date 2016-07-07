'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _reactDom = require('react-dom');

var _DOM = require('./DOM');

var _DOM2 = _interopRequireDefault(_DOM);

var _CSSClassnames = require('./CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// (C) Copyright 2014 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.DROP;
var BACKGROUND_COLOR_INDEX = _CSSClassnames2.default.BACKGROUND_COLOR_INDEX;

/*
 * Drop is a utility for rendering components like drop down menus layered above
 * their initiating controls.
 */

var VERTICAL_ALIGN_OPTIONS = ['top', 'bottom'];
var HORIZONTAL_ALIGN_OPTIONS = ['right', 'left'];

exports.default = {

  // How callers can validate a property for drop alignment which will be passed to add().
  alignPropType: _react.PropTypes.shape({
    top: _react.PropTypes.oneOf(VERTICAL_ALIGN_OPTIONS),
    bottom: _react.PropTypes.oneOf(VERTICAL_ALIGN_OPTIONS),
    left: _react.PropTypes.oneOf(HORIZONTAL_ALIGN_OPTIONS),
    right: _react.PropTypes.oneOf(HORIZONTAL_ALIGN_OPTIONS)
  }),

  // Add a drop component.
  //
  // control - DOM element to anchor the overlay on
  // content - React node to render
  // options - {
  //   align: {
  //     top: top|bottom
  //     bottom: top|bottom
  //     left: left|right
  //     right: left|right
  //   },
  //   className: <string>
  //   colorIndex: <string>
  // }

  add: function add(control, content, options) {
    // normalize for older interface that just had align content
    if (options.top || options.bottom || options.left || options.right) {
      options = { align: options };
    }
    // validate align
    if (options && options.align && options.align.top && VERTICAL_ALIGN_OPTIONS.indexOf(options.align.top) === -1) {
      console.warn("Warning: Invalid align.top value '" + options.align.top + "' supplied to Drop," + "expected one of [" + VERTICAL_ALIGN_OPTIONS.join(',') + "]");
    }
    if (options.align && options.align.bottom && VERTICAL_ALIGN_OPTIONS.indexOf(options.align.bottom) === -1) {
      console.warn("Warning: Invalid align.bottom value '" + options.align.bottom + "' supplied to Drop," + "expected one of [" + VERTICAL_ALIGN_OPTIONS.join(',') + "]");
    }
    if (options.align && options.align.left && HORIZONTAL_ALIGN_OPTIONS.indexOf(options.align.left) === -1) {
      console.warn("Warning: Invalid align.left value '" + options.align.left + "' supplied to Drop," + "expected one of [" + HORIZONTAL_ALIGN_OPTIONS.join(',') + "]");
    }
    if (options.align && options.align.right && HORIZONTAL_ALIGN_OPTIONS.indexOf(options.align.right) === -1) {
      console.warn("Warning: Invalid align.right value '" + options.align.right + "' supplied to Drop," + "expected one of [" + HORIZONTAL_ALIGN_OPTIONS.join(',') + "]");
    }
    var align = options.align || {};

    // initialize data
    var drop = {
      control: control,
      options: (0, _extends3.default)({}, options, {
        align: {
          top: align.top,
          bottom: align.bottom,
          left: align.left,
          right: align.right
        }
      })
    };
    if (!drop.options.align.top && !drop.options.align.bottom) {
      drop.options.align.top = "top";
    }
    if (!drop.options.align.left && !drop.options.align.right) {
      drop.options.align.left = "left";
    }

    // setup DOM
    drop.container = document.createElement('div');
    drop.container.className = 'grommet ' + CLASS_ROOT + ' ' + (drop.options.className || '');
    if (drop.options.colorIndex) {
      drop.container.className += ' ' + BACKGROUND_COLOR_INDEX + '-' + drop.options.colorIndex;
    }
    // prepend in body to avoid browser scroll issues
    document.body.insertBefore(drop.container, document.body.firstChild);
    (0, _reactDom.render)(content, drop.container);

    drop.scrollParents = _DOM2.default.findScrollParents(drop.control);
    drop.place = this._place.bind(this, drop);
    drop.render = this._render.bind(this, drop);
    drop.remove = this._remove.bind(this, drop);

    drop.scrollParents.forEach(function (scrollParent) {
      scrollParent.addEventListener('scroll', drop.place);
    });
    window.addEventListener('resize', drop.place);

    // position content
    this._place(drop);

    return drop;
  },
  _render: function _render(drop, content) {
    (0, _reactDom.render)(content, drop.container);
    // in case content changed, re-place
    setTimeout(this._place.bind(this, drop), 1);
  },
  _remove: function _remove(drop) {
    drop.scrollParents.forEach(function (scrollParent) {
      scrollParent.removeEventListener('scroll', drop.place);
    });
    window.removeEventListener('resize', drop.place);

    (0, _reactDom.unmountComponentAtNode)(drop.container);
    document.body.removeChild(drop.container);
  },
  _place: function _place(drop) {
    var control = drop.control;
    var container = drop.container;
    var align = drop.options.align;
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;

    // clear prior styling
    container.style.left = '';
    container.style.width = '';
    container.style.top = '';
    container.style.maxHeight = '';

    // get bounds
    var controlRect = control.getBoundingClientRect();
    var containerRect = container.getBoundingClientRect();
    var bodyRect = document.body.getBoundingClientRect();

    // set width
    var width = Math.min(Math.max(controlRect.width, containerRect.width), windowWidth);

    // set left position
    var left;
    if (align.left) {
      if ('left' === align.left) {
        left = controlRect.left;
      } else if ('right' === align.left) {
        left = controlRect.left - width;
      }
    } else if (align.right) {
      if ('left' === align.right) {
        left = controlRect.left - width;
      } else if ('right' === align.right) {
        left = controlRect.left + controlRect.width - width;
      }
    }

    if (left + width > windowWidth) {
      left -= left + width - windowWidth;
    } else if (left < 0) {
      left = 0;
    }

    // set top position
    var top;
    var maxHeight;
    if (align.top) {
      if ('top' === align.top) {
        top = controlRect.top;
        maxHeight = Math.min(windowHeight - controlRect.top, windowHeight);
      } else {
        top = controlRect.bottom;
        maxHeight = Math.min(windowHeight - controlRect.bottom, windowHeight - controlRect.height);
      }
    } else if (align.bottom) {
      if ('bottom' === align.bottom) {
        top = Math.max(0, controlRect.bottom - containerRect.height);
        maxHeight = Math.max(controlRect.bottom, 0);
      } else {
        top = Math.max(0, controlRect.top - containerRect.height);
        maxHeight = Math.max(controlRect.top, 0);
      }
    }

    // if we can't fit it all, see if there's more room the other direction
    if (containerRect.height > maxHeight) {
      // We need more room than we have.
      if (align.top && top > windowHeight / 2) {
        // We put it below, but there's more room above, put it above
        if (align.top === 'bottom') {
          top = Math.max(controlRect.top - containerRect.height, 0);
          maxHeight = controlRect.top;
        } else {
          top = Math.max(controlRect.bottom - containerRect.height, 0);
          maxHeight = controlRect.bottom;
        }
      } else if (align.bottom && maxHeight < windowHeight / 2) {
        // We put it above but there's more room below, put it below
        if (align.bottom === 'bottom') {
          top = controlRect.top;
          maxHeight = Math.min(windowHeight - top, windowHeight);
        } else {
          top = controlRect.bottom;
          maxHeight = Math.min(windowHeight - top, windowHeight - controlRect.height);
        }
      }
    }

    container.style.left = left + 'px';
    container.style.width = width + 'px';
    // We use position:absolute and the body element's position
    // to handle mobile browsers better. We used to use position:fixed
    // but that didn't work on mobile browsers as well.
    container.style.top = top - bodyRect.top + 'px';
    container.style.maxHeight = maxHeight + 'px';
  }
};
module.exports = exports['default'];