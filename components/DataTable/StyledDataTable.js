"use strict";

exports.__esModule = true;
exports.StyledPlaceholder = exports.StyledDataTableRowHeader = exports.StyledDataTableRow = exports.StyledDataTableHeader = exports.StyledDataTableFooter = exports.StyledDataTableCell = exports.StyledDataTableBody = exports.StyledDataTable = exports.StyledContainer = void 0;
var _styledComponents = _interopRequireWildcard(require("styled-components"));
var _utils = require("../../utils");
var _Box = require("../Box");
var _TableRow = require("../TableRow");
var _Table = require("../Table");
var _TableBody = require("../TableBody");
var _TableCell = require("../TableCell");
var _TableHeader = require("../TableHeader");
var _TableFooter = require("../TableFooter");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
// border-collapse: separate is needed so pinned header/footer borders work
var StyledDataTable = exports.StyledDataTable = (0, _styledComponents["default"])(_Table.Table).withConfig({
  displayName: "StyledDataTable",
  componentId: "sc-xrlyjm-0"
})(["position:relative;border-spacing:0;border-collapse:separate;", " ", " ", ";"], _utils.genericStyles, function (props) {
  return props.fillProp && (0, _utils.fillStyle)(props.fillProp);
}, function (props) {
  return props.theme.dataTable && props.theme.dataTable.body && props.theme.dataTable.body.extend;
});

// when paginated, this wraps the data table and pagination component
var StyledContainer = exports.StyledContainer = (0, _styledComponents["default"])(_Box.Box).withConfig({
  displayName: "StyledDataTable__StyledContainer",
  componentId: "sc-xrlyjm-1"
})(["", ";"], function (props) {
  return props.theme.dataTable && props.theme.dataTable.container && props.theme.dataTable.container.extend;
});
var hoverStyle = (0, _styledComponents.css)(["", " color:", ";"], function (props) {
  return (0, _utils.backgroundStyle)((0, _utils.normalizeColor)(props.theme.table && props.theme.table.row && props.theme.table.row.hover && props.theme.table.row.hover.background || props.theme.global.hover.background, props.theme), props.theme);
}, function (props) {
  return (0, _utils.normalizeColor)(props.theme.table && props.theme.table.row && props.theme.table.row.hover && props.theme.table.row.hover.color || props.theme.global.hover.color, props.theme);
});
var rowStyles = (0, _styledComponents.css)(["", " ", " ", ""], function (props) {
  return props.size && "display: table;\n    width: 100%;\n    table-layout: fixed;\n  ";
}, function (props) {
  return props.onClick && "cursor: pointer;";
}, function (props) {
  return props.active && hoverStyle;
});
var StyledDataTableRow = exports.StyledDataTableRow = (0, _styledComponents["default"])(_TableRow.TableRow).withConfig({
  displayName: "StyledDataTable__StyledDataTableRow",
  componentId: "sc-xrlyjm-2"
})(["&:focus{", "}&:focus:not(:focus-visible){", "}", ";", ""], (0, _utils.focusStyle)(), (0, _utils.unfocusStyle)(), function (props) {
  var _props$theme$dataTabl;
  return (_props$theme$dataTabl = props.theme.dataTable) == null || (_props$theme$dataTabl = _props$theme$dataTabl.body) == null || (_props$theme$dataTabl = _props$theme$dataTabl.row) == null ? void 0 : _props$theme$dataTabl.extend;
}, rowStyles);
var StyledDataTableRowHeader = exports.StyledDataTableRowHeader = (0, _styledComponents["default"])(_TableRow.TableRow).withConfig({
  displayName: "StyledDataTable__StyledDataTableRowHeader",
  componentId: "sc-xrlyjm-3"
})(["", ""], rowStyles);

// focus styling other than outline doesn't work on <tbody />
var StyledDataTableBody = exports.StyledDataTableBody = (0, _styledComponents["default"])(_TableBody.TableBody).withConfig({
  displayName: "StyledDataTable__StyledDataTableBody",
  componentId: "sc-xrlyjm-4"
})(["", " &:focus{", "}&:focus:not(:focus-visible){", "}"], function (props) {
  return props.size && "\n    display: block;\n    width: 100%;\n    max-height: " + (props.theme.global.size[props.size] || props.size) + ";\n    overflow: auto;\n  ";
}, (0, _utils.focusStyle)({
  skipSvgChildren: true,
  forceOutline: true
}), (0, _utils.unfocusStyle)({
  skipSvgChildren: true,
  forceOutline: true
}));
var StyledDataTableHeader = exports.StyledDataTableHeader = (0, _styledComponents["default"])(_TableHeader.TableHeader).withConfig({
  displayName: "StyledDataTable__StyledDataTableHeader",
  componentId: "sc-xrlyjm-5"
})(["", ""], function (props) {
  return props.size && "\n    height: fit-content;\n    display: table;\n    width: calc(100% - " + props.scrollOffset + "px);\n    table-layout: fixed;\n  ";
});
var StyledDataTableFooter = exports.StyledDataTableFooter = (0, _styledComponents["default"])(_TableFooter.TableFooter).withConfig({
  displayName: "StyledDataTable__StyledDataTableFooter",
  componentId: "sc-xrlyjm-6"
})(["", " ", ""], function (props) {
  return props.size && "\n    display: table;\n    width: calc(100% - " + props.scrollOffset + "px);\n    table-layout: fixed;\n  ";
}, function (props) {
  return props.pin && "\n      /* Safari needs the relative positioning of tfoot specified */\n      position: sticky;\n      bottom: 0;\n      z-index: 1;\n  ";
});
var StyledDataTableCell = exports.StyledDataTableCell = (0, _styledComponents["default"])(_TableCell.TableCell).withConfig({
  displayName: "StyledDataTable__StyledDataTableCell",
  componentId: "sc-xrlyjm-7"
})(["", ";", " ", ""], function (props) {
  return props.context === 'header' && props.theme.dataTable && props.theme.dataTable.header && props.theme.dataTable.header.extend;
}, function (props) {
  return props.pin && props.pin.length > 0 && "position: sticky;\n    " + props.pin.map(function (p) {
    return p + ": " + (props.pinnedOffset && props.pinnedOffset[p] && props.pinnedOffset[p] + "px" || 0) + ";";
  }).join(' ') + "\n    z-index: " + Object.keys(props.pin).length + ";\n  ";
}, function (props) {
  return props.pin && props.pin.length > 0 && props.theme.dataTable.pinned && props.theme.dataTable.pinned[props.context] && props.theme.dataTable.pinned[props.context].extend ? props.theme.dataTable.pinned[props.context].extend : '';
});
var StyledPlaceholder = exports.StyledPlaceholder = (0, _styledComponents["default"])('caption').withConfig(_utils.styledComponentsConfig).withConfig({
  displayName: "StyledDataTable__StyledPlaceholder",
  componentId: "sc-xrlyjm-8"
})(["position:absolute;", " ", " left:0;right:0;"], function (props) {
  return "top: " + (props.top || 0) + "px;";
}, function (props) {
  return "bottom: " + (props.bottom || 0) + "px;";
});