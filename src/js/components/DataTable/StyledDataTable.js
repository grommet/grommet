import styled, { css } from 'styled-components';

import {
  backgroundStyle,
  fillStyle,
  focusStyle,
  unfocusStyle,
  genericStyles,
  normalizeColor,
} from '../../utils';
import { defaultProps } from '../../default-props';
import { Box } from '../Box';
import { TableRow } from '../TableRow';
import { Table } from '../Table';
import { TableBody } from '../TableBody';
import { TableCell } from '../TableCell';
import { TableHeader } from '../TableHeader';
import { TableFooter } from '../TableFooter';

// border-collapse: separate is needed so pinned header/footer borders work
const StyledDataTable = styled(Table)`
  position: relative;
  border-spacing: 0;
  border-collapse: separate;
  ${genericStyles}
  ${(props) => props.fillProp && fillStyle(props.fillProp)}
  ${(props) =>
    props.theme.dataTable &&
    props.theme.dataTable.body &&
    props.theme.dataTable.body.extend};
`;

StyledDataTable.defaultProps = {};
Object.setPrototypeOf(StyledDataTable.defaultProps, defaultProps);

// when paginated, this wraps the data table and pagination component
const StyledContainer = styled(Box)`
  ${(props) =>
    props.theme.dataTable &&
    props.theme.dataTable.container &&
    props.theme.dataTable.container.extend};
`;

StyledContainer.defaultProps = {};
Object.setPrototypeOf(StyledContainer.defaultProps, defaultProps);

const hoverStyle = css`
  ${(props) =>
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
  color: ${(props) =>
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
  ${(props) =>
    props.size &&
    `
    display: table;
    width: 100%;
    table-layout: fixed;
  `}
  ${(props) =>
    props.onClick &&
    `
    cursor: pointer;
  `}
  ${(props) => props.active && hoverStyle}
`;

StyledDataTableRow.defaultProps = {};
Object.setPrototypeOf(StyledDataTableRow.defaultProps, defaultProps);

// focus styling other than outline doesn't work on <tbody />
const StyledDataTableBody = styled(TableBody)`
  ${(props) =>
    props.size &&
    `
    display: block;
    width: 100%;
    max-height: ${props.theme.global.size[props.size] || props.size};
    overflow: auto;
  `}

  &:focus {
    ${focusStyle({ skipSvgChildren: true, forceOutline: true })}
  }

  &:focus:not(:focus-visible) {
    ${unfocusStyle({ skipSvgChildren: true, forceOutline: true })}
  }
`;

StyledDataTableBody.defaultProps = {};
Object.setPrototypeOf(StyledDataTableBody.defaultProps, defaultProps);

const StyledDataTableHeader = styled(TableHeader)`
  ${(props) =>
    props.size &&
    `
    height: fit-content;
    display: table;
    width: calc(100% - ${props.scrollOffset}px);
    table-layout: fixed;
  `}
`;

StyledDataTableHeader.defaultProps = {};
Object.setPrototypeOf(StyledDataTableHeader.defaultProps, defaultProps);

const StyledDataTableFooter = styled(TableFooter)`
  ${(props) =>
    props.size &&
    `
    display: table;
    width: calc(100% - ${props.scrollOffset}px);
    table-layout: fixed;
  `}
  ${(props) =>
    props.pin &&
    `
      /* Safari needs the relative positioning of tfoot specified */
      position: sticky;
      bottom: 0;
      z-index: 1;
  `}
`;

StyledDataTableFooter.defaultProps = {};
Object.setPrototypeOf(StyledDataTableFooter.defaultProps, defaultProps);

const StyledDataTableCell = styled(TableCell)`
  ${(props) =>
    props.context === 'header' &&
    props.theme.dataTable &&
    props.theme.dataTable.header &&
    props.theme.dataTable.header.extend};
  ${(props) =>
    props.pin &&
    props.pin.length > 0 &&
    `position: sticky;
    ${props.pin
      .map(
        (p) =>
          `${p}: ${
            (props.pinnedOffset &&
              props.pinnedOffset[p] &&
              `${props.pinnedOffset[p]}px`) ||
            0
          };`,
      )
      .join(' ')}
    z-index: ${Object.keys(props.pin).length};
  `}
  ${(props) =>
    props.pin &&
    props.pin.length > 0 &&
    props.theme.dataTable.pinned &&
    props.theme.dataTable.pinned[props.context] &&
    props.theme.dataTable.pinned[props.context].extend
      ? props.theme.dataTable.pinned[props.context].extend
      : ''}
`;

StyledDataTableCell.defaultProps = {};
Object.setPrototypeOf(StyledDataTableCell.defaultProps, defaultProps);

const StyledPlaceholder = styled('caption')`
  position: absolute;
  ${(props) => `top: ${props.top || 0}px;`}
  ${(props) => `bottom: ${props.bottom || 0}px;`}
  left: 0;
  right: 0;
`;

export {
  StyledContainer,
  StyledDataTable,
  StyledDataTableRow,
  StyledDataTableBody,
  StyledDataTableCell,
  StyledDataTableHeader,
  StyledDataTableFooter,
  StyledPlaceholder,
};
