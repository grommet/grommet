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

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _Box = require('./Box');

var _Box2 = _interopRequireDefault(_Box);

var _Paragraph = require('./Paragraph');

var _Paragraph2 = _interopRequireDefault(_Paragraph);

var _CSSClassnames = require('../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CLASS_ROOT = _CSSClassnames2.default.QUOTE; // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var BORDER_COLOR_INDEX = _CSSClassnames2.default.BORDER_COLOR_INDEX;

var Quote = function (_Component) {
  (0, _inherits3.default)(Quote, _Component);

  function Quote() {
    (0, _classCallCheck3.default)(this, Quote);
    return (0, _possibleConstructorReturn3.default)(this, (Quote.__proto__ || (0, _getPrototypeOf2.default)(Quote)).apply(this, arguments));
  }

  (0, _createClass3.default)(Quote, [{
    key: 'render',
    value: function render() {
      var _classnames;

      var _props = this.props,
          borderColorIndex = _props.borderColorIndex,
          children = _props.children,
          className = _props.className,
          credit = _props.credit,
          emphasizeCredit = _props.emphasizeCredit,
          props = (0, _objectWithoutProperties3.default)(_props, ['borderColorIndex', 'children', 'className', 'credit', 'emphasizeCredit']);


      var classes = (0, _classnames3.default)(CLASS_ROOT, (_classnames = {}, (0, _defineProperty3.default)(_classnames, BORDER_COLOR_INDEX + '-' + borderColorIndex, borderColorIndex), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--small', 'small' === props.size), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--emphasize-credit', emphasizeCredit), _classnames), className);

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
        (0, _extends3.default)({}, props, { className: classes }),
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
;

Quote.propTypes = (0, _extends3.default)({
  borderColorIndex: _react.PropTypes.string,
  size: _react.PropTypes.oneOf(['small', 'medium', 'large', 'full']),
  credit: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.element]),
  emphasizeCredit: _react.PropTypes.bool
}, _Box2.default.propTypes);

Quote.defaultProps = {
  pad: { horizontal: 'large', vertical: 'small' },
  size: 'large',
  emphasizeCredit: true
};
module.exports = exports['default'];