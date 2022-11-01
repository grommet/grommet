import React, { forwardRef } from 'react';
export var PlaceholderBody = /*#__PURE__*/forwardRef(function (_ref, ref) {
  var _ref$columns = _ref.columns,
    columns = _ref$columns === void 0 ? [] : _ref$columns,
    onSelect = _ref.onSelect,
    children = _ref.children;
  var colSpan = Math.max(columns.length + (onSelect ? 1 : 0), 1);
  return /*#__PURE__*/React.createElement("tbody", {
    ref: ref
  }, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    colSpan: colSpan
  }, children)));
});