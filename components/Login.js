'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var Login = function (_Component) {
  _inherits(Login, _Component);

  function Login(props, context) {
    _classCallCheck(this, Login);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Login).call(this, props, context));

    _this._adjustBackground = _this._adjustBackground.bind(_this);
    _this._onResize = _this._onResize.bind(_this);

    _this.state = {
      orientation: null
    };
    return _this;
  }

  _createClass(Login, [{
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
      var background = null;
      if (this.props.background) {
        var classes = ['login__background'];
        if (this.state.orientation) {
          classes.push('login__background--' + this.state.orientation);
        }
        background = _react2.default.createElement('img', { ref: 'background', className: classes.join(' '),
          src: this.props.background });
      }

      return _react2.default.createElement(
        'div',
        { className: "login" },
        background,
        _react2.default.createElement(
          'div',
          { className: "login__container" },
          this.props.children
        )
      );
    }
  }]);

  return Login;
}(_react.Component);

exports.default = Login;

Login.propTypes = {
  background: _react.PropTypes.string
};
module.exports = exports['default'];