"use strict";

exports.__esModule = true;
exports["default"] = exports.Medium = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var paragraphFiller = "\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod\ntempor incididunt ut labore et dolore magna aliqua.\n";

var Medium = function Medium() {
  var margin = undefined;
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "medium"
  }, /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_grommet.Heading, {
    margin: margin
  }, "Heading 1 - Medium"), /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
    size: "xlarge"
  }, "Text XLarge"), /*#__PURE__*/_react["default"].createElement(_grommet.Paragraph, {
    size: "large",
    margin: margin
  }, "Paragraph - Large", paragraphFiller), /*#__PURE__*/_react["default"].createElement(_grommet.Heading, {
    level: 2,
    margin: margin
  }, "Heading 2 - Medium"), /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
    size: "large"
  }, "Text Large"), /*#__PURE__*/_react["default"].createElement(_grommet.Paragraph, {
    margin: margin
  }, "Paragraph - Medium", paragraphFiller), /*#__PURE__*/_react["default"].createElement(_grommet.Heading, {
    level: 3,
    margin: margin
  }, "Heading 3 - Medium"), /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "Text Medium"), /*#__PURE__*/_react["default"].createElement(_grommet.Paragraph, {
    margin: margin
  }, "Paragraph - Medium", paragraphFiller), /*#__PURE__*/_react["default"].createElement(_grommet.Heading, {
    level: 4,
    margin: margin
  }, "Heading 4 - Medium"), /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
    size: "small"
  }, "Text Small"), /*#__PURE__*/_react["default"].createElement(_grommet.Paragraph, {
    size: "small",
    margin: margin
  }, "Paragraph - Small", paragraphFiller))));
};

exports.Medium = Medium;
var _default = {
  title: 'Type/Typography/Medium'
};
exports["default"] = _default;