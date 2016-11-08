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


      var classes = (0, _classnames3.default)(CLASS_ROOT, CLASS_ROOT + '-platform-google', className, (_classnames = {}, (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--' + size, size), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--responsive', responsive), (0, _defineProperty3.default)(_classnames, COLOR_INDEX + '-' + colorIndex, colorIndex), _classnames));

      a11yTitle = a11yTitle || _Intl2.default.getMessage(intl, 'platform-google');

      return _react2.default.createElement(
        'svg',
        { version: '1.1', viewBox: '0 0 24 24', width: '24px', height: '24px', role: 'img', className: classes, 'aria-label': a11yTitle },
        _react2.default.createElement('path', { fill: '#000000', fillRule: 'evenodd', d: 'M0.0320526775,11.3995579 C0.135923164,5.21758766 5.84921048,-0.196179793 12.0637858,0.0100628571 C15.0415433,-0.127568377 17.8407092,1.16134608 20.1213438,2.97178899 C19.1479172,4.07202205 18.140004,5.13182339 17.0631175,6.12301332 C14.3214293,4.23824138 10.4223858,3.69956008 7.68069759,5.87674734 C3.75866298,8.57505464 3.58007143,14.9461147 7.35266392,17.8506647 C11.0213859,21.1623907 17.9556646,19.5181671 18.9693256,14.4474567 C16.6714477,14.413151 14.3674115,14.4474567 12.0695336,14.3731277 C12.0637858,13.0094758 12.058038,11.6458239 12.0637858,10.2825804 C15.9053516,10.2711452 19.7469173,10.2650192 23.5942309,10.2940157 C23.8245524,13.5024162 23.398396,16.9170593 21.4170562,19.5696257 C18.4163077,23.7692161 12.39223,24.9952368 7.69219314,23.1962291 C2.9753235,21.4086567 -0.365364836,16.4527071 0.0320526775,11.3995579', stroke: 'none' })
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

Icon.displayName = 'PlatformGoogle';

Icon.icon = true;

Icon.propTypes = {
  a11yTitle: _react.PropTypes.string,
  colorIndex: _react.PropTypes.string,
  size: _react.PropTypes.oneOf(['small', 'medium', 'large', 'xlarge', 'huge']),
  responsive: _react.PropTypes.bool
};
module.exports = exports['default'];