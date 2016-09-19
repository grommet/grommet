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


      var classes = (0, _classnames3.default)(CLASS_ROOT, CLASS_ROOT + '-service-start', className, (_classnames = {}, (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--' + size, size), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--responsive', responsive), (0, _defineProperty3.default)(_classnames, COLOR_INDEX + '-' + colorIndex, colorIndex), _classnames));

      a11yTitle = a11yTitle || _react2.default.createElement(_FormattedMessage2.default, { id: 'service-start', defaultMessage: 'service-start' });

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
          _react2.default.createElement('path', { d: 'M6,5.5c0.0521,0.0469,0,6,0,6l5-3L6,5.5z' }),
          _react2.default.createElement('path', { fill: 'none', stroke: '#000000', strokeWidth: '2', strokeMiterlimit: '10', d: 'M11.28,12.3c0.01,0,0.02,0,0.03,0.01\r c0.03,0.01,0.06,0.04,0.09,0.06c0.02,0.02,0.05,0.04,0.07,0.05c1.55,0.51,2.79,1.48,3.36,3.31c0.03,0.08,0.05,0.18,0.08,0.27h0.01\r c0.18,0,0.28,1.01,0.28,1.62c0,3.04-2.46,5.38-5.5,5.38s-5.5-2.46-5.5-5.5c0-1.48,0.58-2.82,1.53-3.8 M12.65,6.5799\r C11.88,4.49,9.86,3,7.5,3C4.46,3,2,5.46,2,8.5c0,2.42,1.56,4.47,3.73,5.2C6.28,13.9,6.88,14,7.5,14c1.5,0,2.86-0.6,3.85-1.58\r c0.02-0.01,0.04-0.03,0.05-0.05c0.99-0.99,1.6-2.36,1.6-3.87C13,7.82,12.88,7.17,12.65,6.5799z M11.28,12.24\r c0.01,0.02,0.02,0.05,0.03,0.07c0.01,0.04,0.02,0.07,0.04,0.11 M14.83,15.73c0.03,0.01,0.06,0.02,0.09,0.03\r c0.5,0.16,1.03,0.24,1.58,0.24c3.04,0,5.5-2.46,5.5-5.5S19.54,5,16.5,5c-1.5,0-2.86,0.6-3.85,1.58' })
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
  a11yTitleId: 'service-start-title',
  responsive: true
};

Icon.icon = true;

Icon.displayName = 'ServiceStart';
module.exports = exports['default'];