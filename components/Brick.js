'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _Anchor = require('./Anchor');

var _Anchor2 = _interopRequireDefault(_Anchor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } // (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = 'brick';
var TYPE_SMALL = 'small';
var TYPE_LARGE = 'large';
var TYPE_WIDE = 'wide';
var TYPE_TALL = 'tall';

var Brick = function Brick(props) {
  var widthUnit = 1;
  var heightUnit = 1;

  switch (props.type) {
    case TYPE_LARGE:
      widthUnit = 2;
      heightUnit = 2;
      break;
    case TYPE_WIDE:
      widthUnit = 2;
      heightUnit = 1;
      break;
    case TYPE_TALL:
      widthUnit = 1;
      heightUnit = 2;
      break;
  }

  var classes = (0, _classnames3.default)(CLASS_ROOT, CLASS_ROOT + '--' + widthUnit + '-' + heightUnit, _defineProperty({}, 'background-color-index-' + props.colorIndex, props.colorIndex), props.className);

  var label = _react2.default.createElement(
    'div',
    { className: CLASS_ROOT + '--label' },
    _react2.default.createElement(
      'span',
      null,
      props.label
    )
  );

  if (props.href) {
    label = _react2.default.createElement(
      _Anchor2.default,
      { href: props.href, className: CLASS_ROOT + '--label' },
      _react2.default.createElement(
        'span',
        null,
        props.label
      )
    );
  }

  return _react2.default.createElement(
    'div',
    { className: classes, onClick: props.onClick },
    _react2.default.createElement(
      'div',
      { className: CLASS_ROOT + '--content-wrapper' },
      props.children
    ),
    label
  );
};

Brick.propTypes = {
  colorIndex: _react.PropTypes.string,
  href: _react.PropTypes.string,
  label: _react.PropTypes.string,
  type: _react.PropTypes.oneOf([TYPE_SMALL, TYPE_LARGE, TYPE_WIDE, TYPE_TALL])
};

Brick.defaultProps = {
  type: TYPE_SMALL
};

exports.default = Brick;
module.exports = exports['default'];