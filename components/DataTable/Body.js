"use strict";

exports.__esModule = true;
exports.Body = void 0;

var _react = _interopRequireWildcard(require("react"));

var _CheckBox = require("../CheckBox");

var _InfiniteScroll = require("../InfiniteScroll");

var _TableRow = require("../TableRow");

var _TableCell = require("../TableCell");

var _Keyboard = require("../Keyboard");

var _Cell = require("./Cell");

var _StyledDataTable = require("./StyledDataTable");

var _buildState = require("./buildState");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var Body = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
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
    step: step
  }, function (datum, index, rowRef) {
    var primaryValue = primaryProperty ? (0, _buildState.datumValue)(datum, primaryProperty) : undefined;
    var isSelected = selected && selected.includes(primaryValue);
    return /*#__PURE__*/_react["default"].createElement(_StyledDataTable.StyledDataTableRow, {
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
    }, (selected || onSelect) && /*#__PURE__*/_react["default"].createElement(_TableCell.TableCell, {
      background: background
    }, /*#__PURE__*/_react["default"].createElement(_CheckBox.CheckBox, {
      a11yTitle: (isSelected ? 'unselect' : 'select') + " " + primaryValue,
      checked: isSelected,
      disabled: !onSelect,
      onChange: function onChange() {
        if (isSelected) onSelect(selected.filter(function (s) {
          return s !== primaryValue;
        }));else onSelect([].concat(selected, [primaryValue]));
      }
    })), columns.map(function (column) {
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
    }));
  })));
});
exports.Body = Body;