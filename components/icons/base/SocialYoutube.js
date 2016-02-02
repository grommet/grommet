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

  var classes = (0, _classnames3.default)(CLASS_ROOT, CLASS_ROOT + '-social-youtube', className, (_classnames = {}, _defineProperty(_classnames, CLASS_ROOT + '--' + size, size), _defineProperty(_classnames, 'color-index-' + colorIndex, colorIndex), _classnames));

  var titleLabel = a11yTitle || 'social-youtube';
  a11yTitle = _react2.default.createElement(_FormattedMessage2.default, { id: titleLabel, defaultMessage: titleLabel });

  return _react2.default.createElement(
    'svg',
    { version: '1.1', viewBox: '0 0 28 24', width: '24px', height: '24px', className: classes, 'aria-labelledby': a11yTitleId },
    _react2.default.createElement(
      'title',
      { id: a11yTitleId },
      a11yTitle
    ),
    _react2.default.createElement(
      'g',
      { id: 'social-youtube' },
      _react2.default.createElement('rect', { id: '_x2E_svg_310_', x: '2.0013', y: '0', fill: 'none', width: '24', height: '24' }),
      _react2.default.createElement(
        'g',
        { id: 'Lozenge' },
        _react2.default.createElement(
          'g',
          null,
          _react2.default.createElement('path', { d: 'M27.7202,5.8016c0,0-0.2735-1.9302-1.1131-2.7803c-1.0648-1.1155-2.2574-1.1204-2.8043-1.1853\r c-3.9191-0.2839-9.7963-0.2839-9.7963-0.2839h-0.0128c0,0-5.8766,0-9.7955,0.2839c-0.5474,0.0649-1.74,0.0698-2.8048,1.1853\r C0.5537,3.8714,0.2806,5.8016,0.2806,5.8016S0,8.0662,0,10.3326v2.124c0,2.2661,0.2806,4.531,0.2806,4.531\r s0.2731,1.9302,1.1127,2.7803c1.0648,1.1145,2.4637,1.0798,3.087,1.1965C6.7202,21.1783,14,21.2459,14,21.2459\r s5.8837-0.0095,9.8027-0.2927c0.5469-0.0645,1.7395-0.0708,2.8043-1.1853c0.8396-0.8501,1.1131-2.7803,1.1131-2.7803\r S28,14.7227,28,12.4566v-2.124C28,8.0662,27.7202,5.8016,27.7202,5.8016z M10.892,15.2564l-0.0009-8.3179l8,4.1733\r L10.892,15.2564z' })
        )
      )
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
  a11yTitleId: 'social-youtube-title'
};

Icon.icon = true;

exports.default = Icon;
module.exports = exports['default'];