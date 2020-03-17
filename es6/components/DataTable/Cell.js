function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { compose } from 'recompose';
import { withTheme } from 'styled-components';
import { defaultProps } from '../../default-props';
import { TableCell } from '../TableCell';
import { Text } from '../Text';
import { datumValue } from './buildState';

var normalizeProp = function normalizeProp(name, rowProp, prop) {
  if (rowProp && rowProp[name]) return rowProp[name];
  return prop;
};

var Cell = function Cell(_ref) {
  var background = _ref.background,
      border = _ref.border,
      _ref$column = _ref.column,
      align = _ref$column.align,
      property = _ref$column.property,
      render = _ref$column.render,
      verticalAlign = _ref$column.verticalAlign,
      context = _ref.context,
      datum = _ref.datum,
      index = _ref.index,
      pad = _ref.pad,
      primaryProperty = _ref.primaryProperty,
      rowProp = _ref.rowProp,
      scope = _ref.scope,
      theme = _ref.theme;
  var value = datumValue(datum, property);
  var content;

  if (render) {
    content = render(datum);
  } else if (value !== undefined) {
    content = value;
  }

  if (typeof content === 'string' || typeof content === 'number') {
    var textProps = property === primaryProperty ? theme.dataTable.primary : {};
    content = React.createElement(Text, textProps, content);
  }

  return React.createElement(TableCell, _extends({
    scope: scope
  }, theme.dataTable[context], {
    align: align,
    verticalAlign: verticalAlign,
    background: normalizeProp('background', rowProp, Array.isArray(background) ? background[index % background.length] : background),
    border: normalizeProp('border', rowProp, border),
    pad: normalizeProp('pad', rowProp, pad)
  }), content);
};

Cell.defaultProps = {};
Object.setPrototypeOf(Cell.defaultProps, defaultProps);
var CellWrapper = compose(withTheme)(Cell);
export { CellWrapper as Cell };