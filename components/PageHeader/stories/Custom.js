"use strict";

exports.__esModule = true;
exports["default"] = exports.Custom = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
var _utils = require("grommet/utils");
var _grommetIcons = require("grommet-icons");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var customTheme = (0, _utils.deepMerge)(_grommet.grommet, {
  pageHeader: {
    medium: {
      areas: [['parent', 'parent'], ['title', 'null'], ['subtitle', 'null'], ['actions', 'actions']]
    }
  }
});
var Custom = exports.Custom = function Custom() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: customTheme
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Page, null, /*#__PURE__*/_react["default"].createElement(_grommet.PageContent, null, /*#__PURE__*/_react["default"].createElement(_grommet.PageHeader, {
    title: "Permissions",
    subtitle: "View and assign permissions.",
    actions: /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      alignSelf: "start"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
      label: "Edit",
      primary: true
    })),
    parent: /*#__PURE__*/_react["default"].createElement(_grommet.Anchor, {
      icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.FormPrevious, null),
      label: "Settings"
    })
  }))));
};
var _default = exports["default"] = {
  title: 'Layout/PageHeader/Custom Themed/Custom'
};