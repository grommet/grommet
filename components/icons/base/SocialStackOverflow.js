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


      var classes = (0, _classnames3.default)(CLASS_ROOT, CLASS_ROOT + '-social-stack-overflow', className, (_classnames = {}, (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--' + size, size), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--responsive', responsive), (0, _defineProperty3.default)(_classnames, COLOR_INDEX + '-' + colorIndex, colorIndex), _classnames));

      a11yTitle = a11yTitle || _Intl2.default.getMessage(intl, 'social-stack-overflow');

      return _react2.default.createElement(
        'svg',
        { version: '1.1', viewBox: '0 0 24 24', width: '24px', height: '24px', role: 'img', className: classes, 'aria-label': a11yTitle },
        _react2.default.createElement('path', { fill: '#000000', fillRule: 'evenodd', d: 'M11.4137208,0.131625 L0.592720771,5.187375 C0.267970771,5.338875 0.269470771,5.800875 0.594970771,5.950875 L11.4992208,10.968375 C11.8217208,11.116875 12.1929708,11.116875 12.5154708,10.968375 L23.4204708,5.950875 C23.7459708,5.800875 23.7467208,5.338875 23.4227208,5.187375 L12.6017208,0.131625 C12.2252208,-0.043875 11.7902208,-0.043875 11.4137208,0.131625 Z M23.4227208,11.6582856 L21.1877208,10.6142856 C20.8637208,10.4627856 20.4894708,10.4620356 20.1647208,10.6112856 L12.5162208,14.1302856 C12.1937208,14.2787856 11.8224708,14.2787856 11.4999708,14.1302856 L3.85072077,10.6112856 C3.52597077,10.4620356 3.15172077,10.4627856 2.82772077,10.6142856 L0.592720771,11.6582856 C0.267970771,11.8097856 0.269470771,12.2717856 0.594970771,12.4217856 L11.4999708,17.4392856 C11.8224708,17.5877856 12.1937208,17.5877856 12.5162208,17.4392856 L23.4204708,12.4217856 C23.7459708,12.2717856 23.7474708,11.8097856 23.4227208,11.6582856 Z M23.4227208,18.1582856 L21.1877208,17.1142856 C20.8637208,16.9627856 20.4894708,16.9620356 20.1647208,17.1112856 L12.5162208,20.6302856 C12.1937208,20.7787856 11.8224708,20.7787856 11.4999708,20.6302856 L3.85072077,17.1112856 C3.52597077,16.9620356 3.15172077,16.9627856 2.82772077,17.1142856 L0.592720771,18.1582856 C0.267970771,18.3097856 0.269470771,18.7717856 0.594970771,18.9217856 L11.4999708,23.9392856 C11.8224708,24.0877856 12.1937208,24.0877856 12.5162208,23.9392856 L23.4204708,18.9217856 C23.7459708,18.7717856 23.7474708,18.3097856 23.4227208,18.1582856 Z', stroke: 'none' })
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

Icon.displayName = 'SocialStackOverflow';

Icon.icon = true;

Icon.propTypes = {
  a11yTitle: _react.PropTypes.string,
  colorIndex: _react.PropTypes.string,
  size: _react.PropTypes.oneOf(['small', 'medium', 'large', 'xlarge', 'huge']),
  responsive: _react.PropTypes.bool
};
module.exports = exports['default'];