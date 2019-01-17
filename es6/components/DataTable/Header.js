function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import { compose } from 'recompose';
import { withTheme } from 'styled-components';
import { defaultProps } from '../../default-props';
import { Box } from '../Box';
import { TableCell } from '../TableCell';
import { Text } from '../Text';
import { Resizer } from './Resizer';
import { Searcher } from './Searcher';
import { Sorter } from './Sorter';
import { ExpanderCell } from './ExpanderCell';
import { StyledDataTableHeader, StyledDataTableRow } from './StyledDataTable';

var Header = function Header(_ref) {
  var columns = _ref.columns,
      filtering = _ref.filtering,
      filters = _ref.filters,
      groups = _ref.groups,
      groupState = _ref.groupState,
      onFilter = _ref.onFilter,
      onFiltering = _ref.onFiltering,
      onResize = _ref.onResize,
      onSort = _ref.onSort,
      onToggle = _ref.onToggle,
      sort = _ref.sort,
      theme = _ref.theme,
      widths = _ref.widths,
      rest = _objectWithoutPropertiesLoose(_ref, ["columns", "filtering", "filters", "groups", "groupState", "onFilter", "onFiltering", "onResize", "onSort", "onToggle", "sort", "theme", "widths"]);

  var dataTableContextTheme = _extends({}, theme.table.header, theme.dataTable.header); // The tricky part here is that we need to manage the theme styling
  // to make sure that the background, border, and padding are applied
  // at the right places depending on the mix of controls in each header cell.


  var outerThemeProps = function (_ref2) {
    var border = _ref2.border,
        background = _ref2.background;
    return {
      border: border,
      background: background
    };
  }(dataTableContextTheme);

  var border = dataTableContextTheme.border,
      background = dataTableContextTheme.background,
      innerThemeProps = _objectWithoutPropertiesLoose(dataTableContextTheme, ["border", "background"]);

  return React.createElement(StyledDataTableHeader, rest, React.createElement(StyledDataTableRow, null, groups && React.createElement(ExpanderCell, {
    context: "header",
    expanded: Object.keys(groupState).filter(function (k) {
      return !groupState[k].expanded;
    }).length === 0,
    onToggle: onToggle
  }), columns.map(function (_ref3) {
    var property = _ref3.property,
        header = _ref3.header,
        align = _ref3.align,
        search = _ref3.search,
        sortable = _ref3.sortable;
    var content = typeof header === 'string' ? React.createElement(Text, null, header) : header;

    if (onSort && sortable !== false) {
      content = React.createElement(Sorter, {
        align: align,
        fill: !search,
        property: property,
        onSort: onSort,
        sort: sort,
        themeProps: search ? innerThemeProps : dataTableContextTheme
      }, content);
    }

    if (search && filters) {
      if (!onSort) {
        content = React.createElement(Box, _extends({
          justify: "center",
          align: align
        }, innerThemeProps), content);
      }

      content = React.createElement(Box, _extends({
        fill: true,
        direction: "row",
        justify: "between",
        align: "center"
      }, outerThemeProps), content, React.createElement(Searcher, {
        filtering: filtering,
        filters: filters,
        property: property,
        onFilter: onFilter,
        onFiltering: onFiltering
      }));
    } else if (!onSort || sortable === false) {
      content = React.createElement(Box, _extends({}, dataTableContextTheme, {
        fill: true,
        justify: "center",
        align: align
      }), content);
    }

    if (onResize) {
      content = React.createElement(Resizer, {
        property: property,
        onResize: onResize
      }, content);
    }

    return React.createElement(TableCell, {
      key: property,
      scope: "col",
      plain: true,
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