import styled, { css } from 'styled-components';
import { backgroundStyle, fillStyle, focusStyle, genericStyles, normalizeColor } from '../../utils';
import { defaultProps } from '../../default-props';
import { TableRow } from '../TableRow';
import { Table } from '../Table';
import { TableBody } from '../TableBody';
import { TableCell } from '../TableCell';
import { TableHeader } from '../TableHeader';
import { TableFooter } from '../TableFooter'; // border-collapse: separate is needed so pinned header/footer borders work

var StyledDataTable = styled(Table).withConfig({
  displayName: "StyledDataTable",
  componentId: "xrlyjm-0"
})(["position:relative;border-spacing:0;border-collapse:separate;height:auto;", " ", " ", ";"], genericStyles, function (props) {
  return props.fillProp && fillStyle(props.fillProp);
}, function (props) {
  return props.theme.dataTable && props.theme.dataTable.body && props.theme.dataTable.body.extend;
});
StyledDataTable.defaultProps = {};
Object.setPrototypeOf(StyledDataTable.defaultProps, defaultProps);
var hoverStyle = css(["", " color:", ";"], function (props) {
  return backgroundStyle(normalizeColor(props.theme.table && props.theme.table.row && props.theme.table.row.hover && props.theme.table.row.hover.background || props.theme.global.hover.background, props.theme), props.theme);
}, function (props) {
  return normalizeColor(props.theme.table && props.theme.table.row && props.theme.table.row.hover && props.theme.table.row.hover.color || props.theme.global.hover.color, props.theme);
});
var StyledDataTableRow = styled(TableRow).withConfig({
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
StyledDataTableRow.defaultProps = {};
Object.setPrototypeOf(StyledDataTableRow.defaultProps, defaultProps); // focus styling other than outline doesn't work on <tbody />

var StyledDataTableBody = styled(TableBody).withConfig({
  displayName: "StyledDataTable__StyledDataTableBody",
  componentId: "xrlyjm-2"
})(["", " &:focus{", "}"], function (props) {
  return props.size && "\n    display: block;\n    width: 100%;\n    max-height: " + props.theme.global.size[props.size] + ";\n    overflow: auto;\n  ";
}, focusStyle({
  skipSvgChildren: true,
  forceOutline: true
}));
StyledDataTableBody.defaultProps = {};
Object.setPrototypeOf(StyledDataTableBody.defaultProps, defaultProps);
var StyledDataTableHeader = styled(TableHeader).withConfig({
  displayName: "StyledDataTable__StyledDataTableHeader",
  componentId: "xrlyjm-3"
})(["", ""], function (props) {
  return props.size && "\n    display: table;\n    width: calc(100% - " + props.scrollOffset + "px);\n    table-layout: fixed;\n  ";
});
StyledDataTableHeader.defaultProps = {};
Object.setPrototypeOf(StyledDataTableHeader.defaultProps, defaultProps);
var StyledDataTableFooter = styled(TableFooter).withConfig({
  displayName: "StyledDataTable__StyledDataTableFooter",
  componentId: "xrlyjm-4"
})(["", " ", ""], function (props) {
  return props.size && "\n    display: table;\n    width: calc(100% - " + props.scrollOffset + "px);\n    table-layout: fixed;\n  ";
}, function (props) {
  return props.pin && "\n      /* Safari needs the relative positioning of tfoot specified */\n      position: sticky;\n      bottom: 0;\n      z-index: 1;\n  ";
});
StyledDataTableFooter.defaultProps = {};
Object.setPrototypeOf(StyledDataTableFooter.defaultProps, defaultProps);
var StyledDataTableCell = styled(TableCell).withConfig({
  displayName: "StyledDataTable__StyledDataTableCell",
  componentId: "xrlyjm-5"
})(["", ";", ""], function (props) {
  return props.context === 'header' && props.theme.dataTable && props.theme.dataTable.header && props.theme.dataTable.header.extend;
}, function (props) {
  return props.pin && props.pin.length > 0 && "\n    position: sticky;\n    " + props.pin.map(function (p) {
    return p + ": 0;";
  }).join(' ') + "\n    z-index: " + Object.keys(props.pin).length + ";\n    " + (props.theme.dataTable && props.theme.dataTable.pinned && props.theme.dataTable.pinned[props.context] && props.theme.dataTable.pinned[props.context].extend ? props.theme.dataTable.pinned[props.context].extend : '') + "\n  ";
});
StyledDataTableCell.defaultProps = {};
Object.setPrototypeOf(StyledDataTableCell.defaultProps, defaultProps);
var StyledPlaceholder = styled('caption').withConfig({
  displayName: "StyledDataTable__StyledPlaceholder",
  componentId: "xrlyjm-6"
})(["position:absolute;", " ", " left:0;right:0;"], function (props) {
  return "top: " + (props.top || 0) + "px;";
}, function (props) {
  return "bottom: " + (props.bottom || 0) + "px;";
});
export { StyledDataTable, StyledDataTableRow, StyledDataTableBody, StyledDataTableCell, StyledDataTableHeader, StyledDataTableFooter, StyledPlaceholder };