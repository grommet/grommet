"use strict";

exports.__esModule = true;
exports.StyledCheckBoxToggle = exports.StyledCheckBoxKnob = exports.StyledCheckBoxInput = exports.StyledCheckBoxIcon = exports.StyledCheckBoxContainer = exports.StyledCheckBoxBox = exports.StyledCheckBox = void 0;
var _styledComponents = _interopRequireWildcard(require("styled-components"));
var _utils = require("../../utils");
var _defaultProps = require("../../default-props");
var _Box = require("../Box");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
// Note: since `fillStyle` is only used in one place, `justify-content` was
// added to it to simplify its logic. If this is ever reused somewhere else,
// consider the need of separating those once again.
var fillStyle = function fillStyle() {
  return "\n      width: auto;\n      height: 100%;\n      max-width: none;\n      flex: 1 0 auto;\n      justify-content: space-between;\n    ";
};
var disabledStyle = "\n  opacity: 0.5;\n  cursor: default;\n";
var hoverStyle = (0, _styledComponents.css)(["&:hover input:not([disabled]) + div,&:hover input:not([disabled]) + span{border-color:", ";", "}&:hover{background-color:", ";}"], function (props) {
  var _props$theme$checkBox;
  return (0, _utils.normalizeColor)((_props$theme$checkBox = props.theme.checkBox.hover) == null || (_props$theme$checkBox = _props$theme$checkBox.border) == null ? void 0 : _props$theme$checkBox.color, props.theme);
}, function (props) {
  var _props$theme$checkBox2;
  return (_props$theme$checkBox2 = props.theme.checkBox.hover) == null ? void 0 : _props$theme$checkBox2.extend;
}, function (props) {
  var _props$theme$checkBox3;
  return (0, _utils.normalizeColor)(!props.disabled && ((_props$theme$checkBox3 = props.theme.checkBox.hover) == null || (_props$theme$checkBox3 = _props$theme$checkBox3.background) == null ? void 0 : _props$theme$checkBox3.color), props.theme);
});
var StyledCheckBoxIcon = exports.StyledCheckBoxIcon = _styledComponents["default"].svg.withConfig(_utils.styledComponentsConfig).withConfig({
  displayName: "StyledCheckBox__StyledCheckBoxIcon",
  componentId: "sc-1dbk5ju-0"
})(["box-sizing:border-box;stroke-width:", ";stroke:", ";width:", ";height:", ";", ";"], function (props) {
  return props.theme.checkBox.check.thickness;
}, function (props) {
  return (0, _utils.normalizeColor)(props.theme.checkBox.color || 'control', props.theme);
}, function (props) {
  return props.theme.checkBox.icon.size || props.theme.checkBox.size;
}, function (props) {
  return props.theme.checkBox.icon.size || props.theme.checkBox.size;
}, function (props) {
  return props.theme.checkBox.icon.extend;
});
StyledCheckBoxIcon.defaultProps = {};
Object.setPrototypeOf(StyledCheckBoxIcon.defaultProps, _defaultProps.defaultProps);
var StyledCheckBoxContainer = exports.StyledCheckBoxContainer = _styledComponents["default"].label.withConfig(_utils.styledComponentsConfig).withConfig({
  displayName: "StyledCheckBox__StyledCheckBoxContainer",
  componentId: "sc-1dbk5ju-1"
})(["display:flex;flex-direction:row;align-items:", ";user-select:none;-webkit-user-select:none;", " ", " ", " ", " ", " ", " ", ""], function (props) {
  return typeof props.label === 'string' ? props.theme.checkBox.label.align : undefined;
}, function (props) {
  return props.fillProp ? fillStyle() : 'width: fit-content;';
}, function (props) {
  return (props.pad || props.theme.checkBox.pad) && (0, _utils.edgeStyle)('padding', props.pad || props.theme.checkBox.pad, props.responsive, props.theme.box.responsiveBreakpoint, props.theme);
}, function (props) {
  return props.disabled && disabledStyle;
}, function (props) {
  return !props.disabled && 'cursor: pointer;';
}, hoverStyle, function (props) {
  var _props$theme$checkBox4, _props$theme$checkBox5;
  return props.focus && !props.focusIndicator && "\n    input:not([disabled]) + div,\n    input:not([disabled]) + span {\n      border-color: " + (0, _utils.normalizeColor)((_props$theme$checkBox4 = props.theme.checkBox.hover) == null || (_props$theme$checkBox4 = _props$theme$checkBox4.border) == null ? void 0 : _props$theme$checkBox4.color, props.theme) + ";\n    }\n\n    background-color: " + (0, _utils.normalizeColor)(!props.disabled && ((_props$theme$checkBox5 = props.theme.checkBox.hover) == null || (_props$theme$checkBox5 = _props$theme$checkBox5.background) == null ? void 0 : _props$theme$checkBox5.color), props.theme) + ";";
}, function (props) {
  return props.theme.checkBox.extend;
});
StyledCheckBoxContainer.defaultProps = {};
Object.setPrototypeOf(StyledCheckBoxContainer.defaultProps, _defaultProps.defaultProps);
var StyledCheckBoxInput = exports.StyledCheckBoxInput = _styledComponents["default"].input.withConfig(_utils.styledComponentsConfig).withConfig({
  displayName: "StyledCheckBox__StyledCheckBoxInput",
  componentId: "sc-1dbk5ju-2"
})(["opacity:0;-moz-appearance:none;width:0;height:0;margin:0;", " &:checked + span > span{", ":calc( ", " - ", " );background:", ";}"], function (props) {
  return !props.disabled && 'cursor: pointer;';
}, function (props) {
  return !props.theme.dir ? 'left' : 'right';
}, function (props) {
  return props.theme.checkBox.toggle.size;
}, function (props) {
  return props.theme.checkBox.size;
}, function (props) {
  return (0, _utils.normalizeColor)(props.theme.checkBox.color || 'control', props.theme);
});
StyledCheckBoxInput.defaultProps = {};
Object.setPrototypeOf(StyledCheckBoxInput.defaultProps, _defaultProps.defaultProps);
var StyledCheckBoxBox = exports.StyledCheckBoxBox = (0, _styledComponents["default"])(_Box.Box).withConfig({
  displayName: "StyledCheckBox__StyledCheckBoxBox",
  componentId: "sc-1dbk5ju-3"
})(["", ";", ";"], function (props) {
  return props.focus && props.focusIndicator && (0, _utils.focusStyle)();
}, function (props) {
  return props.theme.checkBox.check.extend;
});
StyledCheckBoxBox.defaultProps = {};
Object.setPrototypeOf(StyledCheckBoxBox.defaultProps, _defaultProps.defaultProps);
var StyledCheckBoxToggle = exports.StyledCheckBoxToggle = _styledComponents["default"].span.withConfig(_utils.styledComponentsConfig).withConfig({
  displayName: "StyledCheckBox__StyledCheckBoxToggle",
  componentId: "sc-1dbk5ju-4"
})(["box-sizing:border-box;vertical-align:middle;display:inline-block;width:", ";height:", ";border:", " solid;border-color:", ";border-radius:", ";background-color:", ";", ";", ";"], function (props) {
  return props.theme.checkBox.toggle.size;
}, function (props) {
  return props.theme.checkBox.size;
}, function (props) {
  return props.theme.checkBox.border.width;
}, function (props) {
  return (0, _utils.normalizeColor)(props.theme.checkBox.border.color, props.theme);
}, function (props) {
  return props.theme.checkBox.toggle.radius;
}, function (props) {
  return props.theme.checkBox.toggle.background ? (0, _utils.normalizeColor)(props.theme.checkBox.toggle.background, props.theme) : 'transparent';
}, function (props) {
  return props.focus && props.focusIndicator && (0, _utils.focusStyle)();
}, function (props) {
  return props.theme.checkBox.toggle.extend;
});
StyledCheckBoxToggle.defaultProps = {};
Object.setPrototypeOf(StyledCheckBoxToggle.defaultProps, _defaultProps.defaultProps);
var StyledCheckBoxKnob = exports.StyledCheckBoxKnob = _styledComponents["default"].span.withConfig(_utils.styledComponentsConfig).withConfig({
  displayName: "StyledCheckBox__StyledCheckBoxKnob",
  componentId: "sc-1dbk5ju-5"
})(["box-sizing:border-box;position:relative;display:inherit;top:-", ";", ":-", ";transition:all 0.3s;width:", ";height:", ";background:", ";border-radius:", ";", ";"], function (props) {
  return props.theme.checkBox.border.width;
}, function (props) {
  return !props.theme.dir ? 'left' : 'right';
}, function (props) {
  return props.theme.checkBox.border.width;
}, function (props) {
  return props.theme.checkBox.size;
}, function (props) {
  return props.theme.checkBox.size;
}, function (props) {
  return (0, _utils.normalizeColor)(props.theme.checkBox.toggle.color, props.theme);
}, function (props) {
  return props.theme.checkBox.toggle.radius;
}, function (props) {
  return props.theme.checkBox.toggle.knob.extend;
});
StyledCheckBoxKnob.defaultProps = {};
Object.setPrototypeOf(StyledCheckBoxKnob.defaultProps, _defaultProps.defaultProps);
var StyledCheckBox = exports.StyledCheckBox = (0, _styledComponents["default"])(_Box.Box).withConfig({
  displayName: "StyledCheckBox",
  componentId: "sc-1dbk5ju-6"
})(["flex-shrink:0;"]);
StyledCheckBox.defaultProps = {};
Object.setPrototypeOf(StyledCheckBox.defaultProps, _defaultProps.defaultProps);