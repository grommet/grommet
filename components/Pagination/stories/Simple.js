"use strict";

exports.__esModule = true;
exports["default"] = exports.Simple = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Simple = exports.Simple = function Simple() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Box, {
      align: "start",
      pad: "small",
      gap: "medium"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, null, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "Default"), /*#__PURE__*/_react["default"].createElement(_grommet.Pagination, {
      numberItems: 237
    })), /*#__PURE__*/_react["default"].createElement(_grommet.Box, null, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "Box Props"), /*#__PURE__*/_react["default"].createElement(_grommet.Pagination, {
      numberItems: 1237,
      page: 24,
      background: "brand",
      pad: "medium",
      margin: "small"
    })))
    // </Grommet>
  );
};
var _default = exports["default"] = {
  title: 'Controls/Pagination/Simple'
};