function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React, { Fragment, useContext } from 'react';
import { Box } from '../Box';
import { Text } from '../Text';
import { ResponsiveContext } from '../../contexts/ResponsiveContext';
import { NameValueListContext } from '../NameValueList/NameValueListContext';
import { isSmall } from '../../utils/responsive';
import { useThemeValue } from '../../utils/useThemeValue';
var NameValuePair = function NameValuePair(_ref) {
  var _theme$nameValuePair;
  var children = _ref.children,
    nameProp = _ref.name;
  var _useContext = useContext(NameValueListContext),
    nameProps = _useContext.nameProps,
    pairProps = _useContext.pairProps,
    valueProps = _useContext.valueProps;
  var size = useContext(ResponsiveContext);
  var _useThemeValue = useThemeValue(),
    theme = _useThemeValue.theme;
  var direction = pairProps == null ? void 0 : pairProps.direction;
  var column = direction === 'column' || direction === 'column-reverse' || isSmall(size);
  var Container = column ? Box : Fragment;
  var nameAlign = !isSmall(size) ? nameProps == null ? void 0 : nameProps.align : undefined;
  var valueAlign = !isSmall(size) ? valueProps == null ? void 0 : valueProps.align : undefined;
  // using margin to act as gap
  // <dl> elements must only directly contain
  // properly-ordered <dt> and <dd> groups
  var valueGap;
  if (column && (_theme$nameValuePair = theme.nameValuePair) != null && (_theme$nameValuePair = _theme$nameValuePair.column) != null && _theme$nameValuePair.gap) valueGap = {
    bottom: theme.nameValuePair.column.gap
  };
  var name;
  if (typeof nameProp === 'string' || typeof nameProp === 'number') name = /*#__PURE__*/React.createElement(Text, _extends({
    as: "dt",
    margin: valueGap,
    textAlign: nameAlign
  }, theme.nameValuePair.name), nameProp);else name = /*#__PURE__*/React.createElement(Box, {
    as: "dt",
    align: nameAlign
  }, nameProp);
  var value;
  if (typeof children === 'string' || typeof children === 'number') value =
  /*#__PURE__*/
  // override browser default margin for dd
  React.createElement(Text, _extends({
    as: "dd",
    margin: "none",
    textAlign: valueAlign
  }, theme.nameValuePair.value), children);else value =
  /*#__PURE__*/
  // override browser default margin for dd
  React.createElement(Box, {
    margin: "none",
    as: "dd",
    align: valueAlign
  }, children);
  var first = direction !== 'column-reverse' ? name : value;
  var second = direction !== 'column-reverse' ? value : name;
  return /*#__PURE__*/React.createElement(Container, null, first, second);
};
export { NameValuePair };