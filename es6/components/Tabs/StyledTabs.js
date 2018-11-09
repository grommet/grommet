import styled from 'styled-components';
import { genericStyles } from '../../utils';
export var StyledTabsHeader = styled.div.withConfig({
  displayName: "StyledTabs__StyledTabsHeader",
  componentId: "a4fwxl-0"
})(["", ";"], function (props) {
  return props.theme.tabs.header.extend;
});
export var StyledTabs = styled.div.withConfig({
  displayName: "StyledTabs",
  componentId: "a4fwxl-1"
})(["", " ", ";"], genericStyles, function (props) {
  return props.theme.tabs.extend;
});