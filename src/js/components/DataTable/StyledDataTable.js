import styled from 'styled-components';

import { genericStyles } from '../../utils';

export const StyledDataTable = styled.table`
  border-spacing: 0;
  border-collapse: collapse;
  height: 100%;
  ${genericStyles};
`;

export const StyledDataTableRow = styled.tr`
  ${props =>
    props.size &&
    `
    display: table;
    width: 100%;
    table-layout: fixed;
  `};
`;

export const StyledDataTableBody = styled.tbody`
  ${props =>
    props.size &&
    `
    display: block;
    width: 100%;
    max-height: ${props.theme.global.size[props.size]};
    overflow: auto;
  `};
`;

export const StyledDataTableHeader = styled.thead`
  ${props =>
    props.size &&
    `
    display: table;
    width: 100%;
    table-layout: fixed;
  `};
`;

export const StyledDataTableFooter = styled.tfoot`
  ${props =>
    props.size &&
    `
    display: table;
    width: 100%;
    table-layout: fixed;
  `};
`;
