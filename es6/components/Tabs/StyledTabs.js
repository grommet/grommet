var _FLEX_MAP;

import styled, { css } from 'styled-components';
import { genericStyles } from '../../utils';
import { defaultProps } from '../../default-props';
var StyledTabsHeader = styled.div.withConfig({
  displayName: "StyledTabs__StyledTabsHeader",
  componentId: "a4fwxl-0"
})(["", ";"], function (props) {
  return props.theme.tabs.header.extend;
});
StyledTabsHeader.defaultProps = {};
Object.setPrototypeOf(StyledTabsHeader.defaultProps, defaultProps);
var FLEX_MAP = (_FLEX_MAP = {}, _FLEX_MAP[true] = '1 1', _FLEX_MAP[false] = '0 0', _FLEX_MAP.grow = '1 0', _FLEX_MAP.shrink = '0 1', _FLEX_MAP);
var flexStyle = css(["flex:", ";"], function (props) {
  return "" + FLEX_MAP[props.flex] + (props.flex !== true ? ' auto' : '');
});
var StyledTabPanel = styled.div.withConfig({
  displayName: "StyledTabs__StyledTabPanel",
  componentId: "a4fwxl-1"
})(["min-height:0;", " ", ";"], function (props) {
  return props.flex && flexStyle;
}, function (props) {
  return props.theme.tabs.panel.extend;
});
StyledTabPanel.defaultProps = {};
Object.setPrototypeOf(StyledTabPanel.defaultProps, defaultProps);
var StyledTabs = styled.div.withConfig({
  displayName: "StyledTabs",
  componentId: "a4fwxl-2"
})(["", " ", ";"], genericStyles, function (props) {
  return props.theme.tabs.extend;
});
StyledTabs.defaultProps = {};
Object.setPrototypeOf(StyledTabs.defaultProps, defaultProps);
export { StyledTabsHeader, StyledTabPanel, StyledTabs };