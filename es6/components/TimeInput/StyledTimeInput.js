// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import styled, { css } from 'styled-components';
import { backgroundStyle, borderStyle, disabledStyle, edgeStyle, elevationStyle, focusStyle, heightStyle, inputStyle, normalizeColor, parseMetricToNum, plainInputStyle, readOnlyStyle, roundStyle, styledComponentsConfig, widthStyle } from '../../utils';
import { Box } from '../Box';
export var StyledTimeInputContainer = styled(Box).withConfig({
  // Keep Box styling props like border and round flowing into Box.
  shouldForwardProp: function shouldForwardProp(prop) {
    return prop !== 'disabled' && prop !== 'readOnlyProp';
  }
}).withConfig({
  displayName: "StyledTimeInput__StyledTimeInputContainer",
  componentId: "sc-xktdr3-0"
})(["position:relative;", " ", " ", ""], function (props) {
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
export var StyledTimeInputDisplay = styled(Box).withConfig({
  displayName: "StyledTimeInput__StyledTimeInputDisplay",
  componentId: "sc-xktdr3-3"
})(["position:absolute;inset:0;overflow:hidden;", ""], function (props) {
  var _props$theme$timeInpu;
  var valuePad = (_props$theme$timeInpu = props.theme.timeInput) == null || (_props$theme$timeInpu = _props$theme$timeInpu.value) == null ? void 0 : _props$theme$timeInpu.pad;
  if (valuePad !== undefined) {
    return edgeStyle('padding', valuePad, props.responsive, props.theme.box.responsiveBreakpoint, props.theme);
  }
  var inputPadding = props.theme.global.input.padding;
  if (!inputPadding) return undefined;
  if (typeof inputPadding !== 'object') return "padding: " + (parseMetricToNum(props.theme.global.edgeSize[inputPadding] || inputPadding) - parseMetricToNum(props.theme.global.control.border.width)) + "px;";
  return edgeStyle('padding', inputPadding, props.responsive, props.theme.box.responsiveBreakpoint, props.theme);
});
export var StyledTimeInputSeparator = styled.span.withConfig(styledComponentsConfig).withConfig({
  displayName: "StyledTimeInput__StyledTimeInputSeparator",
  componentId: "sc-xktdr3-4"
})(["display:inline-flex;line-height:inherit;align-items:center;color:", ";", " ", ""], function (props) {
  var _props$theme$timeInpu2, _props$theme$timeInpu3;
  return normalizeColor(props.$filled ? ((_props$theme$timeInpu2 = props.theme.timeInput) == null || (_props$theme$timeInpu2 = _props$theme$timeInpu2.segment) == null ? void 0 : _props$theme$timeInpu2.color) || 'text' : ((_props$theme$timeInpu3 = props.theme.timeInput) == null || (_props$theme$timeInpu3 = _props$theme$timeInpu3.segment) == null || (_props$theme$timeInpu3 = _props$theme$timeInpu3.placeholder) == null ? void 0 : _props$theme$timeInpu3.color) || props.theme.global.colors.placeholder, props.theme);
}, function (props) {
  var _props$theme$text;
  var _ref = props.theme.timeInput || {},
    segment = _ref.segment;
  var weight = (segment == null ? void 0 : segment.weight) || props.theme.global.input.weight || props.theme.global.input.font.weight;
  var size = (segment == null ? void 0 : segment.size) || props.theme.global.input.font.size;
  var fontSize = ((_props$theme$text = props.theme.text) == null || (_props$theme$text = _props$theme$text[size]) == null ? void 0 : _props$theme$text.size) || size;
  return css(["", " ", ""], weight && "font-weight: " + weight + ";", fontSize && "font-size: " + fontSize + ";");
}, function (props) {
  var _props$theme$timeInpu4, _props$theme$text2;
  var placeholder = (_props$theme$timeInpu4 = props.theme.timeInput) == null || (_props$theme$timeInpu4 = _props$theme$timeInpu4.segment) == null ? void 0 : _props$theme$timeInpu4.placeholder;
  if (props.$filled || !placeholder) return '';
  var fontSize = ((_props$theme$text2 = props.theme.text) == null || (_props$theme$text2 = _props$theme$text2[placeholder.size]) == null ? void 0 : _props$theme$text2.size) || placeholder.size;
  return css(["", " ", ""], placeholder.weight !== undefined && "font-weight: " + placeholder.weight + ";", fontSize && "font-size: " + fontSize + ";");
});
export var StyledTimeInputSegment = styled.span.withConfig(styledComponentsConfig).withConfig({
  displayName: "StyledTimeInput__StyledTimeInputSegment",
  componentId: "sc-xktdr3-5"
})(["&:focus{outline:none;}display:inline-flex;align-items:center;position:relative;line-height:inherit;", ";color:", ";", " ", " ", " ", ""], function (props) {
  var _props$theme$timeInpu5;
  var segment = (_props$theme$timeInpu5 = props.theme.timeInput) == null ? void 0 : _props$theme$timeInpu5.segment;
  var responsive = props.responsive === undefined ? true : props.responsive;
  var styles = [];
  if ((segment == null ? void 0 : segment.background) !== undefined) styles.push(backgroundStyle(segment.background, props.theme));
  if (segment != null && segment.border) styles.push(borderStyle(segment.border, responsive, props.theme));
  if (segment != null && segment.elevation) styles.push(elevationStyle(segment.elevation));
  if (segment != null && segment.height) styles.push(heightStyle(segment.height, props.theme));
  if (segment != null && segment.margin) styles.push(edgeStyle('margin', segment.margin, responsive, props.theme.box.responsiveBreakpoint, props.theme));
  if (segment != null && segment.pad) styles.push(edgeStyle('padding', segment.pad, responsive, props.theme.box.responsiveBreakpoint, props.theme));
  if ((segment == null ? void 0 : segment.round) !== undefined) {
    styles.push(segment.round === false ? 'border-radius: 0;' : roundStyle(segment.round, responsive, props.theme));
  }
  if (segment != null && segment.width) styles.push(widthStyle(segment.width, props.theme));
  return styles;
}, function (props) {
  var _props$theme$timeInpu6, _props$theme$timeInpu7;
  return normalizeColor(props.$filled ? ((_props$theme$timeInpu6 = props.theme.timeInput) == null || (_props$theme$timeInpu6 = _props$theme$timeInpu6.segment) == null ? void 0 : _props$theme$timeInpu6.color) || 'text' : ((_props$theme$timeInpu7 = props.theme.timeInput) == null || (_props$theme$timeInpu7 = _props$theme$timeInpu7.segment) == null || (_props$theme$timeInpu7 = _props$theme$timeInpu7.placeholder) == null ? void 0 : _props$theme$timeInpu7.color) || props.theme.global.colors.placeholder, props.theme);
}, function (props) {
  var _props$theme$text3;
  var _ref2 = props.theme.timeInput || {},
    segment = _ref2.segment;
  var weight = (segment == null ? void 0 : segment.weight) || props.theme.global.input.weight || props.theme.global.input.font.weight;
  var size = (segment == null ? void 0 : segment.size) || props.theme.global.input.font.size;
  var fontSize = ((_props$theme$text3 = props.theme.text) == null || (_props$theme$text3 = _props$theme$text3[size]) == null ? void 0 : _props$theme$text3.size) || size;
  return css(["", " ", ""], weight && "font-weight: " + weight + ";", fontSize && "font-size: " + fontSize + ";");
}, function (props) {
  var _props$theme$timeInpu8, _props$theme$text4;
  var placeholder = (_props$theme$timeInpu8 = props.theme.timeInput) == null || (_props$theme$timeInpu8 = _props$theme$timeInpu8.segment) == null ? void 0 : _props$theme$timeInpu8.placeholder;
  if (props.$filled || !placeholder) return '';
  var fontSize = ((_props$theme$text4 = props.theme.text) == null || (_props$theme$text4 = _props$theme$text4[placeholder.size]) == null ? void 0 : _props$theme$text4.size) || placeholder.size;
  return css(["", " ", ""], placeholder.weight !== undefined && "font-weight: " + placeholder.weight + ";", fontSize && "font-size: " + fontSize + ";");
}, function (props) {
  var _props$theme$timeInpu9;
  if (!props.$active) return '';
  var _ref3 = ((_props$theme$timeInpu9 = props.theme.timeInput) == null ? void 0 : _props$theme$timeInpu9.segment) || {},
    active = _ref3.active;
  if (!active) return '';
  var responsive = props.responsive === undefined ? true : props.responsive;
  var styles = [];
  if (active.elevation !== undefined) styles.push(elevationStyle(active.elevation));
  if (active.pad !== undefined) styles.push(edgeStyle('padding', active.pad, responsive, props.theme.box.responsiveBreakpoint, props.theme));
  if (active.round !== undefined) {
    styles.push(active.round === false ? 'border-radius: 0;' : roundStyle(active.round, responsive, props.theme));
  }
  if (active.color !== undefined) styles.push("color: " + normalizeColor(active.color, props.theme) + ";");
  if (active.size !== undefined) {
    var _props$theme$text5;
    var size = active.size;
    styles.push("font-size: " + (((_props$theme$text5 = props.theme.text) == null || (_props$theme$text5 = _props$theme$text5[size]) == null ? void 0 : _props$theme$text5.size) || size) + ";");
  }
  if (active.weight !== undefined) styles.push("font-weight: " + active.weight + ";");
  return styles;
}, function (props) {
  var _props$theme$timeInpu0, _active$round, _props$theme$global$e;
  if (!props.$active) return '';
  var _ref4 = ((_props$theme$timeInpu0 = props.theme.timeInput) == null ? void 0 : _props$theme$timeInpu0.segment) || {},
    active = _ref4.active,
    segmentRound = _ref4.round;
  var responsive = props.responsive === undefined ? true : props.responsive;
  var activeRound = (_active$round = active == null ? void 0 : active.round) != null ? _active$round : segmentRound;
  var activeRoundStyle = activeRound && roundStyle(activeRound, responsive, props.theme);
  var activeRoundValue = activeRound === false ? '0' : (_props$theme$global$e = props.theme.global.edgeSize) == null ? void 0 : _props$theme$global$e.hair;
  var underlineBorder = active == null ? void 0 : active.border;
  var underlineBorderStyle = underlineBorder === false || Array.isArray(underlineBorder) && underlineBorder.length === 0 ? 'border: none;' : borderStyle(underlineBorder, responsive, props.theme);
  return css(["&::before{content:'';position:absolute;inset:0;", " ", "}&::after{content:'';position:absolute;inset:0;", " ", "}"], (active == null ? void 0 : active.background) !== undefined ? backgroundStyle(active.background, props.theme, false) : '', activeRoundStyle || css(["border-top-left-radius:", ";border-top-right-radius:", ";border-bottom-left-radius:", ";border-bottom-right-radius:", ";"], activeRoundValue, activeRoundValue, activeRoundValue, activeRoundValue), underlineBorderStyle, activeRoundStyle || css(["border-bottom-left-radius:", ";border-bottom-right-radius:", ";"], activeRoundValue, activeRoundValue));
});