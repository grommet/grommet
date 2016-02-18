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

  var classes = (0, _classnames3.default)(CLASS_ROOT, CLASS_ROOT + '-social-instagram', className, (_classnames = {}, _defineProperty(_classnames, CLASS_ROOT + '--' + size, size), _defineProperty(_classnames, 'color-index-' + colorIndex, colorIndex), _classnames));

  var titleLabel = a11yTitle || 'social-instagram';
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
      { id: 'social-instagram' },
      _react2.default.createElement('rect', { id: '_x2E_svg_305_', x: '0', y: '0', fill: 'none', width: '24', height: '24' }),
      _react2.default.createElement('path', { fillRule: 'evenodd', clipRule: 'evenodd', fill: 'none', stroke: '#000000', strokeWidth: '2', strokeMiterlimit: '10', d: 'M20,22H4\r c-1.1046,0-2-0.8954-2-2V4c0-1.1046,0.8954-2,2-2h16c1.1046,0,2,0.8954,2,2v16C22,21.1046,21.1046,22,20,22z' }),
      _react2.default.createElement('path', { fillRule: 'evenodd', clipRule: 'evenodd', d: 'M22,10H2V4c0-1.1046,0.8954-2,2-2h16c1.1046,0,2,0.8954,2,2V10z' }),
      _react2.default.createElement('path', { fillRule: 'evenodd', clipRule: 'evenodd', fill: '#FFFFFF', d: 'M19.5,7.399h-2c-0.5523,0-1-0.4477-1-1v-2c0-0.5523,0.4477-1,1-1\r h2c0.5523,0,1,0.4477,1,1v2C20.5,6.9513,20.0523,7.399,19.5,7.399z' }),
      _react2.default.createElement('circle', { fillRule: 'evenodd', clipRule: 'evenodd', fill: '#FFFFFF', stroke: '#000000', strokeWidth: '2', strokeMiterlimit: '10', cx: '12', cy: '12', r: '5' })
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
  a11yTitleId: 'social-instagram-title'
};

Icon.icon = true;

Icon.displayName = 'SocialInstagram';

exports.default = Icon;
module.exports = exports['default'];