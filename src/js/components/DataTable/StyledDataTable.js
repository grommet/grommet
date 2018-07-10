import styled from 'styled-components';

// height 1px is so cells can take the full height
// https://stackoverflow.com/a/34781198/8513067
export const StyledDataTableRow = styled.tr`
  height: 1px;
  ${props => props.size && `
    display: table;
    width: 100%;
    table-layout: fixed;
  `}
`;

export const StyledDataTableBody = styled.tbody`
  ${props => props.size && `
    display: block;
    width: 100%;
    max-height: ${props.theme.global.size[props.size]};
    overflow: auto;
  `}
`;

export const StyledDataTableHeader = styled.thead`
  ${props => props.size && `
    display: table;
    width: 100%;
    table-layout: fixed;
  `}
`;

export const StyledDataTableFooter = styled.tfoot`
  ${props => props.size && `
    display: table;
    width: 100%;
    table-layout: fixed;
  `}
`;

export default {};
