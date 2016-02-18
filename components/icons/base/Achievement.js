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

  var classes = (0, _classnames3.default)(CLASS_ROOT, CLASS_ROOT + '-achievement', className, (_classnames = {}, _defineProperty(_classnames, CLASS_ROOT + '--' + size, size), _defineProperty(_classnames, 'color-index-' + colorIndex, colorIndex), _classnames));

  var titleLabel = a11yTitle || 'achievement';
  a11yTitle = _react2.default.createElement(_FormattedMessage2.default, { id: titleLabel, defaultMessage: titleLabel });

  return _react2.default.createElement(
    'svg',
    { version: '1.1', viewBox: '0 0 28 24.5', width: '24px', height: '24px', className: classes, 'aria-labelledby': a11yTitleId },
    _react2.default.createElement(
      'title',
      { id: a11yTitleId },
      a11yTitle
    ),
    _react2.default.createElement(
      'g',
      { id: 'achievement' },
      _react2.default.createElement('rect', { id: '_x2E_svg_178_', x: '2', y: '0.5', fill: 'none', width: '24', height: '24' }),
      _react2.default.createElement('path', { fill: 'none', stroke: '#000000', strokeWidth: '2', strokeMiterlimit: '10', d: 'M23.6196,13.4113L19.031,18l-2.7238-2.7238\r M17.98,9.29C18,9.2,18,9.1,18,9c0-0.08,0-3.66,0-6c0-1.15,0-2,0-2H6v8c0,3.31,2.69,6,6,6c0.38,0,0.74-0.04,1.1-0.11 M6,3H1v4.3\r C1,9.5091,2.7909,11,5,11h1 M22.34,9.41C22.76,8.83,23,8.11,23,7.3V3h-5 M9.73,14.55C8.11,15.39,7,17.08,7,19.03 M13,19H5v4h14\r M20,9c-3.866,0-7,3.134-7,7s3.134,7,7,7s7-3.134,7-7S23.866,9,20,9z' })
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
  a11yTitleId: 'achievement-title'
};

Icon.icon = true;

Icon.displayName = 'Achievement';

exports.default = Icon;
module.exports = exports['default'];