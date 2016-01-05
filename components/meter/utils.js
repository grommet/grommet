'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians)
  };
} // (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

exports.default = {

  baseUnit: 24,
  baseDimension: 192, // 24 * 8

  classRoot: 'meter',

  propTypes: {
    activeIndex: _react.PropTypes.number,
    a11yDesc: _react.PropTypes.string,
    a11yDescId: _react.PropTypes.string,
    a11yTitle: _react.PropTypes.string,
    a11yTitleId: _react.PropTypes.string,
    max: _react.PropTypes.shape({
      value: _react.PropTypes.number,
      label: _react.PropTypes.string
    }).isRequired,
    min: _react.PropTypes.shape({
      value: _react.PropTypes.number,
      label: _react.PropTypes.string
    }).isRequired,
    onActivate: _react.PropTypes.func.isRequired,
    // size: PropTypes.oneOf(['small', 'medium', 'large']).isRequired,
    series: _react.PropTypes.arrayOf(_react.PropTypes.shape({
      label: _react.PropTypes.string,
      value: _react.PropTypes.number.isRequired,
      colorIndex: _react.PropTypes.string,
      important: _react.PropTypes.bool,
      onClick: _react.PropTypes.func
    })).isRequired,
    total: _react.PropTypes.number.isRequired,
    units: _react.PropTypes.string
  },

  polarToCartesian: polarToCartesian,

  arcCommands: function arcCommands(centerX, centerY, radius, startAngle, endAngle) {
    var start = polarToCartesian(centerX, centerY, radius, endAngle);
    var end = polarToCartesian(centerX, centerY, radius, startAngle);
    var arcSweep = endAngle - startAngle <= 180 ? "0" : "1";
    var d = ["M", start.x, start.y, "A", radius, radius, 0, arcSweep, 0, end.x, end.y].join(" ");
    return d;
  },

  translateEndAngle: function translateEndAngle(startAngle, anglePer, value) {
    return Math.min(360, Math.max(0, startAngle + anglePer * value));
  },

  buildPath: function buildPath(itemIndex, commands, classes, onActivate, onClick, a11yDescId, a11yTitle) {
    if (onActivate) {
      var onOver = onActivate.bind(null, itemIndex);
      var onOut = onActivate.bind(null, null);

      var pathTitleId = 'title_' + a11yDescId;

      return _react2.default.createElement(
        'g',
        { key: itemIndex, id: a11yDescId, ref: a11yDescId,
          role: 'gridcell', 'aria-labelledby': pathTitleId },
        _react2.default.createElement(
          'title',
          { id: pathTitleId },
          a11yTitle
        ),
        _react2.default.createElement('path', { className: classes.join(' '), d: commands,
          onFocus: onOver, onBlur: onOut,
          onMouseOver: onOver, onMouseOut: onOut,
          onClick: onClick })
      );
    } else {
      return _react2.default.createElement('path', { key: itemIndex, className: classes.join(' '), d: commands });
    }
  }
};