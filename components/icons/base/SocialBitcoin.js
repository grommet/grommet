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


      var classes = (0, _classnames3.default)(CLASS_ROOT, CLASS_ROOT + '-social-bitcoin', className, (_classnames = {}, _defineProperty(_classnames, CLASS_ROOT + '--' + size, size), _defineProperty(_classnames, CLASS_ROOT + '--responsive', responsive), _defineProperty(_classnames, COLOR_INDEX + '-' + colorIndex, colorIndex), _classnames));

      a11yTitle = a11yTitle || _Intl2.default.getMessage(intl, 'social-bitcoin');

      var restProps = _Props2.default.omit(this.props, Object.keys(Icon.propTypes));
      return _react2.default.createElement(
        'svg',
        _extends({}, restProps, { version: '1.1', viewBox: '0 0 24 24', width: '24px', height: '24px', role: 'img', className: classes, 'aria-label': a11yTitle }),
        _react2.default.createElement('path', { fill: '#F90', fillRule: 'evenodd', d: 'M23.6408156,14.9046858 C22.0378949,21.3339956 15.5260763,25.2467873 9.09601649,23.6434916 C2.66858193,22.0405708 -1.24420981,15.5283772 0.359460996,9.09944253 C1.96163164,2.66938268 8.47345019,-1.24378409 14.9016348,0.359136628 C21.3313196,1.96205735 25.2437363,8.47500102 23.6408156,14.9046858 L23.6408156,14.9046858 Z M17.2913894,10.2916945 C17.5302898,8.69477443 16.3144103,7.83630799 14.6518582,7.263622 L15.1911657,5.1003916 L13.8744004,4.77223165 L13.3493445,6.87845598 C13.0031826,6.79219679 12.6476448,6.71081312 12.2943571,6.63017953 L12.8231635,4.51007873 L11.5071483,4.18191878 L10.9674658,6.3443991 C10.6809353,6.27914215 10.3996553,6.21463528 10.1266263,6.14675305 L10.1281264,6.14000233 L8.31218301,5.68657903 L7.9618957,7.09297883 C7.9618957,7.09297883 8.93887476,7.31687767 8.91824756,7.33075415 C9.45155436,7.46389333 9.54793963,7.81680592 9.53181291,8.09658572 L8.91749748,10.5609732 C8.9542514,10.5703492 9.00188147,10.5838506 9.05438706,10.6048529 C9.01050739,10.5939767 8.96362739,10.5819754 8.91524724,10.5703492 L8.05415553,14.0225919 C7.98889858,14.1846091 7.82350596,14.427635 7.45071626,14.3353752 C7.46384266,14.3545022 6.49361432,14.0964747 6.49361432,14.0964747 L5.8399197,15.6037603 L7.5534772,16.0309308 C7.87226116,16.1108143 8.18466943,16.1944482 8.49220218,16.2732066 L7.94726915,18.4611896 L9.26253423,18.7893496 L9.80221671,16.624619 C10.161505,16.7221294 10.5102921,16.812139 10.8515785,16.896898 L10.3137712,19.0515025 L11.6305364,19.3796624 L12.1754695,17.1958048 C14.4208336,17.6207251 16.1092634,17.4493318 16.8199641,15.4184905 C17.3926501,13.7833164 16.7914611,12.8400909 15.6100853,12.2250254 C16.4704269,12.0266293 17.1184959,11.460694 17.2913894,10.2916945 L17.2913894,10.2916945 Z M14.2828189,14.5105188 C13.8759006,16.145693 11.1227324,15.2617238 10.2301373,15.0400752 L10.9532143,12.1413915 C11.8458094,12.3641652 14.7081142,12.8052122 14.2828189,14.5105188 L14.2828189,14.5105188 Z M14.6901123,10.268067 C14.3188228,11.7554754 12.0273287,10.9997699 11.2839995,10.8145002 L11.9395694,8.18547018 C12.6828985,8.37073991 15.0767785,8.71652674 14.6901123,10.268067 L14.6901123,10.268067 Z', stroke: 'none' })
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

Icon.displayName = 'SocialBitcoin';

Icon.icon = true;

Icon.propTypes = {
  a11yTitle: _propTypes2.default.string,
  colorIndex: _propTypes2.default.string,
  size: _propTypes2.default.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge', 'huge']),
  responsive: _propTypes2.default.bool
};
module.exports = exports['default'];