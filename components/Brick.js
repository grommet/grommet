'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

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
  var _classnames;

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

  var clickable = props.href || props.onClick;

  var classes = (0, _classnames3.default)(CLASS_ROOT, CLASS_ROOT + '--' + widthUnit + '-' + heightUnit, (_classnames = {}, _defineProperty(_classnames, 'background-color-index-' + props.colorIndex, props.colorIndex), _defineProperty(_classnames, CLASS_ROOT + '--clickable', clickable), _classnames), props.className);

  var label = _react2.default.createElement(
    'div',
    { className: CLASS_ROOT + '__label' },
    _react2.default.createElement(
      'span',
      null,
      props.label
    )
  );

  var style = {};
  if (props.texture && 'string' === typeof props.texture) {
    style.background = "url(" + props.texture + ") no-repeat center center";
    style.backgroundSize = "cover";
  } else if (props.backgroundImage) {
    style.background = "url(" + props.backgroundImage + ") no-repeat center center";
    style.backgroundSize = "cover";
  }
  var texture = undefined;
  if ('object' === _typeof(props.texture)) {
    texture = _react2.default.createElement(
      'div',
      { className: CLASS_ROOT + "__texture" },
      props.texture
    );
  }

  var brickContent = _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      'div',
      { className: CLASS_ROOT + '__container' },
      texture,
      props.children
    ),
    label
  );

  if (clickable) {
    return _react2.default.createElement(
      _Anchor2.default,
      { href: props.href, onClick: props.onClick, className: classes },
      _react2.default.createElement(
        'div',
        { className: CLASS_ROOT + '__background', style: style },
        brickContent
      )
    );
  } else {
    return _react2.default.createElement(
      'div',
      { className: classes, style: style },
      brickContent
    );
  }
};

Brick.propTypes = {
  colorIndex: _react.PropTypes.string,
  href: _react.PropTypes.string,
  label: _react.PropTypes.string,
  onClick: _react.PropTypes.func,
  texture: _react.PropTypes.oneOfType([_react.PropTypes.node, _react.PropTypes.string]),
  type: _react.PropTypes.oneOf([TYPE_SMALL, TYPE_LARGE, TYPE_WIDE, TYPE_TALL])
};

Brick.defaultProps = {
  type: TYPE_SMALL
};

Brick.displayName = 'Brick';

exports.default = Brick;
module.exports = exports['default'];