"use strict";

exports.__esModule = true;
exports["default"] = exports.InteractiveSlides = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var InteractiveSlides = exports.InteractiveSlides = function InteractiveSlides() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={grommet}>
    _react["default"].createElement(_grommet.Box, {
      align: "center",
      pad: "large"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Carousel, {
      controls: "arrows",
      height: "medium",
      width: "medium"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      fill: true,
      align: "center",
      justify: "center",
      background: "lavender",
      gap: "small"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
      weight: "bold",
      size: "xlarge"
    }, "Slide 1"), /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
      label: "Button"
    })), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      fill: true,
      align: "center",
      justify: "center",
      background: "light-3",
      gap: "small"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
      weight: "bold",
      size: "xlarge"
    }, "Slide 2"), /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
      label: "Button"
    }), /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
      label: "Button"
    })), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      fill: true,
      align: "center",
      justify: "center",
      background: "light-5",
      gap: "small"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
      weight: "bold",
      size: "xlarge"
    }, "Slide 3"), /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
      label: "Button"
    }), /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
      label: "Button"
    }), /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
      label: "Button"
    }))))
    // </Grommet>
  );
};

InteractiveSlides.storyName = 'Interactive slides';
var _default = exports["default"] = {
  title: 'Media/Carousel/Interactive slides'
};