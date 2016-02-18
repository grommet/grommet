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

  var classes = (0, _classnames3.default)(CLASS_ROOT, CLASS_ROOT + '-document-update', className, (_classnames = {}, _defineProperty(_classnames, CLASS_ROOT + '--' + size, size), _defineProperty(_classnames, 'color-index-' + colorIndex, colorIndex), _classnames));

  var titleLabel = a11yTitle || 'document-update';
  a11yTitle = _react2.default.createElement(_FormattedMessage2.default, { id: titleLabel, defaultMessage: titleLabel });

  return _react2.default.createElement(
    'svg',
    { version: '1.1', viewBox: '0 0 24.0872 24', width: '24px', height: '24px', className: classes, 'aria-labelledby': a11yTitleId },
    _react2.default.createElement(
      'title',
      { id: a11yTitleId },
      a11yTitle
    ),
    _react2.default.createElement(
      'g',
      { id: 'document-update' },
      _react2.default.createElement('rect', { id: '_x2E_svg_285_', x: '0.0872', fill: 'none', width: '24', height: '24' }),
      _react2.default.createElement('polyline', { fill: 'none', stroke: '#000000', strokeWidth: '2', strokeMiterlimit: '10', points: '4.0872,8 4.0872,1 17.0874,1 \r 22.0872,5.9999 22.0872,23 15.0872,23 \t' }),
      _react2.default.createElement('polyline', { fill: 'none', stroke: '#000000', strokeWidth: '2', strokeMiterlimit: '10', points: '16.0872,2 16.0872,7 22.0872,7 \t' }),
      _react2.default.createElement('path', { fill: 'none', stroke: '#000000', strokeWidth: '2', strokeMiterlimit: '10', d: 'M15,16c0,3.866-3.134,7-7,7s-7-3.134-7-7\r s3.134-7,7-7S15,12.134,15,16z M8,20v-6 M11,16l-3-3l-3,3' })
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
  a11yTitleId: 'document-update-title'
};

Icon.icon = true;

Icon.displayName = 'DocumentUpdate';

exports.default = Icon;
module.exports = exports['default'];