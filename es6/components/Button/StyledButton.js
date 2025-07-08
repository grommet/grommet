import styled, { css } from 'styled-components';
import { activeStyle, backgroundStyle, disabledStyle, edgeStyle, focusStyle, unfocusStyle, genericStyles, getHoverIndicatorStyle, normalizeColor } from '../../utils';
import { elevationStyle, styledComponentsConfig } from '../../utils/styles';
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
  return css(["font-size:", ";line-height:", ";"], data.size, data.height);
};
var padStyle = function padStyle(props) {
  var size = props.sizeProp;
  if (size && props.theme.button.size && props.theme.button.size[size]) {
    return css(["", " ", ""], props.theme.button.size[size].pad.vertical, props.theme.button.size[size].pad.horizontal);
  }
  return css(["", " ", ""], props.theme.button.padding.vertical, props.theme.button.padding.horizontal);
};
var basicStyle = function basicStyle(props) {
  return css(["border:", " solid ", ";border-radius:", ";", " color:", ";padding:", ";", ""], props.theme.button.border.width, normalizeColor(props.colorValue || props.theme.button.border.color || 'control', props.theme), radiusStyle(props), props.theme.button.elevation && elevationStyle(props.theme.button.elevation), normalizeColor(props.theme.button.color || 'text', props.theme), padStyle(props), fontStyle(props));
};
var primaryStyle = function primaryStyle(props) {
  var _props$theme$button$p, _props$theme$button$p2;
  return css(["", " border-radius:", ";", " ", ""], backgroundStyle(normalizeColor(props.colorValue || props.theme.button.primary && props.theme.button.primary.color || 'control', props.theme), props.theme, props.theme.button.color), radiusStyle(props), ((_props$theme$button$p = props.theme.button.primary) == null ? void 0 : _props$theme$button$p.elevation) && elevationStyle((_props$theme$button$p2 = props.theme.button.primary) == null ? void 0 : _props$theme$button$p2.elevation), props.theme.button.primary && props.theme.button.primary.extend);
};
function getHoverColor(props) {
  if (props.colorValue) {
    return normalizeColor(props.colorValue, props.theme);
  }
  if (props.active && props.primary && props.theme.button.primary && props.theme.button.primary.active && props.theme.button.primary.active.border && props.theme.button.primary.active.border.color) {
    return normalizeColor(props.theme.button.primary.active.border.color, props.theme);
  }
  return normalizeColor(props.theme.button.border.color || 'control', props.theme);
}
var hoverStyle = css(["&:hover{", " ", ";}"], function (props) {
  return props.hoverIndicator && getHoverIndicatorStyle(props.hoverIndicator, props.theme);
}, function (props) {
  return !props.plain && css(["box-shadow:0px 0px 0px 2px ", ";"], getHoverColor(props));
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
  return css(["color:", ";outline:none;border:none;padding:0;text-align:inherit;"], normalizeColor(props.colorValue || 'inherit', props.theme));
};
var activeButtonStyle = function activeButtonStyle(props) {
  return css(["", " ", " ", ""], activeStyle, props.primary && props.theme.button.primary && props.theme.button.primary.active && props.theme.button.primary.active.border && props.theme.button.primary.active.border.color && "border: " + props.theme.button.border.width + " solid\n    " + normalizeColor(props.theme.button.primary.active.border.color, props.theme) + ";\n    ", props.primary && props.theme.button.primary && props.theme.button.primary.active && props.theme.button.primary.active.extend);
};
var disabledButtonStyle = function disabledButtonStyle(props) {
  return css(["", " ", " ", " ", ""], disabledStyle(props.theme.button.disabled.opacity), !props.plain && props.theme.button.disabled.border && props.theme.button.disabled.border.color && "border: " + props.theme.button.border.width + " solid\n    " + normalizeColor(props.theme.button.disabled.border.color, props.theme) + ";", props.theme.button.disabled.color && (
  // if primary button, apply disabled color to background. otherwise,
  // apply disabled color to the label
  props.primary ? backgroundStyle(normalizeColor(props.theme.button.disabled.color, props.theme), props.theme, props.theme.button.color) : "color: " + normalizeColor(props.theme.button.disabled.color, props.theme) + ";"), props.theme.button.disabled && props.theme.button.disabled.extend);
};

// Deprecate props.theme.button.disabled.opacity in V3
var StyledButton = styled.button.withConfig(styledComponentsConfig).withConfig({
  displayName: "StyledButton",
  componentId: "sc-323bzc-0"
})(["display:inline-block;box-sizing:border-box;cursor:pointer;font:inherit;text-decoration:none;margin:0;background:transparent;overflow:visible;text-transform:none;", " ", " ", " ", " ", " ", " ", " &:focus{", "}&:focus:not(:focus-visible){", "}", " ", " ", " ", " ", " ", " ", ""], genericStyles, function (props) {
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
  return (!props.plain || props.focusIndicator) && focusStyle({
    inset: props.focusIndicator === 'inset'
  });
}, unfocusStyle(), function (props) {
  return !props.plain && props.theme.button.transition && "\n    transition-property: " + props.theme.button.transition.properties.join(',') + ";\n    transition-duration: " + props.theme.button.transition.duration + "s;\n    transition-timing-function: " + props.theme.button.transition.timing + ";\n  ";
}, function (props) {
  return props.fillContainer && fillStyle(props.fillContainer);
}, function (props) {
  return props.hasIcon && !props.hasLabel && "\n    line-height: 0;\n  ";
}, function (props) {
  return props.pad === true && props.hasIcon && !props.hasLabel && "\n    padding: " + props.theme.global.edgeSize.small + ";\n  ";
}, function (props) {
  return !props.plain && props.pad && edgeStyle('padding', props.pad, false, undefined, props.theme);
}, function (props) {
  return props.theme.button && props.theme.button.extend;
}, function (props) {
  return (props.busy || props.success) && "\n    cursor: default;\n  ";
});
export { StyledButton };