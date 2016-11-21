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

var Warning = function (_Component) {
  (0, _inherits3.default)(Warning, _Component);

  function Warning() {
    (0, _classCallCheck3.default)(this, Warning);
    return (0, _possibleConstructorReturn3.default)(this, (Warning.__proto__ || (0, _getPrototypeOf2.default)(Warning)).apply(this, arguments));
  }

  (0, _createClass3.default)(Warning, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          a11yTitle = _props.a11yTitle,
          className = _props.className,
          props = (0, _objectWithoutProperties3.default)(_props, ['a11yTitle', 'className']);

      var classes = (0, _classnames2.default)(CLASS_ROOT, CLASS_ROOT + '-warning', className);
      return _react2.default.createElement(
        'svg',
        (0, _extends3.default)({}, props, { className: classes, viewBox: '0 0 24 24', role: 'img',
          'aria-label': a11yTitle, version: '1.1' }),
        _react2.default.createElement(
          'g',
          { className: CLASS_ROOT + '__base' },
          _react2.default.createElement('path', { role: 'presentation', d: 'M12,0 L0,22 L24,22 L12,0 L12,0 Z',
            stroke: 'none' })
        ),
        _react2.default.createElement(
          'g',
          { className: CLASS_ROOT + '__detail', strokeWidth: '2',
            transform: 'translate(11.000000, 8.000000)' },
          _react2.default.createElement('path', { role: 'presentation', d: 'M1,0 L1,6', fill: 'none' }),
          _react2.default.createElement('path', { role: 'presentation', d: 'M1,8 L1,10', fill: 'none' })
        )
      );
    }
  }]);
  return Warning;
}(_react.Component);

Warning.displayName = 'Warning';
exports.default = Warning;


Warning.propTypes = {
  a11yTitle: _react.PropTypes.string,
  className: _react.PropTypes.string
};

Warning.defaultProps = {
  a11yTitle: 'Warning'
};
module.exports = exports['default'];