import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';

import { Box } from '../Box';
import { withTheme } from '../hocs';

import { StyledTableCell } from './StyledTable';
import { docTableCell } from './doc';

const TableCell = ({ children, plain, scope, size, verticalAlign, ...rest }, { grommet }) => {
  const Cell = (scope ? StyledTableCell.withComponent('th') : StyledTableCell);
  return (
    <Cell
      scope={scope}
      size={size}
      tableContext={(grommet || {}).tableContext}
      theme={rest.theme}
      verticalAlign={verticalAlign}
    >
      {plain ? children : <Box {...rest}>{children}</Box>}
    </Cell>
  );
};

TableCell.contextTypes = {
  grommet: PropTypes.object,
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
