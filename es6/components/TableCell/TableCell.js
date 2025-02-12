var _excluded = ["align", "aria-disabled", "background", "border", "children", "className", "colSpan", "onWidth", "pad", "plain", "rowSpan", "scope", "size", "verticalAlign"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
import React, { forwardRef, useContext, useEffect, useMemo, useRef } from 'react';
import { ThemeContext } from 'styled-components';
import { useLayoutEffect } from '../../utils/use-isomorphic-layout-effect';
import { backgroundIsDark, useForwardedRef } from '../../utils';
import { Box } from '../Box';
import { TableContext } from '../Table/TableContext';
import { StyledTableCell } from '../Table/StyledTable';
import { TableCellPropTypes } from './propTypes';
import { useThemeValue } from '../../utils/useThemeValue';
export var verticalAlignToJustify = {
  middle: 'center',
  top: 'start',
  bottom: 'end'
};
var TableCell = /*#__PURE__*/forwardRef(function (_ref, ref) {
  var align = _ref.align,
    ariaDisabled = _ref['aria-disabled'],
    background = _ref.background,
    border = _ref.border,
    children = _ref.children,
    className = _ref.className,
    colSpan = _ref.colSpan,
    onWidth = _ref.onWidth,
    pad = _ref.pad,
    plain = _ref.plain,
    rowSpan = _ref.rowSpan,
    scope = _ref.scope,
    size = _ref.size,
    verticalAlign = _ref.verticalAlign,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useThemeValue = useThemeValue(),
    theme = _useThemeValue.theme,
    passThemeFlag = _useThemeValue.passThemeFlag;
  var tableContext = useContext(TableContext);
  var cellRef = useForwardedRef(ref);
  var containerRef = useRef();
  var widthRef = useRef();
  useLayoutEffect(function () {
    var resizeObserver;
    var element = cellRef.current;
    if (onWidth) {
      if (typeof window !== 'undefined' && window.ResizeObserver) {
        resizeObserver = new window.ResizeObserver(function (entries) {
          var entry = entries[0].borderBoxSize[0];
          var width = entry == null ? void 0 : entry.inlineSize;
          if (widthRef.current !== width) {
            widthRef.current = width;
            onWidth(width);
          }
        });
        if (element) {
          resizeObserver.observe(cellRef.current);
        }
      } else {
        // fallback for server side rendering
        var _cellRef$current$getB = cellRef.current.getBoundingClientRect(),
          width = _cellRef$current$getB.width;
        if (widthRef.current !== width) {
          widthRef.current = width;
          onWidth(width);
        }
      }
    }
    return function () {
      if (resizeObserver && element) {
        resizeObserver.unobserve(element);
      }
    };
  }, [onWidth, cellRef, widthRef]);

  // if window resizes, recalculate cell height so that content
  // will continue to fill the height if the dimensions of the cell
  // have changed
  useEffect(function () {
    var updateHeight = function updateHeight() {
      if (plain === 'noPad') {
        var cell = cellRef.current;
        var container = containerRef.current;
        if (cell && container) {
          container.style.height = '';
          var cellRect = cell.getBoundingClientRect();

          // height must match cell height otherwise table will apply some
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
  }
  // merge tableContextTheme and rest
  var mergedProps = _extends({}, tableContextTheme, rest);
  Object.keys(mergedProps).forEach(function (key) {
    if (rest[key] === undefined) mergedProps[key] = tableContextTheme[key];
  });
  // split out background, border, pad, and aria-disabled
  var cellProps = {
    align: align || mergedProps.align || undefined,
    'aria-disabled': ariaDisabled || undefined,
    background: background || mergedProps.background || undefined,
    border: border || mergedProps.border || undefined,
    pad: plain !== 'noPad' ? pad || mergedProps.pad || undefined : undefined,
    verticalAlign: verticalAlign || mergedProps.verticalAlign || undefined
  };
  delete mergedProps.align;
  delete mergedProps.ariaDisabled;
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
      justify: verticalAlign ? verticalAlignToJustify[verticalAlign] : 'center'
    }, children);
  }

  // construct a new theme object in case we have a background that wants
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
    rowSpan: rowSpan,
    tableContext: tableContext,
    tableContextTheme: tableContextTheme
  }, plain === true ? mergedProps : {}, cellProps, {
    className: className
  }, passThemeFlag), plain || !Object.keys(mergedProps).length ? content : /*#__PURE__*/React.createElement(Box, _extends({}, mergedProps, {
    align: align,
    justify: verticalAlignToJustify[verticalAlign]
  }), children)));
});
TableCell.displayName = 'TableCell';
TableCell.propTypes = TableCellPropTypes;
export { TableCell };