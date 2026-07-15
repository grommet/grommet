"use strict";

exports.__esModule = true;
exports["default"] = exports.Example = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
var _Data = require("../Data");
var _data = require("../../DataTable/stories/data");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var Example = exports.Example = function Example() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Box, {
      pad: "large",
      width: "large"
    }, /*#__PURE__*/_react["default"].createElement(_Data.Data, {
      data: _data.DATA
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Toolbar, null, /*#__PURE__*/_react["default"].createElement(_grommet.DataSearch, null), /*#__PURE__*/_react["default"].createElement(_grommet.DataFilters, {
      drop: true
    }, /*#__PURE__*/_react["default"].createElement(_grommet.DataFilter, {
      property: "location"
    }))), /*#__PURE__*/_react["default"].createElement(_grommet.DataSummary, null), /*#__PURE__*/_react["default"].createElement(_grommet.List, {
      primaryKey: "name",
      secondaryKey: "location"
    })))
    // </Grommet>
  );
};
Example.storyName = 'List';
Example.args = {
  full: true
};
var _default = exports["default"] = {
  title: 'Data/Data/List'
};