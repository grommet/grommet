"use strict";

exports.__esModule = true;
exports.StyledDigitalNext = exports.StyledDigitalPrevious = exports.StyledDigitalDigit = exports.StyledAnalog = exports.StyledSecond = exports.StyledMinute = exports.StyledHour = void 0;

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _utils = require("../../utils");

var _defaultProps = require("../../default-props");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var StyledHour = _styledComponents["default"].line.withConfig({
  displayName: "StyledClock__StyledHour",
  componentId: "y4xw8s-0"
})(["stroke-width:", ";stroke:", ";transition:stroke 1s ease-out;"], function (props) {
  return props.theme.clock.analog.hour.width;
}, function (props) {
  return (0, _utils.normalizeColor)(props.theme.clock.analog.hour.color, props.theme);
});

exports.StyledHour = StyledHour;
StyledHour.defaultProps = {};
Object.setPrototypeOf(StyledHour.defaultProps, _defaultProps.defaultProps);

var StyledMinute = _styledComponents["default"].line.withConfig({
  displayName: "StyledClock__StyledMinute",
  componentId: "y4xw8s-1"
})(["stroke-width:", ";stroke:", ";transition:stroke 1s ease-out;"], function (props) {
  return props.theme.clock.analog.minute.width;
}, function (props) {
  return (0, _utils.normalizeColor)(props.theme.clock.analog.minute.color, props.theme);
});

exports.StyledMinute = StyledMinute;
StyledMinute.defaultProps = {};
Object.setPrototypeOf(StyledMinute.defaultProps, _defaultProps.defaultProps);

var StyledSecond = _styledComponents["default"].line.withConfig({
  displayName: "StyledClock__StyledSecond",
  componentId: "y4xw8s-2"
})(["stroke-width:", ";stroke:", ";transition:stroke 1s ease-out;"], function (props) {
  return props.theme.clock.analog.second.width;
}, function (props) {
  return (0, _utils.normalizeColor)(props.theme.clock.analog.second.color, props.theme);
});

exports.StyledSecond = StyledSecond;
StyledSecond.defaultProps = {};
Object.setPrototypeOf(StyledSecond.defaultProps, _defaultProps.defaultProps);

var StyledAnalog = _styledComponents["default"].svg.withConfig({
  displayName: "StyledClock__StyledAnalog",
  componentId: "y4xw8s-3"
})(["width:", ";height:", ";", " ", ";"], function (props) {
  return props.theme.clock.analog.size[props.size];
}, function (props) {
  return props.theme.clock.analog.size[props.size];
}, _utils.genericStyles, function (props) {
  return props.theme.clock.analog && props.theme.clock.analog.extend;
});

exports.StyledAnalog = StyledAnalog;
StyledAnalog.defaultProps = {};
Object.setPrototypeOf(StyledAnalog.defaultProps, _defaultProps.defaultProps);

var sizeStyle = function sizeStyle(props) {
  // size is a combination of the level and size properties
  var size = props.size || 'medium';
  var data = props.theme.clock.digital.text[size];
  return (0, _styledComponents.css)(["font-size:", ";line-height:", ";"], data.size, data.height);
};

var StyledDigitalDigit = _styledComponents["default"].div.withConfig({
  displayName: "StyledClock__StyledDigitalDigit",
  componentId: "y4xw8s-4"
})(["position:relative;width:0.8em;text-align:center;overflow:hidden;", ";"], function (props) {
  return sizeStyle(props);
});

exports.StyledDigitalDigit = StyledDigitalDigit;
StyledDigitalDigit.defaultProps = {};
Object.setPrototypeOf(StyledDigitalDigit.defaultProps, _defaultProps.defaultProps);
var previousUp = (0, _styledComponents.keyframes)(["0%{transform:translateY(0);}100%{transform:translateY(-100%);}"]);
var previousDown = (0, _styledComponents.keyframes)(["0%{transform:translateY(0);}100%{transform:translateY(100%);}"]);

var StyledDigitalPrevious = _styledComponents["default"].div.withConfig({
  displayName: "StyledClock__StyledDigitalPrevious",
  componentId: "y4xw8s-5"
})(["position:absolute;top:0;left:0;width:0.8em;text-align:center;animation:", " 0.5s forwards;"], function (props) {
  return props.direction === 'down' ? previousDown : previousUp;
});

exports.StyledDigitalPrevious = StyledDigitalPrevious;
StyledDigitalPrevious.defaultProps = {};
Object.setPrototypeOf(StyledDigitalPrevious.defaultProps, _defaultProps.defaultProps);
var nextUp = (0, _styledComponents.keyframes)(["0%{transform:translateY(100%);}100%{transform:translateY(0);}"]);
var nextDown = (0, _styledComponents.keyframes)(["0%{transform:translateY(-100%);}100%{transform:translateY(0);}"]);

var StyledDigitalNext = _styledComponents["default"].div.withConfig({
  displayName: "StyledClock__StyledDigitalNext",
  componentId: "y4xw8s-6"
})(["position:absolute;top:0;left:0;width:0.8em;text-align:center;animation:", " 0.5s forwards;"], function (props) {
  return props.direction === 'down' ? nextDown : nextUp;
});

exports.StyledDigitalNext = StyledDigitalNext;
StyledDigitalNext.defaultProps = {};
Object.setPrototypeOf(StyledDigitalNext.defaultProps, _defaultProps.defaultProps);