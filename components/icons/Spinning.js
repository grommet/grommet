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

var _CSSClassnames = require('../../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

var _Intl = require('../../utils/Intl');

var _Intl2 = _interopRequireDefault(_Intl);

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
      var _props = this.props,
          a11yTitle = _props.a11yTitle,
          className = _props.className,
          small = _props.small,
          props = (0, _objectWithoutProperties3.default)(_props, ['a11yTitle', 'className', 'small']);
      var intl = this.context.intl;

      var classes = (0, _classnames3.default)(CLASS_ROOT, (0, _defineProperty3.default)({}, CLASS_ROOT + '--small', small), className);

      return _react2.default.createElement(
        'svg',
        (0, _extends3.default)({}, props, { className: classes, viewBox: '0 0 48 48', version: '1.1',
          role: 'img', 'aria-label': a11yTitle || _Intl2.default.getMessage(intl, 'Spinning') }),
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


Spinning.contextTypes = {
  intl: _react.PropTypes.object
};

Spinning.propTypes = {
  a11yTitle: _react.PropTypes.string,
  className: _react.PropTypes.string,
  small: _react.PropTypes.bool
};
module.exports = exports['default'];