"use strict";

exports.__esModule = true;
exports.StyledTabs = exports.StyledTabPanel = exports.StyledTabsHeader = void 0;

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _utils = require("../../utils");

var _defaultProps = require("../../default-props");

var _FLEX_MAP;

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var StyledTabsHeader = _styledComponents["default"].div.withConfig({
  displayName: "StyledTabs__StyledTabsHeader",
  componentId: "a4fwxl-0"
})(["", ";"], function (props) {
  return props.theme.tabs.header.extend;
});

exports.StyledTabsHeader = StyledTabsHeader;
StyledTabsHeader.defaultProps = {};
Object.setPrototypeOf(StyledTabsHeader.defaultProps, _defaultProps.defaultProps);
var FLEX_MAP = (_FLEX_MAP = {}, _FLEX_MAP[true] = '1 1', _FLEX_MAP[false] = '0 0', _FLEX_MAP.grow = '1 0', _FLEX_MAP.shrink = '0 1', _FLEX_MAP);
var flexStyle = (0, _styledComponents.css)(["flex:", ";"], function (props) {
  return "" + FLEX_MAP[props.flex] + (props.flex !== true ? ' auto' : '');
});

var StyledTabPanel = _styledComponents["default"].div.withConfig({
  displayName: "StyledTabs__StyledTabPanel",
  componentId: "a4fwxl-1"
})(["min-height:0;", " ", ";"], function (props) {
  return props.flex && flexStyle;
}, function (props) {
  return props.theme.tabs.panel.extend;
});

exports.StyledTabPanel = StyledTabPanel;
StyledTabPanel.defaultProps = {};
Object.setPrototypeOf(StyledTabPanel.defaultProps, _defaultProps.defaultProps);

var StyledTabs = _styledComponents["default"].div.withConfig({
  displayName: "StyledTabs",
  componentId: "a4fwxl-2"
})(["", " ", ";"], _utils.genericStyles, function (props) {
  return props.theme.tabs.extend;
});

exports.StyledTabs = StyledTabs;
StyledTabs.defaultProps = {};
Object.setPrototypeOf(StyledTabs.defaultProps, _defaultProps.defaultProps);