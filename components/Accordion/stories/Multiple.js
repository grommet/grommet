"use strict";

exports.__esModule = true;
exports["default"] = exports.Multiple = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Multiple = function Multiple() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, null, /*#__PURE__*/_react["default"].createElement(_grommet.Accordion, {
    multiple: true
  }, /*#__PURE__*/_react["default"].createElement(_grommet.AccordionPanel, {
    label: "Panel 1"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    background: "light-2",
    overflow: "auto",
    height: "medium"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    height: "large",
    flex: false
  }, "Panel 1 contents"))), /*#__PURE__*/_react["default"].createElement(_grommet.AccordionPanel, {
    label: "Panel 2"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    background: "light-2",
    style: {
      height: '50px'
    }
  }, "Panel 2 contents")), /*#__PURE__*/_react["default"].createElement(_grommet.AccordionPanel, {
    label: "Panel 3"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    background: "light-2",
    style: {
      height: '300px'
    }
  }, "Panel 3 contents")))));
};

exports.Multiple = Multiple;
Multiple.parameters = {
  chromatic: {
    disable: true
  }
};
var _default = {
  title: 'Controls/Accordion/Multiple'
};
exports["default"] = _default;