'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

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

var _CSSClassnames = require('../../../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

var _Intl = require('../../../utils/Intl');

var _Intl2 = _interopRequireDefault(_Intl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.CONTROL_ICON;
var COLOR_INDEX = _CSSClassnames2.default.COLOR_INDEX;

var Icon = function (_Component) {
  (0, _inherits3.default)(Icon, _Component);

  function Icon() {
    (0, _classCallCheck3.default)(this, Icon);
    return (0, _possibleConstructorReturn3.default)(this, (Icon.__proto__ || (0, _getPrototypeOf2.default)(Icon)).apply(this, arguments));
  }

  (0, _createClass3.default)(Icon, [{
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


      var classes = (0, _classnames3.default)(CLASS_ROOT, CLASS_ROOT + '-access-wheelchair-active', className, (_classnames = {}, (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--' + size, size), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--responsive', responsive), (0, _defineProperty3.default)(_classnames, COLOR_INDEX + '-' + colorIndex, colorIndex), _classnames));

      a11yTitle = a11yTitle || _Intl2.default.getMessage(intl, 'access-wheelchair-active');

      return _react2.default.createElement(
        'svg',
        { version: '1.1', viewBox: '0 0 24 24', width: '24px', height: '24px', role: 'img', className: classes, 'aria-label': a11yTitle },
        _react2.default.createElement('path', { fill: '#000000', fillRule: 'evenodd', d: 'M21.3413397,10.8818306 C21.0536477,10.586643 20.6516656,10.4307928 20.240889,10.4532797 L15.2692312,10.7300251 L18.0052553,7.61394921 C18.3950292,7.17007305 18.5063878,6.57836187 18.3556956,6.04962158 C18.2761749,5.68730702 18.0567601,5.35764679 17.7196784,5.1470264 C17.7093255,5.13964207 11.1796483,1.34639712 11.1796483,1.34639712 C10.6464551,1.03666345 9.9745924,1.10490356 9.5144633,1.51530903 L6.32480383,4.3605396 C5.73713734,4.8847157 5.68566967,5.78604924 6.20988288,6.37375285 C6.7341332,6.96138224 7.63550385,7.01299834 8.22313324,6.4886367 L10.6413343,4.33155889 L12.6404468,5.49245719 L9.11170191,9.51135093 C7.64845425,9.74998724 6.33189131,10.4242619 5.29838197,11.3964331 L7.14112481,13.2391759 C7.97414402,12.481744 9.0801979,12.0194256 10.2921928,12.0194256 C12.8773391,12.0194256 14.9805373,14.1226609 14.9805373,16.7078443 C14.9805373,17.9198392 14.5182189,19.0258189 13.7608612,19.8588381 L15.6034927,21.7015809 C16.8309984,20.3966696 17.5843485,18.6408318 17.5843485,16.7078443 C17.5843485,15.5562228 17.3169912,14.467164 16.8416111,13.4987407 L18.7660268,13.391538 L18.2978826,19.133875 C18.2338727,19.9187662 18.8183851,20.6068447 19.6033134,20.6709288 C19.6426099,20.6741201 19.6818322,20.6756415 19.7206834,20.6756415 C20.4556283,20.6756415 21.0795856,20.1109072 21.140293,19.3655352 L21.7411696,11.992894 C21.7747145,11.5820803 21.6288833,11.1769441 21.3413397,10.8818306 Z M18.7003471,4.7736539 C20.0185057,4.7736539 21.08697,3.70507827 21.08697,2.3868455 C21.08697,1.06868695 20.0185057,4.4408921e-16 18.7003471,4.4408921e-16 C17.3820401,4.4408921e-16 16.3135016,1.06868695 16.3135016,2.3868455 C16.3135016,3.70507827 17.382003,4.7736539 18.7003471,4.7736539 Z M5.60381122,16.7078072 C5.60381122,15.7335209 5.9027467,14.8279572 6.41337869,14.0773901 L4.5507464,12.2147949 C3.58020795,13.4533215 3,15.012417 3,16.7078072 C3,20.7352356 6.26480152,24 10.2922299,24 C11.9876943,24 13.5466414,23.419792 14.7851308,22.4492165 L12.9225357,20.5866955 C12.1720057,21.0971791 11.266442,21.3962259 10.2922299,21.3962259 C7.7070465,21.3962259 5.60381122,19.2929906 5.60381122,16.7078072 Z', stroke: 'none' })
      );
    }
  }]);
  return Icon;
}(_react.Component);

Icon.displayName = 'Icon';
exports.default = Icon;
;

Icon.contextTypes = {
  intl: _react.PropTypes.object
};

Icon.defaultProps = {
  responsive: true
};

Icon.displayName = 'AccessWheelchairActive';

Icon.icon = true;

Icon.propTypes = {
  a11yTitle: _react.PropTypes.string,
  colorIndex: _react.PropTypes.string,
  size: _react.PropTypes.oneOf(['small', 'medium', 'large', 'xlarge', 'huge']),
  responsive: _react.PropTypes.bool
};
module.exports = exports['default'];