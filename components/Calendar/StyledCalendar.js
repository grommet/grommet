"use strict";

exports.__esModule = true;
exports.StyledDay = exports.StyledDayContainer = exports.StyledWeek = exports.StyledWeeks = exports.StyledWeeksContainer = exports.StyledCalendar = void 0;

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _utils = require("../../utils");

var _defaultProps = require("../../default-props");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var sizeStyle = function sizeStyle(props) {
  var data = props.theme.calendar[props.sizeProp];
  return (0, _styledComponents.css)(["font-size:", ";line-height:", ";width:", ";"], data.fontSize, data.lineHeight, props.theme.global.size[props.sizeProp]);
};

var StyledCalendar = _styledComponents["default"].div.withConfig({
  displayName: "StyledCalendar",
  componentId: "sc-1y4xhmp-0"
})(["", " ", " ", ""], _utils.genericStyles, function (props) {
  return sizeStyle(props);
}, function (props) {
  return props.theme.calendar && props.theme.calendar.extend;
});

exports.StyledCalendar = StyledCalendar;
StyledCalendar.defaultProps = {};
Object.setPrototypeOf(StyledCalendar.defaultProps, _defaultProps.defaultProps);

var StyledWeeksContainer = _styledComponents["default"].div.withConfig({
  displayName: "StyledCalendar__StyledWeeksContainer",
  componentId: "sc-1y4xhmp-1"
})(["overflow:hidden;", ";", ";"], function (props) {
  return "height: " + (0, _utils.parseMetricToNum)(props.theme.calendar[props.sizeProp].daySize) * 6 + "px;";
}, function (props) {
  return props.focus && !props.plain && (0, _utils.focusStyle)();
});

exports.StyledWeeksContainer = StyledWeeksContainer;
StyledWeeksContainer.defaultProps = {};
Object.setPrototypeOf(StyledWeeksContainer.defaultProps, _defaultProps.defaultProps);

var slideStyle = function slideStyle(props) {
  var _props$slide = props.slide,
      direction = _props$slide.direction,
      weeks = _props$slide.weeks,
      sizeProp = props.sizeProp,
      theme = props.theme;
  var _theme$calendar$sizeP = theme.calendar[sizeProp],
      daySize = _theme$calendar$sizeP.daySize,
      slideDuration = _theme$calendar$sizeP.slideDuration;
  var amount = (0, _utils.parseMetricToNum)(daySize) * weeks;
  var translateYFrom = direction === 'down' ? "-" + amount + "px" : '0';
  var translateYTo = direction === 'up' ? "-" + amount + "px" : '0';
  var slideTransition = (0, _styledComponents.css)(["0%{transform:translateY(", ");}100%{transform:translateY(", ");}"], translateYFrom, translateYTo);
  return (0, _styledComponents.css)(["animation:", " ", " forwards;"], (0, _styledComponents.keyframes)(["", ""], slideTransition), slideDuration);
};

var StyledWeeks = _styledComponents["default"].div.withConfig({
  displayName: "StyledCalendar__StyledWeeks",
  componentId: "sc-1y4xhmp-2"
})(["position:relative;", ";"], function (props) {
  return props.slide && slideStyle(props);
});

exports.StyledWeeks = StyledWeeks;
StyledWeeks.defaultProps = {};
Object.setPrototypeOf(StyledWeeks.defaultProps, _defaultProps.defaultProps);

var StyledWeek = _styledComponents["default"].div.withConfig({
  displayName: "StyledCalendar__StyledWeek",
  componentId: "sc-1y4xhmp-3"
})(["display:flex;flex-direction:row;flex-justify:between;"]);

exports.StyledWeek = StyledWeek;
StyledWeek.defaultProps = {};
Object.setPrototypeOf(StyledWeek.defaultProps, _defaultProps.defaultProps);

var StyledDayContainer = _styledComponents["default"].div.withConfig({
  displayName: "StyledCalendar__StyledDayContainer",
  componentId: "sc-1y4xhmp-4"
})(["flex:0 0 auto;"]);

exports.StyledDayContainer = StyledDayContainer;
StyledDayContainer.defaultProps = {};
Object.setPrototypeOf(StyledDayContainer.defaultProps, _defaultProps.defaultProps);

var daySizeStyle = function daySizeStyle(props) {
  var data = props.theme.calendar[props.sizeProp];
  return (0, _styledComponents.css)(["width:", ";height:", ";"], data.daySize, data.daySize);
};

var StyledDay = _styledComponents["default"].div.withConfig({
  displayName: "StyledCalendar__StyledDay",
  componentId: "sc-1y4xhmp-5"
})(["display:flex;justify-content:center;align-items:center;", " ", " ", " ", " ", ""], function (props) {
  return daySizeStyle(props);
}, function (props) {
  return props.isSelected && (0, _utils.backgroundStyle)('control', props.theme) || props.inRange && (0, _utils.backgroundStyle)({
    color: 'control',
    opacity: 'weak'
  }, props.theme);
}, function (props) {
  return props.otherMonth && 'opacity: 0.5;';
}, function (props) {
  return props.isSelected && 'font-weight: bold;';
}, function (props) {
  return props.theme.calendar && props.theme.calendar.day && props.theme.calendar.day.extend;
});

exports.StyledDay = StyledDay;
StyledDay.defaultProps = {};
Object.setPrototypeOf(StyledDay.defaultProps, _defaultProps.defaultProps);