import styled, { css } from 'styled-components';
import { genericStyles, normalizeColor } from '../../utils';
var colorStyle = css(["color:", ";"], function (props) {
  return normalizeColor(props.colorProp, props.theme);
});

var sizeStyle = function sizeStyle(props) {
  var size = props.size || 'medium';
  var data = props.theme.paragraph[size];
  return css(["font-size:", ";line-height:", ";max-width:", ";"], data.size, data.height, data.maxWidth);
};

var TEXT_ALIGN_MAP = {
  center: 'center',
  end: 'right',
  start: 'left'
};
var textAlignStyle = css(["text-align:", ";"], function (props) {
  return TEXT_ALIGN_MAP[props.textAlign];
});
export var StyledParagraph = styled.p.withConfig({
  displayName: "StyledParagraph",
  componentId: "tbetod-0"
})(["", " ", " ", " ", " ", ""], genericStyles, function (props) {
  return sizeStyle(props);
}, function (props) {
  return props.textAlign && textAlignStyle;
}, function (props) {
  return props.colorProp && colorStyle;
}, function (props) {
  return props.theme.paragraph && props.theme.paragraph.extend;
});