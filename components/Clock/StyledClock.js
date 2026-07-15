"use strict";

exports.__esModule = true;
exports.StyledSecond = exports.StyledMinute = exports.StyledHour = exports.StyledDigitalPrevious = exports.StyledDigitalNext = exports.StyledDigitalDigit = exports.StyledAnalog = void 0;
var _styledComponents = _interopRequireWildcard(require("styled-components"));
var _utils = require("../../utils");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
var StyledHour = exports.StyledHour = _styledComponents["default"].line.withConfig(_utils.styledComponentsConfig).withConfig({
  displayName: "StyledClock__StyledHour",
  componentId: "sc-y4xw8s-0"
})(["stroke-width:", ";stroke:", ";transition:stroke 1s ease-out;"], function (props) {
  return props.theme.clock.analog.hour.width;
}, function (props) {
  return (0, _utils.normalizeColor)(props.theme.clock.analog.hour.color, props.theme);
});
var StyledMinute = exports.StyledMinute = _styledComponents["default"].line.withConfig(_utils.styledComponentsConfig).withConfig({
  displayName: "StyledClock__StyledMinute",
  componentId: "sc-y4xw8s-1"
})(["stroke-width:", ";stroke:", ";transition:stroke 1s ease-out;"], function (props) {
  return props.theme.clock.analog.minute.width;
}, function (props) {
  return (0, _utils.normalizeColor)(props.theme.clock.analog.minute.color, props.theme);
});
var StyledSecond = exports.StyledSecond = _styledComponents["default"].line.withConfig(_utils.styledComponentsConfig).withConfig({
  displayName: "StyledClock__StyledSecond",
  componentId: "sc-y4xw8s-2"
})(["stroke-width:", ";stroke:", ";transition:stroke 1s ease-out;"], function (props) {
  return props.theme.clock.analog.second.width;
}, function (props) {
  return (0, _utils.normalizeColor)(props.theme.clock.analog.second.color, props.theme);
});
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
var previousUp = (0, _styledComponents.keyframes)(["0%{transform:translateY(0);}100%{transform:translateY(-100%);}"]);
var previousDown = (0, _styledComponents.keyframes)(["0%{transform:translateY(0);}100%{transform:translateY(100%);}"]);
var StyledDigitalPrevious = exports.StyledDigitalPrevious = _styledComponents["default"].div.withConfig(_utils.styledComponentsConfig).withConfig({
  displayName: "StyledClock__StyledDigitalPrevious",
  componentId: "sc-y4xw8s-5"
})(["position:absolute;top:0;left:0;width:0.8em;text-align:center;animation:", " 0.5s forwards;"], function (props) {
  return props.direction === 'down' ? previousDown : previousUp;
});
var nextUp = (0, _styledComponents.keyframes)(["0%{transform:translateY(100%);}100%{transform:translateY(0);}"]);
var nextDown = (0, _styledComponents.keyframes)(["0%{transform:translateY(-100%);}100%{transform:translateY(0);}"]);
var StyledDigitalNext = exports.StyledDigitalNext = _styledComponents["default"].div.withConfig(_utils.styledComponentsConfig).withConfig({
  displayName: "StyledClock__StyledDigitalNext",
  componentId: "sc-y4xw8s-6"
})(["position:absolute;top:0;left:0;width:0.8em;text-align:center;animation:", " 0.5s forwards;"], function (props) {
  return props.direction === 'down' ? nextDown : nextUp;
});