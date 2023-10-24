"use strict";

exports.__esModule = true;
exports.StyledAnchor = void 0;
var _styledComponents = _interopRequireWildcard(require("styled-components"));
var _utils = require("../../utils");
var _defaultProps = require("../../default-props");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var disabledStyle = "\n  opacity: 0.3;\n  cursor: default;\n  text-decoration: none;\n";
var sizeStyle = function sizeStyle(props) {
  if (props.size) {
    var size = props.size || 'medium';
    var data = props.theme.text[size];
    return (0, _styledComponents.css)(["font-size:", ";line-height:", ";"], data ? data.size : size, data ? data.height : 'normal');
  }
  return (0, _styledComponents.css)(["font-size:inherit;line-height:inherit;"]);
};
var StyledAnchor = exports.StyledAnchor = _styledComponents["default"].a.withConfig(_utils.styledComponentsConfig).withConfig({
  displayName: "StyledAnchor",
  componentId: "sc-1rp7lwl-0"
})(["box-sizing:border-box;", " color:", ";", " text-decoration:", ";cursor:pointer;", " ", " ", " ", " ", " ", ""], function (props) {
  return sizeStyle(props);
}, function (props) {
  var _props$theme$anchor;
  return (0, _utils.normalizeColor)(props.colorProp || ((_props$theme$anchor = props.theme.anchor) == null || (_props$theme$anchor = _props$theme$anchor.size) == null || (_props$theme$anchor = _props$theme$anchor[props.size]) == null ? void 0 : _props$theme$anchor.color) || props.theme.anchor.color, props.theme);
}, function (props) {
  var _props$theme$anchor2, _props$theme$anchor3;
  return props.weight ? "font-weight: " + props.weight + ";" : (((_props$theme$anchor2 = props.theme.anchor) == null || (_props$theme$anchor2 = _props$theme$anchor2.size) == null || (_props$theme$anchor2 = _props$theme$anchor2[props.size]) == null ? void 0 : _props$theme$anchor2.fontWeight) || props.theme.anchor.fontWeight) && "font-weight: " + (((_props$theme$anchor3 = props.theme.anchor) == null || (_props$theme$anchor3 = _props$theme$anchor3.size) == null || (_props$theme$anchor3 = _props$theme$anchor3[props.size]) == null ? void 0 : _props$theme$anchor3.fontWeight) || props.theme.anchor.fontWeight) + ";";
}, function (props) {
  var _props$theme$anchor4;
  return props.hasIcon ? 'none' : ((_props$theme$anchor4 = props.theme.anchor) == null || (_props$theme$anchor4 = _props$theme$anchor4.size) == null || (_props$theme$anchor4 = _props$theme$anchor4[props.size]) == null ? void 0 : _props$theme$anchor4.textDecoration) || props.theme.anchor.textDecoration;
}, _utils.genericStyles, function (props) {
  return !props.disabled && props.theme.anchor.hover && (0, _styledComponents.css)(["&:hover{", " ", " ", "}"], props.theme.anchor.hover.textDecoration && "text-decoration: " + props.theme.anchor.hover.textDecoration + ";", props.theme.anchor.hover.fontWeight && "font-weight: " + props.theme.anchor.hover.fontWeight + ";", props.theme.anchor.hover.extend);
}, function (props) {
  return props.hasIcon && !props.hasLabel && "\n    padding: " + props.theme.global.edgeSize.small + ";\n  ";
}, function (props) {
  return props.disabled && disabledStyle;
}, function (props) {
  return props.focus && (0, _utils.focusStyle)();
}, function (props) {
  return props.theme.anchor.extend;
});
StyledAnchor.defaultProps = {};
Object.setPrototypeOf(StyledAnchor.defaultProps, _defaultProps.defaultProps);