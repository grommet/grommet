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


      var classes = (0, _classnames3.default)(CLASS_ROOT, CLASS_ROOT + '-payment-google-wallet', className, (_classnames = {}, (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--' + size, size), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--responsive', responsive), (0, _defineProperty3.default)(_classnames, COLOR_INDEX + '-' + colorIndex, colorIndex), _classnames));

      a11yTitle = a11yTitle || _react2.default.createElement(_FormattedMessage2.default, { id: 'payment-google-wallet', defaultMessage: 'payment-google-wallet' });

      return _react2.default.createElement(
        'svg',
        { version: '1.1', viewBox: '0 0 25.5848 24.1156', width: '24px', height: '24px', role: 'img', className: classes, 'aria-labelledby': a11yTitleId },
        _react2.default.createElement(
          'title',
          { id: a11yTitleId },
          a11yTitle
        ),
        _react2.default.createElement(
          'g',
          null,
          _react2.default.createElement('rect', { x: '1.5848', y: '0.1155', fill: 'none', width: '24', height: '24' }),
          _react2.default.createElement('path', { d: 'M8.7588,10.7742C7.3911,8.8903,5.4943,7.2387,3.3395,6.0903c-0.3226-0.1806-0.6968-0.271-1.071-0.271\r c-0.8387,0-1.6,0.4516-2,1.2c-0.5935,1.0968-0.1677,2.4774,0.929,3.0581c3.3161,1.7806,5.4581,5.1613,5.7161,9.0839v-0.0129\r c-0.0387-0.4387,0.0387-0.8645,0.2323-1.2645c0.0258-0.0516,0.0645-0.1161,0.1032-0.1806C8.2814,16,8.8363,14.0387,8.8363,12.0258\r C8.8363,11.6,8.7976,11.1871,8.7588,10.7742' }),
          _react2.default.createElement('path', { d: 'M21.8943,6.5161c-0.4-1.7548-0.9935-3.4581-1.7677-5.0839C19.7137,0.5677,18.8234,0,17.8685,0\r c-0.3742,0-0.7355,0.0774-1.071,0.2452c-1.2516,0.5935-1.7806,2.0903-1.1871,3.329c1.2645,2.6839,1.8968,5.5097,1.8968,8.4516\r s-0.6323,5.7677-1.871,8.4c-0.0129,0.0387-0.2323,0.5032-0.2323,1.0452c0,0.1548,0.0129,0.3742,0.0645,0.5806\r c0.1677,0.7097,0.6194,1.3548,1.3677,1.7032C17.1717,23.9097,17.533,24,17.9072,24c0.9161,0,1.7548-0.5032,2.1936-1.3032\r c0.5032-0.9419,1.0065-2.1677,1.4452-3.7548c0.1419-0.4774,0.2581-0.929,0.3613-1.4065c0.4-1.7935,0.6194-3.6258,0.6194-5.5097\r C22.5137,10.1677,22.2943,8.2968,21.8943,6.5161' }),
          _react2.default.createElement('path', { d: 'M11.3266,3.8968c-0.0387-0.0774-0.0903-0.1419-0.1419-0.2065c-0.1677-0.2194-0.3613-0.4-0.5935-0.5419\r c-0.3742-0.2452-0.8258-0.3871-1.2903-0.3871c-0.3871,0-0.5806,0.0516-0.8516,0.1548C8.1653,3.0323,7.8685,3.1871,7.5976,3.471\r S7.1717,4.0387,7.0556,4.3484C6.8234,4.9548,6.8621,5.7419,7.2492,6.3871C8.075,7.7161,8.5653,9.2387,8.7459,10.8\r c0.0516,0.4129,0.0774,0.8387,0.0774,1.2516c0,2.0129-0.5419,3.9742-1.5871,5.6774c-0.0387,0.0645-0.0645,0.1161-0.1032,0.1806\r c-0.2065,0.4-0.271,0.8516-0.2323,1.2774c0.0645,0.7226,0.4645,1.4065,1.1355,1.8194c0.1677,0.1032,0.3613,0.1806,0.5419,0.2452\r c0.2194,0.0645,0.4516,0.1032,0.6839,0.1032c0.8387,0,1.6-0.4258,2.0387-1.1484c1.3161-2.1548,2.0774-4.6065,2.2452-7.1226\r c0.0258-0.3355,0.0387-0.6839,0.0387-1.0194C13.5976,9.1484,12.8105,6.3355,11.3266,3.8968' }),
          _react2.default.createElement('path', { d: 'M15.6234,20.4258c1.2516-2.6323,1.8839-5.4581,1.8839-8.4c0-1.0065-0.0645-1.7419-0.1161-2.2194\r c-1.6387-2.6194-4.0129-4.9677-6.8-6.671c0,0,0.0645,0.0387,0.0645,0.0516c0.1935,0.1419,0.3484,0.2839,0.529,0.5032\r c0.0387,0.0516,0.1032,0.129,0.1419,0.2065c1.4839,2.4516,2.2581,5.2516,2.2581,8.129c0,0.3484-0.0129,0.6839-0.0387,1.0194\r c1.1871,2.2581,1.8323,4.8258,1.8323,7.5226c0,0.2194,0,0.5548,0,0.8129c0.0129-0.2839,0.0774-0.5806,0.1806-0.8387\r C15.5976,20.5032,15.6105,20.4645,15.6234,20.4258' })
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
  a11yTitleId: 'payment-google-wallet-title',
  responsive: true
};

Icon.icon = true;

Icon.displayName = 'PaymentGoogleWallet';
module.exports = exports['default'];