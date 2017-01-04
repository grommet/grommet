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

var _CSSClassnames = require('../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

var _Intl = require('../utils/Intl');

var _Intl2 = _interopRequireDefault(_Intl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var COLOR_INDEX = _CSSClassnames2.default.COLOR_INDEX;

var CLASS_ROOT = {
  'control': _CSSClassnames2.default.CONTROL_ICON,
  'logo': _CSSClassnames2.default.LOGO_ICON,
  'status': _CSSClassnames2.default.STATUS_ICON
};

var SVGIcon = function (_Component) {
  (0, _inherits3.default)(SVGIcon, _Component);

  function SVGIcon() {
    (0, _classCallCheck3.default)(this, SVGIcon);
    return (0, _possibleConstructorReturn3.default)(this, (SVGIcon.__proto__ || (0, _getPrototypeOf2.default)(SVGIcon)).apply(this, arguments));
  }

  (0, _createClass3.default)(SVGIcon, [{
    key: 'render',
    value: function render() {
      var _classnames;

      var _props = this.props,
          a11yTitle = _props.a11yTitle,
          children = _props.children,
          className = _props.className,
          colorIndex = _props.colorIndex,
          size = _props.size,
          type = _props.type,
          props = (0, _objectWithoutProperties3.default)(_props, ['a11yTitle', 'children', 'className', 'colorIndex', 'size', 'type']);


      var classRoot = CLASS_ROOT[type];
      var classes = (0, _classnames3.default)(classRoot, (_classnames = {}, (0, _defineProperty3.default)(_classnames, classRoot + '--' + size, size), (0, _defineProperty3.default)(_classnames, COLOR_INDEX + '-' + colorIndex, colorIndex), _classnames), className);

      var iconMessage = _Intl2.default.getMessage(this.context.intl, 'icon');
      var typeMessage = _Intl2.default.getMessage(this.context.intl, type);
      var defaultTitle = typeMessage + ' ' + iconMessage;

      return _react2.default.createElement(
        'svg',
        (0, _extends3.default)({}, props, { className: classes, role: 'img' }),
        _react2.default.createElement(
          'title',
          null,
          a11yTitle || defaultTitle
        ),
        children
      );
    }
  }]);
  return SVGIcon;
}(_react.Component);

SVGIcon.displayName = 'SVGIcon';
exports.default = SVGIcon;
;

SVGIcon.contextTypes = {
  intl: _react.PropTypes.object
};

SVGIcon.defaultProps = {
  type: 'control'
};

SVGIcon.propTypes = {
  a11yTitle: _react.PropTypes.string,
  colorIndex: _react.PropTypes.string,
  size: _react.PropTypes.oneOf(['small', 'medium', 'large', 'xlarge', 'huge']),
  type: _react.PropTypes.oneOf(['control', 'logo', 'status'])
};
module.exports = exports['default'];