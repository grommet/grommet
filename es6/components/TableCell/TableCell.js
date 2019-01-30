function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import { compose } from 'recompose';
import { withTheme } from 'styled-components';
import { defaultProps } from '../../default-props';
import { Box } from '../Box';
import { TableContext } from '../Table/TableContext';
import { StyledTableCell } from '../Table/StyledTable';

var TableCell = function TableCell(_ref) {
  var children = _ref.children,
      colSpan = _ref.colSpan,
      plain = _ref.plain,
      scope = _ref.scope,
      size = _ref.size,
      theme = _ref.theme,
      verticalAlign = _ref.verticalAlign,
      rest = _objectWithoutPropertiesLoose(_ref, ["children", "colSpan", "plain", "scope", "size", "theme", "verticalAlign"]);

  return React.createElement(TableContext.Consumer, null, function (tableContext) {
    var tableContextTheme;

    if (tableContext === 'header') {
      tableContextTheme = theme.table && theme.table.header;
    } else if (tableContext === 'footer') {
      tableContextTheme = theme.table && theme.table.footer;
    } else {
      tableContextTheme = theme.table && theme.table.body;
    }

    var boxProps = _extends({}, rest);

    Object.keys(boxProps).forEach(function (key) {
      if (tableContextTheme[key] && boxProps[key] === undefined) {
        delete boxProps[key];
      }
    });
    return React.createElement(StyledTableCell, _extends({
      as: scope ? 'th' : undefined,
      scope: scope,
      size: size,
      colSpan: colSpan,
      tableContext: tableContext,
      tableContextTheme: tableContextTheme,
      verticalAlign: verticalAlign || (tableContextTheme ? tableContextTheme.verticalAlign : undefined)
    }, plain ? rest : {}), plain ? children : React.createElement(Box, _extends({}, tableContextTheme, boxProps), children));
  });
};

TableCell.defaultProps = {};
Object.setPrototypeOf(TableCell.defaultProps, defaultProps);
var TableCellDoc;

if (process.env.NODE_ENV !== 'production') {
  TableCellDoc = require('./doc').doc(TableCell); // eslint-disable-line global-require
}

var TableCellWrapper = compose(withTheme)(TableCellDoc || TableCell);
export { TableCellWrapper as TableCell };