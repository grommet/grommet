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

var _FormattedMessage = require('../../../components/FormattedMessage');

var _FormattedMessage2 = _interopRequireDefault(_FormattedMessage);

var _CSSClassnames = require('../../../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

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

      var _props = this.props;
      var a11yTitleId = _props.a11yTitleId;
      var className = _props.className;
      var colorIndex = _props.colorIndex;
      var _props2 = this.props;
      var a11yTitle = _props2.a11yTitle;
      var size = _props2.size;
      var responsive = _props2.responsive;


      var classes = (0, _classnames3.default)(CLASS_ROOT, CLASS_ROOT + '-platform-skype', className, (_classnames = {}, (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--' + size, size), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--responsive', responsive), (0, _defineProperty3.default)(_classnames, COLOR_INDEX + '-' + colorIndex, colorIndex), _classnames));

      a11yTitle = a11yTitle || _react2.default.createElement(_FormattedMessage2.default, { id: 'platform-skype', defaultMessage: 'platform-skype' });

      return _react2.default.createElement(
        'svg',
        { version: '1.1', viewBox: '0 0 24 24', width: '24px', height: '24px', role: 'img', className: classes, 'aria-labelledby': a11yTitleId },
        _react2.default.createElement(
          'title',
          { id: a11yTitleId },
          a11yTitle
        ),
        _react2.default.createElement(
          'g',
          null,
          _react2.default.createElement('rect', { x: '0', y: '0', fill: 'none', width: '24', height: '24' }),
          _react2.default.createElement('path', { d: 'M21.9582,14.0392c0.0821-0.5194,0.1254-1.0509,0.1254-1.5933c0-5.6373-4.5696-10.2069-10.2072-10.2069\r c-0.5409,0-1.0738,0.0445-1.5928,0.1256C9.3435,1.7832,8.234,1.4466,7.0451,1.4466c-3.4065,0-6.168,2.7612-6.168,6.168\r c0,1.1887,0.3368,2.2973,0.9181,3.2393c-0.0804,0.5202-0.1247,1.0499-0.1247,1.5923c0,5.6376,4.5696,10.2059,10.2057,10.2059\r c0.5414,0,1.0743-0.0418,1.5933-0.1237c0.9411,0.5806,2.0496,0.9181,3.2386,0.9181c3.4073,0,6.1685-2.7619,6.1685-6.1687\r C22.8768,16.0889,22.5402,14.9803,21.9582,14.0392L21.9582,14.0392z M16.7225,17.0881c-0.4319,0.6216-1.066,1.1073-1.8949,1.4566\r c-0.8306,0.35-1.8121,0.5243-2.9455,0.5243c-1.3586,0-2.4835-0.2376-3.3713-0.7177c-0.6294-0.3437-1.1413-0.805-1.5349-1.3801\r c-0.3943-0.5754-0.5942-1.1389-0.5942-1.6884c0-0.3241,0.1237-0.6062,0.3642-0.836c0.2432-0.2315,0.5563-0.3476,0.9259-0.3476\r c0.3029,0,0.563,0.0912,0.7746,0.2718c0.2102,0.1806,0.3865,0.4432,0.5307,0.7898c0.1728,0.4016,0.3606,0.7372,0.5603,1.0049\r c0.1985,0.2645,0.4779,0.4855,0.8397,0.6583c0.3579,0.1733,0.834,0.2598,1.43,0.2598c0.8155,0,1.4747-0.1762,1.979-0.5243\r c0.507-0.351,0.7507-0.7783,0.7507-1.2948c0-0.4116-0.1315-0.7389-0.4006-0.9939c-0.2716-0.2581-0.6226-0.4549-1.0579-0.592\r c-0.4371-0.1386-1.024-0.2858-1.7595-0.4407c-0.9875-0.2154-1.8135-0.4664-2.4823-0.7544\r c-0.6698-0.2894-1.2031-0.6847-1.5984-1.1841c-0.3962-0.5043-0.5937-1.131-0.5937-1.8734c0-0.7079,0.2085-1.341,0.626-1.892\r c0.4173-0.5524,1.021-0.9753,1.8081-1.2699c0.7844-0.2946,1.7079-0.4417,2.7659-0.4417c0.846,0,1.5779,0.0978,2.1973,0.2926\r c0.618,0.1963,1.1328,0.4552,1.5444,0.78c0.4094,0.3241,0.7104,0.6661,0.901,1.0249c0.1904,0.3598,0.2865,0.7113,0.2865,1.0543\r c0,0.319-0.1237,0.6082-0.3645,0.8617c-0.241,0.254-0.549,0.3833-0.9088,0.3821c-0.3244,0-0.5788-0.0748-0.7553-0.2332\r c-0.1718-0.1533-0.3522-0.3972-0.5476-0.7372c-0.2466-0.4745-0.5422-0.8441-0.8861-1.1085\r c-0.3346-0.2594-0.8868-0.3945-1.6551-0.3928c-0.7108,0-1.2797,0.1452-1.7089,0.4292C9.5151,8.4645,9.3086,8.7994,9.3076,9.1917\r C9.3083,9.4376,9.379,9.6449,9.5212,9.8221c0.1445,0.1789,0.3454,0.3339,0.6038,0.4647c0.2584,0.1327,0.5212,0.2354,0.7854,0.3092\r c0.2672,0.0758,0.7106,0.1853,1.3268,0.3302c0.7729,0.1667,1.4742,0.3527,2.1041,0.5556c0.6287,0.2039,1.1653,0.4498,1.6087,0.7426\r c0.4468,0.2921,0.7961,0.6644,1.0455,1.1142c0.2508,0.4505,0.3759,1.0007,0.3759,1.648\r C17.3725,15.7664,17.1552,16.4675,16.7225,17.0881L16.7225,17.0881z' })
        )
      );
    }
  }]);
  return Icon;
}(_react.Component);

Icon.displayName = 'Icon';
exports.default = Icon;
;

Icon.propTypes = {
  a11yTitle: _react.PropTypes.string,
  a11yTitleId: _react.PropTypes.string,
  colorIndex: _react.PropTypes.string,
  size: _react.PropTypes.oneOf(['small', 'medium', 'large', 'xlarge', 'huge']),
  responsive: _react.PropTypes.bool
};

Icon.defaultProps = {
  a11yTitleId: 'platform-skype-title',
  responsive: true
};

Icon.icon = true;

Icon.displayName = 'PlatformSkype';
module.exports = exports['default'];