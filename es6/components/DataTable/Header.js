function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { defaultProps } from '../../default-props';
import { Box } from '../Box';
import { Button } from '../Button';
import { CheckBox } from '../CheckBox';
import { TableCell } from '../TableCell';
import { Text } from '../Text';
import { Resizer } from './Resizer';
import { Searcher } from './Searcher';
import { ExpanderCell } from './ExpanderCell';
import { StyledDataTableCell, StyledDataTableHeader, StyledDataTableRow } from './StyledDataTable';
import { datumValue } from './buildState';

var Header = function Header(_ref) {
  var background = _ref.background,
      border = _ref.border,
      columns = _ref.columns,
      data = _ref.data,
      fill = _ref.fill,
      filtering = _ref.filtering,
      filters = _ref.filters,
      groups = _ref.groups,
      groupState = _ref.groupState,
      onFilter = _ref.onFilter,
      onFiltering = _ref.onFiltering,
      onResize = _ref.onResize,
      onSelect = _ref.onSelect,
      onSort = _ref.onSort,
      onToggle = _ref.onToggle,
      pad = _ref.pad,
      tablePin = _ref.pin,
      primaryProperty = _ref.primaryProperty,
      selected = _ref.selected,
      sort = _ref.sort,
      widths = _ref.widths,
      rest = _objectWithoutPropertiesLoose(_ref, ["background", "border", "columns", "data", "fill", "filtering", "filters", "groups", "groupState", "onFilter", "onFiltering", "onResize", "onSelect", "onSort", "onToggle", "pad", "pin", "primaryProperty", "selected", "sort", "widths"]);

  var theme = useContext(ThemeContext) || defaultProps.theme;
  return /*#__PURE__*/React.createElement(StyledDataTableHeader, _extends({
    fillProp: fill
  }, rest), /*#__PURE__*/React.createElement(StyledDataTableRow, null, groups && /*#__PURE__*/React.createElement(ExpanderCell, {
    context: "header",
    expanded: Object.keys(groupState).filter(function (k) {
      return !groupState[k].expanded;
    }).length === 0,
    onToggle: onToggle
  }), (selected || onSelect) && /*#__PURE__*/React.createElement(TableCell, null, onSelect && /*#__PURE__*/React.createElement(CheckBox, {
    checked: selected.length === data.length,
    indeterminate: selected.length > 0 && selected.length < data.length,
    onChange: function onChange() {
      // if any are selected, clear selection
      if (selected.length === data.length) onSelect([]); // if none are selected, select all data
      else onSelect(data.map(function (datum) {
          return datumValue(datum, primaryProperty);
        }));
    }
  })), columns.map(function (_ref2) {
    var property = _ref2.property,
        header = _ref2.header,
        align = _ref2.align,
        columnPin = _ref2.pin,
        search = _ref2.search,
        sortable = _ref2.sortable,
        verticalAlign = _ref2.verticalAlign,
        size = _ref2.size;
    var content = typeof header === 'string' ? /*#__PURE__*/React.createElement(Text, null, header) : header;

    if (onSort && sortable !== false) {
      var Icon;

      if (onSort && sortable !== false) {
        if (sort && sort.property === property) {
          Icon = theme.dataTable.icons[sort.direction !== 'asc' ? 'ascending' : 'descending'];
        } else if (theme.dataTable.icons.sortable) {
          Icon = theme.dataTable.icons.sortable;
        }
      }

      content = /*#__PURE__*/React.createElement(Button, {
        plain: true,
        fill: "vertical",
        onClick: onSort(property)
      }, /*#__PURE__*/React.createElement(Box, {
        direction: "row",
        align: "center",
        gap: "xsmall"
      }, content, Icon && /*#__PURE__*/React.createElement(Icon, null)));
    }

    if (search || onResize) {
      var resizer = onResize ? /*#__PURE__*/React.createElement(Resizer, {
        property: property,
        onResize: onResize
      }) : null;
      var searcher = search && filters ? /*#__PURE__*/React.createElement(Searcher, {
        filtering: filtering,
        filters: filters,
        property: property,
        onFilter: onFilter,
        onFiltering: onFiltering
      }) : null;
      content = /*#__PURE__*/React.createElement(Box, {
        direction: "row",
        align: "center",
        justify: !align || align === 'start' ? 'between' : align,
        gap: "small",
        fill: "vertical",
        style: onResize ? {
          position: 'relative'
        } : undefined
      }, content, searcher && resizer ? /*#__PURE__*/React.createElement(Box, {
        flex: "shrink",
        direction: "row",
        align: "center",
        gap: "small"
      }, searcher, resizer) : searcher || resizer);
    }

    var pin = [];
    if (tablePin) pin.push('top');
    if (columnPin) pin.push('left');
    return /*#__PURE__*/React.createElement(StyledDataTableCell, {
      key: property,
      align: align,
      verticalAlign: verticalAlign,
      background: background,
      border: border,
      pad: pad,
      pin: pin,
      plain: true,
      scope: "col",
      size: widths && widths[property] ? undefined : size,
      style: widths && widths[property] ? {
        width: widths[property]
      } : undefined
    }, content);
  })));
};

Header.displayName = 'Header';
Header.defaultProps = {};
Object.setPrototypeOf(Header.defaultProps, defaultProps);
export { Header };