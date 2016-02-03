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

var CLASS_ROOT = 'label';

var Label = function Label(props) {
  var classes = (0, _classnames3.default)(CLASS_ROOT, props.className, _defineProperty({}, CLASS_ROOT + '--uppercase', props.uppercase));

  return _react2.default.createElement(
    'label',
    { className: classes, htmlFor: props.labelFor },
    props.children
  );
};

Label.propTypes = {
  labelFor: _react.PropTypes.string,
  uppercase: _react.PropTypes.bool
};

Label.displayName = 'Label';

exports.default = Label;
module.exports = exports['default'];