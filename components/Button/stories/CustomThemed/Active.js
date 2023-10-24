"use strict";

exports.__esModule = true;
exports["default"] = exports.Active = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
var _grommetIcons = require("grommet-icons");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Active = exports.Active = function Active() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: {
      global: {
        font: {
          family: "-apple-system, BlinkMacSystemFont"
        }
      },
      button: {
        "default": {}
      } // enabling kind button functionality
    }
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "large",
    align: "center"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    hoverIndicator: "light-1",
    onClick: function onClick() {},
    active: true
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "small",
    direction: "row",
    align: "center",
    gap: "small"
  }, /*#__PURE__*/_react["default"].createElement(_grommetIcons.Add, null), /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "Kind")))));
};
Active.storyName = 'Active';
var _default = exports["default"] = {
  title: 'Controls/Button/Custom Themed/Active'
};