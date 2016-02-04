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

var CLASS_ROOT = 'paragraph';

var Paragraph = function Paragraph(props) {
  var _classnames;

  var classes = (0, _classnames3.default)(CLASS_ROOT, (_classnames = {}, _defineProperty(_classnames, CLASS_ROOT + '--' + props.size, props.size), _defineProperty(_classnames, CLASS_ROOT + '--align-' + props.align, props.align), _classnames));

  return _react2.default.createElement(
    'p',
    { id: props.id, className: classes },
    props.children
  );
};

Paragraph.propTypes = {
  align: _react.PropTypes.oneOf(['start', 'center', 'end']),
  id: _react.PropTypes.string,
  size: _react.PropTypes.oneOf(['small', 'medium', 'large'])
};

Paragraph.displayName = 'Paragraph';

exports.default = Paragraph;
module.exports = exports['default'];