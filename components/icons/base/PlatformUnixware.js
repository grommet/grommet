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


      var classes = (0, _classnames3.default)(CLASS_ROOT, CLASS_ROOT + '-platform-unixware', className, (_classnames = {}, _defineProperty(_classnames, CLASS_ROOT + '--' + size, size), _defineProperty(_classnames, CLASS_ROOT + '--responsive', responsive), _defineProperty(_classnames, COLOR_INDEX + '-' + colorIndex, colorIndex), _classnames));

      a11yTitle = a11yTitle || _Intl2.default.getMessage(intl, 'platform-unixware');

      var restProps = _Props2.default.omit(this.props, Object.keys(Icon.propTypes));
      return _react2.default.createElement(
        'svg',
        _extends({}, restProps, { version: '1.1', viewBox: '0 0 24 24', width: '24px', height: '24px', role: 'img', className: classes, 'aria-label': a11yTitle }),
        _react2.default.createElement('path', { fillRule: 'evenodd', d: 'M11.1202881,4.92721589 L19.7127168,8.40180443 L19.7127168,4.92721589 L11.1202881,4.92721589 Z M5,4.92721589 L5,24 L8.13126023,24 L5.68766714,21.7034393 L15.7579991,10.8346606 L8.99134942,8.09586582 L10.2724516,4.92721589 L5,4.92721589 Z M9.27644581,24 L19.7127168,24 L19.7127168,12.6521027 L9.27644581,24 Z M17.6912987,2.17525891 C17.5552558,2.17525891 17.4922239,2.37433375 17.4922239,2.76212546 L17.9008578,2.76212546 C17.9008578,2.36397579 17.8379522,2.17525891 17.6912987,2.17525891 M14.9250301,3.47443696 C14.9250301,3.61073248 14.9986726,3.70483829 15.1032627,3.70483829 C15.1974948,3.70483829 15.2919796,3.62096412 15.3546326,3.46395269 L15.3546326,2.92976012 C15.0509677,3.1077401 14.9250301,3.28584639 14.9250301,3.47443696 M17.8694177,3.71547414 C18.0054606,3.71547414 18.1209139,3.64208424 18.2256303,3.50591503 L18.2256303,3.87261189 C18.0893347,3.99842315 17.9530392,4.05071819 17.7959014,4.05071819 C17.3875201,4.05071819 17.1360239,3.68402133 17.1360239,2.95062761 C17.1360239,2.26952893 17.3454567,1.85053703 17.7122799,1.85053703 C17.9324496,1.85053703 18.0577556,1.99706419 18.1417561,2.16481253 C18.2045354,2.26952893 18.2675673,2.53150939 18.2675673,3.03437546 L17.5027208,3.03437546 C17.5027208,3.47446222 17.6284057,3.71547414 17.8694177,3.71547414 L17.8694177,3.71547414 Z M17.0415392,2.3113397 C16.9889915,2.28026583 16.9474334,2.25904466 16.8844014,2.25904466 C16.6013261,2.25904466 16.4862518,2.92965907 16.4862518,3.1707973 L16.4862518,3.99842315 L16.1195549,3.99842315 L16.1195549,1.91331634 L16.4862518,1.91331634 L16.4862518,2.47934067 L16.496736,2.47934067 C16.6433895,1.97634828 16.7166531,1.88186353 16.8844014,1.88186353 C16.957665,1.88186353 17.0102127,1.89247411 17.072992,1.93428488 L17.0415392,2.3113397 Z M15.9309643,3.89358044 C15.7947951,4.00903374 15.7214052,4.05071819 15.6375311,4.05071819 C15.5119724,4.05071819 15.4177403,3.95635975 15.3756769,3.77812714 C15.239634,3.96684402 15.1033385,4.05071819 14.9671693,4.05071819 C14.7469996,4.05071819 14.5582827,3.80957995 14.5582827,3.52688358 C14.5582827,3.18115526 14.7783261,3.01340692 15.3547084,2.67803656 L15.3547084,2.47934067 C15.3547084,2.29037115 15.2920554,2.20674962 15.1347913,2.20674962 C14.9878852,2.20674962 14.8308738,2.30085543 14.6109567,2.55247794 L14.6109567,2.12300176 C14.8308738,1.92380061 14.9671693,1.85053703 15.1661178,1.85053703 C15.4387089,1.85053703 15.7214052,2.02864332 15.7214052,2.41630873 L15.7214052,3.60002084 C15.7214052,3.6945056 15.7423738,3.71547414 15.7843109,3.71547414 C15.8052794,3.71547414 15.8575744,3.68402133 15.9309643,3.61075775 L15.9309643,3.89358044 Z M13.6680039,4.04023392 L13.2382751,1.93428488 L13.2277908,1.93428488 L12.8191568,4.04023392 L12.5362078,4.04023392 L11.8763303,0.855036529 L12.2954486,0.855036529 L12.6621454,2.97159615 L12.6722507,2.97159615 L13.0914953,0.855036529 L13.3850549,0.855036529 L13.7936888,3.01340692 L14.1915858,0.855036529 L14.6213146,0.855036529 L13.9403423,4.04023392 L13.6680039,4.04023392 Z M11.4570858,3.99842315 L11.1428103,3.27538738 L10.8601139,3.99842315 L10.4720696,3.99842315 L10.9542197,2.92965907 L10.4720696,1.91331634 L10.8601139,1.91331634 L11.1428103,2.57344648 L11.4151487,1.91331634 L11.7924562,1.91331634 L11.3420115,2.92965907 L11.8448775,3.99842315 L11.4570858,3.99842315 Z M10.0846568,1.23234398 C9.95884555,1.23234398 9.86473974,1.13798554 9.86473974,1.02278487 C9.86473974,0.897099931 9.95884555,0.80274149 10.0846568,0.80274149 C10.1997312,0.80274149 10.2940896,0.897099931 10.2940896,1.02278487 C10.2940896,1.13798554 10.1997312,1.23234398 10.0846568,1.23234398 L10.0846568,1.23234398 Z M9.89606624,3.99842315 L10.2625105,3.99842315 L10.2625105,1.91319002 L9.89606624,1.91319002 L9.89606624,3.99842315 Z M9.53997997,3.99842315 L9.17315679,3.99842315 L9.17315679,2.49993026 C9.17315679,2.3220766 9.12060912,2.20674962 8.97395564,2.20674962 C8.85875497,2.20674962 8.7748808,2.29037115 8.69125927,2.45811949 L8.69125927,3.99842315 L8.32443609,3.99842315 L8.32443609,1.91331634 L8.69125927,1.91331634 L8.69125927,2.13335972 L8.70174354,2.13335972 C8.80633362,1.95525343 8.92178692,1.88186353 9.07867203,1.88186353 C9.34077882,1.88186353 9.53997997,2.08106468 9.53997997,2.49993026 L9.53997997,3.99842315 Z M7.92628642,3.19176585 C7.92628642,3.87261189 7.47571539,4.04023392 7.22447183,4.04023392 C6.83668011,4.04023392 6.52215197,3.72595841 6.52215197,3.22309234 L6.52215197,0.855036529 L6.93078592,0.855036529 L6.93078592,3.22309234 C6.93078592,3.48494649 7.02527067,3.6631791 7.22447183,3.6631791 C7.38160958,3.6631791 7.51765247,3.53749416 7.51765247,3.23357662 L7.51765247,0.855036529 L7.92628642,0.855036529 L7.92628642,3.19176585 Z M5.00003789,4.92722853 L19.7127547,4.92722853 L19.7127547,0 L5.00003789,0 L5.00003789,4.92722853 Z', opacity: '.8' })
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

Icon.displayName = 'PlatformUnixware';

Icon.icon = true;

Icon.propTypes = {
  a11yTitle: _propTypes2.default.string,
  colorIndex: _propTypes2.default.string,
  size: _propTypes2.default.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge', 'huge']),
  responsive: _propTypes2.default.bool
};
module.exports = exports['default'];