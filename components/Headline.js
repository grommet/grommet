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

var CLASS_ROOT = 'headline';

var Headline = function Headline(props) {
  var _classnames;

  var classes = (0, _classnames3.default)(CLASS_ROOT, props.className, (_classnames = {}, _defineProperty(_classnames, CLASS_ROOT + '--' + props.size, props.size), _defineProperty(_classnames, CLASS_ROOT + '--align-' + props.align, props.align), _defineProperty(_classnames, CLASS_ROOT + '--margin-' + props.margin, props.margin), _defineProperty(_classnames, CLASS_ROOT + '--large', props.large), _defineProperty(_classnames, CLASS_ROOT + '--small', props.small), _defineProperty(_classnames, CLASS_ROOT + '--strong', props.strong), _classnames));
  if (props.large) {
    console.warn('The "large" property of Headline is deprecated. Use size="large" instead.');
  }
  if (props.small) {
    console.warn('The "small" property of Headline is deprecated. Use size="small" instead.');
  }

  return _react2.default.createElement(
    'div',
    { className: classes },
    props.children
  );
};

Headline.propTypes = {
  align: _react.PropTypes.oneOf(['start', 'center', 'end']),
  margin: _react.PropTypes.oneOf(['none', 'small', 'medium', 'large']),
  size: _react.PropTypes.oneOf(['small', 'medium', 'large']),
  large: _react.PropTypes.bool, // deprecated
  small: _react.PropTypes.bool, // deprecated
  strong: _react.PropTypes.bool
};

Headline.displayName = 'Headline';

exports.default = Headline;
module.exports = exports['default'];