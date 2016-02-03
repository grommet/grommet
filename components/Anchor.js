'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _indexIcons = require('../index-icons');

var _indexIcons2 = _interopRequireDefault(_indexIcons);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } // (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = 'anchor';

var Anchor = function Anchor(props) {
  var _classnames;

  var icon = undefined;
  if (props.icon) {
    var CustomIcon = _indexIcons2.default[props.icon];
    if (!CustomIcon) {
      console.warn('Warning: Anchor is unable to find the icon with props.icon:', props.icon);
    } else {
      icon = _react2.default.createElement(CustomIcon, null);
    }
  } else if (props.primary) {
    var LinkNextIcon = _indexIcons2.default.LinkNext;
    icon = _react2.default.createElement(LinkNextIcon, null);
  }

  if (icon && !props.primary) {
    icon = _react2.default.createElement(
      'span',
      { className: CLASS_ROOT + '__icon' },
      icon
    );
  }

  var classes = (0, _classnames3.default)(CLASS_ROOT, props.className, (_classnames = {}, _defineProperty(_classnames, CLASS_ROOT + '--disabled', props.disabled), _defineProperty(_classnames, CLASS_ROOT + '--icon', icon), _defineProperty(_classnames, CLASS_ROOT + '--primary', props.primary), _classnames));

  var children = _react.Children.map(props.children, function (child) {
    if (child && child.type && child.type.icon) {
      child = _react2.default.createElement(
        'span',
        { className: CLASS_ROOT + '__icon' },
        child
      );
    }

    return child;
  });

  return _react2.default.createElement(
    props.tag,
    { id: props.id, className: classes,
      href: props.href,
      target: props.target,
      onClick: props.onClick },
    icon,
    children
  );
};

Anchor.propTypes = {
  icon: _react.PropTypes.string,
  disabled: _react.PropTypes.bool,
  href: _react.PropTypes.string,
  id: _react.PropTypes.string,
  onClick: _react.PropTypes.func,
  primary: _react.PropTypes.bool,
  tag: _react.PropTypes.string,
  target: _react.PropTypes.string
};

Anchor.defaultProps = {
  tag: 'a'
};

Anchor.displayName = 'Anchor';

exports.default = Anchor;
module.exports = exports['default'];