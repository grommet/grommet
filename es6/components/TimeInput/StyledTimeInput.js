import styled, { css } from 'styled-components';
import { disabledStyle, edgeStyle, focusStyle, inputStyle, normalizeColor, parseMetricToNum, plainInputStyle, readOnlyStyle, styledComponentsConfig } from '../../utils';
import { Box } from '../Box';
export var StyledTimeInputContainer = styled(Box).withConfig({
  // Keep Box styling props like border and round flowing into Box.
  shouldForwardProp: function shouldForwardProp(prop) {
    return prop !== 'disabled' && prop !== 'readOnlyProp';
  }
}).withConfig({
  displayName: "StyledTimeInput__StyledTimeInputContainer",
  componentId: "sc-xktdr3-0"
})(["", " ", " ", ""], function (props) {
  return props.disabled && disabledStyle();
}, function (props) {
  return props.readOnlyProp && readOnlyStyle(props.theme);
}, function (props) {
  return props.focusIndicator !== false && css(["&:focus-within{", "}"], focusStyle());
});
export var StyledTimeInput = styled.input.withConfig(styledComponentsConfig).withConfig({
  displayName: "StyledTimeInput",
  componentId: "sc-xktdr3-1"
})(["", " ", " position:relative;pointer-events:none;color:transparent;caret-color:transparent;text-shadow:none;&::selection{background:transparent;color:transparent;}&::placeholder{color:transparent;}"], inputStyle, plainInputStyle);
export var StyledTimeInputField = styled.div.withConfig(styledComponentsConfig).withConfig({
  displayName: "StyledTimeInput__StyledTimeInputField",
  componentId: "sc-xktdr3-2"
})(["position:relative;flex:1 1 auto;min-width:0;"]);
export var StyledTimeInputDisplay = styled.div.withConfig(styledComponentsConfig).withConfig({
  displayName: "StyledTimeInput__StyledTimeInputDisplay",
  componentId: "sc-xktdr3-3"
})(["position:absolute;inset:0;display:flex;align-items:center;overflow:hidden;", ""], function (props) {
  return props.theme.global.input.padding && (typeof props.theme.global.input.padding !== 'object' ? "padding: " + (parseMetricToNum(props.theme.global.edgeSize[props.theme.global.input.padding] || props.theme.global.input.padding) - parseMetricToNum(props.theme.global.control.border.width)) + "px;" : edgeStyle('padding', props.theme.global.input.padding, props.responsive, props.theme.box.responsiveBreakpoint, props.theme));
});
export var StyledTimeInputSeparator = styled.span.withConfig(styledComponentsConfig).withConfig({
  displayName: "StyledTimeInput__StyledTimeInputSeparator",
  componentId: "sc-xktdr3-4"
})(["display:inline-flex;align-items:center;line-height:inherit;color:", ";", ""], function (props) {
  return normalizeColor(props.$filled ? 'text' : props.theme.global.colors.placeholder, props.theme);
}, function (props) {
  var weight = props.theme.global.input.weight || props.theme.global.input.font.weight;
  return weight && "font-weight: " + weight + ";";
});
export var StyledTimeInputSegment = styled.span.withConfig(styledComponentsConfig).withConfig({
  displayName: "StyledTimeInput__StyledTimeInputSegment",
  componentId: "sc-xktdr3-5"
})(["&:focus{outline:none;}display:inline-flex;align-items:center;position:relative;line-height:inherit;padding-inline:", ";color:", ";", " ", ""], function (props) {
  var _props$theme$timeInpu, _props$theme$global$e;
  var padToken = (_props$theme$timeInpu = props.theme.timeInput) == null || (_props$theme$timeInpu = _props$theme$timeInpu.active) == null ? void 0 : _props$theme$timeInpu.pad;
  return ((_props$theme$global$e = props.theme.global.edgeSize) == null ? void 0 : _props$theme$global$e[padToken]) || padToken;
}, function (props) {
  return normalizeColor(props.$filled ? 'text' : props.theme.global.colors.placeholder, props.theme);
}, function (props) {
  var weight = props.theme.global.input.weight || props.theme.global.input.font.weight;
  return weight && "font-weight: " + weight + ";";
}, function (props) {
  var _props$theme$global$e2, _props$theme$timeInpu2, _props$theme$global$b, _props$theme$global$e3, _props$theme$timeInpu3, _props$theme$timeInpu4;
  if (!props.$active) return '';

  // The active indicator's corner rounding is intentionally a fixed
  // "hair" edge size rather than a theme-exposed value we can expose
  // theme in future.
  var activeRound = (_props$theme$global$e2 = props.theme.global.edgeSize) == null ? void 0 : _props$theme$global$e2.hair;
  var activeBorderToken = (_props$theme$timeInpu2 = props.theme.timeInput) == null || (_props$theme$timeInpu2 = _props$theme$timeInpu2.active) == null || (_props$theme$timeInpu2 = _props$theme$timeInpu2.indicator) == null ? void 0 : _props$theme$timeInpu2.size;
  var activeBorderSize = ((_props$theme$global$b = props.theme.global.borderSize) == null ? void 0 : _props$theme$global$b[activeBorderToken]) || ((_props$theme$global$e3 = props.theme.global.edgeSize) == null ? void 0 : _props$theme$global$e3[activeBorderToken]) || activeBorderToken || props.theme.global.borderSize.small;
  return css(["&::before{content:'';position:absolute;inset:0;background-color:", ";border-top-left-radius:", ";border-top-right-radius:", ";}&::after{content:'';position:absolute;left:0;right:0;bottom:0;height:", ";background-color:", ";border-bottom-left-radius:", ";border-bottom-right-radius:", ";}"], normalizeColor((_props$theme$timeInpu3 = props.theme.timeInput) == null || (_props$theme$timeInpu3 = _props$theme$timeInpu3.active) == null ? void 0 : _props$theme$timeInpu3.background, props.theme), activeRound, activeRound, activeBorderSize, normalizeColor(((_props$theme$timeInpu4 = props.theme.timeInput) == null || (_props$theme$timeInpu4 = _props$theme$timeInpu4.active) == null || (_props$theme$timeInpu4 = _props$theme$timeInpu4.indicator) == null ? void 0 : _props$theme$timeInpu4.color) || {
    dark: 'white',
    light: 'black'
  }, props.theme), activeRound, activeRound);
});