"use strict";

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var MultipleValues = function MultipleValues() {
  var total = 100;

  var _useState = (0, _react.useState)(),
      active = _useState[0],
      setActive = _useState[1];

  var _useState2 = (0, _react.useState)(),
      label = _useState2[0],
      setLabel = _useState2[1];

  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Stack, {
    anchor: "center"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Meter, {
    type: "circle",
    background: "light-2",
    values: [{
      value: 60,
      onHover: function onHover(over) {
        setActive(over ? 60 : 0);
        setLabel(over ? 'in use' : undefined);
      }
    }, {
      value: 30,
      onHover: function onHover(over) {
        setActive(over ? 30 : 0);
        setLabel(over ? 'available' : undefined);
      }
    }],
    max: 100,
    size: "small",
    thickness: "medium"
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    direction: "row",
    align: "center",
    pad: {
      bottom: 'xsmall'
    }
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
    size: "xxlarge",
    weight: "bold"
  }, active || total), /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "GB")), /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, label || 'total')))));
};

(0, _react2.storiesOf)('Meter', module).add('Multiple Values', function () {
  return /*#__PURE__*/_react["default"].createElement(MultipleValues, null);
});