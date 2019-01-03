import React from 'react';
import { compose } from 'recompose';

import { withTheme } from 'styled-components';

import { defaultProps } from '../../default-props';

import { Box } from '../Box';
import { TableRow } from '../TableRow';
import { TableFooter } from '../TableFooter';
import { TableCell } from '../TableCell';

import { Cell } from './Cell';
import { StyledDataTableFooter } from './StyledDataTable';

const Footer = ({
  columns,
  footerValues,
  groups,
  primaryProperty,
  theme,
  ...rest
}) => (
  <StyledDataTableFooter as={TableFooter} {...rest}>
    <TableRow>
      {groups && (
        <TableCell size="xxsmall" plain verticalAlign="top">
          <Box {...{ ...theme.table.footer, ...theme.dataTable.footer }} />
        </TableCell>
      )}
      {columns.map(column => (
        <Cell
          key={column.property}
          context="footer"
          column={column}
          datum={footerValues}
          primaryProperty={primaryProperty}
        />
      ))}
    </TableRow>
  </StyledDataTableFooter>
);

Footer.defaultProps = {};
Object.setPrototypeOf(Footer.defaultProps, defaultProps);

const FooterWrapper = compose(withTheme)(Footer);

export { FooterWrapper as Footer };
