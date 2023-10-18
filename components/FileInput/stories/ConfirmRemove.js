"use strict";

exports.__esModule = true;
exports["default"] = exports.ConfirmRemove = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var ConfirmRemove = exports.ConfirmRemove = function ConfirmRemove() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    fill: true,
    align: "center",
    justify: "start",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    width: "medium"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Form, {
    onSubmit: function onSubmit(_ref) {
      var value = _ref.value;
      return console.log(value);
    }
  }, /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
    label: "FileInput",
    name: "file-input",
    htmlFor: "file-input"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.FileInput, {
    name: "file-input",
    id: "file-input",
    onChange: function onChange(event, _ref2) {
      var files = _ref2.files;
      var fileList = files;
      for (var i = 0; i < fileList.length; i += 1) {
        var file = fileList[i];
        console.log(file.name);
      }
    },
    confirmRemove: function confirmRemove(_ref3) {
      var onConfirm = _ref3.onConfirm,
        onCancel = _ref3.onCancel;
      return /*#__PURE__*/_react["default"].createElement(_grommet.Layer, {
        onClickOutside: onCancel,
        onEsc: onCancel
      }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
        pad: "medium",
        gap: "medium"
      }, "Are you sure you want to delete this file?", /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
        direction: "row",
        align: "center",
        justify: "end",
        gap: "small"
      }, /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
        label: "Cancel",
        onClick: onCancel
      }), /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
        label: "Delete file",
        onClick: onConfirm,
        primary: true
      }))));
    },
    multiple: true
  })), /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    label: "Submit",
    type: "submit"
  }))));
};
ConfirmRemove.parameters = {
  chromatic: {
    disable: true
  }
};
var _default = exports["default"] = {
  title: 'Input/FileInput/Confirm Remove'
};