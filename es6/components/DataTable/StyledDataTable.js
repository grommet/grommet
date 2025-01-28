import styled, { css } from 'styled-components';
import { backgroundStyle, fillStyle, focusStyle, unfocusStyle, genericStyles, normalizeColor, styledComponentsConfig } from '../../utils';
import { Box } from '../Box';
import { TableRow } from '../TableRow';
import { Table } from '../Table';
import { TableBody } from '../TableBody';
import { TableCell } from '../TableCell';
import { TableHeader } from '../TableHeader';
import { TableFooter } from '../TableFooter';

// border-collapse: separate is needed so pinned header/footer borders work
var StyledDataTable = styled(Table).withConfig({
  displayName: "StyledDataTable",
  componentId: "sc-xrlyjm-0"
})(["position:relative;border-spacing:0;border-collapse:separate;", " ", " ", ";"], genericStyles, function (props) {
  return props.fillProp && fillStyle(props.fillProp);
}, function (props) {
  return props.theme.dataTable && props.theme.dataTable.body && props.theme.dataTable.body.extend;
});

// when paginated, this wraps the data table and pagination component
var StyledContainer = styled(Box).withConfig({
  displayName: "StyledDataTable__StyledContainer",
  componentId: "sc-xrlyjm-1"
})(["", ";"], function (props) {
  return props.theme.dataTable && props.theme.dataTable.container && props.theme.dataTable.container.extend;
});
var hoverStyle = css(["", " color:", ";"], function (props) {
  return backgroundStyle(normalizeColor(props.theme.table && props.theme.table.row && props.theme.table.row.hover && props.theme.table.row.hover.background || props.theme.global.hover.background, props.theme), props.theme);
}, function (props) {
  return normalizeColor(props.theme.table && props.theme.table.row && props.theme.table.row.hover && props.theme.table.row.hover.color || props.theme.global.hover.color, props.theme);
});
var rowStyles = css(["", " ", " ", ""], function (props) {
  return props.size && "display: table;\n    width: 100%;\n    table-layout: fixed;\n  ";
}, function (props) {
  return props.onClick && "cursor: pointer;";
}, function (props) {
  return props.active && hoverStyle;
});
var StyledDataTableRow = styled(TableRow).withConfig({
  displayName: "StyledDataTable__StyledDataTableRow",
  componentId: "sc-xrlyjm-2"
})(["", ";", ""], function (props) {
  var _props$theme$dataTabl;
  return (_props$theme$dataTabl = props.theme.dataTable) == null || (_props$theme$dataTabl = _props$theme$dataTabl.body) == null || (_props$theme$dataTabl = _props$theme$dataTabl.row) == null ? void 0 : _props$theme$dataTabl.extend;
}, rowStyles);
var StyledDataTableRowHeader = styled(TableRow).withConfig({
  displayName: "StyledDataTable__StyledDataTableRowHeader",
  componentId: "sc-xrlyjm-3"
})(["", ""], rowStyles);

// focus styling other than outline doesn't work on <tbody />
var StyledDataTableBody = styled(TableBody).withConfig({
  displayName: "StyledDataTable__StyledDataTableBody",
  componentId: "sc-xrlyjm-4"
})(["", " &:focus{", "}&:focus:not(:focus-visible){", "}"], function (props) {
  return props.size && "\n    display: block;\n    width: 100%;\n    max-height: " + (props.theme.global.size[props.size] || props.size) + ";\n    overflow: auto;\n  ";
}, focusStyle({
  skipSvgChildren: true,
  forceOutline: true
}), unfocusStyle({
  skipSvgChildren: true,
  forceOutline: true
}));
var StyledDataTableHeader = styled(TableHeader).withConfig({
  displayName: "StyledDataTable__StyledDataTableHeader",
  componentId: "sc-xrlyjm-5"
})(["", ""], function (props) {
  return props.size && "\n    height: fit-content;\n    display: table;\n    width: calc(100% - " + props.scrollOffset + "px);\n    table-layout: fixed;\n  ";
});
var StyledDataTableFooter = styled(TableFooter).withConfig({
  displayName: "StyledDataTable__StyledDataTableFooter",
  componentId: "sc-xrlyjm-6"
})(["", " ", ""], function (props) {
  return props.size && "\n    display: table;\n    width: calc(100% - " + props.scrollOffset + "px);\n    table-layout: fixed;\n  ";
}, function (props) {
  return props.pin && "\n      /* Safari needs the relative positioning of tfoot specified */\n      position: sticky;\n      bottom: 0;\n      z-index: 1;\n  ";
});
var StyledDataTableCell = styled(TableCell).withConfig({
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
var StyledPlaceholder = styled('caption').withConfig(styledComponentsConfig).withConfig({
  displayName: "StyledDataTable__StyledPlaceholder",
  componentId: "sc-xrlyjm-8"
})(["position:absolute;", " ", " left:0;right:0;"], function (props) {
  return "top: " + (props.top || 0) + "px;";
}, function (props) {
  return "bottom: " + (props.bottom || 0) + "px;";
});
export { StyledContainer, StyledDataTable, StyledDataTableRow, StyledDataTableRowHeader, StyledDataTableBody, StyledDataTableCell, StyledDataTableHeader, StyledDataTableFooter, StyledPlaceholder };