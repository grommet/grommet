"use strict";

exports.__esModule = true;
exports.GroupedBody = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Cell = require("./Cell");

var _ExpanderCell = require("./ExpanderCell");

var _StyledDataTable = require("./StyledDataTable");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var GroupedBody = function GroupedBody(_ref) {
  var columns = _ref.columns,
      groupBy = _ref.groupBy,
      groups = _ref.groups,
      groupState = _ref.groupState,
      primaryProperty = _ref.primaryProperty,
      onToggle = _ref.onToggle,
      size = _ref.size,
      rest = _objectWithoutPropertiesLoose(_ref, ["columns", "groupBy", "groups", "groupState", "primaryProperty", "onToggle", "size"]);

  return _react["default"].createElement(_StyledDataTable.StyledDataTableBody, _extends({
    size: size
  }, rest), groups.map(function (group) {
    var expanded = groupState[group.key].expanded;
    var memberCount = group.data.length;
    var content = memberCount > 1 ? _react["default"].createElement(_StyledDataTable.StyledDataTableRow, {
      key: group.key,
      size: size
    }, _react["default"].createElement(_ExpanderCell.ExpanderCell, {
      context: expanded ? 'groupHeader' : 'body',
      expanded: expanded,
      onToggle: onToggle(group.key)
    }), columns.map(function (column) {
      return _react["default"].createElement(_Cell.Cell, {
        key: column.property,
        context: expanded ? 'groupHeader' : 'body',
        column: column,
        datum: group.datum,
        scope: column.property === groupBy ? 'row' : undefined
      });
    })) : null;

    if (memberCount === 1 || expanded) {
      content = _react["default"].createElement(_react.Fragment, {
        key: group.key
      }, content, group.data.map(function (datum, index) {
        var context = memberCount > 1 && index === memberCount - 1 ? 'groupEnd' : 'body';
        return _react["default"].createElement(_StyledDataTable.StyledDataTableRow, {
          key: datum[primaryProperty],
          size: size
        }, _react["default"].createElement(_ExpanderCell.ExpanderCell, {
          context: context
        }), columns.map(function (column) {
          return _react["default"].createElement(_Cell.Cell, {
            key: column.property,
            context: context,
            column: column,
            datum: datum,
            scope: column.primary ? 'row' : undefined
          });
        }));
      }));
    }

    return content;
  }));
};

exports.GroupedBody = GroupedBody;