"use strict";

exports.__esModule = true;
exports["default"] = exports.Header = void 0;

var _react = _interopRequireWildcard(require("react"));

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var renderPanelHeader = function renderPanelHeader(title, active) {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    direction: "row",
    align: "center",
    pad: "medium",
    gap: "small"
  }, /*#__PURE__*/_react["default"].createElement("strong", null, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, title)), /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
    color: "brand"
  }, active ? '-' : '+'));
};

var CustomHeaderAccordion = function CustomHeaderAccordion() {
  var _useState = (0, _react.useState)([0]),
      activeIndex = _useState[0],
      setActiveIndex = _useState[1];

  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Accordion, {
    activeIndex: activeIndex,
    onActive: function onActive(newActiveIndex) {
      return setActiveIndex(newActiveIndex);
    }
  }, /*#__PURE__*/_react["default"].createElement(_grommet.AccordionPanel, {
    header: renderPanelHeader('Panel 1', activeIndex.includes(0))
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "medium",
    background: "light-2",
    style: {
      height: '800px'
    }
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "Panel 1 contents"), /*#__PURE__*/_react["default"].createElement(_grommet.TextInput, null))), /*#__PURE__*/_react["default"].createElement(_grommet.AccordionPanel, {
    header: renderPanelHeader('Panel 2', activeIndex.includes(1))
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "medium",
    background: "light-2",
    style: {
      height: '50px'
    }
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "Panel 2 contents"))), /*#__PURE__*/_react["default"].createElement(_grommet.AccordionPanel, {
    header: renderPanelHeader('Panel 3', activeIndex.includes(2))
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "medium",
    background: "light-2",
    style: {
      height: '300px'
    }
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "Panel 3 contents")))));
};

var Header = function Header() {
  return /*#__PURE__*/_react["default"].createElement(CustomHeaderAccordion, null);
};

exports.Header = Header;
var _default = {
  title: 'Controls/Accordion/Header'
};
exports["default"] = _default;