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
      columnPin,
      pad,
      plain,
      pin,
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
          let pinnedDataTableTheme;
          let tableContextTheme;
          if (tableContext === 'header') {
            tableContextTheme = theme.table && theme.table.header;
            if (Array.isArray(pin) && pin[0] === 'top') {
              pinnedDataTableTheme =
                theme.dataTable &&
                theme.dataTable.pinned &&
                theme.dataTable.pinned.header;
            }
          } else if (tableContext === 'footer') {
            tableContextTheme = theme.table && theme.table.footer;
            if (Array.isArray(pin) && pin[0] === 'bottom') {
              pinnedDataTableTheme =
                theme.dataTable &&
                theme.dataTable.pinned &&
                theme.dataTable.pinned.footer;
            }
          } else {
            tableContextTheme = theme.table && theme.table.body;
            if (columnPin)
              pinnedDataTableTheme =
                theme.dataTable &&
                theme.dataTable.pinned &&
                theme.dataTable.pinned.body;
          }
          // merge tabelContextTheme and rest
          const mergedProps = {
            ...tableContextTheme,
            ...pinnedDataTableTheme,
            ...rest,
          };
          Object.keys(mergedProps).forEach(key => {
            if (rest[key] === undefined)
              mergedProps[key] =
                // allow pinned cell theming from DataTable to override default
                pinnedDataTableTheme && pinnedDataTableTheme[key]
                  ? pinnedDataTableTheme[key]
                  : tableContextTheme[key];
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
              pinnedDataTableTheme={pinnedDataTableTheme}
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
