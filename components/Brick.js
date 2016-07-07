'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _Anchor = require('./Anchor');

var _Anchor2 = _interopRequireDefault(_Anchor);

var _CSSClassnames = require('../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.BRICK;
var BACKGROUND_COLOR_INDEX = _CSSClassnames2.default.BACKGROUND_COLOR_INDEX;
var TYPE_SMALL = 'small';
var TYPE_LARGE = 'large';
var TYPE_WIDE = 'wide';
var TYPE_TALL = 'tall';

var Brick = function (_Component) {
  (0, _inherits3.default)(Brick, _Component);

  function Brick() {
    (0, _classCallCheck3.default)(this, Brick);
    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Brick).apply(this, arguments));
  }

  (0, _createClass3.default)(Brick, [{
    key: 'render',
    value: function render() {
      var _classnames;

      var widthUnit = 1;
      var heightUnit = 1;

      switch (this.props.type) {
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

      var clickable = this.props.href || this.props.onClick;

      var classes = (0, _classnames3.default)(CLASS_ROOT, CLASS_ROOT + '--' + widthUnit + '-' + heightUnit, (_classnames = {}, (0, _defineProperty3.default)(_classnames, BACKGROUND_COLOR_INDEX + '-' + this.props.colorIndex, this.props.colorIndex), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--clickable', clickable), _classnames), this.props.className);

      var label = _react2.default.createElement(
        'div',
        { className: CLASS_ROOT + '__label' },
        _react2.default.createElement(
          'span',
          null,
          this.props.label
        )
      );

      var style = {};
      if (this.props.texture && 'string' === typeof this.props.texture) {
        style.background = "url(" + this.props.texture + ") no-repeat center center";
        style.backgroundSize = "cover";
      } else if (this.props.backgroundImage) {
        style.background = "url(" + this.props.backgroundImage + ") no-repeat center center";
        style.backgroundSize = "cover";
      }
      var texture = void 0;
      if ('object' === (0, _typeof3.default)(this.props.texture)) {
        texture = _react2.default.createElement(
          'div',
          { className: CLASS_ROOT + "__texture" },
          this.props.texture
        );
      }

      var brickContent = _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { className: CLASS_ROOT + '__container' },
          texture,
          this.props.children
        ),
        label
      );

      if (clickable) {
        return _react2.default.createElement(
          _Anchor2.default,
          { href: this.props.href, onClick: this.props.onClick, className: classes },
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
    }
  }]);
  return Brick;
}(_react.Component);

Brick.displayName = 'Brick';
exports.default = Brick;
;

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
module.exports = exports['default'];