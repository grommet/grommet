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
      justify: "start",
      pad: "large"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      width: "medium",
      gap: "medium"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Form, null, /*#__PURE__*/_react["default"].createElement(_grommet.FormField, null, /*#__PURE__*/_react["default"].createElement(_grommet.TextInput, {
      readOnlyCopy: true,
      value: "Read only with copy button",
      "aria-label": "read only"
    })), /*#__PURE__*/_react["default"].createElement(_grommet.FormField, null, /*#__PURE__*/_react["default"].createElement(_grommet.TextInput, {
      readOnly: true,
      value: "Read only",
      "aria-label": "read only"
    }))), /*#__PURE__*/_react["default"].createElement(_grommet.TextInput, {
      readOnlyCopy: true,
      value: "Read only with copy button",
      "aria-label": "read only"
    }), /*#__PURE__*/_react["default"].createElement(_grommet.TextInput, {
      readOnly: true,
      value: "Read only",
      "aria-label": "read only"
    })))
    // </Grommet>
  );
};
var _default = exports["default"] = {
  title: 'Input/TextInput/ReadOnly'
};