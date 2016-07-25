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
    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Icon).apply(this, arguments));
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


      var classes = (0, _classnames3.default)(CLASS_ROOT, CLASS_ROOT + '-platform-chrome', className, (_classnames = {}, (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--' + size, size), (0, _defineProperty3.default)(_classnames, COLOR_INDEX + '-' + colorIndex, colorIndex), _classnames));

      a11yTitle = a11yTitle || _react2.default.createElement(_FormattedMessage2.default, { id: 'platform-chrome', defaultMessage: 'platform-chrome' });

      return _react2.default.createElement(
        'svg',
        { version: '1.1', viewBox: '0 0 24.1371 24.0009', width: '24px', height: '24px', role: 'img', className: classes, 'aria-labelledby': a11yTitleId },
        _react2.default.createElement(
          'title',
          { id: a11yTitleId },
          a11yTitle
        ),
        _react2.default.createElement(
          'g',
          null,
          _react2.default.createElement('rect', { x: '0.1371', y: '0.0009', fill: 'none', width: '24', height: '24' }),
          _react2.default.createElement('path', { d: 'M6.0538,10.4666L2.6192,4.5177C4.8183,1.7644,8.2032,0,12.0009,0c4.3933,0,8.2344,2.3612,10.3257,5.8832h-9.7922\r c-0.1759-0.0152-0.3537-0.0234-0.5335-0.0234C9.1442,5.8598,6.7369,7.8203,6.0538,10.4666z M16.2974,7.6177h6.8785\r c0.533,1.3578,0.8259,2.8362,0.8259,4.3831c0,6.5823-5.2996,11.926-11.8646,11.9991l4.908-8.5009\r c0.691-0.9933,1.0968-2.1992,1.0968-3.4983C18.1419,10.2858,17.4349,8.733,16.2974,7.6177z M7.6412,12.0009\r c0-2.4039,1.9558-4.3597,4.3597-4.3597s4.3597,1.9558,4.3597,4.3597s-1.9558,4.3597-4.3597,4.3597S7.6412,14.4048,7.6412,12.0009z\r M13.6459,17.9179l-3.4357,5.9507C4.4317,23.0041,0,18.0201,0,12.0009c0-2.1381,0.5598-4.1451,1.5399-5.8838l4.8995,8.4863\r c0.9814,2.0887,3.1051,3.5386,5.5615,3.5386C12.5704,18.1419,13.1221,18.0636,13.6459,17.9179z' })
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
  size: _react.PropTypes.oneOf(['small', 'medium', 'large', 'xlarge', 'huge'])
};

Icon.defaultProps = {
  a11yTitleId: 'platform-chrome-title'
};

Icon.icon = true;

Icon.displayName = 'PlatformChrome';
module.exports = exports['default'];