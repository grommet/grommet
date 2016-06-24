'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames3 = require('classnames');

var _classnames4 = _interopRequireDefault(_classnames3);

var _Label = require('./Label');

var _Label2 = _interopRequireDefault(_Label);

var _CSSClassnames = require('../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.IMAGE;

var Image = function (_Component) {
  _inherits(Image, _Component);

  function Image() {
    _classCallCheck(this, Image);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Image).apply(this, arguments));
  }

  _createClass(Image, [{
    key: 'render',
    value: function render() {
      var _classnames;

      var _props = this.props;
      var alt = _props.alt;
      var caption = _props.caption;
      var className = _props.className;
      var full = _props.full;
      var id = _props.id;
      var size = _props.size;
      var src = _props.src;
      var title = _props.title;
      var mask = _props.mask;

      var classes = (0, _classnames4.default)(CLASS_ROOT, (_classnames = {}, _defineProperty(_classnames, CLASS_ROOT + '--' + size, size), _defineProperty(_classnames, CLASS_ROOT + '--full', typeof full === 'boolean' && full), _defineProperty(_classnames, CLASS_ROOT + '--full-' + full, typeof full === 'string'), _defineProperty(_classnames, CLASS_ROOT + '--mask', mask), _classnames), className);

      var captionText = typeof caption === 'string' ? caption : alt;
      var imgNode = _react2.default.createElement('img', { id: id, src: src, alt: alt, title: title, className: classes });

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

exports.default = Image;
;

Image.propTypes = {
  alt: _react.PropTypes.string,
  caption: _react.PropTypes.oneOfType([_react.PropTypes.bool, _react.PropTypes.string]),
  className: _react.PropTypes.string,
  full: _react.PropTypes.oneOf([true, 'horizontal', 'vertical', false]),
  id: _react.PropTypes.string,
  mask: _react.PropTypes.bool,
  size: _react.PropTypes.oneOf(['small', 'medium', 'large', 'thumb']),
  src: _react.PropTypes.string,
  title: _react.PropTypes.string
};

Image.defaultProps = {
  size: 'medium'
};
module.exports = exports['default'];