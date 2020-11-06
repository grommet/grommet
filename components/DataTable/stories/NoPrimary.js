"use strict";

exports.__esModule = true;
exports.NoPrimaryKeyDataTable = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

var _themes = require("grommet/themes");

var _data = require("./data");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Source code for the data can be found here
// https://github.com/grommet/grommet/blob/master/src/js/components/DataTable/stories/data.js
var columns = [{
  property: 'name',
  header: 'Name'
}, {
  property: 'location',
  header: 'Location'
}];

var NoPrimaryKeyDataTable = function NoPrimaryKeyDataTable() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.DataTable, {
    columns: columns,
    data: _data.DATA,
    step: 10,
    primaryKey: false
  })));
};

exports.NoPrimaryKeyDataTable = NoPrimaryKeyDataTable;
NoPrimaryKeyDataTable.story = {
  name: 'No primary'
};