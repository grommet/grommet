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

  var classes = (0, _classnames3.default)(CLASS_ROOT, CLASS_ROOT + '-fan', className, (_classnames = {}, _defineProperty(_classnames, CLASS_ROOT + '--' + size, size), _defineProperty(_classnames, 'color-index-' + colorIndex, colorIndex), _classnames));

  var titleLabel = a11yTitle || 'fan';
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
      { id: 'fan' },
      _react2.default.createElement('rect', { id: '_x2E_svg_203_', x: '0', y: '0', fill: 'none', width: '24', height: '24' }),
      _react2.default.createElement('path', { fill: 'none', stroke: '#000000', strokeWidth: '2', strokeMiterlimit: '10', d: 'M12.0004,17c-2.2061,0-4-1.7944-4-4s1.7939-4,4-4\r s4,1.7944,4,4S14.2064,17,12.0004,17z M14.7404,10.09c0.5-1.82,1.01-3.64,1.51-5.46c0.32-1.15-0.46-2.31-1.73-2.6\r c-0.7-0.17-1.51-0.28-2.42-0.29c-1.03-0.01-1.96,0.12-2.73,0.32c-1.22,0.29-1.93,1.45-1.62,2.57l1.51,5.46 M13.1304,16.84\r c1.33,1.35,2.68,2.72,4.02,4.08c0.84,0.85,2.24,0.76,3.13-0.2c0.49-0.52,1-1.17,1.46-1.95c0.52-0.89,0.86-1.76,1.09-2.52\r c0.35-1.21-0.31-2.4-1.43-2.69l-5.5-1.43 M8.1004,12.13c-1.83,0.47-3.66,0.95-5.5,1.42c-1.16,0.31-1.78,1.56-1.4,2.82\r c0.21,0.68,0.52,1.44,0.96,2.23c0.51,0.9,1.09,1.63,1.64,2.2c0.88,0.92,2.23,0.95,3.04,0.12l4.03-4.08' })
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
  a11yTitleId: 'fan-title'
};

Icon.icon = true;

Icon.displayName = 'Fan';

exports.default = Icon;
module.exports = exports['default'];