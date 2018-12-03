function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { compose } from 'recompose';
import styled, { withTheme } from 'styled-components';
import { defaultProps } from '../../default-props';
import { Button } from '../Button';
import { Box } from '../Box';
var SorterButton = styled(Button).withConfig({
  displayName: "Sorter__SorterButton",
  componentId: "fzr2yb-0"
})(["flex-shrink:1;height:100%;"]);

var Sorter = function Sorter(_ref) {
  var align = _ref.align,
      children = _ref.children,
      fill = _ref.fill,
      onSort = _ref.onSort,
      property = _ref.property,
      sort = _ref.sort,
      theme = _ref.theme,
      themeProps = _ref.themeProps;
  var icon;

  if (sort && sort.property === property) {
    var Icon = theme.dataTable.icons[sort.ascending ? 'ascending' : 'descending'];
    icon = React.createElement(Icon, null);
  }

  var content = React.createElement(Box, _extends({}, themeProps, {
    flex: "shrink",
    direction: "row",
    justify: align,
    align: "center",
    gap: "xsmall",
    fill: fill
  }), children, icon);

  if (onSort) {
    content = React.createElement(SorterButton, {
      fill: fill,
      hoverIndicator: true,
      onClick: onSort(property)
    }, content);
  }

  return content;
};

Sorter.defaultProps = {};
Object.setPrototypeOf(Sorter.defaultProps, defaultProps);
var SorterWrapper = compose(withTheme)(Sorter);
export { SorterWrapper as Sorter };