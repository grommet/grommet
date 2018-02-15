import styled, { css } from 'styled-components';

const BASIS_MAP = {
  'auto': 'auto',
  'full': '100%',
  '1/2': '50%',
  '1/4': '25%',
  '3/4': '75%',
  '1/3': '33.33%',
  '2/3': '66.66%',
};

const basisStyle = css`
  width: ${props => BASIS_MAP[props.basis] || props.theme.global.size[props.basis]};
  max-width: ${props => BASIS_MAP[props.basis] || props.theme.global.size[props.basis]};
  overflow: hidden;
`;

export const StyledTableHeaderCell = styled.th`
  margin: 0;
  padding: 0;
  font-weight: inherit;
  vertical-align: bottom;

  ${props => props.basis && basisStyle}
`;

export const StyledTableFooterCell = styled.th`
  margin: 0;
  padding: 0;
  font-weight: inherit;
  vertical-align: top;

  ${props => props.basis && basisStyle}
`;

export const StyledTableDataCell = styled.td`
  margin: 0;
  padding: 0;

  ${props => props.basis && basisStyle}
`;

export const StyledTableDataCaption = styled.caption`
  display: none;
`;

const StyledTable = styled.table`
  border-spacing: 0;
  border-collapse: collapse;
`;

export default StyledTable.extend`
  ${props => props.theme.table && props.theme.table.extend}
`;
