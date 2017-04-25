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


      var classes = (0, _classnames3.default)(CLASS_ROOT, CLASS_ROOT + '-standards-performance', className, (_classnames = {}, _defineProperty(_classnames, CLASS_ROOT + '--' + size, size), _defineProperty(_classnames, CLASS_ROOT + '--responsive', responsive), _defineProperty(_classnames, COLOR_INDEX + '-' + colorIndex, colorIndex), _classnames));

      a11yTitle = a11yTitle || _Intl2.default.getMessage(intl, 'standards-performance');

      var restProps = _Props2.default.omit(this.props, Object.keys(Icon.propTypes));
      return _react2.default.createElement(
        'svg',
        _extends({}, restProps, { version: '1.1', viewBox: '0 0 24 24', width: '24px', height: '24px', role: 'img', className: classes, 'aria-label': a11yTitle }),
        _react2.default.createElement('path', { fillRule: 'evenodd', d: 'M23.8361843,10.0088088 L20.3254787,8.55272346 L21.7710634,5.06214399 C21.4017917,4.54586375 21.0027684,4.05758515 20.5634926,3.61305911 C20.5372411,3.58505747 20.5109896,3.55618078 20.4829879,3.52817914 C20.4383603,3.48355152 20.3893574,3.44067401 20.3403546,3.39517134 C19.9107044,2.97339664 19.4381767,2.59099924 18.9402725,2.23222822 L15.4496931,3.6760628 L13.9944828,0.166232202 C12.7300338,-0.0472803049 11.454209,-0.0525306124 10.2195117,0.135605408 C10.1967604,0.138230562 10.1775092,0.139980664 10.1591332,0.141730767 C10.105755,0.149606228 10.054127,0.160981895 10.0059992,0.172357561 L8.55078896,3.6743127 L5.04008331,2.22172761 C3.99177191,2.96989643 3.08084355,3.86944913 2.33704998,4.88538364 C2.33004957,4.89588425 2.32129905,4.90638487 2.31342359,4.91776053 C2.2827968,4.95976299 2.25304506,5.00351556 2.22416836,5.04814317 L3.6741283,8.5483482 L0.164297703,10.0053085 C-0.045714599,11.2697576 -0.052715009,12.5420821 0.133670909,13.7759044 C0.136296063,13.7977807 0.138046165,13.8214071 0.142421421,13.8424083 C0.14854678,13.8940363 0.159047395,13.9439143 0.168672959,13.9946672 L3.6741283,15.4455022 L2.22416836,18.9448322 C2.55756289,19.4121096 2.91720896,19.8601358 3.30835687,20.2705349 C3.37748592,20.3431641 3.44311477,20.4192936 3.51574402,20.4910478 C3.56562194,20.5426758 3.62250027,20.5899286 3.6758784,20.6398065 C4.09765311,21.0502055 4.56230533,21.4221023 5.04970888,21.7712478 L8.54728875,20.3221629 L9.99812374,23.8267432 C10.0497518,23.8372438 10.10488,23.8468693 10.1573831,23.8591201 C10.1696338,23.85737 10.1853847,23.8599951 10.1985105,23.8617452 C11.4384581,24.0525064 12.716908,24.046381 13.9901076,23.8346186 L15.4444428,20.323913 L18.9463979,21.774748 C18.9919006,21.7476214 19.0365282,21.7169946 19.0794057,21.6846177 C19.0925315,21.6767422 19.1056572,21.6653666 19.1205331,21.6539909 C20.1277171,20.9136975 21.0263947,20.0071444 21.7736885,18.9614582 L20.3193533,15.4490024 L23.8248087,13.9981674 C23.8335592,13.9482895 23.8449348,13.8949114 23.8545604,13.8406582 C23.8563105,13.8249073 23.8563105,13.8082813 23.8589357,13.7925304 C24.053197,12.5543329 24.0479467,11.2785081 23.8361843,10.0088088 L23.8361843,10.0088088 Z M20.9992682,12.6558388 L17.3048017,14.1863035 L17.3100521,14.2003043 L17.2978013,14.2046795 L18.829141,17.8973958 C18.5438743,18.2299153 18.2332311,18.5379334 17.8989615,18.8275753 L14.2044951,17.2988608 L14.2001199,17.3111115 L14.1878692,17.3049861 L12.6582796,20.9977024 C12.221629,21.0300793 11.7858535,21.0283292 11.3439526,20.9994526 L9.81261287,17.3049861 L9.80211226,17.3093614 L9.7959869,17.2953606 L6.09014482,18.8310755 C6.05164257,18.7986986 6.00876505,18.7698219 5.9702628,18.7339448 C5.84775562,18.6254385 5.73224886,18.5020563 5.61586704,18.3839243 C5.49948522,18.2675425 5.3778531,18.155536 5.26672159,18.0321537 C5.23434469,17.9971517 5.20459295,17.951649 5.171341,17.9122717 L6.70443081,14.2064296 L6.69218009,14.2003043 L6.69830545,14.1889286 L3.00296398,12.658464 C2.97408729,12.2174381 2.97146214,11.7790374 3.00558914,11.344137 L6.69655534,9.81542242 L6.69305514,9.80404676 L6.70355575,9.7996715 L5.17046595,6.10170488 C5.46010792,5.76831036 5.76900101,5.45679211 6.09977039,5.17240045 L9.7942368,6.701115 L9.79861205,6.69061438 L9.80911267,6.69498964 L11.3404524,3.00052323 C11.7814782,2.96989643 12.2190038,2.96989643 12.6556544,3.00227333 L14.184369,6.69673974 L14.2001199,6.7028651 L17.8945863,5.17240045 C18.0547207,5.3132837 18.2087297,5.46379252 18.3636138,5.61517639 C18.5193729,5.77356066 18.675132,5.93281999 18.8203905,6.10170488 L17.291676,9.79442119 L17.3039267,9.79879645 L17.2986764,9.81279727 L20.9922677,11.3415118 C21.03077,11.7781624 21.0316451,12.2165631 20.9992682,12.6558388 L20.9992682,12.6558388 Z M15.1022977,10.7193504 L15.0970474,10.7088498 L15.9922249,8.55447356 C15.8285903,8.36108723 15.6448295,8.18170173 15.4505681,8.00931663 L13.2926917,8.90186891 L13.2900666,8.8966186 L13.2830662,8.89836871 L12.3905139,6.74224241 C12.135874,6.72211623 11.880359,6.72211623 11.6230939,6.74224241 L10.7296666,8.89749365 L10.7235412,8.89749365 L10.720041,8.90011881 L8.56303968,8.01019168 C8.3705284,8.17382626 8.19114289,8.35496187 8.01788274,8.5483482 L8.91306018,10.7070997 L8.90605977,10.7097248 L8.90868492,10.7176003 L6.74468316,11.6154029 C6.74205801,11.6425295 6.73768275,11.6749063 6.73593265,11.702908 C6.73155739,11.7982886 6.7350576,11.8962943 6.73418255,11.99255 C6.73418255,12.0879305 6.73068234,12.1868113 6.7385578,12.283067 C6.7385578,12.3128187 6.74030791,12.3425705 6.74555821,12.3731973 L8.90955998,13.2692497 L8.90955998,13.2788753 L8.91393523,13.2815005 L8.022258,15.4385018 C8.18676764,15.6310131 8.3705284,15.8103986 8.56566483,15.9766583 L10.7209161,15.084106 L10.7226662,15.0928566 L10.7305416,15.0902314 L11.623969,17.2472328 C11.8829841,17.2673589 12.1384991,17.2673589 12.392264,17.2472328 L13.2848163,15.0902314 L13.2918167,15.0928566 L13.2961919,15.0849811 L15.4514432,15.9757833 C15.6457046,15.8095235 15.8250901,15.6283879 15.9930999,15.4358767 L15.1005476,13.2806254 L15.106673,13.2762501 L15.1040478,13.2683747 L17.2592991,12.3758224 C17.2680496,12.2463148 17.2697997,12.113307 17.2715498,11.9864246 C17.2715498,11.8604172 17.2697997,11.7335348 17.2610492,11.6101526 L15.1022977,10.7193504 L15.1022977,10.7193504 Z M12.0011161,13.4547606 C11.197819,13.4547606 10.5459058,12.8037225 10.5459058,11.9995504 C10.5459058,11.1962533 11.196944,10.5443401 12.0011161,10.5443401 C12.8052882,10.5443401 13.4563263,11.1953783 13.4563263,11.9995504 C13.4563263,12.8028474 12.8044131,13.4547606 12.0011161,13.4547606 L12.0011161,13.4547606 Z' })
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

Icon.displayName = 'StandardsPerformance';

Icon.icon = true;

Icon.propTypes = {
  a11yTitle: _propTypes2.default.string,
  colorIndex: _propTypes2.default.string,
  size: _propTypes2.default.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge', 'huge']),
  responsive: _propTypes2.default.bool
};
module.exports = exports['default'];