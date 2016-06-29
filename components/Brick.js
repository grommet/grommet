'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _Anchor = require('./Anchor');

var _Anchor2 = _interopRequireDefault(_Anchor);

var _CSSClassnames = require('../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.BRICK;
var BACKGROUND_COLOR_INDEX = _CSSClassnames2.default.BACKGROUND_COLOR_INDEX;
var TYPE_SMALL = 'small';
var TYPE_LARGE = 'large';
var TYPE_WIDE = 'wide';
var TYPE_TALL = 'tall';

var Brick = function (_Component) {
  _inherits(Brick, _Component);

  function Brick() {
    _classCallCheck(this, Brick);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Brick).apply(this, arguments));
  }

  _createClass(Brick, [{
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

      var classes = (0, _classnames3.default)(CLASS_ROOT, CLASS_ROOT + '--' + widthUnit + '-' + heightUnit, (_classnames = {}, _defineProperty(_classnames, BACKGROUND_COLOR_INDEX + '-' + this.props.colorIndex, this.props.colorIndex), _defineProperty(_classnames, CLASS_ROOT + '--clickable', clickable), _classnames), this.props.className);

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
      if ('object' === _typeof(this.props.texture)) {
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