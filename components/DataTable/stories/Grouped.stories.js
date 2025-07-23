"use strict";

exports.__esModule = true;
exports["default"] = exports.GroupedDataTable = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
var _data = require("./data");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
// Source code for the data can be found here
// https://github.com/grommet/grommet/blob/master/src/js/components/DataTable/stories/data.js

var expandLabel = function expandLabel(row) {
  return row == null ? void 0 : row.location;
};
var GroupedDataTable = exports.GroupedDataTable = function GroupedDataTable() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={grommet}>
    _react["default"].createElement(_grommet.Box, {
      align: "center",
      pad: "large"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.DataTable, {
      columns: _data.groupColumns,
      data: _data.DATA,
      groupBy: {
        property: 'location',
        expandLabel: expandLabel
      },
      sortable: true
    }))
    // </Grommet>
  );
};
GroupedDataTable.storyName = 'Grouped';
var _default = exports["default"] = {
  title: 'Visualizations/DataTable/Grouped'
};