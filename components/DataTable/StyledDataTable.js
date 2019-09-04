"use strict";

exports.__esModule = true;
exports.StyledDataTableFooter = exports.StyledDataTableHeader = exports.StyledDataTableBody = exports.StyledDataTableRow = exports.StyledDataTable = void 0;

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _utils = require("../../utils");

var _defaultProps = require("../../default-props");

var _TableRow = require("../TableRow");

var _Table = require("../Table");

var _TableBody = require("../TableBody");

var _TableHeader = require("../TableHeader");

var _TableFooter = require("../TableFooter");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

var StyledDataTable = (0, _styledComponents["default"])(_Table.Table).withConfig({
  displayName: "StyledDataTable",
  componentId: "xrlyjm-0"
})(["border-spacing:0;border-collapse:collapse;height:100%;@-moz-document url-prefix(){height:auto;}", ";"], _utils.genericStyles);
exports.StyledDataTable = StyledDataTable;
StyledDataTable.defaultProps = {};
Object.setPrototypeOf(StyledDataTable.defaultProps, _defaultProps.defaultProps);
var hoverStyle = (0, _styledComponents.css)(["", " color:", ";"], function (props) {
  return (0, _utils.backgroundStyle)((0, _utils.normalizeColor)(props.theme.table && props.theme.table.row && props.theme.table.row.hover && props.theme.table.row.hover.background || props.theme.global.hover.background, props.theme), props.theme);
}, function (props) {
  return (0, _utils.normalizeColor)(props.theme.table && props.theme.table.row && props.theme.table.row.hover && props.theme.table.row.hover.color || props.theme.global.hover.color, props.theme);
});
var StyledDataTableRow = (0, _styledComponents["default"])(_TableRow.TableRow).withConfig({
  displayName: "StyledDataTable__StyledDataTableRow",
  componentId: "xrlyjm-1"
})(["", " ", " &:hover{", "}", ""], function (props) {
  return props.size && "\n    display: table;\n    width: 100%;\n    table-layout: fixed;\n  ";
}, function (props) {
  return props.onClick && "\n    cursor: pointer;\n  ";
}, function (props) {
  return props.onClickRow && !props.active && hoverStyle;
}, function (props) {
  return props.active && hoverStyle;
});
exports.StyledDataTableRow = StyledDataTableRow;
StyledDataTableRow.defaultProps = {};
Object.setPrototypeOf(StyledDataTableRow.defaultProps, _defaultProps.defaultProps);
var StyledDataTableBody = (0, _styledComponents["default"])(_TableBody.TableBody).withConfig({
  displayName: "StyledDataTable__StyledDataTableBody",
  componentId: "xrlyjm-2"
})(["", " ", ""], function (props) {
  return props.size && "\n    display: block;\n    width: 100%;\n    max-height: " + props.theme.global.size[props.size] + ";\n    overflow: auto;\n  ";
}, function (props) {
  return props.focus && _utils.focusStyle;
});
exports.StyledDataTableBody = StyledDataTableBody;
StyledDataTableBody.defaultProps = {};
Object.setPrototypeOf(StyledDataTableBody.defaultProps, _defaultProps.defaultProps);
var StyledDataTableHeader = (0, _styledComponents["default"])(_TableHeader.TableHeader).withConfig({
  displayName: "StyledDataTable__StyledDataTableHeader",
  componentId: "xrlyjm-3"
})(["", ""], function (props) {
  return props.size && "\n    display: table;\n    width: 100%;\n    table-layout: fixed;\n  ";
});
exports.StyledDataTableHeader = StyledDataTableHeader;
StyledDataTableHeader.defaultProps = {};
Object.setPrototypeOf(StyledDataTableHeader.defaultProps, _defaultProps.defaultProps);
var StyledDataTableFooter = (0, _styledComponents["default"])(_TableFooter.TableFooter).withConfig({
  displayName: "StyledDataTable__StyledDataTableFooter",
  componentId: "xrlyjm-4"
})(["", ""], function (props) {
  return props.size && "\n    display: table;\n    width: 100%;\n    table-layout: fixed;\n  ";
});
exports.StyledDataTableFooter = StyledDataTableFooter;
StyledDataTableFooter.defaultProps = {};
Object.setPrototypeOf(StyledDataTableFooter.defaultProps, _defaultProps.defaultProps);