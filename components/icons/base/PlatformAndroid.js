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


      var classes = (0, _classnames3.default)(CLASS_ROOT, CLASS_ROOT + '-platform-android', className, (_classnames = {}, (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--' + size, size), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--responsive', responsive), (0, _defineProperty3.default)(_classnames, COLOR_INDEX + '-' + colorIndex, colorIndex), _classnames));

      a11yTitle = a11yTitle || _Intl2.default.getMessage(intl, 'platform-android');

      return _react2.default.createElement(
        'svg',
        { version: '1.1', viewBox: '0 0 24 24', width: '24px', height: '24px', role: 'img', className: classes, 'aria-label': a11yTitle },
        _react2.default.createElement('path', { fill: '#000000', fillRule: 'evenodd', d: 'M5.68524564,7.91390616 L18.4032637,7.91390616 L18.4032637,18.2777185 C18.4032637,18.8934049 17.9041016,19.392567 17.2891666,19.392567 L16.0152889,19.392567 L16.0152889,22.54887 C16.0152889,23.3504036 15.3759782,24 14.5867968,24 C13.7955958,24 13.1572245,23.3504036 13.1572245,22.54887 L13.1572245,19.392567 L10.9323651,19.392567 L10.9323651,22.54887 C10.9323651,23.3504036 10.2917863,24 9.50265183,24 C8.71365828,24 8.07312646,23.3504036 8.07312646,22.54887 L8.07312646,19.392567 L6.80037593,19.392567 C6.18530006,19.392567 5.68519867,18.8934049 5.68519867,18.2777185 L5.68519867,7.91390616 L5.68524564,7.91390616 Z M3.19295784,7.82931914 C2.39574512,7.82931914 1.75,8.48511514 1.75,9.2946801 L1.75,15.0216583 C1.75,15.8302839 2.39574512,16.4872071 3.19295784,16.4872071 C3.99031146,16.4872071 4.63591568,15.8302839 4.63591568,15.0216583 L4.63591568,9.2946801 C4.63591568,8.48511514 3.99031146,7.82931914 3.19295784,7.82931914 L3.19295784,7.82931914 Z M18.4033106,6.86955468 L5.68524564,6.86955468 C5.84220834,5.05767343 7.01754994,3.49847301 8.70952521,2.59567916 L7.50032062,0.820150132 C7.33725225,0.580713909 7.39877862,0.254013563 7.63868451,0.0909921564 C7.8783086,-0.07202925 8.20435141,-0.0100332096 8.36821822,0.229215147 L9.68615071,2.16574601 C10.4168586,1.91306518 11.2100322,1.76798505 12.0442547,1.76798505 C12.8794634,1.76798505 13.672684,1.91306518 14.4033449,2.16607478 L15.7212774,0.229919647 C15.8831246,-0.00998624287 16.2102007,-0.0719822833 16.4498248,0.0910391231 C16.6897307,0.25406053 16.7512571,0.580760876 16.5881887,0.820197099 L15.3799704,2.59572613 C17.0718987,3.49795638 18.2464419,5.0571568 18.4033106,6.86955468 L18.4033106,6.86955468 Z M10.0653129,4.40760737 C10.0653129,4.01905189 9.75068296,3.70390535 9.36226837,3.70390535 C8.97286748,3.70390535 8.65823758,4.01905189 8.65823758,4.40760737 C8.65823758,4.79597499 8.97390075,5.11098063 9.36226837,5.11098063 C9.75063599,5.11098063 10.0653129,4.79597499 10.0653129,4.40760737 L10.0653129,4.40760737 Z M15.5194145,4.40760737 C15.5194145,4.01905189 15.2037044,3.70390535 14.8153837,3.70390535 C14.4259828,3.70390535 14.1122923,4.01905189 14.1122923,4.40760737 C14.1122923,4.79597499 14.4259828,5.11098063 14.8153837,5.11098063 C15.2037514,5.11098063 15.5194145,4.79597499 15.5194145,4.40760737 L15.5194145,4.40760737 Z M20.8965378,7.82729957 C20.1001704,7.82729957 19.4525936,8.48408187 19.4525936,9.2936938 L19.4525936,15.0226915 C19.4525936,15.8323035 20.1001704,16.4892736 20.8965378,16.4892736 C21.6939384,16.4892736 22.3384623,15.8323504 22.3384623,15.0226915 L22.3384623,9.2936938 C22.3385093,8.48408187 21.6939384,7.82729957 20.8965378,7.82729957 L20.8965378,7.82729957 Z', stroke: 'none' })
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

Icon.displayName = 'PlatformAndroid';

Icon.icon = true;

Icon.propTypes = {
  a11yTitle: _react.PropTypes.string,
  colorIndex: _react.PropTypes.string,
  size: _react.PropTypes.oneOf(['small', 'medium', 'large', 'xlarge', 'huge']),
  responsive: _react.PropTypes.bool
};
module.exports = exports['default'];