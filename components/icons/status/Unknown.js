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

var STATUS_ICON = _CSSClassnames2.default.STATUS_ICON; // (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var Unknown = function (_Component) {
  (0, _inherits3.default)(Unknown, _Component);

  function Unknown() {
    (0, _classCallCheck3.default)(this, Unknown);
    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Unknown).apply(this, arguments));
  }

  (0, _createClass3.default)(Unknown, [{
    key: 'render',
    value: function render() {
      var className = STATUS_ICON + ' ' + STATUS_ICON + '-unknown';
      var a11yTitle = this.props.a11yTitle;
      if (this.props.className) {
        className += ' ' + this.props.className;
      }
      if (typeof this.props.a11yTitle === "undefined") {
        // this.props.a11yTitle emplty string is an acceptable value.
        // Only if undefined
        // should use the default title value.
        a11yTitle = 'Unknown';
      }
      var unknownTitleId = 'unknown-title';
      return _react2.default.createElement(
        'svg',
        { className: className, viewBox: '0 0 24 24', role: 'img',
          'aria-labelledby': unknownTitleId, version: '1.1' },
        _react2.default.createElement(
          'title',
          { id: unknownTitleId },
          _react2.default.createElement(_FormattedMessage2.default, { id: a11yTitle, defaultMessage: a11yTitle })
        ),
        _react2.default.createElement(
          'g',
          { className: STATUS_ICON + '__base' },
          _react2.default.createElement('path', { role: 'presentation',
            d: "M12,2 C17.5,2 22,6.5 22,12 C22,17.5 17.5,22 12,22 " + "C6.5,22 2,17.5 2,12 C2,6.5 6.5,2 12,2 L12,2 Z M12,0 " + "C5.4,0 0,5.4 0,12 C0,18.6 5.4,24 12,24 " + "C18.6,24 24,18.6 24,12 C24,5.4 18.6,0 12,0 L12,0 L12,0 Z",
            stroke: 'none' })
        ),
        _react2.default.createElement(
          'g',
          { className: STATUS_ICON + '__detail' },
          _react2.default.createElement('path', { role: 'presentation',
            d: "M9,10.4 C9,8.8 10.4,7.6 12,7.6 C13.6,7.6 14.9,9 15,10.4 " + "C15,11.7 14.1,12.7 12.9,13.1 C12.4,13.2 12,13.7 12,14.2 " + "L12,15.5", fill: 'none', strokeWidth: '2' }),
          _react2.default.createElement('circle', { role: 'presentation', stroke: 'none', cx: '12', cy: '17.6', r: '1' })
        )
      );
    }
  }]);
  return Unknown;
}(_react.Component);

Unknown.displayName = 'Unknown';
exports.default = Unknown;
module.exports = exports['default'];