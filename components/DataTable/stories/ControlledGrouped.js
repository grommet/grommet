"use strict";

exports.__esModule = true;
exports["default"] = exports.ControlledGroupedDataTable = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var _data = require("./data");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); } // Source code for the data can be found here
// https://github.com/grommet/grommet/blob/master/src/js/components/DataTable/stories/data.js
var groupColumns = [].concat(_data.columns);
var first = groupColumns[0];
groupColumns[0] = _extends({}, groupColumns[1]);
groupColumns[1] = _extends({}, first);
groupColumns[0].footer = groupColumns[1].footer;
delete groupColumns[1].footer;
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