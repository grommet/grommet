import React from 'react';
import { compose } from 'recompose';

import { withTheme } from 'styled-components';

import { defaultProps } from '../../default-props';

import { TableRow } from '../TableRow';
import { TableCell } from '../TableCell';

import { Cell } from './Cell';
import { StyledDataTableFooter } from './StyledDataTable';

const Footer = ({
  background,
  border,
  columns,
  footerValues,
  groups,
  pad,
  primaryProperty,
  theme,
  ...rest
}) => (
  <StyledDataTableFooter {...rest}>
    <TableRow>
      {groups && (
        <TableCell plain size="xxsmall" pad="none" verticalAlign="top" />
      )}
      {columns.map(column => (
        <Cell
          key={column.property}
          background={background}
          border={border}
          context="footer"
          column={column}
          datum={footerValues}
          pad={pad}
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
