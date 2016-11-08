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


      var classes = (0, _classnames3.default)(CLASS_ROOT, CLASS_ROOT + '-platform-swift', className, (_classnames = {}, (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--' + size, size), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--responsive', responsive), (0, _defineProperty3.default)(_classnames, COLOR_INDEX + '-' + colorIndex, colorIndex), _classnames));

      a11yTitle = a11yTitle || _Intl2.default.getMessage(intl, 'platform-swift');

      return _react2.default.createElement(
        'svg',
        { version: '1.1', viewBox: '0 0 24 24', width: '24px', height: '24px', role: 'img', className: classes, 'aria-label': a11yTitle },
        _react2.default.createElement('path', { fill: '#000000', fillRule: 'evenodd', d: 'M18.1029473,21.0182797 C15.2758951,22.6513915 11.388774,22.8191853 7.4780286,21.143065 C4.31157263,19.7958689 1.6842374,17.43767 -1.77635684e-15,14.7432778 C0.808438798,15.4168759 1.7515972,15.9559966 2.76211541,16.4272729 C6.80079604,18.320253 10.8386286,18.1906218 13.6802189,16.432119 C13.6784016,16.4303017 13.6771901,16.4290902 13.6759786,16.4272729 C9.63378462,13.3282374 6.19795002,9.28604337 3.63803517,5.98529182 C3.09885386,5.44629224 2.69463446,4.77257305 2.29041506,4.16627424 C5.38939007,6.99574946 10.3075644,10.5660614 12.0587981,11.5770642 C8.35400892,7.6693475 5.05265163,2.81907816 5.18712893,2.95355547 C11.0484011,8.88206627 16.5056356,12.2506622 16.5056356,12.2506622 C16.6861501,12.3524288 16.8254735,12.4372343 16.9375379,12.5129535 C17.0556599,12.2124997 17.1592437,11.9005366 17.2464723,11.5770642 C18.1896307,8.14122958 17.1119949,4.23351289 14.7537961,1 C20.2104248,4.30105442 23.4445434,10.4988227 22.0967416,15.6864968 C22.0616079,15.8264259 22.0234454,15.9645377 21.9822542,16.1002266 C21.9980037,16.1190049 22.0137533,16.138389 22.0295029,16.1583789 C24.7238951,19.5269749 23.9830584,23.0972868 23.6462594,22.4236887 C22.1845759,19.5633201 19.4786744,20.4380283 18.1030079,21.0183403 L18.1029473,21.0182797 Z', stroke: 'none' })
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

Icon.displayName = 'PlatformSwift';

Icon.icon = true;

Icon.propTypes = {
  a11yTitle: _react.PropTypes.string,
  colorIndex: _react.PropTypes.string,
  size: _react.PropTypes.oneOf(['small', 'medium', 'large', 'xlarge', 'huge']),
  responsive: _react.PropTypes.bool
};
module.exports = exports['default'];