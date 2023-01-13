"use strict";

exports.__esModule = true;
exports["default"] = exports.Simple = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
var _DataTableColumns = require("../DataTableColumns");
var _data = require("../../DataTable/stories/data");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// simplify option label for name property
var options = _data.columns.map(function (_ref) {
  var header = _ref.header,
    property = _ref.property;
  return {
    property: property,
    label: property === 'name' ? 'Name' : header
  };
});
var Simple = function Simple() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Grid, {
      pad: "large",
      columns: ['large'],
      justifyContent: "center"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Data, {
      data: _data.DATA,
      updateOn: "change"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Toolbar, null, /*#__PURE__*/_react["default"].createElement(_DataTableColumns.DataTableColumns, {
      drop: true,
      options: options
    })), /*#__PURE__*/_react["default"].createElement(_grommet.DataTable, {
      columns: _data.columns
    })))
    // </Grommet>
  );
};
exports.Simple = Simple;
Simple.args = {
  full: true
};
var _default = {
  title: 'Layout/Data/DataTableColumns/Simple'
};
exports["default"] = _default;