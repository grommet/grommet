"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _themes = require("grommet/themes");

var _grommet = require("grommet");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ExternalComponentWithTheme = function ExternalComponentWithTheme() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    background: "neutral-3"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
    color: "light-1"
  }, "This is a grommet component")), /*#__PURE__*/_react["default"].createElement(_grommet.ThemeContext.Consumer, null, function (theme) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      style: {
        backgroundColor: theme.global.colors['neutral-3']
      }
    }, /*#__PURE__*/_react["default"].createElement("p", {
      style: {
        color: theme.global.colors['light-1']
      }
    }, "This component is leveraging the grommet theme capabilities although it is not a grommet component"));
  }));
};

(0, _react2.storiesOf)('Theme', module).add('External Components', function () {
  return /*#__PURE__*/_react["default"].createElement(ExternalComponentWithTheme, null);
});