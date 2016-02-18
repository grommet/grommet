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

  var classes = (0, _classnames3.default)(CLASS_ROOT, CLASS_ROOT + '-soa', className, (_classnames = {}, _defineProperty(_classnames, CLASS_ROOT + '--' + size, size), _defineProperty(_classnames, 'color-index-' + colorIndex, colorIndex), _classnames));

  var titleLabel = a11yTitle || 'soa';
  a11yTitle = _react2.default.createElement(_FormattedMessage2.default, { id: titleLabel, defaultMessage: titleLabel });

  return _react2.default.createElement(
    'svg',
    { version: '1.1', viewBox: '0 0 25 25.15', width: '24px', height: '24px', className: classes, 'aria-labelledby': a11yTitleId },
    _react2.default.createElement(
      'title',
      { id: a11yTitleId },
      a11yTitle
    ),
    _react2.default.createElement(
      'g',
      { id: 'soa' },
      _react2.default.createElement('rect', { id: '_x2E_svg_223_', y: '0', fill: 'none', width: '24', height: '24' }),
      _react2.default.createElement('path', { fill: 'none', stroke: '#000000', strokeWidth: '2', strokeMiterlimit: '10', d: 'M6,9.15c-1.6545,0-3-1.3458-3-3s1.3455-3,3-3\r s3,1.3458,3,3S7.6545,9.15,6,9.15z M9,6.1501L12,6.15 M10.2426,10.3926L8.1212,8.2714 M6,12.15l-0.0001-3 M3.8786,8.2712\r l-2.1212,2.1214 M0,6.15h3 M1.7574,1.9074l2.1213,2.1213 M6,3.15v-3 M8.1213,4.0287l2.1213-2.1213 M22,11.15c0-1.6542-1.3455-3-3-3\r s-3,1.3458-3,3s1.3455,3,3,3S22,12.8042,22,11.15z M22,11.1501l3-0.0001 M21.1212,13.2714l2.1214,2.1212 M18.9999,14.15l0.0001,3\r M16.8786,13.2712l-2.1212,2.1214 M13,11.15h3 M11,19.15c0-1.6542-1.3455-3-3-3s-3,1.3458-3,3s1.3455,3,3,3S11,20.8042,11,19.15z\r M14,19.15l-3,0.0001 M10.1212,21.2714l2.1214,2.1212 M8,25.15l-0.0001-3 M3.7574,23.3926l2.1212-2.1214 M2,19.15h3\r M5.8787,17.0287l-2.1213-2.1213 M8,16.15v-3 M10.1213,17.0287l2.1213-2.1213 M16.8787,9.0287l-2.1213-2.1213 M19,8.15v-3\r M21.1213,9.0287l2.1213-2.1213' })
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
  a11yTitleId: 'soa-title'
};

Icon.icon = true;

Icon.displayName = 'Soa';

exports.default = Icon;
module.exports = exports['default'];