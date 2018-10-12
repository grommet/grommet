import React from 'react';
import { compose } from 'recompose';

import { Box } from '../Box';
import { TableRow } from '../TableRow';
import { TableCell } from '../TableCell';
import { withTheme } from '../hocs';

import { Cell } from './Cell';
import { StyledDataTableFooter } from './StyledDataTable';

const Footer = ({
  columns, footerValues, groups, theme, ...rest
}) => (
  <StyledDataTableFooter {...rest}>
    <TableRow>
      {groups && (
        <TableCell size='xxsmall' plain verticalAlign='top'>
          <Box {...theme.dataTable.footer} />
        </TableCell>
      )}
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

const FooterWrapper = compose(
  withTheme,
)(Footer);

export { FooterWrapper as Footer };
