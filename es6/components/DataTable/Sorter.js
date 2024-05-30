function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { defaultProps } from '../../default-props';
import { Button } from '../Button';
import { Box } from '../Box';
var SorterButton = styled(Button).withConfig({
  displayName: "Sorter__SorterButton",
  componentId: "sc-fzr2yb-0"
})(["flex-shrink:1;height:100%;"]);
var Sorter = function Sorter(_ref) {
  var align = _ref.align,
    children = _ref.children,
    fill = _ref.fill,
    onSort = _ref.onSort,
    property = _ref.property,
    sort = _ref.sort,
    themeProps = _ref.themeProps;
  var theme = useContext(ThemeContext) || defaultProps.theme;
  var icon;
  if (sort && sort.property === property) {
    var Icon = theme.dataTable.icons[sort.ascending ? 'ascending' : 'descending'];
    icon = /*#__PURE__*/React.createElement(Icon, null);
  }
  var content = /*#__PURE__*/React.createElement(Box, _extends({}, themeProps, {
    flex: "shrink",
    direction: "row",
    justify: align,
    align: "center",
    gap: "xsmall",
    fill: fill
  }), children, icon);
  if (onSort) {
    content = /*#__PURE__*/React.createElement(SorterButton, {
      fill: fill,
      hoverIndicator: true,
      onClick: onSort(property)
    }, content);
  }
  return content;
};
Sorter.displayName = 'Sorter';
Sorter.defaultProps = {};
Object.setPrototypeOf(Sorter.defaultProps, defaultProps);
export { Sorter };