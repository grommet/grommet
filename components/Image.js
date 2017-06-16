'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames3 = require('classnames');

var _classnames4 = _interopRequireDefault(_classnames3);

var _Label = require('./Label');

var _Label2 = _interopRequireDefault(_Label);

var _CSSClassnames = require('../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.IMAGE;

var Image = function (_Component) {
  _inherits(Image, _Component);

  function Image() {
    _classCallCheck(this, Image);

    return _possibleConstructorReturn(this, (Image.__proto__ || Object.getPrototypeOf(Image)).apply(this, arguments));
  }

  _createClass(Image, [{
    key: 'render',
    value: function render() {
      var _classnames;

      var _props = this.props,
          align = _props.align,
          caption = _props.caption,
          className = _props.className,
          full = _props.full,
          mask = _props.mask,
          size = _props.size,
          fit = _props.fit,
          props = _objectWithoutProperties(_props, ['align', 'caption', 'className', 'full', 'mask', 'size', 'fit']);

      var classes = (0, _classnames4.default)(CLASS_ROOT, (_classnames = {}, _defineProperty(_classnames, CLASS_ROOT + '--' + size, size), _defineProperty(_classnames, CLASS_ROOT + '--' + fit, fit), _defineProperty(_classnames, CLASS_ROOT + '--full', fit ? true : typeof full === 'boolean' && full), _defineProperty(_classnames, CLASS_ROOT + '--full-' + full, typeof full === 'string'), _defineProperty(_classnames, CLASS_ROOT + '--mask', mask), _defineProperty(_classnames, CLASS_ROOT + '--align-top', align && align.top), _defineProperty(_classnames, CLASS_ROOT + '--align-bottom', align && align.bottom), _defineProperty(_classnames, CLASS_ROOT + '--align-left', align && align.left), _defineProperty(_classnames, CLASS_ROOT + '--align-right', align && align.right), _classnames), className);

      var captionText = typeof caption === 'string' ? caption : props.alt;
      var imgNode = _react2.default.createElement('img', _extends({}, props, { className: classes }));

      var labelRoot = CLASS_ROOT + '__caption';
      var labelClasses = (0, _classnames4.default)(labelRoot, _defineProperty({}, labelRoot + '--' + size, size));
      return caption && captionText ? _react2.default.createElement(
        'span',
        { className: CLASS_ROOT + '__container' },
        imgNode,
        _react2.default.createElement(
          _Label2.default,
          { className: labelClasses },
          captionText
        )
      ) : imgNode;
    }
  }]);

  return Image;
}(_react.Component);

Image.displayName = 'Image';
exports.default = Image;


Image.propTypes = {
  align: _propTypes2.default.shape({
    bottom: _propTypes2.default.boolean,
    left: _propTypes2.default.boolean,
    right: _propTypes2.default.boolean,
    top: _propTypes2.default.boolean
  }),
  alt: _propTypes2.default.string,
  caption: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.string]),
  fit: _propTypes2.default.oneOf(['contain', 'cover']),
  full: _propTypes2.default.oneOf([true, 'horizontal', 'vertical', false]),
  mask: _propTypes2.default.bool,
  size: _propTypes2.default.oneOf(['small', 'medium', 'large', 'thumb']),
  src: _propTypes2.default.string,
  title: _propTypes2.default.string
};

Image.defaultProps = {
  size: 'medium'
};
module.exports = exports['default'];