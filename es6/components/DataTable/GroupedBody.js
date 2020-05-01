function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { Fragment } from 'react';
import { Cell } from './Cell';
import { ExpanderCell } from './ExpanderCell';
import { StyledDataTableBody, StyledDataTableRow } from './StyledDataTable';
export var GroupedBody = function GroupedBody(_ref) {
  var background = _ref.background,
      border = _ref.border,
      columns = _ref.columns,
      groupBy = _ref.groupBy,
      groups = _ref.groups,
      groupState = _ref.groupState,
      pad = _ref.pad,
      primaryProperty = _ref.primaryProperty,
      onToggle = _ref.onToggle,
      size = _ref.size,
      rest = _objectWithoutPropertiesLoose(_ref, ["background", "border", "columns", "groupBy", "groups", "groupState", "pad", "primaryProperty", "onToggle", "size"]);

  return /*#__PURE__*/React.createElement(StyledDataTableBody, _extends({
    size: size
  }, rest), groups.map(function (group) {
    var expanded = groupState[group.key].expanded;
    var memberCount = group.data.length;
    var content = memberCount > 1 ? /*#__PURE__*/React.createElement(StyledDataTableRow, {
      key: group.key,
      size: size
    }, /*#__PURE__*/React.createElement(ExpanderCell, {
      context: expanded ? 'groupHeader' : 'body',
      expanded: expanded,
      onToggle: onToggle(group.key)
    }), columns.map(function (column) {
      return /*#__PURE__*/React.createElement(Cell, {
        key: column.property,
        background: background,
        border: border,
        context: expanded ? 'groupHeader' : 'body',
        column: column,
        datum: group.datum,
        pad: pad,
        scope: column.property === groupBy ? 'row' : undefined
      });
    })) : null;

    if (memberCount === 1 || expanded) {
      content = /*#__PURE__*/React.createElement(Fragment, {
        key: group.key
      }, content, group.data.map(function (datum, index) {
        var context = memberCount > 1 && index === memberCount - 1 ? 'groupEnd' : 'body';
        return /*#__PURE__*/React.createElement(StyledDataTableRow, {
          key: datum[primaryProperty],
          size: size
        }, /*#__PURE__*/React.createElement(ExpanderCell, {
          context: context
        }), columns.map(function (column) {
          return /*#__PURE__*/React.createElement(Cell, {
            key: column.property,
            background: background,
            border: border,
            context: context,
            column: column,
            datum: datum,
            pad: pad,
            scope: column.primary ? 'row' : undefined
          });
        }));
      }));
    }

    return content;
  }));
};