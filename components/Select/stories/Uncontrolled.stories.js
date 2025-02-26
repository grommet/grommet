"use strict";

exports.__esModule = true;
exports["default"] = exports.Uncontrolled = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
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
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Select, {
      id: "select",
      name: "select",
      placeholder: "Select",
      options: ['one', 'two'],
      onChange: function onChange(_ref) {
        var option = _ref.option;
        return console.log(option);
      }
    }))
    // </Grommet>
  );
};
Uncontrolled.parameters = {
  chromatic: {
    disable: true
  }
};
Uncontrolled.args = {
  full: true
};
var _default = exports["default"] = {
  title: 'Input/Select/Uncontrolled'
};