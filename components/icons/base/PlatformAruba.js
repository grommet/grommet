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


      var classes = (0, _classnames3.default)(CLASS_ROOT, CLASS_ROOT + '-platform-aruba', className, (_classnames = {}, _defineProperty(_classnames, CLASS_ROOT + '--' + size, size), _defineProperty(_classnames, CLASS_ROOT + '--responsive', responsive), _defineProperty(_classnames, COLOR_INDEX + '-' + colorIndex, colorIndex), _classnames));

      a11yTitle = a11yTitle || _Intl2.default.getMessage(intl, 'platform-aruba');

      var restProps = _Props2.default.omit(this.props, Object.keys(Icon.propTypes));
      return _react2.default.createElement(
        'svg',
        _extends({}, restProps, { version: '1.1', viewBox: '0 0 24 24', width: '24px', height: '24px', role: 'img', className: classes, 'aria-label': a11yTitle }),
        _react2.default.createElement('path', { fill: '#FF8300', fillRule: 'evenodd', d: 'M13.6146045,12.7160243 L13.6146045,12.7160243 C13.6146045,14.0141988 12.5760649,15.0689655 11.3103448,15.0689655 C10.0446247,15.0689655 9.00608519,14.0141988 9.00608519,12.7160243 L9.00608519,10.7200811 C9.00608519,10.7200811 10.1095335,10.9959432 10.1095335,12.1643002 L10.1095335,12.7160243 C10.1095335,13.4300203 10.6450304,13.9979716 11.3103448,13.9979716 C11.9756592,13.9979716 12.5111562,13.4300203 12.5111562,12.7160243 L12.5111562,11.5638945 L12.5111562,11.5801217 C12.5598377,10.6064909 13.3874239,10.2981744 13.5983773,10.1845842 L13.6146045,10.1845842 L13.6146045,11.5476673 L13.6146045,12.7160243 L13.6146045,12.7160243 Z M7.69168357,10.3793103 C8,10.3793103 8.29208925,10.4279919 8.55172414,10.5415822 L8.55172414,11.7748479 C8.32454361,11.5801217 8.01622718,11.4665314 7.69168357,11.4665314 C6.96146045,11.4665314 6.37728195,12.0344828 6.37728195,12.7484787 L6.37728195,15.0689655 L5.27383367,15.0689655 L5.27383367,10.8174442 C5.27383367,10.8174442 5.72819473,10.8336714 6.02028398,11.0446247 C6.44219067,10.6227181 7.04259635,10.3793103 7.69168357,10.3793103 L7.69168357,10.3793103 Z M2.40162272,14.0141988 C1.67139959,14.0141988 1.07099391,13.4300203 1.07099391,12.7160243 C1.07099391,12.0020284 1.67139959,11.4178499 2.40162272,11.4178499 C3.13184584,11.4178499 3.73225152,12.0020284 3.73225152,12.7160243 C3.73225152,13.4300203 3.13184584,14.0141988 2.40162272,14.0141988 L2.40162272,14.0141988 Z M2.40162272,10.3793103 C1.07099391,10.3793103 -1.47437618e-13,11.4340771 -1.47437618e-13,12.7160243 C-1.47437618e-13,14.0141988 1.07099391,15.0527383 2.40162272,15.0527383 C2.95334686,15.0527383 3.45638945,14.8742394 3.86206897,14.5659229 C4.10547667,14.9716024 4.80324544,15.0527383 4.80324544,15.0527383 L4.80324544,12.7160243 C4.80324544,11.4340771 3.73225152,10.3793103 2.40162272,10.3793103 L2.40162272,10.3793103 Z M21.5983773,14.0141988 C20.8681542,14.0141988 20.2677485,13.4300203 20.2677485,12.7160243 C20.2677485,12.0020284 20.8681542,11.4178499 21.5983773,11.4178499 C22.3286004,11.4178499 22.9290061,12.0020284 22.9290061,12.7160243 C22.9290061,13.4300203 22.3286004,14.0141988 21.5983773,14.0141988 L21.5983773,14.0141988 Z M21.5983773,10.3793103 C20.2677485,10.3793103 19.1967546,11.4340771 19.1967546,12.7160243 C19.1967546,14.0141988 20.2677485,15.0527383 21.5983773,15.0527383 C22.1501014,15.0527383 22.653144,14.8742394 23.0588235,14.5659229 C23.3022312,14.9716024 24,15.0527383 24,15.0527383 L24,12.7160243 C24,11.4340771 22.9290061,10.3793103 21.5983773,10.3793103 L21.5983773,10.3793103 Z M16.5030426,14.0141988 C15.7728195,14.0141988 15.1724138,13.4300203 15.1724138,12.7160243 C15.1724138,12.0020284 15.7728195,11.4178499 16.5030426,11.4178499 C17.2332657,11.4178499 17.8336714,12.0020284 17.8336714,12.7160243 C17.8498986,13.4300203 17.2494929,14.0141988 16.5030426,14.0141988 L16.5030426,14.0141988 Z M16.5030426,10.3793103 C16.0162272,10.3793103 15.5618661,10.525355 15.1724138,10.7687627 L15.1724138,10.3955375 C15.1237323,9.42190669 14.3286004,9.11359026 14.1176471,9 L14.1014199,9 L14.1014199,15.0689655 C14.1014199,15.0689655 14.8154158,14.9878296 15.0912779,14.5983773 C15.4969574,14.8742394 15.9837728,15.0527383 16.5030426,15.0527383 C17.8336714,15.0527383 18.9046653,13.9979716 18.9046653,12.7160243 C18.9208925,11.4340771 17.8336714,10.3793103 16.5030426,10.3793103 L16.5030426,10.3793103 Z', stroke: 'none' })
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

Icon.displayName = 'PlatformAruba';

Icon.icon = true;

Icon.propTypes = {
  a11yTitle: _propTypes2.default.string,
  colorIndex: _propTypes2.default.string,
  size: _propTypes2.default.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge', 'huge']),
  responsive: _propTypes2.default.bool
};
module.exports = exports['default'];