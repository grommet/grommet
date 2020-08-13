"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _grommetIcons = require("grommet-icons");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var HorizontalCollapsible = function HorizontalCollapsible() {
  var _React$useState = _react["default"].useState(),
      openNotification = _React$useState[0],
      setOpenNotification = _React$useState[1];

  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    full: true,
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    fill: true
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    as: "header",
    direction: "row",
    align: "center",
    pad: {
      vertical: 'small',
      horizontal: 'medium'
    },
    justify: "between",
    background: "neutral-3",
    elevation: "large",
    style: {
      zIndex: '1000'
    }
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Heading, {
    level: 3,
    margin: "none",
    color: "white"
  }, /*#__PURE__*/_react["default"].createElement("strong", null, "My App")), /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    onClick: function onClick() {
      return setOpenNotification(!openNotification);
    },
    icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.Notification, {
      color: "white"
    })
  })), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    flex: true,
    direction: "row"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    flex: true,
    align: "center",
    justify: "center"
  }, "Dashboard content goes here, click on the notification icon"), /*#__PURE__*/_react["default"].createElement(_grommet.Collapsible, {
    direction: "horizontal",
    open: openNotification
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    flex: true,
    width: "medium",
    background: "light-2",
    pad: "small",
    elevation: "small"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
    size: "xlarge"
  }, "Sidebar"))))));
};

(0, _react2.storiesOf)('Collapsible', module).add('Horizontal', function () {
  return /*#__PURE__*/_react["default"].createElement(HorizontalCollapsible, null);
}, {
  chromatic: {
    disable: true
  }
});