"use strict";

exports.__esModule = true;
exports["default"] = exports.Fallback = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Fallback = exports.Fallback = function Fallback() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Image, {
      fallback: "//v2.grommet.io/assets/IMG_4245.jpg",
      src: "//v2.grommet.io/assets/IMG_4245_not_exists.jpg",
      alt: "fallback image"
    })
    // </Grommet>
  );
};
var _default = exports["default"] = {
  title: 'Media/Image/Fallback'
};