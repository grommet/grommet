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


      var classes = (0, _classnames3.default)(CLASS_ROOT, CLASS_ROOT + '-platform-oracle', className, (_classnames = {}, _defineProperty(_classnames, CLASS_ROOT + '--' + size, size), _defineProperty(_classnames, CLASS_ROOT + '--responsive', responsive), _defineProperty(_classnames, COLOR_INDEX + '-' + colorIndex, colorIndex), _classnames));

      a11yTitle = a11yTitle || _Intl2.default.getMessage(intl, 'platform-oracle');

      var restProps = _Props2.default.omit(this.props, Object.keys(Icon.propTypes));
      return _react2.default.createElement(
        'svg',
        _extends({}, restProps, { version: '1.1', viewBox: '0 0 24 24', width: '24px', height: '24px', role: 'img', className: classes, 'aria-label': a11yTitle }),
        _react2.default.createElement('path', { fillRule: 'evenodd', d: 'M10.3609792,12.0298215 L11.9468503,12.0298215 L11.1082982,10.6807167 L9.56926613,13.1199573 L8.86882586,13.1199573 L10.7408019,10.1899094 C10.822194,10.0715231 10.9578407,10 11.1082982,10 C11.2538045,10 11.3894535,10.069058 11.4683805,10.1849768 L13.3477542,13.1199573 L12.647312,13.1199573 L12.3168148,12.5748896 L10.7111996,12.5748896 L10.3609792,12.0298215 L10.3609792,12.0298215 Z M17.636774,12.5748896 L17.636774,10.0295965 L17.0423792,10.0295965 L17.0423792,12.8239938 C17.0423792,12.9004515 17.0719808,12.9744417 17.1287027,13.0311675 C17.1854208,13.0878954 17.2618823,13.1199573 17.3457403,13.1199573 L20.056286,13.1199573 L20.4065071,12.5748896 L17.636774,12.5748896 L17.636774,12.5748896 Z M7.80335434,12.1186113 C8.38049377,12.1186113 8.84910424,11.6524682 8.84910424,11.0753366 C8.84910424,10.4982069 8.38049377,10.0295965 7.80335434,10.0295965 L5.20305143,10.0295965 L5.20305143,13.1199573 L5.79721057,13.1199573 L5.79721057,10.5746646 L7.76389083,10.5746646 C8.04013463,10.5746646 8.26210362,10.7991026 8.26210362,11.0753366 C8.26210362,11.3515703 8.04013463,11.5760106 7.76389083,11.5760106 L6.08824577,11.5735432 L7.86253946,13.1199573 L8.7257835,13.1199573 L7.53206103,12.1186113 L7.80335434,12.1186113 L7.80335434,12.1186113 Z M1.5454416,13.1199573 C0.692314677,13.1199573 0,12.4293739 0,11.5760106 C0,10.7226453 0.692314677,10.0295965 1.5454416,10.0295965 L3.34168561,10.0295965 C4.19504894,10.0295965 4.88687091,10.7226453 4.88687091,11.5760106 C4.88687091,12.4293739 4.19504894,13.1199573 3.34168561,13.1199573 L1.5454416,13.1199573 L1.5454416,13.1199573 Z M3.30172939,12.5748896 C3.85445301,12.5748896 4.30209898,12.128476 4.30209898,11.5760106 C4.30209898,11.0235429 3.85445301,10.5746646 3.30172939,10.5746646 L1.58514152,10.5746646 C1.0326742,10.5746646 0.584771536,11.0235429 0.584771536,11.5760106 C0.584771536,12.128476 1.0326742,12.5748896 1.58514152,12.5748896 L3.30172939,12.5748896 L3.30172939,12.5748896 Z M14.5883347,13.1199573 C13.7349694,13.1199573 13.0419276,12.4293739 13.0419276,11.5760106 C13.0419276,10.7226453 13.7349694,10.0295965 14.5883347,10.0295965 L16.721744,10.0295965 L16.3739884,10.5746646 L14.6277982,10.5746646 C14.0753286,10.5746646 13.6264604,11.0235429 13.6264604,11.5760106 C13.6264604,12.128476 14.0753286,12.5748896 14.6277982,12.5748896 L16.7710656,12.5748896 L16.4208484,13.1199573 L14.5883347,13.1199573 L14.5883347,13.1199573 Z M21.8567326,12.5748896 C21.4004484,12.5748896 21.0132293,12.2690591 20.8948388,11.8473098 L23.4352068,11.8473098 L23.7854279,11.3022421 L20.8948388,11.3022421 C21.0132293,10.8829598 21.4004484,10.5746646 21.8567326,10.5746646 L23.6004573,10.5746646 L23.9531439,10.0295965 L21.8172691,10.0295965 C20.9639038,10.0295965 20.270862,10.7226453 20.270862,11.5760106 C20.270862,12.4293739 20.9639038,13.1199573 21.8172691,13.1199573 L23.6497828,13.1199573 L24,12.5748896 L21.8567326,12.5748896 L21.8567326,12.5748896 Z' })
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

Icon.displayName = 'PlatformOracle';

Icon.icon = true;

Icon.propTypes = {
  a11yTitle: _propTypes2.default.string,
  colorIndex: _propTypes2.default.string,
  size: _propTypes2.default.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge', 'huge']),
  responsive: _propTypes2.default.bool
};
module.exports = exports['default'];