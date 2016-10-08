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

var _Intl = require('../../utils/Intl');

var _Intl2 = _interopRequireDefault(_Intl);

var _CSSClassnames = require('../../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

var _Button = require('../Button');

var _Button2 = _interopRequireDefault(_Button);

var _Expand = require('../icons/base/Expand');

var _Expand2 = _interopRequireDefault(_Expand);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CLASS_ROOT = _CSSClassnames2.default.VIDEO; // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var BUTTON_CLASS = CLASS_ROOT + '__button';

var FullscreenButton = function (_Component) {
  (0, _inherits3.default)(FullscreenButton, _Component);

  function FullscreenButton() {
    (0, _classCallCheck3.default)(this, FullscreenButton);
    return (0, _possibleConstructorReturn3.default)(this, (FullscreenButton.__proto__ || (0, _getPrototypeOf2.default)(FullscreenButton)).apply(this, arguments));
  }

  (0, _createClass3.default)(FullscreenButton, [{
    key: 'shouldComponentUpdate',


    // prevents unnecessarily updates/re-renders
    // only update component if the onClick prop changes
    value: function shouldComponentUpdate(nextProps) {
      return this.props.onClick !== nextProps.onClick;
    }
  }, {
    key: 'render',
    value: function render() {
      var a11yExpandButtonTitle = _Intl2.default.getMessage(this.context.intl, 'Toggle Fullscreen');

      return _react2.default.createElement(
        _Button2.default,
        { plain: true, className: BUTTON_CLASS, onClick: this.props.onClick,
          a11yTitle: a11yExpandButtonTitle },
        _react2.default.createElement(_Expand2.default, { className: BUTTON_CLASS + '__icon', colorIndex: 'brand' })
      );
    }
  }]);
  return FullscreenButton;
}(_react.Component);

FullscreenButton.displayName = 'FullscreenButton';
exports.default = FullscreenButton;


FullscreenButton.propTypes = {
  onClick: _react.PropTypes.func
};
module.exports = exports['default'];