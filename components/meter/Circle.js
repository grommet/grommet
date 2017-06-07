'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = require('./utils');

var _Graphic2 = require('./Graphic');

var _Graphic3 = _interopRequireDefault(_Graphic2);

var _Graphics = require('../../utils/Graphics');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var CIRCLE_WIDTH = _utils.baseDimension;
var CIRCLE_RADIUS = _utils.baseDimension / 2 - _Graphics.baseUnit / 2;
var RING_THICKNESS = _Graphics.baseUnit;

var Circle = function (_Graphic) {
  _inherits(Circle, _Graphic);

  function Circle(props, context) {
    _classCallCheck(this, Circle);

    //needed in Graphic.js to fix minification issues
    var _this = _possibleConstructorReturn(this, (Circle.__proto__ || Object.getPrototypeOf(Circle)).call(this, props, context));

    _this.displayName = 'Circle';
    return _this;
  }

  _createClass(Circle, [{
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