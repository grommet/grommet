"use strict";

exports.__esModule = true;
exports["default"] = exports.Responsive = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Responsive = exports.Responsive = function Responsive() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Page, null, /*#__PURE__*/_react["default"].createElement(_grommet.PageContent, null, /*#__PURE__*/_react["default"].createElement(_grommet.PageHeader, {
      title: "Grommet",
      subtitle: "Responsive allows PageHeader layout to switch to a \n        single column at responsive breakpoints specified in the theme.",
      actions: /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
        label: "Get Started",
        primary: true
      }),
      parent: /*#__PURE__*/_react["default"].createElement(_grommet.Anchor, {
        label: "Parent Page"
      }),
      responsive: true
    })))
    // </Grommet>
  );
};
var _default = exports["default"] = {
  title: 'Layout/PageHeader/Responsive'
};