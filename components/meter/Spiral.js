'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('./utils');

var _Graphic2 = require('./Graphic');

var _Graphic3 = _interopRequireDefault(_Graphic2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _utils.classRoot;

var SPIRAL_WIDTH = _utils.baseDimension;
var SPIRAL_RADIUS = _utils.baseDimension / 2 - _utils.baseUnit / 2;
var RING_THICKNESS = _utils.baseUnit;
// Allow for active value content next to a spiral meter
var SPIRAL_TEXT_PADDING = _utils.baseUnit * 2;

var Spiral = function (_Graphic) {
  _inherits(Spiral, _Graphic);

  function Spiral(props) {
    _classCallCheck(this, Spiral);

    //needed in Graphic.js to fix minification issues

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Spiral).call(this, props));

    _this.displayName = 'Spiral';
    return _this;
  }

  _createClass(Spiral, [{
    key: '_stateFromProps',
    value: function _stateFromProps(props) {
      var viewBoxHeight = Math.max(SPIRAL_WIDTH, RING_THICKNESS * (props.series.length + 1) * 2);
      var viewBoxWidth = viewBoxHeight + 2 * SPIRAL_TEXT_PADDING;

      var state = {
        startAngle: 0,
        anglePer: 270.0 / props.max.value,
        angleOffset: 180,
        // The last spiral ends out near but not quite at the edge of the view box.
        startRadius: Math.max(SPIRAL_RADIUS, RING_THICKNESS * (props.series.length + 0.5)) - Math.max(0, props.series.length - 1) * RING_THICKNESS,
        viewBoxWidth: viewBoxWidth,
        viewBoxHeight: viewBoxHeight
      };

      return state;
    }
  }, {
    key: '_sliceCommands',
    value: function _sliceCommands(trackIndex, item, startValue) {
      var startAngle = (0, _utils.translateEndAngle)(this.state.startAngle, this.state.anglePer, startValue);
      var endAngle = (0, _utils.translateEndAngle)(startAngle, this.state.anglePer, item.value);
      var radius = Math.min(SPIRAL_RADIUS, this.state.startRadius + trackIndex * RING_THICKNESS);
      return (0, _utils.arcCommands)(SPIRAL_WIDTH / 2, SPIRAL_WIDTH / 2, radius, startAngle + this.state.angleOffset, endAngle + this.state.angleOffset);
    }
  }, {
    key: '_renderThresholds',
    value: function _renderThresholds() {
      return null;
    }
  }, {
    key: '_renderTopLayer',
    value: function _renderTopLayer() {
      var x = SPIRAL_RADIUS + RING_THICKNESS;
      var y = SPIRAL_RADIUS + RING_THICKNESS * 2.2;
      var labels = this.props.series.map(function (item, index) {
        var classes = [CLASS_ROOT + "__label"];
        if (index === this.props.activeIndex) {
          classes.push(CLASS_ROOT + "__label--active");
        }

        var textX = x;
        var textY = y;

        y += RING_THICKNESS;

        return _react2.default.createElement(
          'text',
          { key: item.label || index, x: textX, y: textY,
            textAnchor: 'start', fontSize: 16,
            className: classes.join(' '),
            onMouseOver: this.props.onActivate.bind(null, index),
            onMouseOut: this.props.onActivate.bind(null, null),
            onClick: item.onClick },
          item.label
        );
      }, this);

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