"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _themes = require("../../../themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var BackgroundBox = function BackgroundBox() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "small",
    gap: "small",
    align: "start"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "small",
    background: {
      color: 'brand',
      opacity: true
    },
    elevation: "large"
  }, "brand opacity"), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "small",
    background: "brand",
    elevation: "large"
  }, "brand"), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "small",
    background: {
      color: 'brand'
    },
    elevation: "large"
  }, "brand object"), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "small",
    background: {
      image: 'url(http://librelogo.org/wp-content/uploads/2014/04/gradient2.png)'
    }
  }, "image"), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "small",
    background: {
      color: 'accent-2',
      image: 'url(http://librelogo.org/wp-content/uploads/2014/04/gradient2.png)'
    }
  }, "image + color"), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    background: "dark-1",
    pad: "medium"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    background: "#FFFFFF08",
    pad: "small"
  }, "low opacity on dark background")), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    background: "light-5",
    pad: "medium"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    background: "#11111108",
    pad: "small"
  }, "low opacity on light background")), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    background: {
      color: 'background',
      dark: true
    },
    pad: "medium"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
    color: "brand"
  }, "force dark background")), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    background: "dark-1",
    pad: "medium"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    background: {
      color: 'background',
      dark: false
    },
    pad: "medium"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
    color: "brand"
  }, "force light background"))), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    background: {
      color: {
        dark: 'darkgrey',
        light: 'lightgrey'
      },
      dark: true
    },
    pad: "medium"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
    color: "brand"
  }, "force dark background with color as object")), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    background: "dark-1",
    pad: "medium"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    background: {
      color: {
        dark: 'darkgrey',
        light: 'lightgrey'
      },
      dark: false
    },
    pad: "medium"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
    color: "brand"
  }, "force light background with color as object")))));
};

(0, _react2.storiesOf)('Box', module).add('Background', function () {
  return /*#__PURE__*/_react["default"].createElement(BackgroundBox, null);
});