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


      var classes = (0, _classnames3.default)(CLASS_ROOT, CLASS_ROOT + '-social-square', className, (_classnames = {}, (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--' + size, size), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--responsive', responsive), (0, _defineProperty3.default)(_classnames, COLOR_INDEX + '-' + colorIndex, colorIndex), _classnames));

      a11yTitle = a11yTitle || _Intl2.default.getMessage(intl, 'social-square');

      return _react2.default.createElement(
        'svg',
        { version: '1.1', viewBox: '0 0 24 24', width: '24px', height: '24px', role: 'img', className: classes, 'aria-label': a11yTitle },
        _react2.default.createElement('path', { fill: '#000000', fillRule: 'evenodd', d: 'M14.4444444,8.33333333 L9.55555556,8.33333333 C8.88088889,8.33333333 8.33333333,8.88088889 8.33333333,9.55555556 L8.33333333,14.4444444 C8.33333333,15.1191111 8.88088889,15.6666667 9.55555556,15.6666667 L14.4444444,15.6666667 C15.1191111,15.6666667 15.6666667,15.1191111 15.6666667,14.4444444 L15.6666667,9.55555556 C15.6666667,8.88088889 15.1191111,8.33333333 14.4444444,8.33333333 M18.1111111,22 L5.88888889,22 C3.74128475,22 2,20.2587153 2,18.1111111 L2,5.88888889 C2,3.74128475 3.74128475,2 5.88888889,2 L18.1111111,2 C20.2587153,2 22,3.74128475 22,5.88888889 L22,18.1111111 C22,20.2587153 20.2587153,22 18.1111111,22 L18.1111111,22 Z M18.1111111,24 C21.3632847,24 24,21.3632847 24,18.1111111 L24,5.88888889 C24,2.63671525 21.3632847,0 18.1111111,0 L5.88888889,0 C2.63671525,0 0,2.63671525 0,5.88888889 L0,18.1111111 C0,21.3632847 2.63671525,24 5.88888889,24 L18.1111111,24 L18.1111111,24 Z', stroke: 'none' })
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

Icon.displayName = 'SocialSquare';

Icon.icon = true;

Icon.propTypes = {
  a11yTitle: _react.PropTypes.string,
  colorIndex: _react.PropTypes.string,
  size: _react.PropTypes.oneOf(['small', 'medium', 'large', 'xlarge', 'huge']),
  responsive: _react.PropTypes.bool
};
module.exports = exports['default'];