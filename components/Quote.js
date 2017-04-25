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

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _Box = require('./Box');

var _Box2 = _interopRequireDefault(_Box);

var _Paragraph = require('./Paragraph');

var _Paragraph2 = _interopRequireDefault(_Paragraph);

var _CSSClassnames = require('../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.QUOTE;
var BORDER_COLOR_INDEX = _CSSClassnames2.default.BORDER_COLOR_INDEX;

var Quote = function (_Component) {
  _inherits(Quote, _Component);

  function Quote() {
    _classCallCheck(this, Quote);

    return _possibleConstructorReturn(this, (Quote.__proto__ || Object.getPrototypeOf(Quote)).apply(this, arguments));
  }

  _createClass(Quote, [{
    key: 'render',
    value: function render() {
      var _classnames;

      var _props = this.props,
          borderColorIndex = _props.borderColorIndex,
          children = _props.children,
          className = _props.className,
          credit = _props.credit,
          emphasizeCredit = _props.emphasizeCredit,
          props = _objectWithoutProperties(_props, ['borderColorIndex', 'children', 'className', 'credit', 'emphasizeCredit']);

      var classes = (0, _classnames3.default)(CLASS_ROOT, (_classnames = {}, _defineProperty(_classnames, BORDER_COLOR_INDEX + '-' + borderColorIndex, borderColorIndex), _defineProperty(_classnames, CLASS_ROOT + '--small', 'small' === props.size), _defineProperty(_classnames, CLASS_ROOT + '--emphasize-credit', emphasizeCredit), _classnames), className);

      if (props.size === 'small') {
        props.pad = { horizontal: 'medium', vertical: 'small' };
      }

      var creditElement = void 0;
      if (typeof credit === 'string') {
        var content = credit;
        if (emphasizeCredit) {
          content = _react2.default.createElement(
            'strong',
            null,
            content
          );
        }
        creditElement = _react2.default.createElement(
          _Paragraph2.default,
          { className: CLASS_ROOT + '__credit' },
          content
        );
      } else {
        creditElement = credit;
      }

      return _react2.default.createElement(
        _Box2.default,
        _extends({}, props, { className: classes }),
        _react2.default.createElement(
          'div',
          null,
          children,
          creditElement
        )
      );
    }
  }]);

  return Quote;
}(_react.Component);

Quote.displayName = 'Quote';
exports.default = Quote;


Quote.propTypes = _extends({
  borderColorIndex: _propTypes2.default.string,
  size: _propTypes2.default.oneOf(['small', 'medium', 'large', 'full']),
  credit: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element]),
  emphasizeCredit: _propTypes2.default.bool
}, _Box2.default.propTypes);

Quote.defaultProps = {
  pad: { horizontal: 'large', vertical: 'small' },
  size: 'large',
  emphasizeCredit: true
};
module.exports = exports['default'];