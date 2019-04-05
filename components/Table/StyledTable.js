"use strict";

exports.__esModule = true;
exports.StyledTable = exports.StyledTableFooter = exports.StyledTableHeader = exports.StyledTableBody = exports.StyledTableRow = exports.StyledTableDataCaption = exports.StyledTableCell = void 0;

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _utils = require("../../utils");

var _defaultProps = require("../../default-props");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var SIZE_MAP = {
  '1/2': '50%',
  '1/4': '25%',
  '2/4': '50%',
  '3/4': '75%',
  '1/3': '33.33%',
  '2/3': '66.66%'
};
var sizeStyle = (0, _styledComponents.css)(["width:", ";max-width:", ";overflow:hidden;"], function (props) {
  return SIZE_MAP[props.size] || props.theme.global.size[props.size];
}, function (props) {
  return SIZE_MAP[props.size] || props.theme.global.size[props.size];
});

var StyledTableCell = _styledComponents.default.td.withConfig({
  displayName: "StyledTable__StyledTableCell",
  componentId: "sc-1m3u5g-0"
})(["margin:0;padding:0;font-weight:inherit;text-align:inherit;height:100%;", " ", " ", ""], function (props) {
  return props.size && sizeStyle;
}, function (props) {
  return props.verticalAlign && "vertical-align: " + props.verticalAlign + ";";
}, function (props) {
  return props.tableContextTheme && props.tableContextTheme.extend;
});

exports.StyledTableCell = StyledTableCell;
StyledTableCell.defaultProps = {};
Object.setPrototypeOf(StyledTableCell.defaultProps, _defaultProps.defaultProps);

var StyledTableDataCaption = _styledComponents.default.caption.withConfig({
  displayName: "StyledTable__StyledTableDataCaption",
  componentId: "sc-1m3u5g-1"
})(["display:none;"]);

exports.StyledTableDataCaption = StyledTableDataCaption;
StyledTableDataCaption.defaultProps = {};
Object.setPrototypeOf(StyledTableDataCaption.defaultProps, _defaultProps.defaultProps);

var StyledTableRow = _styledComponents.default.tr.withConfig({
  displayName: "StyledTable__StyledTableRow",
  componentId: "sc-1m3u5g-2"
})(["height:100%;"]);

exports.StyledTableRow = StyledTableRow;
StyledTableRow.defaultProps = {};
Object.setPrototypeOf(StyledTableRow.defaultProps, _defaultProps.defaultProps);

var StyledTableBody = _styledComponents.default.tbody.withConfig({
  displayName: "StyledTable__StyledTableBody",
  componentId: "sc-1m3u5g-3"
})([""]);

exports.StyledTableBody = StyledTableBody;
StyledTableBody.defaultProps = {};
Object.setPrototypeOf(StyledTableBody.defaultProps, _defaultProps.defaultProps);

var StyledTableHeader = _styledComponents.default.thead.withConfig({
  displayName: "StyledTable__StyledTableHeader",
  componentId: "sc-1m3u5g-4"
})([""]);

exports.StyledTableHeader = StyledTableHeader;
StyledTableHeader.defaultProps = {};
Object.setPrototypeOf(StyledTableHeader.defaultProps, _defaultProps.defaultProps);

var StyledTableFooter = _styledComponents.default.tfoot.withConfig({
  displayName: "StyledTable__StyledTableFooter",
  componentId: "sc-1m3u5g-5"
})([""]);

exports.StyledTableFooter = StyledTableFooter;
StyledTableFooter.defaultProps = {};
Object.setPrototypeOf(StyledTableFooter.defaultProps, _defaultProps.defaultProps);

var StyledTable = _styledComponents.default.table.withConfig({
  displayName: "StyledTable",
  componentId: "sc-1m3u5g-6"
})(["border-spacing:0;border-collapse:collapse;width:inherit;@media all and (min--moz-device-pixel-ratio:0){table-layout:fixed;}", " ", ";"], _utils.genericStyles, function (props) {
  return props.theme.table && props.theme.table.extend;
});

exports.StyledTable = StyledTable;
StyledTable.defaultProps = {};
Object.setPrototypeOf(StyledTable.defaultProps, _defaultProps.defaultProps);