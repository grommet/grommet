import React from 'react';
import { compose } from 'recompose';

import { Box } from '../Box';
import { withTheme } from '../hocs';

import { TableContext } from '../Table/TableContext';
import { StyledTableCell } from '../Table/StyledTable';

const TableCell = ({
  children, plain, scope, size, theme, verticalAlign, ...rest
}) => (
  <TableContext.Consumer>
    {(tableContext) => {
      let tableContextTheme;
      if (tableContext === 'header') {
        tableContextTheme = theme.table && theme.table.header;
      } else if (tableContext === 'footer') {
        tableContextTheme = theme.table && theme.table.footer;
      } else {
        tableContextTheme = theme.table && theme.table.body;
      }
      const boxProps = { ...rest };
      Object.keys(boxProps).forEach((key) => {
        if (tableContextTheme[key] && boxProps[key] === undefined) {
          delete boxProps[key];
        }
      });

      return (
        <StyledTableCell
          as={scope ? 'th' : undefined}
          scope={scope}
          size={size}
          tableContext={tableContext}
          tableContextTheme={tableContextTheme}
          theme={theme}
          verticalAlign={verticalAlign
            || (tableContextTheme ? tableContextTheme.verticalAlign : undefined)
          }
          {...(plain ? rest : {})}
        >
          {plain ? children : (
            <Box {...tableContextTheme} {...boxProps}>{children}</Box>
          )}
        </StyledTableCell>
      );
    }}
  </TableContext.Consumer>
);

let TableCellDoc;
if (process.env.NODE_ENV !== 'production') {
  TableCellDoc = require('./doc').doc(TableCell); // eslint-disable-line global-require
}
const TableCellWrapper = compose(
  withTheme,
)(TableCellDoc || TableCell);

export { TableCellWrapper as TableCell };
