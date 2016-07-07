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

var OK = function (_Component) {
  (0, _inherits3.default)(OK, _Component);

  function OK() {
    (0, _classCallCheck3.default)(this, OK);
    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(OK).apply(this, arguments));
  }

  (0, _createClass3.default)(OK, [{
    key: 'render',
    value: function render() {
      var className = STATUS_ICON + ' ' + STATUS_ICON + '-ok';
      var a11yTitle = this.props.a11yTitle;
      if (this.props.className) {
        className += ' ' + this.props.className;
      }
      if (typeof this.props.a11yTitle === "undefined") {
        // this.props.a11yTitle emplty string is an acceptable value only if undefined
        // should it use the default title value
        a11yTitle = 'OK';
      }
      var okTitleId = 'ok-title';
      return _react2.default.createElement(
        'svg',
        { className: className, viewBox: '0 0 24 24', role: 'img', 'aria-labelledby': okTitleId, version: '1.1' },
        _react2.default.createElement(
          'title',
          { id: okTitleId },
          _react2.default.createElement(_FormattedMessage2.default, { id: a11yTitle, defaultMessage: a11yTitle })
        ),
        _react2.default.createElement(
          'g',
          { className: STATUS_ICON + '__base' },
          _react2.default.createElement('circle', { role: 'presentation', cx: '12', cy: '12', r: '12', stroke: 'none' })
        ),
        _react2.default.createElement(
          'g',
          { className: STATUS_ICON + '__detail' },
          _react2.default.createElement('path', { role: 'presentation', d: 'M10,17.4 L5.3,12.7 L6.7,11.3 L10,14.6 L17.3,7.3 L18.7,8.7 L10,17.4 Z', stroke: 'none' })
        )
      );
    }
  }]);
  return OK;
}(_react.Component);

OK.displayName = 'OK';
exports.default = OK;


OK.propTypes = {
  a11yTitle: _react.PropTypes.string
};
module.exports = exports['default'];