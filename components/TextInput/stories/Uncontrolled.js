"use strict";

exports.__esModule = true;
exports["default"] = exports.Uncontrolled = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Uncontrolled = exports.Uncontrolled = function Uncontrolled() {
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
      width: "medium"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.TextInput, {
      onChange: function onChange(event) {
        return console.log('Change', event.target.value);
      },
      "aria-label": "Input Text"
    })))
    // </Grommet>
  );
};

Uncontrolled.parameters = {
  chromatic: {
    disable: true
  }
};
var _default = exports["default"] = {
  title: 'Input/TextInput/Uncontrolled'
};