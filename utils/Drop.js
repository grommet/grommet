// (C) Copyright 2014 Hewlett Packard Enterprise Development LP

'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var DOM = require('../utils/DOM');

/*
 * Drop is a utility for rendering components like drop down menus layered above
 * their initiating controls.
 */

var VERTICAL_ALIGN_OPTIONS = ['top', 'bottom'];
var HORIZONTAL_ALIGN_OPTIONS = ['right', 'left'];

var Drop = {

  // How callers can validate a property for drop alignment which will be passed to add().
  alignPropType: React.PropTypes.shape({
    top: React.PropTypes.oneOf(VERTICAL_ALIGN_OPTIONS),
    bottom: React.PropTypes.oneOf(VERTICAL_ALIGN_OPTIONS),
    left: React.PropTypes.oneOf(HORIZONTAL_ALIGN_OPTIONS),
    right: React.PropTypes.oneOf(HORIZONTAL_ALIGN_OPTIONS)
  }),

  // Add a drop component.
  //
  // control - DOM element to anchor the overlay on
  // content - React node to render
  // align -
  // {
  //    top: top|bottom
  //    bottom: top|bottom
  //    left: left|right
  //    right: left|right
  // }

  add: function add(control, content, align) {
    // validate align
    if (align && align.top && VERTICAL_ALIGN_OPTIONS.indexOf(align.top) === -1) {
      console.warn("Warning: Invalid align.top value '" + align.top + "' supplied to Drop," + "expected one of [" + VERTICAL_ALIGN_OPTIONS.join(',') + "]");
    }
    if (align && align.bottom && VERTICAL_ALIGN_OPTIONS.indexOf(align.bottom) === -1) {
      console.warn("Warning: Invalid align.bottom value '" + align.bottom + "' supplied to Drop," + "expected one of [" + VERTICAL_ALIGN_OPTIONS.join(',') + "]");
    }
    if (align && align.left && HORIZONTAL_ALIGN_OPTIONS.indexOf(align.left) === -1) {
      console.warn("Warning: Invalid align.left value '" + align.left + "' supplied to Drop," + "expected one of [" + HORIZONTAL_ALIGN_OPTIONS.join(',') + "]");
    }
    if (align && align.right && HORIZONTAL_ALIGN_OPTIONS.indexOf(align.right) === -1) {
      console.warn("Warning: Invalid align.right value '" + align.right + "' supplied to Drop," + "expected one of [" + HORIZONTAL_ALIGN_OPTIONS.join(',') + "]");
    }
    align = align || {};

    // initialize data
    var drop = {
      control: control,
      align: {
        top: align.top,
        bottom: align.bottom,
        left: align.left,
        right: align.right
      }
    };
    if (!drop.align.top && !drop.align.bottom) {
      drop.align.top = "top";
    }
    if (!drop.align.left && !drop.align.right) {
      drop.align.left = "left";
    }

    // setup DOM
    drop.container = document.createElement('div');
    drop.container.className = 'drop';
    document.body.appendChild(drop.container);
    ReactDOM.render(content, drop.container);

    drop.scrollParents = DOM.findScrollParents(drop.control);
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
    ReactDOM.render(content, drop.container);
    // in case content changed, re-place
    setTimeout(this._place.bind(this, drop), 1);
  },

  _remove: function _remove(drop) {
    drop.scrollParents.forEach(function (scrollParent) {
      scrollParent.removeEventListener('scroll', drop.place);
    });
    window.removeEventListener('resize', drop.place);

    ReactDOM.unmountComponentAtNode(drop.container);
    document.body.removeChild(drop.container);
  },

  _place: function _place(drop) {
    var control = drop.control;
    var container = drop.container;
    var align = drop.align;
    var controlRect = control.getBoundingClientRect();
    var containerRect = container.getBoundingClientRect();
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;

    // clear prior styling
    container.style.left = '';
    container.style.width = '';
    container.style.top = '';

    var width = Math.min(Math.max(controlRect.width, containerRect.width), windowWidth);
    var left;
    var top;

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

    if (align.top) {
      if ('top' === align.top) {
        top = controlRect.top;
      } else if ('bottom' === align.top) {
        top = controlRect.top + controlRect.height;
      }
    } else if (align.bottom) {
      if ('top' === align.bottom) {
        top = controlRect.top - containerRect.height;
      } else if ('bottom' === align.bottom) {
        top = controlRect.top + controlRect.height - containerRect.height;
      }
    }
    if (top + containerRect.height > windowHeight) {
      // For now, just slide up so we can see it.
      // TODO: when we don't want to cover the control, like with SearchInput and Calendar,
      // add bottom margin to the control to allow the user to scroll down if needed.
      if (align.top === 'bottom') {
        top = controlRect.top - containerRect.height;
      } else {
        top = Math.max(controlRect.bottom - containerRect.height, top - (top + containerRect.height - windowHeight));
      }
    } else if (top < 0) {
      top = 0;
    }

    container.style.left = '' + left + 'px';
    container.style.width = '' + width + 'px';
    container.style.top = '' + top + 'px';
  }
};

module.exports = Drop;