"use strict";

exports.__esModule = true;
exports["default"] = exports.ControlledGroupedDataTable = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var _data = require("./data");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } // Source code for the data can be found here
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