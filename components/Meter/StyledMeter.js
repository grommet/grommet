"use strict";

exports.__esModule = true;
exports.StyledMeter = void 0;
var _styledComponents = _interopRequireWildcard(require("styled-components"));
var _utils = require("../../utils");
var _defaultProps = require("../../default-props");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var roundStyle = (0, _styledComponents.css)(["border-radius:", ";"], function (props) {
  return props.theme.global.edgeSize[props.round.size];
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
StyledMeter.defaultProps = {};
Object.setPrototypeOf(StyledMeter.defaultProps, _defaultProps.defaultProps);