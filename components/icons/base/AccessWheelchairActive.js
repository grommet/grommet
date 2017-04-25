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


      var classes = (0, _classnames3.default)(CLASS_ROOT, CLASS_ROOT + '-access-wheelchair-active', className, (_classnames = {}, _defineProperty(_classnames, CLASS_ROOT + '--' + size, size), _defineProperty(_classnames, CLASS_ROOT + '--responsive', responsive), _defineProperty(_classnames, COLOR_INDEX + '-' + colorIndex, colorIndex), _classnames));

      a11yTitle = a11yTitle || _Intl2.default.getMessage(intl, 'access-wheelchair-active');

      var restProps = _Props2.default.omit(this.props, Object.keys(Icon.propTypes));
      return _react2.default.createElement(
        'svg',
        _extends({}, restProps, { version: '1.1', viewBox: '0 0 24 24', width: '24px', height: '24px', role: 'img', className: classes, 'aria-label': a11yTitle }),
        _react2.default.createElement('path', { fillRule: 'evenodd', d: 'M21.3413397,10.8818306 C21.6288833,11.1769441 21.7747145,11.5820803 21.7411696,11.992894 L21.140293,19.3655352 C21.0795856,20.1109072 20.4556283,20.6756415 19.7206834,20.6756415 C19.6818322,20.6756415 19.6426099,20.6741201 19.6033134,20.6709288 C18.8183851,20.6068447 18.2338727,19.9187662 18.2978826,19.133875 L18.7660268,13.391538 L16.8416111,13.4987407 C17.3169912,14.467164 17.5843485,15.5562228 17.5843485,16.7078443 C17.5843485,18.6408318 16.8309984,20.3966696 15.6034927,21.7015809 L13.7608612,19.8588381 C14.5182189,19.0258189 14.9805373,17.9198392 14.9805373,16.7078443 C14.9805373,14.1226609 12.8773391,12.0194256 10.2921928,12.0194256 C9.0801979,12.0194256 7.97414402,12.481744 7.14112481,13.2391759 L5.29838197,11.3964331 C6.33189131,10.4242619 7.64845425,9.74998724 9.11170191,9.51135093 L12.6404468,5.49245719 L10.6413343,4.33155889 L8.22313324,6.4886367 C7.63550385,7.01299834 6.7341332,6.96138224 6.20988288,6.37375285 C5.68566967,5.78604924 5.73713734,4.8847157 6.32480383,4.3605396 L9.5144633,1.51530903 C9.9745924,1.10490356 10.6464551,1.03666345 11.1796483,1.34639712 C11.1796483,1.34639712 17.7093255,5.13964207 17.7196784,5.1470264 C18.0567601,5.35764679 18.2761749,5.68730702 18.3556956,6.04962158 C18.5063878,6.57836187 18.3950292,7.17007305 18.0052553,7.61394921 L15.2692312,10.7300251 L20.240889,10.4532797 C20.6516656,10.4307928 21.0536477,10.586643 21.3413397,10.8818306 Z M18.7003471,4.7736539 C17.382003,4.7736539 16.3135016,3.70507827 16.3135016,2.3868455 C16.3135016,1.06868695 17.3820401,4.4408921e-16 18.7003471,4.4408921e-16 C20.0185057,4.4408921e-16 21.08697,1.06868695 21.08697,2.3868455 C21.08697,3.70507827 20.0185057,4.7736539 18.7003471,4.7736539 Z M5.60381122,16.7078072 C5.60381122,19.2929906 7.7070465,21.3962259 10.2922299,21.3962259 C11.266442,21.3962259 12.1720057,21.0971791 12.9225357,20.5866955 L14.7851308,22.4492165 C13.5466414,23.419792 11.9876943,24 10.2922299,24 C6.26480152,24 3,20.7352356 3,16.7078072 C3,15.012417 3.58020795,13.4533215 4.5507464,12.2147949 L6.41337869,14.0773901 C5.9027467,14.8279572 5.60381122,15.7335209 5.60381122,16.7078072 Z' })
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

Icon.displayName = 'AccessWheelchairActive';

Icon.icon = true;

Icon.propTypes = {
  a11yTitle: _propTypes2.default.string,
  colorIndex: _propTypes2.default.string,
  size: _propTypes2.default.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge', 'huge']),
  responsive: _propTypes2.default.bool
};
module.exports = exports['default'];