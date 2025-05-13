"use strict";

exports.__esModule = true;
exports.StyledMeter = void 0;
var _styledComponents = _interopRequireWildcard(require("styled-components"));
var _utils = require("../../utils");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
// fallback to edgeSize for backwards compatibility
var roundStyle = (0, _styledComponents.css)(["border-radius:", ";"], function (props) {
  return props.theme.global[props.theme.global.radius ? 'radius' : 'edgeSize'][props.round.size];
});

// overflow: hidden is needed for ie11
var StyledMeter = exports.StyledMeter = _styledComponents["default"].svg.withConfig(_utils.styledComponentsConfig).withConfig({
  displayName: "StyledMeter",
  componentId: "sc-nsxarx-0"
})(["max-width:100%;overflow:hidden;", " ", " ", " path{transition:stroke 0.3s,stroke-width 0.3s;}", ";"], function (props) {
  return props.reverse && (0, _styledComponents.css)(["transform:scale(-1,1);"]);
}, _utils.genericStyles, function (props) {
  return props.round && roundStyle;
}, function (props) {
  return props.theme.meter && props.theme.meter.extend;
});