'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _Box = require('./Box');

var _Box2 = _interopRequireDefault(_Box);

var _Props = require('../utils/Props');

var _Props2 = _interopRequireDefault(_Props);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } // (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = 'list-item';

var ListItem = function ListItem(props) {
  var _classnames;

  var classes = (0, _classnames3.default)(CLASS_ROOT, props.className, (_classnames = {}, _defineProperty(_classnames, CLASS_ROOT + '--selected', props.selected), _defineProperty(_classnames, CLASS_ROOT + '--selectable', props.onClick), _classnames));

  var children = undefined;

  if (props.label) {
    var image = undefined;
    if (props.image) {
      image = _react2.default.createElement(
        'span',
        { className: CLASS_ROOT + '__image' },
        props.image
      );
    }
    children = [image, _react2.default.createElement(
      'span',
      { key: 'label', className: CLASS_ROOT + '__label' },
      props.label
    ), _react2.default.createElement(
      'span',
      { key: 'annotation', className: CLASS_ROOT + '__annotation' },
      props.annotation
    )];
  } else {
    children = props.children;
  }

  var boxProps = _Props2.default.pick(props, _Box2.default);

  return _react2.default.createElement(
    _Box2.default,
    _extends({}, boxProps, { tag: 'li', className: classes, onClick: props.onClick }),
    children
  );
};

ListItem.propTypes = _extends({
  onClick: _react.PropTypes.func,
  selected: _react.PropTypes.bool
}, _Box2.default.propTypes, {
  // deprecated properties
  annotation: _react.PropTypes.node,
  image: _react.PropTypes.node,
  label: _react.PropTypes.node
});

ListItem.defaultProps = {
  align: 'center',
  direction: 'row',
  pad: { horizontal: 'medium', vertical: 'small' },
  separator: 'bottom'
};

ListItem.displayName = 'ListItem';

exports.default = ListItem;
module.exports = exports['default'];