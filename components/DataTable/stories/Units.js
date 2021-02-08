"use strict";

exports.__esModule = true;
exports["default"] = exports.UnitsDataTable = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var DATA = [{
  name: 'Boot',
  free: 24,
  size: 4
}, {
  name: 'Backup',
  free: 30,
  size: 12
}, {
  name: 'Application',
  free: 40,
  size: 23
}];
var columns = [{
  property: 'name',
  header: 'Disk Name',
  size: 'small'
}, {
  property: 'size',
  header: 'Size',
  size: 'xsmall',
  align: 'end',
  units: '(TiB)'
}, {
  property: 'free',
  header: 'Free',
  size: 'xsmall',
  align: 'end',
  units: '%'
}];

var UnitsDataTable = function UnitsDataTable() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Heading, {
    level: "3"
  }, "Table with units in the heading"), /*#__PURE__*/_react["default"].createElement(_grommet.DataTable, {
    columns: columns,
    data: DATA,
    primaryKey: false
  })));
};

exports.UnitsDataTable = UnitsDataTable;
UnitsDataTable.storyName = 'Units';
var _default = {
  title: 'Visualizations/DataTable/Units'
};
exports["default"] = _default;