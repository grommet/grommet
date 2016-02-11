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

var CLASS_ROOT = 'image';

var Image = function Image(props) {
  var _classnames;

  var size = props.size;
  var full = props.full;

  var classes = (0, _classnames3.default)(CLASS_ROOT, props.className, (_classnames = {}, _defineProperty(_classnames, CLASS_ROOT + '--' + size, size), _defineProperty(_classnames, CLASS_ROOT + '--full', typeof full === 'boolean' && full), _defineProperty(_classnames, CLASS_ROOT + '--full-' + full, typeof full === 'string'), _classnames));

  return _react2.default.createElement('img', { id: props.id, className: classes, src: props.src });
};

Image.propTypes = {
  full: _react.PropTypes.oneOf([true, 'horizontal', 'vertical', false]),
  src: _react.PropTypes.string,
  size: _react.PropTypes.oneOf(['small', 'medium', 'large'])
};

Image.displayName = 'Image';

exports.default = Image;
module.exports = exports['default'];