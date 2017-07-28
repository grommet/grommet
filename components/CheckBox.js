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

var CLASS_ROOT = _CSSClassnames2.default.CHECK_BOX;

var CheckBox = function (_Component) {
  _inherits(CheckBox, _Component);

  function CheckBox() {
    _classCallCheck(this, CheckBox);

    return _possibleConstructorReturn(this, (CheckBox.__proto__ || Object.getPrototypeOf(CheckBox)).apply(this, arguments));
  }

  _createClass(CheckBox, [{
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
          props = _objectWithoutProperties(_props, ['checked', 'className', 'disabled', 'label', 'name', 'onChange', 'reverse', 'toggle']);

      var classes = (0, _classnames3.default)(CLASS_ROOT, (_classnames = {}, _defineProperty(_classnames, CLASS_ROOT + '--toggle', toggle), _defineProperty(_classnames, CLASS_ROOT + '--disabled', disabled), _defineProperty(_classnames, CLASS_ROOT + '--reverse', reverse), _classnames), className);

      var hidden = void 0;
      if (disabled && checked) {
        hidden = _react2.default.createElement('input', { name: name, type: 'hidden', value: 'true' });
      }

      var children = [_react2.default.createElement(
        'span',
        { key: 'checkbox' },
        _react2.default.createElement('input', _extends({}, props, { tabIndex: '0', className: CLASS_ROOT + '__input',
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
      ), _react2.default.createElement(
        'span',
        { key: 'label', className: CLASS_ROOT + '__label' },
        label
      )];

      return _react2.default.createElement(
        'label',
        { className: classes, htmlFor: props.id },
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
  checked: _propTypes2.default.bool,
  disabled: _propTypes2.default.bool,
  id: _propTypes2.default.string,
  label: _propTypes2.default.node,
  name: _propTypes2.default.string,
  onChange: _propTypes2.default.func,
  reverse: _propTypes2.default.bool,
  toggle: _propTypes2.default.bool
};
module.exports = exports['default'];