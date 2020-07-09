import styled, { css } from 'styled-components';

import {
  backgroundStyle,
  focusStyle,
  genericStyles,
  normalizeColor,
} from '../../utils';
import { defaultProps } from '../../default-props';
import { TableRow } from '../TableRow';
import { Table } from '../Table';
import { TableBody } from '../TableBody';
import { TableHeader } from '../TableHeader';
import { TableFooter } from '../TableFooter';

const StyledDataTable = styled(Table)`
  border-spacing: 0;
  border-collapse: collapse;
  height: auto; /* helps Firefox to get table contents to not overflow */

  ${genericStyles} ${props =>
    props.theme.dataTable &&
    props.theme.dataTable.body &&
    props.theme.dataTable.body.extend};
`;

StyledDataTable.defaultProps = {};
Object.setPrototypeOf(StyledDataTable.defaultProps, defaultProps);

const hoverStyle = css`
  ${props =>
    backgroundStyle(
      normalizeColor(
        (props.theme.table &&
          props.theme.table.row &&
          props.theme.table.row.hover &&
          props.theme.table.row.hover.background) ||
          props.theme.global.hover.background,
        props.theme,
      ),
      props.theme,
    )}
  color: ${props =>
    normalizeColor(
      (props.theme.table &&
        props.theme.table.row &&
        props.theme.table.row.hover &&
        props.theme.table.row.hover.color) ||
        props.theme.global.hover.color,
      props.theme,
    )};
`;

const StyledDataTableRow = styled(TableRow)`
  ${props =>
    props.size &&
    `
    display: table;
    width: 100%;
    table-layout: fixed;
  `}
  ${props =>
    props.onClick &&
    `
    cursor: pointer;
  `}
  &:hover {
    ${props => props.onClickRow && !props.active && hoverStyle}
  }
  ${props => props.active && hoverStyle}
`;

StyledDataTableRow.defaultProps = {};
Object.setPrototypeOf(StyledDataTableRow.defaultProps, defaultProps);

// focus styling other than outline doesn't work on <tbody />
const StyledDataTableBody = styled(TableBody)`
  ${props =>
    props.size &&
    `
    display: block;
    width: 100%;
    max-height: ${props.theme.global.size[props.size]};
    overflow: auto;
  `}

  &:focus {
    ${focusStyle({ skipSvgChildren: true, forceOutline: true })}
  }
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
  `}
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
  `}
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
