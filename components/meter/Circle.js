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

var _utils = require('./utils');

var _Graphic2 = require('./Graphic');

var _Graphic3 = _interopRequireDefault(_Graphic2);

var _Graphics = require('../../utils/Graphics');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CIRCLE_WIDTH = _utils.baseDimension; // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var CIRCLE_RADIUS = _utils.baseDimension / 2 - _Graphics.baseUnit / 2;
var RING_THICKNESS = _Graphics.baseUnit;

var Circle = function (_Graphic) {
  (0, _inherits3.default)(Circle, _Graphic);

  function Circle(props, context) {
    (0, _classCallCheck3.default)(this, Circle);

    //needed in Graphic.js to fix minification issues
    var _this = (0, _possibleConstructorReturn3.default)(this, (Circle.__proto__ || (0, _getPrototypeOf2.default)(Circle)).call(this, props, context));

    _this.displayName = 'Circle';
    return _this;
  }

  (0, _createClass3.default)(Circle, [{
    key: '_stateFromProps',
    value: function _stateFromProps(props) {
      if (!props.stacked && (props.series.length - 1) * RING_THICKNESS > CIRCLE_RADIUS) {
        console.warn("You cannot have more than " + Math.round(CIRCLE_RADIUS / RING_THICKNESS) + " data values in a circle Meter");
      }

      var state = {
        startAngle: 0,
        anglePer: !props.max ? 0 : 360 / (props.max - props.min),
        angleOffset: 180,
        viewBoxWidth: CIRCLE_WIDTH,
        viewBoxHeight: CIRCLE_WIDTH
      };

      return state;
    }
  }, {
    key: '_sliceCommands',
    value: function _sliceCommands(trackIndex, item, startValue, max) {
      var startAngle = (0, _Graphics.translateEndAngle)(this.state.startAngle, this.state.anglePer, startValue);

      var endAngle;
      if (!item.value) {
        endAngle = startAngle;
      } else if (startValue + item.value >= max) {
        endAngle = 360;
      } else {
        endAngle = Math.min(360, Math.max(startAngle, (0, _Graphics.translateEndAngle)(startAngle, this.state.anglePer, item.value)));
      }

      var radius = Math.max(1, CIRCLE_RADIUS - trackIndex * RING_THICKNESS);
      return (0, _Graphics.arcCommands)(CIRCLE_WIDTH / 2, CIRCLE_WIDTH / 2, radius, startAngle + this.state.angleOffset, endAngle + this.state.angleOffset);
    }
  }]);
  return Circle;
}(_Graphic3.default);

//needed in Graphic.js to fix minification issues


exports.default = Circle;
Circle.displayName = 'Circle';
module.exports = exports['default'];