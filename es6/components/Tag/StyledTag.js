import styled from 'styled-components';
import { backgroundStyle, borderStyle, roundStyle } from '../../utils';
import { Button } from '../Button';
export var StyledTagButton = styled(Button).withConfig({
  displayName: "StyledTag__StyledTagButton",
  componentId: "sc-cb9fl2-0"
})(["", " ", " ", " &:hover{", " ", "}"], function (props) {
  return props.background && backgroundStyle(props.background, props.theme);
}, function (props) {
  return props.border && borderStyle(props.border, true, props.theme);
}, function (props) {
  return props.round && roundStyle(props.round, true, props.theme);
}, function (props) {
  var _props$theme;
  return props.background && props.onClick && ((_props$theme = props.theme) == null || (_props$theme = _props$theme.tag) == null || (_props$theme = _props$theme.hover) == null ? void 0 : _props$theme.background) && backgroundStyle(props.theme.tag.hover.background, props.theme);
}, function (props) {
  var _props$theme2;
  return props.border && props.onClick && ((_props$theme2 = props.theme) == null || (_props$theme2 = _props$theme2.tag) == null || (_props$theme2 = _props$theme2.hover) == null ? void 0 : _props$theme2.border) && borderStyle(props.theme.tag.hover.border, true, props.theme);
});
export var StyledRemoveButton = styled(Button).withConfig({
  displayName: "StyledTag__StyledRemoveButton",
  componentId: "sc-cb9fl2-1"
})(["", ""], function (props) {
  return props.round && roundStyle(props.round, true, props.theme);
});