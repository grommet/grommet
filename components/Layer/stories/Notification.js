"use strict";

exports.__esModule = true;
exports["default"] = exports.NotificationLayer = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommetIcons = require("grommet-icons");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var NotificationLayer = function NotificationLayer() {
  var _React$useState = _react["default"].useState(),
      open = _React$useState[0],
      setOpen = _React$useState[1];

  var onOpen = function onOpen() {
    setOpen(true);
    setTimeout(function () {
      setOpen(undefined);
    }, 3000);
  };

  var onClose = function onClose() {
    return setOpen(undefined);
  };

  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet,
    full: true
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    fill: true,
    align: "center",
    justify: "center"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.Add, {
      color: "brand"
    }),
    label: /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, /*#__PURE__*/_react["default"].createElement("strong", null, "Add")),
    onClick: onOpen,
    plain: true
  })), open && /*#__PURE__*/_react["default"].createElement(_grommet.Layer, {
    position: "bottom",
    modal: false,
    margin: {
      vertical: 'medium',
      horizontal: 'small'
    },
    onEsc: onClose,
    responsive: false,
    plain: true
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    direction: "row",
    gap: "small",
    justify: "between",
    round: "medium",
    elevation: "medium",
    pad: {
      vertical: 'xsmall',
      horizontal: 'small'
    },
    background: "status-ok"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    direction: "row",
    gap: "xsmall"
  }, /*#__PURE__*/_react["default"].createElement(_grommetIcons.StatusGood, null), /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "A new virtual machine has been successfully added (this Layer will close after 3 seconds)")), /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.FormClose, null),
    onClick: onClose,
    plain: true
  }))));
};

exports.NotificationLayer = NotificationLayer;
NotificationLayer.storyName = 'Notification';
NotificationLayer.parameters = {
  chromatic: {
    disable: true
  }
};
var _default = {
  title: 'Layout/Layer/Notification'
};
exports["default"] = _default;