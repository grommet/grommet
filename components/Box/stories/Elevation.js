"use strict";

exports.__esModule = true;
exports["default"] = exports.ElevationBox = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var ElevationBox = exports.ElevationBox = function ElevationBox() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Box, {
      pad: "small",
      align: "start"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      pad: "medium",
      background: "dark-1",
      elevation: "medium",
      gap: "medium"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "dark on white"), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      pad: "medium",
      elevation: "medium",
      gap: "medium"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "dark on dark"), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      pad: "medium",
      background: "light-1",
      elevation: "medium",
      gap: "medium"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "light on dark"), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      pad: "medium",
      elevation: "medium"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "light on light"))))))
    // </Grommet>
  );
};

ElevationBox.storyName = 'Elevation';
var _default = exports["default"] = {
  title: 'Layout/Box/Elevation'
};