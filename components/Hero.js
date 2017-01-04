'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

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

var CLASS_ROOT = _CSSClassnames2.default.HERO; // (C) Copyright 2016 Hewlett Packard Enterprise Development LP

var BACKGROUND_COLOR_INDEX = _CSSClassnames2.default.BACKGROUND_COLOR_INDEX;

var Hero = function (_Component) {
  (0, _inherits3.default)(Hero, _Component);

  function Hero(props, context) {
    (0, _classCallCheck3.default)(this, Hero);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Hero.__proto__ || (0, _getPrototypeOf2.default)(Hero)).call(this, props, context));

    _this._onResize = _this._onResize.bind(_this);
    _this._layout = _this._layout.bind(_this);
    _this.state = {};
    return _this;
  }

  (0, _createClass3.default)(Hero, [{
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

      if (backgroundColorIndex) {
        var container = this._containerRef;
        (0, _DOM.checkDarkBackground)(backgroundColorIndex, container, function (darkBackground) {
          return _this2.setState({ darkBackground: darkBackground });
        });
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
          props = (0, _objectWithoutProperties3.default)(_props, ['backgroundImage', 'backgroundVideo', 'children', 'className', 'colorIndex', 'flush', 'image', 'justify', 'responsiveBackgroundPosition', 'separator', 'size']);
      var responsiveSmall = this.state.responsiveSmall;


      var classes = (0, _classnames4.default)(CLASS_ROOT, (_classnames = {}, (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--' + size, size), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--bg-' + responsiveBackgroundPosition, responsiveBackgroundPosition), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--mobile-separator', separator), _classnames), className);

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
        (0, _extends3.default)({}, props, { className: classes,
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
          props = (0, _objectWithoutProperties3.default)(_props2, ['background', 'backgroundColorIndex', 'children', 'className', 'size']);

      delete props.colorIndex;
      delete props.flush;
      delete props.justify;
      delete props.responsiveBackgroundPosition;
      var _state = this.state,
          darkBackground = _state.darkBackground,
          responsiveSmall = _state.responsiveSmall;


      var classes = (0, _classnames4.default)(CLASS_ROOT, (_classnames2 = {}, (0, _defineProperty3.default)(_classnames2, CLASS_ROOT + '--' + size, size), (0, _defineProperty3.default)(_classnames2, this._backgroundContextClass(darkBackground), !responsiveSmall && backgroundColorIndex), (0, _defineProperty3.default)(_classnames2, CLASS_ROOT + '--stack', responsiveSmall), _classnames2), className);

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
        (0, _extends3.default)({ ref: function ref(_ref2) {
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
  background: _react.PropTypes.element,
  backgroundColorIndex: _react.PropTypes.string,
  size: _react.PropTypes.oneOf(['small', 'medium', 'large']),
  // below props are all deprecated
  backgroundImage: _react.PropTypes.string,
  backgroundPosition: _react.PropTypes.oneOf(['left', 'center', 'right']),
  backgroundVideo: _react.PropTypes.element,
  colorIndex: _react.PropTypes.string,
  flush: _react.PropTypes.bool,
  image: _react.PropTypes.string,
  justify: _react.PropTypes.oneOf(['start', 'center', 'end']),
  responsiveBackgroundPosition: _react.PropTypes.oneOf(['left', 'center', 'right']),
  separator: _react.PropTypes.bool
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