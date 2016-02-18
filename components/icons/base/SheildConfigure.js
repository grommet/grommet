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

  var classes = (0, _classnames3.default)(CLASS_ROOT, CLASS_ROOT + '-sheild-configure', className, (_classnames = {}, _defineProperty(_classnames, CLASS_ROOT + '--' + size, size), _defineProperty(_classnames, 'color-index-' + colorIndex, colorIndex), _classnames));

  var titleLabel = a11yTitle || 'sheild-configure';
  a11yTitle = _react2.default.createElement(_FormattedMessage2.default, { id: titleLabel, defaultMessage: titleLabel });

  return _react2.default.createElement(
    'svg',
    { version: '1.1', viewBox: '0 0 24 24.1389', width: '24px', height: '24px', className: classes, 'aria-labelledby': a11yTitleId },
    _react2.default.createElement(
      'title',
      { id: a11yTitleId },
      a11yTitle
    ),
    _react2.default.createElement(
      'g',
      { id: 'sheild-configure' },
      _react2.default.createElement('rect', { id: '_x2E_svg_221_', x: '0', y: '0', fill: 'none', width: '24', height: '24' }),
      _react2.default.createElement('path', { fill: 'none', stroke: '#000000', strokeWidth: '2', strokeMiterlimit: '10', d: 'M12.0002,14.15c-1.6545,0-3-1.3458-3-3\r s1.3455-3,3-3s3,1.3458,3,3S13.6547,14.15,12.0002,14.15z M18.0002,11.15l-3,0.0001 M16.2428,15.3926l-2.1214-2.1212 M12,14.15\r l0.0001,3 M9.8787,13.2712l-2.1212,2.1214 M6.0002,11.15h3 M9.8788,9.0287L7.7575,6.9074 M12.0002,8.15v-3 M14.1215,9.0287\r l2.1213-2.1213 M12.0002,1.15l-9,4.4v2.864c0,4.2846,1.8322,8.3646,5.0345,11.2111l3.9655,3.2249l3.9655-3.2249\r c3.2023-2.8465,5.0345-6.9266,5.0345-11.2111V5.55L12.0002,1.15z' })
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
  a11yTitleId: 'sheild-configure-title'
};

Icon.icon = true;

Icon.displayName = 'SheildConfigure';

exports.default = Icon;
module.exports = exports['default'];