"use strict";

exports.__esModule = true;
exports["default"] = exports.Simple = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommetIcons = require("grommet-icons");

var _grommet = require("grommet");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Simple = function Simple() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, null, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Carousel, null, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "xlarge",
    background: "accent-1"
  }, /*#__PURE__*/_react["default"].createElement(_grommetIcons.Attraction, {
    size: "xlarge"
  })), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "xlarge",
    background: "accent-2"
  }, /*#__PURE__*/_react["default"].createElement(_grommetIcons.TreeOption, {
    size: "xlarge"
  })), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "xlarge",
    background: "accent-3"
  }, /*#__PURE__*/_react["default"].createElement(_grommetIcons.Car, {
    size: "xlarge"
  })))));
};

exports.Simple = Simple;
Simple.parameters = {
  chromatic: {
    disable: true
  }
};
var _default = {
  title: 'Media/Carousel/Simple'
};
exports["default"] = _default;