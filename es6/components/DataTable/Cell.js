function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { compose } from 'recompose';
import { withTheme } from 'styled-components';
import { defaultProps } from '../../default-props';
import { TableCell } from '../TableCell';
import { Text } from '../Text';

var Cell = function Cell(_ref) {
  var _ref$column = _ref.column,
      align = _ref$column.align,
      property = _ref$column.property,
      render = _ref$column.render,
      context = _ref.context,
      datum = _ref.datum,
      primaryProperty = _ref.primaryProperty,
      scope = _ref.scope,
      theme = _ref.theme;
  var content;

  if (render) {
    content = render(datum);
  } else if (datum[property] !== undefined) {
    content = datum[property];
  }

  if (typeof content === 'string' || typeof content === 'number') {
    var textProps = property === primaryProperty ? theme.dataTable.primary : {};
    content = React.createElement(Text, textProps, content);
  }

  return React.createElement(TableCell, _extends({
    scope: scope
  }, theme.dataTable[context], {
    align: align
  }), content);
};

Cell.defaultProps = {};
Object.setPrototypeOf(Cell.defaultProps, defaultProps);
var CellWrapper = compose(withTheme)(Cell);
export { CellWrapper as Cell };