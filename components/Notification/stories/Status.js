"use strict";

exports.__esModule = true;
exports["default"] = exports.Status = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
var _Box = require("../../Box");
var _Text = require("../../Text");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var StatusNotification = function StatusNotification() {
  return /*#__PURE__*/_react["default"].createElement(_Box.Box, {
    pad: "large",
    justify: "center",
    gap: "large"
  }, /*#__PURE__*/_react["default"].createElement(_Box.Box, {
    gap: "xsmall"
  }, /*#__PURE__*/_react["default"].createElement(_Text.Text, {
    size: "medium"
  }, "Default (No status prop)"), /*#__PURE__*/_react["default"].createElement(_grommet.Notification, {
    title: "Status Title",
    message: "This is an example of message text"
  })), /*#__PURE__*/_react["default"].createElement(_Box.Box, {
    gap: "xsmall"
  }, /*#__PURE__*/_react["default"].createElement(_Text.Text, {
    size: "medium"
  }, "Normal"), /*#__PURE__*/_react["default"].createElement(_grommet.Notification, {
    status: "normal",
    title: "Status Title",
    message: "This is an example of message text"
  })), /*#__PURE__*/_react["default"].createElement(_Box.Box, {
    gap: "xsmall"
  }, /*#__PURE__*/_react["default"].createElement(_Text.Text, {
    size: "medium"
  }, "Warning"), /*#__PURE__*/_react["default"].createElement(_grommet.Notification, {
    status: "warning",
    title: "Status Title",
    message: "This is an example of message text"
  })), /*#__PURE__*/_react["default"].createElement(_Box.Box, {
    gap: "xsmall"
  }, /*#__PURE__*/_react["default"].createElement(_Text.Text, {
    size: "medium"
  }, "Critical"), /*#__PURE__*/_react["default"].createElement(_grommet.Notification, {
    status: "critical",
    title: "Status Title",
    message: "This is an example of message text"
  })), /*#__PURE__*/_react["default"].createElement(_Box.Box, {
    gap: "xsmall"
  }, /*#__PURE__*/_react["default"].createElement(_Text.Text, {
    size: "medium"
  }, "Unknown"), /*#__PURE__*/_react["default"].createElement(_grommet.Notification, {
    status: "unknown",
    title: "Status Title",
    message: "This is an example of message text"
  })));
};
var Status = exports.Status = function Status() {
  return /*#__PURE__*/_react["default"].createElement(StatusNotification, null);
};
var _default = exports["default"] = {
  title: 'Visualizations/Notification/Status'
};