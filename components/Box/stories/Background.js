"use strict";

exports.__esModule = true;
exports["default"] = exports.BackgroundBox = void 0;

var _react = _interopRequireDefault(require("react"));

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
      image: 'url(https://images.unsplash.com/photo-1487088678257-3a541e6e3922?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2167&q=80)',
      opacity: 'strong'
    }
  }, "image"), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "small",
    background: {
      color: 'accent-2',
      image: 'url(https://images.unsplash.com/photo-1487088678257-3a541e6e3922?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2167&q=80)'
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

exports.BackgroundBox = BackgroundBox;
BackgroundBox.storyName = 'Background';
var _default = {
  title: 'Layout/Box/Background'
};
exports["default"] = _default;