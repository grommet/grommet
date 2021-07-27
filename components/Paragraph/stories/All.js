"use strict";

exports.__esModule = true;
exports["default"] = exports.All = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var sizes = ['xxlarge', 'xlarge', 'large', 'medium', 'small', '10px'];
var paragraphFiller = "\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod\ntempor incididunt ut labore et dolore magna aliqua.\n";

var All = function All() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, sizes.map(function (size) {
    return /*#__PURE__*/_react["default"].createElement(_grommet.Paragraph, {
      key: size,
      size: size
    }, "Paragraph " + size, paragraphFiller);
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Paragraph, {
    color: "status-critical"
  }, "This is an error message."), /*#__PURE__*/_react["default"].createElement(_grommet.Paragraph, {
    fill: true
  }, "This is a full-width paragraph, using the \"fill\" property:", ' ', paragraphFiller));
};

exports.All = All;
var _default = {
  title: 'Type/Paragraph/All'
};
exports["default"] = _default;