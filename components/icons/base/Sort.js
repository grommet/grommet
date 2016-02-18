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

  var classes = (0, _classnames3.default)(CLASS_ROOT, CLASS_ROOT + '-sort', className, (_classnames = {}, _defineProperty(_classnames, CLASS_ROOT + '--' + size, size), _defineProperty(_classnames, 'color-index-' + colorIndex, colorIndex), _classnames));

  var titleLabel = a11yTitle || 'sort';
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
      { id: 'sort' },
      _react2.default.createElement('rect', { id: '_x2E_svg_248_', y: '0', fill: 'none', width: '24', height: '24' }),
      _react2.default.createElement('line', { fill: 'none', stroke: '#000000', strokeWidth: '2', strokeMiterlimit: '10', x1: '6', y1: '3.5', x2: '22', y2: '3.5' }),
      _react2.default.createElement('line', { fill: 'none', stroke: '#000000', strokeWidth: '2', strokeMiterlimit: '10', x1: '6', y1: '9.5', x2: '20', y2: '9.5' }),
      _react2.default.createElement('rect', { y: '1.5', width: '4', height: '4' }),
      _react2.default.createElement('line', { fill: 'none', stroke: '#000000', strokeWidth: '2', strokeMiterlimit: '10', x1: '6', y1: '15.5', x2: '18', y2: '15.5' }),
      _react2.default.createElement('rect', { y: '13.5', width: '4', height: '4' }),
      _react2.default.createElement('line', { fill: 'none', stroke: '#000000', strokeWidth: '2', strokeMiterlimit: '10', x1: '6', y1: '21.5', x2: '16', y2: '21.5' }),
      _react2.default.createElement('rect', { y: '19.5', width: '4', height: '4' }),
      _react2.default.createElement('rect', { y: '7.5', width: '4', height: '4' })
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
  a11yTitleId: 'sort-title'
};

Icon.icon = true;

Icon.displayName = 'Sort';

exports.default = Icon;
module.exports = exports['default'];