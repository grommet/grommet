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
var _excluded = ["cellProps", "columns", "data", "disabled", "groupBy", "groups", "groupState", "pinnedOffset", "primaryProperty", "onMore", "onSelect", "onToggle", "onUpdate", "replace", "rowProps", "selected", "size", "step", "verticalAlign"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var GroupedBody = exports.GroupedBody = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
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
  }, rest), /*#__PURE__*/_react["default"].createElement(_InfiniteScroll.InfiniteScroll, {
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
    var cellProps = (0, _buildState.normalizeRowCellProps)(rowProps, cellPropsProp, primaryValue, index);
    return /*#__PURE__*/_react["default"].createElement(_StyledDataTable.StyledDataTableRow, {
      ref: rowRef,
      key: key,
      size: size
    }, /*#__PURE__*/_react["default"].createElement(_ExpanderCell.ExpanderCell, {
      background: cellProps.background,
      border: cellProps.border,
      context: context,
      pad: cellProps.pad,
      onToggle: context === 'groupHeader' ? onToggle(key) : undefined,
      expanded: expanded,
      verticalAlign: verticalAlign
    }), (selected || onSelect) && /*#__PURE__*/_react["default"].createElement(_TableCell.TableCell, {
      background: cellProps.background,
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