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


      var classes = (0, _classnames3.default)(CLASS_ROOT, CLASS_ROOT + '-platform-chrome', className, (_classnames = {}, _defineProperty(_classnames, CLASS_ROOT + '--' + size, size), _defineProperty(_classnames, CLASS_ROOT + '--responsive', responsive), _defineProperty(_classnames, COLOR_INDEX + '-' + colorIndex, colorIndex), _classnames));

      a11yTitle = a11yTitle || _Intl2.default.getMessage(intl, 'platform-chrome');

      var restProps = _Props2.default.omit(this.props, Object.keys(Icon.propTypes));
      return _react2.default.createElement(
        'svg',
        _extends({}, restProps, { version: '1.1', viewBox: '0 0 24 24', width: '24px', height: '24px', role: 'img', className: classes, 'aria-label': a11yTitle }),
        _react2.default.createElement('path', { fillRule: 'evenodd', d: 'M11.9733005,16.4144516 C9.59429509,16.4144516 7.65884342,14.4788121 7.65884342,12.0999945 C7.65884342,9.72075429 9.59429509,7.78530262 11.9733005,7.78530262 C14.3523059,7.78530262 16.2879454,9.72075429 16.2879454,12.0999945 C16.2879924,14.4788121 14.3523529,16.4144516 11.9733005,16.4144516 L11.9733005,16.4144516 Z M13.7910066,17.1810894 C13.1872494,17.4007528 12.5549364,17.5116882 11.9068426,17.5116882 C10.6352186,17.5116882 9.39370022,17.0652225 8.41129728,16.2548117 C7.61431896,15.5972306 7.02033082,14.7318218 6.69297277,13.7500294 L6.691235,13.7442055 L1.93641793,5.50854377 C0.228238232,8.1357683 -0.377867323,11.2684017 0.230163868,14.3493248 C0.849467072,17.4870306 2.65331799,20.1955546 5.30970885,21.9764857 C6.69353637,22.9040785 8.22657716,23.5227711 9.86735961,23.8160783 L13.7910066,17.1810894 L13.7910066,17.1810894 Z M22.7599128,6.70666487 C19.7903479,0.731840215 12.5393434,-1.70437065 6.56465968,1.26519432 C5.01832731,2.03375777 3.65958002,3.12347966 2.57441389,4.45616042 L6.59105498,11.413435 C6.85172029,9.39264477 8.25048322,7.60626547 10.3219975,6.95469613 C10.8217704,6.79763941 11.341739,6.71403864 11.865371,6.70666487 L22.7599128,6.70666487 Z M11.9264747,24 C14.936431,24 17.8171819,22.8712018 20.0368292,20.8218558 C22.2681243,18.7619893 23.6231612,15.9588274 23.8523118,12.9290041 C23.983349,11.1937716 23.7261592,9.41711443 23.1082181,7.78530262 L15.2520944,7.78530262 C16.5738788,8.83162726 17.3494403,10.4306093 17.3416908,12.1250278 C17.3360548,13.3449884 16.9177692,14.5439079 16.1598672,15.5064909 L11.1518525,23.9751076 C11.4097938,23.9916399 11.6696606,24 11.926052,24 L11.9264747,24 L11.9264747,24 Z' })
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

Icon.displayName = 'PlatformChrome';

Icon.icon = true;

Icon.propTypes = {
  a11yTitle: _propTypes2.default.string,
  colorIndex: _propTypes2.default.string,
  size: _propTypes2.default.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge', 'huge']),
  responsive: _propTypes2.default.bool
};
module.exports = exports['default'];