function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { forwardRef, useContext } from 'react';
import styled, { css, ThemeContext } from 'styled-components';
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
import { kindPartStyles } from '../../utils/styles';
import { normalizeColor } from '../../utils/colors'; // separate theme values into groupings depending on what
// part of header cell they should style

var separateThemeProps = function separateThemeProps(theme) {
  var _theme$dataTable$head = theme.dataTable.header,
      background = _theme$dataTable$head.background,
      border = _theme$dataTable$head.border,
      color = _theme$dataTable$head.color,
      font = _theme$dataTable$head.font,
      gap = _theme$dataTable$head.gap,
      units = _theme$dataTable$head.units,
      rest = _objectWithoutPropertiesLoose(_theme$dataTable$head, ["background", "border", "color", "font", "gap", "units"]);

  var cellProps = {
    background: background,
    border: border
  };

  var textProps = _extends({
    color: color
  }, font);

  var iconProps = {
    color: color
  };

  var layoutProps = _extends({}, rest);

  return [cellProps, layoutProps, textProps, iconProps];
}; // build up CSS from basic to specific based on the supplied sub-object paths.
// adapted from StyledButtonKind to only include parts relevant for DataTable


var buttonStyle = function buttonStyle(_ref) {
  var theme = _ref.theme;
  var styles = [];

  var _separateThemeProps = separateThemeProps(theme),
      layoutProps = _separateThemeProps[1],
      iconProps = _separateThemeProps[3];

  if (layoutProps) {
    styles.push(kindPartStyles(layoutProps, theme));
  }

  if (layoutProps.hover) {
    // CSS for this sub-object in the theme
    var partStyles = kindPartStyles(layoutProps.hover, theme);
    if (partStyles.length > 0) styles.push(css(["&:hover{", "}"], partStyles));
  }

  if (iconProps.color) {
    styles.push(css(["svg{stroke:", ";fill:", ";}"], normalizeColor(iconProps.color, theme), normalizeColor(iconProps.color, theme)));
  }

  return styles;
};

var StyledHeaderCellButton = styled(Button).withConfig({
  displayName: "Header__StyledHeaderCellButton",
  componentId: "sc-1baku5q-0"
})(["", ""], function (props) {
  return buttonStyle(props);
}); // allow extend to spread onto Box that surrounds column label

var StyledContentBox = styled(Box).withConfig({
  displayName: "Header__StyledContentBox",
  componentId: "sc-1baku5q-1"
})(["", ""], function (props) {
  return props.extend;
});
var Header = /*#__PURE__*/forwardRef(function (_ref2, ref) {
  var backgroundProp = _ref2.background,
      border = _ref2.border,
      columns = _ref2.columns,
      data = _ref2.data,
      fill = _ref2.fill,
      filtering = _ref2.filtering,
      filters = _ref2.filters,
      groups = _ref2.groups,
      groupState = _ref2.groupState,
      onFilter = _ref2.onFilter,
      onFiltering = _ref2.onFiltering,
      onResize = _ref2.onResize,
      onSelect = _ref2.onSelect,
      onSort = _ref2.onSort,
      onToggle = _ref2.onToggle,
      pad = _ref2.pad,
      tablePin = _ref2.pin,
      primaryProperty = _ref2.primaryProperty,
      selected = _ref2.selected,
      sort = _ref2.sort,
      widths = _ref2.widths,
      rest = _objectWithoutPropertiesLoose(_ref2, ["background", "border", "columns", "data", "fill", "filtering", "filters", "groups", "groupState", "onFilter", "onFiltering", "onResize", "onSelect", "onSort", "onToggle", "pad", "pin", "primaryProperty", "selected", "sort", "widths"]);

  var theme = useContext(ThemeContext) || defaultProps.theme;

  var _separateThemeProps2 = separateThemeProps(theme),
      cellProps = _separateThemeProps2[0],
      layoutProps = _separateThemeProps2[1],
      textProps = _separateThemeProps2[2];

  var background;
  if (backgroundProp) background = backgroundProp;else background = undefined;
  return /*#__PURE__*/React.createElement(StyledDataTableHeader, _extends({
    ref: ref,
    fillProp: fill
  }, rest), /*#__PURE__*/React.createElement(StyledDataTableRow, null, groups && /*#__PURE__*/React.createElement(ExpanderCell, {
    context: "header",
    expanded: Object.keys(groupState).filter(function (k) {
      return !groupState[k].expanded;
    }).length === 0,
    onToggle: onToggle
  }), (selected || onSelect) && /*#__PURE__*/React.createElement(TableCell, {
    background: background || cellProps.background
  }, onSelect && /*#__PURE__*/React.createElement(CheckBox, {
    checked: selected.length === data.length,
    indeterminate: selected.length > 0 && selected.length < data.length,
    onChange: function onChange() {
      // if any are selected, clear selection
      if (selected.length === data.length) onSelect([]); // if none are selected, select all data
      else onSelect(data.map(function (datum) {
          return datumValue(datum, primaryProperty);
        }));
    }
  })), columns.map(function (_ref3) {
    var property = _ref3.property,
        header = _ref3.header,
        align = _ref3.align,
        columnPin = _ref3.pin,
        search = _ref3.search,
        sortable = _ref3.sortable,
        verticalAlign = _ref3.verticalAlign,
        size = _ref3.size,
        units = _ref3.units;
    var content;
    var unitsContent = units ? /*#__PURE__*/React.createElement(Text, _extends({}, textProps, theme.dataTable.header.units), units) : undefined;

    if (typeof header === 'string') {
      content = /*#__PURE__*/React.createElement(Text, textProps, header);

      if (Object.keys(layoutProps).length && (sortable === false || !onSort)) {
        // apply rest of layout styling if cell is not sortable,
        // otherwise this styling will be applied by
        // StyledHeaderCellButton
        content = /*#__PURE__*/React.createElement(StyledContentBox, layoutProps, content);
      }
    } else content = header;

    if (onSort && sortable !== false) {
      var Icon;

      if (onSort && sortable !== false) {
        if (sort && sort.property === property) {
          Icon = theme.dataTable.icons[sort.direction !== 'asc' ? 'ascending' : 'descending'];
        } else if (theme.dataTable.icons.sortable) {
          Icon = theme.dataTable.icons.sortable;
        }
      }

      content = /*#__PURE__*/React.createElement(StyledHeaderCellButton, {
        plain: true,
        column: property,
        fill: "vertical",
        onClick: onSort(property),
        sort: sort,
        sortable: true
      }, /*#__PURE__*/React.createElement(Box, {
        direction: "row",
        align: "center",
        gap: "xsmall",
        justify: align
      }, content, Icon && /*#__PURE__*/React.createElement(Icon, null)));
    }

    if (unitsContent) {
      content = /*#__PURE__*/React.createElement(Box, {
        align: "baseline",
        direction: "row"
      }, content, unitsContent);
    } // content should fill any available space in cell


    content = /*#__PURE__*/React.createElement(Box, {
      flex: "grow"
    }, content);

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
        gap: theme.dataTable.header.gap,
        fill: "vertical",
        style: onResize ? {
          position: 'relative'
        } : undefined
      }, content, searcher && resizer ? /*#__PURE__*/React.createElement(Box, {
        flex: "shrink",
        direction: "row",
        align: "center",
        gap: theme.dataTable.header.gap
      }, searcher, resizer) : searcher || resizer);
    }

    var pin = [];
    if (tablePin) pin.push('top');
    if (columnPin) pin.push('left');
    if (backgroundProp) background = backgroundProp;else if (pin.length > 0 && theme.dataTable.pinned && theme.dataTable.pinned.header) {
      background = theme.dataTable.pinned.header.background;
    } else background = undefined;
    return /*#__PURE__*/React.createElement(StyledDataTableCell, {
      key: property,
      align: align,
      context: "header",
      verticalAlign: verticalAlign,
      background: background || cellProps.background,
      border: border || cellProps.border,
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
});
Header.displayName = 'Header';
Header.defaultProps = {};
Object.setPrototypeOf(Header.defaultProps, defaultProps);
export { Header };