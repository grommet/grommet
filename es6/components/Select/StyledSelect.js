import styled from 'styled-components';
import { Box } from '../Box';
import { Button } from '../Button';
import { DropButton } from '../DropButton';
import { TextInput } from '../TextInput';
import { getHoverIndicatorStyle, selectedStyle, controlBorderStyle, sizeStyle, styledComponentsConfig } from '../../utils';
export var StyledContainer = styled(Box).withConfig({
  displayName: "StyledSelect__StyledContainer",
  componentId: "sc-znp66n-0"
})(["@media screen and (-ms-high-contrast:active),(-ms-high-contrast:none){width:100%;}", ";", ";"], function (props) {
  return props.dropHeight ? sizeStyle('max-height', props.dropHeight, props.theme) : 'max-height: inherit;';
}, function (props) {
  return props.theme.select.container && props.theme.select.container.extend;
});

// position relative is so scroll can be managed correctly
export var OptionsContainer = styled.div.withConfig(styledComponentsConfig).withConfig({
  displayName: "StyledSelect__OptionsContainer",
  componentId: "sc-znp66n-1"
})(["position:relative;scroll-behavior:smooth;overflow:auto;outline:none;"]);
export var HiddenInput = styled.input.withConfig(styledComponentsConfig).withConfig({
  displayName: "StyledSelect__HiddenInput",
  componentId: "sc-znp66n-2"
})(["display:none;"]);
export var SelectOption = styled(Button).withConfig({
  displayName: "StyledSelect__SelectOption",
  componentId: "sc-znp66n-3"
})(["", " ", " &:focus{", "}display:block;width:100%;", ";"], function (props) {
  return props.selected && props.textComponent && selectedStyle;
}, function (props) {
  return props.active && getHoverIndicatorStyle(!props.children && !props.theme.select.options ? undefined : 'background', props.theme);
}, function (props) {
  return props.active && getHoverIndicatorStyle(!props.children && !props.theme.select.options ? undefined : 'background', props.theme);
}, function (props) {
  return props["aria-disabled"] && "cursor: default";
});
export var SelectTextInput = styled(TextInput).withConfig({
  displayName: "StyledSelect__SelectTextInput",
  componentId: "sc-znp66n-4"
})(["cursor:", ";"], function (props) {
  return props.defaultCursor ? 'default' : 'pointer';
});
export var StyledSelectDropButton = styled(DropButton).withConfig({
  displayName: "StyledSelect__StyledSelectDropButton",
  componentId: "sc-znp66n-5"
})(["", ";", ";", ";"], function (props) {
  return !props.plainSelect && controlBorderStyle;
}, function (props) {
  var _props$theme$select;
  return (_props$theme$select = props.theme.select) == null || (_props$theme$select = _props$theme$select.control) == null ? void 0 : _props$theme$select.extend;
}, function (props) {
  var _props$theme$select2;
  return props.open && ((_props$theme$select2 = props.theme.select) == null || (_props$theme$select2 = _props$theme$select2.control) == null ? void 0 : _props$theme$select2.open);
});