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

  var classes = (0, _classnames3.default)(CLASS_ROOT, CLASS_ROOT + '-social-vimeo', className, (_classnames = {}, _defineProperty(_classnames, CLASS_ROOT + '--' + size, size), _defineProperty(_classnames, 'color-index-' + colorIndex, colorIndex), _classnames));

  var titleLabel = a11yTitle || 'social-vimeo';
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
      { id: 'social-vimeo' },
      _react2.default.createElement('rect', { id: '_x2E_svg_311_', x: '0', y: '0', fill: 'none', width: '24', height: '24' }),
      _react2.default.createElement('path', { d: 'M20.1611,6.6903c-0.48,2.8577-1.7372,5.528-3.7716,8.0108c-2.0115,2.4595-3.8402,4.2631-5.486,5.4108\r c-0.96,0.4919-1.8058,0.5036-2.5373,0.0351c-0.7086-0.445-1.2686-1.0892-1.6801-1.9324c-0.2286-0.445-0.7943-2.2545-1.6972-5.4284\r S3.5432,7.9083,3.3603,7.6741C3.2003,7.3696,2.8289,7.3579,2.246,7.639C1.6631,7.92,1.2688,8.166,1.0631,8.3768L0.2745,7.3227\r l0.8915-1.0892c0.7086-0.773,1.5429-1.5401,2.503-2.3014s1.8172-1.2239,2.5715-1.3878c1.0058-0.2108,1.7487,0.2928,2.2287,1.5108\r C8.7663,4.7579,9.052,6.0227,9.3263,7.8498C9.372,8.2011,9.4978,8.7984,9.7035,9.6417c0.6629,2.8342,1.1886,4.2514,1.5772,4.2514\r c0.5715,0,1.5086-1.2649,2.8116-3.7946c0.5943-1.1478,0.6286-2.0964,0.1029-2.846c-0.5257-0.7496-1.3486-0.7613-2.4687-0.0351\r c0.1829-1.1712,0.6743-2.1667,1.4744-2.9865c1.4858-1.6162,3.0973-2.2135,4.8345-1.7919\r C19.864,2.7903,20.5726,4.2074,20.1611,6.6903L20.1611,6.6903z' })
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
  a11yTitleId: 'social-vimeo-title'
};

Icon.icon = true;

exports.default = Icon;
module.exports = exports['default'];