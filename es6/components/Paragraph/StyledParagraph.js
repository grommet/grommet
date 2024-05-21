import styled, { css } from 'styled-components';
import { genericStyles, normalizeColor, textAlignStyle, styledComponentsConfig } from '../../utils';
import { defaultProps } from '../../default-props';
var colorStyle = css(["color:", ";"], function (props) {
  return normalizeColor(props.colorProp, props.theme);
});
var sizeStyle = function sizeStyle(props) {
  var size = props.size || 'medium';
  var data = props.theme.paragraph[size];
  return css(["font-size:", ";line-height:", ";max-width:", ";"], data ? data.size : size, data ? data.height : 'normal', props.fillProp ? 'none' : data && data.maxWidth);
};
var fontFamily = css(["font-family:", ";"], function (props) {
  return props.theme.paragraph.font.family;
});
var maxlinesStyle = function maxlinesStyle(props) {
  return props.maxLines && css(["display:-webkit-box;-webkit-line-clamp:", ";-webkit-box-orient:vertical;overflow:hidden;"], props.maxLines);
};
var StyledParagraph = styled.p.withConfig(styledComponentsConfig).withConfig({
  displayName: "StyledParagraph",
  componentId: "sc-tbetod-0"
})(["", " ", " ", " ", " ", " ", " ", ""], genericStyles, function (props) {
  return maxlinesStyle(props);
}, function (props) {
  return sizeStyle(props);
}, function (props) {
  return props.textAlign && textAlignStyle;
}, function (props) {
  return props.colorProp && colorStyle;
}, function (props) {
  return props.theme.paragraph.font && props.theme.paragraph.font.family && fontFamily;
}, function (props) {
  return props.theme.paragraph && props.theme.paragraph.extend;
});
StyledParagraph.defaultProps = {};
Object.setPrototypeOf(StyledParagraph.defaultProps, defaultProps);
export { StyledParagraph };