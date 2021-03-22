"use strict";

exports.__esModule = true;
exports.Body = void 0;

var _react = _interopRequireWildcard(require("react"));

var _CheckBox = require("../CheckBox");

var _InfiniteScroll = require("../InfiniteScroll");

var _TableRow = require("../TableRow");

var _TableCell = require("../TableCell");

var _Keyboard = require("../Keyboard");

var _ExpanderCell = require("./ExpanderCell");

var _Cell = require("./Cell");

var _StyledDataTable = require("./StyledDataTable");

var _buildState = require("./buildState");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var Row = /*#__PURE__*/(0, _react.memo)(function (_ref) {
  var primaryValue = _ref.primaryValue,
      index = _ref.index,
      rowRef = _ref.rowRef,
      size = _ref.size,
      active = _ref.active,
      onClickRow = _ref.onClickRow,
      datum = _ref.datum,
      setActive = _ref.setActive,
      selected = _ref.selected,
      onSelect = _ref.onSelect,
      background = _ref.background,
      isSelected = _ref.isSelected,
      rowDetails = _ref.rowDetails,
      isRowExpanded = _ref.isRowExpanded,
      setRowExpand = _ref.setRowExpand,
      rowExpand = _ref.rowExpand,
      columns = _ref.columns,
      pinnedBackground = _ref.pinnedBackground,
      border = _ref.border,
      pad = _ref.pad,
      primaryProperty = _ref.primaryProperty,
      rowProps = _ref.rowProps,
      data = _ref.data;
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_StyledDataTable.StyledDataTableRow, {
    ref: rowRef,
    size: size,
    active: active,
    onClick: onClickRow ? function (event) {
      // extract from React's synthetic event pool
      event.persist();
      var adjustedEvent = event;
      adjustedEvent.datum = datum;
      adjustedEvent.index = index;
      onClickRow(adjustedEvent);
    } : undefined,
    onMouseEnter: onClickRow ? function () {
      return setActive(index);
    } : undefined,
    onMouseLeave: onClickRow ? function () {
      return setActive(undefined);
    } : undefined,
    onFocus: onClickRow ? function () {
      return setActive(index);
    } : undefined,
    onBlur: onClickRow ? function () {
      return setActive(undefined);
    } : undefined
  }, (selected || onSelect) && /*#__PURE__*/_react["default"].createElement(_TableCell.TableCell, {
    background: background
  }, /*#__PURE__*/_react["default"].createElement(_CheckBox.CheckBox, {
    a11yTitle: (isSelected ? 'unselect' : 'select') + " " + primaryValue,
    checked: isSelected,
    disabled: !onSelect,
    onChange: function onChange() {
      if (isSelected) {
        onSelect(selected.filter(function (s) {
          return s !== primaryValue;
        }));
      } else onSelect([].concat(selected, [primaryValue]));
    }
  })), rowDetails && /*#__PURE__*/_react["default"].createElement(_ExpanderCell.ExpanderCell, {
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
    }
  }), columns.map(function (column) {
    return /*#__PURE__*/_react["default"].createElement(_Cell.Cell, {
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
  })), rowDetails && isRowExpanded && /*#__PURE__*/_react["default"].createElement(_StyledDataTable.StyledDataTableRow, {
    key: index.toString() + "_expand"
  }, (selected || onSelect) && /*#__PURE__*/_react["default"].createElement(_TableCell.TableCell, null), /*#__PURE__*/_react["default"].createElement(_TableCell.TableCell, {
    colSpan: columns.length + 1
  }, rowDetails(data[index]))));
});
var Body = /*#__PURE__*/(0, _react.forwardRef)(function (_ref2, ref) {
  var background = _ref2.background,
      border = _ref2.border,
      columns = _ref2.columns,
      data = _ref2.data,
      onMore = _ref2.onMore,
      replace = _ref2.replace,
      onClickRow = _ref2.onClickRow,
      onSelect = _ref2.onSelect,
      pad = _ref2.pad,
      pinnedBackground = _ref2.pinnedBackground,
      primaryProperty = _ref2.primaryProperty,
      rowProps = _ref2.rowProps,
      selected = _ref2.selected,
      rowDetails = _ref2.rowDetails,
      show = _ref2.show,
      size = _ref2.size,
      step = _ref2.step,
      rowExpand = _ref2.rowExpand,
      setRowExpand = _ref2.setRowExpand,
      rest = _objectWithoutPropertiesLoose(_ref2, ["background", "border", "columns", "data", "onMore", "replace", "onClickRow", "onSelect", "pad", "pinnedBackground", "primaryProperty", "rowProps", "selected", "rowDetails", "show", "size", "step", "rowExpand", "setRowExpand"]);

  var _React$useState = _react["default"].useState(),
      active = _React$useState[0],
      setActive = _React$useState[1];

  return /*#__PURE__*/_react["default"].createElement(_Keyboard.Keyboard, {
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
  }, /*#__PURE__*/_react["default"].createElement(_StyledDataTable.StyledDataTableBody, _extends({
    ref: ref,
    size: size,
    tabIndex: onClickRow ? 0 : undefined
  }, rest), /*#__PURE__*/_react["default"].createElement(_InfiniteScroll.InfiniteScroll, {
    items: data,
    onMore: onMore,
    replace: replace,
    renderMarker: function renderMarker(marker) {
      return /*#__PURE__*/_react["default"].createElement(_TableRow.TableRow, null, /*#__PURE__*/_react["default"].createElement(_TableCell.TableCell, null, marker));
    },
    scrollableAncestor: "window",
    show: show,
    step: step
  }, function (datum, index, rowRef) {
    var primaryValue = primaryProperty ? (0, _buildState.datumValue)(datum, primaryProperty) : undefined;
    var isSelected = selected && selected.includes(primaryValue);
    var isRowExpanded = rowExpand && rowExpand.includes(index);
    return /*#__PURE__*/_react["default"].createElement(Row, {
      key: primaryValue || index,
      rowRef: rowRef,
      primaryValue: primaryValue,
      isSelected: isSelected,
      isRowExpanded: isRowExpanded,
      index: index,
      size: size,
      active: active >= 0 ? active === index : undefined,
      onClickRow: onClickRow,
      datum: datum,
      setActive: setActive,
      selected: selected,
      onSelect: onSelect,
      background: background,
      rowDetails: rowDetails,
      setRowExpand: setRowExpand,
      rowExpand: rowExpand,
      columns: columns,
      pinnedBackground: pinnedBackground,
      border: border,
      pad: pad,
      primaryProperty: primaryProperty,
      rowProps: rowProps,
      data: data
    });
  })));
});
exports.Body = Body;