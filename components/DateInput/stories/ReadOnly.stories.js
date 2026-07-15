"use strict";

exports.__esModule = true;
exports["default"] = exports.ReadOnly = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var ReadOnly = exports.ReadOnly = function ReadOnly() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Box, {
      fill: true,
      align: "center",
      pad: "large"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      width: "medium",
      gap: "medium"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.DateInput, {
      value: "02/11/2024",
      "aria-label": "read only",
      readOnly: true,
      format: "mm/dd/yyyy"
    }), /*#__PURE__*/_react["default"].createElement(_grommet.DateInput, {
      value: "02/11/2024",
      "aria-label": "read only copy",
      readOnlyCopy: true,
      format: "mm/dd/yyyy"
    })))
    // </Grommet>
  );
};
var _default = exports["default"] = {
  title: 'Input/DateInput/ReadOnly'
};