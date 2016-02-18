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

  var classes = (0, _classnames3.default)(CLASS_ROOT, CLASS_ROOT + '-launch', className, (_classnames = {}, _defineProperty(_classnames, CLASS_ROOT + '--' + size, size), _defineProperty(_classnames, 'color-index-' + colorIndex, colorIndex), _classnames));

  var titleLabel = a11yTitle || 'launch';
  a11yTitle = _react2.default.createElement(_FormattedMessage2.default, { id: titleLabel, defaultMessage: titleLabel });

  return _react2.default.createElement(
    'svg',
    { version: '1.1', viewBox: '0 0 24 25.1473', width: '24px', height: '24px', className: classes, 'aria-labelledby': a11yTitleId },
    _react2.default.createElement(
      'title',
      { id: a11yTitleId },
      a11yTitle
    ),
    _react2.default.createElement(
      'g',
      { id: 'launch' },
      _react2.default.createElement('rect', { id: '_x2E_svg_209_', x: '0', y: '0', fill: 'none', width: '24', height: '24' }),
      _react2.default.createElement('circle', { cx: '12', cy: '9', r: '2' }),
      _react2.default.createElement('path', { fill: 'none', stroke: '#000000', strokeWidth: '2', strokeMiterlimit: '10', d: 'M19.1848,17.4137\r C19.8089,18.0219,20,18.8468,20,19.707v3.6281c0,0.6476-0.581,0.8821-1.1339,0.5229l-2.7003-2.0099\r C15.6193,21.493,14.977,21,14.3201,21H12H9.6799c-0.6569,0-1.2195,0.493-1.7661,0.8481l-2.78,2.1616\r C4.581,24.369,4,23.9827,4,23.3351V19.707c0-0.8602,0.1911-1.6851,0.8152-2.2933l2.3703-2.4657\r c-0.1076-1.1416-0.1768-2.4289-0.1768-3.8817C7.0086,3.8449,12,2.1473,12,2.1473s4.9914,1.6976,4.9914,8.919\r c0,1.4528-0.0693,2.7401-0.1768,3.8817L19.1848,17.4137z M8,21l2,3h4l2-3' })
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
  a11yTitleId: 'launch-title'
};

Icon.icon = true;

Icon.displayName = 'Launch';

exports.default = Icon;
module.exports = exports['default'];