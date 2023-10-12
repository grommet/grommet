import React, {
  forwardRef,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { ThemeContext } from 'styled-components';
import { useLayoutEffect } from '../../utils/use-isomorphic-layout-effect';

import { defaultProps } from '../../default-props';
import { backgroundIsDark, useForwardedRef } from '../../utils';

import { Box } from '../Box';

import { TableContext } from '../Table/TableContext';
import { StyledTableCell } from '../Table/StyledTable';
import { TableCellPropTypes } from './propTypes';

export const verticalAlignToJustify = {
  middle: 'center',
  top: 'start',
  bottom: 'end',
};

const TableCell = forwardRef(
  (
    {
      align,
      'aria-disabled': ariaDisabled,
      background,
      border,
      children,
      className, // so StyledDataTableCell is applied to td/th
      colSpan,
      onWidth,
      pad,
      plain,
      rowSpan,
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
    // merge tableContextTheme and rest
    const mergedProps = { ...tableContextTheme, ...rest };
    Object.keys(mergedProps).forEach((key) => {
      if (rest[key] === undefined) mergedProps[key] = tableContextTheme[key];
    });
    // split out background, border, pad, and aria-disabled
    const cellProps = {
      align: align || mergedProps.align || undefined,
      'aria-disabled': ariaDisabled || undefined,
      background: background || mergedProps.background || undefined,
      border: border || mergedProps.border || undefined,
      pad: plain !== 'noPad' ? pad || mergedProps.pad || undefined : undefined,
      verticalAlign: verticalAlign || mergedProps.verticalAlign || undefined,
    };
    delete mergedProps.align;
    delete mergedProps.ariaDisabled;
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
        <Box
          ref={containerRef}
          justify={
            verticalAlign ? verticalAlignToJustify[verticalAlign] : 'center'
          }
        >
          {children}
        </Box>
      );
    }

    // construct a new theme object in case we have a background that wants
    // to change the background color context
    const nextTheme = useMemo(() => {
      let result;
      if (cellProps.background || theme.darkChanged) {
        const dark = backgroundIsDark(cellProps.background, theme);
        const darkChanged = dark !== undefined && dark !== theme.dark;
        if (darkChanged || theme.darkChanged) {
          result = { ...theme };
          result.dark = dark === undefined ? theme.dark : dark;
          result.background = cellProps.background;
        } else if (cellProps.background) {
          // This allows DataTable to intelligently set the background
          // of a pinned header or footer.
          result = { ...theme };
          result.background = cellProps.background;
        }
      }
      return result || theme;
    }, [cellProps.background, theme]);

    return (
      <ThemeContext.Provider value={nextTheme}>
        <StyledTableCell
          ref={cellRef}
          as={scope ? 'th' : undefined}
          scope={scope}
          size={size}
          colSpan={colSpan}
          rowSpan={rowSpan}
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
      </ThemeContext.Provider>
    );
  },
);

TableCell.displayName = 'TableCell';
TableCell.propTypes = TableCellPropTypes;

export { TableCell };
