"use strict";

exports.__esModule = true;
exports["default"] = exports.TabsWithIcons = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
var _grommetIcons = require("grommet-icons");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var TabsWithIcons = exports.TabsWithIcons = function TabsWithIcons() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Box, {
      align: "center",
      pad: "medium"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Tabs, null, /*#__PURE__*/_react["default"].createElement(_grommet.Tab, {
      title: "General",
      icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.HomeRounded, null)
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      margin: "small"
    }, "General Information")), /*#__PURE__*/_react["default"].createElement(_grommet.Tab, {
      title: "Account",
      icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.User, null)
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      margin: "small"
    }, "Account Information")), /*#__PURE__*/_react["default"].createElement(_grommet.Tab, {
      title: "Billing",
      icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.Currency, null)
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      margin: "small"
    }, "Billing Information")), /*#__PURE__*/_react["default"].createElement(_grommet.Tab, {
      title: "Notifications",
      icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.Notification, null)
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      margin: "small"
    }, "Notifications will show here."))))
    // </Grommet>
  );
};

TabsWithIcons.storyName = 'Tabs with icons';
var _default = exports["default"] = {
  title: 'Controls/Tabs/Tabs with icons'
};