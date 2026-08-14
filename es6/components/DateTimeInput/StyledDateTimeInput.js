// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import styled, { css } from 'styled-components';
import { disabledStyle, edgeStyle, focusStyle, inputStyle, normalizeColor, parseMetricToNum, plainInputStyle, readOnlyStyle, styledComponentsConfig } from '../../utils';
import { Box } from '../Box';
var getActiveTokens = function getActiveTokens(theme) {
  var _theme$dateTimeInput, _theme$timeInput;
  return ((_theme$dateTimeInput = theme.dateTimeInput) == null ? void 0 : _theme$dateTimeInput.active) || ((_theme$timeInput = theme.timeInput) == null ? void 0 : _theme$timeInput.active);
};
export var StyledDateTimeInputContainer = styled(Box).withConfig({
  shouldForwardProp: function shouldForwardProp(prop) {
    return prop !== 'disabled' && prop !== 'readOnlyProp';
  }
}).withConfig({
  displayName: "StyledDateTimeInput__StyledDateTimeInputContainer",
  componentId: "sc-d6m1ya-0"
})(["", " ", " ", ""], function (props) {
  return props.disabled && disabledStyle();
}, function (props) {
  return props.readOnlyProp && readOnlyStyle(props.theme);
}, function (props) {
  return props.focusIndicator !== false && css(["&:focus-within:not(:has(button:focus-visible)){", "}"], focusStyle());
});
export var StyledDateTimeInput = styled.input.withConfig(styledComponentsConfig).withConfig({
  displayName: "StyledDateTimeInput",
  componentId: "sc-d6m1ya-1"
})(["", " ", " position:relative;pointer-events:none;color:transparent;caret-color:transparent;text-shadow:none;&::selection{background:transparent;color:transparent;}&::placeholder{color:transparent;}"], inputStyle, plainInputStyle);
export var StyledDateTimeInputField = styled.div.withConfig(styledComponentsConfig).withConfig({
  displayName: "StyledDateTimeInput__StyledDateTimeInputField",
  componentId: "sc-d6m1ya-2"
})(["position:relative;flex:1 1 auto;min-width:0;"]);
export var StyledDateTimeInputDisplay = styled.div.withConfig(styledComponentsConfig).withConfig({
  displayName: "StyledDateTimeInput__StyledDateTimeInputDisplay",
  componentId: "sc-d6m1ya-3"
})(["position:absolute;inset:0;display:flex;align-items:center;overflow:hidden;", ""], function (props) {
  return props.theme.global.input.padding && (typeof props.theme.global.input.padding !== 'object' ? "padding: " + (parseMetricToNum(props.theme.global.edgeSize[props.theme.global.input.padding] || props.theme.global.input.padding) - parseMetricToNum(props.theme.global.control.border.width)) + "px;" : edgeStyle('padding', props.theme.global.input.padding, props.responsive, props.theme.box.responsiveBreakpoint, props.theme));
});
export var StyledDateTimeInputSeparator = styled.span.withConfig(styledComponentsConfig).withConfig({
  displayName: "StyledDateTimeInput__StyledDateTimeInputSeparator",
  componentId: "sc-d6m1ya-4"
})(["display:inline-flex;align-items:center;line-height:inherit;color:", ";padding-inline:", ";", ""], function (props) {
  return normalizeColor(props.$filled ? 'text' : props.theme.global.colors.placeholder, props.theme);
}, function (props) {
  return props.$paddingInline;
}, function (props) {
  var weight = props.theme.global.input.weight || props.theme.global.input.font.weight;
  return weight && "font-weight: " + weight + ";";
});
export var StyledDateTimeInputSegment = styled.span.withConfig(styledComponentsConfig).withConfig({
  displayName: "StyledDateTimeInput__StyledDateTimeInputSegment",
  componentId: "sc-d6m1ya-5"
})(["&:focus{outline:none;}display:inline-flex;align-items:center;position:relative;line-height:inherit;color:", ";", " ", ""], function (props) {
  return normalizeColor(props.$filled ? 'text' : props.theme.global.colors.placeholder, props.theme);
}, function (props) {
  var weight = props.theme.global.input.weight || props.theme.global.input.font.weight;
  return weight && "font-weight: " + weight + ";";
}, function (props) {
  var _props$theme$global$e, _activeTokens$indicat, _props$theme$global$b, _props$theme$global$e2, _activeTokens$indicat2;
  if (!props.$active) return '';
  var activeTokens = getActiveTokens(props.theme);
  var activeRound = (_props$theme$global$e = props.theme.global.edgeSize) == null ? void 0 : _props$theme$global$e.hair;
  var activeBorderToken = activeTokens == null || (_activeTokens$indicat = activeTokens.indicator) == null ? void 0 : _activeTokens$indicat.size;
  var activeBorderSize = ((_props$theme$global$b = props.theme.global.borderSize) == null ? void 0 : _props$theme$global$b[activeBorderToken]) || ((_props$theme$global$e2 = props.theme.global.edgeSize) == null ? void 0 : _props$theme$global$e2[activeBorderToken]) || activeBorderToken || props.theme.global.borderSize.small;
  return css(["&::before{content:'';position:absolute;inset:0;background-color:", ";border-top-left-radius:", ";border-top-right-radius:", ";}&::after{content:'';position:absolute;left:0;right:0;bottom:0;height:", ";background-color:", ";border-bottom-left-radius:", ";border-bottom-right-radius:", ";}"], normalizeColor(activeTokens == null ? void 0 : activeTokens.background, props.theme), activeRound, activeRound, activeBorderSize, normalizeColor((activeTokens == null || (_activeTokens$indicat2 = activeTokens.indicator) == null ? void 0 : _activeTokens$indicat2.color) || {
    dark: 'white',
    light: 'black'
  }, props.theme), activeRound, activeRound);
});