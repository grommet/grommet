"use strict";

exports.__esModule = true;
exports.StyledSecond = exports.StyledMinute = exports.StyledHour = exports.StyledDigitalPrevious = exports.StyledDigitalNext = exports.StyledDigitalDigit = exports.StyledAnalog = void 0;
var _styledComponents = _interopRequireWildcard(require("styled-components"));
var _utils = require("../../utils");
var _defaultProps = require("../../default-props");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var StyledHour = exports.StyledHour = _styledComponents["default"].line.withConfig(_utils.styledComponentsConfig).withConfig({
  displayName: "StyledClock__StyledHour",
  componentId: "sc-y4xw8s-0"
})(["stroke-width:", ";stroke:", ";transition:stroke 1s ease-out;"], function (props) {
  return props.theme.clock.analog.hour.width;
}, function (props) {
  return (0, _utils.normalizeColor)(props.theme.clock.analog.hour.color, props.theme);
});
StyledHour.defaultProps = {};
Object.setPrototypeOf(StyledHour.defaultProps, _defaultProps.defaultProps);
var StyledMinute = exports.StyledMinute = _styledComponents["default"].line.withConfig(_utils.styledComponentsConfig).withConfig({
  displayName: "StyledClock__StyledMinute",
  componentId: "sc-y4xw8s-1"
})(["stroke-width:", ";stroke:", ";transition:stroke 1s ease-out;"], function (props) {
  return props.theme.clock.analog.minute.width;
}, function (props) {
  return (0, _utils.normalizeColor)(props.theme.clock.analog.minute.color, props.theme);
});
StyledMinute.defaultProps = {};
Object.setPrototypeOf(StyledMinute.defaultProps, _defaultProps.defaultProps);
var StyledSecond = exports.StyledSecond = _styledComponents["default"].line.withConfig(_utils.styledComponentsConfig).withConfig({
  displayName: "StyledClock__StyledSecond",
  componentId: "sc-y4xw8s-2"
})(["stroke-width:", ";stroke:", ";transition:stroke 1s ease-out;"], function (props) {
  return props.theme.clock.analog.second.width;
}, function (props) {
  return (0, _utils.normalizeColor)(props.theme.clock.analog.second.color, props.theme);
});
StyledSecond.defaultProps = {};
Object.setPrototypeOf(StyledSecond.defaultProps, _defaultProps.defaultProps);
var StyledAnalog = exports.StyledAnalog = _styledComponents["default"].svg.withConfig(_utils.styledComponentsConfig).withConfig({
  displayName: "StyledClock__StyledAnalog",
  componentId: "sc-y4xw8s-3"
})(["width:", ";height:", ";", " ", ";"], function (props) {
  return props.theme.clock.analog.size[props.size];
}, function (props) {
  return props.theme.clock.analog.size[props.size];
}, _utils.genericStyles, function (props) {
  return props.theme.clock.analog && props.theme.clock.analog.extend;
});
StyledAnalog.defaultProps = {};
Object.setPrototypeOf(StyledAnalog.defaultProps, _defaultProps.defaultProps);
var sizeStyle = function sizeStyle(props) {
  // size is a combination of the size and height properties
  var size = props.size || 'medium';
  var data = props.theme.clock.digital.text[size] || {};
  return (0, _styledComponents.css)(["font-size:", ";line-height:", ";"], data.size || props.theme.clock.digital.text.medium.size, data.height || props.theme.clock.digital.text.medium.height);
};
var StyledDigitalDigit = exports.StyledDigitalDigit = _styledComponents["default"].div.withConfig(_utils.styledComponentsConfig).withConfig({
  displayName: "StyledClock__StyledDigitalDigit",
  componentId: "sc-y4xw8s-4"
})(["position:relative;width:0.8em;text-align:center;overflow:hidden;", ";"], function (props) {
  return sizeStyle(props);
});
StyledDigitalDigit.defaultProps = {};
Object.setPrototypeOf(StyledDigitalDigit.defaultProps, _defaultProps.defaultProps);
var previousUp = (0, _styledComponents.keyframes)(["0%{transform:translateY(0);}100%{transform:translateY(-100%);}"]);
var previousDown = (0, _styledComponents.keyframes)(["0%{transform:translateY(0);}100%{transform:translateY(100%);}"]);
var StyledDigitalPrevious = exports.StyledDigitalPrevious = _styledComponents["default"].div.withConfig(_utils.styledComponentsConfig).withConfig({
  displayName: "StyledClock__StyledDigitalPrevious",
  componentId: "sc-y4xw8s-5"
})(["position:absolute;top:0;left:0;width:0.8em;text-align:center;animation:", " 0.5s forwards;"], function (props) {
  return props.direction === 'down' ? previousDown : previousUp;
});
StyledDigitalPrevious.defaultProps = {};
Object.setPrototypeOf(StyledDigitalPrevious.defaultProps, _defaultProps.defaultProps);
var nextUp = (0, _styledComponents.keyframes)(["0%{transform:translateY(100%);}100%{transform:translateY(0);}"]);
var nextDown = (0, _styledComponents.keyframes)(["0%{transform:translateY(-100%);}100%{transform:translateY(0);}"]);
var StyledDigitalNext = exports.StyledDigitalNext = _styledComponents["default"].div.withConfig(_utils.styledComponentsConfig).withConfig({
  displayName: "StyledClock__StyledDigitalNext",
  componentId: "sc-y4xw8s-6"
})(["position:absolute;top:0;left:0;width:0.8em;text-align:center;animation:", " 0.5s forwards;"], function (props) {
  return props.direction === 'down' ? nextDown : nextUp;
});
StyledDigitalNext.defaultProps = {};
Object.setPrototypeOf(StyledDigitalNext.defaultProps, _defaultProps.defaultProps);