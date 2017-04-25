'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Box = require('../Box');

var _Box2 = _interopRequireDefault(_Box);

var _Heading = require('../Heading');

var _Heading2 = _interopRequireDefault(_Heading);

var _CSSClassnames = require('../../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

var _FormatTime = require('../../utils/FormatTime');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.VIDEO;

var Time = function (_Component) {
  _inherits(Time, _Component);

  function Time() {
    _classCallCheck(this, Time);

    return _possibleConstructorReturn(this, (Time.__proto__ || Object.getPrototypeOf(Time)).apply(this, arguments));
  }

  _createClass(Time, [{
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
  currentTime: _propTypes2.default.number,
  duration: _propTypes2.default.number
};
module.exports = exports['default'];