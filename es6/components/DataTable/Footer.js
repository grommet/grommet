function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import { compose } from 'recompose';
import { withTheme } from 'styled-components';
import { defaultProps } from '../../default-props';
import { Box } from '../Box';
import { TableRow } from '../TableRow';
import { TableCell } from '../TableCell';
import { Cell } from './Cell';
import { StyledDataTableFooter } from './StyledDataTable';

var Footer = function Footer(_ref) {
  var columns = _ref.columns,
      footerValues = _ref.footerValues,
      groups = _ref.groups,
      primaryProperty = _ref.primaryProperty,
      theme = _ref.theme,
      rest = _objectWithoutPropertiesLoose(_ref, ["columns", "footerValues", "groups", "primaryProperty", "theme"]);

  return React.createElement(StyledDataTableFooter, rest, React.createElement(TableRow, null, groups && React.createElement(TableCell, {
    size: "xxsmall",
    plain: true,
    verticalAlign: "top"
  }, React.createElement(Box, _extends({}, theme.table.footer, theme.dataTable.footer))), columns.map(function (column) {
    return React.createElement(Cell, {
      key: column.property,
      context: "footer",
      column: column,
      datum: footerValues,
      primaryProperty: primaryProperty
    });
  })));
};

Footer.defaultProps = {};
Object.setPrototypeOf(Footer.defaultProps, defaultProps);
var FooterWrapper = compose(withTheme)(Footer);
export { FooterWrapper as Footer };