function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { forwardRef, useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { defaultProps } from '../../default-props';
import { Box } from '../Box';
import { TableContext } from '../Table/TableContext';
import { StyledTableCell } from '../Table/StyledTable';
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
      colSpan = _ref.colSpan,
      pad = _ref.pad,
      plain = _ref.plain,
      scope = _ref.scope,
      size = _ref.size,
      verticalAlign = _ref.verticalAlign,
      rest = _objectWithoutPropertiesLoose(_ref, ["align", "background", "border", "children", "colSpan", "pad", "plain", "scope", "size", "verticalAlign"]);

  var theme = useContext(ThemeContext) || defaultProps.theme;
  return /*#__PURE__*/React.createElement(TableContext.Consumer, null, function (tableContext) {
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
      pad: pad || mergedProps.pad || undefined,
      verticalAlign: verticalAlign || mergedProps.verticalAlign || undefined
    };
    delete mergedProps.align;
    delete mergedProps.background;
    delete mergedProps.border;
    delete mergedProps.pad;
    delete mergedProps.verticalAlign;
    return /*#__PURE__*/React.createElement(StyledTableCell, _extends({
      ref: ref,
      as: scope ? 'th' : undefined,
      scope: scope,
      size: size,
      colSpan: colSpan,
      tableContext: tableContext,
      tableContextTheme: tableContextTheme
    }, plain ? mergedProps : {}, cellProps), plain || !Object.keys(mergedProps).length ? children : /*#__PURE__*/React.createElement(Box, _extends({}, mergedProps, {
      align: align,
      justify: verticalAlignToJustify[verticalAlign]
    }), children));
  });
});
TableCell.displayName = 'TableCell';
var TableCellDoc;

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  TableCellDoc = require('./doc').doc(TableCell);
}

var TableCellWrapper = TableCellDoc || TableCell;
export { TableCellWrapper as TableCell };