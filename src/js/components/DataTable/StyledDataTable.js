import styled from 'styled-components';

import { genericStyles } from '../../utils';
import { defaultProps } from '../../default-props';
import { TableRow } from '../TableRow';
import { Table } from '../Table';
import { TableBody } from '../TableBody';
import { TableHeader } from '../TableHeader';
import { TableFooter } from '../TableFooter';

const StyledDataTable = styled(Table)`
  border-spacing: 0;
  border-collapse: collapse;
  height: 100%;

  /* Firefox hack to get table contents to not overflow */
  @-moz-document url-prefix() {
    height: auto;
  }
  ${genericStyles};
`;

StyledDataTable.defaultProps = {};
Object.setPrototypeOf(StyledDataTable.defaultProps, defaultProps);

const StyledDataTableRow = styled(TableRow)`
  ${props =>
    props.size &&
    `
    display: table;
    width: 100%;
    table-layout: fixed;
  `};
`;

StyledDataTableRow.defaultProps = {};
Object.setPrototypeOf(StyledDataTableRow.defaultProps, defaultProps);

const StyledDataTableBody = styled(TableBody)`
  ${props =>
    props.size &&
    `
    display: block;
    width: 100%;
    max-height: ${props.theme.global.size[props.size]};
    overflow: auto;
  `};
`;

StyledDataTableBody.defaultProps = {};
Object.setPrototypeOf(StyledDataTableBody.defaultProps, defaultProps);

const StyledDataTableHeader = styled(TableHeader)`
  ${props =>
    props.size &&
    `
    display: table;
    width: 100%;
    table-layout: fixed;
  `};
`;

StyledDataTableHeader.defaultProps = {};
Object.setPrototypeOf(StyledDataTableHeader.defaultProps, defaultProps);

const StyledDataTableFooter = styled(TableFooter)`
  ${props =>
    props.size &&
    `
    display: table;
    width: 100%;
    table-layout: fixed;
  `};
`;

StyledDataTableFooter.defaultProps = {};
Object.setPrototypeOf(StyledDataTableFooter.defaultProps, defaultProps);

export {
  StyledDataTable,
  StyledDataTableRow,
  StyledDataTableBody,
  StyledDataTableHeader,
  StyledDataTableFooter,
};
