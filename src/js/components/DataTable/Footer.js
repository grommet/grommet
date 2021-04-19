import React, { forwardRef, useContext } from 'react';
import { ThemeContext } from 'styled-components';

import { defaultProps } from '../../default-props';

import { TableRow } from '../TableRow';
import { TableCell } from '../TableCell';

import { Cell } from './Cell';
import { StyledDataTableCell, StyledDataTableFooter } from './StyledDataTable';
import { normalizeBackgroundColor } from './buildState';

const calcBackground = (backgroundProp, pin, theme) => {
  let background;
  if (backgroundProp) background = backgroundProp;
  else if (
    pin.length > 0 &&
    theme.dataTable.pinned &&
    theme.dataTable.pinned.footer
  ) {
    background = theme.dataTable.pinned.footer.background;
    if (!background.color && theme.background) {
      // theme context has an active background color but the
      // theme doesn't set an explicit color, repeat the context
      // background explicitly
      background = {
        ...background,
        color: normalizeBackgroundColor(theme),
      };
    }
  } else background = undefined;
  return background;
};

const Footer = forwardRef(
  (
    {
      background,
      border,
      columns,
      fill,
      footerValues,
      groups,
      onSelect,
      pad,
      pin: tablePin,
      primaryProperty,
      selected,
      ...rest
    },
    ref,
  ) => {
    const theme = useContext(ThemeContext) || defaultProps.theme;
    const pin = tablePin ? ['bottom'] : [];

    return (
      <StyledDataTableFooter ref={ref} fillProp={fill} pin={tablePin} {...rest}>
        <TableRow>
          {groups && (
            <TableCell plain size="xxsmall" pad="none" verticalAlign="top" />
          )}
          {(selected || onSelect) && (
            <StyledDataTableCell
              background={calcBackground(background, pin, theme)}
              pin={pin}
            />
          )}
          {columns.map(column => {
            const cellPin = [...pin];
            if (column.pin) cellPin.push('left');
            return (
              <Cell
                key={column.property}
                background={background}
                border={border}
                context="footer"
                column={column}
                datum={footerValues}
                pad={pad}
                pin={pin.length ? pin : undefined}
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
