'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

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

// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.METER;

var SPIRAL_WIDTH = _utils.baseDimension;
var SPIRAL_RADIUS = _utils.baseDimension / 2 - _Graphics.baseUnit / 2;
var RING_THICKNESS = _Graphics.baseUnit;
// Allow for active value content next to a spiral meter

var Spiral = function (_Graphic) {
  (0, _inherits3.default)(Spiral, _Graphic);

  function Spiral(props, context) {
    (0, _classCallCheck3.default)(this, Spiral);

    //needed in Graphic.js to fix minification issues
    var _this = (0, _possibleConstructorReturn3.default)(this, (Spiral.__proto__ || (0, _getPrototypeOf2.default)(Spiral)).call(this, props, context));

    _this.displayName = 'Spiral';
    return _this;
  }

  (0, _createClass3.default)(Spiral, [{
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

      var activeIndex = this.props.activeIndex;
      var viewBoxRadius = this.state.viewBoxRadius;

      var x = viewBoxRadius + RING_THICKNESS * 0.5;
      var y = viewBoxRadius + RING_THICKNESS * 1.75;
      var labels = this.props.series.map(function (item, index) {
        var classes = (0, _classnames3.default)(CLASS_ROOT + '__label', (0, _defineProperty3.default)({}, CLASS_ROOT + '__label--active', index === activeIndex));

        var textX = x;
        var textY = y;

        y += RING_THICKNESS;

        return _react2.default.createElement(
          'text',
          { key: item.label || index, x: textX, y: textY,
            textAnchor: 'start', fontSize: 16,
            className: classes,
            onMouseOver: _this2.props.onActivate.bind(null, index),
            onMouseOut: _this2.props.onActivate.bind(null, null),
            onClick: item.onClick },
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