"use strict";

exports.__esModule = true;
exports["default"] = exports.WithClickableChild = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommetIcons = require("grommet-icons");

var _grommet = require("grommet");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var WithClickableChild = function WithClickableChild() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, null, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Carousel, null, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    gap: "medium",
    pad: "xlarge",
    background: "background-contrast",
    direction: "row"
  }, /*#__PURE__*/_react["default"].createElement(_grommetIcons.Attraction, {
    size: "xlarge"
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    label: "Learn More"
  })), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    gap: "medium",
    pad: "xlarge",
    background: "background-contrast",
    direction: "row"
  }, /*#__PURE__*/_react["default"].createElement(_grommetIcons.TreeOption, {
    size: "xlarge"
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    label: "Visit"
  })), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "xlarge",
    background: "accent-3"
  }, /*#__PURE__*/_react["default"].createElement(_grommetIcons.Car, {
    size: "xlarge"
  })))));
};

exports.WithClickableChild = WithClickableChild;
WithClickableChild.storyName = 'With Clickable Child';
var _default = {
  title: 'Media/Carousel/With Clickable Child'
};
exports["default"] = _default;