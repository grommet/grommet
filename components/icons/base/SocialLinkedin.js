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

  var classes = (0, _classnames3.default)(CLASS_ROOT, CLASS_ROOT + '-social-linkedin', className, (_classnames = {}, _defineProperty(_classnames, CLASS_ROOT + '--' + size, size), _defineProperty(_classnames, 'color-index-' + colorIndex, colorIndex), _classnames));

  var titleLabel = a11yTitle || 'social-linkedin';
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
      { id: 'social-linkedin' },
      _react2.default.createElement('rect', { id: '_x2E_svg_309_', x: '0', y: '0', fill: 'none', width: '24', height: '24' }),
      _react2.default.createElement('path', { d: 'M7.352,21.3818H3.2058V8.0466H7.352V21.3818z M5.2789,6.2234c-1.3278,0-2.4021-1.0766-2.4021-2.4024\r c0-1.3276,1.0743-2.4049,2.4021-2.4049c1.3254,0,2.402,1.0773,2.402,2.4049C7.681,5.1468,6.6043,6.2234,5.2789,6.2234z\r M22.8768,21.3818H18.734v-6.4857c0-1.5466-0.0272-3.5358-2.1533-3.5358c-2.1573,0-2.486,1.6858-2.486,3.4247v6.5968H9.9512V8.0466\r h3.9756v1.8232h0.0568c0.5536-1.0492,1.9055-2.1546,3.9219-2.1546c4.1971,0,4.9714,2.7619,4.9714,6.352V21.3818z' })
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
  a11yTitleId: 'social-linkedin-title'
};

Icon.icon = true;

Icon.displayName = 'SocialLinkedin';

exports.default = Icon;
module.exports = exports['default'];