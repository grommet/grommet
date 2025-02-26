"use strict";

exports.__esModule = true;
exports["default"] = exports.GroupedOnSelectDataTable = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
var _data = require("./data");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } // Source code for the data can be found here
// https://github.com/grommet/grommet/blob/master/src/js/components/DataTable/stories/data.js
var groupColumns = [].concat(_data.columns);
var first = groupColumns[0];
groupColumns[0] = _extends({}, groupColumns[1]);
groupColumns[1] = _extends({}, first);
groupColumns[0].footer = groupColumns[1].footer;
delete groupColumns[1].footer;
var GroupedOnSelectDataTable = exports.GroupedOnSelectDataTable = function GroupedOnSelectDataTable() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={grommet}>
    _react["default"].createElement(_grommet.Box, {
      align: "center",
      pad: "large"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.DataTable, {
      columns: groupColumns,
      data: _data.DATA,
      groupBy: "location",
      onSelect: function onSelect() {},
      sortable: true
    }))
    // </Grommet>
  );
};
GroupedOnSelectDataTable.storyName = 'Grouped and onSelect';
var _default = exports["default"] = {
  title: 'Visualizations/DataTable/Grouped and onSelect'
};