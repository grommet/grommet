"use strict";

exports.__esModule = true;
exports["default"] = exports.Simple = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Simple = exports.Simple = function Simple() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Box, {
      pad: "large",
      gap: "medium",
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
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "text - random component"), /*#__PURE__*/_react["default"].createElement(_grommet.Box, null, "box - random component")))
    // </Grommet>
  );
};
var _default = exports["default"] = {
  title: 'Layout/Card/Simple'
};