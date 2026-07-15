"use strict";

exports.__esModule = true;
exports["default"] = exports.Simple = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
var _data = require("../../DataTable/stories/data");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var properties = {};
_data.columns.forEach(function (_ref) {
  var property = _ref.property,
    header = _ref.header;
  properties[property] = {
    label: typeof header === 'string' ? header : property
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
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Data, {
      data: _data.DATA,
      properties: properties
    }, /*#__PURE__*/_react["default"].createElement(_grommet.DataSort, null), /*#__PURE__*/_react["default"].createElement(_grommet.DataTable, {
      columns: _data.columns
    })))
    // </Grommet>
  );
};
Simple.args = {
  full: true
};
var _default = exports["default"] = {
  title: 'Data/DataSort/Simple'
};