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

  var classes = (0, _classnames3.default)(CLASS_ROOT, CLASS_ROOT + '-article', className, (_classnames = {}, _defineProperty(_classnames, CLASS_ROOT + '--' + size, size), _defineProperty(_classnames, 'color-index-' + colorIndex, colorIndex), _classnames));

  var titleLabel = a11yTitle || 'article';
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
      { id: 'article' },
      _react2.default.createElement('rect', { id: '_x2E_svg_242_', y: '0', fill: 'none', width: '24', height: '24' }),
      _react2.default.createElement('path', { fill: 'none', stroke: '#000000', strokeWidth: '2', strokeMiterlimit: '10', d: 'M6,17.5C6,18.8807,4.8807,20,3.5,20\r S1,18.8807,1,17.5V6h5C6,6,6,17.4062,6,17.5z M4,20h16.5c1.3807,0,2.5-1.1193,2.5-2.5V2H6v4' }),
      _react2.default.createElement('rect', { x: '15', y: '5', width: '5', height: '6' }),
      _react2.default.createElement('line', { fill: 'none', stroke: '#000000', strokeWidth: '2', strokeMiterlimit: '10', x1: '9', y1: '6', x2: '13', y2: '6' }),
      _react2.default.createElement('line', { fill: 'none', stroke: '#000000', strokeWidth: '2', strokeMiterlimit: '10', x1: '9', y1: '10', x2: '13', y2: '10' }),
      _react2.default.createElement('line', { fill: 'none', stroke: '#000000', strokeWidth: '2', strokeMiterlimit: '10', x1: '9', y1: '14', x2: '20', y2: '14' })
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
  a11yTitleId: 'article-title'
};

Icon.icon = true;

Icon.displayName = 'Article';

exports.default = Icon;
module.exports = exports['default'];