'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

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

var _classnames3 = require('classnames');

var _classnames4 = _interopRequireDefault(_classnames3);

var _Label = require('./Label');

var _Label2 = _interopRequireDefault(_Label);

var _CSSClassnames = require('../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.IMAGE;

var Image = function (_Component) {
  (0, _inherits3.default)(Image, _Component);

  function Image() {
    (0, _classCallCheck3.default)(this, Image);
    return (0, _possibleConstructorReturn3.default)(this, (Image.__proto__ || (0, _getPrototypeOf2.default)(Image)).apply(this, arguments));
  }

  (0, _createClass3.default)(Image, [{
    key: 'render',
    value: function render() {
      var _classnames;

      var _props = this.props,
          caption = _props.caption,
          className = _props.className,
          full = _props.full,
          mask = _props.mask,
          size = _props.size,
          fit = _props.fit,
          props = (0, _objectWithoutProperties3.default)(_props, ['caption', 'className', 'full', 'mask', 'size', 'fit']);

      var classes = (0, _classnames4.default)(CLASS_ROOT, (_classnames = {}, (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--' + size, size), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--' + fit, fit), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--full', typeof full === 'boolean' && full), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--full-' + full, typeof full === 'string'), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--mask', mask), _classnames), className);

      var captionText = typeof caption === 'string' ? caption : props.alt;
      var imgNode = _react2.default.createElement('img', (0, _extends3.default)({}, props, { className: classes }));

      var labelRoot = CLASS_ROOT + '__caption';
      var labelClasses = (0, _classnames4.default)(labelRoot, (0, _defineProperty3.default)({}, labelRoot + '--' + size, size));
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
;

Image.propTypes = {
  alt: _react.PropTypes.string,
  caption: _react.PropTypes.oneOfType([_react.PropTypes.bool, _react.PropTypes.string]),
  fit: _react.PropTypes.oneOf(['contain', 'cover']),
  full: _react.PropTypes.oneOf([true, 'horizontal', 'vertical', false]),
  mask: _react.PropTypes.bool,
  size: _react.PropTypes.oneOf(['small', 'medium', 'large', 'thumb']),
  src: _react.PropTypes.string,
  title: _react.PropTypes.string
};

Image.defaultProps = {
  size: 'medium'
};
module.exports = exports['default'];