"use strict";

exports.__esModule = true;
exports["default"] = exports.Small = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var paragraphFiller = "\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod\ntempor incididunt ut labore et dolore magna aliqua.\n";

var Small = function Small() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "medium"
  }, /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_grommet.Heading, {
    size: "small"
  }, "Heading 1 - Small"), /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
    size: "large"
  }, "Text Large"), /*#__PURE__*/_react["default"].createElement(_grommet.Paragraph, null, "Paragraph - Medium", paragraphFiller), /*#__PURE__*/_react["default"].createElement(_grommet.Heading, {
    level: 2,
    size: "small"
  }, "Heading 2 - Small"), /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "Text Medium"), /*#__PURE__*/_react["default"].createElement(_grommet.Paragraph, null, "Paragraph - Medium", paragraphFiller), /*#__PURE__*/_react["default"].createElement(_grommet.Heading, {
    level: 3,
    size: "small"
  }, "Heading 3 - Small"), /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "Text Medium"), /*#__PURE__*/_react["default"].createElement(_grommet.Paragraph, {
    size: "small"
  }, "Paragraph - Small", paragraphFiller), /*#__PURE__*/_react["default"].createElement(_grommet.Heading, {
    level: 4,
    size: "small"
  }, "Heading 4 - Small"), /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
    size: "small"
  }, "Text Small"), /*#__PURE__*/_react["default"].createElement(_grommet.Paragraph, {
    size: "small"
  }, "Paragraph - Small", paragraphFiller))));
};

exports.Small = Small;
var _default = {
  title: 'Type/Typography/Small'
};
exports["default"] = _default;