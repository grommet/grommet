"use strict";

exports.__esModule = true;
exports["default"] = exports.ControlVariations = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommetIcons = require("grommet-icons");
var _grommet = require("grommet");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var ControlVariations = exports.ControlVariations = function ControlVariations() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={grommet}>
    _react["default"].createElement(_grommet.Box, {
      direction: "row",
      gap: "medium",
      pad: "small",
      align: "center",
      justify: "center",
      fill: "horizontal"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      align: "center",
      gap: "small",
      justify: "center"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
      size: "small"
    }, "Continuous slides with both arrow and selector controls"), /*#__PURE__*/_react["default"].createElement(_grommet.Carousel, {
      wrap: true,
      height: "medium",
      width: "medium"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      fill: true,
      align: "center",
      justify: "center",
      background: "light-1"
    }, /*#__PURE__*/_react["default"].createElement(_grommetIcons.Attraction, {
      size: "xlarge"
    })), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      fill: true,
      align: "center",
      justify: "center",
      background: "black"
    }, /*#__PURE__*/_react["default"].createElement(_grommetIcons.TreeOption, {
      size: "xlarge"
    })), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      fill: true,
      align: "center",
      justify: "center",
      background: "light-3"
    }, /*#__PURE__*/_react["default"].createElement(_grommetIcons.Car, {
      size: "xlarge"
    })), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      fill: true,
      align: "center",
      justify: "center",
      background: "brand"
    }, /*#__PURE__*/_react["default"].createElement(_grommetIcons.Cloud, {
      size: "xlarge"
    })), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      fill: true,
      align: "center",
      justify: "center"
    }, /*#__PURE__*/_react["default"].createElement(_grommetIcons.Amazon, {
      size: "xlarge"
    })))), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      gap: "small",
      align: "center",
      justify: "center"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
      size: "small"
    }, "With selector controls and initial child set"), /*#__PURE__*/_react["default"].createElement(_grommet.Carousel, {
      height: "medium",
      width: "medium",
      initialChild: 2,
      controls: "selectors"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      fill: true,
      align: "center",
      justify: "center",
      background: "pink"
    }, /*#__PURE__*/_react["default"].createElement(_grommetIcons.Attraction, {
      size: "xlarge"
    })), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      fill: true,
      align: "center",
      justify: "center",
      background: "black"
    }, /*#__PURE__*/_react["default"].createElement(_grommetIcons.TreeOption, {
      size: "xlarge"
    })), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      fill: true,
      align: "center",
      justify: "center",
      background: "light-2"
    }, /*#__PURE__*/_react["default"].createElement(_grommetIcons.Car, {
      size: "xlarge"
    })), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      fill: true,
      align: "center",
      justify: "center",
      background: "light-1"
    }, /*#__PURE__*/_react["default"].createElement(_grommetIcons.Cloud, {
      size: "xlarge"
    })), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      fill: true,
      align: "center",
      justify: "center"
    }, /*#__PURE__*/_react["default"].createElement(_grommetIcons.Amazon, {
      size: "xlarge"
    })))), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      align: "center",
      gap: "small",
      justify: "center"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
      size: "small"
    }, "With arrow controls and initial child set"), /*#__PURE__*/_react["default"].createElement(_grommet.Carousel, {
      height: "medium",
      width: "medium",
      controls: "arrows",
      initialChild: 3
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      fill: true,
      align: "center",
      justify: "center",
      background: "pink"
    }, /*#__PURE__*/_react["default"].createElement(_grommetIcons.Attraction, {
      size: "xlarge"
    })), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      fill: true,
      align: "center",
      justify: "center",
      background: "black"
    }, /*#__PURE__*/_react["default"].createElement(_grommetIcons.TreeOption, {
      size: "xlarge"
    })), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      fill: true,
      align: "center",
      justify: "center",
      background: "light-1"
    }, /*#__PURE__*/_react["default"].createElement(_grommetIcons.Car, {
      size: "xlarge"
    })), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      fill: true,
      align: "center",
      justify: "center",
      background: "light-2"
    }, /*#__PURE__*/_react["default"].createElement(_grommetIcons.Cloud, {
      size: "xlarge"
    })), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      fill: true,
      align: "center",
      justify: "center"
    }, /*#__PURE__*/_react["default"].createElement(_grommetIcons.Amazon, {
      size: "xlarge"
    })))))
    // </Grommet>
  );
};

ControlVariations.storyName = 'Control variations';
var _default = exports["default"] = {
  title: 'Media/Carousel/Control variations'
};