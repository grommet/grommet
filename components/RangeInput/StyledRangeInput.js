"use strict";

exports.__esModule = true;
exports.StyledRangeInput = void 0;

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _utils = require("../../utils");

var _defaultProps = require("../../default-props");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var rangeTrackStyle = (0, _styledComponents.css)(["box-sizing:border-box;width:100%;height:", ";background:", ";", ""], function (props) {
  return props.theme.rangeInput.track.height;
}, function (props) {
  return (0, _utils.normalizeColor)(props.theme.rangeInput.track.color, props.theme);
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

var StyledRangeInput = _styledComponents.default.input.withConfig({
  displayName: "StyledRangeInput",
  componentId: "sc-15st9ck-0"
})(["box-sizing:border-box;position:relative;-webkit-appearance:none;border-color:transparent;height:", ";width:100%;padding:0px;cursor:pointer;background:transparent;&:focus{outline:none;}&::-moz-focus-inner{border:none;}&::-moz-focus-outer{border:none;}&::-webkit-slider-runnable-track{", "}&::-webkit-slider-thumb{margin-top:-", "px;", " ", "}&::-moz-range-track{", "}&::-moz-range-thumb{", "}&::-ms-thumb{", "}", " &::-ms-track{", " border-color:transparent;color:transparent;}&::-ms-fill-lower{background:", ";border-color:transparent;}&::-ms-fill-upper{background:", ";border-color:transparent;}", " ", ""], function (props) {
  return props.theme.global.spacing;
}, rangeTrackStyle, function (props) {
  return ((0, _utils.parseMetricToNum)(props.theme.global.spacing) - (0, _utils.parseMetricToNum)(props.theme.rangeInput.track.height || 0)) * 0.5;
}, rangeThumbStyle, function (props) {
  return !props.disabled && (0, _styledComponents.css)(["&:hover{box-shadow:0px 0px 0px 2px ", ";}"], (0, _utils.normalizeColor)(props.theme.rangeInput.thumb.color || 'control', props.theme));
}, rangeTrackStyle, firefoxMicrosoftThumbStyle, firefoxMicrosoftThumbStyle, function (props) {
  return !props.disabled && (0, _styledComponents.css)(["&:hover::-moz-range-thumb{box-shadow:0px 0px 0px 2px ", ";}&:hover::-ms-thumb{box-shadow:0px 0px 0px 2px ", ";}"], (0, _utils.normalizeColor)(props.theme.rangeInput.thumb.color || 'control', props.theme), (0, _utils.normalizeColor)(props.theme.rangeInput.thumb.color || 'control', props.theme));
}, rangeTrackStyle, function (props) {
  return (0, _utils.normalizeColor)(props.theme.rangeInput.track.color, props.theme);
}, function (props) {
  return (0, _utils.normalizeColor)(props.theme.rangeInput.track.color, props.theme);
}, function (props) {
  return props.focus && _utils.focusStyle;
}, function (props) {
  return props.theme.rangeInput && props.theme.rangeInput.extend;
});

exports.StyledRangeInput = StyledRangeInput;
StyledRangeInput.defaultProps = {};
Object.setPrototypeOf(StyledRangeInput.defaultProps, _defaultProps.defaultProps);