import styled from 'styled-components';
import { genericStyles } from '../../utils';
import { defaultProps } from '../../default-props';
import { TableRow } from '../TableRow';
import { Table } from '../Table';
import { TableBody } from '../TableBody';
import { TableHeader } from '../TableHeader';
import { TableFooter } from '../TableFooter';
var StyledDataTable = styled(Table).withConfig({
  displayName: "StyledDataTable",
  componentId: "xrlyjm-0"
})(["border-spacing:0;border-collapse:collapse;height:100%;@-moz-document url-prefix(){height:auto;}", ";"], genericStyles);
StyledDataTable.defaultProps = {};
Object.setPrototypeOf(StyledDataTable.defaultProps, defaultProps);
var StyledDataTableRow = styled(TableRow).withConfig({
  displayName: "StyledDataTable__StyledDataTableRow",
  componentId: "xrlyjm-1"
})(["", ";"], function (props) {
  return props.size && "\n    display: table;\n    width: 100%;\n    table-layout: fixed;\n  ";
});
StyledDataTableRow.defaultProps = {};
Object.setPrototypeOf(StyledDataTableRow.defaultProps, defaultProps);
var StyledDataTableBody = styled(TableBody).withConfig({
  displayName: "StyledDataTable__StyledDataTableBody",
  componentId: "xrlyjm-2"
})(["", ";"], function (props) {
  return props.size && "\n    display: block;\n    width: 100%;\n    max-height: " + props.theme.global.size[props.size] + ";\n    overflow: auto;\n  ";
});
StyledDataTableBody.defaultProps = {};
Object.setPrototypeOf(StyledDataTableBody.defaultProps, defaultProps);
var StyledDataTableHeader = styled(TableHeader).withConfig({
  displayName: "StyledDataTable__StyledDataTableHeader",
  componentId: "xrlyjm-3"
})(["", ";"], function (props) {
  return props.size && "\n    display: table;\n    width: 100%;\n    table-layout: fixed;\n  ";
});
StyledDataTableHeader.defaultProps = {};
Object.setPrototypeOf(StyledDataTableHeader.defaultProps, defaultProps);
var StyledDataTableFooter = styled(TableFooter).withConfig({
  displayName: "StyledDataTable__StyledDataTableFooter",
  componentId: "xrlyjm-4"
})(["", ";"], function (props) {
  return props.size && "\n    display: table;\n    width: 100%;\n    table-layout: fixed;\n  ";
});
StyledDataTableFooter.defaultProps = {};
Object.setPrototypeOf(StyledDataTableFooter.defaultProps, defaultProps);
export { StyledDataTable, StyledDataTableRow, StyledDataTableBody, StyledDataTableHeader, StyledDataTableFooter };