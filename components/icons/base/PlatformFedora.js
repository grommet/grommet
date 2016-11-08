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


      var classes = (0, _classnames3.default)(CLASS_ROOT, CLASS_ROOT + '-platform-fedora', className, (_classnames = {}, (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--' + size, size), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--responsive', responsive), (0, _defineProperty3.default)(_classnames, COLOR_INDEX + '-' + colorIndex, colorIndex), _classnames));

      a11yTitle = a11yTitle || _Intl2.default.getMessage(intl, 'platform-fedora');

      return _react2.default.createElement(
        'svg',
        { version: '1.1', viewBox: '0 0 24 24', width: '24px', height: '24px', role: 'img', className: classes, 'aria-label': a11yTitle },
        _react2.default.createElement('path', { fill: '#000000', fillRule: 'evenodd', d: 'M11.9998121,0 C5.3752955,0 0.00469667319,5.36825049 0,11.9918748 L0,21.278137 C0.00352250489,22.7820587 1.22334247,23.9996243 2.72820352,23.9996243 L12.0046967,23.9996243 C18.6300587,23.9970411 24,18.6261605 24,12.0002818 C24,5.37285323 18.6273346,0 11.9998121,0 L11.9998121,0 Z M16.595319,5.57654795 C16.2162505,5.57654795 16.0784971,5.50370254 15.5230685,5.50370254 C13.883225,5.50370254 12.5531742,6.83187476 12.5504031,8.4717182 L12.5504031,11.0548415 C12.5504031,11.2862935 12.7382701,11.4738787 12.9702857,11.4738787 L14.9232094,11.4743014 C15.650771,11.4743014 16.2386536,12.0546693 16.2386536,12.7841566 C16.2390763,13.5183875 15.6447123,14.096454 14.9093542,14.096454 L12.5503562,14.096454 L12.5503562,17.0814247 C12.5503562,20.1916086 10.0288063,22.7134873 6.91852838,22.7134873 C6.44665362,22.7134873 6.11112329,22.6601331 5.67428571,22.5460978 C5.03736986,22.379319 4.51688454,21.8570489 4.51669667,21.2496282 C4.51669667,20.5156791 5.04962818,19.9814795 5.84627789,19.9814795 C6.22548728,19.9814795 6.3629589,20.0543249 6.91857534,20.0543249 C8.55832485,20.0543249 9.88837573,18.7260587 9.89133464,17.0864031 L9.89133464,14.5031389 C9.89133464,14.271499 9.70313894,14.0840078 9.47140509,14.0840078 L7.51848141,14.083773 C6.79082583,14.083773 6.20294325,13.5033581 6.20294325,12.7738239 C6.20256751,12.039499 6.79688454,11.4616204 7.53233659,11.4616204 L9.89100587,11.4616204 L9.89100587,8.47646184 C9.89100587,5.36627789 12.4128845,2.84449315 15.5230685,2.84449315 C15.9949432,2.84449315 16.3304736,2.89775342 16.7671703,3.01197652 C17.404274,3.17856751 17.9246184,3.70083757 17.9249941,4.30825832 C17.9249941,5.04248924 17.3920157,5.57654795 16.595319,5.57654795 L16.595319,5.57654795 Z', stroke: 'none' })
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

Icon.displayName = 'PlatformFedora';

Icon.icon = true;

Icon.propTypes = {
  a11yTitle: _react.PropTypes.string,
  colorIndex: _react.PropTypes.string,
  size: _react.PropTypes.oneOf(['small', 'medium', 'large', 'xlarge', 'huge']),
  responsive: _react.PropTypes.bool
};
module.exports = exports['default'];