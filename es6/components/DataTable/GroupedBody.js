var _excluded = ["cellProps", "columns", "groupBy", "groups", "groupState", "pinnedOffset", "primaryProperty", "onSelect", "onToggle", "rowProps", "selected", "size"];

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { forwardRef, Fragment } from 'react';
import { Cell } from './Cell';
import { ExpanderCell } from './ExpanderCell';
import { StyledDataTableBody, StyledDataTableRow } from './StyledDataTable';
import { CheckBox } from '../CheckBox/CheckBox';
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
      onSelect = _ref.onSelect,
      onToggle = _ref.onToggle,
      rowProps = _ref.rowProps,
      selected = _ref.selected,
      size = _ref.size,
      rest = _objectWithoutPropertiesLoose(_ref, _excluded);

  var rowIndex = 0;
  return /*#__PURE__*/React.createElement(StyledDataTableBody, _extends({
    ref: ref,
    size: size
  }, rest), groups.map(function (group) {
    var expanded = groupState[group.key].expanded;
    var memberCount = group.data.length;
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
    var cellProps = normalizeRowCellProps(rowProps, cellPropsProp, undefined, rowIndex);
    var content = memberCount > 1 ? /*#__PURE__*/React.createElement(StyledDataTableRow, {
      key: group.key,
      size: size
    }, /*#__PURE__*/React.createElement(ExpanderCell, {
      background: cellProps.background,
      border: cellProps.border,
      context: expanded ? 'groupHeader' : 'body',
      expanded: expanded,
      index: rowIndex,
      onToggle: onToggle(group.key),
      pad: cellProps.pad
    }), (selected || onSelect) && /*#__PURE__*/React.createElement(TableCell, {
      background: cellProps.background,
      plain: "noPad",
      size: "auto"
    }, /*#__PURE__*/React.createElement(CheckBox, {
      a11yTitle: (isGroupSelected ? 'unselect' : 'select') + " " + group.key,
      checked: isGroupSelected,
      indeterminate: groupSelected.length > 0 && groupSelected.length < group.data.length,
      disabled: !onSelect,
      onChange: function onChange() {
        if (isGroupSelected) {
          onSelect(selected.filter(function (s) {
            return !groupSelected.includes(s);
          }));
        } else {
          onSelect([].concat(selected, primaryKeys));
        }
      },
      pad: cellProps.pad
    })), columns.map(function (column) {
      return /*#__PURE__*/React.createElement(Cell, {
        key: column.property,
        background: cellProps.background,
        border: cellProps.border,
        context: expanded ? 'groupHeader' : 'body',
        column: column,
        datum: group.datum,
        index: rowIndex,
        pad: cellProps.pad,
        pinnedOffset: pinnedOffset && pinnedOffset[column.property],
        scope: column.property === groupBy ? 'row' : undefined
      });
    })) : null;
    if (memberCount > 1) rowIndex += 1;

    if (memberCount === 1 || expanded) {
      content = /*#__PURE__*/React.createElement(Fragment, {
        key: group.key
      }, content, group.data.map(function (datum, index) {
        var primaryValue = primaryProperty ? datumValue(datum, primaryProperty) : undefined;
        var isSelected = selected && selected.includes(primaryValue);
        var context = memberCount > 1 && index === memberCount - 1 ? 'groupEnd' : 'body';
        cellProps = normalizeRowCellProps(rowProps, cellPropsProp, primaryValue, rowIndex);
        rowIndex += 1;
        return /*#__PURE__*/React.createElement(StyledDataTableRow, {
          key: datum[primaryProperty],
          size: size
        }, /*#__PURE__*/React.createElement(ExpanderCell, {
          background: cellProps.background,
          border: cellProps.border,
          context: context,
          pad: cellProps.pad
        }), (selected || onSelect) && /*#__PURE__*/React.createElement(TableCell, {
          background: cellProps.background,
          plain: "noPad",
          size: "auto"
        }, /*#__PURE__*/React.createElement(CheckBox, {
          a11yTitle: (isSelected ? 'unselect' : 'select') + " " + primaryValue,
          checked: isSelected,
          disabled: !onSelect,
          onChange: function onChange() {
            if (isSelected) {
              onSelect(selected.filter(function (s) {
                return s !== primaryValue;
              }));
            } else onSelect([].concat(selected, [primaryValue]));
          },
          pad: cellProps.pad
        })), columns.map(function (column) {
          return /*#__PURE__*/React.createElement(Cell, {
            key: column.property,
            background: cellProps.background,
            border: cellProps.border,
            context: context,
            column: column,
            datum: datum,
            pad: cellProps.pad,
            scope: column.primary ? 'row' : undefined
          });
        }));
      }));
    }

    return content;
  }));
});