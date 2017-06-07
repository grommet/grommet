'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _Graphics = require('../../utils/Graphics');

var _CSSClassnames = require('../../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

var _utils = require('./utils');

var _Graphic2 = require('./Graphic');

var _Graphic3 = _interopRequireDefault(_Graphic2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.METER;

var SPIRAL_WIDTH = _utils.baseDimension;
var SPIRAL_RADIUS = _utils.baseDimension / 2 - _Graphics.baseUnit / 2;
var RING_THICKNESS = _Graphics.baseUnit;
// Allow for active value content next to a spiral meter

var Spiral = function (_Graphic) {
  _inherits(Spiral, _Graphic);

  function Spiral(props, context) {
    _classCallCheck(this, Spiral);

    //needed in Graphic.js to fix minification issues
    var _this = _possibleConstructorReturn(this, (Spiral.__proto__ || Object.getPrototypeOf(Spiral)).call(this, props, context));

    _this.displayName = 'Spiral';
    return _this;
  }

  _createClass(Spiral, [{
    key: '_stateFromProps',
    value: function _stateFromProps(props) {
      var viewBoxHeight = Math.max(SPIRAL_WIDTH, RING_THICKNESS * (props.series.length + 1) * 2);
      var viewBoxWidth = viewBoxHeight;

      var state = {
        startAngle: 0,
        anglePer: 270.0 / props.max,
        angleOffset: 180,
        // The last spiral ends out near but not quite at the edge of the
        // view box.
        startRadius: Math.max(SPIRAL_RADIUS, RING_THICKNESS * (props.series.length + 0.5)) - Math.max(0, props.series.length - 1) * RING_THICKNESS,
        viewBoxHeight: viewBoxHeight,
        viewBoxRadius: viewBoxWidth / 2,
        viewBoxWidth: viewBoxWidth
      };

      return state;
    }
  }, {
    key: '_sliceCommands',
    value: function _sliceCommands(trackIndex, item, startValue) {
      var viewBoxRadius = this.state.viewBoxRadius;

      var startAngle = (0, _Graphics.translateEndAngle)(this.state.startAngle, this.state.anglePer, startValue);
      var endAngle = (0, _Graphics.translateEndAngle)(startAngle, this.state.anglePer, item.value);
      var radius = Math.min(viewBoxRadius, this.state.startRadius + trackIndex * RING_THICKNESS);
      return (0, _Graphics.arcCommands)(viewBoxRadius, viewBoxRadius, radius, startAngle + this.state.angleOffset, endAngle + this.state.angleOffset);
    }
  }, {
    key: '_renderThresholds',
    value: function _renderThresholds() {
      return undefined;
    }
  }, {
    key: '_renderTopLayer',
    value: function _renderTopLayer() {
      var _this2 = this;

      var _props = this.props,
          activeIndex = _props.activeIndex,
          onActivate = _props.onActivate;
      var viewBoxRadius = this.state.viewBoxRadius;

      var x = viewBoxRadius + RING_THICKNESS * 0.5;
      var y = viewBoxRadius + RING_THICKNESS * 1.75;
      var labels = this.props.series.map(function (item, index) {
        var classes = (0, _classnames3.default)(CLASS_ROOT + '__label', _defineProperty({}, CLASS_ROOT + '__label--active', index === activeIndex));

        var textX = x;
        var textY = y;

        y += RING_THICKNESS;

        var hoverEvents = void 0;
        if (onActivate) {
          hoverEvents = {
            onMouseOver: _this2.props.onActivate.bind(null, index),
            onMouseOut: _this2.props.onActivate.bind(null, null)
          };
        }

        return _react2.default.createElement(
          'text',
          _extends({ key: item.label || index, x: textX, y: textY,
            textAnchor: 'start', fontSize: 16,
            className: classes,
            onClick: item.onClick }, hoverEvents),
          item.label
        );
      });

      return _react2.default.createElement(
        'g',
        { className: CLASS_ROOT + "__labels" },
        labels
      );
    }
  }]);

  return Spiral;
}(_Graphic3.default);

exports.default = Spiral;


Spiral.defaultProps = {
  thresholds: []
};

//needed in Graphic.js to fix minification issues
Spiral.displayName = 'Spiral';
module.exports = exports['default'];