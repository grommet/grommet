"use strict";

exports.__esModule = true;
exports.Bar = void 0;

var _react = _interopRequireDefault(require("react"));

var _recompose = require("recompose");

var _styledComponents = require("styled-components");

var _defaultProps = require("../../default-props");

var _utils = require("../../utils");

var _StyledMeter = require("./StyledMeter");

var _utils2 = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var Bar = function Bar(props) {
  var background = props.background,
      max = props.max,
      round = props.round,
      size = props.size,
      theme = props.theme,
      thickness = props.thickness,
      values = props.values,
      rest = _objectWithoutPropertiesLoose(props, ["background", "max", "round", "size", "theme", "thickness", "values"]);

  var width = size === 'full' ? 288 : (0, _utils.parseMetricToNum)(theme.global.size[size] || size);
  var height = (0, _utils.parseMetricToNum)(theme.global.edgeSize[thickness] || thickness); // account for the round cap, if any

  var capOffset = round ? height / 2 : 0;
  var mid = height / 2;
  var someHighlight = (values || []).some(function (v) {
    return v.highlight;
  });
  var start = capOffset;
  var paths = (values || []).filter(function (v) {
    return v.value > 0;
  }).map(function (valueArg, index) {
    var color = valueArg.color,
        highlight = valueArg.highlight,
        label = valueArg.label,
        onHover = valueArg.onHover,
        value = valueArg.value,
        pathRest = _objectWithoutPropertiesLoose(valueArg, ["color", "highlight", "label", "onHover", "value"]);

    var key = "p-" + index;
    var delta = value * (width - 2 * capOffset) / max;
    var d = "M " + start + "," + mid + " L " + (start + delta) + "," + mid;
    var colorName = color || (index === values.length - 1 ? theme.meter.color : (0, _utils2.defaultColor)(index, theme));
    var hoverProps;

    if (onHover) {
      hoverProps = {
        onMouseOver: function onMouseOver() {
          return onHover(true);
        },
        onMouseLeave: function onMouseLeave() {
          return onHover(false);
        }
      };
    }

    start += delta;
    return _react.default.createElement("path", _extends({
      key: key,
      d: d,
      fill: "none"
    }, (0, _utils2.strokeProps)(someHighlight && !highlight ? background : colorName, theme), {
      strokeWidth: height,
      strokeLinecap: round ? 'round' : 'butt'
    }, hoverProps, pathRest));
  }).reverse(); // reverse so the caps looks right

  return _react.default.createElement(_StyledMeter.StyledMeter, _extends({
    viewBox: "0 0 " + width + " " + height,
    preserveAspectRatio: "none",
    width: size === 'full' ? '100%' : width,
    height: height,
    round: round ? {
      size: thickness
    } : undefined
  }, rest), _react.default.createElement("path", _extends({
    d: "M " + capOffset + "," + mid + " L " + (width - capOffset) + "," + mid,
    fill: "none"
  }, (0, _utils2.strokeProps)(background, theme), {
    strokeWidth: height,
    strokeLinecap: round ? 'round' : 'square'
  })), paths);
};

Bar.defaultProps = {
  background: 'light-1'
};
Object.setPrototypeOf(Bar.defaultProps, _defaultProps.defaultProps);
var BarWrapper = (0, _recompose.compose)(_styledComponents.withTheme)(Bar);
exports.Bar = BarWrapper;