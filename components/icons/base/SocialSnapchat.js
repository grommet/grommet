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


      var classes = (0, _classnames3.default)(CLASS_ROOT, CLASS_ROOT + '-social-snapchat', className, (_classnames = {}, _defineProperty(_classnames, CLASS_ROOT + '--' + size, size), _defineProperty(_classnames, CLASS_ROOT + '--responsive', responsive), _defineProperty(_classnames, COLOR_INDEX + '-' + colorIndex, colorIndex), _classnames));

      a11yTitle = a11yTitle || _Intl2.default.getMessage(intl, 'social-snapchat');

      var restProps = _Props2.default.omit(this.props, Object.keys(Icon.propTypes));
      return _react2.default.createElement(
        'svg',
        _extends({}, restProps, { version: '1.1', viewBox: '0 0 24 24', width: '24px', height: '24px', role: 'img', className: classes, 'aria-label': a11yTitle }),
        _react2.default.createElement('path', { fill: '#FFFC00', fillRule: 'evenodd', d: 'M12.1511006,22.5316101 C12.0830801,22.5316101 12.0181804,22.5291262 11.9688209,22.5267697 C11.9296518,22.5301452 11.8892088,22.5316101 11.8487022,22.5316101 C10.4196979,22.5316101 9.46422593,21.8560541 8.62103883,21.259537 C8.01668787,20.8326253 7.44672931,20.4295973 6.77900716,20.3185226 C6.45106922,20.2641317 6.12485091,20.236554 5.8096509,20.236554 C5.24173041,20.236554 4.79290954,20.3246368 4.46522636,20.3887086 C4.26358497,20.4280051 4.08971226,20.4618243 3.95532713,20.4618243 C3.81457303,20.4618243 3.64356636,20.4306164 3.57229765,20.1872583 C3.51580495,19.9952977 3.47529834,19.809324 3.4361929,19.6302287 C3.33836562,19.1826816 3.26741536,18.9095168 3.09984793,18.8835951 C1.30755787,18.6070547 0.248590282,18.1996958 0.0376502063,17.7063558 C0.0155499024,17.6545125 0.00319411295,17.6023507 0.00045545858,17.5507621 C-0.00776050453,17.4037027 0.096053603,17.2747312 0.241011216,17.2507202 C1.66434721,17.0163423 2.92992398,16.2640403 4.00277591,15.0140038 C4.83386197,14.0462398 5.24198516,13.1215937 5.28580363,13.0194992 C5.28771432,13.0149135 5.28994346,13.0100731 5.29223629,13.0056785 C5.49903654,12.5860912 5.54018004,12.2235061 5.41490253,11.9283046 C5.18396391,11.3836946 4.41911506,11.141037 3.9131009,10.9804755 C3.78725018,10.9406695 3.66821425,10.9029652 3.57338038,10.8653246 C3.12481427,10.68814 2.38709721,10.3137724 2.48537032,9.79705834 C2.55695747,9.42027045 3.05532887,9.15786915 3.45810214,9.15786915 C3.56994114,9.15786915 3.66904221,9.17748555 3.75247564,9.21665468 C4.20760178,9.42988758 4.61706245,9.5379689 4.96920245,9.5379689 C5.40713239,9.5379689 5.61864568,9.37122943 5.66978845,9.32384434 C5.65717791,9.09023075 5.64176501,8.84324234 5.62686164,8.60962875 C5.62686164,8.609374 5.62654319,8.60657165 5.62654319,8.60657165 C5.52374812,6.97134023 5.39554088,4.93632897 5.91607628,3.76934376 C7.47405217,0.276158264 10.7780794,0.00452196419 11.7532952,0.00452196419 C11.7792805,0.00452196419 12.1783598,0.000573206729 12.1783598,0.000573206729 C12.196384,0.000254758546 12.2159367,0 12.23619,0 C13.2140807,0 16.5249864,0.271954748 18.0839176,3.767242 C18.604453,4.93499149 18.4761184,6.97172237 18.3730049,8.60867341 L18.3681645,8.68701166 C18.3540254,8.90928849 18.340969,9.11965536 18.3299507,9.32358958 C18.3781001,9.36791757 18.5716529,9.52077269 18.9654459,9.53624928 C19.301154,9.52338397 19.6869221,9.41581217 20.111732,9.21690944 C20.24306,9.15525787 20.3884635,9.14245625 20.4871824,9.14245625 C20.6364072,9.14245625 20.7882433,9.17149873 20.9147946,9.22429744 L20.9215457,9.22690871 C21.2820291,9.35486119 21.5181265,9.61057508 21.5232217,9.87921797 C21.5277437,10.1296456 21.3416426,10.5039496 20.4262951,10.865452 C20.332544,10.902583 20.2129348,10.9405421 20.0865746,10.9806029 C19.5801146,11.1413555 18.8159026,11.3838856 18.584964,11.9281773 C18.4594954,12.2233787 18.5007663,12.5858365 18.7076303,13.0052964 C18.7099231,13.0098821 18.7118975,13.0145314 18.7141266,13.0193718 C18.7778162,13.1686603 20.3194239,16.683755 23.758919,17.2504017 C23.9038129,17.2745401 24.0078181,17.403639 23.9995385,17.5504436 C23.9964814,17.6031786 23.9837434,17.6559137 23.9614521,17.7074386 C23.7519768,18.1980398 22.693073,18.6048256 20.9002734,18.8817481 C20.7320054,18.9077335 20.6611188,19.1796882 20.5641832,19.6248788 C20.5240587,19.8087507 20.4832336,19.9889924 20.4275052,20.1784054 C20.3753434,20.3565453 20.2593009,20.443609 20.072945,20.443609 L20.0448579,20.443609 C19.9235291,20.443609 19.7516308,20.4215724 19.5348313,20.3791551 C19.1558779,20.3054025 18.730877,20.2367451 18.1904067,20.2367451 C17.8752704,20.2367451 17.5491158,20.2643864 17.2207957,20.3187137 C16.5537741,20.4297884 15.9838793,20.8321795 15.380611,21.2586453 C14.535768,21.8559904 13.5799776,22.5316101 12.1511006,22.5316101', stroke: 'none' })
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

Icon.displayName = 'SocialSnapchat';

Icon.icon = true;

Icon.propTypes = {
  a11yTitle: _propTypes2.default.string,
  colorIndex: _propTypes2.default.string,
  size: _propTypes2.default.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge', 'huge']),
  responsive: _propTypes2.default.bool
};
module.exports = exports['default'];