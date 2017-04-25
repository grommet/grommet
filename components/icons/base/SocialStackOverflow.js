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

var _CSSClassnames = require('../../../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

var _Intl = require('../../../utils/Intl');

var _Intl2 = _interopRequireDefault(_Intl);

var _Props = require('../../../utils/Props');

var _Props2 = _interopRequireDefault(_Props);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.CONTROL_ICON;
var COLOR_INDEX = _CSSClassnames2.default.COLOR_INDEX;

var Icon = function (_Component) {
  _inherits(Icon, _Component);

  function Icon() {
    _classCallCheck(this, Icon);

    return _possibleConstructorReturn(this, (Icon.__proto__ || Object.getPrototypeOf(Icon)).apply(this, arguments));
  }

  _createClass(Icon, [{
    key: 'render',
    value: function render() {
      var _classnames;

      var _props = this.props,
          className = _props.className,
          colorIndex = _props.colorIndex;
      var _props2 = this.props,
          a11yTitle = _props2.a11yTitle,
          size = _props2.size,
          responsive = _props2.responsive;
      var intl = this.context.intl;


      var classes = (0, _classnames3.default)(CLASS_ROOT, CLASS_ROOT + '-social-stack-overflow', className, (_classnames = {}, _defineProperty(_classnames, CLASS_ROOT + '--' + size, size), _defineProperty(_classnames, CLASS_ROOT + '--responsive', responsive), _defineProperty(_classnames, COLOR_INDEX + '-' + colorIndex, colorIndex), _classnames));

      a11yTitle = a11yTitle || _Intl2.default.getMessage(intl, 'social-stack-overflow');

      var restProps = _Props2.default.omit(this.props, Object.keys(Icon.propTypes));
      return _react2.default.createElement(
        'svg',
        _extends({}, restProps, { version: '1.1', viewBox: '0 0 24 24', width: '24px', height: '24px', role: 'img', className: classes, 'aria-label': a11yTitle }),
        _react2.default.createElement('path', { fill: '#FE7A15', fillRule: 'evenodd', d: 'M11.4137208,0.131625 C11.7902208,-0.043875 12.2252208,-0.043875 12.6017208,0.131625 L23.4227208,5.187375 C23.7467208,5.338875 23.7459708,5.800875 23.4204708,5.950875 L12.5154708,10.968375 C12.1929708,11.116875 11.8217208,11.116875 11.4992208,10.968375 L0.594970771,5.950875 C0.269470771,5.800875 0.267970771,5.338875 0.592720771,5.187375 L11.4137208,0.131625 Z M23.4227208,11.6582856 C23.7474708,11.8097856 23.7459708,12.2717856 23.4204708,12.4217856 L12.5162208,17.4392856 C12.1937208,17.5877856 11.8224708,17.5877856 11.4999708,17.4392856 L0.594970771,12.4217856 C0.269470771,12.2717856 0.267970771,11.8097856 0.592720771,11.6582856 L2.82772077,10.6142856 C3.15172077,10.4627856 3.52597077,10.4620356 3.85072077,10.6112856 L11.4999708,14.1302856 C11.8224708,14.2787856 12.1937208,14.2787856 12.5162208,14.1302856 L20.1647208,10.6112856 C20.4894708,10.4620356 20.8637208,10.4627856 21.1877208,10.6142856 L23.4227208,11.6582856 Z M23.4227208,18.1582856 C23.7474708,18.3097856 23.7459708,18.7717856 23.4204708,18.9217856 L12.5162208,23.9392856 C12.1937208,24.0877856 11.8224708,24.0877856 11.4999708,23.9392856 L0.594970771,18.9217856 C0.269470771,18.7717856 0.267970771,18.3097856 0.592720771,18.1582856 L2.82772077,17.1142856 C3.15172077,16.9627856 3.52597077,16.9620356 3.85072077,17.1112856 L11.4999708,20.6302856 C11.8224708,20.7787856 12.1937208,20.7787856 12.5162208,20.6302856 L20.1647208,17.1112856 C20.4894708,16.9620356 20.8637208,16.9627856 21.1877208,17.1142856 L23.4227208,18.1582856 Z', stroke: 'none' })
      );
    }
  }]);

  return Icon;
}(_react.Component);

Icon.displayName = 'Icon';
exports.default = Icon;
;

Icon.contextTypes = {
  intl: _propTypes2.default.object
};

Icon.defaultProps = {
  responsive: true
};

Icon.displayName = 'SocialStackOverflow';

Icon.icon = true;

Icon.propTypes = {
  a11yTitle: _propTypes2.default.string,
  colorIndex: _propTypes2.default.string,
  size: _propTypes2.default.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge', 'huge']),
  responsive: _propTypes2.default.bool
};
module.exports = exports['default'];