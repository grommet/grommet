"use strict";

exports.__esModule = true;
exports["default"] = exports.Large = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var paragraphFiller = "\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod\ntempor incididunt ut labore et dolore magna aliqua.\n";

var Large = function Large() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "medium"
  }, /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_grommet.Heading, {
    size: "large"
  }, "Heading 1 - Large"), /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
    size: "xxlarge"
  }, "Text XXLarge"), /*#__PURE__*/_react["default"].createElement(_grommet.Paragraph, {
    size: "xlarge"
  }, "Paragraph - XLarge", paragraphFiller), /*#__PURE__*/_react["default"].createElement(_grommet.Heading, {
    level: 2,
    size: "large"
  }, "Heading 2 - Large"), /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
    size: "xlarge"
  }, "Text XLarge"), /*#__PURE__*/_react["default"].createElement(_grommet.Paragraph, {
    size: "large"
  }, "Paragraph - Large", paragraphFiller), /*#__PURE__*/_react["default"].createElement(_grommet.Heading, {
    level: 3,
    size: "large"
  }, "Heading 3 - Large"), /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
    size: "large"
  }, "Text Large"), /*#__PURE__*/_react["default"].createElement(_grommet.Paragraph, null, "Paragraph - Medium", paragraphFiller), /*#__PURE__*/_react["default"].createElement(_grommet.Heading, {
    level: 4,
    size: "large"
  }, "Heading 4 - Large"), /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "Text Medium"), /*#__PURE__*/_react["default"].createElement(_grommet.Paragraph, null, "Paragraph - Medium", paragraphFiller))));
};

exports.Large = Large;
var _default = {
  title: 'Type/Typography/Large'
};
exports["default"] = _default;