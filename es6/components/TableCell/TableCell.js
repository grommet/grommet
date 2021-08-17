var _excluded = ["align", "background", "border", "children", "className", "colSpan", "onWidth", "pad", "plain", "scope", "size", "verticalAlign"];

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { forwardRef, useContext, useEffect, useMemo, useRef } from 'react';
import { ThemeContext } from 'styled-components';
import { useLayoutEffect } from '../../utils/use-isomorphic-layout-effect';
import { defaultProps } from '../../default-props';
import { backgroundIsDark, useForwardedRef } from '../../utils';
import { Box } from '../Box';
import { TableContext } from '../Table/TableContext';
import { StyledTableCell } from '../Table/StyledTable';
import { TableCellPropTypes } from './propTypes';
var verticalAlignToJustify = {
  middle: 'center',
  top: 'start',
  bottom: 'end'
};
var TableCell = /*#__PURE__*/forwardRef(function (_ref, ref) {
  var align = _ref.align,
      background = _ref.background,
      border = _ref.border,
      children = _ref.children,
      className = _ref.className,
      colSpan = _ref.colSpan,
      onWidth = _ref.onWidth,
      pad = _ref.pad,
      plain = _ref.plain,
      scope = _ref.scope,
      size = _ref.size,
      verticalAlign = _ref.verticalAlign,
      rest = _objectWithoutPropertiesLoose(_ref, _excluded);

  var theme = useContext(ThemeContext) || defaultProps.theme;
  var tableContext = useContext(TableContext);
  var cellRef = useForwardedRef(ref);
  var containerRef = useRef();
  useLayoutEffect(function () {
    if (onWidth) {
      var _cellRef$current$getB = cellRef.current.getBoundingClientRect(),
          width = _cellRef$current$getB.width;

      onWidth(width);
    }
  }, [cellRef, onWidth]); // if window resizes, recalculate cell height so that content
  // will continue to fill the height if the dimensions of the cell
  // have changed

  useEffect(function () {
    var updateHeight = function updateHeight() {
      if (plain === 'noPad') {
        var cell = cellRef.current;
        var container = containerRef.current;

        if (cell && container) {
          container.style.height = '';
          var cellRect = cell.getBoundingClientRect(); // height must match cell height otherwise table will apply some
          // margin around the cell content

          container.style.height = Math.max(cellRect.height - (border || theme.table[tableContext].border ? theme.global.borderSize.xsmall.replace('px', '') : 0), 0) + "px";
        }
      }
    };

    window.addEventListener('resize', updateHeight);
    updateHeight();
    return function () {
      window.removeEventListener('resize', updateHeight);
    };
  }, [border, cellRef, plain, tableContext, theme.global.borderSize, theme.table]);
  var tableContextTheme;

  if (tableContext === 'header') {
    tableContextTheme = theme.table && theme.table.header;
  } else if (tableContext === 'footer') {
    tableContextTheme = theme.table && theme.table.footer;
  } else {
    tableContextTheme = theme.table && theme.table.body;
  } // merge tabelContextTheme and rest


  var mergedProps = _extends({}, tableContextTheme, rest);

  Object.keys(mergedProps).forEach(function (key) {
    if (rest[key] === undefined) mergedProps[key] = tableContextTheme[key];
  }); // split out background, border, and pad

  var cellProps = {
    align: align || mergedProps.align || undefined,
    background: background || mergedProps.background || undefined,
    border: border || mergedProps.border || undefined,
    pad: plain !== 'noPad' ? pad || mergedProps.pad || undefined : undefined,
    verticalAlign: verticalAlign || mergedProps.verticalAlign || undefined
  };
  delete mergedProps.align;
  delete mergedProps.background;
  delete mergedProps.border;
  delete mergedProps.pad;
  delete mergedProps.verticalAlign;
  var content = children;

  if (plain === 'noPad' && children) {
    // a Box with explicitly set height is necessary
    // for the child contents to be able to fill the
    // TableCell
    content = /*#__PURE__*/React.createElement(Box, {
      ref: containerRef,
      justify: "center"
    }, children);
  } // construct a new theme object in case we have a background that wants
  // to change the background color context


  var nextTheme = useMemo(function () {
    var result;

    if (cellProps.background || theme.darkChanged) {
      var dark = backgroundIsDark(cellProps.background, theme);
      var darkChanged = dark !== undefined && dark !== theme.dark;

      if (darkChanged || theme.darkChanged) {
        result = _extends({}, theme);
        result.dark = dark === undefined ? theme.dark : dark;
        result.background = cellProps.background;
      } else if (cellProps.background) {
        // This allows DataTable to intelligently set the background
        // of a pinned header or footer.
        result = _extends({}, theme);
        result.background = cellProps.background;
      }
    }

    return result || theme;
  }, [cellProps.background, theme]);
  return /*#__PURE__*/React.createElement(ThemeContext.Provider, {
    value: nextTheme
  }, /*#__PURE__*/React.createElement(StyledTableCell, _extends({
    ref: cellRef,
    as: scope ? 'th' : undefined,
    scope: scope,
    size: size,
    colSpan: colSpan,
    tableContext: tableContext,
    tableContextTheme: tableContextTheme
  }, plain === true ? mergedProps : {}, cellProps, {
    className: className
  }), plain || !Object.keys(mergedProps).length ? content : /*#__PURE__*/React.createElement(Box, _extends({}, mergedProps, {
    align: align,
    justify: verticalAlignToJustify[verticalAlign]
  }), children)));
});
TableCell.displayName = 'TableCell';
TableCell.propTypes = TableCellPropTypes;
export { TableCell };