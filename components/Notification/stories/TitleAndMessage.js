"use strict";

exports.__esModule = true;
exports["default"] = exports.Toast = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var _Button = require("../../Button");
var _Box = require("../../Box");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var TitleAndMessageNotification = function TitleAndMessageNotification() {
  var _useState = (0, _react.useState)(false),
    visible = _useState[0],
    setVisible = _useState[1];
  var onOpen = function onOpen() {
    return setVisible(true);
  };
  var onClose = function onClose() {
    return setVisible(undefined);
  };
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_Box.Box, {
    pad: "large",
    justify: "center"
  }, /*#__PURE__*/_react["default"].createElement(_Button.Button, {
    label: "Show Notification",
    onClick: onOpen
  })), visible && /*#__PURE__*/_react["default"].createElement(_grommet.Notification, {
    toast: true,
    title: "Status Title",
    message: "Messages should be at max two lines of text.",
    onClose: onClose
  }));
};
var Toast = function Toast() {
  return /*#__PURE__*/_react["default"].createElement(TitleAndMessageNotification, null);
};
exports.Toast = Toast;
Toast.parameters = {
  chromatic: {
    disable: true
  }
};
var _default = {
  title: 'Visualizations/Notification/Toast'
};
exports["default"] = _default;