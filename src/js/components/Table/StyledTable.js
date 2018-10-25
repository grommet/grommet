import styled, { css } from 'styled-components';

import { genericStyles } from '../../utils';

const SIZE_MAP = {
  '1/2': '50%',
  '1/4': '25%',
  '2/4': '50%',
  '3/4': '75%',
  '1/3': '33.33%',
  '2/3': '66.66%',
};

const sizeStyle = css`
  width: ${props => SIZE_MAP[props.size] || props.theme.global.size[props.size]};
  max-width: ${props => SIZE_MAP[props.size] || props.theme.global.size[props.size]};
  overflow: hidden;
`;

export const StyledTableCell = styled.td`
  margin: 0;
  padding: 0;
  font-weight: inherit;
  text-align: inherit;
  height: 100%;

  ${props => props.size && sizeStyle}
  ${props => props.verticalAlign && `vertical-align: ${props.verticalAlign};`}
  ${props => props.tableContextTheme && props.tableContextTheme.extend}
`;

export const StyledTableDataCaption = styled.caption`
  display: none;
`;

export const StyledTableRow = styled.tr`
  height: 100%;
`;

export const StyledTableBody = styled.tbody``;

export const StyledTableHeader = styled.thead``;

export const StyledTableFooter = styled.tfoot``;

export const StyledTable = styled.table`
  border-spacing: 0;
  border-collapse: collapse;

  ${genericStyles} ${props => props.theme.table && props.theme.table.extend};
`;
