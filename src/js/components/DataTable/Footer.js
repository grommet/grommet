import React from 'react';
import { compose } from 'recompose';

import { withTheme } from 'styled-components';

import { defaultProps } from '../../default-props';
import { keepKeys } from '../../utils';

import { Box } from '../Box';
import { TableRow } from '../TableRow';
import { TableFooter } from '../TableFooter';
import { TableCell } from '../TableCell';

import { Cell } from './Cell';
import { StyledDataTableFooter } from './StyledDataTable';
import { boxProps } from '../Box/doc';

const Footer = ({ columns, footerValues, groups, theme, ...rest }) => (
  <StyledDataTableFooter as={TableFooter} {...rest}>
    <TableRow>
      {groups && (
        <TableCell size="xxsmall" plain verticalAlign="top">
          <Box
            {...keepKeys(
              { ...theme.table.footer, ...theme.dataTable.footer },
              boxProps,
            )}
          />
        </TableCell>
      )}
      {columns.map(column => (
        <Cell
          key={column.property}
          context="footer"
          column={column}
          datum={footerValues}
        />
      ))}
    </TableRow>
  </StyledDataTableFooter>
);

Footer.defaultProps = {};
Object.setPrototypeOf(Footer.defaultProps, defaultProps);

const FooterWrapper = compose(withTheme)(Footer);

export { FooterWrapper as Footer };
