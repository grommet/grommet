'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _CSSClassnames = require('../../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var METER = _CSSClassnames2.default.METER;

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians)
  };
}

exports.default = {

  baseUnit: 24,
  baseDimension: 192, // 24 * 8

  classRoot: METER,

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
    // handle that we can't draw a complete circle
    if (endAngle - startAngle >= 360) {
      endAngle = startAngle + 359.99;
    }
    var start = polarToCartesian(centerX, centerY, radius, endAngle);
    var end = polarToCartesian(centerX, centerY, radius, startAngle);
    var arcSweep = endAngle - startAngle <= 180 ? "0" : "1";
    var d = ["M", start.x, start.y, "A", radius, radius, 0, arcSweep, 0, end.x, end.y].join(" ");
    return d;
  },

  translateEndAngle: function translateEndAngle(startAngle, anglePer, value) {
    return Math.min(360, Math.max(0, startAngle + anglePer * value));
  },

  buildPath: function buildPath(itemIndex, commands, classes, onActivate, onClick, a11yDescId, a11yTitle, activeMeterSlice) {
    if (onActivate) {
      var onOver = onActivate.bind(null, itemIndex);
      var onOut = onActivate.bind(null, null);

      var a11yRoles = {};
      var titleComponent = void 0;
      var activeSlice = void 0;
      if (a11yTitle && a11yDescId) {
        activeSlice = activeMeterSlice;
        var pathTitleId = 'title_' + a11yDescId;
        a11yRoles['aria-labelledby'] = pathTitleId;
        a11yRoles.id = a11yDescId;
        a11yRoles.role = 'tab';
        titleComponent = _react2.default.createElement(
          'title',
          { id: pathTitleId },
          a11yTitle
        );
      }

      return _react2.default.createElement(
        'g',
        (0, _extends3.default)({ key: itemIndex, ref: a11yDescId }, a11yRoles),
        titleComponent,
        _react2.default.createElement('path', { ref: activeSlice, className: classes.join(' '), d: commands,
          onFocus: onOver, onBlur: onOut, 'data-index': itemIndex,
          onMouseOver: onOver, onMouseOut: onOut,
          onClick: onClick })
      );
    } else {
      return _react2.default.createElement('path', { key: itemIndex, className: classes.join(' '), d: commands });
    }
  }
};
module.exports = exports['default'];