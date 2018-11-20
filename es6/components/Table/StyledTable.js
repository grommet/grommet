import styled, { css } from 'styled-components';
import { genericStyles } from '../../utils';
var SIZE_MAP = {
  '1/2': '50%',
  '1/4': '25%',
  '2/4': '50%',
  '3/4': '75%',
  '1/3': '33.33%',
  '2/3': '66.66%'
};
var sizeStyle = css(["width:", ";max-width:", ";overflow:hidden;"], function (props) {
  return SIZE_MAP[props.size] || props.theme.global.size[props.size];
}, function (props) {
  return SIZE_MAP[props.size] || props.theme.global.size[props.size];
});
export var StyledTableCell = styled.td.withConfig({
  displayName: "StyledTable__StyledTableCell",
  componentId: "sc-1m3u5g-0"
})(["margin:0;padding:0;font-weight:inherit;text-align:inherit;height:100%;", " ", " ", ""], function (props) {
  return props.size && sizeStyle;
}, function (props) {
  return props.verticalAlign && "vertical-align: " + props.verticalAlign + ";";
}, function (props) {
  return props.tableContextTheme && props.tableContextTheme.extend;
});
export var StyledTableDataCaption = styled.caption.withConfig({
  displayName: "StyledTable__StyledTableDataCaption",
  componentId: "sc-1m3u5g-1"
})(["display:none;"]);
export var StyledTableRow = styled.tr.withConfig({
  displayName: "StyledTable__StyledTableRow",
  componentId: "sc-1m3u5g-2"
})(["height:100%;"]);
export var StyledTableBody = styled.tbody.withConfig({
  displayName: "StyledTable__StyledTableBody",
  componentId: "sc-1m3u5g-3"
})([""]);
export var StyledTableHeader = styled.thead.withConfig({
  displayName: "StyledTable__StyledTableHeader",
  componentId: "sc-1m3u5g-4"
})([""]);
export var StyledTableFooter = styled.tfoot.withConfig({
  displayName: "StyledTable__StyledTableFooter",
  componentId: "sc-1m3u5g-5"
})([""]);
export var StyledTable = styled.table.withConfig({
  displayName: "StyledTable",
  componentId: "sc-1m3u5g-6"
})(["border-spacing:0;border-collapse:collapse;", " ", ";"], genericStyles, function (props) {
  return props.theme.table && props.theme.table.extend;
});