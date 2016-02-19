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

  var classes = (0, _classnames3.default)(CLASS_ROOT, CLASS_ROOT + '-social-medium', className, (_classnames = {}, _defineProperty(_classnames, CLASS_ROOT + '--' + size, size), _defineProperty(_classnames, 'color-index-' + colorIndex, colorIndex), _classnames));

  var titleLabel = a11yTitle || 'social-medium';
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
      { id: 'social-medium', transform: 'matrix(1.3333333,0,0,-1.3333333,0,126.66667)' },
      _react2.default.createElement('rect', { id: '_x2E_svg_296_', x: '-3', y: '74', fill: 'none', width: '24', height: '24' }),
      _react2.default.createElement(
        'g',
        { id: 'g12', transform: 'scale(0.1)' },
        _react2.default.createElement('path', { id: 'path14', d: 'M180,906.9011h-7.119c-2.643,0-6.381-3.8127-6.381-6.2537v-88.4714c0-2.444,3.738-5.775,6.381-5.775H180v-21\r h-64.5v21H129v93.0001h-0.6615L96.8133,785.4011H72.4061L41.2875,899.4011H40.5v-93.0001H54v-21H0v21h6.9147\r c2.8476,0,6.5853,3.3311,6.5853,5.775v88.4714c0,2.4409-3.7377,6.2537-6.5853,6.2537H0v21h67.5246l22.1696-82.5h0.6099\r l22.3746,82.5H180V906.9011' })
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
  a11yTitleId: 'social-medium-title'
};

Icon.icon = true;

exports.default = Icon;
module.exports = exports['default'];