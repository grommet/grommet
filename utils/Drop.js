'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dropAlignPropType = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

var _DOM = require('./DOM');

var _CSSClassnames = require('./CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

var _KeyboardAccelerators = require('./KeyboardAccelerators');

var _KeyboardAccelerators2 = _interopRequireDefault(_KeyboardAccelerators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.DROP;
var BACKGROUND_COLOR_INDEX = _CSSClassnames2.default.BACKGROUND_COLOR_INDEX;

/*
 * Drop is a utility for rendering components like drop down menus layered above
 * their initiating controls.
 */

var VERTICAL_ALIGN_OPTIONS = ['top', 'bottom'];
var HORIZONTAL_ALIGN_OPTIONS = ['right', 'left'];

var DropContents = function (_Component) {
  _inherits(DropContents, _Component);

  function DropContents(props, context) {
    _classCallCheck(this, DropContents);

    var _this = _possibleConstructorReturn(this, (DropContents.__proto__ || Object.getPrototypeOf(DropContents)).call(this, props, context));

    _this._processTab = _this._processTab.bind(_this);
    return _this;
  }

  _createClass(DropContents, [{
    key: 'getChildContext',
    value: function getChildContext() {
      var context = this.props.context;

      return _extends({}, context);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var focusControl = this.props.focusControl;

      if (focusControl) {
        this._keyboardHandlers = {
          tab: this._processTab
        };
        _KeyboardAccelerators2.default.startListeningToKeyboard(this, this._keyboardHandlers);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var focusControl = this.props.focusControl;

      if (focusControl) {
        _KeyboardAccelerators2.default.stopListeningToKeyboard(this, this._keyboardHandlers);
      }
    }
  }, {
    key: '_processTab',
    value: function _processTab(event) {
      var items = this._containerRef.getElementsByTagName('*');
      items = (0, _DOM.filterByFocusable)(items);
      if (!items || items.length === 0) {
        event.preventDefault();
      } else {
        if (event.shiftKey) {
          if (event.target === items[0]) {
            items[items.length - 1].focus();
            event.preventDefault();
          }
        } else if (event.target === items[items.length - 1]) {
          items[0].focus();
          event.preventDefault();
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          content = _props.content,
          focusControl = _props.focusControl;


      var anchorStep = void 0;
      if (focusControl) {
        anchorStep = _react2.default.createElement('a', { tabIndex: '-1', 'aria-hidden': 'true',
          className: CLASS_ROOT + '__anchor' });
      }
      return _react2.default.createElement(
        'div',
        { ref: function ref(_ref) {
            return _this2._containerRef = _ref;
          } },
        anchorStep,
        content
      );
    }
  }]);

  return DropContents;
}(_react.Component);

DropContents.displayName = 'DropContents';


DropContents.propTypes = {
  content: _propTypes2.default.node.isRequired,
  context: _propTypes2.default.any,
  focusControl: _propTypes2.default.bool
};

DropContents.childContextTypes = {
  history: _propTypes2.default.object,
  intl: _propTypes2.default.object,
  onDropChange: _propTypes2.default.func,
  router: _propTypes2.default.any,
  store: _propTypes2.default.object
};

var _normalizeOptions = function _normalizeOptions(options) {
  options = _extends({}, options);
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
  options.align = options.align || {};
  if (!options.align.top && !options.align.bottom) {
    options.align.top = "top";
  }
  if (!options.align.left && !options.align.right) {
    options.align.left = "left";
  }
  options.responsive = options.responsive !== false ? true : options.responsive;
  return options;
};

// Drop options:
//
// align: See dropAlignPropType
// className: PropTypes.string
// colorIndex: PropTypes.string
//    Background color
// context: PropTypes.object
//    React context to pass through
// focusControl: PropTypes.bool
//    Whether to focus inside the dropped content when added
// responsive: PropTypes.bool
//    Whether to dynamically re-place when resized
//

var Drop = function () {
  function Drop(control, content, options) {
    _classCallCheck(this, Drop);

    options = _normalizeOptions(options);
    var _options = options,
        context = _options.context,
        focusControl = _options.focusControl;

    // bind functions to instance

    this.render = this.render.bind(this);
    this.remove = this.remove.bind(this);
    this.place = this.place.bind(this);
    this._onResize = this._onResize.bind(this);
    this._control = control;

    // setup DOM
    var container = document.createElement('div');
    container.className = 'grommet ' + CLASS_ROOT + ' ' + (options.className || '');
    if (options.colorIndex) {
      container.className += ' ' + BACKGROUND_COLOR_INDEX + '-' + options.colorIndex;
    }

    // prepend in body to avoid browser scroll issues
    document.body.insertBefore(container, document.body.firstChild);

    (0, _reactDom.render)(_react2.default.createElement(DropContents, { content: content, context: context,
      focusControl: focusControl }), container);

    var scrollParents = (0, _DOM.findScrollParents)(control);

    // initialize state
    this.state = {
      container: container, control: control, initialFocusNeeded: focusControl, options: options,
      scrollParents: scrollParents
    };

    this._listen();

    // position content
    this.place();
  }

  _createClass(Drop, [{
    key: '_listen',
    value: function _listen() {
      var _this3 = this;

      var scrollParents = this.state.scrollParents;

      scrollParents.forEach(function (scrollParent) {
        scrollParent.addEventListener('scroll', _this3.place);
      });
      // we intentionally skipped debounce as we believe resizing
      // will not be a common action. Also the UI looks better if the Drop
      // doesn’t lag to align with the control component.
      window.addEventListener('resize', this._onResize);
    }
  }, {
    key: '_onResize',
    value: function _onResize() {
      var _this4 = this;

      var scrollParents = this.state.scrollParents;
      // we need to update scroll parents as Responsive options may change
      // the parent for the target element

      scrollParents.forEach(function (scrollParent) {
        scrollParent.removeEventListener('scroll', _this4.place);
      });

      var nextScrollParents = (0, _DOM.findScrollParents)(this._control);

      nextScrollParents.forEach(function (scrollParent) {
        scrollParent.addEventListener('scroll', _this4.place);
      });

      this.state.scrollParents = nextScrollParents;

      this.place();
    }
  }, {
    key: 'place',
    value: function place() {
      var _state = this.state,
          control = _state.control,
          container = _state.container,
          initialFocusNeeded = _state.initialFocusNeeded,
          _state$options = _state.options,
          align = _state$options.align,
          responsive = _state$options.responsive;

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

      // determine width
      var width = Math.min(Math.max(controlRect.width, containerRect.width), windowWidth);

      // set left position
      var left = void 0;
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
      var top = void 0,
          maxHeight = void 0;
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
          top = controlRect.bottom - containerRect.height;
          maxHeight = Math.max(controlRect.bottom, 0);
        } else {
          top = controlRect.top - containerRect.height;
          maxHeight = Math.max(controlRect.top, 0);
        }
      }

      // if we can't fit it all, see if there's more room the other direction
      if (containerRect.height > maxHeight) {
        // We need more room than we have.
        if (align.top && top > windowHeight / 2) {
          // We put it below, but there's more room above, put it above
          if (align.top === 'bottom') {
            if (responsive) {
              top = Math.max(controlRect.top - containerRect.height, 0);
            }
            maxHeight = controlRect.top;
          } else {
            if (responsive) {
              top = Math.max(controlRect.bottom - containerRect.height, 0);
            }
            maxHeight = controlRect.bottom;
          }
        } else if (align.bottom && maxHeight < windowHeight / 2) {
          // We put it above but there's more room below, put it below
          if (align.bottom === 'bottom') {
            if (responsive) {
              top = controlRect.top;
            }
            maxHeight = Math.min(windowHeight - top, windowHeight);
          } else {
            if (responsive) {
              top = controlRect.bottom;
            }
            maxHeight = Math.min(windowHeight - top, windowHeight - controlRect.height);
          }
        }
      }

      //for Chrome, Safari, and Opera, use document.body
      //for Firefox and IE, use document.documentElement
      var scrollTop = document.documentElement && document.documentElement.scrollTop || document.body.scrollTop;

      container.style.left = left + 'px';
      container.style.width = width + 'px';
      // We use position:absolute and the body element's position
      // to handle mobile browsers better. We used to use position:fixed
      // but that didn't work on mobile browsers as well.
      container.style.top = top + scrollTop + 'px';
      container.style.maxHeight = windowHeight - (top + scrollTop) + 'px';

      if (initialFocusNeeded) {
        // Now that we've placed it, focus on it
        this._focus();
      }
    }
  }, {
    key: '_focus',
    value: function _focus() {
      var container = this.state.container;

      this.state.originalFocusedElement = document.activeElement;
      if (!container.contains(document.activeElement)) {
        var anchor = container.querySelector(CLASS_ROOT + '__anchor');
        if (anchor) {
          anchor.focus();
          anchor.scrollIntoView();
        }
      }
      delete this.state.initialFocusNeeded;
    }
  }, {
    key: 'render',
    value: function render(content) {
      var _this5 = this;

      var _state2 = this.state,
          container = _state2.container,
          _state2$options = _state2.options,
          context = _state2$options.context,
          focusControl = _state2$options.focusControl;

      var originalScrollPosition = container.scrollTop;
      (0, _reactDom.render)(_react2.default.createElement(DropContents, { content: content, context: context,
        focusControl: focusControl }), container, function () {
        _this5.place();
        // reset container to its original scroll position
        container.scrollTop = originalScrollPosition;
      });
    }
  }, {
    key: 'remove',
    value: function remove() {
      var _this6 = this;

      var _state3 = this.state,
          container = _state3.container,
          originalFocusedElement = _state3.originalFocusedElement,
          scrollParents = _state3.scrollParents;

      scrollParents.forEach(function (scrollParent) {
        scrollParent.removeEventListener('scroll', _this6.place);
      });
      window.removeEventListener('resize', this._onResize);

      (0, _reactDom.unmountComponentAtNode)(container);
      document.body.removeChild(container);

      if (originalFocusedElement) {
        originalFocusedElement.focus();
      }

      this.state = undefined;
    }
  }]);

  return Drop;
}();

// How callers can validate a property for drop alignment which will be
// passed to add().


exports.default = Drop;
var dropAlignPropType = exports.dropAlignPropType = _propTypes2.default.shape({
  top: _propTypes2.default.oneOf(VERTICAL_ALIGN_OPTIONS),
  bottom: _propTypes2.default.oneOf(VERTICAL_ALIGN_OPTIONS),
  left: _propTypes2.default.oneOf(HORIZONTAL_ALIGN_OPTIONS),
  right: _propTypes2.default.oneOf(HORIZONTAL_ALIGN_OPTIONS)
});

Drop.add = function (control, content, options) {
  console.warn("Warning: Drop.add() is deprecated, use new Drop().");
  return new Drop(control, content, options);
};