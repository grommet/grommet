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

  var classes = (0, _classnames3.default)(CLASS_ROOT, CLASS_ROOT + '-user-settings', className, (_classnames = {}, _defineProperty(_classnames, CLASS_ROOT + '--' + size, size), _defineProperty(_classnames, 'color-index-' + colorIndex, colorIndex), _classnames));

  var titleLabel = a11yTitle || 'user-settings';
  a11yTitle = _react2.default.createElement(_FormattedMessage2.default, { id: titleLabel, defaultMessage: titleLabel });

  return _react2.default.createElement(
    'svg',
    { version: '1.1', viewBox: '0 0 26 24', width: '24px', height: '24px', className: classes, 'aria-labelledby': a11yTitleId },
    _react2.default.createElement(
      'title',
      { id: a11yTitleId },
      a11yTitle
    ),
    _react2.default.createElement(
      'g',
      { id: 'user-settings' },
      _react2.default.createElement('rect', { id: '_x2E_svg_129_', fill: 'none', width: '24', height: '24' }),
      _react2.default.createElement('path', { fill: 'none', stroke: '#000000', strokeWidth: '2', strokeMiterlimit: '10', d: 'M20,21c-1.6545,0-3-1.3458-3-3s1.3455-3,3-3\r s3,1.3458,3,3S21.6545,21,20,21z M26,18l-3,0.0001 M22.1212,20.1214l2.1214,2.1212 M20,24l-0.0001-3 M15.7574,22.2426\r l2.1212-2.1214 M14,18h3 M17.8787,15.8787l-2.1213-2.1213 M20,15v-3 M22.1213,15.8787l2.1213-2.1213 M9,1C6.2386,1,4,3.2386,4,6\r s2.2386,5,5,5s5-2.2386,5-5S11.7614,1,9,1z M14.0002,12.7548C12.6306,11.6568,10.892,11,9,11h0c-4.4183,0-8,3.5817-8,8v4h12.4' })
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
  a11yTitleId: 'user-settings-title'
};

Icon.icon = true;

Icon.displayName = 'UserSettings';

exports.default = Icon;
module.exports = exports['default'];