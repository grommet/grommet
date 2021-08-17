"use strict";

exports.__esModule = true;
exports.StyledPlaceholder = exports.StyledDataTableFooter = exports.StyledDataTableHeader = exports.StyledDataTableCell = exports.StyledDataTableBody = exports.StyledDataTableRow = exports.StyledDataTable = exports.StyledContainer = void 0;

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _utils = require("../../utils");

var _defaultProps = require("../../default-props");

var _Box = require("../Box");

var _TableRow = require("../TableRow");

var _Table = require("../Table");

var _TableBody = require("../TableBody");

var _TableCell = require("../TableCell");

var _TableHeader = require("../TableHeader");

var _TableFooter = require("../TableFooter");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// border-collapse: separate is needed so pinned header/footer borders work
var StyledDataTable = (0, _styledComponents["default"])(_Table.Table).withConfig({
  displayName: "StyledDataTable",
  componentId: "xrlyjm-0"
})(["position:relative;border-spacing:0;border-collapse:separate;height:auto;", " ", " ", ";"], _utils.genericStyles, function (props) {
  return props.fillProp && (0, _utils.fillStyle)(props.fillProp);
}, function (props) {
  return props.theme.dataTable && props.theme.dataTable.body && props.theme.dataTable.body.extend;
});
exports.StyledDataTable = StyledDataTable;
StyledDataTable.defaultProps = {};
Object.setPrototypeOf(StyledDataTable.defaultProps, _defaultProps.defaultProps); // when paginated, this wraps the data table and pagination component

var StyledContainer = (0, _styledComponents["default"])(_Box.Box).withConfig({
  displayName: "StyledDataTable__StyledContainer",
  componentId: "xrlyjm-1"
})(["", ";"], function (props) {
  return props.theme.dataTable && props.theme.dataTable.container && props.theme.dataTable.container.extend;
});
exports.StyledContainer = StyledContainer;
StyledContainer.defaultProps = {};
Object.setPrototypeOf(StyledContainer.defaultProps, _defaultProps.defaultProps);
var hoverStyle = (0, _styledComponents.css)(["", " color:", ";"], function (props) {
  return (0, _utils.backgroundStyle)((0, _utils.normalizeColor)(props.theme.table && props.theme.table.row && props.theme.table.row.hover && props.theme.table.row.hover.background || props.theme.global.hover.background, props.theme), props.theme);
}, function (props) {
  return (0, _utils.normalizeColor)(props.theme.table && props.theme.table.row && props.theme.table.row.hover && props.theme.table.row.hover.color || props.theme.global.hover.color, props.theme);
});
var StyledDataTableRow = (0, _styledComponents["default"])(_TableRow.TableRow).withConfig({
  displayName: "StyledDataTable__StyledDataTableRow",
  componentId: "xrlyjm-2"
})(["", " ", "   ", ""], function (props) {
  return props.size && "\n    display: table;\n    width: 100%;\n    table-layout: fixed;\n  ";
}, function (props) {
  return props.onClick && "\n    cursor: pointer;\n  ";
}, function (props) {
  return props.active && hoverStyle;
});
exports.StyledDataTableRow = StyledDataTableRow;
StyledDataTableRow.defaultProps = {};
Object.setPrototypeOf(StyledDataTableRow.defaultProps, _defaultProps.defaultProps); // focus styling other than outline doesn't work on <tbody />

var StyledDataTableBody = (0, _styledComponents["default"])(_TableBody.TableBody).withConfig({
  displayName: "StyledDataTable__StyledDataTableBody",
  componentId: "xrlyjm-3"
})(["", " &:focus{", "}&:focus:not(:focus-visible){", "}"], function (props) {
  return props.size && "\n    display: block;\n    width: 100%;\n    max-height: " + props.theme.global.size[props.size] + ";\n    overflow: auto;\n  ";
}, (0, _utils.focusStyle)({
  skipSvgChildren: true,
  forceOutline: true
}), (0, _utils.unfocusStyle)({
  skipSvgChildren: true,
  forceOutline: true
}));
exports.StyledDataTableBody = StyledDataTableBody;
StyledDataTableBody.defaultProps = {};
Object.setPrototypeOf(StyledDataTableBody.defaultProps, _defaultProps.defaultProps);
var StyledDataTableHeader = (0, _styledComponents["default"])(_TableHeader.TableHeader).withConfig({
  displayName: "StyledDataTable__StyledDataTableHeader",
  componentId: "xrlyjm-4"
})(["", ""], function (props) {
  return props.size && "\n    display: table;\n    width: calc(100% - " + props.scrollOffset + "px);\n    table-layout: fixed;\n  ";
});
exports.StyledDataTableHeader = StyledDataTableHeader;
StyledDataTableHeader.defaultProps = {};
Object.setPrototypeOf(StyledDataTableHeader.defaultProps, _defaultProps.defaultProps);
var StyledDataTableFooter = (0, _styledComponents["default"])(_TableFooter.TableFooter).withConfig({
  displayName: "StyledDataTable__StyledDataTableFooter",
  componentId: "xrlyjm-5"
})(["", " ", ""], function (props) {
  return props.size && "\n    display: table;\n    width: calc(100% - " + props.scrollOffset + "px);\n    table-layout: fixed;\n  ";
}, function (props) {
  return props.pin && "\n      /* Safari needs the relative positioning of tfoot specified */\n      position: sticky;\n      bottom: 0;\n      z-index: 1;\n  ";
});
exports.StyledDataTableFooter = StyledDataTableFooter;
StyledDataTableFooter.defaultProps = {};
Object.setPrototypeOf(StyledDataTableFooter.defaultProps, _defaultProps.defaultProps);
var StyledDataTableCell = (0, _styledComponents["default"])(_TableCell.TableCell).withConfig({
  displayName: "StyledDataTable__StyledDataTableCell",
  componentId: "xrlyjm-6"
})(["", ";", " ", ""], function (props) {
  return props.context === 'header' && props.theme.dataTable && props.theme.dataTable.header && props.theme.dataTable.header.extend;
}, function (props) {
  return props.pin && props.pin.length > 0 && "position: sticky;\n    " + props.pin.map(function (p) {
    return p + ": " + (props.pinnedOffset && props.pinnedOffset[p] && props.pinnedOffset[p] + "px" || 0) + ";";
  }).join(' ') + "\n    z-index: " + Object.keys(props.pin).length + ";\n  ";
}, function (props) {
  return props.pin && props.pin.length > 0 && props.theme.dataTable.pinned && props.theme.dataTable.pinned[props.context] && props.theme.dataTable.pinned[props.context].extend ? props.theme.dataTable.pinned[props.context].extend : '';
});
exports.StyledDataTableCell = StyledDataTableCell;
StyledDataTableCell.defaultProps = {};
Object.setPrototypeOf(StyledDataTableCell.defaultProps, _defaultProps.defaultProps);
var StyledPlaceholder = (0, _styledComponents["default"])('caption').withConfig({
  displayName: "StyledDataTable__StyledPlaceholder",
  componentId: "xrlyjm-7"
})(["position:absolute;", " ", " left:0;right:0;"], function (props) {
  return "top: " + (props.top || 0) + "px;";
}, function (props) {
  return "bottom: " + (props.bottom || 0) + "px;";
});
exports.StyledPlaceholder = StyledPlaceholder;