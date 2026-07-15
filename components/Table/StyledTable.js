"use strict";

exports.__esModule = true;
exports.StyledTableRow = exports.StyledTableHeader = exports.StyledTableFooter = exports.StyledTableDataCaption = exports.StyledTableCell = exports.StyledTableBody = exports.StyledTable = void 0;
var _styledComponents = _interopRequireWildcard(require("styled-components"));
var _utils = require("../../utils");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
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
var StyledTableDataCaption = exports.StyledTableDataCaption = _styledComponents["default"].caption.withConfig(_utils.styledComponentsConfig).withConfig({
  displayName: "StyledTable__StyledTableDataCaption",
  componentId: "sc-1m3u5g-1"
})(["", ""], function (props) {
  return (0, _utils.edgeStyle)('margin', props.theme.table.caption.margin, false, props.theme.global.edgeSize.responsiveBreakpoint, props.theme);
});
var StyledTableRow = exports.StyledTableRow = _styledComponents["default"].tr.withConfig(_utils.styledComponentsConfig).withConfig({
  displayName: "StyledTable__StyledTableRow",
  componentId: "sc-1m3u5g-2"
})([""]);
var StyledTableBody = exports.StyledTableBody = _styledComponents["default"].tbody.withConfig(_utils.styledComponentsConfig).withConfig({
  displayName: "StyledTable__StyledTableBody",
  componentId: "sc-1m3u5g-3"
})([""]);
var StyledTableHeader = exports.StyledTableHeader = _styledComponents["default"].thead.withConfig(_utils.styledComponentsConfig).withConfig({
  displayName: "StyledTable__StyledTableHeader",
  componentId: "sc-1m3u5g-4"
})([""]);
var StyledTableFooter = exports.StyledTableFooter = _styledComponents["default"].tfoot.withConfig(_utils.styledComponentsConfig).withConfig({
  displayName: "StyledTable__StyledTableFooter",
  componentId: "sc-1m3u5g-5"
})([""]);
var StyledTable = exports.StyledTable = _styledComponents["default"].table.withConfig(_utils.styledComponentsConfig).withConfig({
  displayName: "StyledTable",
  componentId: "sc-1m3u5g-6"
})(["border-spacing:0;border-collapse:collapse;width:inherit;", " ", ";"], _utils.genericStyles, function (props) {
  return props.theme.table && props.theme.table.extend;
});