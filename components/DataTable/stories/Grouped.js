"use strict";

exports.__esModule = true;
exports["default"] = exports.GroupedDataTable = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

var _themes = require("grommet/themes");

var _data = require("./data");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Source code for the data can be found here
// https://github.com/grommet/grommet/blob/master/src/js/components/DataTable/stories/data.js
var GroupedDataTable = function GroupedDataTable() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.DataTable, {
    columns: _data.groupColumns,
    data: _data.DATA,
    groupBy: "location",
    sortable: true
  })));
};

exports.GroupedDataTable = GroupedDataTable;
GroupedDataTable.storyName = 'Grouped';
var _default = {
  title: 'Visualizations/DataTable/Grouped'
};
exports["default"] = _default;