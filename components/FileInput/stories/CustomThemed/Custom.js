"use strict";

exports.__esModule = true;
exports["default"] = exports.Custom = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
var _grommetIcons = require("grommet-icons");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var customTheme = {
  fileInput: {
    button: {
      hover: {
        color: 'accent-2'
      },
      border: {
        color: 'skyblue',
        width: '1px'
      },
      pad: {
        vertical: '4px',
        horizontal: '8px'
      }
    },
    message: {
      color: 'green',
      textAlign: 'center'
    },
    background: '#f2f2f2',
    border: {
      size: 'medium'
    },
    pad: {
      horizontal: 'medium',
      vertical: 'small'
    },
    round: 'small',
    label: {
      size: 'large'
    },
    icons: {
      remove: _grommetIcons.Trash
    },
    dragOver: {
      border: {
        color: 'focus'
      }
    },
    hover: {
      border: {
        color: 'control'
      },
      extend: "letterSpacing: '0.1em'"
    }
  }
};
var Custom = exports.Custom = function Custom() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    full: true,
    theme: customTheme
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    fill: true,
    align: "center",
    justify: "start",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    width: "medium"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.FileInput, {
    "aria-label": "Choose files",
    renderFile: function renderFile(file) {
      return /*#__PURE__*/_react["default"].createElement(_grommet.Box, null, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
        weight: "bold",
        truncate: true
      }, file.name), /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
        color: "text-weak"
      }, file.size, " bytes"));
    },
    multiple: {
      max: 5
    },
    messages: {
      maxFile: 'You can only select a maximum of 5 files.'
    },
    onChange: function onChange(event, _ref) {
      var files = _ref.files;
      var fileList = files;
      for (var i = 0; i < fileList.length; i += 1) {
        var file = fileList[i];
        console.log(file.name);
      }
    }
  }))));
};
var _default = exports["default"] = {
  title: 'Input/FileInput/Custom Themed/Custom'
};