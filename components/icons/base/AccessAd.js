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


      var classes = (0, _classnames3.default)(CLASS_ROOT, CLASS_ROOT + '-access-ad', className, (_classnames = {}, (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--' + size, size), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--responsive', responsive), (0, _defineProperty3.default)(_classnames, COLOR_INDEX + '-' + colorIndex, colorIndex), _classnames));

      a11yTitle = a11yTitle || _Intl2.default.getMessage(intl, 'access-ad');

      return _react2.default.createElement(
        'svg',
        { version: '1.1', viewBox: '0 0 24 24', width: '24px', height: '24px', role: 'img', className: classes, 'aria-label': a11yTitle },
        _react2.default.createElement('path', { fill: '#000000', fillRule: 'evenodd', d: 'M12.3018676,10.102852 C13.6209278,10.102852 14.6837926,11.172641 14.6837926,12.484777 C14.6837926,13.8003751 13.6209278,14.8701641 12.3018676,14.8701641 L11.6786896,14.8701641 L11.6786896,10.102852 L12.3018676,10.102852 L12.3018676,10.102852 Z M12.5442146,16.9543484 C15.0126921,16.9543484 17.0207102,14.9497924 17.0207102,12.484777 C17.0207102,10.0093753 15.0334647,8.0082814 12.5649872,8.0082814 L12.5372904,8.0082814 L9.79876912,8.0082814 L9.79876912,16.9578105 L12.5442146,16.9578105 L12.5442146,16.9543484 Z M8.87336291,16.9595283 L6.91381417,16.9595283 L6.91381417,15.7754901 L3.63174315,15.7754901 L2.8770053,16.9595283 L0,16.9595283 L6.42565804,8.00653714 L8.87336291,8.00653714 L8.87336291,16.9595283 L8.87336291,16.9595283 Z M6.92591824,13.9098051 L4.8625065,13.9098051 L6.92591824,10.7039002 L6.92591824,13.9098051 L6.92591824,13.9098051 Z M22.2620257,8 L21.9781335,8 L21.44497,8 L21.1610778,8 C22.4039718,9.23596978 23.1206265,10.9289368 23.1206265,12.6876837 C23.1206265,14.2490909 22.5597663,15.7412561 21.5661435,16.9252944 L21.8500358,16.9252944 L22.3347298,16.9252944 L22.6220841,16.9252944 C23.5049197,15.7100972 24,14.2213941 24,12.6876837 C24,10.9600957 23.3698978,9.29828759 22.2620257,8 M20.0102192,8 L19.726327,8 L19.1931635,8 L18.9092713,8 C20.1521653,9.23596978 20.86882,10.9289368 20.86882,12.6876837 C20.86882,14.2490909 20.3079598,15.7412561 19.314337,16.9252944 L19.5982293,16.9252944 L20.0829233,16.9252944 L20.3633534,16.9252944 C21.2531132,15.7100972 21.7481935,14.2213941 21.7481935,12.6876837 C21.7481935,10.9600957 21.1180913,9.29828759 20.0102192,8 M17.7584421,8 L17.4745499,8 L16.9344623,8 L16.6574942,8 C17.9003882,9.23596978 18.6101188,10.9289368 18.6101188,12.6876837 C18.6101188,14.2490909 18.0492585,15.7412561 17.06256,16.9252944 L17.3464522,16.9252944 L17.8276841,16.9252944 L18.1115763,16.9252944 C19.0013361,15.7100972 19.4894922,14.2213941 19.4894922,12.6876837 C19.4894922,10.9600957 18.8663142,9.29828759 17.7584421,8', stroke: 'none' })
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

Icon.displayName = 'AccessAd';

Icon.icon = true;

Icon.propTypes = {
  a11yTitle: _react.PropTypes.string,
  colorIndex: _react.PropTypes.string,
  size: _react.PropTypes.oneOf(['small', 'medium', 'large', 'xlarge', 'huge']),
  responsive: _react.PropTypes.bool
};
module.exports = exports['default'];