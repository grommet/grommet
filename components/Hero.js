'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames3 = require('classnames');

var _classnames4 = _interopRequireDefault(_classnames3);

var _CSSClassnames = require('../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

var _Responsive = require('../utils/Responsive');

var _DOM = require('../utils/DOM');

var _Box = require('./Box');

var _Box2 = _interopRequireDefault(_Box);

var _Image = require('./Image');

var _Image2 = _interopRequireDefault(_Image);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2016 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.HERO;
var BACKGROUND_COLOR_INDEX = _CSSClassnames2.default.BACKGROUND_COLOR_INDEX;

var Hero = function (_Component) {
  _inherits(Hero, _Component);

  function Hero(props, context) {
    _classCallCheck(this, Hero);

    var _this = _possibleConstructorReturn(this, (Hero.__proto__ || Object.getPrototypeOf(Hero)).call(this, props, context));

    _this._onResize = _this._onResize.bind(_this);
    _this._layout = _this._layout.bind(_this);
    _this.state = {};
    return _this;
  }

  _createClass(Hero, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      window.addEventListener('resize', this._onResize);
      this._layout();
      this._setDarkBackground();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.backgroundColorIndex !== this.props.backgroundColorIndex) {
        this.setState({ updateDarkBackground: true });
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this.state.updateDarkBackground) {
        this.setState({ updateDarkBackground: false });
        this._setDarkBackground();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('resize', this._onResize);
      if (this._checkBackground) {
        this._checkBackground.stop();
      }
    }
  }, {
    key: '_onResize',
    value: function _onResize() {
      clearTimeout(this._resizeTimer);
      this._resizeTimer = setTimeout(this._layout, 50);
    }
  }, {
    key: '_layout',
    value: function _layout() {
      var container = this._containerRef;
      if (container) {
        var responsiveSmall = container.offsetWidth < (0, _Responsive.smallSize)() ? true : false;
        this.setState({ responsiveSmall: responsiveSmall });
      }
    }
  }, {
    key: '_setDarkBackground',
    value: function _setDarkBackground() {
      var _this2 = this;

      var backgroundColorIndex = this.props.backgroundColorIndex;

      var container = this._containerRef;
      if (this._checkBackground) {
        this._checkBackground.stop();
      }
      this._checkBackground = (0, _DOM.checkDarkBackground)(backgroundColorIndex, container, function (darkBackground) {
        return _this2.setState({ darkBackground: darkBackground });
      });
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
    key: 'oldRender',
    value: function oldRender() {
      var _classnames;

      var _props = this.props,
          backgroundImage = _props.backgroundImage,
          backgroundVideo = _props.backgroundVideo,
          children = _props.children,
          className = _props.className,
          colorIndex = _props.colorIndex,
          flush = _props.flush,
          image = _props.image,
          justify = _props.justify,
          responsiveBackgroundPosition = _props.responsiveBackgroundPosition,
          separator = _props.separator,
          size = _props.size,
          props = _objectWithoutProperties(_props, ['backgroundImage', 'backgroundVideo', 'children', 'className', 'colorIndex', 'flush', 'image', 'justify', 'responsiveBackgroundPosition', 'separator', 'size']);

      var responsiveSmall = this.state.responsiveSmall;


      var classes = (0, _classnames4.default)(CLASS_ROOT, (_classnames = {}, _defineProperty(_classnames, CLASS_ROOT + '--' + size, size), _defineProperty(_classnames, CLASS_ROOT + '--bg-' + responsiveBackgroundPosition, responsiveBackgroundPosition), _defineProperty(_classnames, CLASS_ROOT + '--mobile-separator', separator), _classnames), className);

      var full = flush ? 'horizontal' : false;
      var pad = flush ? 'none' : 'large';

      var background = void 0;
      if (backgroundImage) {
        background = _react2.default.createElement(_Box2.default, { containerClassName: CLASS_ROOT + '__background',
          appCentered: true, pad: pad,
          backgroundImage: 'url(' + backgroundImage + ')', full: full });
      } else if (backgroundVideo) {
        background = _react2.default.createElement(
          _Box2.default,
          { className: CLASS_ROOT + '__background ' + CLASS_ROOT + '__background-video' },
          backgroundVideo
        );
      }

      var imageMarkup = void 0;
      if (image) {
        if (typeof image === 'string') {
          imageMarkup = _react2.default.createElement(_Image2.default, { src: image });
        } else {
          imageMarkup = image;
        }
      }

      var contents = void 0;
      if (justify === 'center') {
        contents = _react2.default.createElement(
          _Box2.default,
          { className: CLASS_ROOT + '__overlay', justify: justify,
            align: 'center', primary: true, full: full, direction: 'row' },
          _react2.default.createElement(
            _Box2.default,
            { pad: { horizontal: 'large', vertical: 'large',
                between: 'medium' } },
            children
          )
        );
      } else {
        contents = _react2.default.createElement(
          _Box2.default,
          { className: CLASS_ROOT + '__overlay', justify: 'end', align: 'center',
            primary: true, full: full, direction: 'row',
            reverse: responsiveSmall ? false : justify === 'start' },
          _react2.default.createElement(
            _Box2.default,
            { basis: '1/2', justify: 'center', align: 'center' },
            imageMarkup
          ),
          _react2.default.createElement(
            _Box2.default,
            { basis: '1/2',
              pad: { horizontal: 'large', vertical: 'large', between: 'medium' } },
            children
          )
        );
      }

      return _react2.default.createElement(
        _Box2.default,
        _extends({}, props, { className: classes,
          colorIndex: responsiveSmall ? 'light-1' : colorIndex }),
        background,
        contents
      );
    }
  }, {
    key: 'newRender',
    value: function newRender() {
      var _classnames2,
          _this3 = this;

      var _props2 = this.props,
          background = _props2.background,
          backgroundColorIndex = _props2.backgroundColorIndex,
          children = _props2.children,
          className = _props2.className,
          size = _props2.size,
          props = _objectWithoutProperties(_props2, ['background', 'backgroundColorIndex', 'children', 'className', 'size']);

      delete props.colorIndex;
      delete props.flush;
      delete props.justify;
      delete props.responsiveBackgroundPosition;
      var _state = this.state,
          darkBackground = _state.darkBackground,
          responsiveSmall = _state.responsiveSmall;


      var classes = (0, _classnames4.default)(CLASS_ROOT, (_classnames2 = {}, _defineProperty(_classnames2, CLASS_ROOT + '--' + size, size), _defineProperty(_classnames2, this._backgroundContextClass(darkBackground), !responsiveSmall && backgroundColorIndex), _defineProperty(_classnames2, CLASS_ROOT + '--stack', responsiveSmall), _classnames2), className);

      var backgroundContainer = void 0;
      if (background) {
        backgroundContainer = _react2.default.createElement(
          'div',
          { ref: function ref(_ref) {
              return _this3._backgroundRef = _ref;
            },
            className: CLASS_ROOT + '__background' },
          background
        );
      }

      return _react2.default.createElement(
        'div',
        _extends({ ref: function ref(_ref2) {
            return _this3._containerRef = _ref2;
          },
          className: classes }, props),
        backgroundContainer,
        _react2.default.createElement(
          'div',
          { className: CLASS_ROOT + '__foreground' },
          children
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _props3 = this.props,
          backgroundImage = _props3.backgroundImage,
          backgroundVideo = _props3.backgroundVideo,
          image = _props3.image;

      if (backgroundImage || backgroundVideo || image) {
        console.warn('backgroundImage, backgroundVideo, and image are ' + 'deprecated in Grommet\'s Hero component. Use background instead.');
        return this.oldRender();
      }
      return this.newRender();
    }
  }]);

  return Hero;
}(_react.Component);

Hero.displayName = 'Hero';
exports.default = Hero;


Hero.propTypes = {
  background: _propTypes2.default.element,
  backgroundColorIndex: _propTypes2.default.string,
  size: _propTypes2.default.oneOf(['small', 'medium', 'large']),
  // below props are all deprecated
  backgroundImage: _propTypes2.default.string,
  backgroundPosition: _propTypes2.default.oneOf(['left', 'center', 'right']),
  backgroundVideo: _propTypes2.default.element,
  colorIndex: _propTypes2.default.string,
  flush: _propTypes2.default.bool,
  image: _propTypes2.default.string,
  justify: _propTypes2.default.oneOf(['start', 'center', 'end']),
  responsiveBackgroundPosition: _propTypes2.default.oneOf(['left', 'center', 'right']),
  separator: _propTypes2.default.bool
};

Hero.defaultProps = {
  size: 'medium',
  // deprecated
  colorIndex: 'grey-2',
  flush: true,
  justify: 'end',
  responsiveBackgroundPosition: 'center'
};
module.exports = exports['default'];