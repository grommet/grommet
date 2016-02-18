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

  var classes = (0, _classnames3.default)(CLASS_ROOT, CLASS_ROOT + '-document-powerpoint', className, (_classnames = {}, _defineProperty(_classnames, CLASS_ROOT + '--' + size, size), _defineProperty(_classnames, 'color-index-' + colorIndex, colorIndex), _classnames));

  var titleLabel = a11yTitle || 'document-powerpoint';
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
      { id: 'document-powerpoint' },
      _react2.default.createElement('rect', { id: '_x2E_svg_277_', fill: 'none', width: '24', height: '24' }),
      _react2.default.createElement('polyline', { fill: 'none', stroke: '#000000', strokeWidth: '2', strokeMiterlimit: '10', points: '4.5,9 4.5,1 17.5002,1 22.5,5.9999 \r 22.5,23 3.5,23 \t' }),
      _react2.default.createElement('polyline', { fill: 'none', stroke: '#000000', strokeWidth: '2', strokeMiterlimit: '10', points: '16.5,2 16.5,7 22.5,7 \t' }),
      _react2.default.createElement('path', { fill: 'none', stroke: '#000000', strokeWidth: '2', strokeMiterlimit: '10', d: 'M15.5,7' }),
      _react2.default.createElement(
        'g',
        null,
        _react2.default.createElement('path', { d: 'M3.2898,10.9497H6.967c2.1474,0,3.4459,1.2729,3.4459,3.1117v0.0261c0,2.0822-1.6201,3.1619-3.6385,3.1619H5.2701v2.7003\r H3.2898V10.9497z M6.8385,15.4888c0.9899,0,1.5684-0.592,1.5684-1.3637V14.1c0-0.8875-0.6171-1.3627-1.607-1.3627H5.2701v2.7515\r H6.8385z' })
      )
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
  a11yTitleId: 'document-powerpoint-title'
};

Icon.icon = true;

Icon.displayName = 'DocumentPowerpoint';

exports.default = Icon;
module.exports = exports['default'];