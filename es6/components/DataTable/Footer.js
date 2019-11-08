function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import { compose } from 'recompose';
import { withTheme } from 'styled-components';
import { defaultProps } from '../../default-props';
import { TableRow } from '../TableRow';
import { TableCell } from '../TableCell';
import { Cell } from './Cell';
import { StyledDataTableFooter } from './StyledDataTable';

var Footer = function Footer(_ref) {
  var background = _ref.background,
      border = _ref.border,
      columns = _ref.columns,
      footerValues = _ref.footerValues,
      groups = _ref.groups,
      pad = _ref.pad,
      primaryProperty = _ref.primaryProperty,
      theme = _ref.theme,
      rest = _objectWithoutPropertiesLoose(_ref, ["background", "border", "columns", "footerValues", "groups", "pad", "primaryProperty", "theme"]);

  return React.createElement(StyledDataTableFooter, rest, React.createElement(TableRow, null, groups && React.createElement(TableCell, {
    plain: true,
    size: "xxsmall",
    pad: "none",
    verticalAlign: "top"
  }), columns.map(function (column) {
    return React.createElement(Cell, {
      key: column.property,
      background: background,
      border: border,
      context: "footer",
      column: column,
      datum: footerValues,
      pad: pad,
      primaryProperty: primaryProperty
    });
  })));
};

Footer.defaultProps = {};
Object.setPrototypeOf(Footer.defaultProps, defaultProps);
var FooterWrapper = compose(withTheme)(Footer);
export { FooterWrapper as Footer };