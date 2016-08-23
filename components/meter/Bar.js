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

var _utils = require('./utils');

var _Graphic2 = require('./Graphic');

var _Graphic3 = _interopRequireDefault(_Graphic2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var BAR_LENGTH = _utils.baseDimension;
var BAR_THICKNESS = _Graphics.baseUnit;
var MID_BAR_THICKNESS = BAR_THICKNESS / 2;

var Bar = function (_Graphic) {
  (0, _inherits3.default)(Bar, _Graphic);

  function Bar(props, context) {
    (0, _classCallCheck3.default)(this, Bar);

    //needed in Graphic.js to fix minification issues
    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Bar).call(this, props, context));

    _this.displayName = 'Bar';
    return _this;
  }

  (0, _createClass3.default)(Bar, [{
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
      var distance = Math.max(item.value > 0 ? MID_BAR_THICKNESS : 0, this._translateBarWidth(value));
      var commands = void 0;
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
      var result = void 0;
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
}(_Graphic3.default);

//needed in Graphic.js to fix minification issues


exports.default = Bar;
Bar.displayName = 'Bar';
module.exports = exports['default'];