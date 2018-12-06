import React from 'react';
import { compose } from 'recompose';

import { withTheme } from 'styled-components';

import { defaultProps } from '../../default-props';
import { keepKeys } from '../../utils';

import { Box } from '../Box';
import { boxProps } from '../Box/doc';

import { TableContext } from '../Table/TableContext';
import { StyledTableCell } from '../Table/StyledTable';

const TableCell = ({
  children,
  plain,
  scope,
  size,
  theme,
  verticalAlign,
  ...rest
}) => (
  <TableContext.Consumer>
    {tableContext => {
      let tableContextTheme;
      if (tableContext === 'header') {
        tableContextTheme = theme.table && theme.table.header;
      } else if (tableContext === 'footer') {
        tableContextTheme = theme.table && theme.table.footer;
      } else {
        tableContextTheme = theme.table && theme.table.body;
      }

      return (
        <StyledTableCell
          as={scope ? 'th' : undefined}
          scope={scope}
          size={size}
          tableContext={tableContext}
          tableContextTheme={tableContextTheme}
          verticalAlign={
            verticalAlign ||
            (tableContextTheme ? tableContextTheme.verticalAlign : undefined)
          }
          {...(plain ? rest : {})}
        >
          {plain ? (
            children
          ) : (
            <Box
              {...keepKeys(rest, boxProps)}
              {...keepKeys(tableContextTheme, boxProps)}
            >
              {children}
            </Box>
          )}
        </StyledTableCell>
      );
    }}
  </TableContext.Consumer>
);

TableCell.defaultProps = {};
Object.setPrototypeOf(TableCell.defaultProps, defaultProps);

let TableCellDoc;
if (process.env.NODE_ENV !== 'production') {
  TableCellDoc = require('./doc').doc(TableCell); // eslint-disable-line global-require
}
const TableCellWrapper = compose(withTheme)(TableCellDoc || TableCell);

export { TableCellWrapper as TableCell };
