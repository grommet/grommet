function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { forwardRef } from 'react';
import { CheckBox } from '../CheckBox';
import { InfiniteScroll } from '../InfiniteScroll';
import { TableRow } from '../TableRow';
import { TableCell } from '../TableCell';
import { Keyboard } from '../Keyboard';
import { Cell } from './Cell';
import { StyledDataTableBody, StyledDataTableRow } from './StyledDataTable';
import { datumValue } from './buildState';
var Body = /*#__PURE__*/forwardRef(function (_ref, ref) {
  var background = _ref.background,
      border = _ref.border,
      columns = _ref.columns,
      data = _ref.data,
      onMore = _ref.onMore,
      replace = _ref.replace,
      onClickRow = _ref.onClickRow,
      onSelect = _ref.onSelect,
      pad = _ref.pad,
      pinnedBackground = _ref.pinnedBackground,
      primaryProperty = _ref.primaryProperty,
      rowProps = _ref.rowProps,
      selected = _ref.selected,
      size = _ref.size,
      step = _ref.step,
      rest = _objectWithoutPropertiesLoose(_ref, ["background", "border", "columns", "data", "onMore", "replace", "onClickRow", "onSelect", "pad", "pinnedBackground", "primaryProperty", "rowProps", "selected", "size", "step"]);

  var _React$useState = React.useState(),
      active = _React$useState[0],
      setActive = _React$useState[1];

  return /*#__PURE__*/React.createElement(Keyboard, {
    onEnter: onClickRow && active >= 0 ? function (event) {
      event.persist();
      var adjustedEvent = event;
      adjustedEvent.datum = data[active];
      onClickRow(adjustedEvent);
    } : undefined,
    onUp: onClickRow && active ? function () {
      setActive(active - 1);
    } : undefined,
    onDown: onClickRow && data.length ? function () {
      setActive(active >= 0 ? Math.min(active + 1, data.length - 1) : 0);
    } : undefined
  }, /*#__PURE__*/React.createElement(StyledDataTableBody, _extends({
    ref: ref,
    size: size,
    tabIndex: onClickRow ? 0 : undefined
  }, rest), /*#__PURE__*/React.createElement(InfiniteScroll, {
    items: data,
    onMore: onMore,
    replace: replace,
    renderMarker: function renderMarker(marker) {
      return /*#__PURE__*/React.createElement(TableRow, null, /*#__PURE__*/React.createElement(TableCell, null, marker));
    },
    scrollableAncestor: "window",
    step: step
  }, function (datum, index, rowRef) {
    var primaryValue = primaryProperty ? datumValue(datum, primaryProperty) : undefined;
    var isSelected = selected && selected.includes(primaryValue);
    return /*#__PURE__*/React.createElement(StyledDataTableRow, {
      key: primaryValue || index,
      ref: rowRef,
      size: size,
      active: active >= 0 ? active === index : undefined,
      onClick: onClickRow ? function (event) {
        // extract from React's synthetic event pool
        event.persist();
        var adjustedEvent = event;
        adjustedEvent.datum = datum;
        adjustedEvent.index = index;
        onClickRow(adjustedEvent);
      } : undefined,
      onMouseOver: onClickRow ? function () {
        return setActive(index);
      } : undefined,
      onMouseOut: onClickRow ? function () {
        return setActive(undefined);
      } : undefined,
      onFocus: onClickRow ? function () {
        return setActive(index);
      } : undefined,
      onBlur: onClickRow ? function () {
        return setActive(undefined);
      } : undefined
    }, (selected || onSelect) && /*#__PURE__*/React.createElement(TableCell, {
      background: background
    }, /*#__PURE__*/React.createElement(CheckBox, {
      a11yTitle: (isSelected ? 'unselect' : 'select') + " " + primaryValue,
      checked: isSelected,
      disabled: !onSelect,
      onChange: function onChange() {
        if (isSelected) onSelect(selected.filter(function (s) {
          return s !== primaryValue;
        }));else onSelect([].concat(selected, [primaryValue]));
      }
    })), columns.map(function (column) {
      return /*#__PURE__*/React.createElement(Cell, {
        key: column.property,
        background: column.pin ? pinnedBackground : background,
        border: border,
        context: "body",
        column: column,
        datum: datum,
        index: index,
        pad: pad,
        primaryProperty: primaryProperty,
        rowProp: rowProps && rowProps[primaryValue],
        scope: column.primary || column.property === primaryProperty ? 'row' : undefined
      });
    }));
  })));
});
export { Body };