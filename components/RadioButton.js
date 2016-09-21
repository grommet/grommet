'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

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

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _CSSClassnames = require('../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CLASS_ROOT = _CSSClassnames2.default.RADIO_BUTTON; // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var RadioButton = function (_Component) {
  (0, _inherits3.default)(RadioButton, _Component);

  function RadioButton() {
    (0, _classCallCheck3.default)(this, RadioButton);
    return (0, _possibleConstructorReturn3.default)(this, (RadioButton.__proto__ || (0, _getPrototypeOf2.default)(RadioButton)).apply(this, arguments));
  }

  (0, _createClass3.default)(RadioButton, [{
    key: 'render',
    value: function render() {
      var classes = (0, _classnames3.default)(CLASS_ROOT, this.props.className, (0, _defineProperty3.default)({}, CLASS_ROOT + '--disabled', this.props.disabled));
      if (this.props.hasOwnProperty('value')) {
        console.warn('RadioButton: value prop has been deprecated. ' + 'Use checked instead.');
      }

      return _react2.default.createElement(
        'label',
        { className: classes },
        _react2.default.createElement('input', { className: CLASS_ROOT + '__input',
          id: this.props.id, name: this.props.name, type: 'radio',
          disabled: this.props.disabled,
          checked: this.props.checked,
          defaultChecked: this.props.defaultChecked,
          value: this.props.value,
          onChange: this.props.onChange }),
        _react2.default.createElement('span', { className: CLASS_ROOT + '__control' }),
        _react2.default.createElement(
          'span',
          { className: CLASS_ROOT + '__label' },
          this.props.label
        )
      );
    }
  }]);
  return RadioButton;
}(_react.Component);

RadioButton.displayName = 'RadioButton';
exports.default = RadioButton;
;

RadioButton.propTypes = {
  checked: _react.PropTypes.bool,
  defaultChecked: _react.PropTypes.bool,
  disabled: _react.PropTypes.bool,
  id: _react.PropTypes.string.isRequired,
  label: _react.PropTypes.node.isRequired,
  name: _react.PropTypes.string,
  onChange: _react.PropTypes.func
};
module.exports = exports['default'];