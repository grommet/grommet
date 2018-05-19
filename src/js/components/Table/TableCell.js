import React from 'react';
import { compose } from 'recompose';

import { Box } from '../Box';
import { withTheme } from '../hocs';

import TableContext from './TableContext';
import { StyledTableCell } from './StyledTable';
import { docTableCell } from './doc';

const TableCell = ({ children, plain, scope, size, theme, verticalAlign, ...rest }) => {
  const Cell = (scope ? StyledTableCell.withComponent('th') : StyledTableCell);
  return (
    <TableContext.Consumer>
      {tableContext => (
        <Cell
          scope={scope}
          size={size}
          tableContext={tableContext}
          theme={theme}
          verticalAlign={verticalAlign}
        >
          {plain ? children : <Box {...rest}>{children}</Box>}
        </Cell>
      )}
    </TableContext.Consumer>
  );
};

TableCell.defaultProps = {
  align: 'start',
  pad: { horizontal: 'small', vertical: 'xsmall' },
};

if (process.env.NODE_ENV !== 'production') {
  docTableCell(TableCell);
}

export default compose(
  withTheme,
)(TableCell);
