import React from 'react';

import { defaultProps } from '../../default-props';

import { TableRow } from '../TableRow';
import { TableCell } from '../TableCell';

import { Cell } from './Cell';
import { StyledDataTableFooter } from './StyledDataTable';

const Footer = ({
  background,
  border,
  columns,
  fill,
  footerValues,
  groups,
  pad,
  pin: tablePin,
  primaryProperty,
  ...rest
}) => (
  <StyledDataTableFooter fillProp={fill} {...rest}>
    <TableRow>
      {groups && (
        <TableCell plain size="xxsmall" pad="none" verticalAlign="top" />
      )}
      {columns.map(column => {
        const pin = [];
        if (tablePin) pin.push('bottom');
        if (column.pin) pin.push('left');
        return (
          <Cell
            key={column.property}
            background={background}
            border={border}
            context="footer"
            column={column}
            datum={footerValues}
            pad={pad}
            pin={pin}
            primaryProperty={primaryProperty}
          />
        );
      })}
    </TableRow>
  </StyledDataTableFooter>
);

Footer.displayName = 'Footer';

Footer.defaultProps = {};
Object.setPrototypeOf(Footer.defaultProps, defaultProps);

export { Footer };
