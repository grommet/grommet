'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

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

var CLASS_ROOT = _CSSClassnames2.default.BOX; // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var BACKGROUND_COLOR_INDEX = _CSSClassnames2.default.BACKGROUND_COLOR_INDEX;
var LIGHT_HINT_REGEXP = /^light/;

var Box = function (_Component) {
  (0, _inherits3.default)(Box, _Component);

  function Box(props) {
    (0, _classCallCheck3.default)(this, Box);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Box.__proto__ || (0, _getPrototypeOf2.default)(Box)).call(this, props));

    _this.state = {
      darkBackground: props.colorIndex && !LIGHT_HINT_REGEXP.test(props.colorIndex),
      mouseActive: false
    };
    return _this;
  }

  (0, _createClass3.default)(Box, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          colorIndex = _props.colorIndex,
          onClick = _props.onClick;

      if (onClick) {
        var clickCallback = function () {
          if (this.boxContainerRef === document.activeElement) {
            onClick();
          }
        }.bind(this);

        _KeyboardAccelerators2.default.startListeningToKeyboard(this, {
          enter: clickCallback,
          space: clickCallback
        });
      }
      // Measure the actual background color brightness to determine whether
      // to set a dark or light context.
      if (colorIndex) {
        var darkBackground = 'dark' === colorIndex;
        if (!darkBackground) {
          var box = (0, _reactDom.findDOMNode)(this.boxContainerRef);
          darkBackground = (0, _DOM.hasDarkBackground)(box);
        }
        this.setState({ darkBackground: darkBackground });
      }
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
        var darkBackground = 'dark' === this.props.colorIndex;
        if (!darkBackground) {
          var box = (0, _reactDom.findDOMNode)(this.boxContainerRef);
          darkBackground = (0, _DOM.hasDarkBackground)(box);
        }
        this.setState({
          updateDarkBackground: false,
          darkBackground: darkBackground
        });
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.props.onClick) {
        _KeyboardAccelerators2.default.stopListeningToKeyboard(this);
      }
    }
  }, {
    key: '_normalize',
    value: function _normalize(string) {
      return string.replace('/', '-');
    }
  }, {
    key: '_addPropertyClass',
    value: function _addPropertyClass(classes, property) {
      var _this2 = this;

      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      var value = (options.object || this.props)[property];
      var elementName = options.elementName || CLASS_ROOT;
      var prefix = options.prefix || property;
      if (value) {
        if (typeof value === 'string') {
          classes.push(elementName + '--' + prefix + '-' + this._normalize(value));
        } else if ((typeof value === 'undefined' ? 'undefined' : (0, _typeof3.default)(value)) === 'object') {
          (0, _keys2.default)(value).forEach(function (key) {
            _this2._addPropertyClass(classes, key, {
              object: value, prefix: prefix + '-' + key });
          });
        } else {
          classes.push(elementName + '--' + this._normalize(prefix));
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props2 = this.props,
          a11yTitle = _props2.a11yTitle,
          appCentered = _props2.appCentered,
          backgroundImage = _props2.backgroundImage,
          children = _props2.children,
          className = _props2.className,
          colorIndex = _props2.colorIndex,
          containerClassName = _props2.containerClassName,
          focusable = _props2.focusable,
          id = _props2.id,
          onClick = _props2.onClick,
          _onBlur = _props2.onBlur,
          _onFocus = _props2.onFocus,
          _onMouseDown = _props2.onMouseDown,
          _onMouseUp = _props2.onMouseUp,
          pad = _props2.pad,
          primary = _props2.primary,
          role = _props2.role,
          size = _props2.size,
          tabIndex = _props2.tabIndex,
          tag = _props2.tag,
          texture = _props2.texture;
      var _state = this.state,
          darkBackground = _state.darkBackground,
          mouseActive = _state.mouseActive;

      var classes = [CLASS_ROOT];
      var containerClasses = [CLASS_ROOT + '__container'];
      var restProps = _Props2.default.omit(this.props, (0, _keys2.default)(Box.propTypes));
      this._addPropertyClass(classes, 'full');
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
        if ((typeof size === 'undefined' ? 'undefined' : (0, _typeof3.default)(size)) === 'object') {
          (0, _keys2.default)(size).forEach(function (key) {
            _this3._addPropertyClass(classes, key, { object: size });
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
          if (darkBackground) {
            containerClasses.push(BACKGROUND_COLOR_INDEX + '--dark');
          }
        }
        if (containerClassName) {
          containerClasses.push(containerClassName);
        }
      } else if (colorIndex) {
        classes.push(BACKGROUND_COLOR_INDEX + '-' + colorIndex);
        if (darkBackground) {
          classes.push(BACKGROUND_COLOR_INDEX + '--dark');
        } else {
          classes.push(BACKGROUND_COLOR_INDEX + '--light');
        }
      }

      var a11yProps = {};
      var clickableProps = {};
      if (onClick) {
        classes.push(CLASS_ROOT + "--clickable");
        clickableProps = {
          onMouseDown: function onMouseDown(event) {
            _this3.setState({ mouseActive: true });
            if (_onMouseDown) {
              _onMouseDown(event);
            }
          },
          onMouseUp: function onMouseUp(event) {
            _this3.setState({ mouseActive: false });
            if (_onMouseUp) {
              _onMouseUp(event);
            }
          },
          onFocus: function onFocus(event) {
            if (mouseActive === false) {
              _this3.setState({ focus: true });
            }
            if (_onFocus) {
              _onFocus(event);
            }
          },
          onBlur: function onBlur(event) {
            _this3.setState({ focus: false });
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
      style = (0, _extends3.default)({}, style, restProps.style);
      var textureMarkup = void 0;
      if ('object' === (typeof texture === 'undefined' ? 'undefined' : (0, _typeof3.default)(texture))) {
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
          (0, _extends3.default)({}, restProps, { ref: function ref(_ref) {
              return _this3.boxContainerRef = _ref;
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
          (0, _extends3.default)({}, restProps, { ref: function ref(_ref2) {
              return _this3.boxContainerRef = _ref2;
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
var PAD_SIZES = ['small', 'medium', 'large', 'none'];

Box.propTypes = {
  a11yTitle: _react.PropTypes.string,
  announce: _react.PropTypes.bool,
  align: _react.PropTypes.oneOf(['start', 'center', 'end', 'baseline', 'stretch']),
  alignContent: _react.PropTypes.oneOf(['start', 'center', 'end', 'between', 'around', 'stretch']),
  alignSelf: _react.PropTypes.oneOf(['start', 'center', 'end', 'stretch']),
  appCentered: _react.PropTypes.bool,
  backgroundImage: _react.PropTypes.string,
  basis: _react.PropTypes.oneOf(SIZES),
  colorIndex: _react.PropTypes.string,
  containerClassName: _react.PropTypes.string,
  direction: _react.PropTypes.oneOf(['row', 'column']),
  focusable: _react.PropTypes.bool,
  flex: _react.PropTypes.oneOf(['grow', 'shrink', true, false]),
  full: _react.PropTypes.oneOf([true, 'horizontal', 'vertical', false]),
  // remove in 1.0?
  onClick: _react.PropTypes.func,
  justify: _react.PropTypes.oneOf(['start', 'center', 'between', 'end']),
  margin: _react.PropTypes.oneOfType([_react.PropTypes.oneOf(MARGIN_SIZES), _react.PropTypes.shape({
    bottom: _react.PropTypes.oneOf(MARGIN_SIZES),
    horizontal: _react.PropTypes.oneOf(MARGIN_SIZES),
    left: _react.PropTypes.oneOf(MARGIN_SIZES),
    right: _react.PropTypes.oneOf(MARGIN_SIZES),
    top: _react.PropTypes.oneOf(MARGIN_SIZES),
    vertical: _react.PropTypes.oneOf(MARGIN_SIZES)
  })]),
  pad: _react.PropTypes.oneOfType([_react.PropTypes.oneOf(PAD_SIZES), _react.PropTypes.shape({
    between: _react.PropTypes.oneOf(PAD_SIZES),
    horizontal: _react.PropTypes.oneOf(PAD_SIZES),
    vertical: _react.PropTypes.oneOf(PAD_SIZES)
  })]),
  primary: _react.PropTypes.bool,
  reverse: _react.PropTypes.bool,
  responsive: _react.PropTypes.bool,
  role: _react.PropTypes.string,
  separator: _react.PropTypes.oneOf(['top', 'bottom', 'left', 'right', 'horizontal', 'vertical', 'all', 'none']),
  size: _react.PropTypes.oneOfType([_react.PropTypes.oneOf(['auto', 'xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge', 'full']), // remove in 1.0?, use basis
  _react.PropTypes.shape({
    height: _react.PropTypes.oneOfType([_react.PropTypes.oneOf(SIZES), _react.PropTypes.shape({
      max: _react.PropTypes.oneOf(FIXED_SIZES),
      min: _react.PropTypes.oneOf(FIXED_SIZES)
    })]),
    width: _react.PropTypes.oneOfType([_react.PropTypes.oneOf(SIZES), _react.PropTypes.shape({
      max: _react.PropTypes.oneOf(FIXED_SIZES),
      min: _react.PropTypes.oneOf(FIXED_SIZES)
    })])
  })]),
  tag: _react.PropTypes.string,
  textAlign: _react.PropTypes.oneOf(['left', 'center', 'right']),
  texture: _react.PropTypes.oneOfType([_react.PropTypes.node, _react.PropTypes.string]),
  wrap: _react.PropTypes.bool
};

Box.contextTypes = {
  intl: _react.PropTypes.object
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