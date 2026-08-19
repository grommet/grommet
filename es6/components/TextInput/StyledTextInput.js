// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import styled, { css } from 'styled-components';
import { controlBorderStyle, disabledStyle, getInputPadBySide, inputStyle, parseMetricToNum, plainInputStyle, textAlignStyle, widthStyle, styledComponentsConfig } from '../../utils';
import { getInputIconPad, inputPadForIcon } from '../../utils/styles';
import { readOnlyStyle } from '../../utils/readOnly';
var getInlineButtonPad = function getInlineButtonPad(props) {
  var rightInset = Number.parseFloat(getInputPadBySide(props, 'right'));
  var iconPad = Number.parseFloat(getInputIconPad(props));
  var trailingIconPad = props.hasTrailingIcon ? iconPad : 0;
  // Reserve both the icon space and the control's edge inset so text clears
  // the flush-right password toggle, and the reversed icon when both coexist.
  return iconPad + trailingIconPad + rightInset + "px";
};
var getPlainStyle = function getPlainStyle(plain) {
  if (plain === 'full') {
    return css(["", " padding:0;"], plainInputStyle);
  }
  return plain && plainInputStyle;
};
var StyledTextInput = styled.input.withConfig(styledComponentsConfig).withConfig({
  displayName: "StyledTextInput",
  componentId: "sc-1x30a0s-0"
})(["", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", ";"], inputStyle, function (props) {
  return (props.hasButton || props.readOnlyCopy) && 'flex: 1 1 auto;';
}, function (props) {
  return (props.hasButton || props.readOnlyCopy) && 'min-width: 0;';
}, function (props) {
  return props.readOnlyCopy || props.hasButton ? "padding-" + (props.reverse ? 'left' : 'right') + ": 0px;" : '';
}, function (props) {
  return props.readOnly && "border: none;";
}, function (props) {
  return getPlainStyle(props.plain);
}, function (props) {
  return props.icon && inputPadForIcon;
}, function (props) {
  return props.hasInlineButton && "padding-right: " + getInlineButtonPad(props) + ";";
}, function (props) {
  return props.disabled && disabledStyle(props.theme.textInput.disabled && props.theme.textInput.disabled.opacity);
}, function (props) {
  return props.textAlign && textAlignStyle;
}, function (props) {
  return props.widthProp && !props.readOnly && widthStyle(props.widthProp, props.theme);
}, function (props) {
  return props.theme.textInput && props.theme.textInput.extend;
});
var StyledTextInputContainer = styled.div.withConfig(styledComponentsConfig).withConfig({
  displayName: "StyledTextInput__StyledTextInputContainer",
  componentId: "sc-1x30a0s-1"
})(["position:relative;width:100%;", " ", ";", ";", " ", ";"], function (props) {
  return props.widthProp && props.readOnlyProp && widthStyle(props.widthProp, props.theme);
}, function (props) {
  return props.readOnlyProp && !props.plain && controlBorderStyle;
}, function (props) {
  return (props.readOnlyCopy || props.hasButton) && "\n    box-sizing: border-box;\n    flex-direction: row;\n    display: flex;\n    align-items: stretch;\n  ";
}, function (props) {
  return props.readOnlyProp && !props.plain && readOnlyStyle(props.theme);
}, function (props) {
  return props.theme.textInput && props.theme.textInput.container && props.theme.textInput.container.extend;
});
var StyledPlaceholder = styled.div.withConfig(styledComponentsConfig).withConfig({
  displayName: "StyledTextInput__StyledPlaceholder",
  componentId: "sc-1x30a0s-2"
})(["position:absolute;left:", "px;top:50%;transform:translateY(-50%);display:flex;justify-content:center;pointer-events:none;", ";"], function (props) {
  return parseMetricToNum(getInputPadBySide(props, 'left')) - parseMetricToNum(props.theme.global.control.border.width);
}, function (props) {
  return props.theme.textInput && props.theme.textInput.placeholder && props.theme.textInput.placeholder.extend;
});
var StyledIcon = styled.div.withConfig(styledComponentsConfig).withConfig({
  displayName: "StyledTextInput__StyledIcon",
  componentId: "sc-1x30a0s-3"
})(["position:absolute;display:flex;justify:center;top:50%;transform:translateY(-50%);pointer-events:none;", ""], function (props) {
  return props.reverse ? "right: " + getInputPadBySide(props, 'right') + ";" : "left: " + getInputPadBySide(props, 'left') + ";";
});
var StyledInlineButton = styled.div.withConfig(styledComponentsConfig).withConfig({
  displayName: "StyledTextInput__StyledInlineButton",
  componentId: "sc-1x30a0s-4"
})(["position:absolute;display:flex;align-items:stretch;top:0;right:0;bottom:0;z-index:1;"]);
var StyledInlineIcon = styled.div.withConfig(styledComponentsConfig).withConfig({
  displayName: "StyledTextInput__StyledInlineIcon",
  componentId: "sc-1x30a0s-5"
})(["display:flex;align-items:center;justify-content:center;pointer-events:none;"]);
var StyledSuggestions = styled.ol.withConfig(styledComponentsConfig).withConfig({
  displayName: "StyledTextInput__StyledSuggestions",
  componentId: "sc-1x30a0s-6"
})(["border-top-left-radius:0;border-top-right-radius:0;margin:0;padding:0;list-style-type:none;", ";"], function (props) {
  return props.theme.textInput && props.theme.textInput.suggestions && props.theme.textInput.suggestions.extend;
});
export { StyledTextInput, StyledTextInputContainer, StyledPlaceholder, StyledIcon, StyledInlineButton, StyledInlineIcon, StyledSuggestions };