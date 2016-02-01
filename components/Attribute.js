'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CLASS_ROOT = 'attribute'; // (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var Attribute = function Attribute(_ref) {
  var label = _ref.label;
  var children = _ref.children;
  return _react2.default.createElement(
    'div',
    { className: CLASS_ROOT },
    _react2.default.createElement(
      'label',
      { className: CLASS_ROOT + '__label' },
      label
    ),
    _react2.default.createElement(
      'span',
      { className: CLASS_ROOT + '__contents' },
      children
    )
  );
};

Attribute.propTypes = {
  label: _react.PropTypes.string
};

Attribute.displayName = 'Attribute';

exports.default = Attribute;
module.exports = exports['default'];