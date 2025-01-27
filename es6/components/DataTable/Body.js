var _excluded = ["cellProps", "columns", "data", "disabled", "onMore", "replace", "onClickRow", "onSelect", "pinnedOffset", "primaryProperty", "rowProps", "selected", "rowDetails", "show", "size", "step", "rowExpand", "setRowExpand", "verticalAlign"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
/* eslint-disable no-underscore-dangle */
import React, { forwardRef, memo, useEffect } from 'react';
import { useKeyboard, useForwardedRef } from '../../utils';
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
  var cellProps = _ref.cellProps,
    primaryValue = _ref.primaryValue,
    index = _ref.index,
    rowRef = _ref.rowRef,
    size = _ref.size,
    active = _ref.active,
    onClickRow = _ref.onClickRow,
    datum = _ref.datum,
    selected = _ref.selected,
    onSelect = _ref.onSelect,
    isDisabled = _ref.isDisabled,
    isSelected = _ref.isSelected,
    rowDetails = _ref.rowDetails,
    isRowExpanded = _ref.isRowExpanded,
    setActive = _ref.setActive,
    setRowExpand = _ref.setRowExpand,
    rowExpand = _ref.rowExpand,
    columns = _ref.columns,
    pinnedOffset = _ref.pinnedOffset,
    primaryProperty = _ref.primaryProperty,
    data = _ref.data,
    verticalAlign = _ref.verticalAlign;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(StyledDataTableRow, {
    ref: rowRef,
    size: size,
    active: active,
    "aria-disabled": onClickRow && isDisabled || undefined,
    onClick: onClickRow ? function (event) {
      if (onClickRow && !isDisabled) {
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
    onMouseEnter: onClickRow && !isDisabled ? function () {
      return setActive(index);
    } : undefined,
    onMouseLeave: onClickRow ? function () {
      return setActive(undefined);
    } : undefined
  }, (selected || onSelect) && /*#__PURE__*/React.createElement(Cell, {
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
    onToggle: function onToggle() {
      if (isRowExpanded) {
        setRowExpand(rowExpand.filter(function (s) {
          return s !== index;
        }));
      } else {
        setRowExpand([].concat(rowExpand, [index]));
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
  }, rowDetails(data[index]))));
});
var Body = /*#__PURE__*/forwardRef(function (_ref2, ref) {
  var _ref3;
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
    active = _React$useState[0],
    setActive = _React$useState[1];
  var _React$useState2 = React.useState(),
    lastActive = _React$useState2[0],
    setLastActive = _React$useState2[1];
  var _React$useState3 = React.useState(),
    scroll = _React$useState3[0],
    setScroll = _React$useState3[1];
  var containerRef = useForwardedRef(ref);

  // Determine if using a keyboard to cover focus behavior
  var usingKeyboard = useKeyboard();
  var onFocusActive = (_ref3 = active != null ? active : lastActive) != null ? _ref3 : usingKeyboard && onClickRow ? 0 : undefined;
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
  return /*#__PURE__*/React.createElement(Keyboard, {
    onEnter: clickableRow ? function (event) {
      if (clickableRow) {
        if (typeof onClickRow === 'function') {
          event.persist();
          var adjustedEvent = event;
          adjustedEvent.datum = data[active];
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
        adjustedEvent.datum = data == null ? void 0 : data[active];
        onClickRow(adjustedEvent);
      } else if (onClickRow === 'select') {
        selectRow();
      }
    } : undefined,
    onUp: onClickRow && active ? function () {
      return setActive(active - 1);
    } : undefined,
    onDown: onClickRow && data.length && active < data.length - 1 ? function () {
      return setActive((active != null ? active : -1) + 1);
    } : undefined
  }, /*#__PURE__*/React.createElement(StyledDataTableBody, _extends({
    ref: containerRef,
    size: size,
    tabIndex: onClickRow || scroll ? 0 : undefined,
    onFocus: function onFocus() {
      return setActive(onFocusActive);
    },
    onBlur: function onBlur() {
      setLastActive(active);
      setActive(undefined);
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
    var isRowExpanded = rowExpand && rowExpand.includes(index);
    var cellProps = normalizeRowCellProps(rowProps, cellPropsProp, primaryValue, index);
    return /*#__PURE__*/React.createElement(Row, {
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
      onClickRow: onClickRow,
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