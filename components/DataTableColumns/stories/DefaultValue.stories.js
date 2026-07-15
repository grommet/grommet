"use strict";

exports.__esModule = true;
exports["default"] = exports.DefaultValue = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
var _data = require("../../DataTable/stories/data");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
// simplify option label for name property
var options = _data.columns.map(function (_ref) {
  var header = _ref.header,
    property = _ref.property;
  return {
    property: property,
    label: property === 'name' ? 'Name' : header
  };
});
var defaultValue = ['percent', 'paid', 'name'];
var DefaultValue = exports.DefaultValue = function DefaultValue() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Box, {
      align: "center",
      justify: "start",
      pad: "large",
      gap: "medium"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Data, {
      data: _data.DATA,
      defaultView: {
        columns: defaultValue
      }
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Toolbar, null, /*#__PURE__*/_react["default"].createElement(_grommet.DataSearch, null), /*#__PURE__*/_react["default"].createElement(_grommet.DataTableColumns, {
      drop: true,
      options: options
    })), /*#__PURE__*/_react["default"].createElement(_grommet.DataSummary, null), /*#__PURE__*/_react["default"].createElement(_grommet.DataTable, {
      columns: _data.columns,
      primaryKey: "name"
    })))
    // </Grommet>
  );
};
DefaultValue.args = {
  full: true
};
var _default = exports["default"] = {
  title: 'Data/DataTableColumns/DefaultValue'
};