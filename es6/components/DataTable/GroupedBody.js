var _excluded = ["cellProps", "columns", "data", "disabled", "groupBy", "groups", "groupState", "pinnedOffset", "primaryProperty", "onMore", "onSelect", "onToggle", "onUpdate", "replace", "rowProps", "selected", "size", "step", "verticalAlign"];
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
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
    data = _ref.data,
    disabled = _ref.disabled,
    groupBy = _ref.groupBy,
    groups = _ref.groups,
    groupState = _ref.groupState,
    pinnedOffset = _ref.pinnedOffset,
    primaryProperty = _ref.primaryProperty,
    onMore = _ref.onMore,
    onSelect = _ref.onSelect,
    onToggle = _ref.onToggle,
    onUpdate = _ref.onUpdate,
    replace = _ref.replace,
    rowProps = _ref.rowProps,
    selected = _ref.selected,
    size = _ref.size,
    step = _ref.step,
    verticalAlign = _ref.verticalAlign,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var items = useMemo(function () {
    var nextItems = [];
    groups.forEach(function (group) {
      var _ref2 = groupState[group.key] || {
          expanded: true
        },
        expanded = _ref2.expanded;
      var memberCount = group.data.length;
      var groupSelected = [];
      var isGroupSelected = false;
      var groupDisabled = [];
      var isGroupDisabled = false;
      if (memberCount > 1 || onUpdate && group.key !== undefined) {
        // need a header
        var primaryKeys = group.data.map(function (datum) {
          return datum[primaryProperty];
        });
        groupSelected = primaryKeys && selected ? primaryKeys.filter(function (val) {
          return selected.includes(val);
        }) : [];
        isGroupSelected = groupBy.select ? groupBy.select[group.key] === 'all' : groupSelected.length === group.data.length && groupSelected.length > 0;
        var indeterminate = groupBy.select ? groupBy.select[group.key] === 'some' : groupSelected.length > 0 && groupSelected.length < group.data.length;
        groupDisabled = primaryKeys && disabled ? primaryKeys.filter(function (val) {
          return disabled.includes(val);
        }) : [];
        isGroupDisabled = groupBy.disable ? groupBy.disable[group.key] === 'all' : groupDisabled.length === group.data.length && groupDisabled.length > 0;
        nextItems.push({
          expanded: expanded,
          key: group.key,
          primaryValue: group.key,
          datum: group.datum,
          context: 'groupHeader',
          isDisabled: isGroupDisabled,
          isSelected: isGroupSelected,
          indeterminate: indeterminate,
          onChange: function onChange() {
            var nextSelected = isGroupSelected || indeterminate ? selected.filter(function (s) {
              return !groupSelected.includes(s);
            }) : [].concat(selected, primaryKeys);
            if (groupBy.onSelect) {
              groupBy.onSelect(nextSelected, group.datum, groupBy.select);
            } else {
              onSelect(nextSelected, group.datum);
            }
          }
        });
      }
      if (!onUpdate && memberCount === 1 || expanded) {
        // add the group members
        group.data.forEach(function (datum, index) {
          var primaryValue = primaryProperty ? datumValue(datum, primaryProperty) : undefined;
          var isSelected = selected == null ? void 0 : selected.includes(primaryValue);
          var isDisabled = disabled == null ? void 0 : disabled.includes(primaryValue);
          nextItems.push({
            key: datum[primaryProperty],
            primaryValue: primaryProperty ? datumValue(datum, primaryProperty) : undefined,
            datum: datum,
            context: memberCount > 1 && index === memberCount - 1 ? 'groupEnd' : 'body',
            isDisabled: isDisabled,
            isSelected: isSelected,
            onChange: function onChange() {
              var nextSelected = isSelected ? selected.filter(function (s) {
                return s !== primaryValue;
              }) : [].concat(selected, [primaryValue]);
              onSelect(nextSelected, datum);
            }
          });
        });
      }
    });
    return nextItems;
  }, [disabled, groups, groupBy, groupState, primaryProperty, selected, onSelect, onUpdate]);
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
    step: step
  }, function (row, index, rowRef) {
    var context = row.context,
      datum = row.datum,
      expanded = row.expanded,
      indeterminate = row.indeterminate,
      isDisabled = row.isDisabled,
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
      expanded: expanded,
      verticalAlign: verticalAlign
    }), (selected || onSelect) && /*#__PURE__*/React.createElement(TableCell, {
      background: cellProps.background,
      border: cellProps.pinned.border || cellProps.border,
      plain: "noPad",
      size: "auto",
      verticalAlign: verticalAlign,
      "aria-disabled": isDisabled || !onSelect || undefined
    }, /*#__PURE__*/React.createElement(CheckBox, {
      a11yTitle: (isSelected ? 'unselect' : 'select') + " " + (context === 'groupHeader' ? key : primaryValue),
      checked: isSelected,
      indeterminate: indeterminate,
      disabled: isDisabled || !onSelect,
      onChange: onChange,
      pad: cellProps.pad
    })), columns.map(function (column) {
      var scope;
      if (context === 'groupHeader') {
        scope = column.property === groupBy.property ? 'row' : undefined;
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
        pinnedOffset: context === 'groupHeader' && pinnedOffset && pinnedOffset[column.property],
        verticalAlign: verticalAlign
      });
    }));
  }));
});