'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _CSSClassnames = require('../../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.SPINNING;

var Spinning = function (_Component) {
  (0, _inherits3.default)(Spinning, _Component);

  function Spinning() {
    (0, _classCallCheck3.default)(this, Spinning);
    return (0, _possibleConstructorReturn3.default)(this, (Spinning.__proto__ || (0, _getPrototypeOf2.default)(Spinning)).apply(this, arguments));
  }

  (0, _createClass3.default)(Spinning, [{
    key: 'render',
    value: function render() {
      var classes = [CLASS_ROOT];
      if (this.props.small) {
        classes.push(CLASS_ROOT + "--small");
      }
      if (this.props.className) {
        classes.push(this.props.className);
      }
      return _react2.default.createElement(
        'svg',
        { className: classes.join(' '), viewBox: '0 0 48 48', version: '1.1',
          role: 'img' },
        _react2.default.createElement(
          'title',
          null,
          'Spinning'
        ),
        _react2.default.createElement('circle', { stroke: '#ddd', strokeWidth: '4', strokeDasharray: '24px 8px',
          fill: 'none', cx: '24', cy: '24', r: '20' }),
        _react2.default.createElement('circle', { stroke: '#333', strokeWidth: '4', strokeDasharray: '24px 104px',
          fill: 'none', cx: '24', cy: '24', r: '20' })
      );
    }
  }]);
  return Spinning;
}(_react.Component);

Spinning.displayName = 'Spinning';
exports.default = Spinning;
module.exports = exports['default'];