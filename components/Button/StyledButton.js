"use strict";

exports.__esModule = true;
exports.StyledButton = void 0;
var _styledComponents = _interopRequireWildcard(require("styled-components"));
var _utils = require("../../utils");
var _styles = require("../../utils/styles");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
var radiusStyle = function radiusStyle(props) {
  // border.radius shouldn't impact an only-icon rendering.
  var isIconOnly = props.hasIcon && !props.hasLabel;
  var size = props.sizeProp;
  if (!isIconOnly && size && props.theme.button.size && props.theme.button.size[size]) {
    return props.theme.button.size[size].border.radius;
  }
  return props.theme.button.border.radius;
};
var fontStyle = function fontStyle(props) {
  var size = props.sizeProp || 'medium';
  var data = props.theme.text[size];
  return (0, _styledComponents.css)(["font-size:", ";line-height:", ";"], data.size, data.height);
};
var padStyle = function padStyle(props) {
  var size = props.sizeProp;
  if (size && props.theme.button.size && props.theme.button.size[size]) {
    return (0, _styledComponents.css)(["", " ", ""], props.theme.button.size[size].pad.vertical, props.theme.button.size[size].pad.horizontal);
  }
  return (0, _styledComponents.css)(["", " ", ""], props.theme.button.padding.vertical, props.theme.button.padding.horizontal);
};
var basicStyle = function basicStyle(props) {
  return (0, _styledComponents.css)(["border:", " solid ", ";border-radius:", ";", " color:", ";padding:", ";", ""], props.theme.button.border.width, (0, _utils.normalizeColor)(props.colorValue || props.theme.button.border.color || 'control', props.theme), radiusStyle(props), props.theme.button.elevation && (0, _styles.elevationStyle)(props.theme.button.elevation), (0, _utils.normalizeColor)(props.theme.button.color || 'text', props.theme), padStyle(props), fontStyle(props));
};
var primaryStyle = function primaryStyle(props) {
  var _props$theme$button$p, _props$theme$button$p2;
  return (0, _styledComponents.css)(["", " border-radius:", ";", " ", ""], (0, _utils.backgroundStyle)((0, _utils.normalizeColor)(props.colorValue || props.theme.button.primary && props.theme.button.primary.color || 'control', props.theme), props.theme, props.theme.button.color), radiusStyle(props), ((_props$theme$button$p = props.theme.button.primary) == null ? void 0 : _props$theme$button$p.elevation) && (0, _styles.elevationStyle)((_props$theme$button$p2 = props.theme.button.primary) == null ? void 0 : _props$theme$button$p2.elevation), props.theme.button.primary && props.theme.button.primary.extend);
};
function getHoverColor(props) {
  if (props.colorValue) {
    return (0, _utils.normalizeColor)(props.colorValue, props.theme);
  }
  if (props.active && props.primary && props.theme.button.primary && props.theme.button.primary.active && props.theme.button.primary.active.border && props.theme.button.primary.active.border.color) {
    return (0, _utils.normalizeColor)(props.theme.button.primary.active.border.color, props.theme);
  }
  return (0, _utils.normalizeColor)(props.theme.button.border.color || 'control', props.theme);
}
var hoverStyle = (0, _styledComponents.css)(["&:hover{", " ", ";}"], function (props) {
  return props.hoverIndicator && (0, _utils.getHoverIndicatorStyle)(props.hoverIndicator, props.theme);
}, function (props) {
  return !props.plain && (0, _styledComponents.css)(["box-shadow:0px 0px 0px 2px ", ";"], getHoverColor(props));
});
var fillStyle = function fillStyle(fillContainer) {
  if (fillContainer === 'horizontal') {
    return 'width: 100%;';
  }
  if (fillContainer === 'vertical') {
    return 'height: 100%;';
  }
  if (fillContainer) {
    return "\n      width: 100%;\n      height: 100%;\n      max-width: none;\n      flex: 1 0 auto;\n    ";
  }
  return undefined;
};
var plainStyle = function plainStyle(props) {
  return (0, _styledComponents.css)(["color:", ";outline:none;border:none;padding:0;text-align:inherit;"], (0, _utils.normalizeColor)(props.colorValue || 'inherit', props.theme));
};
var activeButtonStyle = function activeButtonStyle(props) {
  return (0, _styledComponents.css)(["", " ", " ", ""], _utils.activeStyle, props.primary && props.theme.button.primary && props.theme.button.primary.active && props.theme.button.primary.active.border && props.theme.button.primary.active.border.color && "border: " + props.theme.button.border.width + " solid\n    " + (0, _utils.normalizeColor)(props.theme.button.primary.active.border.color, props.theme) + ";\n    ", props.primary && props.theme.button.primary && props.theme.button.primary.active && props.theme.button.primary.active.extend);
};
var disabledButtonStyle = function disabledButtonStyle(props) {
  return (0, _styledComponents.css)(["", " ", " ", " ", ""], (0, _utils.disabledStyle)(props.theme.button.disabled.opacity), !props.plain && props.theme.button.disabled.border && props.theme.button.disabled.border.color && "border: " + props.theme.button.border.width + " solid\n    " + (0, _utils.normalizeColor)(props.theme.button.disabled.border.color, props.theme) + ";", props.theme.button.disabled.color && (
  // if primary button, apply disabled color to background. otherwise,
  // apply disabled color to the label
  props.primary ? (0, _utils.backgroundStyle)((0, _utils.normalizeColor)(props.theme.button.disabled.color, props.theme), props.theme, props.theme.button.color) : "color: " + (0, _utils.normalizeColor)(props.theme.button.disabled.color, props.theme) + ";"), props.theme.button.disabled && props.theme.button.disabled.extend);
};

// Deprecate props.theme.button.disabled.opacity in V3
var StyledButton = exports.StyledButton = _styledComponents["default"].button.withConfig(_styles.styledComponentsConfig).withConfig({
  displayName: "StyledButton",
  componentId: "sc-323bzc-0"
})(["display:inline-block;box-sizing:border-box;cursor:pointer;font:inherit;text-decoration:none;margin:0;background:transparent;overflow:visible;text-transform:none;", " ", " ", " ", " ", " ", " ", " &:focus{", "}&:focus:not(:focus-visible){", "}", " ", " ", " ", " ", " ", " ", ""], _utils.genericStyles, function (props) {
  return props.plain && plainStyle(props);
}, function (props) {
  return !props.plain && basicStyle(props);
}, function (props) {
  return props.primary && primaryStyle(props);
}, function (props) {
  return !props.disabled && !props.selected && !props.focus && !props.busy && !props.success && hoverStyle;
}, function (props) {
  return !props.disabled && props.active && activeButtonStyle(props);
}, function (props) {
  return props.disabled && props.theme.button && props.theme.button.disabled && disabledButtonStyle(props);
}, function (props) {
  return (!props.plain || props.focusIndicator) && (0, _utils.focusStyle)({
    inset: props.focusIndicator === 'inset'
  });
}, (0, _utils.unfocusStyle)(), function (props) {
  return !props.plain && props.theme.button.transition && "\n    transition-property: " + props.theme.button.transition.properties.join(',') + ";\n    transition-duration: " + props.theme.button.transition.duration + "s;\n    transition-timing-function: " + props.theme.button.transition.timing + ";\n  ";
}, function (props) {
  return props.fillContainer && fillStyle(props.fillContainer);
}, function (props) {
  return props.hasIcon && !props.hasLabel && "\n    line-height: 0;\n  ";
}, function (props) {
  return props.pad === true && props.hasIcon && !props.hasLabel && "\n    padding: " + props.theme.global.edgeSize.small + ";\n  ";
}, function (props) {
  return !props.plain && props.pad && (0, _utils.edgeStyle)('padding', props.pad, false, undefined, props.theme);
}, function (props) {
  return props.theme.button && props.theme.button.extend;
}, function (props) {
  return (props.busy || props.success) && "\n    cursor: default;\n  ";
});