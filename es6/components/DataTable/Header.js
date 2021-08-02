var _excluded = ["background", "border", "color", "font", "gap", "pad", "units"],
    _excluded2 = ["cellProps", "columns", "data", "fill", "filtering", "filters", "groups", "groupState", "onFilter", "onFiltering", "onResize", "onSelect", "onSort", "onToggle", "onWidths", "pin", "pinnedOffset", "primaryProperty", "selected", "rowDetails", "sort", "widths"];

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { forwardRef, useCallback, useContext, useEffect, useState } from 'react';
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
      pad = _theme$dataTable$head.pad,
      units = _theme$dataTable$head.units,
      rest = _objectWithoutPropertiesLoose(_theme$dataTable$head, _excluded);

  var textProps = _extends({
    color: color
  }, font);

  var iconProps = {
    color: color
  };

  var layoutProps = _extends({}, rest);

  return [layoutProps, textProps, iconProps];
}; // build up CSS from basic to specific based on the supplied sub-object paths.
// adapted from StyledButtonKind to only include parts relevant for DataTable


var buttonStyle = function buttonStyle(_ref) {
  var pad = _ref.pad,
      theme = _ref.theme;
  var styles = [];

  var _separateThemeProps = separateThemeProps(theme),
      layoutProps = _separateThemeProps[0],
      iconProps = _separateThemeProps[2]; // if cell is sortable, we want pad to be applied
  // to the button instead of the cell


  if (pad) {
    styles.push(kindPartStyles({
      pad: pad
    }, theme));
  }

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
  var cellProps = _ref2.cellProps,
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
      onWidths = _ref2.onWidths,
      pinProp = _ref2.pin,
      pinnedOffset = _ref2.pinnedOffset,
      primaryProperty = _ref2.primaryProperty,
      selected = _ref2.selected,
      rowDetails = _ref2.rowDetails,
      sort = _ref2.sort,
      widths = _ref2.widths,
      rest = _objectWithoutPropertiesLoose(_ref2, _excluded2);

  var theme = useContext(ThemeContext) || defaultProps.theme;

  var _separateThemeProps2 = separateThemeProps(theme),
      layoutProps = _separateThemeProps2[0],
      textProps = _separateThemeProps2[1];

  var _useState = useState([]),
      cellWidths = _useState[0],
      setCellWidths = _useState[1];

  var updateWidths = useCallback(function (width) {
    return setCellWidths(function (values) {
      return [].concat(values, [width]);
    });
  }, []);
  useEffect(function () {
    if (onWidths && cellWidths.length !== 0) {
      onWidths(cellWidths);
    }
  }, [cellWidths, onWidths]);
  var pin = pinProp ? ['top'] : [];
  return /*#__PURE__*/React.createElement(StyledDataTableHeader, _extends({
    ref: ref,
    fillProp: fill
  }, rest), /*#__PURE__*/React.createElement(StyledDataTableRow, null, groups && /*#__PURE__*/React.createElement(ExpanderCell, {
    background: cellProps.background,
    border: cellProps.border,
    context: "header",
    expanded: Object.keys(groupState).filter(function (k) {
      return !groupState[k].expanded;
    }).length === 0,
    onToggle: onToggle,
    pad: cellProps.pad
  }), (selected || onSelect) && /*#__PURE__*/React.createElement(StyledDataTableCell, {
    background: cellProps.background,
    onWidth: updateWidths,
    plain: "noPad",
    size: "auto",
    context: "header",
    scope: "col",
    pin: pin
  }, onSelect && /*#__PURE__*/React.createElement(CheckBox, {
    a11yTitle: selected.length === data.length ? 'unselect all' : 'select all',
    checked: selected.length > 0 && data.length > 0 && selected.length === data.length,
    indeterminate: selected.length > 0 && selected.length < data.length,
    onChange: function onChange() {
      // if any are selected, clear selection
      if (selected.length === data.length) onSelect([]); // if none are selected, select all data
      else onSelect(data.map(function (datum) {
        return datumValue(datum, primaryProperty);
      }));
    },
    pad: cellProps.pad
  })), rowDetails && /*#__PURE__*/React.createElement(TableCell, {
    size: "xxsmall",
    plain: true,
    pad: "none"
  }), columns.map(function (_ref3) {
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
        pad: cellProps.pad,
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

    var cellPin = [].concat(pin);
    if (columnPin) cellPin.push('left');
    return /*#__PURE__*/React.createElement(StyledDataTableCell, {
      key: property,
      align: align,
      context: "header",
      verticalAlign: verticalAlign,
      background: cellProps.background,
      border: cellProps.border,
      onWidth: updateWidths // if sortable, pad will be included in the button styling
      ,
      pad: sortable === false || !onSort ? cellProps.pad : 'none',
      pin: cellPin,
      plain: true,
      pinnedOffset: pinnedOffset && pinnedOffset[property],
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