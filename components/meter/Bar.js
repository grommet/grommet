'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('./utils');

var _Graphic2 = require('./Graphic');

var _Graphic3 = _interopRequireDefault(_Graphic2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var BAR_LENGTH = _utils.baseDimension;
var BAR_THICKNESS = _utils.baseUnit;
var MID_BAR_THICKNESS = BAR_THICKNESS / 2;

var Bar = (function (_Graphic) {
  _inherits(Bar, _Graphic);

  function Bar(props) {
    _classCallCheck(this, Bar);

    //needed in Graphic.js to fix minification issues

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Bar).call(this, props));

    _this.displayName = 'Bar';
    return _this;
  }

  _createClass(Bar, [{
    key: '_viewBoxDimensions',
    value: function _viewBoxDimensions(props) {
      var viewBoxHeight = undefined;
      var viewBoxWidth = undefined;
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
          if (props.legend && 'inline' === props.legend.placement) {
            viewBoxHeight *= 2;
          }
        }
      }
      return [viewBoxWidth, viewBoxHeight];
    }
  }, {
    key: '_stateFromProps',
    value: function _stateFromProps(props) {
      var viewBoxDimensions = this._viewBoxDimensions(props);

      var state = {
        scale: BAR_LENGTH / (props.max.value - props.min.value),
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
      var value = item.value - this.props.min.value;
      var start = this._translateBarWidth(startValue);
      var distance = Math.max(MID_BAR_THICKNESS, this._translateBarWidth(value));
      var commands = undefined;
      if (this.props.legend && 'inline' === this.props.legend.placement) {
        trackIndex *= 2;
      }
      var spot = trackIndex * BAR_THICKNESS + MID_BAR_THICKNESS;
      if (this.props.legend && 'inline' === this.props.legend.placement) {
        spot += MID_BAR_THICKNESS;
      }
      if (this.props.vertical) {
        commands = "M" + spot + "," + (BAR_LENGTH - start) + " L" + spot + "," + (BAR_LENGTH - (start + distance));
      } else {
        commands = "M" + start + "," + spot + " L" + (start + distance) + "," + spot;
      }
      return commands;
    }
  }, {
    key: '_renderInlineLegend',
    value: function _renderInlineLegend() {
      var result = undefined;
      if (this.props.legend && 'inline' === this.props.legend.placement) {
        result = this.props.series.map(function (item, index) {
          var spot = index * BAR_THICKNESS * 2 + MID_BAR_THICKNESS;

          var label;
          if (item.hasOwnProperty('label')) {
            label = _react2.default.createElement(
              'text',
              { key: 'label', x: '0', y: spot, role: 'presentation',
                textAnchor: 'start', fontSize: 16 },
              item.label
            );
          }

          var value;
          if (item.hasOwnProperty('value')) {
            var text = item.value;
            if (item.units || this.props.units) {
              text += ' ' + (item.units || this.props.units);
            }
            var x = this._translateBarWidth(this.props.max.value);
            value = _react2.default.createElement(
              'text',
              { key: 'value', x: x, y: spot, role: 'presentation',
                textAnchor: 'end', fontSize: 16 },
              text
            );
          }

          return [label, value];
        }, this);
      }
      return result;
    }
  }]);

  return Bar;
})(_Graphic3.default);

//needed in Graphic.js to fix minification issues

exports.default = Bar;
Bar.displayName = 'Bar';
module.exports = exports['default'];