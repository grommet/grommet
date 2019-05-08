function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import { InfiniteScroll } from '../InfiniteScroll';
import { TableRow } from '../TableRow';
import { TableCell } from '../TableCell';
import { Cell } from './Cell';
import { StyledDataTableBody, StyledDataTableRow } from './StyledDataTable';
export var Body = function Body(_ref) {
  var columns = _ref.columns,
      data = _ref.data,
      onMore = _ref.onMore,
      primaryProperty = _ref.primaryProperty,
      size = _ref.size,
      step = _ref.step,
      theme = _ref.theme,
      rest = _objectWithoutPropertiesLoose(_ref, ["columns", "data", "onMore", "primaryProperty", "size", "step", "theme"]);

  return React.createElement(StyledDataTableBody, _extends({
    size: size
  }, rest), React.createElement(InfiniteScroll, {
    items: data,
    onMore: onMore,
    renderMarker: function renderMarker(marker) {
      return React.createElement(TableRow, null, React.createElement(TableCell, null, marker));
    },
    scrollableAncestor: "window",
    step: step
  }, function (datum) {
    return React.createElement(StyledDataTableRow, {
      key: datum[primaryProperty],
      size: size
    }, columns.map(function (column) {
      return React.createElement(Cell, {
        key: column.property,
        context: "body",
        column: column,
        datum: datum,
        primaryProperty: primaryProperty,
        scope: column.primary || column.property === primaryProperty ? 'row' : undefined
      });
    }));
  }));
};