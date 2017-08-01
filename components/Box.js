'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

var _KeyboardAccelerators = require('../utils/KeyboardAccelerators');

var _KeyboardAccelerators2 = _interopRequireDefault(_KeyboardAccelerators);

var _Intl = require('../utils/Intl');

var _Intl2 = _interopRequireDefault(_Intl);

var _Props = require('../utils/Props');

var _Props2 = _interopRequireDefault(_Props);

var _DOM = require('../utils/DOM');

var _SkipLinkAnchor = require('./SkipLinkAnchor');

var _SkipLinkAnchor2 = _interopRequireDefault(_SkipLinkAnchor);

var _CSSClassnames = require('../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

var _Announcer = require('../utils/Announcer');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.BOX;
var BACKGROUND_COLOR_INDEX = _CSSClassnames2.default.BACKGROUND_COLOR_INDEX;

var Box = function (_Component) {
  _inherits(Box, _Component);

  function Box(props) {
    _classCallCheck(this, Box);

    var _this = _possibleConstructorReturn(this, (Box.__proto__ || Object.getPrototypeOf(Box)).call(this, props));

    _this.state = { mouseActive: false };
    return _this;
  }

  _createClass(Box, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var onClick = this.props.onClick;

      if (onClick) {
        var clickCallback = function clickCallback() {
          if (_this2.boxContainerRef === document.activeElement) {
            onClick();
          }
        };

        _KeyboardAccelerators2.default.startListeningToKeyboard(this, {
          enter: clickCallback,
          space: clickCallback
        });
      }

      this._setDarkBackground();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.colorIndex !== this.props.colorIndex) {
        if (nextProps.colorIndex) {
          this.setState({ updateDarkBackground: true });
        } else {
          this.setState({ darkBackground: undefined });
        }
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this.props.announce) {
        (0, _Announcer.announce)(this.boxContainerRef.textContent);
      }
      if (this.state.updateDarkBackground) {
        this.setState({ updateDarkBackground: false });
        this._setDarkBackground();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.props.onClick) {
        _KeyboardAccelerators2.default.stopListeningToKeyboard(this);
      }
      if (this._checkBackground) {
        this._checkBackground.stop();
      }
    }
  }, {
    key: '_setDarkBackground',
    value: function _setDarkBackground() {
      var _this3 = this;

      var colorIndex = this.props.colorIndex;

      var box = (0, _reactDom.findDOMNode)(this.boxContainerRef);
      if (this._checkBackground) {
        this._checkBackground.stop();
      }
      this._checkBackground = (0, _DOM.checkDarkBackground)(colorIndex, box, function (darkBackground) {
        return _this3.setState({ darkBackground: darkBackground });
      });
    }
  }, {
    key: '_normalize',
    value: function _normalize(string) {
      return string.replace('/', '-');
    }
  }, {
    key: '_addPropertyClass',
    value: function _addPropertyClass(classes, property) {
      var _this4 = this;

      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      var value = (options.object || this.props)[property];
      var elementName = options.elementName || CLASS_ROOT;
      var prefix = options.prefix || property;
      if (value) {
        if (typeof value === 'string') {
          classes.push(elementName + '--' + prefix + '-' + this._normalize(value));
        } else if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
          Object.keys(value).forEach(function (key) {
            _this4._addPropertyClass(classes, key, {
              object: value, prefix: prefix + '-' + key });
          });
        } else {
          classes.push(elementName + '--' + this._normalize(prefix));
        }
      }
    }
  }, {
    key: '_backgroundContextClass',
    value: function _backgroundContextClass(darkBackground) {
      var result = void 0;
      if (undefined === darkBackground) {
        result = BACKGROUND_COLOR_INDEX + '--pending';
      } else if (darkBackground) {
        result = BACKGROUND_COLOR_INDEX + '--dark';
      } else {
        result = BACKGROUND_COLOR_INDEX + '--light';
      }
      return result;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this5 = this;

      var _props = this.props,
          a11yTitle = _props.a11yTitle,
          appCentered = _props.appCentered,
          backgroundImage = _props.backgroundImage,
          children = _props.children,
          className = _props.className,
          colorIndex = _props.colorIndex,
          containerClassName = _props.containerClassName,
          focusable = _props.focusable,
          full = _props.full,
          id = _props.id,
          onClick = _props.onClick,
          _onBlur = _props.onBlur,
          _onFocus = _props.onFocus,
          _onMouseDown = _props.onMouseDown,
          _onMouseUp = _props.onMouseUp,
          pad = _props.pad,
          primary = _props.primary,
          role = _props.role,
          size = _props.size,
          tabIndex = _props.tabIndex,
          tag = _props.tag,
          texture = _props.texture;
      var _state = this.state,
          darkBackground = _state.darkBackground,
          mouseActive = _state.mouseActive;

      var classes = [CLASS_ROOT];
      var containerClasses = [CLASS_ROOT + '__container'];
      var restProps = _Props2.default.omit(this.props, Object.keys(Box.propTypes));
      this._addPropertyClass(classes, 'full');
      if (full && full.responsive === undefined) {
        // default is true for backwards compatibility sake
        classes.push(CLASS_ROOT + '--full-responsive');
      }
      this._addPropertyClass(classes, 'direction');
      this._addPropertyClass(classes, 'justify');
      this._addPropertyClass(classes, 'align');
      this._addPropertyClass(classes, 'alignContent', { prefix: 'align-content' });
      this._addPropertyClass(classes, 'alignSelf', { prefix: 'align-self' });
      this._addPropertyClass(classes, 'reverse');
      this._addPropertyClass(classes, 'responsive');
      this._addPropertyClass(classes, 'basis');
      this._addPropertyClass(classes, 'flex');
      this._addPropertyClass(classes, 'pad');
      this._addPropertyClass(classes, 'margin');
      this._addPropertyClass(classes, 'separator');
      this._addPropertyClass(classes, 'textAlign', { prefix: 'text-align' });
      this._addPropertyClass(classes, 'wrap');

      if (this.props.hasOwnProperty('flex')) {
        if (!this.props.flex) {
          classes.push(CLASS_ROOT + '--flex-off');
        }
      }
      if (size) {
        if ((typeof size === 'undefined' ? 'undefined' : _typeof(size)) === 'object') {
          Object.keys(size).forEach(function (key) {
            _this5._addPropertyClass(classes, key, { object: size });
          });
        } else {
          this._addPropertyClass(classes, 'size');
        }
        if (size) {
          if (!(size.width && size.width.max)) {
            // don't apply 100% max-width when size using size.width.max option
            classes.push(CLASS_ROOT + '--size');
          }
          if (size.width && size.width.max) {
            // allow widths to shrink, apply 100% width
            classes.push(CLASS_ROOT + '--width-max');
          }
        }
      }

      // needed to properly set flex-basis for 1/3 & 2/3 basis boxes
      if (pad && pad.between && children) {
        if (_react2.default.Children.count(children) % 3 === 0) {
          classes.push(CLASS_ROOT + '--pad-between-thirds');
        }
      }

      if (appCentered) {
        this._addPropertyClass(containerClasses, 'full', { elementName: CLASS_ROOT + '__container' });
        if (colorIndex) {
          containerClasses.push(BACKGROUND_COLOR_INDEX + '-' + colorIndex);
          containerClasses.push(this._backgroundContextClass(darkBackground));
        }
        if (containerClassName) {
          containerClasses.push(containerClassName);
        }
      } else if (colorIndex) {
        classes.push(BACKGROUND_COLOR_INDEX + '-' + colorIndex);
        classes.push(this._backgroundContextClass(darkBackground));
      }

      var a11yProps = {};
      var clickableProps = {};
      if (onClick) {
        classes.push(CLASS_ROOT + "--clickable");
        clickableProps = {
          onMouseDown: function onMouseDown(event) {
            _this5.setState({ mouseActive: true });
            if (_onMouseDown) {
              _onMouseDown(event);
            }
          },
          onMouseUp: function onMouseUp(event) {
            _this5.setState({ mouseActive: false });
            if (_onMouseUp) {
              _onMouseUp(event);
            }
          },
          onFocus: function onFocus(event) {
            if (mouseActive === false) {
              _this5.setState({ focus: true });
            }
            if (_onFocus) {
              _onFocus(event);
            }
          },
          onBlur: function onBlur(event) {
            _this5.setState({ focus: false });
            if (_onBlur) {
              _onBlur(event);
            }
          }
        };
        if (focusable) {
          if (this.state.focus) {
            classes.push(CLASS_ROOT + '--focus');
          }
          var boxLabel = typeof a11yTitle !== 'undefined' ? a11yTitle : _Intl2.default.getMessage(this.context.intl, 'Box');
          a11yProps.tabIndex = tabIndex || 0;
          a11yProps["aria-label"] = this.props['aria-label'] || boxLabel;
          a11yProps.role = role || 'group';
        }
      }

      var skipLinkAnchor = void 0;
      if (primary) {
        var mainContentLabel = _Intl2.default.getMessage(this.context.intl, 'Main Content');
        skipLinkAnchor = _react2.default.createElement(_SkipLinkAnchor2.default, { label: mainContentLabel });
      }

      if (className) {
        classes.push(className);
      }

      var style = {};
      if (texture && 'string' === typeof texture) {
        if (texture.indexOf('url(') !== -1) {
          style.backgroundImage = texture;
        } else {
          style.backgroundImage = 'url(' + texture + ')';
        }
      } else if (backgroundImage) {
        style.background = backgroundImage + " no-repeat center center";
        style.backgroundSize = "cover";
      }
      style = _extends({}, style, restProps.style);
      var textureMarkup = void 0;
      if ('object' === (typeof texture === 'undefined' ? 'undefined' : _typeof(texture))) {
        textureMarkup = _react2.default.createElement(
          'div',
          { className: CLASS_ROOT + "__texture" },
          texture
        );
      }

      var Component = tag;
      if (appCentered) {
        return _react2.default.createElement(
          'div',
          _extends({}, restProps, { ref: function ref(_ref) {
              return _this5.boxContainerRef = _ref;
            },
            className: containerClasses.join(' '),
            style: style, role: role }, a11yProps, clickableProps),
          skipLinkAnchor,
          _react2.default.createElement(
            Component,
            { id: id, className: classes.join(' ') },
            textureMarkup,
            children
          )
        );
      } else {
        return _react2.default.createElement(
          Component,
          _extends({}, restProps, { ref: function ref(_ref2) {
              return _this5.boxContainerRef = _ref2;
            },
            id: id, className: classes.join(' '), style: style,
            role: role, tabIndex: tabIndex,
            onClick: onClick }, a11yProps, clickableProps),
          skipLinkAnchor,
          textureMarkup,
          children
        );
      }
    }
  }]);

  return Box;
}(_react.Component);

Box.displayName = 'Box';
exports.default = Box;


var FIXED_SIZES = ['xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge'];
var RELATIVE_SIZES = ['full', '1/2', '1/3', '2/3', '1/4', '3/4'];
var SIZES = FIXED_SIZES.concat(RELATIVE_SIZES);
var MARGIN_SIZES = ['small', 'medium', 'large', 'none'];
var PAD_SIZES = ['small', 'medium', 'large', 'xlarge', 'none'];

Box.propTypes = {
  a11yTitle: _propTypes2.default.string,
  announce: _propTypes2.default.bool,
  align: _propTypes2.default.oneOf(['start', 'center', 'end', 'baseline', 'stretch']),
  alignContent: _propTypes2.default.oneOf(['start', 'center', 'end', 'between', 'around', 'stretch']),
  alignSelf: _propTypes2.default.oneOf(['start', 'center', 'end', 'stretch']),
  appCentered: _propTypes2.default.bool,
  backgroundImage: _propTypes2.default.string,
  basis: _propTypes2.default.oneOf(SIZES),
  colorIndex: _propTypes2.default.string,
  containerClassName: _propTypes2.default.string,
  direction: _propTypes2.default.oneOf(['row', 'column']),
  focusable: _propTypes2.default.bool,
  flex: _propTypes2.default.oneOf(['grow', 'shrink', true, false]),
  full: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.string, _propTypes2.default.shape({
    vertical: _propTypes2.default.bool,
    horizontal: _propTypes2.default.bool,
    responsive: _propTypes2.default.bool
  })]),
  // remove in 1.0?
  onClick: _propTypes2.default.func,
  justify: _propTypes2.default.oneOf(['start', 'center', 'between', 'end', 'around']),
  margin: _propTypes2.default.oneOfType([_propTypes2.default.oneOf(MARGIN_SIZES), _propTypes2.default.shape({
    bottom: _propTypes2.default.oneOf(MARGIN_SIZES),
    horizontal: _propTypes2.default.oneOf(MARGIN_SIZES),
    left: _propTypes2.default.oneOf(MARGIN_SIZES),
    right: _propTypes2.default.oneOf(MARGIN_SIZES),
    top: _propTypes2.default.oneOf(MARGIN_SIZES),
    vertical: _propTypes2.default.oneOf(MARGIN_SIZES)
  })]),
  pad: _propTypes2.default.oneOfType([_propTypes2.default.oneOf(PAD_SIZES), _propTypes2.default.shape({
    between: _propTypes2.default.oneOf(PAD_SIZES),
    horizontal: _propTypes2.default.oneOf(PAD_SIZES),
    vertical: _propTypes2.default.oneOf(PAD_SIZES)
  })]),
  primary: _propTypes2.default.bool,
  reverse: _propTypes2.default.bool,
  responsive: _propTypes2.default.bool,
  role: _propTypes2.default.string,
  separator: _propTypes2.default.oneOf(['top', 'bottom', 'left', 'right', 'horizontal', 'vertical', 'all', 'none']),
  size: _propTypes2.default.oneOfType([_propTypes2.default.oneOf(['auto', 'xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge', 'full']), // remove in 1.0?, use basis
  _propTypes2.default.shape({
    height: _propTypes2.default.oneOfType([_propTypes2.default.oneOf(SIZES), _propTypes2.default.shape({
      max: _propTypes2.default.oneOf(FIXED_SIZES),
      min: _propTypes2.default.oneOf(FIXED_SIZES)
    })]),
    width: _propTypes2.default.oneOfType([_propTypes2.default.oneOf(SIZES), _propTypes2.default.shape({
      max: _propTypes2.default.oneOf(FIXED_SIZES),
      min: _propTypes2.default.oneOf(FIXED_SIZES)
    })])
  })]),
  tag: _propTypes2.default.string,
  textAlign: _propTypes2.default.oneOf(['left', 'center', 'right']),
  texture: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.string]),
  wrap: _propTypes2.default.bool
};

Box.contextTypes = {
  intl: _propTypes2.default.object
};

Box.defaultProps = {
  announce: false,
  direction: 'column',
  pad: 'none',
  tag: 'div',
  responsive: true,
  focusable: true
};
module.exports = exports['default'];