function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import { compose } from 'recompose';
import { withTheme } from 'styled-components';
import { defaultProps } from '../../default-props';
import { Box } from '../Box';
import { Button } from '../Button';
import { TableCell } from '../TableCell';
import { Text } from '../Text';
import { Resizer } from './Resizer';
import { Searcher } from './Searcher';
import { ExpanderCell } from './ExpanderCell';
import { StyledDataTableHeader, StyledDataTableRow } from './StyledDataTable';

var Header = function Header(_ref) {
  var background = _ref.background,
      border = _ref.border,
      columns = _ref.columns,
      filtering = _ref.filtering,
      filters = _ref.filters,
      groups = _ref.groups,
      groupState = _ref.groupState,
      onFilter = _ref.onFilter,
      onFiltering = _ref.onFiltering,
      onResize = _ref.onResize,
      onSort = _ref.onSort,
      onToggle = _ref.onToggle,
      pad = _ref.pad,
      sort = _ref.sort,
      theme = _ref.theme,
      widths = _ref.widths,
      rest = _objectWithoutPropertiesLoose(_ref, ["background", "border", "columns", "filtering", "filters", "groups", "groupState", "onFilter", "onFiltering", "onResize", "onSort", "onToggle", "pad", "sort", "theme", "widths"]);

  return React.createElement(StyledDataTableHeader, rest, React.createElement(StyledDataTableRow, null, groups && React.createElement(ExpanderCell, {
    context: "header",
    expanded: Object.keys(groupState).filter(function (k) {
      return !groupState[k].expanded;
    }).length === 0,
    onToggle: onToggle
  }), columns.map(function (_ref2) {
    var property = _ref2.property,
        header = _ref2.header,
        align = _ref2.align,
        search = _ref2.search,
        sortable = _ref2.sortable,
        verticalAlign = _ref2.verticalAlign;
    var content = typeof header === 'string' ? React.createElement(Text, null, header) : header;

    if (onSort && sortable !== false) {
      var Icon = onSort && sortable !== false && sort && sort.property === property && theme.dataTable.icons[sort.ascending ? 'ascending' : 'descending'];
      content = React.createElement(Button, {
        plain: true,
        fill: "vertical",
        onClick: onSort(property)
      }, React.createElement(Box, {
        direction: "row",
        align: "center",
        gap: "xsmall"
      }, content, Icon && React.createElement(Icon, null)));
    }

    if (search || onResize) {
      var resizer = onResize ? React.createElement(Resizer, {
        property: property,
        onResize: onResize
      }) : null;
      var searcher = search && filters ? React.createElement(Searcher, {
        filtering: filtering,
        filters: filters,
        property: property,
        onFilter: onFilter,
        onFiltering: onFiltering
      }) : null;
      content = React.createElement(Box, {
        direction: "row",
        align: "center",
        justify: !align || align === 'start' ? 'between' : align,
        gap: "small",
        fill: "vertical",
        style: onResize ? {
          position: 'relative'
        } : undefined
      }, content, searcher && resizer ? React.createElement(Box, {
        flex: "shrink",
        direction: "row",
        align: "center",
        gap: "small"
      }, searcher, resizer) : searcher || resizer);
    }

    return React.createElement(TableCell, {
      key: property,
      align: align,
      verticalAlign: verticalAlign,
      background: background,
      border: border,
      pad: pad,
      plain: true,
      scope: "col",
      style: widths && widths[property] ? {
        width: widths[property]
      } : undefined
    }, content);
  })));
};

Header.defaultProps = {};
Object.setPrototypeOf(Header.defaultProps, defaultProps);
var HeaderWrapper = compose(withTheme)(Header);
export { HeaderWrapper as Header };