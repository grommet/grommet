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

var Disabled = function (_Component) {
  (0, _inherits3.default)(Disabled, _Component);

  function Disabled() {
    (0, _classCallCheck3.default)(this, Disabled);
    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Disabled).apply(this, arguments));
  }

  (0, _createClass3.default)(Disabled, [{
    key: 'render',
    value: function render() {
      var className = STATUS_ICON + ' ' + STATUS_ICON + '-disabled';
      var a11yTitle = this.props.a11yTitle;
      if (this.props.className) {
        className += ' ' + this.props.className;
      }
      if (typeof this.props.a11yTitle === "undefined") {
        // this.props.a11yTitle emplty string is an acceptable value. Only if undefined
        // should use the default title value.
        a11yTitle = 'Disabled';
      }
      var disabledTitleId = 'disabled-title';
      return _react2.default.createElement(
        'svg',
        { className: className, viewBox: '0 0 24 24', role: 'img', 'aria-labelledby': disabledTitleId, version: '1.1' },
        _react2.default.createElement(
          'title',
          { id: disabledTitleId },
          _react2.default.createElement(_FormattedMessage2.default, { id: a11yTitle, defaultMessage: a11yTitle })
        ),
        _react2.default.createElement(
          'g',
          { className: STATUS_ICON + '__base' },
          _react2.default.createElement('path', { role: 'presentation', stroke: 'none', d: 'M21,24 L3,24 C1.3,24 0,22.7 0,21 L0,3 C0,1.3 1.3,0 3,0 L21,0 C22.7,0 24,1.3 24,3 L24,21 C24,22.7 22.7,24 21,24 L21,24 Z' })
        ),
        _react2.default.createElement(
          'g',
          { className: STATUS_ICON + '__detail', strokeWidth: '2' },
          _react2.default.createElement('path', { d: 'M6,12 L18,12' })
        )
      );
    }
  }]);
  return Disabled;
}(_react.Component);

Disabled.displayName = 'Disabled';
exports.default = Disabled;


Disabled.propTypes = {
  a11yTitle: _react.PropTypes.string
};
module.exports = exports['default'];