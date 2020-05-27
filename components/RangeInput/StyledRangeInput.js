"use strict";

exports.__esModule = true;
exports.StyledRangeInput = void 0;

var _polished = require("polished");

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _utils = require("../../utils");

var _defaultProps = require("../../default-props");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// opacity of the bound trumps the track opacity
var getBoundOpacity = function getBoundOpacity(props, bound) {
  return props.theme.rangeInput && props.theme.rangeInput.track && props.theme.rangeInput.track[bound] && props.theme.rangeInput.track[bound].opacity ? props.theme.rangeInput.track[bound].opacity : 1;
};

var getBoundColor = function getBoundColor(props, bound) {
  if (props.theme.rangeInput && props.theme.rangeInput.track && props.theme.rangeInput.track[bound] && props.theme.rangeInput.track[bound].color) {
    return (0, _polished.rgba)((0, _utils.normalizeColor)(props.theme.rangeInput.track[bound].color, props.theme), getBoundOpacity(props, bound));
  } // If bound color is undefined pick the default track color with bound opacity


  return (0, _polished.rgba)((0, _utils.normalizeColor)(props.theme.rangeInput.track.color, props.theme), getBoundOpacity(props, bound));
};

var trackColorStyle = function trackColorStyle(props) {
  // backward compatibility in case no bounds are defined
  if (props.theme.rangeInput && props.theme.rangeInput.track && !props.theme.rangeInput.track.lower && !props.theme.rangeInput.track.upper) {
    var color = (0, _polished.rgba)((0, _utils.normalizeColor)(props.theme.rangeInput.track.color, props.theme), 0.2); // Since the track color was changed from border-with-opacity to just border
    // this condition is used to make sure we are applying the opacity correctly
    // for 'border' color (for backward compatibility purposes).

    if (color === 'rgba(0,0,0,0.2)') return "background: " + color; // no bounds are defined but color may have changed

    return "background: " + (0, _polished.rgba)((0, _utils.normalizeColor)(props.theme.rangeInput.track.color, props.theme), props.theme.rangeInput.track.opacity || 1);
  }

  var max = props.max || 100; // 'max' defaults to 100 in case not specified

  var min = props.min || 0; // 'min' defaults to 0 in case not specified

  var thumbPosition = (props.value - min) / (max - min) * 100 + "%";
  var lowerTrackColor = getBoundColor(props, 'lower');
  var upperTrackColor = getBoundColor(props, 'upper');
  return "background: linear-gradient(\n      to right,\n      " + lowerTrackColor + ",\n      " + lowerTrackColor + " " + thumbPosition + ",\n      " + upperTrackColor + " " + thumbPosition + ",\n      " + upperTrackColor + "\n    );\n  ";
};

var rangeTrackStyle = (0, _styledComponents.css)(["box-sizing:border-box;width:100%;height:", ";", ";", ""], function (props) {
  return props.theme.rangeInput.track.height;
}, function (props) {
  return trackColorStyle(props);
}, function (props) {
  return props.theme.rangeInput && props.theme.rangeInput.track && props.theme.rangeInput.track.extend;
});
var rangeThumbStyle = (0, _styledComponents.css)(["box-sizing:border-box;position:relative;border-radius:", ";height:", ";width:", ";overflow:visible;background:", ";-webkit-appearance:none;cursor:pointer;", ""], function (props) {
  return props.theme.global.spacing;
}, function (props) {
  return props.theme.global.spacing;
}, function (props) {
  return props.theme.global.spacing;
}, function (props) {
  return (0, _utils.normalizeColor)(props.theme.rangeInput.thumb.color || 'control', props.theme);
}, function (props) {
  return props.theme.rangeInput && props.theme.rangeInput.thumb && props.theme.rangeInput.thumb.extend;
});
var firefoxMicrosoftThumbStyle = (0, _styledComponents.css)(["", " margin-top:0px;height:", ";width:", ";", ""], rangeThumbStyle, function (props) {
  return props.theme.global.spacing;
}, function (props) {
  return props.theme.global.spacing;
}, function (props) {
  return props.theme.rangeInput && props.theme.rangeInput.thumb && props.theme.rangeInput.thumb.extend;
});
/* eslint-disable max-len */

var StyledRangeInput = _styledComponents["default"].input.withConfig({
  displayName: "StyledRangeInput",
  componentId: "sc-15st9ck-0"
})(["box-sizing:border-box;position:relative;-webkit-appearance:none;border-color:transparent;height:", ";width:100%;padding:0px;cursor:pointer;background:transparent;&::-moz-focus-inner{border:none;}&::-moz-focus-outer{border:none;}&::-webkit-slider-runnable-track{", "}&::-webkit-slider-thumb{margin-top:-", "px;", " ", "}&::-moz-range-track{", "}&::-moz-range-thumb{", "}&::-ms-thumb{", "}", " &::-ms-track{", " border-color:transparent;color:transparent;}&::-ms-fill-lower{", ";border-color:transparent;}&::-ms-fill-upper{", ";border-color:transparent;}", " ", ""], function (props) {
  return props.theme.global.spacing;
}, rangeTrackStyle, function (props) {
  return ((0, _utils.parseMetricToNum)(props.theme.global.spacing) - (0, _utils.parseMetricToNum)(props.theme.rangeInput.track.height || 0)) * 0.5;
}, rangeThumbStyle, function (props) {
  return !props.disabled && (0, _styledComponents.css)(["&:hover{box-shadow:0px 0px 0px 2px ", ";}"], (0, _utils.normalizeColor)(props.theme.rangeInput.thumb.color || 'control', props.theme));
}, rangeTrackStyle, firefoxMicrosoftThumbStyle, firefoxMicrosoftThumbStyle, function (props) {
  return !props.disabled && (0, _styledComponents.css)(["&:hover::-moz-range-thumb{box-shadow:0px 0px 0px 2px ", ";}&:hover::-ms-thumb{box-shadow:0px 0px 0px 2px ", ";}"], (0, _utils.normalizeColor)(props.theme.rangeInput.thumb.color || 'control', props.theme), (0, _utils.normalizeColor)(props.theme.rangeInput.thumb.color || 'control', props.theme));
}, rangeTrackStyle, function (props) {
  return trackColorStyle(props, 'lower');
}, function (props) {
  return trackColorStyle(props, 'upper');
}, function (props) {
  return props.focus && (0, _utils.focusStyle)();
}, function (props) {
  return props.theme.rangeInput && props.theme.rangeInput.extend;
});
/* eslint-enable max-len */


exports.StyledRangeInput = StyledRangeInput;
StyledRangeInput.defaultProps = {};
Object.setPrototypeOf(StyledRangeInput.defaultProps, _defaultProps.defaultProps);