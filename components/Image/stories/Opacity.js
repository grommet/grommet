"use strict";

exports.__esModule = true;
exports["default"] = exports.Opacity = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Opacity = exports.Opacity = function Opacity() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Box, null, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      gap: "small",
      direction: "row"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Image, {
      src: "//v2.grommet.io/assets/IMG_4245.jpg"
    }), /*#__PURE__*/_react["default"].createElement(_grommet.Image, {
      opacity: "strong",
      src: "//v2.grommet.io/assets/IMG_4245.jpg"
    })), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      gap: "small",
      direction: "row"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Image, {
      opacity: "medium",
      src: "//v2.grommet.io/assets/IMG_4245.jpg"
    }), /*#__PURE__*/_react["default"].createElement(_grommet.Image, {
      opacity: "weak",
      src: "//v2.grommet.io/assets/IMG_4245.jpg"
    })), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      gap: "small",
      direction: "row"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Image, {
      opacity: false,
      src: "//v2.grommet.io/assets/IMG_4245.jpg"
    }), /*#__PURE__*/_react["default"].createElement(_grommet.Image, {
      opacity: true,
      src: "//v2.grommet.io/assets/IMG_4245.jpg"
    })), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      gap: "small",
      direction: "row"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Image, {
      opacity: "0.6",
      src: "//v2.grommet.io/assets/IMG_4245.jpg"
    })))
    // </Grommet>
  );
};
var _default = exports["default"] = {
  title: 'Media/Image/Opacity'
};