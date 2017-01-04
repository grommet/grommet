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

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _CSSClassnames = require('../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CLASS_ROOT = _CSSClassnames2.default.CHECK_BOX; // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var CheckBox = function (_Component) {
  (0, _inherits3.default)(CheckBox, _Component);

  function CheckBox() {
    (0, _classCallCheck3.default)(this, CheckBox);
    return (0, _possibleConstructorReturn3.default)(this, (CheckBox.__proto__ || (0, _getPrototypeOf2.default)(CheckBox)).apply(this, arguments));
  }

  (0, _createClass3.default)(CheckBox, [{
    key: 'render',
    value: function render() {
      var _classnames;

      var _props = this.props,
          checked = _props.checked,
          className = _props.className,
          disabled = _props.disabled,
          label = _props.label,
          name = _props.name,
          onChange = _props.onChange,
          reverse = _props.reverse,
          toggle = _props.toggle,
          props = (0, _objectWithoutProperties3.default)(_props, ['checked', 'className', 'disabled', 'label', 'name', 'onChange', 'reverse', 'toggle']);

      var classes = (0, _classnames3.default)(CLASS_ROOT, (_classnames = {}, (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--toggle', toggle), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--disabled', disabled), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--reverse', reverse), _classnames), className);

      var labelNode = void 0;
      if (label) {
        labelNode = _react2.default.createElement(
          'label',
          { key: 'label', htmlFor: props.id,
            className: CLASS_ROOT + '__label' },
          label
        );
      }

      var hidden = void 0;
      if (disabled && checked) {
        hidden = _react2.default.createElement('input', { name: name, type: 'hidden', value: 'true' });
      }

      var children = [_react2.default.createElement(
        'span',
        { key: 'checkbox' },
        _react2.default.createElement('input', (0, _extends3.default)({}, props, { tabIndex: '0', className: CLASS_ROOT + '__input',
          name: name, type: 'checkbox',
          disabled: disabled,
          checked: checked,
          onChange: onChange })),
        _react2.default.createElement(
          'span',
          { className: CLASS_ROOT + '__control' },
          _react2.default.createElement(
            'svg',
            { className: CLASS_ROOT + '__control-check', viewBox: '0 0 24 24',
              preserveAspectRatio: 'xMidYMid meet' },
            _react2.default.createElement('path', { fill: 'none', d: 'M6,11.3 L10.3,16 L18,6.2' })
          )
        )
      ), labelNode];

      return _react2.default.createElement(
        'label',
        { className: classes, 'aria-label': label },
        reverse ? children.reverse() : children,
        hidden
      );
    }
  }]);
  return CheckBox;
}(_react.Component);

CheckBox.displayName = 'CheckBox';
exports.default = CheckBox;


CheckBox.propTypes = {
  checked: _react.PropTypes.bool,
  disabled: _react.PropTypes.bool,
  label: _react.PropTypes.node,
  name: _react.PropTypes.string,
  onChange: _react.PropTypes.func,
  reverse: _react.PropTypes.bool,
  toggle: _react.PropTypes.bool
};
module.exports = exports['default'];