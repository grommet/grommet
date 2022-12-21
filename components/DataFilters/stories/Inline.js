"use strict";

exports.__esModule = true;
exports["default"] = exports.Inline = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
var _DataFilters = require("../DataFilters");
var _data = require("../../DataTable/stories/data");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Inline = function Inline() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Box, {
      fill: true,
      align: "center",
      justify: "start",
      pad: "large"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Data, {
      data: _data.DATA
    }, /*#__PURE__*/_react["default"].createElement(_DataFilters.DataFilters, null, /*#__PURE__*/_react["default"].createElement(_grommet.DataSearch, null), /*#__PURE__*/_react["default"].createElement(_grommet.DataFilter, {
      property: "location"
    }), /*#__PURE__*/_react["default"].createElement(_grommet.DataFilter, {
      property: "percent"
    }), /*#__PURE__*/_react["default"].createElement(_grommet.DataSort, null))))
    // </Grommet>
  );
};
exports.Inline = Inline;
Inline.args = {
  full: true
};
var _default = {
  title: 'Layout/Data/DataFilters/Inline'
};
exports["default"] = _default;