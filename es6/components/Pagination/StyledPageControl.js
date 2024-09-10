import styled from 'styled-components';
import { styledComponentsConfig } from '../../utils/styles';
import { Button } from '../Button';
import { Text } from '../Text';
var sizeStyle = function sizeStyle(props) {
  var style = props.theme.pagination.button && props.theme.pagination.button.size && props.theme.pagination.button.size[props.size || 'medium'];
  return style ? {
    content: {
      fontSize: style.font && style.font.size,
      // fix for safari, apply line-height 0 on next/previous
      // icon-only buttons
      lineHeight: style.font && props.hasLabel ? style.font.height : 0
    },
    container: {
      height: style.height,
      minWidth: style.width
    }
  } : '';
};
export var StyledPaginationButton = styled(Button).withConfig({
  displayName: "StyledPageControl__StyledPaginationButton",
  componentId: "sc-1vlfaez-0"
})(["> svg{margin:0 auto;}", ";"], function (props) {
  return sizeStyle(props).content;
});
export var StyledContainer = styled.div.withConfig(styledComponentsConfig).withConfig({
  displayName: "StyledPageControl__StyledContainer",
  componentId: "sc-1vlfaez-1"
})(["display:flex;align-items:center;justify-content:center;max-width:100%;", ";", ";"], function (props) {
  return sizeStyle(props).container;
}, function (props) {
  return props.theme.pagination.control && props.theme.pagination.control.extend;
});
export var StyledSeparator = styled(Text).withConfig({
  displayName: "StyledPageControl__StyledSeparator",
  componentId: "sc-1vlfaez-2"
})(["font-weight:bold;", ";", ";"], function (props) {
  return "font-size: " + (sizeStyle(props).content && sizeStyle(props).content.fontSize);
}, function (props) {
  return "line-height: " + (sizeStyle(props).content && sizeStyle(props).content.lineHeight);
});