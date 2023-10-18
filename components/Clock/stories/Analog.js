"use strict";

exports.__esModule = true;
exports["default"] = exports.Analog = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var sizes = ['xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge', 'huge'];
var Analog = exports.Analog = function Analog() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      direction: "row",
      gap: "small",
      pad: "large"
    }, sizes.map(function (size) {
      return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
        key: size,
        align: "center"
      }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, size), /*#__PURE__*/_react["default"].createElement(_grommet.Clock, {
        type: "analog",
        size: size
      }));
    })), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      pad: "large"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "xxlarge and huge sizes are equal. The latter is kept for beckwards compatibility.")))
    // </Grommet>
  );
};

Analog.parameters = {
  chromatic: {
    disable: true
  }
};
var _default = exports["default"] = {
  title: 'Visualizations/Clock/Analog'
};