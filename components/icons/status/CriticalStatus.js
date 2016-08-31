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

var _FormattedMessage = require('../../FormattedMessage');

var _FormattedMessage2 = _interopRequireDefault(_FormattedMessage);

var _CSSClassnames = require('../../../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var STATUS_ICON = _CSSClassnames2.default.STATUS_ICON; // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var CriticalStatus = function (_Component) {
  (0, _inherits3.default)(CriticalStatus, _Component);

  function CriticalStatus() {
    (0, _classCallCheck3.default)(this, CriticalStatus);
    return (0, _possibleConstructorReturn3.default)(this, (CriticalStatus.__proto__ || (0, _getPrototypeOf2.default)(CriticalStatus)).apply(this, arguments));
  }

  (0, _createClass3.default)(CriticalStatus, [{
    key: 'render',
    value: function render() {
      var className = STATUS_ICON + ' ' + STATUS_ICON + '-critical';
      var a11yTitle = this.props.a11yTitle;
      if (this.props.className) {
        className += ' ' + this.props.className;
      }
      if (typeof a11yTitle === "undefined") {
        // this.props.a11yTitle emplty string is an acceptable value.
        // only if undefined should use the default title value.
        a11yTitle = 'Critical';
      }
      var criticalTitleId = 'critical-title';
      return _react2.default.createElement(
        'svg',
        { className: className, viewBox: '0 0 24 24',
          'aria-labelledby': criticalTitleId, role: 'img', version: '1.1' },
        _react2.default.createElement(
          'title',
          { id: criticalTitleId },
          _react2.default.createElement(_FormattedMessage2.default, { id: a11yTitle, defaultMessage: a11yTitle })
        ),
        _react2.default.createElement(
          'g',
          { className: STATUS_ICON + '__base', stroke: 'none' },
          _react2.default.createElement('path', { role: 'presentation', d: 'M12,0 L24,12 L12,24 L0,12 Z' })
        ),
        _react2.default.createElement(
          'g',
          { className: STATUS_ICON + '__detail', fill: 'none' },
          _react2.default.createElement('path', { role: 'presentation', d: 'M8,8 L16,16', strokeWidth: '2' }),
          _react2.default.createElement('path', { role: 'presentation', d: 'M8,16 L16,8', strokeWidth: '2' })
        )
      );
    }
  }]);
  return CriticalStatus;
}(_react.Component);

CriticalStatus.displayName = 'CriticalStatus';
exports.default = CriticalStatus;


CriticalStatus.propTypes = {
  a11yTitle: _react.PropTypes.string
};
module.exports = exports['default'];