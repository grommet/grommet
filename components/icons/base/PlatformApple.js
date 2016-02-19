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

  var classes = (0, _classnames3.default)(CLASS_ROOT, CLASS_ROOT + '-platform-apple', className, (_classnames = {}, _defineProperty(_classnames, CLASS_ROOT + '--' + size, size), _defineProperty(_classnames, 'color-index-' + colorIndex, colorIndex), _classnames));

  var titleLabel = a11yTitle || 'platform-apple';
  a11yTitle = _react2.default.createElement(_FormattedMessage2.default, { id: titleLabel, defaultMessage: titleLabel });

  return _react2.default.createElement(
    'svg',
    { version: '1.1', viewBox: '0 0 24 24.0009', width: '24px', height: '24px', className: classes, 'aria-labelledby': a11yTitleId },
    _react2.default.createElement(
      'title',
      { id: a11yTitleId },
      a11yTitle
    ),
    _react2.default.createElement(
      'g',
      { id: 'platform-apple' },
      _react2.default.createElement('rect', { id: '_x2E_svg_303_', x: '0', y: '0.0009', fill: 'none', width: '24', height: '24' }),
      _react2.default.createElement('path', { d: 'M18.5499,12.7504c0.0337,3.632,3.1862,4.8406,3.2211,4.856c-0.0267,0.0852-0.5037,1.7224-1.6609,3.4135\r c-1.0003,1.462-2.0385,2.9187-3.674,2.9489c-1.607,0.0296-2.1237-0.953-3.961-0.953c-1.8367,0-2.4108,0.9228-3.932,0.9826\r c-1.5786,0.0597-2.7807-1.581-3.7894-3.0377c-2.061-2.9797-3.636-8.4198-1.5212-12.092c1.0506-1.8236,2.9282-2.9784,4.9661-3.008\r c1.5502-0.0296,3.0134,1.0429,3.961,1.0429c0.947,0,2.7251-1.2897,4.5943-1.1003c0.7825,0.0326,2.9791,0.3161,4.3895,2.3807\r C21.0299,8.2544,18.5226,9.714,18.5499,12.7504 M15.5297,3.832C16.3678,2.8175,16.9319,1.4052,16.778,0\r c-1.2081,0.0486-2.6689,0.805-3.5354,1.819c-0.7766,0.8979-1.4567,2.335-1.2732,3.7124C13.316,5.6355,14.6916,4.8471,15.5297,3.832\r ' })
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
  a11yTitleId: 'platform-apple-title'
};

Icon.icon = true;

exports.default = Icon;
module.exports = exports['default'];