"use strict";

exports.__esModule = true;
exports["default"] = exports.Simple = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var Simple = function Simple(props) {
  var animate = props.animate,
      multiple = props.multiple,
      rest = _objectWithoutPropertiesLoose(props, ["animate", "multiple"]);

  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, rest, /*#__PURE__*/_react["default"].createElement(_grommet.Accordion, {
    animate: animate,
    multiple: multiple
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

exports.Simple = Simple;
var _default = {
  title: 'Controls/Accordion/Simple'
};
exports["default"] = _default;