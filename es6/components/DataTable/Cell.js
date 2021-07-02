function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { memo, useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { defaultProps } from '../../default-props';
import { Text } from '../Text';
import { StyledDataTableCell } from './StyledDataTable';
import { datumValue } from './buildState';
import { TableContext } from '../Table/TableContext';
var Cell = /*#__PURE__*/memo(function (_ref) {
  var background = _ref.background,
      border = _ref.border,
      _ref$column = _ref.column,
      align = _ref$column.align,
      columnPin = _ref$column.pin,
      plain = _ref$column.plain,
      footer = _ref$column.footer,
      property = _ref$column.property,
      render = _ref$column.render,
      verticalAlign = _ref$column.verticalAlign,
      size = _ref$column.size,
      datum = _ref.datum,
      pad = _ref.pad,
      cellPin = _ref.pin,
      pinnedOffset = _ref.pinnedOffset,
      primaryProperty = _ref.primaryProperty,
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

  var pin = [];
  if (cellPin) pin.push.apply(pin, cellPin);
  if (columnPin) pin.push('left');
  return /*#__PURE__*/React.createElement(StyledDataTableCell, _extends({
    scope: scope
  }, theme.dataTable[context], {
    align: align,
    context: context,
    verticalAlign: verticalAlign,
    size: size,
    background: background,
    pinnedOffset: pinnedOffset,
    border: border,
    pad: pad,
    pin: pin,
    plain: plain ? 'noPad' : undefined
  }), content);
});
Cell.displayName = 'Cell';
Cell.defaultProps = {};
Object.setPrototypeOf(Cell.defaultProps, defaultProps);
export { Cell };