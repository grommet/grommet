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

  var classes = (0, _classnames3.default)(CLASS_ROOT, CLASS_ROOT + '-star-half', className, (_classnames = {}, _defineProperty(_classnames, CLASS_ROOT + '--' + size, size), _defineProperty(_classnames, 'color-index-' + colorIndex, colorIndex), _classnames));

  var titleLabel = a11yTitle || 'star-half';
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
      { id: 'star-half' },
      _react2.default.createElement('rect', { id: '_x2E_svg_263_', y: '0', fill: 'none', width: '24', height: '24' }),
      _react2.default.createElement(
        'g',
        null,
        _react2.default.createElement('path', { d: 'M12,4.4721l2.2112,4.4223L14.7639,10H16h3.3418l-2.7919,2.9393l-0.7563,0.7962l0.2659,1.0654l1.2409,4.9725\r l-4.2639-2.5836L12,16.5618l-1.0364,0.628l-4.2639,2.5836l1.2409-4.9725l0.2659-1.0654l-0.7563-0.7962L4.6582,10H8h1.2361\r l0.5528-1.1056L12,4.4721 M12,0L8,8H0l6,6.3167L3.5836,24L12,18.9003L20.4164,24L18,14.3167L24,8h-8L12,0L12,0z' })
      ),
      _react2.default.createElement('polygon', { points: '12,18.9003 3.5836,24 6,14.3167 0,8 8,8 12,0 \t' })
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
  a11yTitleId: 'star-half-title'
};

Icon.icon = true;

Icon.displayName = 'StarHalf';

exports.default = Icon;
module.exports = exports['default'];