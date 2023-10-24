"use strict";

exports.__esModule = true;
exports["default"] = exports.Simple = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
var _DataTableGroupBy = require("../DataTableGroupBy");
var _data = require("../../DataTable/stories/data");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// simplify option label for name property
var options = _data.columns.filter(function (_ref) {
  var property = _ref.property;
  return ['location', 'percent'].includes(property);
}).map(function (_ref2) {
  var header = _ref2.header,
    property = _ref2.property;
  return {
    property: property,
    label: header
  };
});
var Simple = exports.Simple = function Simple() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Box, {
      align: "center",
      justify: "start",
      pad: "large",
      gap: "medium"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Notification, {
      status: "info",
      message: "Data is in 'beta'. The API surface is subject to change."
    }), /*#__PURE__*/_react["default"].createElement(_grommet.Data, {
      data: _data.DATA
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Toolbar, null, /*#__PURE__*/_react["default"].createElement(_DataTableGroupBy.DataTableGroupBy, {
      options: options
    })), /*#__PURE__*/_react["default"].createElement(_grommet.DataTable, null)))
    // </Grommet>
  );
};

Simple.args = {
  full: true
};
var _default = exports["default"] = {
  title: 'Data/DataTableGroupBy/Simple'
};