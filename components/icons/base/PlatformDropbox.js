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

  var classes = (0, _classnames3.default)(CLASS_ROOT, CLASS_ROOT + '-platform-dropbox', className, (_classnames = {}, _defineProperty(_classnames, CLASS_ROOT + '--' + size, size), _defineProperty(_classnames, 'color-index-' + colorIndex, colorIndex), _classnames));

  var titleLabel = a11yTitle || 'platform-dropbox';
  a11yTitle = _react2.default.createElement(_FormattedMessage2.default, { id: titleLabel, defaultMessage: titleLabel });

  return _react2.default.createElement(
    'svg',
    { version: '1.1', viewBox: '0 0 24.003 24', width: '24px', height: '24px', className: classes, 'aria-labelledby': a11yTitleId },
    _react2.default.createElement(
      'title',
      { id: a11yTitleId },
      a11yTitle
    ),
    _react2.default.createElement(
      'g',
      { id: 'platform-dropbox' },
      _react2.default.createElement('rect', { id: '_x2E_svg_295_', x: '0.003', y: '0', fill: 'none', width: '24', height: '24' }),
      _react2.default.createElement('polygon', { points: '15.9985,1.8917 12.003,3.8961 20.009,7.8976 24,5.8961 \t' }),
      _react2.default.createElement('polygon', { points: '15.9985,15.5735 15.3293,15.2404 11.994,13.5675 8.6781,15.23 8.009,15.5646 7.3413,15.2315 3.997,13.5601 \r 3.997,18.997 12.003,23.0014 12.003,22.9865 20.009,18.9865 20.009,13.569 16.6677,15.2404 \t' }),
      _react2.default.createElement('polygon', { points: '8.009,13.8947 12.003,11.8917 4.0179,7.8976 12.003,3.9066 8.009,1.9036 0,5.9051 3.9776,7.8976 0,9.8902 \t' }),
      _react2.default.createElement('polygon', { points: '12.003,11.9021 15.9985,13.9036 24,9.9021 20.009,7.8976 \t' })
    )
  );
};

Icon.propTypes = {
  a11yTitle: _react.PropTypes.string,
  a11yTitleId: _react.PropTypes.string,
  colorIndex: _react.PropTypes.string,
  large: _react.PropTypes.bool,
  size: _react.PropTypes.oneOf(['small', 'medium', 'large'])
};

Icon.defaultProps = {
  a11yTitleId: 'platform-dropbox-title'
};

Icon.icon = true;

exports.default = Icon;
module.exports = exports['default'];