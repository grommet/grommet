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


      var classes = (0, _classnames3.default)(CLASS_ROOT, CLASS_ROOT + '-platform-internet-explorer', className, (_classnames = {}, _defineProperty(_classnames, CLASS_ROOT + '--' + size, size), _defineProperty(_classnames, CLASS_ROOT + '--responsive', responsive), _defineProperty(_classnames, COLOR_INDEX + '-' + colorIndex, colorIndex), _classnames));

      a11yTitle = a11yTitle || _Intl2.default.getMessage(intl, 'platform-internet-explorer');

      var restProps = _Props2.default.omit(this.props, Object.keys(Icon.propTypes));
      return _react2.default.createElement(
        'svg',
        _extends({}, restProps, { version: '1.1', viewBox: '0 0 24 24', width: '24px', height: '24px', role: 'img', className: classes, 'aria-label': a11yTitle }),
        _react2.default.createElement('path', { fillRule: 'evenodd', d: 'M23.9995527,12.3365818 C23.9995527,10.4393317 23.5090273,8.656914 22.6488466,7.1080745 C26.3153205,-1.18993486 18.7201703,0.0254770168 18.2972919,0.108218948 C16.688185,0.423085539 15.1995011,0.928594013 13.8263205,1.56939672 C13.6238264,1.55799176 13.4201024,1.5517302 13.2148129,1.5517302 C8.09006842,1.5517302 3.80034655,5.12618162 2.70245058,9.91794575 C5.40352737,6.88769025 7.29384506,5.6650105 8.42584412,5.17571497 C8.24515364,5.33717355 8.06826481,5.50042114 7.89428312,5.66489868 C7.83636377,5.71957545 7.78056888,5.7750349 7.72343222,5.83004711 C7.60871165,5.94040695 7.49421471,6.05087861 7.38240129,6.16235659 C7.3158723,6.22866195 7.25113233,6.29552637 7.18560967,6.36227899 C7.08643116,6.4632465 6.98747629,6.56410221 6.89064586,6.6656288 C6.82188061,6.73774845 6.75479256,6.81009173 6.68725725,6.8823232 C6.59680019,6.97915363 6.5069022,7.07609586 6.41868142,7.17337354 C6.35013979,7.24895941 6.2827163,7.32454528 6.21540462,7.40035478 C6.13176818,7.49450168 6.04891444,7.58864858 5.96717882,7.68301911 C5.89941989,7.7612885 5.83222003,7.8395579 5.76580285,7.9179391 C5.68831615,8.00940248 5.61183578,8.10086586 5.53613809,8.19232924 C5.46916185,8.27328215 5.40240924,8.35412326 5.33688657,8.43496436 C5.26599687,8.52240245 5.19667255,8.60972873 5.12746004,8.6969432 C5.06037199,8.78147415 4.99328393,8.86589328 4.92776127,8.95031241 C4.86536938,9.03070626 4.80476651,9.11076467 4.74371638,9.19093489 C4.67483931,9.28150376 4.60540318,9.37207263 4.53831513,9.46219425 C4.49034717,9.52671059 4.44428004,9.59055606 4.39720659,9.65484877 C3.97108565,10.2362786 3.58175132,10.806527 3.23009811,11.3543009 C3.2292036,11.3556427 3.22830909,11.3569845 3.2275264,11.3583262 C3.13494489,11.5025655 3.04560597,11.6446804 2.95805606,11.7855653 C2.95335989,11.7931686 2.9484401,11.8008838 2.94374394,11.8085989 C2.85608222,11.9500429 2.77143946,12.0890269 2.68892115,12.2265574 C2.68601401,12.2313654 2.68299504,12.2362852 2.68008789,12.2410932 C2.45825007,12.6113074 2.25251338,12.9682159 2.06723854,13.3039916 C1.09591536,15.0642702 0.623056401,16.294106 0.602594545,16.3671202 C-2.4646712,27.332886 7.10834659,22.7021332 8.44418153,22.0109026 C9.88254936,22.7214769 11.5018313,23.1214335 13.2148129,23.1214335 C17.9042678,23.1214335 21.894106,20.1280764 23.3792119,15.9479317 L17.7125077,15.9479317 C16.8740189,17.3644959 15.2597686,18.3239669 13.4052312,18.3239669 C10.6880532,18.3239669 8.48544068,16.2652582 8.48544068,13.72564 L23.9112201,13.72564 C23.9696986,13.270783 24,12.8072045 24,12.3365818 L23.9995527,12.3365818 Z M21.9848985,1.72369924 C22.9136208,2.35052528 23.6585218,3.33493063 22.3792645,6.65008673 C21.1523358,4.6769153 19.3064081,3.12908212 17.1124051,2.27829381 C18.1104517,1.79626615 20.5820874,0.776751388 21.9848985,1.72369924 L21.9848985,1.72369924 Z M2.24759358,21.9887635 C1.4911758,21.213002 1.35744695,19.3235789 3.02659768,15.88062 C3.86899999,18.3026105 5.55000295,20.3320241 7.72276134,21.6200029 C6.64219644,22.2147385 3.77351133,23.553816 2.24759358,21.9887635 L2.24759358,21.9887635 Z M8.46117717,10.7761138 C8.54738531,8.3078325 10.6955447,6.3315303 13.3349005,6.3315303 C15.9741445,6.3315303 18.1224157,8.3078325 18.2086239,10.7761138 L8.46117717,10.7761138 L8.46117717,10.7761138 Z' })
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

Icon.displayName = 'PlatformInternetExplorer';

Icon.icon = true;

Icon.propTypes = {
  a11yTitle: _propTypes2.default.string,
  colorIndex: _propTypes2.default.string,
  size: _propTypes2.default.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge', 'huge']),
  responsive: _propTypes2.default.bool
};
module.exports = exports['default'];