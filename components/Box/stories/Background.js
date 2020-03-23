"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _themes = require("../../../themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var BackgroundBox = function BackgroundBox() {
  return _react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, _react["default"].createElement(_grommet.Box, {
    pad: "small",
    gap: "small",
    align: "start"
  }, _react["default"].createElement(_grommet.Box, {
    pad: "small",
    background: {
      color: 'brand',
      opacity: true
    },
    elevation: "large"
  }, "brand opacity"), _react["default"].createElement(_grommet.Box, {
    pad: "small",
    background: "brand",
    elevation: "large"
  }, "brand"), _react["default"].createElement(_grommet.Box, {
    pad: "small",
    background: {
      color: 'brand'
    },
    elevation: "large"
  }, "brand object"), _react["default"].createElement(_grommet.Box, {
    pad: "small",
    background: {
      image: 'url(http://librelogo.org/wp-content/uploads/2014/04/gradient2.png)'
    }
  }, "image"), _react["default"].createElement(_grommet.Box, {
    pad: "small",
    background: {
      color: 'accent-2',
      image: 'url(http://librelogo.org/wp-content/uploads/2014/04/gradient2.png)'
    }
  }, "image + color"), _react["default"].createElement(_grommet.Box, {
    background: "dark-1",
    pad: "medium"
  }, _react["default"].createElement(_grommet.Box, {
    background: "#FFFFFF08",
    pad: "small"
  }, "low opacity on dark background")), _react["default"].createElement(_grommet.Box, {
    background: "light-5",
    pad: "medium"
  }, _react["default"].createElement(_grommet.Box, {
    background: "#11111108",
    pad: "small"
  }, "low opacity on light background")), _react["default"].createElement(_grommet.Box, {
    background: {
      color: 'background',
      dark: true
    },
    pad: "medium"
  }, _react["default"].createElement(_grommet.Text, {
    color: "brand"
  }, "force dark background")), _react["default"].createElement(_grommet.Box, {
    background: "dark-1",
    pad: "medium"
  }, _react["default"].createElement(_grommet.Box, {
    background: {
      color: 'background',
      dark: false
    },
    pad: "medium"
  }, _react["default"].createElement(_grommet.Text, {
    color: "brand"
  }, "force light background")))));
};

(0, _react2.storiesOf)('Box', module).add('Background', function () {
  return _react["default"].createElement(BackgroundBox, null);
});