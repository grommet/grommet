import React from 'react';
import { Box, Button, FileInput, Form, FormField, Layer } from 'grommet';
export var ConfirmRemove = function ConfirmRemove() {
  return /*#__PURE__*/React.createElement(Box, {
    fill: true,
    align: "center",
    justify: "start",
    pad: "large"
  }, /*#__PURE__*/React.createElement(Box, {
    width: "medium"
  }, /*#__PURE__*/React.createElement(Form, {
    onSubmit: function onSubmit(_ref) {
      var value = _ref.value;
      return console.log(value);
    }
  }, /*#__PURE__*/React.createElement(FormField, {
    label: "FileInput",
    name: "file-input",
    htmlFor: "file-input"
  }, /*#__PURE__*/React.createElement(FileInput, {
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
      return /*#__PURE__*/React.createElement(Layer, {
        onClickOutside: onCancel,
        onEsc: onCancel
      }, /*#__PURE__*/React.createElement(Box, {
        pad: "medium",
        gap: "medium"
      }, "Are you sure you want to delete this file?", /*#__PURE__*/React.createElement(Box, {
        direction: "row",
        align: "center",
        justify: "end",
        gap: "small"
      }, /*#__PURE__*/React.createElement(Button, {
        label: "Cancel",
        onClick: onCancel
      }), /*#__PURE__*/React.createElement(Button, {
        label: "Delete file",
        onClick: onConfirm,
        primary: true
      }))));
    },
    multiple: true
  })), /*#__PURE__*/React.createElement(Button, {
    label: "Submit",
    type: "submit"
  }))));
};
ConfirmRemove.parameters = {
  chromatic: {
    disable: true
  }
};
export default {
  title: 'Input/FileInput/Confirm Remove'
};