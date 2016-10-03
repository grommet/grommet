'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _Graphics = require('../../utils/Graphics');

var _CSSClassnames = require('../../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

var _utils = require('./utils');

var _Graphic2 = require('./Graphic');

var _Graphic3 = _interopRequireDefault(_Graphic2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CLASS_ROOT = _CSSClassnames2.default.METER; // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var COLOR_INDEX = _CSSClassnames2.default.COLOR_INDEX;

var ARC_WIDTH = _utils.baseDimension;
var ARC_HEIGHT = Math.round(_utils.baseDimension * 0.75);
var ARC_RADIUS = _utils.baseDimension / 2 - _Graphics.baseUnit / 2;
var INDICATOR_HUB_RADIUS = _Graphics.baseUnit / 4;
var RING_THICKNESS = _Graphics.baseUnit;

function singleIndicatorCommands(centerX, centerY, radius, startAngle, endAngle, length) {
  var point = (0, _Graphics.polarToCartesian)(centerX, centerY, radius - (length - INDICATOR_HUB_RADIUS), endAngle - 1);
  var start = (0, _Graphics.polarToCartesian)(centerX, centerY, radius, endAngle - 1);
  var d = ["M", centerX, centerY - INDICATOR_HUB_RADIUS, "A", INDICATOR_HUB_RADIUS, INDICATOR_HUB_RADIUS, 0, 1, 1, centerX, centerY + INDICATOR_HUB_RADIUS, "A", INDICATOR_HUB_RADIUS, INDICATOR_HUB_RADIUS, 0, 1, 1, centerX, centerY - INDICATOR_HUB_RADIUS, "M", point.x, point.y, "L", start.x, start.y].join(" ");
  return d;
}

var Arc = function (_Graphic) {
  (0, _inherits3.default)(Arc, _Graphic);

  function Arc(props, context) {
    (0, _classCallCheck3.default)(this, Arc);

    //needed in Graphic.js to fix minification issues
    var _this = (0, _possibleConstructorReturn3.default)(this, (Arc.__proto__ || (0, _getPrototypeOf2.default)(Arc)).call(this, props, context));

    _this.displayName = 'Arc';
    return _this;
  }

  (0, _createClass3.default)(Arc, [{
    key: '_viewBoxDimensions',
    value: function _viewBoxDimensions(props) {
      var viewBoxWidth;
      var viewBoxHeight;
      if (props.vertical) {
        viewBoxWidth = ARC_HEIGHT;
        viewBoxHeight = ARC_WIDTH;
      } else {
        viewBoxWidth = ARC_WIDTH;
        viewBoxHeight = ARC_HEIGHT;
      }
      return [viewBoxWidth, viewBoxHeight];
    }
  }, {
    key: '_stateFromProps',
    value: function _stateFromProps(props) {
      var viewBoxDimensions = this._viewBoxDimensions(props);

      var state = {
        startAngle: 60,
        anglePer: !props.max ? 0 : 240.0 / (props.max - props.min),
        angleOffset: 180,
        viewBoxWidth: viewBoxDimensions[0],
        viewBoxHeight: viewBoxDimensions[1]
      };
      if (props.vertical) {
        state.angleOffset = 90;
      } else {
        state.angleOffset = 180;
      }

      return state;
    }
  }, {
    key: '_sliceCommands',
    value: function _sliceCommands(trackIndex, item, startValue) {
      var startAngle = (0, _Graphics.translateEndAngle)(this.state.startAngle, this.state.anglePer, startValue);
      var endAngle = Math.max(startAngle + (item.value > 0 ? RING_THICKNESS / 2 : 0), (0, _Graphics.translateEndAngle)(startAngle, this.state.anglePer, item.value));
      var radius = Math.max(1, ARC_RADIUS - trackIndex * RING_THICKNESS);
      return (0, _Graphics.arcCommands)(ARC_WIDTH / 2, ARC_WIDTH / 2, radius, startAngle + this.state.angleOffset, endAngle + this.state.angleOffset);
    }
  }, {
    key: '_renderTopLayer',
    value: function _renderTopLayer() {
      var indicator;
      if (this.props.series.length === 1) {
        var item = this.props.series[0];
        var startAngle = this.state.startAngle;
        var endAngle = (0, _Graphics.translateEndAngle)(startAngle, this.state.anglePer, item.value);
        var length = ARC_RADIUS;
        var x = ARC_WIDTH / 2;
        var y = ARC_WIDTH / 2;
        var indicatorCommands = singleIndicatorCommands(x, y, ARC_RADIUS, startAngle + this.state.angleOffset, endAngle + this.state.angleOffset, length);
        indicator = _react2.default.createElement('path', { fill: 'none',
          className: CLASS_ROOT + '__slice-indicator ' + (COLOR_INDEX + '-' + item.colorIndex),
          d: indicatorCommands });
      }

      return indicator;
    }
  }]);
  return Arc;
}(_Graphic3.default);

exports.default = Arc;
module.exports = exports['default'];