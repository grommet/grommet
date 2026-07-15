"use strict";

exports.__esModule = true;
exports["default"] = exports.Responsive = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
var _data = require("../../DataTable/stories/data");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var Responsive = exports.Responsive = function Responsive() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Box, {
      pad: "large"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Paragraph, {
      color: "text-weak"
    }, "Note: Results are filtered as you type, checking all fields. When responsive=true on DataSearch, the search control will collapse at small breakpoints. Reduce the width of your screen to see this behavior."), /*#__PURE__*/_react["default"].createElement(_grommet.Data, {
      data: _data.DATA
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Toolbar, null, /*#__PURE__*/_react["default"].createElement(_grommet.DataSearch, {
      responsive: true
    })), /*#__PURE__*/_react["default"].createElement(_grommet.DataSummary, null), /*#__PURE__*/_react["default"].createElement(_grommet.DataTable, {
      columns: _data.columns
    })))
    // </Grommet>
  );
};
Responsive.args = {
  full: true
};
var _default = exports["default"] = {
  title: 'Data/DataSearch/Responsive'
};