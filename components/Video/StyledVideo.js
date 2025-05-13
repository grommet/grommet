"use strict";

exports.__esModule = true;
exports.StyledVideoScrubber = exports.StyledVideoControls = exports.StyledVideoContainer = exports.StyledVideo = void 0;
var _styledComponents = _interopRequireWildcard(require("styled-components"));
var _utils = require("../../utils");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
var FIT_MAP = {
  cover: 'cover',
  contain: 'contain'
};
var fitStyle = (0, _styledComponents.css)(["flex:1 1;min-height:0;object-fit:", ";"], function (props) {
  return FIT_MAP[props.fit];
});

// z-index is for Safari so controls aren't hidden
var StyledVideo = exports.StyledVideo = _styledComponents["default"].video.withConfig(_utils.styledComponentsConfig).withConfig({
  displayName: "StyledVideo",
  componentId: "sc-w4v8h9-0"
})(["max-width:100%;z-index:1;", " ::cue{background:", ";}", ";"], function (props) {
  return props.fit && fitStyle;
}, function (props) {
  return props.theme.video.captions.background;
}, function (props) {
  return props.theme.video && props.theme.video.extend;
});
var StyledVideoContainer = exports.StyledVideoContainer = _styledComponents["default"].div.withConfig(_utils.styledComponentsConfig).withConfig({
  displayName: "StyledVideo__StyledVideoContainer",
  componentId: "sc-w4v8h9-1"
})(["flex:1 1;display:flex;flex-direction:column;overflow:hidden;position:relative;", ";&:focus{", "}"], _utils.genericStyles, (0, _utils.focusStyle)());

// z-index is for Safari so controls aren't hidden
var positionStyle = (0, _styledComponents.css)(["position:absolute;left:0;right:0;bottom:0;z-index:1;"]);
var StyledVideoControls = exports.StyledVideoControls = _styledComponents["default"].div.withConfig(_utils.styledComponentsConfig).withConfig({
  displayName: "StyledVideo__StyledVideoControls",
  componentId: "sc-w4v8h9-2"
})(["flex:0 0;", " opacity:0;transition:opacity 0.3s;", ";"], function (props) {
  return props.over && positionStyle;
}, function (props) {
  return props.active ? 'opacity: 1;' : 'pointer-events: none';
});
var headStyle = (0, _styledComponents.css)(["::after{content:'';height:100%;width:", ";background:", ";position:absolute;left:", ";}"], function (props) {
  return props.theme.global.edgeSize.xsmall;
}, function (props) {
  return (0, _utils.normalizeColor)(props.theme.video.scrubber.color, props.theme);
}, function (props) {
  return props.value + "%";
});
var StyledVideoScrubber = exports.StyledVideoScrubber = _styledComponents["default"].div.withConfig(_utils.styledComponentsConfig).withConfig({
  displayName: "StyledVideo__StyledVideoScrubber",
  componentId: "sc-w4v8h9-3"
})(["cursor:pointer;width:100%;height:100%;", ";&:focus{", "}"], function (props) {
  return props.value && headStyle;
}, (0, _utils.focusStyle)());