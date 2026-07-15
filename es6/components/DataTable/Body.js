var _excluded = ["cellProps", "columns", "data", "disabled", "onMore", "replace", "onClickRow", "onSelect", "pinnedOffset", "primaryProperty", "rowProps", "selected", "rowDetails", "show", "size", "step", "rowExpand", "setRowExpand", "verticalAlign"];
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* eslint-disable no-underscore-dangle */
import React, { forwardRef, memo, useEffect } from 'react';
import { useForwardedRef } from '../../utils';
import { CheckBox } from '../CheckBox';
import { InfiniteScroll } from '../InfiniteScroll';
import { TableRow } from '../TableRow';
import { TableCell } from '../TableCell';
import { Keyboard } from '../Keyboard';
import { ExpanderCell } from './ExpanderCell';
import { Cell } from './Cell';
import { StyledDataTableBody, StyledDataTableRow } from './StyledDataTable';
import { datumValue, normalizeRowCellProps } from './buildState';
import { useThemeValue } from '../../utils/useThemeValue';
var Row = /*#__PURE__*/memo(function (_ref) {
  var expandLabel = _ref.expandLabel,
    cellProps = _ref.cellProps,
    primaryValue = _ref.primaryValue,
    index = _ref.index,
    rowRef = _ref.rowRef,
    size = _ref.size,
    active = _ref.active,
    focused = _ref.focused,
    lastFocused = _ref.lastFocused,
    onClickRow = _ref.onClickRow,
    datum = _ref.datum,
    selected = _ref.selected,
    onSelect = _ref.onSelect,
    passThemeFlag = _ref.passThemeFlag,
    isDisabled = _ref.isDisabled,
    isSelected = _ref.isSelected,
    rowDetails = _ref.rowDetails,
    isRowExpanded = _ref.isRowExpanded,
    setActive = _ref.setActive,
    setFocused = _ref.setFocused,
    setRowExpand = _ref.setRowExpand,
    rowExpand = _ref.rowExpand,
    columns = _ref.columns,
    pinnedOffset = _ref.pinnedOffset,
    primaryProperty = _ref.primaryProperty,
    verticalAlign = _ref.verticalAlign,
    onRowRefChange = _ref.onRowRefChange;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(StyledDataTableRow, _extends({
    ref: function ref(element) {
      // Store the row element in the parent's ref map
      if (onRowRefChange) {
        onRowRefChange(index, element);
      }
      // Also call the original rowRef if it exists
      if (rowRef) {
        if (typeof rowRef === 'function') {
          rowRef(element);
        } else if (rowRef && typeof rowRef === 'object' && 'current' in rowRef) {
          var refObj = rowRef;
          refObj.current = element;
        }
      }
    },
    size: size,
    active: active,
    "aria-disabled": onClickRow && isDisabled || undefined,
    onClick: onClickRow ? function (event) {
      if (onClickRow && !isDisabled) {
        setFocused(index);
        setActive(index);
        if (typeof onClickRow === 'function') {
          // extract from React's synthetic event pool
          event.persist();
          var adjustedEvent = event;
          adjustedEvent.datum = datum;
          adjustedEvent.index = index;
          onClickRow(adjustedEvent);
        } else if (onClickRow === 'select') {
          if (isSelected) {
            onSelect(selected.filter(function (s) {
              return s !== primaryValue;
            }), datum);
          } else onSelect([].concat(selected, [primaryValue]), datum);
        }
      }
    } : undefined,
    onFocus: function onFocus() {
      if (onClickRow && !isDisabled) {
        setFocused(index);
        setActive(index);
      }
    },
    onMouseOver: onClickRow && !isDisabled ? function () {
      return setActive(index);
    } : undefined,
    tabIndex:
    // eslint-disable-next-line no-nested-ternary
    !onClickRow ? undefined :
    // If this row is focused, it should be focusable
    // If no row is focused and this is the first row, make it focusable
    focused !== undefined && focused === index || focused === undefined && lastFocused === index || focused === undefined && index === 0 ? 0 :
    // Otherwise, not in tab order
    -1
  }, passThemeFlag), (selected || onSelect) && /*#__PURE__*/React.createElement(Cell, {
    background: isSelected && cellProps.selected.background || (pinnedOffset == null ? void 0 : pinnedOffset._grommetDataTableSelect) && cellProps.pinned.background || cellProps.background,
    border: cellProps.pinned.border || cellProps.border,
    pinnedOffset: pinnedOffset == null ? void 0 : pinnedOffset._grommetDataTableSelect,
    "aria-disabled": isDisabled || !onSelect || undefined,
    column: {
      pin: Boolean(pinnedOffset == null ? void 0 : pinnedOffset._grommetDataTableSelect),
      plain: 'noPad',
      size: 'auto',
      render: function render() {
        return /*#__PURE__*/React.createElement(CheckBox, {
          tabIndex: onClickRow === 'select' ? -1 : undefined,
          a11yTitle: (isSelected ? 'unselect' : 'select') + " " + primaryValue,
          checked: isSelected,
          disabled: isDisabled || !onSelect,
          onChange: function onChange() {
            if (isSelected) {
              onSelect(selected.filter(function (s) {
                return s !== primaryValue;
              }), datum);
            } else onSelect([].concat(selected, [primaryValue]), datum);
          },
          pad: cellProps.pad
        });
      }
    },
    verticalAlign: verticalAlign
  }), rowDetails && /*#__PURE__*/React.createElement(ExpanderCell, {
    background: isSelected && cellProps.selected.background,
    context: isRowExpanded ? 'groupHeader' : 'body',
    expanded: isRowExpanded,
    expandLabel: expandLabel,
    onToggle: function onToggle() {
      var nextRowExpand;
      var rowKey = primaryValue || index;
      if (isRowExpanded) {
        nextRowExpand = rowExpand.filter(function (s) {
          return s !== rowKey;
        });
      } else {
        nextRowExpand = [].concat(rowExpand, [rowKey]);
      }
      if (rowDetails.onExpand) {
        rowDetails.onExpand(nextRowExpand, datum);
      } else {
        setRowExpand(nextRowExpand);
      }
    },
    pad: cellProps.pad,
    verticalAlign: verticalAlign
  }), columns.map(function (column) {
    return /*#__PURE__*/React.createElement(Cell, {
      key: column.property,
      background: isSelected && cellProps.selected.background || column.pin && cellProps.pinned.background || cellProps.background,
      border: column.pin && cellProps.pinned.border || cellProps.border,
      context: "body",
      column: column,
      datum: datum,
      isSelected: isSelected,
      pad: column.pin && cellProps.pinned.pad || cellProps.pad,
      pinnedOffset: pinnedOffset && pinnedOffset[column.property],
      primaryProperty: primaryProperty,
      scope: column.primary || column.property === primaryProperty ? 'row' : undefined,
      verticalAlign: verticalAlign
    });
  })), rowDetails && isRowExpanded && /*#__PURE__*/React.createElement(StyledDataTableRow, {
    key: index.toString() + "_expand"
  }, (selected || onSelect) && /*#__PURE__*/React.createElement(TableCell, null), /*#__PURE__*/React.createElement(TableCell, {
    colSpan: columns.length + 1
  }, rowDetails.render ? rowDetails.render(datum) : rowDetails(datum))));
});
var Body = /*#__PURE__*/forwardRef(function (_ref2, ref) {
  var cellPropsProp = _ref2.cellProps,
    columns = _ref2.columns,
    data = _ref2.data,
    disabled = _ref2.disabled,
    onMore = _ref2.onMore,
    replace = _ref2.replace,
    onClickRow = _ref2.onClickRow,
    onSelect = _ref2.onSelect,
    pinnedOffset = _ref2.pinnedOffset,
    primaryProperty = _ref2.primaryProperty,
    rowProps = _ref2.rowProps,
    selected = _ref2.selected,
    rowDetails = _ref2.rowDetails,
    show = _ref2.show,
    size = _ref2.size,
    step = _ref2.step,
    rowExpand = _ref2.rowExpand,
    setRowExpand = _ref2.setRowExpand,
    verticalAlign = _ref2.verticalAlign,
    rest = _objectWithoutPropertiesLoose(_ref2, _excluded);
  var _useThemeValue = useThemeValue(),
    theme = _useThemeValue.theme,
    passThemeFlag = _useThemeValue.passThemeFlag;
  var _React$useState = React.useState(),
    focused = _React$useState[0],
    setFocused = _React$useState[1];
  var _React$useState2 = React.useState(),
    lastFocused = _React$useState2[0],
    setLastFocused = _React$useState2[1];
  var _React$useState3 = React.useState(),
    active = _React$useState3[0],
    setActive = _React$useState3[1];
  var _React$useState4 = React.useState(),
    scroll = _React$useState4[0],
    setScroll = _React$useState4[1];
  var containerRef = useForwardedRef(ref);

  // Store refs for each row to enable direct focus management
  var rowRefs = React.useRef(new Map());
  // Callback to store row references
  var handleRowRefChange = React.useCallback(function (index, element) {
    if (element) {
      rowRefs.current.set(index, element);
    } else {
      rowRefs.current["delete"](index);
    }
  }, []);
  var activePrimaryValue = active >= 0 ? datumValue(data[active], primaryProperty) : undefined;
  var selectRow = function selectRow() {
    if (activePrimaryValue !== undefined) {
      if (selected && selected.includes(activePrimaryValue)) {
        onSelect(selected.filter(function (s) {
          return s !== activePrimaryValue;
        }));
      } else onSelect([].concat(selected, [activePrimaryValue]));
    }
  };
  var clickableRow = onClickRow && active >= 0 && (!disabled || activePrimaryValue !== undefined && !disabled.includes(activePrimaryValue));

  // Determine if the DataTable body is scrollable
  useEffect(function () {
    if (containerRef.current) {
      var element = containerRef.current;
      if (element.scrollHeight > element.offsetHeight) {
        setScroll(true);
      }
    }
  }, [containerRef]);

  // roving tab index, ensure row (when onClickRow) has DOM focus
  useEffect(function () {
    if (focused !== undefined && rowRefs.current.has(focused)) {
      var focusedRowElement = rowRefs.current.get(focused);
      if (focusedRowElement && focusedRowElement.focus) {
        focusedRowElement.focus();
      }
    }
  }, [focused]);
  return /*#__PURE__*/React.createElement(Keyboard, {
    onEnter: clickableRow ? function (event) {
      if (clickableRow) {
        if (typeof onClickRow === 'function') {
          event.persist();
          var adjustedEvent = event;
          adjustedEvent.datum = data[focused];
          onClickRow(adjustedEvent);
        } else if (onClickRow === 'select') {
          selectRow();
        }
      }
    } : undefined
    // The WCAG recommendation for checkboxes is to select them with "Space"
    ,
    onSpace: clickableRow ? function (event) {
      event.preventDefault();
      if (typeof onClickRow === 'function') {
        event.persist();
        var adjustedEvent = event;
        adjustedEvent.datum = data == null ? void 0 : data[focused];
        onClickRow(adjustedEvent);
      } else if (onClickRow === 'select') {
        selectRow();
      }
    } : undefined,
    onUp: onClickRow && focused ? function () {
      var previousIndex = focused - 1;
      setFocused(previousIndex);
      setActive(previousIndex);
    } : undefined,
    onDown: onClickRow && data.length && focused < data.length - 1 ? function (event) {
      event.preventDefault();
      var nextIndex = (focused != null ? focused : -1) + 1;
      setFocused(nextIndex);
      setActive(nextIndex);
    } : undefined
  }, /*#__PURE__*/React.createElement(StyledDataTableBody, _extends({
    ref: containerRef,
    size: size,
    tabIndex: !onClickRow && scroll ? 0 : undefined,
    onMouseOut: function onMouseOut() {
      return setActive(undefined);
    },
    onBlur: function onBlur(event) {
      // only reset focused if the focus is leaving the table
      // and not moving to a child element of the table
      if (containerRef.current && !containerRef.current.contains(event.relatedTarget)) {
        setLastFocused(focused);
        setFocused(undefined);
        setActive(undefined);
      }
    }
  }, passThemeFlag, rest), /*#__PURE__*/React.createElement(InfiniteScroll, {
    items: data,
    onMore: onMore,
    replace: replace,
    renderMarker: function renderMarker(marker) {
      return /*#__PURE__*/React.createElement(TableRow, null, /*#__PURE__*/React.createElement(TableCell, null, marker));
    },
    show: show,
    step: step
  }, function (datum, index, rowRef) {
    var primaryValue = primaryProperty ? datumValue(datum, primaryProperty) : undefined;
    var isSelected = selected && selected.includes(primaryValue);
    var isDisabled = disabled && disabled.includes(primaryValue);
    var isRowExpanded = rowExpand && rowExpand.includes(primaryValue || index);
    var cellProps = normalizeRowCellProps(rowProps, cellPropsProp, primaryValue, index);
    var expandLabel;
    if (typeof rowDetails === 'object' && typeof rowDetails.expandLabel === 'function') {
      expandLabel = rowDetails.expandLabel(datum);
    }
    return /*#__PURE__*/React.createElement(Row, {
      expandLabel: expandLabel,
      key: primaryValue != null ? primaryValue : index,
      setActive: setActive,
      rowRef: rowRef,
      cellProps: cellProps,
      primaryValue: primaryValue,
      isDisabled: isDisabled,
      isSelected: isSelected,
      isRowExpanded: isRowExpanded,
      index: index,
      size: size,
      active: active >= 0 ? active === index : undefined,
      focused: focused,
      lastFocused: lastFocused,
      setFocused: setFocused,
      onRowRefChange: handleRowRefChange,
      onClickRow: onClickRow,
      passThemeFlag: passThemeFlag,
      datum: datum,
      selected: selected,
      onSelect: onSelect,
      rowDetails: rowDetails,
      setRowExpand: setRowExpand,
      rowExpand: rowExpand,
      columns: columns,
      primaryProperty: primaryProperty,
      rowProps: rowProps,
      data: data,
      theme: theme,
      pinnedOffset: pinnedOffset,
      verticalAlign: verticalAlign
    });
  })));
});
export { Body };