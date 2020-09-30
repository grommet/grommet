function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { defaultProps } from '../../default-props';
import { Text } from '../Text';
import { StyledDataTableCell } from './StyledDataTable';
import { datumValue } from './buildState';
import { TableContext } from '../Table/TableContext';

var normalizeProp = function normalizeProp(name, rowProp, prop) {
  if (rowProp && rowProp[name]) return rowProp[name];
  return prop;
};

var Cell = function Cell(_ref) {
  var backgroundProp = _ref.background,
      border = _ref.border,
      _ref$column = _ref.column,
      align = _ref$column.align,
      columnPin = _ref$column.pin,
      footer = _ref$column.footer,
      property = _ref$column.property,
      render = _ref$column.render,
      verticalAlign = _ref$column.verticalAlign,
      size = _ref$column.size,
      datum = _ref.datum,
      index = _ref.index,
      pad = _ref.pad,
      cellPin = _ref.pin,
      primaryProperty = _ref.primaryProperty,
      rowProp = _ref.rowProp,
      scope = _ref.scope;
  var theme = useContext(ThemeContext) || defaultProps.theme;
  var value = datumValue(datum, property);
  var context = useContext(TableContext);
  var renderContexts = context === 'body' || context === 'footer' && footer && footer.aggregate;
  var content;

  if (render && renderContexts) {
    content = render(datum);
  } else if (value !== undefined) {
    content = value;
  }

  if (typeof content === 'string' || typeof content === 'number') {
    var textProps = property === primaryProperty ? theme.dataTable.primary : {};
    content = /*#__PURE__*/React.createElement(Text, textProps, content);
  }

  var pin;
  if (cellPin) pin = cellPin;else if (columnPin) pin = ['left'];
  var background;

  if (pin && theme.dataTable.pinned && theme.dataTable.pinned[context]) {
    background = theme.dataTable.pinned[context].background;
  } else background = undefined;

  return /*#__PURE__*/React.createElement(StyledDataTableCell, _extends({
    scope: scope
  }, theme.dataTable[context], {
    align: align,
    context: context,
    verticalAlign: verticalAlign,
    size: size,
    background: normalizeProp('background', rowProp, Array.isArray(backgroundProp) ? backgroundProp[index % backgroundProp.length] : backgroundProp) || background,
    border: normalizeProp('border', rowProp, border),
    pad: normalizeProp('pad', rowProp, pad),
    pin: pin
  }), content);
};

Cell.displayName = 'Cell';
Cell.defaultProps = {};
Object.setPrototypeOf(Cell.defaultProps, defaultProps);
export { Cell };