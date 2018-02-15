import styled from 'styled-components';

export const StyledTableHeaderCell = styled.th`
  margin: 0;
  padding: 0;
  font-weight: inherit;
`;

export const StyledTableDataCell = styled.td`
  margin: 0;
  padding: 0;
`;

const StyledTable = styled.table`
  border-spacing: 0;
  border-collapse: collapse;
`;

export default StyledTable.extend`
  ${props => props.theme.table && props.theme.table.extend}
`;
