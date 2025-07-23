"use strict";

exports.__esModule = true;
exports.GroupedBody = void 0;
var _react = _interopRequireWildcard(require("react"));
var _Cell = require("./Cell");
var _ExpanderCell = require("./ExpanderCell");
var _StyledDataTable = require("./StyledDataTable");
var _CheckBox = require("../CheckBox/CheckBox");
var _InfiniteScroll = require("../InfiniteScroll");
var _TableRow = require("../TableRow");
var _TableCell = require("../TableCell");
var _buildState = require("./buildState");
var _useThemeValue2 = require("../../utils/useThemeValue");
var _excluded = ["cellProps", "columns", "data", "disabled", "groupBy", "groups", "groupState", "messages", "pinnedOffset", "primaryProperty", "onMore", "onSelect", "onToggle", "onUpdate", "replace", "rowProps", "selected", "size", "step", "verticalAlign"];
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var GroupedBody = exports.GroupedBody = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var cellPropsProp = _ref.cellProps,
    columns = _ref.columns,
    data = _ref.data,
    disabled = _ref.disabled,
    groupBy = _ref.groupBy,
    groups = _ref.groups,
    groupState = _ref.groupState,
    messages = _ref.messages,
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
  var _useThemeValue = (0, _useThemeValue2.useThemeValue)(),
    passThemeFlag = _useThemeValue.passThemeFlag;
  var items = (0, _react.useMemo)(function () {
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
          var primaryValue = primaryProperty ? (0, _buildState.datumValue)(datum, primaryProperty) : undefined;
          var isSelected = selected == null ? void 0 : selected.includes(primaryValue);
          var isDisabled = disabled == null ? void 0 : disabled.includes(primaryValue);
          nextItems.push({
            key: datum[primaryProperty],
            primaryValue: primaryProperty ? (0, _buildState.datumValue)(datum, primaryProperty) : undefined,
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
  return /*#__PURE__*/_react["default"].createElement(_StyledDataTable.StyledDataTableBody, _extends({
    ref: ref,
    size: size
  }, passThemeFlag, rest), /*#__PURE__*/_react["default"].createElement(_InfiniteScroll.InfiniteScroll, {
    items: items,
    onMore: onMore,
    replace: replace,
    renderMarker: function renderMarker(marker) {
      return /*#__PURE__*/_react["default"].createElement(_TableRow.TableRow, null, /*#__PURE__*/_react["default"].createElement(_TableCell.TableCell, null, marker));
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
    var cellProps = (0, _buildState.normalizeRowCellProps)(rowProps, context === 'groupHeader' ? cellPropsProp.groupHeader : cellPropsProp.body, primaryValue, index);
    var ariaLabel;
    if (typeof groupBy === 'object' && typeof groupBy.expandLabel === 'function') {
      var labelRow = context === 'groupHeader' ? row.datum : row.datum;
      ariaLabel = groupBy.expandLabel(labelRow);
    }
    return /*#__PURE__*/_react["default"].createElement(_StyledDataTable.StyledDataTableRow, _extends({
      ref: rowRef,
      key: key,
      size: size
    }, passThemeFlag), /*#__PURE__*/_react["default"].createElement(_ExpanderCell.ExpanderCell, {
      background: isSelected && cellProps.selected.background || cellProps.background,
      expandLabel: ariaLabel,
      border: cellProps.border,
      context: context,
      messages: messages,
      pad: cellProps.pad,
      onToggle: context === 'groupHeader' ? onToggle(key) : undefined,
      expanded: expanded,
      verticalAlign: verticalAlign
    }), (selected || onSelect) && /*#__PURE__*/_react["default"].createElement(_TableCell.TableCell, {
      background: isSelected && cellProps.selected.background || cellProps.background,
      border: cellProps.pinned.border || cellProps.border,
      plain: "noPad",
      size: "auto",
      verticalAlign: verticalAlign,
      "aria-disabled": isDisabled || !onSelect || undefined
    }, /*#__PURE__*/_react["default"].createElement(_CheckBox.CheckBox, {
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
      return /*#__PURE__*/_react["default"].createElement(_Cell.Cell, {
        key: column.property,
        background: isSelected && cellProps.selected.background || cellProps.background,
        border: cellProps.border,
        context: context,
        column: column,
        datum: datum,
        pad: cellProps.pad,
        scope: scope,
        pinnedOffset: pinnedOffset && pinnedOffset[column.property],
        verticalAlign: verticalAlign
      });
    }));
  }));
});