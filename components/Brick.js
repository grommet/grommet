'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Anchor = require('./Anchor');

var _Anchor2 = _interopRequireDefault(_Anchor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = 'brick';
var TYPE_SMALL = 'small';
var TYPE_LARGE = 'large';
var TYPE_WIDE = 'wide';
var TYPE_TALL = 'tall';

var Brick = (function (_Component) {
  _inherits(Brick, _Component);

  function Brick() {
    _classCallCheck(this, Brick);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Brick).apply(this, arguments));
  }

  _createClass(Brick, [{
    key: 'render',
    value: function render() {
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

      var classes = [CLASS_ROOT];
      classes.push(CLASS_ROOT + '--' + widthUnit + '-' + heightUnit);

      if (this.props.colorIndex) {
        classes.push('background-color-index-' + this.props.colorIndex);
      }
      if (this.props.className) {
        classes.push(this.props.className);
      }

      var label = _react2.default.createElement(
        'div',
        { className: CLASS_ROOT + '--label' },
        _react2.default.createElement(
          'span',
          null,
          this.props.label
        )
      );

      if (this.props.href) {
        label = _react2.default.createElement(
          _Anchor2.default,
          { href: this.props.href, className: CLASS_ROOT + '--label' },
          _react2.default.createElement(
            'span',
            null,
            this.props.label
          )
        );
      }

      return _react2.default.createElement(
        'div',
        { className: classes.join(' '), onClick: this.props.onClick },
        _react2.default.createElement(
          'div',
          { className: CLASS_ROOT + '--content-wrapper' },
          this.props.children
        ),
        label
      );
    }
  }]);

  return Brick;
})(_react.Component);

exports.default = Brick;

Brick.propTypes = {
  label: _react2.default.PropTypes.string,
  href: _react2.default.PropTypes.string,
  type: _react2.default.PropTypes.oneOf([TYPE_SMALL, TYPE_LARGE, TYPE_WIDE, TYPE_TALL]),
  colorIndex: _react2.default.PropTypes.string
};

Brick.defaultProps = {
  type: TYPE_SMALL
};
module.exports = exports['default'];