import React, { forwardRef, useContext, useEffect, useRef } from 'react';
import { ThemeContext } from 'styled-components';
import { useLayoutEffect } from '../../utils/use-isomorphic-layout-effect';

import { defaultProps } from '../../default-props';
import { useForwardedRef } from '../../utils';

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
      onWidth,
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
    const tableContext = useContext(TableContext);
    const cellRef = useForwardedRef(ref);
    const containerRef = useRef();

    useLayoutEffect(() => {
      if (onWidth) {
        const { width } = cellRef.current.getBoundingClientRect();
        onWidth(width);
      }
    }, [cellRef, onWidth]);

    // if window resizes, recalculate cell height so that content
    // will continue to fill the height if the dimensions of the cell
    // have changed
    useEffect(() => {
      const updateHeight = () => {
        if (plain === 'noPad') {
          const cell = cellRef.current;
          const container = containerRef.current;
          if (cell && container) {
            container.style.height = '';
            const cellRect = cell.getBoundingClientRect();

            // height must match cell height otherwise table will apply some
            // margin around the cell content
            container.style.height = `${Math.max(
              cellRect.height -
                (border || theme.table[tableContext].border
                  ? theme.global.borderSize.xsmall.replace('px', '')
                  : 0),
              0,
            )}px`;
          }
        }
      };

      window.addEventListener('resize', updateHeight);
      updateHeight();
      return () => {
        window.removeEventListener('resize', updateHeight);
      };
    }, [
      border,
      cellRef,
      plain,
      tableContext,
      theme.global.borderSize,
      theme.table,
    ]);

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
      if (rest[key] === undefined) mergedProps[key] = tableContextTheme[key];
    });
    // split out background, border, and pad
    const cellProps = {
      align: align || mergedProps.align || undefined,
      background: background || mergedProps.background || undefined,
      border: border || mergedProps.border || undefined,
      pad: plain !== 'noPad' ? pad || mergedProps.pad || undefined : undefined,
      verticalAlign: verticalAlign || mergedProps.verticalAlign || undefined,
    };
    delete mergedProps.align;
    delete mergedProps.background;
    delete mergedProps.border;
    delete mergedProps.pad;
    delete mergedProps.verticalAlign;

    let content = children;
    if (plain === 'noPad' && children) {
      // a Box with explicitly set height is necessary
      // for the child contents to be able to fill the
      // TableCell
      content = (
        <Box ref={containerRef} justify="center">
          {children}
        </Box>
      );
    }

    return (
      <StyledTableCell
        ref={cellRef}
        as={scope ? 'th' : undefined}
        scope={scope}
        size={size}
        colSpan={colSpan}
        tableContext={tableContext}
        tableContextTheme={tableContextTheme}
        {...(plain === true ? mergedProps : {})}
        {...cellProps}
        className={className}
      >
        {plain || !Object.keys(mergedProps).length ? (
          content
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
