'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } // (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = 'radio-button';

var RadioButton = function RadioButton(props) {
  var classes = (0, _classnames3.default)(CLASS_ROOT, props.className, _defineProperty({}, CLASS_ROOT + '--disabled', props.disabled));

  return _react2.default.createElement(
    'label',
    { className: classes },
    _react2.default.createElement('input', { className: CLASS_ROOT + '__input',
      id: props.id, name: props.name, type: 'radio',
      disabled: props.disabled,
      checked: props.checked,
      defaultChecked: props.defaultChecked,
      value: props.value,
      onChange: props.onChange }),
    _react2.default.createElement('span', { className: CLASS_ROOT + '__control' }),
    _react2.default.createElement(
      'span',
      { className: CLASS_ROOT + '__label' },
      props.label
    )
  );
};

RadioButton.propTypes = {
  checked: _react.PropTypes.bool,
  disabled: _react.PropTypes.bool,
  defaultChecked: _react.PropTypes.bool,
  id: _react.PropTypes.string.isRequired,
  label: _react.PropTypes.node.isRequired,
  name: _react.PropTypes.string,
  onChange: _react.PropTypes.func,
  value: _react.PropTypes.string
};

RadioButton.displayName = 'RadioButton';

exports.default = RadioButton;
module.exports = exports['default'];