"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Example = function Example() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _grommet.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "large",
    gap: "medium",
    height: "large",
    width: "medium"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Card, {
    pad: "small",
    background: "dark-1",
    gap: "medium"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.CardHeader, null, "header"), /*#__PURE__*/_react["default"].createElement(_grommet.CardBody, null, "body"), /*#__PURE__*/_react["default"].createElement(_grommet.CardFooter, null, "footer")), /*#__PURE__*/_react["default"].createElement(_grommet.Card, {
    pad: "small",
    gap: "medium",
    background: "light-4"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.CardBody, null, "body"), /*#__PURE__*/_react["default"].createElement(_grommet.Box, null, "box - random component")), /*#__PURE__*/_react["default"].createElement(_grommet.Card, {
    pad: "small",
    gap: "medium"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.CardBody, null, "body"), /*#__PURE__*/_react["default"].createElement(_grommet.CardHeader, null, "header"), /*#__PURE__*/_react["default"].createElement(_grommet.CardFooter, null, "footer")), /*#__PURE__*/_react["default"].createElement(_grommet.Card, {
    pad: "small",
    gap: "medium",
    background: "light-1"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "text - random component"), /*#__PURE__*/_react["default"].createElement(_grommet.Box, null, "box - random component"))));
};

(0, _react2.storiesOf)('Card', module).add('Simple', function () {
  return /*#__PURE__*/_react["default"].createElement(Example, null);
});