'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Graphics = require('../../utils/Graphics');

var _utils = require('./utils');

var _Graphic2 = require('./Graphic');

var _Graphic3 = _interopRequireDefault(_Graphic2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var BAR_LENGTH = _utils.baseDimension;
var BAR_THICKNESS = _Graphics.baseUnit;
var MID_BAR_THICKNESS = BAR_THICKNESS / 2;
// const MINIMUM_THICKNESS = BAR_THICKNESS / 6;

var Bar = function (_Graphic) {
  _inherits(Bar, _Graphic);

  function Bar(props, context) {
    _classCallCheck(this, Bar);

    //needed in Graphic.js to fix minification issues
    var _this = _possibleConstructorReturn(this, (Bar.__proto__ || Object.getPrototypeOf(Bar)).call(this, props, context));

    _this.displayName = 'Bar';
    return _this;
  }

  _createClass(Bar, [{
    key: '_viewBoxDimensions',
    value: function _viewBoxDimensions(props) {
      var viewBoxHeight = void 0;
      var viewBoxWidth = void 0;
      if (props.vertical) {
        if (props.stacked) {
          viewBoxWidth = BAR_THICKNESS;
        } else {
          viewBoxWidth = BAR_THICKNESS * Math.max(1, props.series.length);
        }
        viewBoxHeight = BAR_LENGTH;
      } else {
        viewBoxWidth = BAR_LENGTH;
        if (props.stacked) {
          viewBoxHeight = BAR_THICKNESS;
        } else {
          viewBoxHeight = BAR_THICKNESS * Math.max(1, props.series.length);
        }
      }
      return [viewBoxWidth, viewBoxHeight];
    }
  }, {
    key: '_stateFromProps',
    value: function _stateFromProps(props) {
      var viewBoxDimensions = this._viewBoxDimensions(props);

      var state = {
        scale: BAR_LENGTH / (props.max - props.min),
        viewBoxWidth: viewBoxDimensions[0],
        viewBoxHeight: viewBoxDimensions[1]
      };

      return state;
    }
  }, {
    key: '_translateBarWidth',
    value: function _translateBarWidth(value) {
      return Math.ceil(this.state.scale * value);
    }
  }, {
    key: '_sliceCommands',
    value: function _sliceCommands(trackIndex, item, startValue) {
      var value = item.value - this.props.min;
      var start = this._translateBarWidth(startValue);
      var distance = this._translateBarWidth(value);
      // const distance = Math.max((item.value > 0 ? MINIMUM_THICKNESS : 0),
      //   this._translateBarWidth(value));
      var commands = void 0;
      var spot = trackIndex * BAR_THICKNESS + MID_BAR_THICKNESS;
      if (this.props.vertical) {
        commands = "M" + spot + "," + (BAR_LENGTH - start) + " L" + spot + "," + (BAR_LENGTH - (start + distance));
      } else {
        commands = "M" + start + "," + spot + " L" + (start + distance) + "," + spot;
      }
      return commands;
    }
  }]);

  return Bar;
}(_Graphic3.default);

//needed in Graphic.js to fix minification issues


exports.default = Bar;
Bar.displayName = 'Bar';
module.exports = exports['default'];