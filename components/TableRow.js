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

var CLASS_ROOT = 'table-row';

var TableRow = function TableRow(props) {
  var _classnames;

  var classes = (0, _classnames3.default)(CLASS_ROOT, props.className, (_classnames = {}, _defineProperty(_classnames, CLASS_ROOT + '--selected', props.selected), _defineProperty(_classnames, CLASS_ROOT + '--selectable', props.onClick), _classnames));

  return _react2.default.createElement(
    'tr',
    { className: classes, onClick: props.onClick },
    props.children
  );
};

TableRow.propTypes = {
  onClick: _react.PropTypes.func,
  selected: _react.PropTypes.bool
};

TableRow.displayName = 'TableRow';

exports.default = TableRow;
module.exports = exports['default'];