'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _CSSClassnames = require('../../../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CLASS_ROOT = _CSSClassnames2.default.STATUS_ICON; // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var OK = function (_Component) {
  (0, _inherits3.default)(OK, _Component);

  function OK() {
    (0, _classCallCheck3.default)(this, OK);
    return (0, _possibleConstructorReturn3.default)(this, (OK.__proto__ || (0, _getPrototypeOf2.default)(OK)).apply(this, arguments));
  }

  (0, _createClass3.default)(OK, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          a11yTitle = _props.a11yTitle,
          className = _props.className,
          props = (0, _objectWithoutProperties3.default)(_props, ['a11yTitle', 'className']);

      var classes = (0, _classnames2.default)(CLASS_ROOT, CLASS_ROOT + '-ok', className);
      return _react2.default.createElement(
        'svg',
        (0, _extends3.default)({}, props, { className: classes, viewBox: '0 0 24 24', role: 'img',
          'aria-label': a11yTitle, version: '1.1' }),
        _react2.default.createElement(
          'g',
          { className: CLASS_ROOT + '__base' },
          _react2.default.createElement('circle', { cx: '12', cy: '12', r: '12', stroke: 'none' })
        ),
        _react2.default.createElement(
          'g',
          { className: CLASS_ROOT + '__detail' },
          _react2.default.createElement('path', {
            d: 'M10,17.4 L5.3,12.7 L6.7,11.3 L10,14.6 L17.3,7.3 L18.7,8.7 ' + 'L10,17.4 Z', stroke: 'none' })
        )
      );
    }
  }]);
  return OK;
}(_react.Component);

OK.displayName = 'OK';
exports.default = OK;


OK.propTypes = {
  a11yTitle: _react.PropTypes.string,
  className: _react.PropTypes.string
};

OK.defaultProps = {
  a11yTitle: 'OK'
};
module.exports = exports['default'];