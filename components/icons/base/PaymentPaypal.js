'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _FormattedMessage = require('../../../components/FormattedMessage');

var _FormattedMessage2 = _interopRequireDefault(_FormattedMessage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } // (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = 'control-icon';

var Icon = function Icon(props) {
  var _classnames;

  var a11yTitle = props.a11yTitle;
  var a11yTitleId = props.a11yTitleId;
  var className = props.className;
  var colorIndex = props.colorIndex;
  var large = props.large;
  var size = props.size;


  if (!size && large) {
    size = 'large';
  }

  var classes = (0, _classnames3.default)(CLASS_ROOT, CLASS_ROOT + '-payment-paypal', className, (_classnames = {}, _defineProperty(_classnames, CLASS_ROOT + '--' + size, size), _defineProperty(_classnames, 'color-index-' + colorIndex, colorIndex), _classnames));

  var titleLabel = a11yTitle || 'payment-paypal';
  a11yTitle = _react2.default.createElement(_FormattedMessage2.default, { id: titleLabel, defaultMessage: titleLabel });

  return _react2.default.createElement(
    'svg',
    { version: '1.1', viewBox: '0 0 24 24', width: '24px', height: '24px', className: classes, 'aria-labelledby': a11yTitleId },
    _react2.default.createElement(
      'title',
      { id: a11yTitleId },
      a11yTitle
    ),
    _react2.default.createElement(
      'g',
      { id: 'payment-paypal' },
      _react2.default.createElement('rect', { id: '_x2E_svg_294_', x: '0', y: '0', fill: 'none', width: '24', height: '24' }),
      _react2.default.createElement('path', { d: 'M18.2812,2.477c-0.978-1.1147-2.7457-1.5925-5.0072-1.5925H6.7105c-0.4627,0-0.8559,0.3365-0.9283,0.7928L3.0494,19.0098\r c-0.0543,0.3418,0.2103,0.6514,0.5567,0.6514h4.052l1.0177-6.4548l-0.0315,0.2021c0.0724-0.4563,0.4627-0.7928,0.9248-0.7928\r h1.9255c3.7827,0,6.7446-1.5364,7.6098-5.981c0.0257-0.1314,0.0479-0.2594,0.0672-0.3844\r C19.4292,4.6076,19.1698,3.4894,18.2812,2.477 M20.0516,7.1303L20.0516,7.1303c-0.0199,0.1256-0.0415,0.253-0.0672,0.3844\r c-0.8652,4.444-3.8271,5.981-7.6098,5.981h-1.9261c-0.4621,0-0.8523,0.3365-0.9242,0.7928l-0.9861,6.2521l-0.2798,1.7736\r c-0.0473,0.2991,0.184,0.5702,0.4866,0.5702h3.4158c0.4043,0,0.7484-0.2944,0.8115-0.6934l0.0333-0.1741l0.6438-4.0801\r l0.0415-0.2255c0.0631-0.399,0.4072-0.6934,0.8115-0.6934h0.5112c3.3089,0,5.8998-1.3442,6.657-5.2321\r c0.3161-1.6247,0.1525-2.9812-0.6835-3.934C20.7334,7.5632,20.4185,7.3249,20.0516,7.1303' })
    )
  );
};

Icon.propTypes = {
  a11yTitle: _react.PropTypes.string,
  a11yTitleId: _react.PropTypes.string,
  colorIndex: _react.PropTypes.string,
  large: _react.PropTypes.bool,
  size: _react.PropTypes.oneOf(['small', 'medium', 'large', 'huge'])
};

Icon.defaultProps = {
  a11yTitleId: 'payment-paypal-title'
};

Icon.icon = true;

Icon.displayName = 'PaymentPaypal';

exports.default = Icon;
module.exports = exports['default'];