"use strict";

exports.__esModule = true;
exports.StyledTableRow = exports.StyledTableHeader = exports.StyledTableFooter = exports.StyledTableDataCaption = exports.StyledTableCell = exports.StyledTableBody = exports.StyledTable = void 0;
var _styledComponents = _interopRequireWildcard(require("styled-components"));
var _utils = require("../../utils");
var _defaultProps = require("../../default-props");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var SIZE_MAP = {
  '1/2': '50%',
  '1/4': '25%',
  '2/4': '50%',
  '3/4': '75%',
  '1/3': '33.33%',
  '2/3': '66.66%'
};
var sizeStyle = (0, _styledComponents.css)(["width:", ";max-width:", ";overflow:hidden;"], function (props) {
  return props.size === 'auto' ?
  // setting width to a small value will allow
  // the cell to fit width of its content. this
  // is a commonly implemented CSS pattern to
  // allow an auto-width behavior on fixed table
  // layouts (which is what DataTable applies)
  // https://stackoverflow.com/questions/4757844/css-table-column-autowidth?noredirect=1&lq=1
  '1px' : SIZE_MAP[props.size] || props.theme.global.size[props.size] || props.size;
}, function (props) {
  return props.size !== 'auto' ? SIZE_MAP[props.size] || props.theme.global.size[props.size] || props.size : undefined;
});
var StyledTableCell = exports.StyledTableCell = _styledComponents["default"].td.withConfig(_utils.styledComponentsConfig).withConfig({
  displayName: "StyledTable__StyledTableCell",
  componentId: "sc-1m3u5g-0"
})(["margin:0;padding:0;font-weight:inherit;text-align:inherit;", " ", " ", " ", " ", " ", " ", ""], function (props) {
  return props.size && sizeStyle;
}, function (props) {
  return props.verticalAlign && "vertical-align: " + props.verticalAlign + ";";
}, function (props) {
  return props.align && "text-align: " + props.align + ";";
}, function (props) {
  return props.background && (0, _utils.backgroundStyle)(props.background, props.theme);
}, function (props) {
  return props.border && (0, _utils.borderStyle)(props.border, props.responsive, props.theme);
}, function (props) {
  return props.pad && (0, _utils.edgeStyle)('padding', props.pad, props.responsive, props.theme.box.responsiveBreakpoint, props.theme);
}, function (props) {
  return props.tableContextTheme && props.tableContextTheme.extend;
});
StyledTableCell.defaultProps = {};
Object.setPrototypeOf(StyledTableCell.defaultProps, _defaultProps.defaultProps);
var StyledTableDataCaption = exports.StyledTableDataCaption = _styledComponents["default"].caption.withConfig(_utils.styledComponentsConfig).withConfig({
  displayName: "StyledTable__StyledTableDataCaption",
  componentId: "sc-1m3u5g-1"
})(["margin-bottom:", ";"], function (props) {
  return props.theme.global.edgeSize.xxsmall;
});
StyledTableDataCaption.defaultProps = {};
Object.setPrototypeOf(StyledTableDataCaption.defaultProps, _defaultProps.defaultProps);
var StyledTableRow = exports.StyledTableRow = _styledComponents["default"].tr.withConfig(_utils.styledComponentsConfig).withConfig({
  displayName: "StyledTable__StyledTableRow",
  componentId: "sc-1m3u5g-2"
})([""]);
StyledTableRow.defaultProps = {};
Object.setPrototypeOf(StyledTableRow.defaultProps, _defaultProps.defaultProps);
var StyledTableBody = exports.StyledTableBody = _styledComponents["default"].tbody.withConfig(_utils.styledComponentsConfig).withConfig({
  displayName: "StyledTable__StyledTableBody",
  componentId: "sc-1m3u5g-3"
})([""]);
StyledTableBody.defaultProps = {};
Object.setPrototypeOf(StyledTableBody.defaultProps, _defaultProps.defaultProps);
var StyledTableHeader = exports.StyledTableHeader = _styledComponents["default"].thead.withConfig(_utils.styledComponentsConfig).withConfig({
  displayName: "StyledTable__StyledTableHeader",
  componentId: "sc-1m3u5g-4"
})([""]);
StyledTableHeader.defaultProps = {};
Object.setPrototypeOf(StyledTableHeader.defaultProps, _defaultProps.defaultProps);
var StyledTableFooter = exports.StyledTableFooter = _styledComponents["default"].tfoot.withConfig(_utils.styledComponentsConfig).withConfig({
  displayName: "StyledTable__StyledTableFooter",
  componentId: "sc-1m3u5g-5"
})([""]);
StyledTableFooter.defaultProps = {};
Object.setPrototypeOf(StyledTableFooter.defaultProps, _defaultProps.defaultProps);
var StyledTable = exports.StyledTable = _styledComponents["default"].table.withConfig(_utils.styledComponentsConfig).withConfig({
  displayName: "StyledTable",
  componentId: "sc-1m3u5g-6"
})(["border-spacing:0;border-collapse:collapse;width:inherit;", " ", ";"], _utils.genericStyles, function (props) {
  return props.theme.table && props.theme.table.extend;
});
StyledTable.defaultProps = {};
Object.setPrototypeOf(StyledTable.defaultProps, _defaultProps.defaultProps);