"use strict";

exports.__esModule = true;
exports.StyledRadioButtonLabel = exports.StyledRadioButtonInput = exports.StyledRadioButtonIcon = exports.StyledRadioButtonContainer = exports.StyledRadioButtonBox = exports.StyledRadioButton = void 0;
var _styledComponents = _interopRequireWildcard(require("styled-components"));
var _utils = require("../../utils");
var _Box = require("../Box");
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, "default": e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } // SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
var disabledStyle = "\n  opacity: 0.5;\n  cursor: default;\n";
var boxPartStyles = function boxPartStyles(part, props) {
  var _props$responsive;
  var theme = props.theme;
  var responsive = (_props$responsive = props.responsive) != null ? _props$responsive : true;
  var styles = [];
  if (part.border !== undefined) {
    if (part.border === false) styles.push('border: none;');else {
      if ((0, _utils.hasSideSpecificBorder)(part.border)) styles.push('border: none;');
      styles.push((0, _utils.borderStyle)(part.border, responsive, theme));
    }
  }
  if (part.elevation !== undefined) styles.push((0, _utils.elevationStyle)(part.elevation));
  if (part.height !== undefined) styles.push((0, _utils.heightStyle)(part.height, theme));
  if (part.width !== undefined) styles.push((0, _utils.widthStyle)(part.width, theme));
  if (part.margin !== undefined) styles.push((0, _utils.edgeStyle)('margin', part.margin, responsive, theme.box.responsiveBreakpoint, theme));
  if (part.pad !== undefined) styles.push((0, _utils.edgeStyle)('padding', part.pad, responsive, theme.box.responsiveBreakpoint, theme));
  if (part.round !== undefined) styles.push(part.round === false ? 'border-radius: 0;' : (0, _utils.roundStyle)(part.round, responsive, theme));
  return styles;
};
var _mergeControlBorder = function mergeControlBorder(base, override) {
  if (override === undefined) return base;
  if (Array.isArray(base) && override && typeof override === 'object' && !Array.isArray(override) && !override.side) return base.map(function (part) {
    return _mergeControlBorder(part, override);
  });
  if (base && override && typeof base === 'object' && typeof override === 'object' && !Array.isArray(base) && !Array.isArray(override)) return _extends({}, base, override);
  if (typeof base === 'string' && override && typeof override === 'object' && !Array.isArray(override)) return _extends({
    side: base
  }, override);
  return override;
};
var controlHoverStyle = function controlHoverStyle(props) {
  var _control$selected2;
  var control = props.theme.radioButton.control;
  if (props.disabled) return undefined;
  var stateStyle = function stateStyle(state, checked) {
    var part = _extends({}, state);
    if ((state == null ? void 0 : state.border) !== undefined) {
      var _control$selected;
      var radioButton = props.theme.radioButton;
      var baseBorder = {
        size: radioButton.border.width,
        color: checked ? radioButton.color || 'control' : radioButton.border.color
      };
      part.border = _mergeControlBorder(_mergeControlBorder(_mergeControlBorder(baseBorder, control == null ? void 0 : control.border), checked ? control == null || (_control$selected = control.selected) == null ? void 0 : _control$selected.border : undefined), state.border);
    }
    var styles = boxPartStyles(part, props);
    if ((state == null ? void 0 : state.background) != null) styles.push((0, _utils.backgroundStyle)(state.background, props.theme, false));
    if (props.$keyboardFocus) styles.push((0, _utils.focusStyle)());
    return styles.length > 0 ? (0, _styledComponents.css)(["", ""], styles) : undefined;
  };
  var normal = stateStyle(control == null ? void 0 : control.hover, false);
  var selected = stateStyle(control == null || (_control$selected2 = control.selected) == null ? void 0 : _control$selected2.hover, true);
  if (normal === undefined && selected === undefined) return undefined;
  return (0, _styledComponents.css)(["", " ", ""], normal && (0, _styledComponents.css)(["input:not([disabled]):not(:checked) + ", "{", "}"],
  // eslint-disable-next-line no-use-before-define
  StyledRadioButtonBox, normal), selected && (0, _styledComponents.css)(["input:not([disabled]):checked + ", "{", "}"],
  // eslint-disable-next-line no-use-before-define
  StyledRadioButtonBox, selected));
};
var containerBackgroundStyle = function containerBackgroundStyle(props) {
  var _container$hover, _container$hover2, _hover$background;
  var _props$theme$radioBut = props.theme.radioButton,
    container = _props$theme$radioBut.container,
    hover = _props$theme$radioBut.hover;
  var normalStyles = boxPartStyles(container, props);
  var hoverStyles = boxPartStyles(container.hover || {}, props);
  if (container.background == null && ((_container$hover = container.hover) == null ? void 0 : _container$hover.background) == null && normalStyles.length === 0 && hoverStyles.length === 0) return undefined;
  var hoverBackground = ((_container$hover2 = container.hover) == null ? void 0 : _container$hover2.background) != null ? (0, _utils.backgroundStyle)(container.hover.background, props.theme, false) : (hover == null || (_hover$background = hover.background) == null ? void 0 : _hover$background.color) !== undefined && (0, _styledComponents.css)(["background-color:", ";"], (0, _utils.normalizeColor)(hover.background.color, props.theme));
  return (0, _styledComponents.css)(["", " ", " ", " ", ""], normalStyles.length > 0 && 'box-sizing: border-box;', normalStyles, (0, _utils.backgroundStyle)(container.background, props.theme, false), !props.disabled && (hoverBackground || hoverStyles.length > 0) && (0, _styledComponents.css)(["&:hover{", " ", "}", ""], hoverBackground, hoverStyles, props.focus && !props.focusIndicator && (0, _styledComponents.css)(["", " ", ""], hoverBackground, hoverStyles)));
};
var StyledRadioButtonContainer = exports.StyledRadioButtonContainer = _styledComponents["default"].label.withConfig(_utils.styledComponentsConfig).withConfig({
  displayName: "StyledRadioButton__StyledRadioButtonContainer",
  componentId: "sc-g1f6ld-0"
})(["display:flex;flex-direction:row;align-items:center;user-select:none;width:fit-content;", " ", " &:hover input:not([disabled]) + div,&:hover input:not([disabled]) + span{border-color:", ";}&:hover{background-color:", ";}", " ", ";"], function (props) {
  return props.disabled && disabledStyle;
}, function (props) {
  return !props.disabled && 'cursor: pointer;';
}, function (props) {
  return (0, _utils.normalizeColor)(props.theme.radioButton.hover.border.color, props.theme);
}, function (props) {
  var _props$theme$radioBut2;
  return (0, _utils.normalizeColor)(!props.disabled && ((_props$theme$radioBut2 = props.theme.radioButton.container.hover) == null ? void 0 : _props$theme$radioBut2.background) == null && props.theme.radioButton.hover && props.theme.radioButton.hover.background && props.theme.radioButton.hover.background.color, props.theme);
}, function (props) {
  var _props$theme$radioBut3;
  return props.focus && !props.focusIndicator && "\n      input:not([disabled]) + div,\n      input:not([disabled]) + span {\n      border-color: " + (0, _utils.normalizeColor)(props.theme.radioButton.hover.border.color, props.theme) + ";\n    }\n    background-color: " + (0, _utils.normalizeColor)(!props.disabled && ((_props$theme$radioBut3 = props.theme.radioButton.container.hover) == null ? void 0 : _props$theme$radioBut3.background) == null && props.theme.radioButton.hover && props.theme.radioButton.hover.background && props.theme.radioButton.hover.background.color, props.theme) + ";\n    ";
}, function (props) {
  var controlStyle = controlHoverStyle(props);
  var containerStyle = containerBackgroundStyle(props);
  if (containerStyle) {
    return (0, _styledComponents.css)(["", " ", " ", ""], containerStyle, controlStyle && (0, _styledComponents.css)(["&:hover{", "}", ""], controlStyle, props.focus && !props.focusIndicator && controlStyle), props.theme.radioButton.container.extend);
  }
  return controlStyle ? (0, _styledComponents.css)(["&:hover{", "}", " ", ""], controlStyle, props.focus && !props.focusIndicator && controlStyle, props.theme.radioButton.container.extend) : props.theme.radioButton.container.extend;
});
var StyledRadioButtonInput = exports.StyledRadioButtonInput = _styledComponents["default"].input.withConfig(_utils.styledComponentsConfig).withConfig({
  displayName: "StyledRadioButton__StyledRadioButtonInput",
  componentId: "sc-g1f6ld-1"
})(["opacity:0;-moz-appearance:none;width:0;height:0;margin:0;", ";"], function (props) {
  return !props.disabled && 'cursor: pointer;';
});
var StyledRadioButtonLabel = exports.StyledRadioButtonLabel = _styledComponents["default"].span.withConfig(_utils.styledComponentsConfig).withConfig({
  displayName: "StyledRadioButton__StyledRadioButtonLabel",
  componentId: "sc-g1f6ld-2"
})(["", ""], function (props) {
  return props.theme.radioButton.font.weight && (0, _styledComponents.css)(["font-weight:", ";"], props.theme.radioButton.font.weight);
});
var StyledRadioButtonIcon = exports.StyledRadioButtonIcon = _styledComponents["default"].svg.withConfig(_utils.styledComponentsConfig).withConfig({
  displayName: "StyledRadioButton__StyledRadioButtonIcon",
  componentId: "sc-g1f6ld-3"
})(["box-sizing:border-box;width:", ";height:", ";fill:", ";transform:scale(1);", ";"], function (props) {
  return props.theme.radioButton.icon.size || props.theme.radioButton.size;
}, function (props) {
  return props.theme.radioButton.icon.size || props.theme.radioButton.size;
}, function (props) {
  return (0, _utils.normalizeColor)(props.theme.radioButton.check.color || 'control', props.theme);
}, function (props) {
  return props.theme.radioButton.icon.extend;
});
var StyledRadioButtonBox = exports.StyledRadioButtonBox = (0, _styledComponents["default"])(_Box.Box).withConfig({
  displayName: "StyledRadioButton__StyledRadioButtonBox",
  componentId: "sc-g1f6ld-4"
})(["background-color:", ";transform:scale(1);", ";"], function (props) {
  return props.backgroundColor;
}, function (props) {
  var _check$background;
  var _props$theme$radioBut4 = props.theme.radioButton,
    control = _props$theme$radioBut4.control,
    check = _props$theme$radioBut4.check;
  var selected = props.$checked ? control == null ? void 0 : control.selected : undefined;
  var focus = props.focus && (0, _utils.focusStyle)();
  var part = _extends({}, control, selected);
  if ((control == null ? void 0 : control.border) !== undefined || (selected == null ? void 0 : selected.border) !== undefined) part.border = _mergeControlBorder(_mergeControlBorder(props.border, control == null ? void 0 : control.border), selected == null ? void 0 : selected.border);
  var styles = boxPartStyles(part, props);
  if (props.$checked === undefined && (control != null && control.selected || (_check$background = check.background) != null && _check$background.color)) {
    var _control$selected3, _control$selected4, _ref, _control$selected$bac, _control$selected5, _check$background2;
    var selectedPart = _extends({}, control, control == null ? void 0 : control.selected);
    if ((control == null ? void 0 : control.border) !== undefined || (control == null || (_control$selected3 = control.selected) == null ? void 0 : _control$selected3.border) !== undefined) selectedPart.border = _mergeControlBorder(_mergeControlBorder(props.border, control == null ? void 0 : control.border), control == null || (_control$selected4 = control.selected) == null ? void 0 : _control$selected4.border);
    var selectedBackground = (_ref = (_control$selected$bac = control == null || (_control$selected5 = control.selected) == null ? void 0 : _control$selected5.background) != null ? _control$selected$bac : (_check$background2 = check.background) == null ? void 0 : _check$background2.color) != null ? _ref : control == null ? void 0 : control.background;
    styles.push((0, _styledComponents.css)(["input:checked + &{", " ", " ", " ", "}"], boxPartStyles(selectedPart, props), selectedBackground != null && (0, _utils.backgroundStyle)(selectedBackground, props.theme, false), focus, check.extend));
  }
  if (props.$controlBackground != null) return (0, _styledComponents.css)(["", " ", " ", " ", ""], styles, (0, _utils.backgroundStyle)(props.$controlBackground, props.theme, false), focus, check.extend);
  if (styles.length === 0) return focus ? (0, _styledComponents.css)(["", " ", ""], focus, check.extend) : check.extend;
  return (0, _styledComponents.css)(["", " ", " ", ""], styles, focus, check.extend);
});
var StyledRadioButton = exports.StyledRadioButton = (0, _styledComponents["default"])(_Box.Box).withConfig({
  displayName: "StyledRadioButton",
  componentId: "sc-g1f6ld-5"
})(["", ";"], function (props) {
  return props.theme.radioButton && props.theme.radioButton.extend;
});