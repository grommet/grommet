var _FLEX_MAP;

import styled, { css } from 'styled-components';
import { genericStyles } from '../../utils';
export var StyledTabsHeader = styled.div.withConfig({
  displayName: "StyledTabs__StyledTabsHeader",
  componentId: "a4fwxl-0"
})(["", ";"], function (props) {
  return props.theme.tabs.header.extend;
});
var FLEX_MAP = (_FLEX_MAP = {}, _FLEX_MAP[true] = '1 1', _FLEX_MAP[false] = '0 0', _FLEX_MAP.grow = '1 0', _FLEX_MAP.shrink = '0 1', _FLEX_MAP);
var flexStyle = css(["flex:", ";"], function (props) {
  return "" + FLEX_MAP[props.flex] + (props.flex !== true ? ' auto' : '');
});
export var StyledTabPanel = styled.div.withConfig({
  displayName: "StyledTabs__StyledTabPanel",
  componentId: "a4fwxl-1"
})(["min-height:0;", " ", ";"], function (props) {
  return props.flex && flexStyle;
}, function (props) {
  return props.theme.tabs.panel.extend;
});
export var StyledTabs = styled.div.withConfig({
  displayName: "StyledTabs",
  componentId: "a4fwxl-2"
})(["", " ", ";"], genericStyles, function (props) {
  return props.theme.tabs.extend;
});