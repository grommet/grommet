"use strict";

exports.__esModule = true;
exports["default"] = exports.Autoplay = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommetIcons = require("grommet-icons");
var _grommet = require("grommet");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Autoplay = exports.Autoplay = function Autoplay() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={grommet}>
    _react["default"].createElement(_grommet.Box, {
      gap: "medium",
      align: "center",
      pad: "large"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
      size: "small"
    }, "The Carousel slides will transition every 3 seconds"), /*#__PURE__*/_react["default"].createElement(_grommet.Carousel, {
      controls: false,
      play: 3000
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      pad: "xlarge",
      background: "pink"
    }, /*#__PURE__*/_react["default"].createElement(_grommetIcons.Attraction, {
      color: "light-2",
      size: "xlarge"
    })), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      pad: "xlarge",
      background: "purple"
    }, /*#__PURE__*/_react["default"].createElement(_grommetIcons.TreeOption, {
      color: "light-2",
      size: "xlarge"
    })), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      pad: "xlarge",
      background: "teal"
    }, /*#__PURE__*/_react["default"].createElement(_grommetIcons.Car, {
      color: "light-2",
      size: "xlarge"
    }))))
    // </Grommet>
  );
};
var _default = exports["default"] = {
  title: 'Media/Carousel/Autoplay'
};