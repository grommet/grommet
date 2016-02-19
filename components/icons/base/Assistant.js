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

  var classes = (0, _classnames3.default)(CLASS_ROOT, CLASS_ROOT + '-assistant', className, (_classnames = {}, _defineProperty(_classnames, CLASS_ROOT + '--' + size, size), _defineProperty(_classnames, 'color-index-' + colorIndex, colorIndex), _classnames));

  var titleLabel = a11yTitle || 'assistant';
  a11yTitle = _react2.default.createElement(_FormattedMessage2.default, { id: titleLabel, defaultMessage: titleLabel });

  return _react2.default.createElement(
    'svg',
    { version: '1.1', viewBox: '0 0 24 25.5', width: '24px', height: '24px', className: classes, 'aria-labelledby': a11yTitleId },
    _react2.default.createElement(
      'title',
      { id: a11yTitleId },
      a11yTitle
    ),
    _react2.default.createElement(
      'g',
      { id: 'assistant' },
      _react2.default.createElement('rect', { id: '_x2E_svg_246_', y: '0', fill: 'none', width: '24', height: '24' }),
      _react2.default.createElement('path', { d: 'M9.1397,13.5h-1c-0.5523,0-1-0.4477-1-1v-1c0-0.5523,0.4477-1,1-1h1c0.5523,0,1,0.4477,1,1v1\r C10.1397,13.0523,9.692,13.5,9.1397,13.5z' }),
      _react2.default.createElement('path', { d: 'M16.1397,13.5h-1c-0.5523,0-1-0.4477-1-1v-1c0-0.5523,0.4477-1,1-1h1c0.5523,0,1,0.4477,1,1v1\r C17.1397,13.0523,16.692,13.5,16.1397,13.5z' }),
      _react2.default.createElement('circle', { cx: '12.0981', cy: '2.5417', r: '2.0417' }),
      _react2.default.createElement('path', { fill: 'none', stroke: '#000000', strokeWidth: '2', strokeMiterlimit: '10', d: 'M20.1397,18.5c-1.3553,0.71-4.1967,1.9688-8,1.9688\r c-1.53,0-4.631-0.2037-8-1.9688c0-2.3333,0-1.6667,0-4c0-4.4183,3.5817-8,8-8h0c4.4183,0,8,3.5817,8,8V18.5z M12.1397,6.5v-4\r M4.1702,13.7989c0,2.15,4.4695,2.7011,7.9695,2.7011 M12.1397,16.5c3.5,0,7.9677-0.5633,7.9677-2.7133 M8.1397,20.5\r c0,2.21,1.79,4,4,4s4-1.79,4-4' })
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
  a11yTitleId: 'assistant-title'
};

Icon.icon = true;

exports.default = Icon;
module.exports = exports['default'];