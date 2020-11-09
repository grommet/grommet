"use strict";

exports.__esModule = true;
exports.StyledPlaceholder = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var StyledPlaceholder = function StyledPlaceholder() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    full: true,
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, null, /*#__PURE__*/_react["default"].createElement(_grommet.Form, null, /*#__PURE__*/_react["default"].createElement(_grommet.TextInput, {
    name: "name",
    placeholder: /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "placeholder")
  }))));
};

exports.StyledPlaceholder = StyledPlaceholder;
StyledPlaceholder.story = {
  name: 'Styled placeholder'
};