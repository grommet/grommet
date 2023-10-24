import styled, { css } from 'styled-components';
import { focusStyle, genericStyles, normalizeColor, styledComponentsConfig } from '../../utils';
import { defaultProps } from '../../default-props';
var disabledStyle = "\n  opacity: 0.3;\n  cursor: default;\n  text-decoration: none;\n";
var sizeStyle = function sizeStyle(props) {
  if (props.size) {
    var size = props.size || 'medium';
    var data = props.theme.text[size];
    return css(["font-size:", ";line-height:", ";"], data ? data.size : size, data ? data.height : 'normal');
  }
  return css(["font-size:inherit;line-height:inherit;"]);
};
var StyledAnchor = styled.a.withConfig(styledComponentsConfig).withConfig({
  displayName: "StyledAnchor",
  componentId: "sc-1rp7lwl-0"
})(["box-sizing:border-box;", " color:", ";", " text-decoration:", ";cursor:pointer;", " ", " ", " ", " ", " ", ""], function (props) {
  return sizeStyle(props);
}, function (props) {
  var _props$theme$anchor;
  return normalizeColor(props.colorProp || ((_props$theme$anchor = props.theme.anchor) == null || (_props$theme$anchor = _props$theme$anchor.size) == null || (_props$theme$anchor = _props$theme$anchor[props.size]) == null ? void 0 : _props$theme$anchor.color) || props.theme.anchor.color, props.theme);
}, function (props) {
  var _props$theme$anchor2, _props$theme$anchor3;
  return props.weight ? "font-weight: " + props.weight + ";" : (((_props$theme$anchor2 = props.theme.anchor) == null || (_props$theme$anchor2 = _props$theme$anchor2.size) == null || (_props$theme$anchor2 = _props$theme$anchor2[props.size]) == null ? void 0 : _props$theme$anchor2.fontWeight) || props.theme.anchor.fontWeight) && "font-weight: " + (((_props$theme$anchor3 = props.theme.anchor) == null || (_props$theme$anchor3 = _props$theme$anchor3.size) == null || (_props$theme$anchor3 = _props$theme$anchor3[props.size]) == null ? void 0 : _props$theme$anchor3.fontWeight) || props.theme.anchor.fontWeight) + ";";
}, function (props) {
  var _props$theme$anchor4;
  return props.hasIcon ? 'none' : ((_props$theme$anchor4 = props.theme.anchor) == null || (_props$theme$anchor4 = _props$theme$anchor4.size) == null || (_props$theme$anchor4 = _props$theme$anchor4[props.size]) == null ? void 0 : _props$theme$anchor4.textDecoration) || props.theme.anchor.textDecoration;
}, genericStyles, function (props) {
  return !props.disabled && props.theme.anchor.hover && css(["&:hover{", " ", " ", "}"], props.theme.anchor.hover.textDecoration && "text-decoration: " + props.theme.anchor.hover.textDecoration + ";", props.theme.anchor.hover.fontWeight && "font-weight: " + props.theme.anchor.hover.fontWeight + ";", props.theme.anchor.hover.extend);
}, function (props) {
  return props.hasIcon && !props.hasLabel && "\n    padding: " + props.theme.global.edgeSize.small + ";\n  ";
}, function (props) {
  return props.disabled && disabledStyle;
}, function (props) {
  return props.focus && focusStyle();
}, function (props) {
  return props.theme.anchor.extend;
});
StyledAnchor.defaultProps = {};
Object.setPrototypeOf(StyledAnchor.defaultProps, defaultProps);
export { StyledAnchor };