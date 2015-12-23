// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _utils = require('./utils');

var _Graphic2 = require('./Graphic');

var _Graphic3 = _interopRequireDefault(_Graphic2);

var CIRCLE_WIDTH = _utils.baseDimension;
var CIRCLE_RADIUS = _utils.baseDimension / 2 - _utils.baseUnit / 2;
var RING_THICKNESS = _utils.baseUnit;

var Circle = (function (_Graphic) {
  _inherits(Circle, _Graphic);

  function Circle(props) {
    _classCallCheck(this, Circle);

    _get(Object.getPrototypeOf(Circle.prototype), 'constructor', this).call(this, props);
    //needed in Graphic.js to fix minification issues
    this.displayName = 'Circle';
  }

  //needed in Graphic.js to fix minification issues

  _createClass(Circle, [{
    key: '_stateFromProps',
    value: function _stateFromProps(props) {
      if (!props.stacked && (props.series.length - 1) * RING_THICKNESS > CIRCLE_RADIUS) {
        console.warn("You cannot have more than " + Math.round(CIRCLE_RADIUS / RING_THICKNESS) + " data values in a circle Meter");
      }

      var state = {
        startAngle: 1,
        anglePer: !props.max ? 0 : 358.0 / (props.max.value - props.min.value),
        angleOffset: 180,
        viewBoxWidth: CIRCLE_WIDTH,
        viewBoxHeight: CIRCLE_WIDTH
      };

      return state;
    }
  }, {
    key: '_sliceCommands',
    value: function _sliceCommands(trackIndex, item, startValue) {
      var startAngle = (0, _utils.translateEndAngle)(this.state.startAngle, this.state.anglePer, startValue);
      var endAngle = Math.max(startAngle + RING_THICKNESS / 2, (0, _utils.translateEndAngle)(startAngle, this.state.anglePer, item.value));
      var radius = Math.max(1, CIRCLE_RADIUS - trackIndex * RING_THICKNESS);
      return (0, _utils.arcCommands)(CIRCLE_WIDTH / 2, CIRCLE_WIDTH / 2, radius, startAngle + this.state.angleOffset, endAngle + this.state.angleOffset);
    }
  }]);

  return Circle;
})(_Graphic3['default']);

Circle.displayName = 'Circle';

module.exports = Circle;