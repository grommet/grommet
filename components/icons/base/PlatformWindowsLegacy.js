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


      var classes = (0, _classnames3.default)(CLASS_ROOT, CLASS_ROOT + '-platform-windows-legacy', className, (_classnames = {}, _defineProperty(_classnames, CLASS_ROOT + '--' + size, size), _defineProperty(_classnames, CLASS_ROOT + '--responsive', responsive), _defineProperty(_classnames, COLOR_INDEX + '-' + colorIndex, colorIndex), _classnames));

      a11yTitle = a11yTitle || _Intl2.default.getMessage(intl, 'platform-windows-legacy');

      var restProps = _Props2.default.omit(this.props, Object.keys(Icon.propTypes));
      return _react2.default.createElement(
        'svg',
        _extends({}, restProps, { version: '1.1', viewBox: '0 0 24 24', width: '24px', height: '24px', role: 'img', className: classes, 'aria-label': a11yTitle }),
        _react2.default.createElement('path', { fillRule: 'evenodd', d: 'M2.61341757,10.0962984 C2.7158178,9.7382976 2.805018,9.42456355 2.89541821,9.11136284 C3.56075305,6.80989096 4.22662122,4.50828575 4.8912894,2.2065472 C4.91715612,2.11628032 4.94488952,2.04348016 5.04795642,2.0020134 C6.19889236,1.54067902 7.37476169,1.17694486 8.61343117,1.04307789 C10.2790349,0.862810817 11.8078384,1.25227837 13.2198416,2.13694704 C13.4037087,2.25228063 13.5815758,2.37681425 13.7695762,2.48414783 C13.8894431,2.55294798 13.9063765,2.62561481 13.8678431,2.75601511 C13.3153085,4.65268607 12.7681072,6.55149038 12.2195727,8.44962801 C12.0282389,9.11136284 11.8315718,9.77229768 11.6463714,10.4362992 C11.6051713,10.5840328 11.5710379,10.6089662 11.4346376,10.515766 C10.6210357,9.96309811 9.7627671,9.49949706 8.80209826,9.25256316 C7.58996218,8.94109579 6.3794261,9.00362927 5.1699567,9.26842987 C4.30822141,9.45709696 3.47768619,9.74189761 2.61341757,10.0962984 Z M17.2771841,13.0252117 C15.748114,13.0356117 14.3994443,12.4986772 13.1433081,11.673742 C12.7882406,11.4397415 12.7886406,11.4422748 12.9053076,11.0392072 C13.6165092,8.58053497 14.3261108,6.12119607 15.0394457,3.66292383 C15.1090459,3.42198995 15.0575791,3.37798985 15.3281131,3.5593236 C16.2241151,4.15892495 17.1677172,4.65252607 18.2365196,4.8690599 C19.3649222,5.09746041 20.4851914,5.01946024 21.5987939,4.77025967 C22.2990622,4.61345932 22.9791971,4.39345882 23.6470652,4.13545823 C23.7433321,4.09852482 23.841999,4.03665801 23.9410659,4.12825822 C24.0378661,4.21772509 23.993066,4.31839198 23.9631993,4.42092555 C23.2499977,6.88613113 22.5371961,9.35133672 21.8289278,11.8178756 C21.7963944,11.9330759 21.7361276,11.9893427 21.629594,12.0320095 C20.4671914,12.4973439 19.2778553,12.8633447 18.0245192,12.982945 C17.7765186,13.0066783 17.5266514,13.0116117 17.2771841,13.0252117 Z M21.3774601,13.3517725 C21.2214597,13.8916403 21.0781261,14.3883081 20.9345258,14.8851093 C20.3333244,16.9657806 19.7294564,19.0467187 19.133855,21.1296567 C19.0849216,21.2995238 18.999188,21.3868573 18.8355877,21.4499241 C17.8101187,21.8453917 16.767183,22.1704591 15.6730472,22.3241928 C13.9798433,22.5615267 12.4050398,22.2415259 10.9429031,21.3605906 C10.7010359,21.2151236 10.4675687,21.0545899 10.2238348,20.9119229 C10.1034345,20.8412561 10.0921012,20.7668559 10.1301013,20.638989 C10.6530358,18.8428516 11.1705036,17.0445808 11.6902381,15.2472434 C11.9013053,14.5156418 12.1131724,13.7837734 12.3247729,13.0528384 C12.3922397,12.8223046 12.3930397,12.8233713 12.6042402,12.9623049 C13.3642419,13.4640394 14.1561104,13.8985737 15.0387791,14.1489743 C16.3118486,14.5093751 17.5858515,14.4499083 18.8613211,14.1671076 C19.7098563,13.9795072 20.5285248,13.6953732 21.3774601,13.3517725 Z M11.1789303,12.0465695 C11.0506634,12.4885705 10.9317298,12.8983048 10.8131962,13.3081724 C10.1897281,15.4641772 9.56425999,17.6203155 8.94679192,19.7783204 C8.8931918,19.9633874 8.84385836,19.9676541 8.69425802,19.8655205 C7.83718941,19.2809859 6.92972068,18.8009848 5.9074517,18.5680509 C4.74984908,18.3036503 3.5983798,18.3749838 2.44904386,18.6268511 C1.72917556,18.7844514 1.03050731,19.0113853 0.342905756,19.2757859 C0.252505551,19.3104526 0.159972008,19.3605861 0.0658384616,19.2835192 C-0.0394951104,19.1976524 0.00623832657,19.0928521 0.0351717255,18.9928519 C0.746506671,16.5340463 1.45837495,14.0755074 2.16810989,11.6163019 C2.19837663,11.5137683 2.24971008,11.4544348 2.35291031,11.4131014 C3.53371299,10.9380337 4.74171573,10.5690995 6.01571861,10.4512325 C7.58705551,10.3065656 9.0422588,10.6633664 10.3882619,11.4799015 C10.618129,11.6195019 10.8451962,11.7648355 11.0723967,11.9100359 C11.1302635,11.9475026 11.2103971,11.980036 11.1789303,12.0465695 Z' })
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

Icon.displayName = 'PlatformWindowsLegacy';

Icon.icon = true;

Icon.propTypes = {
  a11yTitle: _propTypes2.default.string,
  colorIndex: _propTypes2.default.string,
  size: _propTypes2.default.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge', 'huge']),
  responsive: _propTypes2.default.bool
};
module.exports = exports['default'];