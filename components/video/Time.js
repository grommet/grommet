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

var _Box = require('../Box');

var _Box2 = _interopRequireDefault(_Box);

var _Heading = require('../Heading');

var _Heading2 = _interopRequireDefault(_Heading);

var _CSSClassnames = require('../../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

var _FormatTime = require('../../utils/FormatTime');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CLASS_ROOT = _CSSClassnames2.default.VIDEO; // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var Time = function (_Component) {
  (0, _inherits3.default)(Time, _Component);

  function Time() {
    (0, _classCallCheck3.default)(this, Time);
    return (0, _possibleConstructorReturn3.default)(this, (Time.__proto__ || (0, _getPrototypeOf2.default)(Time)).apply(this, arguments));
  }

  (0, _createClass3.default)(Time, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          currentTime = _props.currentTime,
          duration = _props.duration;


      return _react2.default.createElement(
        _Box2.default,
        { pad: { horizontal: 'small', vertical: 'none' } },
        _react2.default.createElement(
          _Heading2.default,
          { tag: 'h3', margin: 'none', className: CLASS_ROOT + '__time' },
          (0, _FormatTime.formatTime)(currentTime),
          ' / ',
          (0, _FormatTime.formatTime)(duration)
        )
      );
    }
  }]);
  return Time;
}(_react.Component);

Time.displayName = 'Time';
exports.default = Time;


Time.propTypes = {
  currentTime: _react.PropTypes.number,
  duration: _react.PropTypes.number
};
module.exports = exports['default'];