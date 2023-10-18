"use strict";

exports.__esModule = true;
exports["default"] = exports.RTLBox = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var RTLBox = exports.RTLBox = function RTLBox() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Box, {
      direction: "row",
      align: "center",
      pad: "small",
      gap: "small",
      border: true
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      direction: "row",
      align: "center",
      pad: "small",
      border: "start"
    }, "border start"), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      direction: "row",
      align: "center",
      pad: {
        start: 'large'
      },
      background: "brand"
    }, "pad start"), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      direction: "row",
      align: "center",
      margin: {
        start: 'large'
      },
      background: "brand"
    }, "margin start"))
    // </Grommet>
  );
};

RTLBox.storyName = 'RTL';
RTLBox.args = {
  dir: 'rtl'
};
var _default = exports["default"] = {
  title: 'Layout/Box/RTL'
};