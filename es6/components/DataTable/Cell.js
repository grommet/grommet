var _excluded = ["background", "border", "column", "datum", "pad", "pin", "pinnedOffset", "primaryProperty", "scope", "verticalAlign"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
import React, { isValidElement, memo, useContext } from 'react';
import { Text } from '../Text';
import { StyledDataTableCell } from './StyledDataTable';
import { datumValue } from './buildState';
import { TableContext } from '../Table/TableContext';
import { useThemeValue } from '../../utils/useThemeValue';
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
    columnVerticalAlign = _ref$column.verticalAlign,
    size = _ref$column.size,
    datum = _ref.datum,
    pad = _ref.pad,
    cellPin = _ref.pin,
    pinnedOffset = _ref.pinnedOffset,
    primaryProperty = _ref.primaryProperty,
    scope = _ref.scope,
    verticalAlign = _ref.verticalAlign,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useThemeValue = useThemeValue(),
    theme = _useThemeValue.theme,
    passThemeFlag = _useThemeValue.passThemeFlag;
  var value = datumValue(datum, property);
  var context = useContext(TableContext);
  var renderContexts = context === 'body' || context === 'footer' && footer && footer.aggregate;
  var content;
  if (render && renderContexts) {
    content = render(datum);
  } else if (value !== undefined) {
    if (typeof value === 'string' || typeof value === 'number' || /*#__PURE__*/isValidElement(value)) content = value;
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
    verticalAlign: verticalAlign || columnVerticalAlign,
    size: size,
    background: background,
    pinnedOffset: pinnedOffset,
    border: border,
    pad: pad,
    pin: pin,
    plain: plain ? 'noPad' : undefined
  }, passThemeFlag, rest), content);
});
Cell.displayName = 'Cell';
export { Cell };