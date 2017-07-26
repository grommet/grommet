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

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _CSSClassnames = require('../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.RADIO_BUTTON;

var RadioButton = function (_Component) {
  _inherits(RadioButton, _Component);

  function RadioButton() {
    _classCallCheck(this, RadioButton);

    return _possibleConstructorReturn(this, (RadioButton.__proto__ || Object.getPrototypeOf(RadioButton)).apply(this, arguments));
  }

  _createClass(RadioButton, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          className = _props.className,
          label = _props.label,
          props = _objectWithoutProperties(_props, ['className', 'label']);

      var classes = (0, _classnames3.default)(CLASS_ROOT, _defineProperty({}, CLASS_ROOT + '--disabled', props.disabled), className);

      return _react2.default.createElement(
        'label',
        { htmlFor: props.id, className: classes },
        _react2.default.createElement('input', _extends({}, props, { className: CLASS_ROOT + '__input',
          type: 'radio' })),
        _react2.default.createElement('span', { className: CLASS_ROOT + '__control' }),
        _react2.default.createElement(
          'span',
          { className: CLASS_ROOT + '__label' },
          label
        )
      );
    }
  }]);

  return RadioButton;
}(_react.Component);

RadioButton.displayName = 'RadioButton';
exports.default = RadioButton;


RadioButton.propTypes = {
  checked: _propTypes2.default.bool,
  defaultChecked: _propTypes2.default.bool,
  disabled: _propTypes2.default.bool,
  id: _propTypes2.default.string.isRequired,
  label: _propTypes2.default.node.isRequired,
  name: _propTypes2.default.string,
  onChange: _propTypes2.default.func,
  value: _propTypes2.default.string
};
module.exports = exports['default'];