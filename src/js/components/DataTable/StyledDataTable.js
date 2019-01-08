import styled, { css } from 'styled-components';

import { genericStyles, backgroundStyle, normalizeColor } from '../../utils';
import { defaultProps } from '../../default-props';

const StyledDataTable = styled.table`
  border-spacing: 0;
  border-collapse: collapse;
  height: 100%;
  ${genericStyles};
`;

StyledDataTable.defaultProps = {};
Object.setPrototypeOf(StyledDataTable.defaultProps, defaultProps);

const hoverStyle = css`
  &:hover {
    ${props => backgroundStyle(props.theme.global.hover.background, props.theme)}
    ${props => `color: ${normalizeColor(props.theme.global.hover.color, props.theme)}`};
  }
  cursor: pointer;
`;

const StyledDataTableRow = styled.tr`
  ${props => props.hoverIndicator && hoverStyle}
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

const StyledDataTableBody = styled.tbody`
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

const StyledDataTableHeader = styled.thead`
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

const StyledDataTableFooter = styled.tfoot`
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
