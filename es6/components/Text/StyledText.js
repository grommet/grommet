import styled, { css } from 'styled-components';
import { genericStyles, normalizeColor, textAlignStyle } from '../../utils';
import { defaultProps } from '../../default-props';

var sizeStyle = function sizeStyle(props) {
  var size = props.size || 'medium';
  var data = props.theme.text[size];

  if (data) {
    return css(["font-size:", ";line-height:", ";"], data.size, data.height);
  }

  return css(["font-size:", ";line-height:normal;"], size);
};

var truncateStyle = "\n  white-space: nowrap;\n  max-width: 100%;\n  overflow: hidden;\n  text-overflow: ellipsis;\n";
var colorStyle = css(["color:", ";"], function (props) {
  return normalizeColor(props.colorProp, props.theme);
});
var weightStyle = css(["font-weight:", ";"], function (props) {
  return props.weight;
});
var wordBreakStyle = css(["word-break:", ";"], function (props) {
  return props.wordBreak;
});
var fontFamily = css(["font-family:", ";"], function (props) {
  return props.theme.text.font.family;
});
var StyledText = styled('span').withConfig({
  shouldForwardProp: function shouldForwardProp(prop, defaultValidatorFn) {
    return defaultValidatorFn(prop) && prop !== 'size';
  }
}).withConfig({
  displayName: "StyledText",
  componentId: "sc-1sadyjn-0"
})(["", " ", " ", " ", " ", " ", " ", " ", " ", ""], genericStyles, function (props) {
  return sizeStyle(props);
}, function (props) {
  return props.textAlign && textAlignStyle;
}, function (props) {
  return props.truncate && truncateStyle;
}, function (props) {
  return props.colorProp && colorStyle;
}, function (props) {
  return props.weight && weightStyle;
}, function (props) {
  return props.wordBreak && wordBreakStyle;
}, function (props) {
  return props.theme.text.font && props.theme.text.font.family && fontFamily;
}, function (props) {
  return props.theme.text && props.theme.text.extend;
});
StyledText.defaultProps = {};
Object.setPrototypeOf(StyledText.defaultProps, defaultProps);
export { StyledText };