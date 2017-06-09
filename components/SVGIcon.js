'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _CSSClassnames = require('../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

var _Intl = require('../utils/Intl');

var _Intl2 = _interopRequireDefault(_Intl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var COLOR_INDEX = _CSSClassnames2.default.COLOR_INDEX;

var CLASS_ROOT = {
  'control': _CSSClassnames2.default.CONTROL_ICON,
  'logo': _CSSClassnames2.default.LOGO_ICON,
  'status': _CSSClassnames2.default.STATUS_ICON
};

var SVGIcon = function (_Component) {
  _inherits(SVGIcon, _Component);

  function SVGIcon() {
    _classCallCheck(this, SVGIcon);

    return _possibleConstructorReturn(this, (SVGIcon.__proto__ || Object.getPrototypeOf(SVGIcon)).apply(this, arguments));
  }

  _createClass(SVGIcon, [{
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
          props = _objectWithoutProperties(_props, ['a11yTitle', 'children', 'className', 'colorIndex', 'size', 'type']);

      var classRoot = CLASS_ROOT[type];
      var classes = (0, _classnames3.default)(classRoot, (_classnames = {}, _defineProperty(_classnames, classRoot + '--' + size, size), _defineProperty(_classnames, COLOR_INDEX + '-' + colorIndex, colorIndex), _classnames), className);

      var iconMessage = _Intl2.default.getMessage(this.context.intl, 'icon');
      var typeMessage = _Intl2.default.getMessage(this.context.intl, type);
      var defaultTitle = typeMessage + ' ' + iconMessage;

      return _react2.default.createElement(
        'svg',
        _extends({}, props, { className: classes, role: 'img' }),
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


SVGIcon.contextTypes = {
  intl: _propTypes2.default.object
};

SVGIcon.defaultProps = {
  type: 'control'
};

SVGIcon.propTypes = {
  a11yTitle: _propTypes2.default.string,
  colorIndex: _propTypes2.default.string,
  size: _propTypes2.default.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge', 'huge']),
  type: _propTypes2.default.oneOf(['control', 'logo', 'status'])
};
module.exports = exports['default'];