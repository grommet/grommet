import React, { forwardRef } from 'react';

import { defaultProps } from '../../default-props';

import { TableRow } from '../TableRow';
import { TableCell } from '../TableCell';

import { Cell } from './Cell';
import { StyledDataTableCell, StyledDataTableFooter } from './StyledDataTable';

const Footer = forwardRef(
  (
    {
      cellProps,
      columns,
      fill,
      footerValues,
      groups,
      onSelect,
      pin: pinProp,
      pinnedOffset,
      primaryProperty,
      selected,
      verticalAlign,
      ...rest
    },
    ref,
  ) => {
    const pin = pinProp ? ['bottom'] : [];

    return (
      <StyledDataTableFooter ref={ref} fillProp={fill} pin={pinProp} {...rest}>
        <TableRow>
          {groups && (
            <TableCell
              plain
              size="xxsmall"
              pad="none"
              verticalAlign="top"
              background={cellProps.background}
              border={cellProps.border}
            />
          )}
          {(selected || onSelect) && (
            <StyledDataTableCell
              background={cellProps.background}
              context="footer"
              pin={pin}
              verticalAlign={verticalAlign}
            />
          )}
          {columns.map((column) => {
            const cellPin = [...pin];
            if (column.pin) cellPin.push('left');

            return (
              <Cell
                key={column.property}
                background={
                  (column.pin && cellProps.pinned.background) ||
                  cellProps.background
                }
                border={
                  (column.pin && cellProps.pinned.border) || cellProps.border
                }
                context="footer"
                column={column}
                datum={footerValues}
                pad={(column.pin && cellProps.pinned.pad) || cellProps.pad}
                pin={pin.length ? pin : undefined}
                pinnedOffset={pinnedOffset && pinnedOffset[column.property]}
                primaryProperty={primaryProperty}
                verticalAlign={verticalAlign}
              />
            );
          })}
        </TableRow>
      </StyledDataTableFooter>
    );
  },
);

Footer.displayName = 'Footer';

Footer.defaultProps = {};
Object.setPrototypeOf(Footer.defaultProps, defaultProps);

export { Footer };
