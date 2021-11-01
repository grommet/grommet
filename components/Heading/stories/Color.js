"use strict";

exports.__esModule = true;
exports["default"] = exports.Color = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Color = function Color() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Heading, {
      color: "accent-1"
    }, "Colored Heading") // </Grommet>

  );
};

exports.Color = Color;
var _default = {
  title: 'Type/Heading/Color'
};
exports["default"] = _default;