"use strict";

exports.__esModule = true;
exports["default"] = exports.ControlledGroupedDataTable = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var _data = require("./data");
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, "default": e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } // SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
// Source code for the data can be found here
// https://github.com/grommet/grommet/blob/master/src/js/components/DataTable/stories/data.js
var groupColumns = [].concat(_data.columns);
var first = groupColumns[0];
groupColumns[0] = _extends({}, groupColumns[1]);
groupColumns[1] = _extends({}, first);
groupColumns[0].footer = groupColumns[1].footer;
delete groupColumns[1].footer;
var expandLabel = function expandLabel(row) {
  return row == null ? void 0 : row.location;
};
var ControlledGroupedDataTable = exports.ControlledGroupedDataTable = function ControlledGroupedDataTable() {
  var _useState = (0, _react.useState)([_data.DATA[2].location]),
    expandedGroups = _useState[0],
    setExpandedGroups = _useState[1];
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={grommet}>
    _react["default"].createElement(_grommet.DataTable, {
      columns: groupColumns,
      data: _data.DATA,
      groupBy: {
        property: 'location',
        expand: expandedGroups,
        expandLabel: expandLabel,
        onExpand: setExpandedGroups
      },
      sortable: true
    })
    // </Grommet>
  );
};
ControlledGroupedDataTable.storyName = 'Controlled grouped';
var _default = exports["default"] = {
  title: 'Visualizations/DataTable/Controlled grouped'
};