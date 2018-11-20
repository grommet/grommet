import styled, { css } from 'styled-components';
import { breakpointStyle, genericStyles, normalizeColor } from '../../utils';

var sizeStyle = function sizeStyle(props) {
  // size is a combination of the level and size properties
  var size = props.size || 'medium';
  var headingTheme = props.theme.heading;
  var levelStyle = headingTheme.level[props.level];

  if (levelStyle) {
    var data = levelStyle[size];
    var styles = [css(["font-size:", ";line-height:", ";max-width:", ";font-weight:", ";"], data.size, data.height, data.maxWidth, headingTheme.weight)];

    if (props.responsive && headingTheme.responsiveBreakpoint) {
      var breakpoint = props.theme.global.breakpoints[headingTheme.responsiveBreakpoint];

      if (breakpoint) {
        var responsiveData = headingTheme.level[Math.min(props.level + 1, 4)][size];
        styles.push(breakpointStyle(breakpoint, "\n          font-size: " + responsiveData.size + ";\n          line-height: " + responsiveData.height + ";\n          max-width: " + responsiveData.maxWidth + ";\n        "));
      }
    }

    return styles;
  }

  console.warn("Heading level " + props.level + " is not defined in your theme.");
  return '';
};

var TEXT_ALIGN_MAP = {
  center: 'center',
  end: 'right',
  start: 'left'
};
var textAlignStyle = css(["text-align:", ";"], function (props) {
  return TEXT_ALIGN_MAP[props.textAlign];
});
var truncateStyle = "\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n";
var colorStyle = css(["color:", ";"], function (props) {
  return normalizeColor(props.colorProp, props.theme);
});
export var StyledHeading = styled.h1.withConfig({
  displayName: "StyledHeading",
  componentId: "sc-1rdh4aw-0"
})(["", " ", " ", " ", " ", " ", " ", ""], genericStyles, function (props) {
  return props.theme.heading.font && css(["font-family:", ";"], props.theme.heading.font.family);
}, function (props) {
  return sizeStyle(props);
}, function (props) {
  return props.textAlign && textAlignStyle;
}, function (props) {
  return props.truncate && truncateStyle;
}, function (props) {
  return props.colorProp && colorStyle;
}, function (props) {
  return props.theme.heading && props.theme.heading.extend;
});