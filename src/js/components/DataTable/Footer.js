import React from 'react';
import { compose } from 'recompose';

import { TableRow, TableCell } from '../Table';
import { Box } from '../Box';
import { withTheme } from '../hocs';

import Cell from './Cell';
import { StyledDataTableFooter } from './StyledDataTable';

const Footer = ({ columns, footerValues, groups, theme, ...rest }) => (
  <StyledDataTableFooter {...rest}>
    <TableRow>
      {groups ? (
        <TableCell size='xxsmall' plain={true} verticalAlign='top'>
          <Box {...theme.dataTable.footer} />
        </TableCell>
      ) : null}
      {columns.map(column => (
        <Cell
          key={column.property}
          context='footer'
          column={column}
          datum={footerValues}
          theme={theme}
        />
      ))}
    </TableRow>
  </StyledDataTableFooter>
);

export default compose(
  withTheme,
)(Footer);
