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

var _lastId = 0;

var Unknown = function (_Component) {
  (0, _inherits3.default)(Unknown, _Component);

  function Unknown() {
    (0, _classCallCheck3.default)(this, Unknown);
    return (0, _possibleConstructorReturn3.default)(this, (Unknown.__proto__ || (0, _getPrototypeOf2.default)(Unknown)).apply(this, arguments));
  }

  (0, _createClass3.default)(Unknown, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          a11yTitle = _props.a11yTitle,
          className = _props.className,
          props = (0, _objectWithoutProperties3.default)(_props, ['a11yTitle', 'className']);

      var classes = (0, _classnames2.default)(CLASS_ROOT, CLASS_ROOT + '-unknown', className);
      // generate an id to avoid duplication in the DOM
      var maskId = 'mask-uknown-' + _lastId++;
      return _react2.default.createElement(
        'svg',
        (0, _extends3.default)({}, props, { className: classes, viewBox: '0 0 24 24', role: 'img',
          'aria-label': a11yTitle, version: '1.1' }),
        _react2.default.createElement(
          'defs',
          null,
          _react2.default.createElement(
            'mask',
            { id: maskId },
            _react2.default.createElement(
              'g',
              { className: CLASS_ROOT + '__detail' },
              _react2.default.createElement('rect', { x: '0', y: '0', width: '24', height: '24', fill: '#fff' }),
              _react2.default.createElement('circle', { cx: '12', cy: '12', r: '10', stroke: 'none', fill: '#000' }),
              _react2.default.createElement('path', {
                d: 'M9,10.4 C9,8.8 10.4,7.6 12,7.6 C13.6,7.6 14.9,9 15,10.4 ' + 'C15,11.7 14.1,12.7 12.9,13.1 C12.4,13.2 12,13.7 12,14.2 ' + 'L12,15.5', fill: 'none', strokeWidth: '2', stroke: '#fff' }),
              _react2.default.createElement('circle', { stroke: 'none', cx: '12', cy: '17.6', r: '1', fill: '#fff' })
            )
          )
        ),
        _react2.default.createElement(
          'g',
          { className: CLASS_ROOT + '__base', mask: 'url(#' + maskId + ')' },
          _react2.default.createElement('circle', { className: CLASS_ROOT + '__normal',
            cx: '12', cy: '12', r: '12', stroke: 'none' }),
          _react2.default.createElement('circle', { className: CLASS_ROOT + '__small',
            cx: '12', cy: '12', r: '11', strokeWidth: '3', fill: 'none' })
        )
      );
    }
  }]);
  return Unknown;
}(_react.Component);

Unknown.displayName = 'Unknown';
exports.default = Unknown;


Unknown.propTypes = {
  a11yTitle: _react.PropTypes.string,
  className: _react.PropTypes.string
};

Unknown.defaultProps = {
  a11yTitle: 'Unknown'
};
module.exports = exports['default'];