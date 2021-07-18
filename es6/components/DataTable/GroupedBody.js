var _excluded = ["cellProps", "columns", "groupBy", "groups", "groupState", "pinnedOffset", "primaryProperty", "onMore", "onSelect", "onToggle", "replace", "rowProps", "selected", "size", "step"];

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { forwardRef, useMemo } from 'react';
import { Cell } from './Cell';
import { ExpanderCell } from './ExpanderCell';
import { StyledDataTableBody, StyledDataTableRow } from './StyledDataTable';
import { CheckBox } from '../CheckBox/CheckBox';
import { InfiniteScroll } from '../InfiniteScroll';
import { TableRow } from '../TableRow';
import { TableCell } from '../TableCell';
import { datumValue, normalizeRowCellProps } from './buildState';
export var GroupedBody = /*#__PURE__*/forwardRef(function (_ref, ref) {
  var cellPropsProp = _ref.cellProps,
      columns = _ref.columns,
      groupBy = _ref.groupBy,
      groups = _ref.groups,
      groupState = _ref.groupState,
      pinnedOffset = _ref.pinnedOffset,
      primaryProperty = _ref.primaryProperty,
      onMore = _ref.onMore,
      onSelect = _ref.onSelect,
      onToggle = _ref.onToggle,
      replace = _ref.replace,
      rowProps = _ref.rowProps,
      selected = _ref.selected,
      size = _ref.size,
      step = _ref.step,
      rest = _objectWithoutPropertiesLoose(_ref, _excluded);

  var items = useMemo(function () {
    var nextItems = [];
    groups.forEach(function (group) {
      var expanded = groupState[group.key].expanded;
      var memberCount = group.data.length;

      if (memberCount > 1) {
        // need a header
        var primaryKeys = [];

        if (group.data.length) {
          group.data.forEach(function (datum) {
            primaryKeys.push(datum[primaryProperty]);
          });
        }

        var groupSelected = primaryKeys && selected ? primaryKeys.filter(function (val) {
          return selected.includes(val);
        }) : [];
        var isGroupSelected = groupSelected.length > 0 && group.data.length > 0 && groupSelected.length === group.data.length;
        nextItems.push({
          expanded: expanded,
          key: group.key,
          datum: group.datum,
          context: 'groupHeader',
          isSelected: isGroupSelected,
          indeterminate: groupSelected.length > 0 && groupSelected.length < group.data.length,
          onChange: function onChange() {
            if (isGroupSelected) {
              onSelect(selected.filter(function (s) {
                return !groupSelected.includes(s);
              }));
            } else onSelect([].concat(selected, primaryKeys));
          }
        });
      }

      if (memberCount === 1 || expanded) {
        // add the group members
        group.data.forEach(function (datum, index) {
          var primaryValue = primaryProperty ? datumValue(datum, primaryProperty) : undefined;
          var isSelected = selected && selected.includes(primaryValue);
          nextItems.push({
            key: datum[primaryProperty],
            primaryValue: primaryProperty ? datumValue(datum, primaryProperty) : undefined,
            datum: datum,
            context: memberCount > 1 && index === memberCount - 1 ? 'groupEnd' : 'body',
            isSelected: isSelected,
            onChange: function onChange() {
              if (isSelected) {
                onSelect(selected.filter(function (s) {
                  return s !== primaryValue;
                }));
              } else onSelect([].concat(selected, [primaryValue]));
            }
          });
        });
      }
    });
    return nextItems;
  }, [groups, groupState, primaryProperty, selected, onSelect]);
  return /*#__PURE__*/React.createElement(StyledDataTableBody, _extends({
    ref: ref,
    size: size
  }, rest), /*#__PURE__*/React.createElement(InfiniteScroll, {
    items: items,
    onMore: onMore,
    replace: replace,
    renderMarker: function renderMarker(marker) {
      return /*#__PURE__*/React.createElement(TableRow, null, /*#__PURE__*/React.createElement(TableCell, null, marker));
    },
    scrollableAncestor: "window",
    step: step
  }, function (row, index, rowRef) {
    var context = row.context,
        datum = row.datum,
        expanded = row.expanded,
        indeterminate = row.indeterminate,
        isSelected = row.isSelected,
        key = row.key,
        onChange = row.onChange,
        primaryValue = row.primaryValue;
    var cellProps = normalizeRowCellProps(rowProps, cellPropsProp, primaryValue, index);
    return /*#__PURE__*/React.createElement(StyledDataTableRow, {
      ref: rowRef,
      key: key,
      size: size
    }, /*#__PURE__*/React.createElement(ExpanderCell, {
      background: cellProps.background,
      border: cellProps.border,
      context: context,
      pad: cellProps.pad,
      onToggle: context === 'groupHeader' ? onToggle(key) : undefined,
      expanded: expanded
    }), (selected || onSelect) && /*#__PURE__*/React.createElement(TableCell, {
      background: cellProps.background,
      plain: "noPad",
      size: "auto"
    }, /*#__PURE__*/React.createElement(CheckBox, {
      a11yTitle: (isSelected ? 'unselect' : 'select') + " " + (context === 'groupHeader' ? key : primaryValue),
      checked: isSelected,
      indeterminate: indeterminate,
      disabled: !onSelect,
      onChange: onChange,
      pad: cellProps.pad
    })), columns.map(function (column) {
      var scope;

      if (context === 'groupHeader') {
        scope = column.property === groupBy ? 'row' : undefined;
      } else {
        scope = column.primary ? 'row' : undefined;
      }

      return /*#__PURE__*/React.createElement(Cell, {
        key: column.property,
        background: cellProps.background,
        border: cellProps.border,
        context: context,
        column: column,
        datum: datum,
        pad: cellProps.pad,
        scope: scope,
        pinnedOffset: context === 'groupHeader' && pinnedOffset && pinnedOffset[column.property]
      });
    }));
  }));
});