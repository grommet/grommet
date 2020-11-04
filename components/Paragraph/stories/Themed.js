"use strict";

exports.__esModule = true;
exports.Themed = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

var _utils = require("grommet/utils");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var customTheme = (0, _utils.deepMerge)(_themes.grommet, {
  paragraph: {
    font: {
      family: 'Comic Sans MS'
    }
  }
});

var Themed = function Themed() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: customTheme
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Paragraph, null, "The font family for this paragraph is being defined by a custom theme."));
}; // disabling chromatic because snapshot doesn't capture font


exports.Themed = Themed;
Themed.story = {
  parameters: {
    chromatic: {
      disable: true
    }
  }
};