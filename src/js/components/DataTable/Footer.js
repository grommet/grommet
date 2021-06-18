import React, { forwardRef, useContext } from 'react';
import { ThemeContext } from 'styled-components';

import { defaultProps } from '../../default-props';

import { TableRow } from '../TableRow';
import { TableCell } from '../TableCell';

import { Cell } from './Cell';
import { StyledDataTableCell, StyledDataTableFooter } from './StyledDataTable';
import { calcPinnedBackground } from './buildState';

const Footer = forwardRef(
  (
    {
      cellProps,
      columns,
      fill,
      footerValues,
      groups,
      onSelect,
      pin: tablePin,
      pinnedOffset,
      primaryProperty,
      selected,
      ...rest
    },
    ref,
  ) => {
    const theme = useContext(ThemeContext) || defaultProps.theme;
    const pin = tablePin ? ['bottom'] : [];
    console.log('!!! Footer', cellProps);

    return (
      <StyledDataTableFooter ref={ref} fillProp={fill} pin={tablePin} {...rest}>
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
              background={calcPinnedBackground(
                cellProps.background,
                pin,
                theme,
                'footer',
              )}
              context="footer"
              pin={pin}
            />
          )}
          {columns.map(column => {
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
