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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _CSSClassnames = require('../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

var _View = require('./icons/base/View');

var _View2 = _interopRequireDefault(_View);

var _Intl = require('../utils/Intl');

var _Intl2 = _interopRequireDefault(_Intl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.PASSWORD_INPUT;
var INPUT = _CSSClassnames2.default.INPUT;

var PasswordInput = function (_Component) {
  _inherits(PasswordInput, _Component);

  function PasswordInput() {
    _classCallCheck(this, PasswordInput);

    var _this = _possibleConstructorReturn(this, (PasswordInput.__proto__ || Object.getPrototypeOf(PasswordInput)).call(this));

    _this.state = {
      showPassword: false
    };
    return _this;
  }

  _createClass(PasswordInput, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          className = _props.className,
          rest = _objectWithoutProperties(_props, ['className']);

      var showPassword = this.state.showPassword;
      var intl = this.context.intl;

      var classes = (0, _classnames2.default)(CLASS_ROOT, className);

      return _react2.default.createElement(
        'div',
        { className: classes },
        _react2.default.createElement('input', _extends({}, rest, { ref: function ref(_ref) {
            return _this2.inputRef = _ref;
          },
          type: showPassword ? 'text' : 'password',
          className: INPUT + ' ' + CLASS_ROOT + '__input' })),
        _react2.default.createElement(_Button2.default, { className: CLASS_ROOT + '__control',
          a11yTitle: _Intl2.default.getMessage(intl, 'Show Password'),
          icon: _react2.default.createElement(_View2.default, { colorIndex: showPassword ? 'brand' : undefined }),
          onClick: function onClick() {
            return _this2.setState({
              showPassword: !_this2.state.showPassword });
          } })
      );
    }
  }]);

  return PasswordInput;
}(_react.Component);

PasswordInput.displayName = 'PasswordInput';
exports.default = PasswordInput;


PasswordInput.propTypes = {
  className: _propTypes2.default.string
};

PasswordInput.contextTypes = {
  intl: _propTypes2.default.object
};
module.exports = exports['default'];