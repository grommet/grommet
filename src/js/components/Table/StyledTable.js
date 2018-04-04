import styled, { css } from 'styled-components';

const SIZE_MAP = {
  '1/2': '50%',
  '1/4': '25%',
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

  ${props => props.size && sizeStyle}
  ${props => props.verticalAlign && `vertical-align: ${props.verticalAlign};`}
  ${props => !props.verticalAlign && props.tableContext === 'header' && 'vertical-align: bottom;'}
  ${props => !props.verticalAlign && props.tableContext === 'footer' && 'vertical-align: top;'}
`;

export const StyledTableDataCaption = styled.caption`
  display: none;
`;

export const StyledTableRow = styled.tr`
`;

export const StyledTableBody = styled.tbody`
`;

export const StyledTableHeader = styled.thead`
`;

export const StyledTableFooter = styled.tfoot`
`;

const StyledTable = styled.table`
  border-spacing: 0;
  border-collapse: collapse;
`;

export default StyledTable.extend`
  ${props => props.theme.table && props.theme.table.extend}
`;
