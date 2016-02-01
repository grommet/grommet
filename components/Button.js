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

var CLASS_ROOT = 'button';

var Button = function Button(props) {
  var _classnames;

  var classes = (0, _classnames3.default)(CLASS_ROOT, props.className, (_classnames = {}, _defineProperty(_classnames, CLASS_ROOT + '--primary', props.primary), _defineProperty(_classnames, CLASS_ROOT + '--secondary', props.secondary), _defineProperty(_classnames, CLASS_ROOT + '--accent', props.accent), _defineProperty(_classnames, CLASS_ROOT + '--disabled', !props.onClick), _defineProperty(_classnames, CLASS_ROOT + '--fill', props.fill), _defineProperty(_classnames, CLASS_ROOT + '--icon', props.type === 'icon'), _classnames));

  var type = props.type === 'icon' ? 'button' : props.type;

  var children = _react2.default.Children.map(props.children, function (child) {
    if (child && child.type && child.type.icon) {
      child = _react2.default.createElement(
        'span',
        { className: CLASS_ROOT + '__icon' },
        child
      );
    }

    return child;
  });

  if (!children) {
    children = props.label;
  }

  return _react2.default.createElement(
    'button',
    { id: props.id, type: type, className: classes,
      onClick: props.onClick, disabled: !props.onClick,
      'aria-label': props.a11yTitle },
    children
  );
};

Button.propTypes = {
  a11yTitle: _react.PropTypes.string,
  accent: _react.PropTypes.bool,
  fill: _react.PropTypes.bool,
  icon: _react.PropTypes.bool,
  id: _react.PropTypes.string,
  label: _react.PropTypes.node,
  onClick: _react.PropTypes.func,
  primary: _react.PropTypes.bool,
  secondary: _react.PropTypes.bool,
  type: _react.PropTypes.oneOf(['button', 'reset', 'submit', 'icon'])
};

Button.defaultProps = {
  type: 'button'
};

Button.displayName = 'Button';

exports.default = Button;
module.exports = exports['default'];