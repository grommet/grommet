"use strict";

exports.__esModule = true;
exports.StyledTabs = exports.StyledTabsHeader = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StyledTabsHeader = _styledComponents.default.div.withConfig({
  displayName: "StyledTabs__StyledTabsHeader",
  componentId: "a4fwxl-0"
})(["", ";"], function (props) {
  return props.theme.tabs.header.extend;
});

exports.StyledTabsHeader = StyledTabsHeader;

var StyledTabs = _styledComponents.default.div.withConfig({
  displayName: "StyledTabs",
  componentId: "a4fwxl-1"
})(["", " ", ";"], _utils.genericStyles, function (props) {
  return props.theme.tabs.extend;
});

exports.StyledTabs = StyledTabs;