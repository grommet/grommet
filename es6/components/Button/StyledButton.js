import styled, { css } from 'styled-components';
import { activeStyle, backgroundStyle, disabledStyle, focusStyle, genericStyles, normalizeColor } from '../../utils';
import { defaultProps } from '../../default-props';

var basicStyle = function basicStyle(props) {
  return css(["border:", " solid ", ";border-radius:", ";color:", ";padding:", " ", ";font-size:", ";line-height:", ";"], props.theme.button.border.width, normalizeColor(props.colorValue || props.theme.button.border.color || 'control', props.theme), props.theme.button.border.radius, normalizeColor(props.theme.button.color || 'text', props.theme), props.theme.button.padding.vertical, props.theme.button.padding.horizontal, props.theme.text.medium.size, props.theme.text.medium.height);
};

var primaryStyle = function primaryStyle(props) {
  return css(["", " border-radius:", ";"], backgroundStyle(normalizeColor(props.colorValue || props.theme.button.primary.color || 'control', props.theme), props.theme, props.theme.button.color), props.theme.button.border.radius);
};

function getHoverColor(props) {
  if (props.colorValue) {
    return normalizeColor(props.colorValue, props.theme);
  }

  return normalizeColor(props.theme.button.border.color || 'control', props.theme);
}

function getHoverIndicatorStyle(hoverIndicator, theme) {
  var background;

  if (hoverIndicator === true || hoverIndicator === 'background') {
    background = theme.global.hover.background;
  } else {
    background = hoverIndicator;
  }

  return css(["", " color:", ";"], backgroundStyle(background, theme), normalizeColor(theme.global.hover.color, theme));
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
  return css(["color:", ";border:none;padding:0;text-align:inherit;"], normalizeColor(props.colorValue || 'inherit', props.theme));
}; // Deprecate props.theme.button.disabled.opacity in V3


var StyledButton = styled.button.withConfig({
  displayName: "StyledButton",
  componentId: "sc-323bzc-0"
})(["display:inline-block;box-sizing:border-box;cursor:pointer;outline:none;font:inherit;text-decoration:none;margin:0;background:transparent;overflow:visible;text-transform:none;", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", ""], genericStyles, function (props) {
  return props.plain && plainStyle(props);
}, function (props) {
  return !props.plain && basicStyle(props);
}, function (props) {
  return props.primary && primaryStyle(props);
}, function (props) {
  return !props.disabled && !props.focus && hoverStyle;
}, function (props) {
  return !props.disabled && props.active && activeStyle;
}, function (props) {
  return props.disabled && disabledStyle(props.theme.button.disabled && props.theme.button.disabled.opacity);
}, function (props) {
  return props.focus && (!props.plain || props.focusIndicator) && focusStyle;
}, function (props) {
  return !props.plain && "\n    transition: 0.1s ease-in-out;\n  ";
}, function (props) {
  return props.fillContainer && fillStyle(props.fillContainer);
}, function (props) {
  return props.hasIcon && !props.hasLabel && "\n    line-height: 0;\n  ";
}, function (props) {
  return props.pad && props.hasIcon && !props.hasLabel && "\npadding: " + props.theme.global.edgeSize.small + ";\n";
}, function (props) {
  return props.theme.button.extend;
});
StyledButton.defaultProps = {};
Object.setPrototypeOf(StyledButton.defaultProps, defaultProps);
export { StyledButton };