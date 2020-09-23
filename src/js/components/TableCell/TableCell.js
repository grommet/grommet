import React, { forwardRef, useContext } from 'react';
import { ThemeContext } from 'styled-components';

import { defaultProps } from '../../default-props';

import { Box } from '../Box';

import { TableContext } from '../Table/TableContext';
import { StyledTableCell } from '../Table/StyledTable';

const verticalAlignToJustify = {
  middle: 'center',
  top: 'start',
  bottom: 'end',
};

const TableCell = forwardRef(
  (
    {
      align,
      background,
      border,
      children,
      className, // so StyledDataTableCell is applied to td/th
      colSpan,
      pad,
      plain,
      scope,
      size,
      verticalAlign,
      ...rest
    },
    ref,
  ) => {
    const theme = useContext(ThemeContext) || defaultProps.theme;
    return (
      <TableContext.Consumer>
        {tableContext => {
          let tableContextTheme;
          if (tableContext === 'header') {
            tableContextTheme = theme.table && theme.table.header;
          } else if (tableContext === 'footer') {
            tableContextTheme = theme.table && theme.table.footer;
          } else {
            tableContextTheme = theme.table && theme.table.body;
          }
          // merge tabelContextTheme and rest
          const mergedProps = { ...tableContextTheme, ...rest };
          Object.keys(mergedProps).forEach(key => {
            if (rest[key] === undefined)
              mergedProps[key] = tableContextTheme[key];
          });
          // split out background, border, and pad
          const cellProps = {
            align: align || mergedProps.align || undefined,
            background: background || mergedProps.background || undefined,
            border: border || mergedProps.border || undefined,
            pad: pad || mergedProps.pad || undefined,
            verticalAlign:
              verticalAlign || mergedProps.verticalAlign || undefined,
          };
          delete mergedProps.align;
          delete mergedProps.background;
          delete mergedProps.border;
          delete mergedProps.pad;
          delete mergedProps.verticalAlign;

          return (
            <StyledTableCell
              ref={ref}
              as={scope ? 'th' : undefined}
              scope={scope}
              size={size}
              colSpan={colSpan}
              tableContext={tableContext}
              tableContextTheme={tableContextTheme}
              {...(plain ? mergedProps : {})}
              {...cellProps}
              className={className}
            >
              {plain || !Object.keys(mergedProps).length ? (
                children
              ) : (
                <Box
                  {...mergedProps}
                  align={align}
                  justify={verticalAlignToJustify[verticalAlign]}
                >
                  {children}
                </Box>
              )}
            </StyledTableCell>
          );
        }}
      </TableContext.Consumer>
    );
  },
);

TableCell.displayName = 'TableCell';

let TableCellDoc;
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  TableCellDoc = require('./doc').doc(TableCell);
}
const TableCellWrapper = TableCellDoc || TableCell;

export { TableCellWrapper as TableCell };
