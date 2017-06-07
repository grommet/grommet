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


      var classes = (0, _classnames3.default)(CLASS_ROOT, CLASS_ROOT + '-social-reddit', className, (_classnames = {}, _defineProperty(_classnames, CLASS_ROOT + '--' + size, size), _defineProperty(_classnames, CLASS_ROOT + '--responsive', responsive), _defineProperty(_classnames, COLOR_INDEX + '-' + colorIndex, colorIndex), _classnames));

      a11yTitle = a11yTitle || _Intl2.default.getMessage(intl, 'social-reddit');

      var restProps = _Props2.default.omit(this.props, Object.keys(Icon.propTypes));
      return _react2.default.createElement(
        'svg',
        _extends({}, restProps, { version: '1.1', viewBox: '0 0 24 24', width: '24px', height: '24px', role: 'img', className: classes, 'aria-label': a11yTitle }),
        _react2.default.createElement('path', { fill: '#FF4500', fillRule: 'evenodd', d: 'M15.57,15.284 C14.673,15.284 13.91925,14.5565 13.91925,13.6595 C13.91925,12.7625 14.673,12.011 15.57,12.011 C16.467,12.011 17.1945,12.7625 17.1945,13.6595 C17.1945,14.5565 16.467,15.284 15.57,15.284 M15.951,18.437 C15.1155,19.27175 13.827,19.6775 12.012,19.6775 C12.00825,19.6775 12.00375,19.67675 11.99925,19.67675 C11.9955,19.67675 11.991,19.6775 11.9865,19.6775 C10.1715,19.6775 8.88375,19.27175 8.049,18.437 C7.7925,18.1805 7.7925,17.76575 8.049,17.51 C8.30475,17.25425 8.7195,17.25425 8.976,17.51 C9.552,18.086 10.53675,18.3665 11.9865,18.3665 C11.991,18.3665 11.9955,18.36725 11.99925,18.36725 C12.00375,18.36725 12.00825,18.3665 12.012,18.3665 C13.46175,18.3665 14.44725,18.086 15.024,17.51 C15.2805,17.2535 15.69525,17.25425 15.951,17.51 C16.20675,17.7665 16.20675,18.18125 15.951,18.437 M6.8055,13.6595 C6.8055,12.76325 7.55775,12.011 8.454,12.011 C9.351,12.011 10.0785,12.76325 10.0785,13.6595 C10.0785,14.5565 9.351,15.284 8.454,15.284 C7.55775,15.284 6.8055,14.5565 6.8055,13.6595 M19.998,3.311 C20.6055,3.311 21.09975,3.80525 21.09975,4.412 C21.09975,5.0195 20.6055,5.51375 19.998,5.51375 C19.3905,5.51375 18.89625,5.0195 18.89625,4.412 C18.89625,3.80525 19.3905,3.311 19.998,3.311 M24,11.87525 C24,10.2845 22.70625,8.99075 21.1155,8.99075 C20.427,8.99075 19.79475,9.23375 19.29825,9.638 C17.5395,8.5325 15.3075,7.8665 12.915,7.7255 L14.163,3.77975 L17.59275,4.5875 C17.68275,5.83625 18.72675,6.82475 19.998,6.82475 C21.32775,6.82475 22.41,5.7425 22.41,4.412 C22.41,3.08225 21.32775,2 19.998,2 C19.068,2 18.2595,2.5295 17.85675,3.30275 L13.87125,2.3645 C13.5375,2.28575 13.2,2.47775 13.0965,2.80475 L11.547,7.70225 C8.96925,7.76525 6.546,8.4335 4.65825,9.6035 C4.1685,9.22025 3.55275,8.99075 2.8845,8.99075 C1.29375,8.99075 0,10.2845 0,11.87525 C0,12.8585 0.495,13.72775 1.24875,14.24825 C1.21725,14.477 1.20075,14.70725 1.20075,14.9405 C1.20075,16.92875 2.3565,18.77825 4.455,20.14775 C6.4665,21.461 9.129,22.184 11.95125,22.184 C14.7735,22.184 17.436,21.461 19.4475,20.14775 C21.546,18.77825 22.70175,16.92875 22.70175,14.9405 C22.70175,14.72825 22.6875,14.5175 22.66125,14.30825 C23.46525,13.796 24,12.89675 24,11.87525', stroke: 'none' })
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

Icon.displayName = 'SocialReddit';

Icon.icon = true;

Icon.propTypes = {
  a11yTitle: _propTypes2.default.string,
  colorIndex: _propTypes2.default.string,
  size: _propTypes2.default.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge', 'huge']),
  responsive: _propTypes2.default.bool
};
module.exports = exports['default'];