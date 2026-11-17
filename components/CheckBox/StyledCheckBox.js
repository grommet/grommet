"use strict";

exports.__esModule = true;
exports.StyledCheckBoxToggle = exports.StyledCheckBoxKnob = exports.StyledCheckBoxInput = exports.StyledCheckBoxIcon = exports.StyledCheckBoxContainer = exports.StyledCheckBoxBox = exports.StyledCheckBox = void 0;
var _styledComponents = _interopRequireWildcard(require("styled-components"));
var _utils = require("../../utils");
var _Box = require("../Box");
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, "default": e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } // SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
// Note: since `fillStyle` is only used in one place, `justify-content` was
// added to it to simplify its logic. If this is ever reused somewhere else,
// consider the need of separating those once again.
var fillStyle = function fillStyle() {
  return "\n      width: auto;\n      height: 100%;\n      max-width: none;\n      flex: 1 0 auto;\n      justify-content: space-between;\n    ";
};
var disabledStyle = "\n  opacity: 0.5;\n  cursor: default;\n";
var boxPartStyles = function boxPartStyles(part, props, container) {
  var _props$responsive;
  if (container === void 0) {
    container = false;
  }
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
  if (part.pad !== undefined && (!container || props.pad === undefined)) styles.push((0, _utils.edgeStyle)('padding', part.pad, responsive, theme.box.responsiveBreakpoint, theme));
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
  var _control$selected;
  var control = props.theme.checkBox.control;
  if (props.disabled) return undefined;
  var selected = props.checked || props.indeterminate;
  var state = selected ? control == null || (_control$selected = control.selected) == null ? void 0 : _control$selected.hover : control == null ? void 0 : control.hover;
  var part = _extends({}, state);
  if ((state == null ? void 0 : state.border) !== undefined) {
    var _control$selected2;
    var checkBox = props.theme.checkBox;
    var baseBorder = {
      size: checkBox.border.width,
      color: props.checked ? checkBox.color || 'control' : checkBox.border.color
    };
    part.border = _mergeControlBorder(_mergeControlBorder(_mergeControlBorder(baseBorder, control == null ? void 0 : control.border), selected ? control == null || (_control$selected2 = control.selected) == null ? void 0 : _control$selected2.border : undefined), state.border);
  }
  var styles = boxPartStyles(part, props);
  if ((state == null ? void 0 : state.background) != null) styles.push((0, _utils.backgroundStyle)(state.background, props.theme, false));
  if (props.focus && props.focusIndicator) styles.push((0, _utils.focusStyle)());
  if (styles.length === 0) return undefined;
  return (0, _styledComponents.css)(["input:not([disabled]) + ", "{", "}"],
  // eslint-disable-next-line no-use-before-define
  StyledCheckBoxBox, styles);
};
var containerBackgroundStyle = function containerBackgroundStyle(props) {
  var _container$hover, _container$hover2, _hover$background;
  var _props$theme$checkBox = props.theme.checkBox,
    container = _props$theme$checkBox.container,
    hover = _props$theme$checkBox.hover;
  var normalStyles = boxPartStyles(container || {}, props, true);
  var hoverContainer = _extends({}, container == null ? void 0 : container.hover);
  if (hoverContainer.border !== undefined) hoverContainer.border = _mergeControlBorder(container == null ? void 0 : container.border, hoverContainer.border);
  var hoverStyles = boxPartStyles(hoverContainer, props, true);
  if ((container == null ? void 0 : container.background) == null && (container == null || (_container$hover = container.hover) == null ? void 0 : _container$hover.background) == null && normalStyles.length === 0 && hoverStyles.length === 0) return undefined;
  var hoverBackground = (container == null || (_container$hover2 = container.hover) == null ? void 0 : _container$hover2.background) != null ? (0, _utils.backgroundStyle)(container.hover.background, props.theme, false) : (hover == null || (_hover$background = hover.background) == null ? void 0 : _hover$background.color) !== undefined && (0, _styledComponents.css)(["background-color:", ";"], (0, _utils.normalizeColor)(hover.background.color, props.theme));
  return (0, _styledComponents.css)(["", " ", " ", " ", ""], normalStyles.length > 0 && 'box-sizing: border-box;', normalStyles, (0, _utils.backgroundStyle)(container == null ? void 0 : container.background, props.theme, false), !props.disabled && (hoverBackground || hoverStyles.length > 0) && (0, _styledComponents.css)(["&:hover{", " ", "}", ""], hoverBackground, hoverStyles, props.focus && !props.focusIndicator && (0, _styledComponents.css)(["", " ", ""], hoverBackground, hoverStyles)));
};
var hoverStyle = (0, _styledComponents.css)(["&:hover input:not([disabled]) + div,&:hover input:not([disabled]) + span{border-color:", ";", "}&:hover{background-color:", ";}"], function (props) {
  var _props$theme$checkBox2;
  return (0, _utils.normalizeColor)((_props$theme$checkBox2 = props.theme.checkBox.hover) == null || (_props$theme$checkBox2 = _props$theme$checkBox2.border) == null ? void 0 : _props$theme$checkBox2.color, props.theme);
}, function (props) {
  var _props$theme$checkBox3;
  return (_props$theme$checkBox3 = props.theme.checkBox.hover) == null ? void 0 : _props$theme$checkBox3.extend;
}, function (props) {
  var _props$theme$checkBox4, _props$theme$checkBox5;
  return (0, _utils.normalizeColor)(!props.disabled && ((_props$theme$checkBox4 = props.theme.checkBox.container) == null || (_props$theme$checkBox4 = _props$theme$checkBox4.hover) == null ? void 0 : _props$theme$checkBox4.background) == null && ((_props$theme$checkBox5 = props.theme.checkBox.hover) == null || (_props$theme$checkBox5 = _props$theme$checkBox5.background) == null ? void 0 : _props$theme$checkBox5.color), props.theme);
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
var StyledCheckBoxContainer = exports.StyledCheckBoxContainer = _styledComponents["default"].label.withConfig(_utils.styledComponentsConfig).withConfig({
  displayName: "StyledCheckBox__StyledCheckBoxContainer",
  componentId: "sc-1dbk5ju-1"
})(["display:flex;flex-direction:row;align-items:", ";user-select:none;-webkit-user-select:none;", " ", " ", " ", " ", " ", " ", ""], function (props) {
  return typeof props.labelProp === 'string' ? props.theme.checkBox.label.align : undefined;
}, function (props) {
  return props.fillProp ? fillStyle() : 'width: fit-content;';
}, function (props) {
  return (props.pad || props.theme.checkBox.pad) && (0, _utils.edgeStyle)('padding', props.pad || props.theme.checkBox.pad, props.responsive, props.theme.box.responsiveBreakpoint, props.theme);
}, function (props) {
  return props.disabled && disabledStyle;
}, function (props) {
  return !props.disabled && 'cursor: pointer;';
}, hoverStyle, function (props) {
  var _props$theme$checkBox6, _props$theme$checkBox7, _props$theme$checkBox8;
  return props.focus && !props.focusIndicator && "\n    input:not([disabled]) + div,\n    input:not([disabled]) + span {\n      border-color: " + (0, _utils.normalizeColor)((_props$theme$checkBox6 = props.theme.checkBox.hover) == null || (_props$theme$checkBox6 = _props$theme$checkBox6.border) == null ? void 0 : _props$theme$checkBox6.color, props.theme) + ";\n    }\n\n    background-color: " + (0, _utils.normalizeColor)(!props.disabled && ((_props$theme$checkBox7 = props.theme.checkBox.container) == null || (_props$theme$checkBox7 = _props$theme$checkBox7.hover) == null ? void 0 : _props$theme$checkBox7.background) == null && ((_props$theme$checkBox8 = props.theme.checkBox.hover) == null || (_props$theme$checkBox8 = _props$theme$checkBox8.background) == null ? void 0 : _props$theme$checkBox8.color), props.theme) + ";";
}, function (props) {
  var controlStyle = controlHoverStyle(props);
  var containerStyle = containerBackgroundStyle(props);
  if (containerStyle) {
    return (0, _styledComponents.css)(["", " ", " ", ""], containerStyle, controlStyle && (0, _styledComponents.css)(["&:hover{", "}", ""], controlStyle, props.focus && !props.focusIndicator && controlStyle), props.theme.checkBox.extend);
  }
  return controlStyle ? (0, _styledComponents.css)(["&:hover{", "}", " ", ""], controlStyle, props.focus && !props.focusIndicator && controlStyle, props.theme.checkBox.extend) : props.theme.checkBox.extend;
});
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
var StyledCheckBoxBox = exports.StyledCheckBoxBox = (0, _styledComponents["default"])(_Box.Box).withConfig({
  displayName: "StyledCheckBox__StyledCheckBoxBox",
  componentId: "sc-1dbk5ju-3"
})(["", ";"], function (props) {
  var _selectedState$backgr;
  var _props$theme$checkBox9 = props.theme.checkBox,
    control = _props$theme$checkBox9.control,
    check = _props$theme$checkBox9.check;
  var selected = props.checked || props.indeterminate;
  var selectedState = selected ? control == null ? void 0 : control.selected : undefined;
  var focus = props.focus && props.focusIndicator && (0, _utils.focusStyle)();
  var part = _extends({}, control, selectedState);
  if ((control == null ? void 0 : control.border) !== undefined || (selectedState == null ? void 0 : selectedState.border) !== undefined) part.border = _mergeControlBorder(_mergeControlBorder(props.border, control == null ? void 0 : control.border), selectedState == null ? void 0 : selectedState.border);
  var partStyles = boxPartStyles(part, props);
  var background = (_selectedState$backgr = selectedState == null ? void 0 : selectedState.background) != null ? _selectedState$backgr : control == null ? void 0 : control.background;
  if (background != null) {
    return (0, _styledComponents.css)(["", " ", " ", " ", ""], partStyles, (0, _utils.backgroundStyle)(background, props.theme, false), focus, check.extend);
  }
  if (partStyles.length === 0) return focus ? (0, _styledComponents.css)(["", " ", ""], focus, check.extend) : check.extend;
  return (0, _styledComponents.css)(["", " ", " ", ""], partStyles, focus, check.extend);
});
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
var StyledCheckBox = exports.StyledCheckBox = (0, _styledComponents["default"])(_Box.Box).withConfig({
  displayName: "StyledCheckBox",
  componentId: "sc-1dbk5ju-6"
})(["flex-shrink:0;"]);