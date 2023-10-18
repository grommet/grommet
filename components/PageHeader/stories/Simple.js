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
    _react["default"].createElement(_grommet.Page, null, /*#__PURE__*/_react["default"].createElement(_grommet.PageContent, null, /*#__PURE__*/_react["default"].createElement(_grommet.PageHeader, {
      title: "Grommet",
      subtitle: "Grommet helps you build responsive and accessible \n          mobile-first projects for the web with an easy to use component \n          library.",
      actions: /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
        label: "Get Started",
        primary: true
      }),
      parent: /*#__PURE__*/_react["default"].createElement(_grommet.Anchor, {
        label: "Parent Page"
      })
    })))
    // </Grommet>
  );
};
var _default = exports["default"] = {
  title: 'Layout/PageHeader/Simple'
};