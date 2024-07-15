import styled, { css } from 'styled-components';

import {
  backgroundStyle,
  borderStyle,
  edgeStyle,
  genericStyles,
  styledComponentsConfig,
} from '../../utils';
import { withTheme } from '../../default-props';

const SIZE_MAP = {
  '1/2': '50%',
  '1/4': '25%',
  '2/4': '50%',
  '3/4': '75%',
  '1/3': '33.33%',
  '2/3': '66.66%',
};

const sizeStyle = css`
  width: ${(props) =>
    props.size === 'auto'
      ? // setting width to a small value will allow
        // the cell to fit width of its content. this
        // is a commonly implemented CSS pattern to
        // allow an auto-width behavior on fixed table
        // layouts (which is what DataTable applies)
        // https://stackoverflow.com/questions/4757844/css-table-column-autowidth?noredirect=1&lq=1
        '1px'
      : SIZE_MAP[props.size] ||
        props.theme.global.size[props.size] ||
        props.size};
  max-width: ${(props) =>
    props.size !== 'auto'
      ? SIZE_MAP[props.size] ||
        props.theme.global.size[props.size] ||
        props.size
      : undefined};
  overflow: hidden;
`;

const StyledTableCell = styled.td
  .withConfig(styledComponentsConfig)
  .attrs(withTheme)`
  margin: 0;
  padding: 0;
  font-weight: inherit;
  text-align: inherit;

  ${(props) => props.size && sizeStyle}
  ${(props) => props.verticalAlign && `vertical-align: ${props.verticalAlign};`}
  ${(props) => props.align && `text-align: ${props.align};`}
  ${(props) =>
    props.background && backgroundStyle(props.background, props.theme)}
  ${(props) =>
    props.border && borderStyle(props.border, props.responsive, props.theme)}
  ${(props) =>
    props.pad &&
    edgeStyle(
      'padding',
      props.pad,
      props.responsive,
      props.theme.box.responsiveBreakpoint,
      props.theme,
    )}
  ${(props) => props.tableContextTheme && props.tableContextTheme.extend}
`;

const StyledTableDataCaption = styled.caption
  .withConfig(styledComponentsConfig)
  .attrs(withTheme)`
  margin-bottom: ${(props) => props.theme.global.edgeSize.xxsmall};
`;

const StyledTableRow = styled.tr.withConfig(styledComponentsConfig)``;

const StyledTableBody = styled.tbody.withConfig(styledComponentsConfig)``;

const StyledTableHeader = styled.thead.withConfig(styledComponentsConfig)``;

const StyledTableFooter = styled.tfoot.withConfig(styledComponentsConfig)``;

const StyledTable = styled.table
  .withConfig(styledComponentsConfig)
  .attrs(withTheme)`
  border-spacing: 0;
  border-collapse: collapse;
  width: inherit;
  ${genericStyles} ${(props) => props.theme.table && props.theme.table.extend};
`;

export {
  StyledTableCell,
  StyledTableDataCaption,
  StyledTableRow,
  StyledTableBody,
  StyledTableHeader,
  StyledTableFooter,
  StyledTable,
};
