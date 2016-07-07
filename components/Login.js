'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _CSSClassnames = require('../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.LOGIN;

var Login = function (_Component) {
  (0, _inherits3.default)(Login, _Component);

  function Login(props, context) {
    (0, _classCallCheck3.default)(this, Login);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Login).call(this, props, context));

    _this._adjustBackground = _this._adjustBackground.bind(_this);
    _this._onResize = _this._onResize.bind(_this);

    _this.state = {
      orientation: null
    };
    return _this;
  }

  (0, _createClass3.default)(Login, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.background) {
        window.addEventListener('resize', this._onResize);
        setTimeout(this._adjustBackground, 300);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.props.background) {
        window.removeEventListener('resize', this._onResize);
      }
    }
  }, {
    key: '_onResize',
    value: function _onResize() {
      this._adjustBackground();
    }
  }, {
    key: '_adjustBackground',
    value: function _adjustBackground() {
      // make sure the background always fills the screen, preserve aspect ratio
      var windowRatio = window.innerWidth / window.innerHeight;
      var image = this.refs.background;
      var imageRatio = image.scrollWidth / image.scrollHeight;
      this.setState({ orientation: windowRatio < imageRatio ? 'portrait' : 'landscape' });
    }
  }, {
    key: 'render',
    value: function render() {
      var background;
      if (this.props.background) {
        var classes = [CLASS_ROOT + '__background'];
        if (this.state.orientation) {
          classes.push(CLASS_ROOT + '__background--' + this.state.orientation);
        }
        background = _react2.default.createElement('img', { ref: 'background', className: classes.join(' '),
          src: this.props.background });
      }

      return _react2.default.createElement(
        'div',
        { className: CLASS_ROOT },
        background,
        _react2.default.createElement(
          'div',
          { className: CLASS_ROOT + '__container' },
          this.props.children
        )
      );
    }
  }]);
  return Login;
}(_react.Component);

Login.displayName = 'Login';
exports.default = Login;


Login.propTypes = {
  background: _react.PropTypes.string
};
module.exports = exports['default'];